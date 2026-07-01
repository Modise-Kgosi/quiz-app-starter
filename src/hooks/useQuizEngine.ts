import { useMemo, useState } from "react";
import type { Question } from "../types/quiz";
import { calculateScore } from "../utils/calculateScore";

export function useQuizEngine(questions: Question[]) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<(number | undefined)[]>([]);

  const currentQuestion = questions[currentIndex];
  const totalQuestions = questions.length;

  // ----------------------------
  // CORE ACTIONS
  // ----------------------------

  function selectAnswer(optionIndex: number) {
    setAnswers((prev) => {
      const updated = [...prev];
      updated[currentIndex] = optionIndex;
      return updated;
    });
  }

  function goNext() {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  }

  function goPrevious() {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  }

  // ----------------------------
  // DERIVED STATE
  // ----------------------------

  const score = useMemo(() => {
    const formattedAnswers = answers.map((selectedIndex, index) => ({
      selectedIndex,
      isCorrect: questions[index]?.correctAnswer === selectedIndex,
    }));

    return calculateScore(formattedAnswers, questions);
  }, [answers, questions]);

  const isComplete = totalQuestions > 0 && currentIndex === totalQuestions - 1;

  return {
    currentQuestion,
    currentIndex,
    totalQuestions,

    answers,
    score,

    isComplete,

    selectAnswer,
    goNext,
    goPrevious,
  };
}