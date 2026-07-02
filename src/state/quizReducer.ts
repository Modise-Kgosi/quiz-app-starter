import type { NewQuestion, AnsweredRecord } from "../types/quiz";

export interface QuizState {
  questions: NewQuestion[];
  currentIndex: number;
  answers: AnsweredRecord[];
  isComplete: boolean;
  pendingSelection: number | null;
}

export function createInitialState(questions: NewQuestion[]): QuizState {
  return {
    questions,
    currentIndex: 0,
    answers: [],
    isComplete: false,
    pendingSelection: null,
  };
}

function normalizeAnswers(answers: unknown): AnsweredRecord[] {
  if (!Array.isArray(answers)) {
    return [];
  }

  return answers.filter(
    (answer): answer is AnsweredRecord =>
      typeof answer === "object" &&
      answer !== null &&
      typeof (answer as AnsweredRecord).questionId === "number" &&
      typeof (answer as AnsweredRecord).selectedIndex === "number" &&
      typeof (answer as AnsweredRecord).isCorrect === "boolean",
  );
}

export function hydrateQuizState(
  questions: NewQuestion[],
  savedState: unknown,
): QuizState {
  if (!savedState || typeof savedState !== "object") {
    return createInitialState(questions);
  }

  const candidate = savedState as Partial<QuizState>;
  const totalQuestions = questions.length;
  const currentIndex =
    typeof candidate.currentIndex === "number" &&
    Number.isInteger(candidate.currentIndex) &&
    candidate.currentIndex >= 0 &&
    candidate.currentIndex < totalQuestions
      ? candidate.currentIndex
      : 0;
  const answers = normalizeAnswers(candidate.answers);
  const isComplete =
    typeof candidate.isComplete === "boolean"
      ? candidate.isComplete
      : answers.length === totalQuestions;
  const pendingSelection =
    typeof candidate.pendingSelection === "number" &&
    candidate.pendingSelection >= 0
      ? candidate.pendingSelection
      : null;

  return {
    questions,
    currentIndex,
    answers,
    isComplete,
    pendingSelection,
  };
}

export type QuizAction =
  | { type: "ANSWER_SELECTED"; payload: { selectedIndex: number } }
  | { type: "GO_NEXT" }
  | { type: "GO_PREVIOUS" }
  | { type: "RESET" };

export function quizReducer(state: QuizState, action: QuizAction): QuizState {
  switch (action.type) {
    case "ANSWER_SELECTED": {
      const question = state.questions[state.currentIndex];
      if (!question) return state;

      return { ...state, pendingSelection: action.payload.selectedIndex };
    }

    case "GO_NEXT": {
      const question = state.questions[state.currentIndex];
      if (!question || state.pendingSelection === null) {
        return state;
      }

      const isCorrect = state.pendingSelection === question.correctAnswer;
      const newRecord: AnsweredRecord = {
        questionId: question.id,
        selectedIndex: state.pendingSelection,
        isCorrect,
      };

      const updatedAnswers = [
        ...state.answers.filter((answer) => answer.questionId !== question.id),
        newRecord,
      ];

      if (state.currentIndex < state.questions.length - 1) {
        return {
          ...state,
          answers: updatedAnswers,
          currentIndex: state.currentIndex + 1,
          pendingSelection: null,
          isComplete: false,
        };
      }

      return {
        ...state,
        answers: updatedAnswers,
        pendingSelection: null,
        isComplete: true,
      };
    }

    case "GO_PREVIOUS": {
      if (state.currentIndex > 0) {
        return { ...state, currentIndex: state.currentIndex - 1 };
      }
      return state;
    }

    case "RESET": {
      return createInitialState(state.questions);
    }

    default:
      return state;
  }
}
