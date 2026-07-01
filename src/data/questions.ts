import type { Question } from "../types/quiz";

const questions: Question[] = [
  {
    id: 1,
    question: "What does useEffect do in React?",
    options: [
      "Handle side effects in function components",
      "Create a new state variable",
      "Update the DOM directly",
      "Manage global styles",
    ],
    correctAnswer: 0,
    category: "react",
    explanation:
      "useEffect runs side-effect logic after render, such as subscriptions, network requests, and syncing with browser APIs.",
  },
  {
    id: 2,
    question: "Which Git command creates a new branch and switches to it?",
    options: [
      "git merge -b",
      "git checkout -b",
      "git pull --branch",
      "git reset --branch",
    ],
    correctAnswer: 1,
    category: "git",
    explanation:
      "git checkout -b creates a branch from the current HEAD and checks it out immediately.",
  },
  {
    id: 3,
    question: "What does the TypeScript `unknown` type encourage?",
    options: [
      "Skipping all type checks",
      "Runtime compilation",
      "Narrowing before use",
      "Implicit any behavior",
    ],
    correctAnswer: 2,
    category: "typescript",
    explanation:
      "Values typed as unknown must be narrowed before properties or methods can be accessed safely.",
  },
  {
    id: 4,
    question: "What is Vite primarily optimized for during development?",
    options: [
      "Native ESM startup speed",
      "Database migrations",
      "Server-side routing",
      "Image authoring",
    ],
    correctAnswer: 0,
    category: "tooling",
    explanation:
      "Vite serves source modules over native ESM and transforms files on demand for fast dev startup.",
  },
  {
    id: 5,
    question:
      "Which CSS feature is best for defining theme tokens like colors?",
    options: ["CSS custom properties", "z-index", "object-fit", "clear: both"],
    correctAnswer: 0,
    category: "html-css",
    explanation:
      "CSS custom properties can be defined once and reused throughout a stylesheet.",
  },
  {
    id: 6,
    question: "What should a deployment health check usually verify?",
    options: [
      "Only the page title",
      "The app can respond successfully",
      "The README length",
      "The commit author",
    ],
    correctAnswer: 1,
    category: "deployment",
    explanation:
      "Health checks should confirm the deployed service can respond and its critical dependencies are reachable.",
  },
];

export default questions;
