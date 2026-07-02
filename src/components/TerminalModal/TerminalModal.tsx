import { useEffect, type ReactNode } from "react";
import Button from "../Button/Button";
import styles from "./TerminalModal.module.css";

export interface TerminalModalProps {
  children: ReactNode;
  title: string;
  path: string;
  meta?: string;
  onClose: () => void;
}

export default function TerminalModal({
  children,
  title,
  path,
  meta = "modal",
  onClose,
}: TerminalModalProps) {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div className={styles.backdrop} onMouseDown={onClose}>
      <section
        aria-modal="true"
        aria-labelledby="terminal-modal-title"
        className={styles.modal}
        onMouseDown={(event) => event.stopPropagation()}
        role="dialog"
      >
        <header className={styles.header}>
          <div className={styles.left}>
            <span className={`${styles.dot} ${styles.red}`} />
            <span className={`${styles.dot} ${styles.yellow}`} />
            <span className={`${styles.dot} ${styles.green}`} />
            <span className={styles.path}>{path}</span>
          </div>
          <span>{meta}</span>
        </header>
        <div className={styles.body}>
          <div className={styles.titleRow}>
            <h2 id="terminal-modal-title">{title}</h2>
            <Button size="sm" variant="ghost" onClick={onClose}>
              close
            </Button>
          </div>
          {children}
        </div>
      </section>
    </div>
  );
}
