import express from "express";
import { getProblemCache } from "../modules/problemCache.js";

const router = express.Router();

const getSourceType = (url) => {
  if (url.includes("leetcode")) return "Leetcode";
  if (url.includes("interviewbit")) return "Interview Bit";
  if (url.includes("techiedelight")) return "Techiedelight";
  return "Unknown";
};

// GET problem by ID
router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  try {
    const problems = getProblemCache();
    const problem = problems.find((p) => p.problemId === id);
    if (!problem) {
      return res.status(404).json({ error: "Problem not found" });
    }

    const sourceType = getSourceType(problem.url);

    const response = {
      title: problem.title,
      url: problem.url,
      description: problem.description,
      type: sourceType,
    };

    res.json(response);
  } catch (err) {
    console.error("Error fetching problem:", err.message);
    res.status(500).json({ error: err.message });
  }
});

export default router;
