export function calculateScore(answers: any[], questions: any[]) {
  const correct = answers.filter(a => a.isCorrect).length;

  return {
    correct,
    total: questions.length,
    percentage: Math.round((correct / questions.length) * 100)
  };
}

export function getScoreMessage(percentage: number) {
  if (percentage >= 80) return "🔥 Excellent work!";
  if (percentage >= 50) return "👍 Good job!";
  return "📚 Keep practicing!";
}