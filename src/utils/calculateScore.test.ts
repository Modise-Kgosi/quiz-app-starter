import { describe, it, expect } from "vitest";
import { calculateScore } from "./calculateScore";

describe("calculateScore", () => {
  it("returns 100% when all answers are correct", () => {
    const answers = [
      { selectedIndex: 0, isCorrect: true },
      { selectedIndex: 1, isCorrect: true },
      { selectedIndex: 2, isCorrect: true },
    ];

    const questions = [{}, {}, {}];

    const result = calculateScore(answers, questions);

    expect(result).toEqual({
      correct: 3,
      total: 3,
      percentage: 100,
    });
  });

  it("returns 0% when all answers are incorrect", () => {
    const answers = [
      { selectedIndex: 0, isCorrect: false },
      { selectedIndex: 1, isCorrect: false },
      { selectedIndex: 2, isCorrect: false },
    ];

    const questions = [{}, {}, {}];

    const result = calculateScore(answers, questions);

    expect(result).toEqual({
      correct: 0,
      total: 3,
      percentage: 0,
    });
  });

  it("calculates the correct percentage for partially correct answers", () => {
    const answers = [
      { selectedIndex: 0, isCorrect: true },
      { selectedIndex: 1, isCorrect: false },
      { selectedIndex: 2, isCorrect: true },
      { selectedIndex: 3, isCorrect: false },
    ];

    const questions = [{}, {}, {}, {}];

    const result = calculateScore(answers, questions);

    expect(result).toEqual({
      correct: 2,
      total: 4,
      percentage: 50,
    });
  });

  it("returns zero correct answers when no answers have been submitted", () => {
    const questions = [{}, {}, {}];

    const result = calculateScore([], questions);

    expect(result).toEqual({
      correct: 0,
      total: 3,
      percentage: 0,
    });
  });

  it("returns 0% when there are no questions", () => {
    const result = calculateScore([], []);

    expect(result).toEqual({
      correct: 0,
      total: 0,
      percentage: 0,
    });
  });
});
