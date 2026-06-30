export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  category:
    "git" | "react" | "typescript" | "tooling" | "deployment" | "html-css";
  explanation: string;
}

export type Category =
  | "git"
  | "react"
  | "typescript"
  | "devtools"
  | "deployment"
  | "html-css";

export interface NewQuestion {
  id: string;
  category: Category;
  prompt: string;
  options: [string, string, string, string];
  correctIndex: 0 | 1 | 2 | 3;
  explanation: string;
}

export interface AnsweredRecord {
  questionId: string;
  selectedIndex: number;
  isCorrect: boolean;
}