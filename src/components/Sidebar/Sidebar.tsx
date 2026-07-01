import Button from "../Button/Button";
import styles from "./Sidebar.module.css";

export interface SidebarItem {
  label: string;
  icon: string;
  active?: boolean;
}

export interface SidebarProps {
  items: SidebarItem[];
  footerItems?: SidebarItem[];
}

export default function Sidebar({ items, footerItems = [] }: SidebarProps) {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.brand}>
        <strong>DEV Quiz</strong>
        <span>v1.0.0-stable</span>
      </div>

      <nav className={styles.nav} aria-label="Quiz modules">
        {items.map((item) => (
          <a
            className={`${styles.item} ${item.active ? styles.active : ""}`}
            href="#"
            key={item.label}
          >
            <span aria-hidden="true">{item.icon}</span>
            <span>{item.label}</span>
          </a>
        ))}
      </nav>

      <Button className={styles.newSession} size="sm">
        new_session
      </Button>

      <nav className={styles.footer} aria-label="System actions">
        {footerItems.map((item) => (
          <a className={styles.item} href="#" key={item.label}>
            <span aria-hidden="true">{item.icon}</span>
            <span>{item.label}</span>
          </a>
        ))}
      </nav>
    </aside>
  );
}
