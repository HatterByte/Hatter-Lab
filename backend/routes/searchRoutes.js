import express from "express";
import { processQuery } from "../utils/queryProcessor.js";
import { calculateBM25 } from "../utils/bm25.js";
import { getProblemCache } from "../modules/problemCache.js";
import dataCache from "../modules/dataCache.js";
const router = express.Router();

// GET search results
router.get("/", (req, res) => {
  try {
    const query = req.query.query;
    if (!query) return res.status(400).json({ error: "Query is required" });

    // Process the query
    const queryKeywords = processQuery(query, dataCache.keywords);

    // Use in-memory cache
    const problems = getProblemCache();
    const titles = problems.map((problem) => problem.title);

    // Calculate BM25 scores
    const avgdl = 124.761826;
    const arr = calculateBM25(
      queryKeywords,
      dataCache.keywords,
      dataCache.idf,
      dataCache.tf,
      dataCache.length,
      avgdl,
      titles,
      query
    );

    // Fetch top 10 results directly by array index
    const response = [];
    let nonZero = 0;
    for (let i = 0; i < Math.min(6, arr.length); i++) {
      if (arr[i].sim !== 0) nonZero++;
      const idx = arr[i].id;
      const problem = problems[idx];
      if (problem) {
        response.push({
          problemId: idx,
          title: problem.title,
          description: problem.description,
        });
      }
    }
    res.json(nonZero ? response : []);
  } catch (error) {
    console.error("Error in search route:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
