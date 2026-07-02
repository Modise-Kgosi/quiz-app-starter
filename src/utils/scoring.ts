import type { AnsweredRecord, NewQuestion } from "../types/quiz";

export interface ScoreSummary {
  correct: number;
  total: number;
  percentage: number;
}

export function calculateScore(
  answers: AnsweredRecord[],
  totalQuestions: number,
): ScoreSummary {
  const correct = answers.filter((answer) => answer.isCorrect).length;

  const percentage =
    totalQuestions === 0 ? 0 : Math.round((correct / totalQuestions) * 100);

  return {
    correct,
    total: totalQuestions,
    percentage,
  };
}

export function getAnswerForQuestion(
  answers: AnsweredRecord[],
  question: NewQuestion,
): AnsweredRecord | undefined {
  return answers.find((answer) => answer.questionId === question.id);
}
