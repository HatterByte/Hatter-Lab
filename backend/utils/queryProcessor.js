import { removeStopwords } from "stopword";
import { wordsToNumbers } from "words-to-numbers";
import converter from "number-to-words";
import lemmatizer from "wink-lemmatizer";
// const {  } = pkg;
import natural from "natural";

export const processQuery = (query, keywords) => {
  // 1. Normalize the query string
  let normQuery = query
    .toLowerCase()
    .trim()
    .replace(/[.,!?;:()\[\]{}\-_=+\/'"\\|`~@#$%^&*<>]/g, " ")
    .replace(/\s+/g, " ");

  // 2. Tokenize
  let tokens = normQuery.split(" ").filter(Boolean);
  // 3. Clean tokens
  tokens = removeStopwords(tokens).filter(
    (t) => t.length > 1 || /^\d$/.test(t) // keep single-digit numbers
  );
  let output = [];

  // 4. For each token, expand
  tokens.forEach((token) => {
    if (!token) return;
    output.push(token);
    // Lemmatize (verb, noun, adjective)
    output.push(lemmatizer.verb(token));
    output.push(lemmatizer.noun(token));
    output.push(lemmatizer.adjective(token));
    // Handle numbers
    if (/^\d+$/.test(token)) {
      // Digit to word
      const wordForm = converter.toWords(Number(token));
      output.push(wordForm);
      // Also add ordinal (e.g., 2 -> second)
      try {
        output.push(converter.toWordsOrdinal(Number(token)));
      } catch {}
    } else {
      // Word to digit
      const num = wordsToNumbers(token);
      if (num && num.toString() !== token) output.push(num.toString());
    }
  });
  output = [...new Set(output)];
  // 5. Spellcheck (top 2 corrections, Levenshtein distance ≤ 2)
  const spellcheck = new natural.Spellcheck(keywords);
  let spellCorrections = [];
  output.forEach((token) => {
    let threshold = 1;
    if (token.length > 4) threshold = 2;
    const corrections = spellcheck.getCorrections(token, threshold);
    corrections.forEach((corr) => {
      if (corr !== token && natural.LevenshteinDistance(token, corr) <= 2) {
        spellCorrections.push(corr);
        // Lemmatize corrections
        spellCorrections.push(lemmatizer.verb(corr));
        spellCorrections.push(lemmatizer.noun(corr));
        spellCorrections.push(lemmatizer.adjective(corr));
      }
    });
  });
  output = output.concat(spellCorrections);

  // 6. Deduplicate
  const unique = [...new Set(output)];
  // console.log("Unique tokens after processing:", unique);
  // 7. Filter to only those in keywords
  return unique.filter((key) => keywords.includes(key)).sort();
};
