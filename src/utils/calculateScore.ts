export interface QuizScore {
  correct: number;
  total: number;
  percentage: number;
}

interface AnswerSummary {
  selectedIndex?: number;
  isCorrect: boolean;
}

export function calculateScore(
  answers: AnswerSummary[],
  questions: unknown[],
): QuizScore {
  const correct = answers.filter((answer) => answer.isCorrect).length;
  const total = questions.length;

  return {
    correct,
    total,
    percentage: total === 0 ? 0 : Math.round((correct / total) * 100),
  };
}
