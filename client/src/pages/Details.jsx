import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { useApp } from "../store/AppContext";
import Card from "../components/Card";
import Button from "../components/Button";

export default function Details() {
  const { id } = useParams();
  const { addToCart } = useApp();
  const [item, setItem] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/items/${id}`)
      .then((res) => setItem(res.data))
      .catch(() => setError("Товар не найден"));
  }, [id]);

  if (error) {
    return (
      <div>
        <p style={{ color: "#ff2a85", marginBottom: "1rem" }}>{error}</p>
        <Link to="/list">
          <Button variant="secondary">← В каталог</Button>
        </Link>
      </div>
    );
  }

  if (!item) return <p>Загрузка...</p>;

  return (
    <div style={{ maxWidth: "680px", margin: "0 auto" }}>
      <Card
        image={item.image}
        badge={`ID #${item.id} | ${item.category} | ⭐ ${item.rating || 5.0}`}
        title={item.title}
        description={item.description}
        price={item.price}
        footer={
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            <Button onClick={() => addToCart(item)}>🛒 Добавить в корзину</Button>
            <Link to="/order">
              <Button variant="secondary">Оформить заказ</Button>
            </Link>
            <Link to="/list">
              <Button variant="secondary">← Назад</Button>
            </Link>
          </div>
        }
      />
    </div>
  );
}