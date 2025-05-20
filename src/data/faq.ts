// src/data/faq.ts

/**
 * Defines the structure for FAQ items.
 * Instead of storing direct strings for category, question, and answer,
 * we will store keys that will be used with the translation function (t).
 */
export interface FAQQuestionItem {
  id: string; // e.g., "q1", "q2"
  // questionKey: string; // Will be constructed in FAQ.tsx as `faq.questionsData.{categoryKey}.{id}.question`
  // answerKey: string;   // Will be constructed in FAQ.tsx as `faq.questionsData.{categoryKey}.{id}.answer`
}

export interface FAQCategory {
  categoryKey: string; // e.g., "generalProject", "technicalQuestions"
  // categoryDisplayKey: string; // Will be `faq.categories.{categoryKey}`
  questions: FAQQuestionItem[];
}

export const faqDataStructure: FAQCategory[] = [
  {
    categoryKey: "generalProject",
    questions: [
      { id: "q1" },
      { id: "q2" },
      { id: "q3" },
    ],
  },
  {
    categoryKey: "technicalQuestions",
    questions: [
      { id: "q1" },
      { id: "q2" },
      { id: "q3" },
      { id: "q4" },
      { id: "q5" },
      { id: "q6" },
    ],
  },
  {
    categoryKey: "developmentProcesses",
    questions: [
      { id: "q1" },
      { id: "q2" },
      { id: "q3" },
      { id: "q4" },
      { id: "q5" },
      { id: "q6" },
    ],
  },
  {
    categoryKey: "statusRoadmapFuture",
    questions: [
      { id: "q1" },
      { id: "q2" },
      { id: "q3" },
    ],
  },
  {
    categoryKey: "challengesOpportunitiesLimitations",
    questions: [
      { id: "q1" },
      { id: "q2" },
      { id: "q3" },
    ],
  },
  {
    categoryKey: "learnMoreContribute",
    questions: [
      { id: "q1" },
      { id: "q2" },
      { id: "q3" },
    ],
  },
];

// Note: The actual translated text for questions and answers
// will now reside in the JSON translation files (e.g., en.json, ru.json)
// under keys like:
// "faq.categories.generalProject"
// "faq.questionsData.generalProject.q1.question"
// "faq.questionsData.generalProject.q1.answer"
// ...and so on for all categories and questions.
