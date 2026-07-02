import { useReducer, useCallback, useEffect, useRef } from "react";
import { quizReducer, createInitialState } from "../state/quizReducer";
import { calculateScore } from "../utils/scoring";
import type { NewQuestion } from "../types/quiz";
import type { QuizState } from "../state/quizReducer";

const QUIZ_STORAGE_KEY = "quiz-state";

export function useQuizEngine(questions: NewQuestion[]) {
  const isResetPendingRef = useRef(false);

  const [state, dispatch] = useReducer(quizReducer, questions, (qs) => {
    try {
      const saved = localStorage.getItem(QUIZ_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved) as QuizState;
      }
    } catch {
      // Fall through to initial state on parse error
    }
    return createInitialState(qs);
  });

  useEffect(() => {
    if (isResetPendingRef.current) {
      localStorage.removeItem(QUIZ_STORAGE_KEY);
      isResetPendingRef.current = false;
    } else {
      localStorage.setItem(QUIZ_STORAGE_KEY, JSON.stringify(state));
    }
  }, [state]);

  const selectAnswer = useCallback((selectedIndex: number) => {
    dispatch({ type: "ANSWER_SELECTED", payload: { selectedIndex } });
  }, []);

  const goNext = useCallback(() => {
    dispatch({ type: "GO_NEXT" });
  }, []);

  const goPrevious = useCallback(() => {
    dispatch({ type: "GO_PREVIOUS" });
  }, []);

  const reset = useCallback(() => {
    isResetPendingRef.current = true;
    dispatch({ type: "RESET" });
  }, []);

  const currentQuestion =
    state.questions.length > 0
      ? state.questions[state.currentIndex]
      : undefined;

  const score = calculateScore(state.answers, state.questions.length);

  const isFirstQuestion = state.currentIndex === 0;
  const isLastQuestion = state.currentIndex === state.questions.length - 1;

  return {
    currentQuestion,
    currentIndex: state.currentIndex,
    totalQuestions: state.questions.length,
    answers: state.answers,
    isComplete: state.isComplete,
    isFirstQuestion,
    isLastQuestion,
    score,
    selectAnswer,
    goNext,
    goPrevious,
    reset,
  };
}
