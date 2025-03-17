import express from "express";
import Problem from "../models/Problems.js";

const router = express.Router();

const formatText = (text,id) => {
  if (id <= 1773) {
    text = text.split("ListShare");
    text = text[1];
    text = text.split("Accepted");
    text = text[0];
  }
  // return text;
  const find = "\r\n";
  const re = new RegExp(find, "g");
  return text.replace(re, "<br/>");
};

const formatTitle = (title) => {
  const parts = title.split("-");
  return parts.map(word => word.trim()).join(" ");
};

const getSourceType = (id) => {
  if (id < 1774) return "Leetcode";
  if (id < 2214) return "Interview Bit";
  return "Techdelight";
};

// GET problem by ID
router.get("/:id", async (req, res) => {
  const id = parseInt(req.params.id, 10);
  try {
    const problem = await Problem.findOne({ problemId: id });
    if (!problem) {
      return res.status(404).json({ error: "Problem not found" });
    }

    const formattedText = formatText(problem.description,id);
    const formattedTitle = formatTitle(problem.title);
    const sourceType = getSourceType(id);

    const response = {
      title: formattedTitle,
      link: problem.url,
      value: formattedText,
      type: sourceType
    };

    res.json(response);

  } catch (err) {
    console.error("Error fetching problem:", err.message);
    res.status(500).json({ error: err.message });
  }
});

export default router;
