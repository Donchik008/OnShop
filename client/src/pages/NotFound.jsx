import { Link } from "react-router-dom";
import Button from "../components/Button";

export default function NotFound() {
  return (
    <div style={{ textAlign: "center", padding: "3rem 1rem" }}>
      <h1 style={{ fontSize: "4rem", color: "#b026ff" }}>404</h1>
      <p style={{ marginBottom: "1.5rem", color: "#9499b7" }}>
        Страница в OnShop не найдена.
      </p>
      <Link to="/">
        <Button>На главную</Button>
      </Link>
    </div>
  );
}