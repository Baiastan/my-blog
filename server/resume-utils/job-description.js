import { badWords } from "./data/badWords.js";

export const validateJobDescription = (jd = "") => {
  const arrOfWords = jd.trim().split(/\s+/);

  if (arrOfWords.length < 30) {
    return { isValidJd: false, message: "Job description is too short." };
  }

  let isValidJd = true;

  const detectedBadWords = [];

  const lowerCaseJd = jd.toLowerCase();

  badWords.forEach((word) => {
    const regex = new RegExp(`\\b${word}\\b`, "gi"); // Word boundary and case-insensitive
    if (regex.test(lowerCaseJd)) {
      isValidJd = false;
      detectedBadWords.push(word);
      // Replace bad words with asterisks in the original case-sensitive job description
    }
  });

  const uniqueWordsArray = new Set(arrOfWords);

  return {
    isValidJd,
    uniqueWordsArray,
    detectedBadWords,
    message: isValidJd
      ? "Job description is valid."
      : `Job description contains inappropriate language: ${detectedBadWords.join(", ")}`,
  };
};

export const analyzeJobDecription = (jdArrayOfWords) => {};
