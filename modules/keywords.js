import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Define __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define path to keywords.txt
const dataDir = path.join(__dirname, "../data");
const keywordsPath = path.join(dataDir, "keywords.txt");

const keywordsstr = fs.readFileSync(keywordsPath, "utf-8");
const keywords = keywordsstr.split("\n");

export default keywords;

