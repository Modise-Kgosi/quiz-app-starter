import type { Question } from "../../types/quiz";
import Button from "../../components/Button/Button";
import { TerminalCard } from "../../components/Layout/Layout";
import QuestionCard from "../../components/QuestionCard/QuestionCard";
import styles from "./QuizScreen.module.css";

// Props passed from the parent app to control the quiz UI.
export interface QuizScreenProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  selectedIndex?: number;
  streak: number;
  uptime: string;
  hasSelectedAnswer: boolean;
  onSelectAnswer: (selectedIndex: number) => void;
  onNext: () => void;
}

export default function QuizScreen({
  question,
  questionNumber,
  totalQuestions,
  selectedIndex,
  streak,
  uptime,
  hasSelectedAnswer,
  onSelectAnswer,
  onNext,
}: QuizScreenProps) {
  // Computes the visual progress percentage for the current question.
  const progressValue = Math.round((questionNumber / totalQuestions) * 100);

  return (
    <div className={styles.screen}>
      {/* Main terminal-style quiz card showing the current question. */}
      <TerminalCard
        footer={
          <div className={styles.footer}>
            <div className={styles.keys}>
              <span>Esc quit</span>
              <span>Ctrl+H help</span>
            </div>
            <div className={styles.footerMeta}>
              <span
                className={`${styles.requirement} ${hasSelectedAnswer ? styles.requirementReady : ""}`}
              >
                {hasSelectedAnswer
                  ? "answer locked — press next to confirm"
                  : "select an answer to continue"}
              </span>
            </div>
            <div className={styles.actions}>
              <Button
                disabled={!hasSelectedAnswer}
                variant="primary"
                onClick={onNext}
              >
                next
              </Button>
            </div>
          </div>
        }
        meta="1024x768"
        path={`~/quiz/${question.category}/q${String(questionNumber).padStart(2, "0")}.sh`}
        title="quiz"
      >
        <QuestionCard
          onSelectAnswer={onSelectAnswer}
          progressValue={progressValue}
          question={question}
          questionNumber={questionNumber}
          selectedIndex={selectedIndex}
          totalQuestions={totalQuestions}
        />
      </TerminalCard>

      {/* Small stat widgets displayed beneath the main quiz card. */}
      <div className={styles.widgets}>
        <StatPanel label="session uptime" value={uptime} tone="green" />
        <StatPanel label="streak" value={`${streak} answers`} />
      </div>

      {/* Additional terminal-style resource panels for the quiz screen. */}
      <div className={styles.resources}>
        <TerminalCard path="fastfetch" title="fastfetch">
          <dl>
            <dt>shell</dt>
            <dd>zsh 5.9</dd>
            <dt>terminal</dt>
            <dd>kitty + ghostty</dd>
            <dt>editor</dt>
            <dd>nvim lazy.nvim</dd>
          </dl>
        </TerminalCard>
        <TerminalCard path="btop" title="btop">
          <dl>
            <dt>cpu</dt>
            <dd>15%</dd>
            <dt>memory</dt>
            <dd>1.2G / 16G</dd>
            <dt>focus</dt>
            <dd>stable</dd>
          </dl>
        </TerminalCard>
      </div>
    </div>
  );
}

// Props for the small status/stat panels shown on the screen.
interface StatPanelProps {
  label: string;
  value: string;
  tone?: "blue" | "green";
}

// Renders a compact stat panel with a label and value.
function StatPanel({ label, value, tone = "blue" }: StatPanelProps) {
  return (
    <article className={styles.statPanel}>
      <span>{label}</span>
      <strong className={styles[tone]}>{value}</strong>
    </article>
  );
}
