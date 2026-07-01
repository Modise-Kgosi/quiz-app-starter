import type { Question } from "../../types/quiz";
import ProgressBar from "../ProgressBar/ProgressBar";
import styles from "./QuestionCard.module.css";

export interface QuestionCardProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  progressValue: number;
  selectedIndex?: number;
  onSelectAnswer: (selectedIndex: number) => void;
}

export default function QuestionCard({
  question,
  questionNumber,
  totalQuestions,
  progressValue,
  selectedIndex,
  onSelectAnswer,
}: QuestionCardProps) {
  return (
    <div className={styles.questionCard}>
      <ProgressBar label="progress_session" value={progressValue} />
      <div className={styles.meta}>
        <span>category: {question.category}</span>
        <span>
          question: {String(questionNumber).padStart(2, "0")} /{" "}
          {String(totalQuestions).padStart(2, "0")}
        </span>
      </div>
      <h2>
        <span>$</span> {question.question}
      </h2>
      <div className={styles.rule} aria-hidden="true" />
      <div className={styles.answerList}>
        {question.options.map((option, index) => (
          <AnswerOption
            index={index}
            key={option}
            onSelect={onSelectAnswer}
            selected={selectedIndex === index}
            text={option}
          />
        ))}
      </div>
      <p className={styles.prompt}>
        <strong>user@archlinux</strong> : ~/quiz $
      </p>
    </div>
  );
}

interface AnswerOptionProps {
  index: number;
  text: string;
  selected?: boolean;
  onSelect: (selectedIndex: number) => void;
}

const answerLetters = ["A", "B", "C", "D", "E", "F"];

function AnswerOption({
  index,
  text,
  selected = false,
  onSelect,
}: AnswerOptionProps) {
  return (
    <button
      className={`${styles.answerOption} ${selected ? styles.selected : ""}`}
      onClick={() => onSelect(index)}
      type="button"
    >
      <span className={styles.answerKey}>
        {answerLetters[index] ?? index + 1}
      </span>
      <span>{text}</span>
    </button>
  );
}
