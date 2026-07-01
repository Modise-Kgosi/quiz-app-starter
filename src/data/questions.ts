import type { Question } from "../types/quiz";

/**
 * QUIZ DATA SET (20 QUESTIONS)
 * Covers: Git, React, TypeScript, Dev Tools, Deployment, HTML/CSS
 */

const questions: Question[] = [
  // =========================
  // GIT & GITHUB (4)
  // =========================

  {
    id: 1,
    question: "What does git clone do?",
    options: [
      "Creates a new branch",
      "Downloads a repository from GitHub to your machine",
      "Uploads code to GitHub",
      "Deletes a repository",
    ],
    correctAnswer: 1,
    category: "git",
    explanation:
      "git clone creates a local copy of a remote repository including its history.",
  },

  {
    id: 2,
    question: "What does git commit do?",
    options: [
      "Uploads code to GitHub",
      "Saves a snapshot of changes locally",
      "Deletes a branch",
      "Clones a repository",
    ],
    correctAnswer: 1,
    category: "git",
    explanation:
      "git commit saves a snapshot of your current changes in your local repo.",
  },

  {
    id: 3,
    question: "What does git push do?",
    options: [
      "Downloads code from GitHub",
      "Sends local commits to GitHub",
      "Creates a new file",
      "Deletes commits",
    ],
    correctAnswer: 1,
    category: "git",
    explanation: "git push uploads your local commits to a remote repository.",
  },

  {
    id: 4,
    question: "What is a Git branch used for?",
    options: [
      "To delete code",
      "To work on features separately from main",
      "To install dependencies",
      "To run the project",
    ],
    correctAnswer: 1,
    category: "git",
    explanation:
      "Branches allow isolated development without affecting the main code.",
  },

  // =========================
  // REACT (4)
  // =========================

  {
    id: 5,
    question: "What is a React component?",
    options: [
      "A database",
      "A reusable piece of UI",
      "A Git command",
      "A CSS file",
    ],
    correctAnswer: 1,
    category: "react",
    explanation:
      "Components are reusable building blocks of a React application.",
  },

  {
    id: 6,
    question: "What does useState do?",
    options: [
      "Handles routing",
      "Stores and updates component state",
      "Deploys the app",
      "Writes CSS",
    ],
    correctAnswer: 1,
    category: "react",
    explanation:
      "useState allows you to manage state inside functional components.",
  },

  {
    id: 7,
    question: "What is JSX?",
    options: [
      "A database language",
      "HTML-like syntax inside JavaScript",
      "A Git feature",
      "A CSS framework",
    ],
    correctAnswer: 1,
    category: "react",
    explanation: "JSX lets you write HTML-like syntax in JavaScript.",
  },

  {
    id: 8,
    question: "What are props in React?",
    options: [
      "Functions for APIs",
      "Data passed from parent to child components",
      "CSS styles",
      "Database queries",
    ],
    correctAnswer: 1,
    category: "react",
    explanation: "Props are used to pass data between components.",
  },

  // =========================
  // TYPESCRIPT (3)
  // =========================

  {
    id: 9,
    question: "What is TypeScript?",
    options: [
      "A database",
      "A typed superset of JavaScript",
      "A CSS framework",
      "A Git tool",
    ],
    correctAnswer: 1,
    category: "typescript",
    explanation: "TypeScript adds static typing to JavaScript.",
  },

  {
    id: 10,
    question: "What is an interface in TypeScript?",
    options: [
      "A React hook",
      "A structure that defines object shape",
      "A Git branch",
      "A CSS selector",
    ],
    correctAnswer: 1,
    category: "typescript",
    explanation: "Interfaces define the structure of objects.",
  },

  {
    id: 11,
    question: "Why use TypeScript?",
    options: [
      "To make apps slower",
      "To catch errors before runtime",
      "To replace Git",
      "To style websites",
    ],
    correctAnswer: 1,
    category: "typescript",
    explanation: "TypeScript helps catch errors during development.",
  },

  // =========================
  // DEV TOOLS (3)
  // =========================

  {
    id: 12,
    question: "What does npm install do?",
    options: [
      "Deletes files",
      "Installs project dependencies",
      "Deploys app",
      "Creates Git repo",
    ],
    correctAnswer: 1,
    category: "tooling",
    explanation: "npm install downloads all dependencies from package.json.",
  },

  {
    id: 13,
    question: "What is package.json?",
    options: [
      "A React component",
      "Project metadata + dependencies file",
      "A CSS file",
      "A Git branch",
    ],
    correctAnswer: 1,
    category: "tooling",
    explanation: "package.json stores project info and dependencies.",
  },

  {
    id: 14,
    question: "What is Vite used for?",
    options: [
      "Git tool",
      "Fast frontend build tool",
      "Database system",
      "CSS framework",
    ],
    correctAnswer: 1,
    category: "tooling",
    explanation: "Vite is a fast development build tool for frontend apps.",
  },

  // =========================
  // DEPLOYMENT (3)
  // =========================

  {
    id: 15,
    question: "What is Vercel used for?",
    options: [
      "Writing code",
      "Deploying web applications",
      "Creating Git branches",
      "Installing packages",
    ],
    correctAnswer: 1,
    category: "deployment",
    explanation: "Vercel is a platform for deploying frontend applications.",
  },

  {
    id: 16,
    question: "What is CI/CD?",
    options: [
      "A React hook",
      "Automated build and deployment process",
      "A CSS framework",
      "A Git command",
    ],
    correctAnswer: 1,
    category: "deployment",
    explanation: "CI/CD automates testing and deployment.",
  },

  {
    id: 17,
    question: "What happens during deployment?",
    options: [
      "Code is deleted",
      "App becomes publicly accessible online",
      "Git resets",
      "Dependencies are removed",
    ],
    correctAnswer: 1,
    category: "deployment",
    explanation:
      "Deployment makes your application accessible on the internet.",
  },

  // =========================
  //  HTML & CSS (3)
  // =========================

  {
    id: 18,
    question: "What is semantic HTML?",
    options: [
      "Random HTML tags",
      "Meaningful tags like header and article",
      "CSS framework",
      "Git feature",
    ],
    correctAnswer: 1,
    category: "html-css",
    explanation: "Semantic HTML uses meaningful tags for structure.",
  },

  {
    id: 19,
    question: "What does Flexbox do?",
    options: [
      "Deletes elements",
      "Aligns items in a container",
      "Runs JavaScript",
      "Deploys apps",
    ],
    correctAnswer: 1,
    category: "html-css",
    explanation: "Flexbox is used for layout alignment in CSS.",
  },

  {
    id: 20,
    question: "What is a CSS selector?",
    options: [
      "Git command",
      "Targets HTML elements for styling",
      "React hook",
      "Database query",
    ],
    correctAnswer: 1,
    category: "html-css",
    explanation: "Selectors define which HTML elements are styled.",
  },
];

export default questions;
