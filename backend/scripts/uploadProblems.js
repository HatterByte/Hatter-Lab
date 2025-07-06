import dotenv from "dotenv";
import { MongoClient } from "mongodb";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

dotenv.config({ path: "./backend/.env" });

// Handle __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

async function uploadProblems() {
  try {
    await client.connect();
    const db = client.db("problemSet"); // DB name
    const collection = db.collection("Problems"); // Collection name

    const titles = fs
      .readFileSync(path.join(__dirname, "../data/problem-titles.txt"), "utf8")
      .split("\n")
      .map((title) => title.trim());
    const urls = fs
      .readFileSync(path.join(__dirname, "../data/problem-urls.txt"), "utf8")
      .split("\n")
      .map((url) => url.trim());
    const problems = [];

    function formatText(text, url) {
      if (url.includes("leetcode")) {
        text = text.split("ListShare");
        text = text[1];
        text = text.split("Accepted");
        text = text[0];
      }
      const find = "\r\n";
      const re = new RegExp(find, "g");
      text = text.replace(re, "<br/>");
      return text;
    }

    function formatTitle(title) {
      return title
        .split(/[-\s]+/)
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    }

    for (let i = 0; i < titles.length; i++) {
      const problemTextPath = path.join(
        __dirname,
        "../Problems",
        `problem_text_${i + 1}.txt`
      );
      let description = fs.existsSync(problemTextPath)
        ? fs.readFileSync(problemTextPath, "utf8").trim()
        : "Description not found.";
      // Format the description before upload
      description = formatText(description, urls[i]);

      problems.push({
        problemId: i + 1,
        title: formatTitle(titles[i]),
        url: urls[i],
        description: description,
      });
    }

    // Insert into MongoDB
    await collection.insertMany(problems);
    console.log("Uploaded successfully!");
  } finally {
    await client.close();
  }
}

uploadProblems();
