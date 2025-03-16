import stringSimilarity from 'string-similarity';

export const calculateBM25 = (queryKeywords, keywords, IDF, TF, length, avgdl, titles, query) => {
    const N = 3023; // Total number of documents
    const arr = [];
  
    // Get IDs of query keywords
    const qid = queryKeywords.map((key) => keywords.indexOf(key));
  
    // Calculate BM25 scores
    for (let i = 0; i < N; i++) {
      let s = 0;
      qid.forEach((key) => {
        const idfKey = IDF[key];
        let tf = 0;
        for (let k = 0; k < TF[i].length; k++) {
          if (TF[i][k].id == key) {
            tf = TF[i][k].val / length[i];
            break;
          }
        }
        const tfkey = tf;
        const x = tfkey * (1.2 + 1);
        const y = tfkey + 1.2 * (1 - 0.75 + 0.75 * (length[i] / avgdl));
        let BM25 = (x / y) * idfKey;
  
        // Give higher weightage to Leetcode and Interview Bit problems
        if (i < 2214) BM25 *= 2;
        s += BM25;
      });
  
      // Title Similarity
      const title = titles[i] || "";
      const titSim = stringSimilarity.compareTwoStrings(
        title,
        query.toLowerCase()
      );
      s *= titSim;
  
      arr.push({ id: i, sim: s });
    }
  
    // Sort by score
    arr.sort((a, b) => b.sim - a.sim);
  
    return arr;
  };