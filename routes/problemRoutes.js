import express from "express";
import Problem from "../models/Problem.js";

const router = express.Router();

// GET problem by ID
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const problem = await Problem.findById(id);
    if (!problem) {
      return res.status(404).json({ error: "Problem not found" });
    }
    res.json(problem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;