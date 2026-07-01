import type React from "react";
import Button from "../../components/Button/Button";
import { TerminalCard } from "../../components/Layout/Layout";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import styles from "./ResultsScreen.module.css";

export interface CategoryResult {
  label: string;
  score: number;
  total: number;
}

export interface ResultsScreenProps {
  score: number;
  total: number;
  results: CategoryResult[];
}

export default function ResultsScreen({
  score,
  total,
  results,
}: ResultsScreenProps) {
  return (
    <TerminalCard
      className={styles.report}
      path="~/system-report.log"
      title="system report"
    >
      <div className={styles.title}>&gt; DEV QUIZ - SYSTEM REPORT</div>
      <div className={styles.rule} />
      <section className={styles.summary}>
        <ScoreDisplay score={score} total={total} />
        <div className={styles.breakdown}>
          <h2>performance breakdown</h2>
          {results.map((result) => (
            <div className={styles.category} key={result.label}>
              <div>
                <strong>~/{result.label}</strong>
                <span>
                  {String(result.score).padStart(2, "0")} /{" "}
                  {String(result.total).padStart(2, "0")} [
                  {Math.round((result.score / result.total) * 100)}%]
                </span>
              </div>
              <ProgressBar
                showPercent={false}
                tone={result.score === result.total ? "green" : "blue"}
                value={result.score}
                max={result.total}
              />
            </div>
          ))}
        </div>
      </section>
      <div className={styles.rule} />
      <div className={styles.actions}>
        <Button size="lg" variant="primary">
          restart quiz
        </Button>
        <Button size="lg">export logs</Button>
      </div>
      <pre className={styles.terminal}>{`> session_id:   8f42-4211-ac9d
> date:         2026-07-01 14:32:01
> user_agent:   arch-linux-x86_64

> system_report_finalized. logs written to /var/log/quiz/session_03.log`}</pre>
    </TerminalCard>
  );
}

interface ScoreDisplayProps {
  score: number;
  total: number;
  label?: string;
}

function ScoreDisplay({ score, total, label = "success" }: ScoreDisplayProps) {
  const percent = Math.round((score / total) * 100);

  return (
    <div
      className={styles.score}
      style={{ "--score": `${percent}%` } as React.CSSProperties}
    >
      <div className={styles.ring}>
        <strong>{score}</strong>
        <span>/ {total}</span>
      </div>
      <div className={styles.caption}>
        <strong>
          {label} ({percent}.0%)
        </strong>
        <span>status: stable_build</span>
      </div>
    </div>
  );
}
