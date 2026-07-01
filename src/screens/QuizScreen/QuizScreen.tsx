import type { Question } from "../../types/quiz";
import Button from "../../components/Button/Button";
import { TerminalCard } from "../../components/Layout/Layout";
import QuestionCard from "../../components/QuestionCard/QuestionCard";
import styles from "./QuizScreen.module.css";

export interface QuizScreenProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
}

export default function QuizScreen({
  question,
  questionNumber,
  totalQuestions,
}: QuizScreenProps) {
  return (
    <div className={styles.screen}>
      <TerminalCard
        footer={
          <div className={styles.footer}>
            <div className={styles.keys}>
              <span>Esc quit</span>
              <span>Ctrl+H help</span>
            </div>
            <div className={styles.actions}>
              <Button disabled>prev</Button>
              <Button variant="primary">next</Button>
            </div>
          </div>
        }
        meta="1024x768"
        path={`~/quiz/${question.category}/q${String(questionNumber).padStart(2, "0")}.sh`}
        title="quiz"
      >
        <QuestionCard
          progressValue={15}
          question={question}
          questionNumber={questionNumber}
          selectedIndex={1}
          totalQuestions={totalQuestions}
        />
      </TerminalCard>

      <div className={styles.widgets}>
        <StatPanel label="session uptime" value="00h 14m 22s" tone="green" />
        <StatPanel label="global rank" value="#1,402 / 12k" />
        <StatPanel label="streak" value="05 answers" />
      </div>

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

interface StatPanelProps {
  label: string;
  value: string;
  tone?: "blue" | "green";
}

function StatPanel({ label, value, tone = "blue" }: StatPanelProps) {
  return (
    <article className={styles.statPanel}>
      <span>{label}</span>
      <strong className={styles[tone]}>{value}</strong>
    </article>
  );
}
