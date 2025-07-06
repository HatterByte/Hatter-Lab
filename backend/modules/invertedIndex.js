import tf from "./tf.js"; // tf[i] = Map<keywordId, count>

const N = tf.length;

const buildInvertedIndex = () => {
  const inverted = new Map();

  for (let i = 0; i < N; i++) {
    for (let [keywordId] of tf[i].entries()) {
      if (!inverted.has(keywordId)) {
        inverted.set(keywordId, new Set());
      }
      inverted.get(keywordId).add(i);
    }
  }

  return inverted;
};

const invertedIndex = buildInvertedIndex();

export default invertedIndex;