import express from "express";
import Problem from "../models/Problems.js";

const router = express.Router();

// GET problem by ID
router.get("/:id", async (req, res) => {
  const id = parseInt(req.params.id, 10);
  try {
    const problem = await Problem.findOne({ problemId: id });
    if (!problem) {
      return res.status(404).json({ error: "Problem not found" });
    }
    res.json(problem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;