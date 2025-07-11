import mongoose from "mongoose";

const problemSchema = new mongoose.Schema(
  {
    problemId: Number,
    title: String,
    url: String,
    description: String,
  },
  {
    collection: "Problems", // Explicitly specifying the collection name
  }
);

const Problem = mongoose.model("Problem", problemSchema);

export default Problem;
