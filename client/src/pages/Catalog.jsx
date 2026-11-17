import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useApp } from "../store/AppContext";
import Card from "../components/Card";
import Button from "../components/Button";
import styles from "../App.module.css";

const API_URL = "http://localhost:3001/api/items";

export default function Catalog() {
  const { favorites, toggleFavorite, addToCart } = useApp();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("default");

  const [newTitle, setNewTitle] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newCat, setNewCat] = useState("Периферия");
  const [newImage, setNewImage] = useState("");

  async function fetchItems() {
    try {
      setLoading(true);
      setError("");
      const res = await axios.get(API_URL);
      setItems(res.data);
    } catch {
      setError("Ошибка загрузки данных. Проверьте, запущен ли node server.js");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchItems();
  }, []);

  async function handleAdd(e) {
    e.preventDefault();
    if (!newTitle.trim()) return;
    const res = await axios.post(API_URL, {
      title: newTitle.trim(),
      price: Number(newPrice) || 19900,
      category: newCat,
      image: newImage.trim() || undefined,
      description: "Добавлено через каталог OnShop."
    });
    setItems((prev) => [...prev, res.data]);
    setNewTitle("");
    setNewPrice("");
    setNewImage("");
  }

  const categories = ["all", ...new Set(items.map((i) => i.category))];

  const visible = items
    .filter((item) => {
      const matchCat = category === "all" || item.category === category;
      const matchSearch = item.title.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    })
    .sort((a, b) => {
      if (sortOrder === "asc") return a.price - b.price;
      if (sortOrder === "desc") return b.price - a.price;
      return 0;
    });

  if (loading) return <p style={{ color: "#00f3ff" }}>⏳ Загрузка каталога OnShop...</p>;
  if (error) return <p style={{ color: "#ff2a85" }}>{error}</p>;

  const inputStyle = {
    padding: "0.55rem",
    borderRadius: "8px",
    background: "#07070d",
    color: "#fff",
    border: "1px solid #b026ff"
  };

  return (
    <div>
      <h1 style={{ marginBottom: "1rem" }}>Каталог товаров OnShop ({items.length})</h1>

      {/* Добавление нового товара с картинкой */}
      <form
        onSubmit={handleAdd}
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "0.65rem",
          marginBottom: "1.5rem",
          background: "#0f101d",
          padding: "1rem",
          borderRadius: "12px",
          border: "1px solid rgba(176,38,255,0.35)"
        }}
      >
        <input
          placeholder="Название товара..."
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          style={{ ...inputStyle, flex: "1 1 180px" }}
        />
        <input
          type="number"
          placeholder="Цена ₸"
          value={newPrice}
          onChange={(e) => setNewPrice(e.target.value)}
          style={{ ...inputStyle, width: "120px" }}
        />
        <input
          placeholder="URL картинки (необязательно)"
          value={newImage}
          onChange={(e) => setNewImage(e.target.value)}
          style={{ ...inputStyle, flex: "1 1 200px" }}
        />
        <select value={newCat} onChange={(e) => setNewCat(e.target.value)} style={inputStyle}>
          <option value="Периферия">Периферия</option>
          <option value="Аудио">Аудио</option>
          <option value="Аксессуары">Аксессуары</option>
          <option value="Мониторы">Мониторы</option>
          <option value="Освещение">Освещение</option>
          <option value="Комплектующие">Комплектующие</option>
          <option value="Гаджеты">Гаджеты</option>
        </select>
        <Button type="submit">+ Добавить</Button>
      </form>

      {/* Поиск и сортировка */}
      <div style={{ display: "flex", gap: "0.75rem", marginBottom: "1rem", flexWrap: "wrap" }}>
        <input
          placeholder="🔍 Поиск по названию..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ ...inputStyle, borderColor: "#00f3ff", flex: "1 1 240px" }}
        />
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          style={{ ...inputStyle, borderColor: "#00f3ff" }}
        >
          <option value="default">Сортировка: по умолчанию</option>
          <option value="asc">Сначала дешевле</option>
          <option value="desc">Сначала дороже</option>
        </select>
      </div>

      {/* Фильтр категорий */}
      <div style={{ display: "flex", gap: "0.45rem", flexWrap: "wrap", marginBottom: "1.5rem" }}>
        {categories.map((cat) => (
          <Button
            key={cat}
            variant={category === cat ? "primary" : "secondary"}
            onClick={() => setCategory(cat)}
          >
            {cat === "all" ? "Все категории" : cat}
          </Button>
        ))}
      </div>

      {visible.length === 0 ? (
        <p>Товары не найдены.</p>
      ) : (
        <div className={styles.grid}>
          {visible.map((item) => (
            <Card
              key={item.id}
              image={item.image}
              badge={`${item.category} • ⭐ ${item.rating || 5.0}`}
              title={item.title}
              description={item.description}
              price={item.price}
              footer={
                <div style={{ display: "flex", gap: "0.45rem", flexWrap: "wrap" }}>
                  <Link to={`/list/${item.id}`}>
                    <Button variant="secondary">👁</Button>
                  </Link>
                  <Button onClick={() => addToCart(item)}>🛒 В корзину</Button>
                  <Button variant="secondary" onClick={() => toggleFavorite(item.id)}>
                    {favorites.includes(item.id) ? "★" : "☆"}
                  </Button>
                </div>
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}