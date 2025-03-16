import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Define __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define path to length.txt
const dataDir = path.join(__dirname, "../data");
const lengthPath = path.join(dataDir, "length.txt");

const lengthstr = fs.readFileSync(lengthPath, "utf-8");
const length = lengthstr.split("\n");

// Convert each line to a number
for (let i = 0; i < length.length; i++) {
  length[i] = Number(length[i]);
}

export default length;
