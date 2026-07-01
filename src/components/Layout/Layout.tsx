import type React from "react";
import Sidebar, { type SidebarItem } from "../Sidebar/Sidebar";
import styles from "./Layout.module.css";

export interface LayoutProps {
  children: React.ReactNode;
  sidebarItems: SidebarItem[];
  footerItems?: SidebarItem[];
  prompt: string;
  statusItems: string[];
  activeCategory?: string;
  progress?: string;
  bottomPrompt?: string;
}

export default function Layout({
  children,
  sidebarItems,
  footerItems,
  prompt,
  statusItems,
  activeCategory,
  progress,
  bottomPrompt = "user@archlinux:~$",
}: LayoutProps) {
  return (
    <div className={styles.layout}>
      <Sidebar items={sidebarItems} footerItems={footerItems} />
      <div className={styles.main}>
        <TopBar
          prompt={prompt}
          statusItems={statusItems}
          activeCategory={activeCategory}
          progress={progress}
        />
        <main className={styles.content}>{children}</main>
        <footer className={styles.commandLine}>
          <span>{bottomPrompt}</span>
          <i aria-hidden="true" />
          <small>system online</small>
          <nav>
            <a href="#">--help</a>
            <a href="#">--version</a>
            <a href="#">--exit</a>
          </nav>
        </footer>
      </div>
    </div>
  );
}

interface TopBarProps {
  prompt: string;
  statusItems: string[];
  activeCategory?: string;
  progress?: string;
}

function TopBar({
  prompt,
  statusItems,
  activeCategory,
  progress,
}: TopBarProps) {
  return (
    <header className={styles.topbar}>
      <div className={styles.topbarPrompt}>
        <span className={styles.windowDots} aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className={styles.promptText}>{prompt}</span>
      </div>
      <div className={styles.status}>
        {activeCategory ? (
          <span className={`${styles.categoryBadge} ${styles.categoryActive}`}>
            <span aria-hidden="true">&gt;</span>
            {activeCategory}
          </span>
        ) : null}
        {statusItems.map((item) => (
          <span key={item}>{item}</span>
        ))}
        {progress ? <strong>{progress}</strong> : null}
      </div>
    </header>
  );
}

export interface TerminalCardProps {
  title: string;
  path?: string;
  meta?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

export function TerminalCard({
  title,
  path,
  meta,
  children,
  footer,
  className = "",
}: TerminalCardProps) {
  return (
    <section className={`${styles.terminalCard} ${className}`}>
      <header className={styles.terminalHeader}>
        <div className={styles.terminalLeft}>
          <span className={`${styles.dot} ${styles.red}`} />
          <span className={`${styles.dot} ${styles.yellow}`} />
          <span className={`${styles.dot} ${styles.green}`} />
          <span className={styles.terminalPath}>{path ?? title}</span>
        </div>
        {meta ? <span className={styles.terminalMeta}>{meta}</span> : null}
      </header>
      <div className={styles.terminalBody}>{children}</div>
      {footer ? (
        <footer className={styles.terminalFooter}>{footer}</footer>
      ) : null}
    </section>
  );
}
