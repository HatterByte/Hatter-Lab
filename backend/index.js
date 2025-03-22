import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import searchRoute from "./routes/searchRoutes.js";
import problemRoute from "./routes/problemRoutes.js";

dotenv.config({ path: "./backend/.env" });

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://hatter-lab.onrender.com",
    ], // Frontend URL
    credentials: true,
  })
);
app.use(express.json());

// Routes
app.use("/search", searchRoute);
app.use("/problem", problemRoute);

// Connect to database and start the server
const startServer = async () => {
  try {
    await connectDB(); // Connect to MongoDB
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.error("Failed to start the server:", error);
  }
};

startServer();
