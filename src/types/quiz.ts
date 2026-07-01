export interface NewQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  category:
    "git" | "react" | "typescript" | "tooling" | "deployment" | "html-css";
  explanation: string;
}

export interface AnsweredRecord {
  questionId: number;
  selectedIndex: number;
  isCorrect: boolean;
}

// Backwards-compatible alias: some files import `Question`
export type Question = NewQuestion;