# Скрипт автоматического создания структуры и файлов для OnShop

Set-Location client

# Создаем папки
mkdir src\store -Force
mkdir src\components -Force
mkdir src\pages -Force

# 1. index.css
Set-Content -Path "src\index.css" -Value @"
:root {
  --bg-dark: #07070d;
  --bg-card: #0f101d;
  --neon-purple: #b026ff;
  --neon-cyan: #00f3ff;
  --text-main: #f0f4ff;
  --text-muted: #9499b7;
}
* { box-sizing: border-box; margin: 0; padding: 0; }
body {
  font-family: 'Segoe UI', Roboto, sans-serif;
  background-color: var(--bg-dark);
  color: var(--text-main);
  background-image:
    radial-gradient(circle at 15% 15%, rgba(176, 38, 255, 0.15), transparent 35%),
    radial-gradient(circle at 85% 80%, rgba(0, 243, 255, 0.13), transparent 35%);
  min-height: 100vh;
}
"@

# 2. AppContext.jsx
Set-Content -Path "src\store\AppContext.jsx" -Value @"
import { createContext, useContext, useState } from "react";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [theme, setTheme] = useState("cyber-dark");
  const [user, setUser] = useState({ name: "Гость OnShop", role: "customer" });
  const [favorites, setFavorites] = useState([1]);

  const toggleTheme = () => setTheme((t) => (t === "cyber-dark" ? "cyber-contrast" : "cyber-dark"));
  const toggleFavorite = (id) =>
    setFavorites((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  return (
    <AppContext.Provider value={{ theme, toggleTheme, user, setUser, favorites, toggleFavorite }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
"@

# 3. Button.module.css
Set-Content -Path "src\components\Button.module.css" -Value @"
.btn { font: inherit; font-weight: 600; padding: 0.55rem 1.1rem; border-radius: 8px; cursor: pointer; transition: 0.25s; border: 1px solid transparent; }
.primary { background: linear-gradient(135deg, #b026ff, #00c3ff); color: #050509; box-shadow: 0 0 14px rgba(176, 38, 255, 0.5); }
.primary:hover { box-shadow: 0 0 22px rgba(0, 243, 255, 0.85); transform: translateY(-1px); }
.secondary { background: rgba(15, 16, 29, 0.9); color: #00f3ff; border-color: #00f3ff; }
.secondary:hover { background: rgba(0, 243, 255, 0.15); }
.btn:focus-visible { outline: 2px solid #00f3ff; outline-offset: 2px; }
"@

# 4. Button.jsx
Set-Content -Path "src\components\Button.jsx" -Value @"
import styles from "./Button.module.css";

export default function Button({ label, children, variant = "primary", onClick, type = "button" }) {
  const cls = `${styles.btn} ${variant === "secondary" ? styles.secondary : styles.primary}`;
  return <button type={type} className={cls} onClick={onClick}>{children || label}</button>;
}
"@

# 5. Card.module.css
Set-Content -Path "src\components\Card.module.css" -Value @"
.card {
  background: var(--bg-card);
  border: 1px solid rgba(176, 38, 255, 0.35);
  border-radius: 14px;
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 0.75rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.6);
  transition: 0.25s;
}
.card:hover { transform: translateY(-3px); border-color: #00f3ff; box-shadow: 0 0 20px rgba(0, 243, 255, 0.28); }
.title { color: #00f3ff; font-size: 1.2rem; }
.description { color: var(--text-muted); font-size: 0.95rem; line-height: 1.45; }
"@

# 6. Card.jsx
Set-Content -Path "src\components\Card.jsx" -Value @"
import styles from "./Card.module.css";

export default function Card({ title, description, footer, badge }) {
  return (
    <article className={styles.card}>
      <div>
        {badge && <span style={{ fontSize: "0.75rem", color: "#b026ff", fontWeight: 700 }}>{badge}</span>}
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
      </div>
      {footer && <div>{footer}</div>}
    </article>
  );
}
"@

# 7. Header.module.css
Set-Content -Path "src\components\Header.module.css" -Value @"
.header {
  display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 1rem;
  padding: 1rem 2rem; background: rgba(7, 7, 13, 0.92); border-bottom: 1px solid #b026ff;
  box-shadow: 0 2px 20px rgba(176, 38, 255, 0.25); position: sticky; top: 0; z-index: 100;
}
.logo { font-size: 1.6rem; font-weight: 800; background: linear-gradient(90deg, #00f3ff, #b026ff); -webkit-background-clip: text; -webkit-text-fill-color: transparent; text-decoration: none; }
.nav { display: flex; flex-wrap: wrap; gap: 1.2rem; }
.link { color: var(--text-muted); text-decoration: none; font-weight: 600; }
.link:hover, .active { color: #00f3ff; text-shadow: 0 0 8px rgba(0, 243, 255, 0.6); }
.controls { display: flex; align-items: center; gap: 0.75rem; }
"@

# 8. Header.jsx
Set-Content -Path "src\components\Header.jsx" -Value @"
import { NavLink, Link } from "react-router-dom";
import { useApp } from "../store/AppContext";
import Button from "./Button";
import styles from "./Header.module.css";

export default function Header({ title = "OnShop", subtitle }) {
  const { user, setUser, favorites, theme, toggleTheme } = useApp();

  function handleSwitchUser() {
    const newName = prompt("Введите имя покупателя:", user.name);
    if (newName && newName.trim()) setUser({ ...user, name: newName.trim() });
  }

  return (
    <header className={styles.header}>
      <div>
        <Link to="/" className={styles.logo}>⚡ {title}</Link>
        {subtitle && <p style={{ fontSize: "0.8rem", color: "#9499b7" }}>{subtitle}</p>}
      </div>
      <nav className={styles.nav}>
        <NavLink to="/" end className={({ isActive }) => (isActive ? `${styles.link} ${styles.active}` : styles.link)}>Главная</NavLink>
        <NavLink to="/list" className={({ isActive }) => (isActive ? `${styles.link} ${styles.active}` : styles.link)}>Каталог ({favorites.length} ★)</NavLink>
        <NavLink to="/order" className={({ isActive }) => (isActive ? `${styles.link} ${styles.active}` : styles.link)}>Оформить заказ</NavLink>
      </nav>
      <div className={styles.controls}>
        <span style={{ fontSize: "0.85rem", color: "#00f3ff" }}>👤 {user.name}</span>
        <Button variant="secondary" onClick={handleSwitchUser}>Сменить имя</Button>
        <Button variant="secondary" onClick={toggleTheme}>{theme === "cyber-dark" ? "Неон +" : "Неон •"}</Button>
      </div>
    </header>
  );
}
"@

# 9. List.jsx
Set-Content -Path "src\components\List.jsx" -Value @"
export default function List({ title, items }) {
  return (
    <section>
      {title && <h2 style={{ marginBottom: "0.75rem", color: "#b026ff" }}>{title}</h2>}
      <ul style={{ paddingLeft: "1.25rem", color: "#f0f4ff" }}>
        {items.map((item, idx) => (
          <li key={item.id ?? idx} style={{ marginBottom: "0.4rem" }}>
            {typeof item === "string" ? item : item.title}
          </li>
        ))}
      </ul>
    </section>
  );
}
"@

# 10. Timer.jsx
Set-Content -Path "src\components\Timer.jsx" -Value @"
import { useEffect, useState } from "react";
import Button from "./Button";

export default function Timer({ seconds = 45 }) {
  const [left, setLeft] = useState(seconds);

  useEffect(() => {
    if (left <= 0) return;
    const id = setInterval(() => setLeft((v) => v - 1), 1000);
    return () => clearInterval(id);
  }, [left > 0]);

  return (
    <div style={{ padding: "0.85rem 1.2rem", borderRadius: "10px", border: "1px solid #00f3ff", background: "rgba(0, 243, 255, 0.06)", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem", marginBottom: "1.5rem" }}>
      <span>🔥 Неоновая распродажа <strong>OnShop</strong> закончится через: <strong style={{ color: "#00f3ff" }}>{left} сек.</strong></span>
      <Button variant="secondary" onClick={() => setLeft(seconds)}>Сброс</Button>
    </div>
  );
}
"@

# 11. Home.jsx
Set-Content -Path "src\pages\Home.jsx" -Value @"
import { Link } from "react-router-dom";
import Card from "../components/Card";
import List from "../components/List";
import Button from "../components/Button";
import Timer from "../components/Timer";
import styles from "../App.module.css";

export default function Home() {
  const features = [
    "Мгновенная доставка кибер-гаджетов по всему Казахстану",
    "Гарантия 24 месяца на всю неоновую периферию",
    "Оплата картой, Kaspi QR или криптовалютой"
  ];

  return (
    <div>
      <Timer seconds={45} />
      <section style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "2.2rem", marginBottom: "0.5rem" }}>
          Добро пожаловать в <span style={{ color: "#00f3ff" }}>OnShop</span>
        </h1>
        <p style={{ color: "#9499b7", marginBottom: "1.2rem" }}>
          Онлайн-магазин футуристичной электроники, периферии и неоновых аксессуаров.
        </p>
        <Link to="/list"><Button label="Перейти в каталог товаров →" /></Link>
      </section>

      <div className={styles.grid} style={{ marginBottom: "2rem" }}>
        <Card badge="ХИТ" title="Периферия Pro-уровня" description="Механические клавиатуры и беспроводные мыши." />
        <Card badge="НОВИНКА" title="Атмосфера и свет" description="Неоновые LED-коврики и подсветка для рабочего стола." />
        <Card badge="СКИДКА" title="Клуб OnShop" description="Добавляйте товары в избранное и оформляйте заказ за 30 секунд." />
      </div>

      <Card title="Преимущества OnShop" description="" footer={<List items={features} />} />
    </div>
  );
}
"@

# 12. Catalog.jsx
Set-Content -Path "src\pages\Catalog.jsx" -Value @"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useApp } from "../store/AppContext";
import Card from "../components/Card";
import Button from "../components/Button";
import styles from "../App.module.css";

const API_URL = "http://localhost:3001/api/items";

export default function Catalog() {
  const { favorites, toggleFavorite } = useApp();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all");
  const [newTitle, setNewTitle] = useState("");
  const [newPrice, setNewPrice] = useState("");

  async function fetchItems() {
    try {
      setLoading(true);
      setError("");
      const res = await axios.get(API_URL);
      setItems(res.data);
    } catch {
      setError("Ошибка подключения к серверу. Убедитесь, что запущен node server.js");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { fetchItems(); }, []);

  async function handleAdd(e) {
    e.preventDefault();
    if (!newTitle.trim()) return;
    const res = await axios.post(API_URL, { title: newTitle.trim(), price: Number(newPrice) || 19900 });
    setItems((prev) => [...prev, res.data]);
    setNewTitle("");
    setNewPrice("");
  }

  async function handleDelete(id) {
    await axios.delete(`${API_URL}/${id}`);
    setItems((prev) => prev.filter((item) => item.id !== id));
  }

  const visible = items.filter((item) => {
    if (filter === "inStock") return item.inStock;
    if (filter === "favorites") return favorites.includes(item.id);
    return true;
  });

  if (loading) return <p style={{ color: "#00f3ff" }}>⏳ Загрузка каталога OnShop...</p>;
  if (error) return (
    <div>
      <p style={{ color: "#ff2a85", marginBottom: "1rem" }}>{error}</p>
      <Button onClick={fetchItems}>Повторить</Button>
    </div>
  );

  return (
    <div>
      <h1 style={{ marginBottom: "1rem" }}>Каталог OnShop</h1>
      <form onSubmit={handleAdd} style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", marginBottom: "1.5rem" }}>
        <input placeholder="Название товара..." value={newTitle} onChange={(e) => setNewTitle(e.target.value)} style={{ padding: "0.6rem", borderRadius: "8px", border: "1px solid #b026ff", background: "#0f101d", color: "#fff", flex: "1 1 220px" }} />
        <input type="number" placeholder="Цена (₸)" value={newPrice} onChange={(e) => setNewPrice(e.target.value)} style={{ padding: "0.6rem", borderRadius: "8px", border: "1px solid #b026ff", background: "#0f101d", color: "#fff", width: "140px" }} />
        <Button type="submit">+ Добавить товар</Button>
      </form>

      <div style={{ display: "flex", gap: "0.6rem", marginBottom: "1.5rem" }}>
        <Button variant={filter === "all" ? "primary" : "secondary"} onClick={() => setFilter("all")}>Все ({items.length})</Button>
        <Button variant={filter === "inStock" ? "primary" : "secondary"} onClick={() => setFilter("inStock")}>В наличии</Button>
        <Button variant={filter === "favorites" ? "primary" : "secondary"} onClick={() => setFilter("favorites")}>Избранное ({favorites.length})</Button>
      </div>

      {items.length === 0 ? <p>Список пуст.</p> : visible.length === 0 ? <p>Ничего не найдено по фильтру.</p> : (
        <div className={styles.grid}>
          {visible.map((item) => (
            <Card
              key={item.id}
              badge={`${item.category} • ${item.inStock ? "В наличии" : "Под заказ"}`}
              title={item.title}
              description={`${item.description} — ${item.price.toLocaleString()} ₸`}
              footer={
                <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginTop: "0.5rem" }}>
                  <Link to={`/list/${item.id}`}><Button>Подробнее</Button></Link>
                  <Button variant="secondary" onClick={() => toggleFavorite(item.id)}>
                    {favorites.includes(item.id) ? "★" : "☆"}
                  </Button>
                  <Button variant="secondary" onClick={() => handleDelete(item.id)}>🗑</Button>
                </div>
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}
"@

# 13. Details.jsx
Set-Content -Path "src\pages\Details.jsx" -Value @"
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Card from "../components/Card";
import Button from "../components/Button";

export default function Details() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:3001/api/items/${id}`)
      .then((res) => setItem(res.data))
      .catch(() => setError("Товар не найден"));
  }, [id]);

  if (error) return <div><p style={{ color: "#ff2a85" }}>{error}</p><Link to="/list"><Button variant="secondary">← В каталог</Button></Link></div>;
  if (!item) return <p>Загрузка...</p>;

  return (
    <div style={{ maxWidth: "650px", margin: "0 auto" }}>
      <Card
        badge={`ID #${item.id} | ${item.category}`}
        title={item.title}
        description={item.description}
        footer={
          <div style={{ marginTop: "1rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <strong style={{ fontSize: "1.4rem", color: "#00f3ff" }}>{item.price.toLocaleString()} ₸</strong>
            <div style={{ display: "flex", gap: "0.75rem" }}>
              <Link to="/order"><Button>Купить</Button></Link>
              <Link to="/list"><Button variant="secondary">← Назад</Button></Link>
            </div>
          </div>
        }
      />
    </div>
  );
}
"@

# 14. OrderForm.jsx
Set-Content -Path "src\pages\OrderForm.jsx" -Value @"
import { useState } from "react";
import Button from "../components/Button";

export default function OrderForm() {
  const [form, setForm] = useState({ fullName: "", email: "", phone: "", address: "" });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const onChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  function validate(v) {
    const err = {};
    if (!v.fullName.trim()) err.fullName = "Укажите ФИО";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) err.email = "Некорректный email";
    if (v.phone.trim().length < 10) err.phone = "Минимум 10 цифр";
    if (v.address.trim().length < 6) err.address = "Укажите адрес доставки";
    return err;
  }

  function onSubmit(e) {
    e.preventDefault();
    const err = validate(form);
    setErrors(err);
    if (Object.keys(err).length > 0) return;
    setSent(true);
    setForm({ fullName: "", email: "", phone: "", address: "" });
  }

  const inputStyle = { width: "100%", padding: "0.65rem", marginTop: "0.35rem", borderRadius: "8px", border: "1px solid #b026ff", background: "#0f101d", color: "#fff" };

  return (
    <div style={{ maxWidth: "500px", margin: "0 auto" }}>
      <h1 style={{ marginBottom: "1rem" }}>Оформление заказа OnShop</h1>
      <form onSubmit={onSubmit} noValidate style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <label>ФИО <input name="fullName" value={form.fullName} onChange={onChange} style={inputStyle} />
          {errors.fullName && <p style={{ color: "#ff2a85", fontSize: "0.85rem" }}>{errors.fullName}</p>}</label>
        <label>Email <input name="email" value={form.email} onChange={onChange} style={inputStyle} />
          {errors.email && <p style={{ color: "#ff2a85", fontSize: "0.85rem" }}>{errors.email}</p>}</label>
        <label>Телефон <input name="phone" value={form.phone} onChange={onChange} style={inputStyle} />
          {errors.phone && <p style={{ color: "#ff2a85", fontSize: "0.85rem" }}>{errors.phone}</p>}</label>
        <label>Адрес <input name="address" value={form.address} onChange={onChange} style={inputStyle} />
          {errors.address && <p style={{ color: "#ff2a85", fontSize: "0.85rem" }}>{errors.address}</p>}</label>
        <Button type="submit">Подтвердить заказ</Button>
        {sent && <p style={{ color: "#00f3ff", fontWeight: 600 }}>✅ Заказ в OnShop оформлен!</p>}
      </form>
    </div>
  );
}
"@

# 15. NotFound.jsx
Set-Content -Path "src\pages\NotFound.jsx" -Value @"
import { Link } from "react-router-dom";
import Button from "../components/Button";

export default function NotFound() {
  return (
    <div style={{ textAlign: "center", padding: "3rem 1rem" }}>
      <h1 style={{ fontSize: "4rem", color: "#b026ff" }}>404</h1>
      <p style={{ marginBottom: "1.5rem", color: "#9499b7" }}>Страница в OnShop не найдена.</p>
      <Link to="/"><Button>На главную</Button></Link>
    </div>
  );
}
"@

# 16. App.module.css
Set-Content -Path "src\App.module.css" -Value @"
.page { min-height: 100vh; display: flex; flex-direction: column; }
.contrast { filter: contrast(1.12) saturate(1.2); }
.main { max-width: 1140px; width: 100%; margin: 0 auto; padding: 2rem 1.25rem; flex: 1; }
.grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1.25rem; }
@media (max-width: 900px) { .grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
@media (max-width: 600px) { .grid { grid-template-columns: 1fr; } }
"@

# 17. App.jsx
Set-Content -Path "src\App.jsx" -Value @"
import { Routes, Route } from "react-router-dom";
import { useApp } from "./store/AppContext";
import Header from "./components/Header";
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import Details from "./pages/Details";
import OrderForm from "./pages/OrderForm";
import NotFound from "./pages/NotFound";
import styles from "./App.module.css";

export default function App() {
  const { theme } = useApp();
  return (
    <div className={`${styles.page} ${theme === "cyber-contrast" ? styles.contrast : ""}`}>
      <Header title="OnShop" subtitle="Neon Cyber Store | ПЖ 1–10" />
      <main className={styles.main}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/list" element={<Catalog />} />
          <Route path="/list/:id" element={<Details />} />
          <Route path="/order" element={<OrderForm />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}
"@

# 18. main.jsx
Set-Content -Path "src\main.jsx" -Value @"
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AppProvider } from "./store/AppContext";
import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AppProvider>
  </StrictMode>
);
"@

Set-Location ..
Write-Host "Готово! Все файлы и папки успешно созданы." -ForegroundColor Green