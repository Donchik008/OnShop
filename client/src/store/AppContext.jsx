import { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [theme, setTheme] = useState("cyber-dark");
  const [user, setUser] = useState({ name: "Кибер-Гость", balance: 150000, role: "VIP" });
  const [favorites, setFavorites] = useState([1, 3]);
  const [cart, setCart] = useState([]); // Корзина товаров

  const toggleTheme = () => setTheme((t) => (t === "cyber-dark" ? "cyber-contrast" : "cyber-dark"));
  
  const toggleFavorite = (id) =>
    setFavorites((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const addToCart = (item) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) => (i.id === item.id ? { ...i, qty: i.qty + 1 } : i));
      }
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  };

  const clearCart = () => setCart([]);

  return (
    <AppContext.Provider value={{ theme, toggleTheme, user, setUser, favorites, toggleFavorite, cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);