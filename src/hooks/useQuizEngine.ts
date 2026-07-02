import { useReducer, useCallback } from "react";
import { quizReducer, createInitialState } from "../state/quizReducer";
import { calculateScore } from "../utils/scoring";
import type { AnsweredRecord, NewQuestion } from "../types/quiz";

function getCurrentStreak(answers: AnsweredRecord[]) {
  let streak = 0;

  for (let index = answers.length - 1; index >= 0; index -= 1) {
    if (!answers[index].isCorrect) {
      break;
    }

    streak += 1;
  }

  return streak;
}

export function useQuizEngine(questions: NewQuestion[]) {
  const [state, dispatch] = useReducer(
    quizReducer,
    questions,
    createInitialState,
  );

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
    dispatch({ type: "RESET" });
  }, []);

  const currentQuestion =
    state.questions.length > 0
      ? state.questions[state.currentIndex]
      : undefined;

  const score = calculateScore(state.answers, state.questions.length);
  const streak = getCurrentStreak(state.answers);

  const isFirstQuestion = state.currentIndex === 0;
  const isLastQuestion = state.currentIndex === state.questions.length - 1;

  return {
    currentQuestion,
    currentIndex: state.currentIndex,
    totalQuestions: state.questions.length,
    answers: state.answers,
    pendingSelection: state.pendingSelection,
    isComplete: state.isComplete,
    isFirstQuestion,
    isLastQuestion,
    score,
    streak,
    selectAnswer,
    goNext,
    goPrevious,
    reset,
  };
}
