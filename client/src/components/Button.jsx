import styles from "./Button.module.css";

export default function Button({
  label,
  children,
  variant = "primary",
  onClick,
  type = "button"
}) {
  const cls = `${styles.btn} ${
    variant === "secondary" ? styles.secondary : styles.primary
  }`;
  return (
    <button type={type} className={cls} onClick={onClick}>
      {children || label}
    </button>
  );
}