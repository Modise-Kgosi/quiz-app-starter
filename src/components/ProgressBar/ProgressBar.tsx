import styles from "./ProgressBar.module.css";

export interface ProgressBarProps {
  value: number;
  max?: number;
  label?: string;
  showPercent?: boolean;
  tone?: "blue" | "green";
}

export default function ProgressBar({
  value,
  max = 100,
  label,
  showPercent = true,
  tone = "blue",
}: ProgressBarProps) {
  const percent = Math.min(100, Math.max(0, Math.round((value / max) * 100)));
  const blocks = 24;
  const filledBlocks = Math.round((percent / 100) * blocks);

  return (
    <div className={styles.progress} aria-label={label}>
      <div className={styles.header}>
        {label ? <span>{label}</span> : <span />}
        {showPercent ? <strong>{percent}% complete</strong> : null}
      </div>
      <div
        className={`${styles.track} ${styles[tone]}`}
        role="progressbar"
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        {Array.from({ length: blocks }, (_, index) => (
          <span
            key={index}
            className={index < filledBlocks ? styles.filled : ""}
          />
        ))}
      </div>
    </div>
  );
}
