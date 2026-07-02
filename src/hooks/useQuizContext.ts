import { createContext, useContext } from "react";
import type { AnsweredRecord } from "../types/quiz";

export interface QuizContextType {
  answeredQuestions: AnsweredRecord[];
}

export const QuizContext = createContext<QuizContextType>({
  answeredQuestions: [],
});

export function useQuizContext(): QuizContextType {
  return useContext(QuizContext);
}
