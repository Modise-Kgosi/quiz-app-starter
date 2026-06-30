import type { NewQuestion, AnsweredRecord } from "../types/quiz";

export interface QuizState {
  questions: NewQuestion[];
  currentIndex: number;
  answers: AnsweredRecord[];
  isComplete: boolean;
}

export function createInitialState(questions: NewQuestion[]): QuizState {
  return {
    questions,
    currentIndex: 0,
    answers: [],
    isComplete: false,
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

      const isCorrect = action.payload.selectedIndex === question.correctAnswer;

      const newRecord: AnsweredRecord = {
        questionId: question.id,
        selectedIndex: action.payload.selectedIndex,
        isCorrect,
      };

      const updatedAnswers = [
        ...state.answers.filter((a) => a.questionId !== question.id),
        newRecord,
      ];

      const isComplete = updatedAnswers.length === state.questions.length;

      return { ...state, answers: updatedAnswers, isComplete };
    }

    case "GO_NEXT": {
      if (state.currentIndex < state.questions.length - 1) {
        return { ...state, currentIndex: state.currentIndex + 1 };
      }
      return { ...state, isComplete: true };
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
