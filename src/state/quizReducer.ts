import type { NewQuestion, AnsweredRecord } from "../types/quiz";

export interface QuizState {
  questions: NewQuestion[];
  currentIndex: number;
  answers: AnsweredRecord[];
  isComplete: boolean;
}

export type QuizAction =
  | { type: "ANSWER_SELECTED"; payload: { selectedIndex: number } }
  | { type: "GO_NEXT" }
  | { type: "GO_PREVIOUS" }
  | { type: "RESET" }
  | { type: "RESTORE_STATE"; payload: QuizState };

export function createInitialState(
  questions: NewQuestion[]
): QuizState {
  return {
    questions,
    currentIndex: 0,
    answers: [],
    isComplete: false,
  };
}

export function quizReducer(
  state: QuizState,
  action: QuizAction
): QuizState {
  switch (action.type) {
    case "ANSWER_SELECTED": {
      const currentQuestion = state.questions[state.currentIndex];

      if (!currentQuestion) {
        return state;
      }

      const isCorrect =
        action.payload.selectedIndex === currentQuestion.correctIndex;

      const record: AnsweredRecord = {
        questionId: currentQuestion.id,
        selectedIndex: action.payload.selectedIndex,
        isCorrect,
      };

      const existingIndex = state.answers.findIndex(
        (answer) => answer.questionId === currentQuestion.id
      );

      const updatedAnswers =
        existingIndex === -1
          ? [...state.answers, record]
          : state.answers.map((answer, index) =>
              index === existingIndex ? record : answer
            );

      return {
        ...state,
        answers: updatedAnswers,
      };
    }

    case "GO_NEXT": {
      const isLastQuestion =
        state.currentIndex >= state.questions.length - 1;

      if (isLastQuestion) {
        return {
          ...state,
          isComplete: true,
        };
      }

      return {
        ...state,
        currentIndex: state.currentIndex + 1,
      };
    }

    case "GO_PREVIOUS": {
      if (state.currentIndex === 0) {
        return state;
      }

      return {
        ...state,
        currentIndex: state.currentIndex - 1,
        isComplete: false,
      };
    }

    case "RESET":
      return createInitialState(state.questions);

    case "RESTORE_STATE":
      return action.payload;

    default:
      return state;
  }
}