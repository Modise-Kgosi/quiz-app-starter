import { describe, expect, it } from "vitest";
import { createInitialState, quizReducer } from "./quizReducer";
import type { NewQuestion } from "../types/quiz";

const questions: NewQuestion[] = [
  {
    id: 1,
    question: "What is React?",
    options: ["Library", "Framework", "Language", "Database"],
    correctAnswer: 0,
    explanation: "React is a JavaScript library.",
    category: "react",
  },
  {
    id: 2,
    question: "What is TypeScript?",
    options: ["Language", "Database", "Framework", "Browser"],
    correctAnswer: 0,
    explanation: "TypeScript is a typed superset of JavaScript.",
    category: "typescript",
  },
];

describe("quizReducer", () => {
  it("creates the initial state", () => {
    const state = createInitialState(questions);

    expect(state.currentIndex).toBe(0);
    expect(state.answers).toEqual([]);
    expect(state.isComplete).toBe(false);
    expect(state.questions).toEqual(questions);
  });

  it("records a correct answer", () => {
    const state = createInitialState(questions);

    const newState = quizReducer(state, {
      type: "ANSWER_SELECTED",
      payload: { selectedIndex: 0 },
    });

    expect(newState.answers).toHaveLength(1);
    expect(newState.answers[0].isCorrect).toBe(true);
  });

  it("moves to the next question", () => {
    const state = createInitialState(questions);

    const newState = quizReducer(state, {
      type: "GO_NEXT",
    });

    expect(newState.currentIndex).toBe(1);
  });

  it("moves to the previous question", () => {
    const state = {
      ...createInitialState(questions),
      currentIndex: 1,
    };

    const newState = quizReducer(state, {
      type: "GO_PREVIOUS",
    });

    expect(newState.currentIndex).toBe(0);
  });

  it("resets the quiz", () => {
    const state = {
      ...createInitialState(questions),
      currentIndex: 1,
      answers: [
        {
          questionId: 1,
          selectedIndex: 0,
          isCorrect: true,
        },
      ],
      isComplete: true,
    };

    const newState = quizReducer(state, {
      type: "RESET",
    });

    expect(newState.currentIndex).toBe(0);
    expect(newState.answers).toEqual([]);
    expect(newState.isComplete).toBe(false);
  });
});