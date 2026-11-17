import { Routes, Route } from "react-router-dom";
import { useApp } from "./store/AppContext";
import Header from "./components/Header";
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import Details from "./pages/Details";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import OrderForm from "./pages/OrderForm";
import NotFound from "./pages/NotFound";
import styles from "./App.module.css";

export default function App() {
  const { theme } = useApp();
  return (
    <div className={`${styles.page} ${theme === "cyber-contrast" ? styles.contrast : ""}`}>
      <Header />
      <main className={styles.main}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/list" element={<Catalog />} />
          <Route path="/list/:id" element={<Details />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/order" element={<OrderForm />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}