import stringSimilarity from "string-similarity";
import invertedIndex from "../modules/invertedIndex.js";

export const calculateBM25 = (
  queryKeywords,
  keywords,
  IDF,
  TF,
  length,
  avgdl,
  titles,
  query
) => {
  const N = 3023; // Total number of documents
  const arr = [];

  // Get IDs of query keywords
  const qid = queryKeywords.map((key) => keywords.indexOf(key));

  const relevantDocs = new Set();
  qid.forEach((key) => {
    const docs = invertedIndex.get(key);
    if (docs) {
      docs.forEach((docId) => relevantDocs.add(docId));
    }
  });
  // Calculate BM25 scores
  relevantDocs.forEach((i) => {
    let s = 0;
    qid.forEach((key) => {
      const idfKey = IDF[key];
      let tf = TF[i].get(key) || 0;
      tf = tf / length[i];
      const tfkey = tf;
      const x = tfkey * (1.2 + 1);
      const y = tfkey + 1.2 * (1 - 0.75 + 0.75 * (length[i] / avgdl));
      let BM25 = (x / y) * idfKey;

      if (i < 1774) BM25 *= 2; //lc
      else if (i < 2214) BM25 *= 1.2; //ib

      s += BM25;
    });

    const title = titles[i] || "";
    const normalizedTitle = title
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "")
      .trim();
    const normalizedQuery = query
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "")
      .trim();
    const titSim = stringSimilarity.compareTwoStrings(
      normalizedTitle,
      normalizedQuery
    );

    s = 0.5 * (s * titSim) + 0.5 * titSim;

    arr.push({ id: i, sim: s });
  });

  // Sort by score
  arr.sort((a, b) => b.sim - a.sim);

  return arr;
};
