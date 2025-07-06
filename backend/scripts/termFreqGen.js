import { removeStopwords } from "stopword";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Define __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define paths
const dataDir = path.join(__dirname, "../data"); // Path to the data folder
const problemsDir = path.join(__dirname, "../Problems"); // Path to the Problems folder

// Ensure the data directory exists
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir);
}

let documents = [];
const N = 3023; // Total number of problem files

// Read all problem files
for (let i = 1; i <= N; i++) {
  const filePath = path.join(problemsDir, `problem_text_${i}.txt`);
  const question = fs.readFileSync(filePath, "utf-8");
  documents.push(question);
}

let docKeywords = [];

// Preprocess documents
for (let i = 0; i < documents.length; i++) {
  const lines = documents[i].split("\n");
  const docWords = [];
  for (let k = 0; k < lines.length; k++) {
    const temp1 = lines[k].split(" ");
    temp1.forEach((e) => {
      e = e.split("\r");
      if (e[0].length) docWords.push(e[0]);
    });
  }
  const newString = removeStopwords(docWords);
  newString.sort();
  let temp = [];
  for (let j = 0; j < newString.length; j++) {
    newString[j] = newString[j].toLowerCase();
    newString[j] = newString[j].replace(/[^\w\s]/g, ""); 
    if (newString[j] !== "") temp.push(newString[j]);
  }
  docKeywords.push(temp);
}

// Calculate document lengths and write to length.txt
let sum = 0;
const lengthFilePath = path.join(dataDir, "length.txt");
for (let i = 0; i < N; i++) {
  const length = docKeywords[i].length;
  sum += length;
  fs.appendFileSync(lengthFilePath, length + "\n");
  console.log(length);
}

// Extract unique keywords and write to keywords.txt
let keywords = [];
for (let i = 0; i < N; i++) {
  for (let j = 0; j < docKeywords[i].length; j++) {
    if (keywords.indexOf(docKeywords[i][j]) === -1)
      keywords.push(docKeywords[i][j]);
  }
}
keywords.sort();
const keywordsFilePath = path.join(dataDir, "keywords.txt");
keywords.forEach((word) => {
  fs.appendFileSync(keywordsFilePath, word + "\n");
});

// Compute Term Frequency (TF) and write to TF.txt
const W = keywords.length;
let TF = new Array(N);
for (let i = 0; i < N; i++) {
  TF[i] = new Array(W).fill(0);
  let map = new Map();
  docKeywords[i].forEach((key) => {
    return map.set(key, 0);
  });
  docKeywords[i].forEach((key) => {
    let cnt = map.get(key);
    cnt++;
    return map.set(key, cnt);
  });
  docKeywords[i].forEach((key) => {
    const id = keywords.indexOf(key);
    if (id !== -1) {
    //   TF[i][id] = map.get(key) / docKeywords[i].length;
      TF[i][id] = map.get(key);
    }
  });
}

const tfFilePath = path.join(dataDir, "TF.txt");
for (let i = 0; i < N; i++) {
  for (let j = 0; j < W; j++) {
    if (TF[i][j] != 0)
      fs.appendFileSync(tfFilePath, i + " " + j + " " + TF[i][j] + "\n");
  }
}

// Compute Inverse Document Frequency (IDF) and write to IDF.txt
let IDF = new Array(W);
for (let i = 0; i < W; i++) {
  let cnt = 0;
  for (let j = 0; j < N; j++) {
    if (TF[j][i]) {
      cnt++;
    }
  }
  if (cnt) IDF[i] = Math.log((N - cnt + 0.5) / (cnt + 0.5) + 1);
}

const idfFilePath = path.join(dataDir, "IDF.txt");
IDF.forEach((word) => {
  fs.appendFileSync(idfFilePath, word + "\n");
});

console.log("All files have been generated and saved in the data folder.");