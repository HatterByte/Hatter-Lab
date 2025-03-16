import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Define __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define path to IDF.txt
const dataDir = path.join(__dirname, "../data");
const idfPath = path.join(dataDir, "IDF.txt");

const idfstr = fs.readFileSync(idfPath, "utf-8");
const idf = idfstr.split("\n");

// Convert each line to a number
for (let i = 0; i < idf.length; i++) {
  idf[i] = Number(idf[i]);
}

export default idf;