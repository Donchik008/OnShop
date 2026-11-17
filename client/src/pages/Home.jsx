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
        <Link to="/list">
          <Button label="Перейти в каталог товаров →" />
        </Link>
      </section>

      <div className={styles.grid} style={{ marginBottom: "2rem" }}>
        <Card
          badge="ХИТ"
          title="Периферия Pro-уровня"
          description="Механические клавиатуры и беспроводные мыши."
        />
        <Card
          badge="НОВИНКА"
          title="Атмосфера и свет"
          description="Неоновые LED-коврики и подсветка для рабочего стола."
        />
        <Card
          badge="СКИДКА"
          title="Клуб OnShop"
          description="Добавляйте товары в избранное и оформляйте заказ за 30 секунд."
        />
      </div>

      <Card
        title="Преимущества OnShop"
        description=""
        footer={<List items={features} />}
      />
    </div>
  );
}