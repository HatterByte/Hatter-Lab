import Problem from "../models/Problems.js";

let problemCache = [];

export async function loadProblemCache() {
  problemCache = await Problem.find({});
  problemCache.sort((a, b) => a.problemId - b.problemId);
}

export function getProblemCache() {
  return problemCache;
}
