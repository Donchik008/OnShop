import { Link } from "react-router-dom";
import { useApp } from "../store/AppContext";
import Button from "../components/Button";
import Card from "../components/Card";
import styles from "../App.module.css";

export default function Cart() {
  const { cart, removeFromCart, clearCart } = useApp();
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div>
      <h1 style={{ marginBottom: "1.5rem" }}>Корзина кибер-товаров</h1>
      {cart.length === 0 ? (
        <div>
          <p style={{ color: "#9499b7", marginBottom: "1rem" }}>Ваша корзина пуста.</p>
          <Link to="/list"><Button>Перейти в каталог</Button></Link>
        </div>
      ) : (
        <div>
          <div className={styles.grid} style={{ marginBottom: "2rem" }}>
            {cart.map((item) => (
              <Card
                key={item.id}
                badge={`Количество: ${item.qty} шт.`}
                title={item.title}
                description={`Цена за шт: ${item.price.toLocaleString()} ₸\nИтого: ${(item.price * item.qty).toLocaleString()} ₸`}
                footer={
                  <Button variant="secondary" onClick={() => removeFromCart(item.id)}>
                    Удалить из корзины
                  </Button>
                }
              />
            ))}
          </div>

          <div style={{ background: "#0f101d", padding: "1.5rem", borderRadius: "12px", border: "1px solid #b026ff", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <h3 style={{ color: "#00f3ff" }}>Общая сумма заказа:</h3>
              <p style={{ fontSize: "1.6rem", fontWeight: "bold" }}>{totalPrice.toLocaleString()} ₸</p>
            </div>
            <div style={{ display: "flex", gap: "1rem" }}>
              <Button variant="secondary" onClick={clearCart}>Очистить корзину</Button>
              <Link to="/order"><Button>Оформить заказ →</Button></Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}   