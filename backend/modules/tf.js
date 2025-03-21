import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Define __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define paths
const dataDir = path.join(__dirname, "../data");
const tfPath = path.join(dataDir, "TF.txt");

const N = 3023;
let tf = new Array(N);

for (let i = 0; i < N; i++) {
  tf[i] = [];
}

// Read and parse the TF.txt file
const TF = fs.readFileSync(tfPath, "utf-8");

const temp = TF.split("\n");
for (let k = 0; k < temp.length; k++) {
  const arr = temp[k].split(" ");
  if (arr.length >= 3) {
    const i = Number(arr[0]);
    const j = Number(arr[1]);
    const val = Number(arr[2]);
    tf[i].push({
      id: j,
      val: val,
    });
  }
}

export default tf;