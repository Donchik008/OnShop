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
    <div
      style={{
        padding: "0.85rem 1.2rem",
        borderRadius: "10px",
        border: "1px solid #00f3ff",
        background: "rgba(0, 243, 255, 0.06)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "1rem",
        marginBottom: "1.5rem"
      }}
    >
      <span>
        🔥 Неоновая распродажа <strong>OnShop</strong> закончится через:{" "}
        <strong style={{ color: "#00f3ff" }}>{left} сек.</strong>
      </span>
      <Button variant="secondary" onClick={() => setLeft(seconds)}>
        Сброс
      </Button>
    </div>
  );
}