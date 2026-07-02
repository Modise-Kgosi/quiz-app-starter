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
