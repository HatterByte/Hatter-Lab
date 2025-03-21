import express from "express";
import Problem from "../models/Problems.js";

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

const getSourceType = (url) => {
  if (url.includes("leetcode")) return "Leetcode";
  if (url.includes("interviewbit")) return "Interview Bit";
  if (url.includes("techiedelight")) return "Techiedelight";
  return "Unknown";
};

// GET problem by ID
router.get("/:id", async (req, res) => {
  const id = parseInt(req.params.id, 10);
  try {
    const problem = await Problem.findOne({ problemId: id });
    if (!problem) {
      return res.status(404).json({ error: "Problem not found" });
    }

    const formattedText = formatText(problem.description,problem.url);
    const formattedTitle = formatTitle(problem.title);
    const sourceType = getSourceType(problem.url);

    const response = {
      title: formattedTitle,
      url: problem.url,
      description: formattedText,
      type: sourceType
    };

    res.json(response);

  } catch (err) {
    console.error("Error fetching problem:", err.message);
    res.status(500).json({ error: err.message });
  }
});

export default router;
