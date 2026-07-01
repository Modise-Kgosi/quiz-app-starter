import Button from "../../components/Button/Button";
import { TerminalCard } from "../../components/Layout/Layout";
import styles from "./WelcomeScreen.module.css";

export interface WelcomeScreenProps {
  categories: string[];
  onStart: () => void;
}

const archAscii = String.raw`
        ----     ----- -
       /   /  / ____| |        /\           /\
      / /| | | |    | |       /  \   /\   /  \
     / ___ | | |____| |___   / /\ \ /  \ / /\ \
    /_/   |_|  \____|_____| /_/  \_\    /_/  \_\
`;

export default function WelcomeScreen({
  categories,
  onStart,
}: WelcomeScreenProps) {
  return (
    <div className={styles.screen}>
      <TerminalCard path="~/welcome.sh" title="welcome" meta="1024x768">
        <section className={styles.hero}>
          <pre className={styles.ascii}>{archAscii}</pre>
          <h1>DEV QUIZ</h1>
          <div className={styles.divider} />
          <p>
            A command-line based environment to validate your technical
            expertise across modern stacks.
          </p>

          <div className={styles.modules}>
            <header>
              <span>available modules</span>
              <span>total: {String(categories.length).padStart(2, "0")}</span>
            </header>
            <div>
              {categories.map((category) => (
                <span className={styles.moduleBadge} key={category}>
                  <span aria-hidden="true">&gt;</span>
                  {category}
                </span>
              ))}
            </div>
          </div>

          <Button size="lg" variant="primary" onClick={onStart}>
            start_environment
          </Button>

          <p className={styles.prompt}>
            <strong>user@archlinux</strong> :~$
          </p>
        </section>
      </TerminalCard>

      <div className={styles.stats}>
        <TerminalCard path="system diagnostics" title="system diagnostics">
          <div className={styles.systemRows}>
            <span>hostname:</span>
            <strong>arch-node-01</strong>
            <span>uptime:</span>
            <strong>4d 12h 30m</strong>
            <span>wm:</span>
            <strong>Hyprland</strong>
          </div>
        </TerminalCard>
        <TerminalCard path="command history" title="command history">
          <div className={styles.history}>
            <span>
              ./git-basics.sh <strong>90%</strong>
            </span>
            <span>
              ./react-hooks.sh <strong>75%</strong>
            </span>
            <span>
              nvim quiz.config.ts <strong>ready</strong>
            </span>
          </div>
        </TerminalCard>
        <article className={styles.activityPanel}>
          <span>recent activity</span>
          <strong>engine standing by</strong>
          <small>kernel updated 6.5.9</small>
        </article>
      </div>
    </div>
  );
}
