import { NavLink, Link } from "react-router-dom";
import { useApp } from "../store/AppContext";
import Button from "./Button";
import styles from "./Header.module.css";

export default function Header() {
  const { user, setUser, favorites, cart, theme, toggleTheme } = useApp();
  const totalCartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  function handleSwitchUser() {
    const newName = prompt("Введите ваше имя кибер-пользователя:", user.name);
    if (newName && newName.trim()) setUser({ ...user, name: newName.trim() });
  }

  return (
    <header className={styles.header}>
      <div>
        <Link to="/" className={styles.logo}>⚡ OnShop</Link>
        <p style={{ fontSize: "0.75rem", color: "#9499b7" }}>Баланс: {user.balance.toLocaleString()} ₸</p>
      </div>
      <nav className={styles.nav}>
        <NavLink to="/" end className={({ isActive }) => (isActive ? `${styles.link} ${styles.active}` : styles.link)}>Главная</NavLink>
        <NavLink to="/list" className={({ isActive }) => (isActive ? `${styles.link} ${styles.active}` : styles.link)}>Каталог ({favorites.length} ★)</NavLink>
        <NavLink to="/cart" className={({ isActive }) => (isActive ? `${styles.link} ${styles.active}` : styles.link)}>Корзина ({totalCartCount})</NavLink>
        <NavLink to="/profile" className={({ isActive }) => (isActive ? `${styles.link} ${styles.active}` : styles.link)}>Кабинет</NavLink>
      </nav>
      <div className={styles.controls}>
        <span style={{ fontSize: "0.85rem", color: "#00f3ff" }}>👤 {user.name}</span>
        <Button variant="secondary" onClick={handleSwitchUser}>Профиль</Button>
        <Button variant="secondary" onClick={toggleTheme}>{theme === "cyber-dark" ? "☀️" : "🌙"}</Button>
      </div>
    </header>
  );
}