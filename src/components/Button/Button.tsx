import type React from "react";
import styles from "./Button.module.css";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  onClick?: () => void;
}

export default function Button({
  children,
  variant = "secondary",
  size = "md",
  disabled = false,
  loading = false,
  className = "",
  onClick,
}: ButtonProps) {
  return (
    <button
      className={`${styles.button} ${styles[variant]} ${styles[size]} ${className}`}
      disabled={disabled || loading}
      onClick={onClick}
      type="button"
    >
      <span className={styles.bracket}>[</span>
      <span>{loading ? "running..." : children}</span>
      <span className={styles.bracket}>]</span>
    </button>
  );
}
