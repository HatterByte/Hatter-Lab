import express from "express";
import { processQuery } from "../utils/queryProcessor.js";
import { calculateBM25 } from "../utils/bm25.js";
import Problem from "../models/Problems.js";
import idf from "../modules/idf.js";
import keywords from "../modules/keywords.js";
import length from "../modules/length.js";
import tf from "../modules/tf.js";
const router = express.Router();

const formatText = (text,url) => {
  if (url.includes("leetcode")) {
    text = text.split("ListShare");
    text = text[1];
    text = text.split("Accepted");
    text = text[0];
  }
  // return text;
  const find = "\r\n";
  const re = new RegExp(find, "g");
  text = text.replace(re, "<br/>");
  return text;
};

const formatTitle = (title) => {
  return title
    .split(/[-\s]+/) // Split at both "-" and " " (one or more occurrences)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize first letter
    .join(" "); // Join with a space
};

// GET search results
router.get("/", async (req, res) => {
  try {
    const query = req.query.query;
    if (!query) return res.status(400).json({ error: "Query is required" });

    // Process the query
    const queryKeywords = processQuery(query, keywords);

    const problems = await Problem.find({}, "title");
    const titles = problems.map((problem) => problem.title);

    // Calculate BM25 scores
    const avgdl = 124.761826;
    const arr = calculateBM25(
      queryKeywords,
      keywords,
      idf,
      tf,
      length,
      avgdl,
      titles,
      query
    );

    // Fetch top 10 results
    const response = [];
    let nonZero = 0;

    for (let i = 0; i < Math.min(10, arr.length); i++) {
      if (arr[i].sim !== 0) nonZero++;
      const problem = await Problem.findOne({ problemId: arr[i].id + 1 });
      const title = formatTitle(problem.title);
      const description = formatText(problem.description,problem.url);
      if (problem) {
        response.push({
          problemId: arr[i].id,
          title,
          description,
        });
      }
    }

    // Send response
    setTimeout(() => {
      res.json(nonZero ? response : []);
    }, 1000);
  } catch (error) {
    console.error("Error in search route:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
