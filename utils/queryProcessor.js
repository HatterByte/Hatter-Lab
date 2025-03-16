import { removeStopwords } from 'stopword';
import { wordsToNumbers } from 'words-to-numbers';
import converter from 'number-to-words';
import lemmatizer from 'wink-lemmatizer';
// const {  } = pkg;
import natural from 'natural';

export const processQuery = (query, keywords) => {
  const oldString = query.split(" ");
  const newString = removeStopwords(oldString).sort();
  let queryKeywords = [];

  // Extract numbers and their word forms
  const getNum = query.match(/\d+/g);
  if (getNum) {
    getNum.forEach(num => {
      queryKeywords.push(num);
      const numStr = converter.toWords(Number(num));
      queryKeywords.push(numStr);

      numStr.split("-").forEach(key => {
        queryKeywords.push(key);
        key.split(" ").forEach(subKey => queryKeywords.push(subKey));
      });
    });
  }

  // Process words and handle camel case
  newString.forEach(word => {
    const cleanWord = word.toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "");
    if (cleanWord) queryKeywords.push(cleanWord);

    const letr = cleanWord.match(/[a-zA-Z]+/g);
    if (letr) letr.forEach(w => queryKeywords.push(w));

    const numWord = wordsToNumbers(cleanWord).toString();
    if (numWord !== cleanWord) queryKeywords.push(numWord);
  });

  // Handle grammar and spellcheck
  const queryKeywordsNew = [...queryKeywords];
  queryKeywords.forEach(key => {
    const lemma = lemmatizer.verb(key);
    queryKeywordsNew.push(lemma);
    const spellcheck = new natural.Spellcheck(keywords);
    const spellkey1 = spellcheck.getCorrections(key);
    const spellkey2 = spellcheck.getCorrections(lemma);
    if (spellkey1.indexOf(key) == -1) {
      spellkey1.forEach((k1) => {
        queryKeywordsNew.push(k1);
        queryKeywordsNew.push(lemmatizer.verb(k1));
      });
    }

    if (spellkey2.indexOf(lemma) == -1) {
      spellkey2.forEach((k2) => {
        queryKeywordsNew.push(k2);
        queryKeywordsNew.push(lemmatizer.verb(k2));
      });
    }
  });

  const uniqueKeywords = [...new Set(queryKeywordsNew)];
  // Now we need to filter out those keywords which are present in our dataset
  return uniqueKeywords.filter(key => keywords.includes(key)).sort();
};
