import { useApp } from "../store/AppContext";
import Card from "../components/Card";
import Button from "../components/Button";

export default function Profile() {
  const { user, setUser, favorites } = useApp();

  function upgradeRole() {
    setUser((prev) => ({ ...prev, role: "Elite Cyber Hacker", balance: prev.balance + 50000 }));
    alert("Статус повышен! Вам начислено +50,000 ₸ бонусов!");
  }

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto" }}>
      <h1 style={{ marginBottom: "1.5rem" }}>Личный кабинет OnShop</h1>
      <Card
        badge={`Роль: ${user.role}`}
        title={`Имя: ${user.name}`}
        description={`Ваш баланс: ${user.balance.toLocaleString()} ₸\nИзбранных товаров: ${favorites.length} шт.`}
        footer={
          <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
            <Button onClick={upgradeRole}>Получить VIP бонусы</Button>
          </div>
        }
      />
    </div>
  );
}