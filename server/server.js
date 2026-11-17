const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

let items = [
  {
    id: 1,
    title: "CyberDeck Mech Keyboard",
    category: "Периферия",
    price: 45900,
    rating: 4.9,
    inStock: true,
    image: "https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=600&q=80",
    description: "Механическая клавиатура 75% с неоновой фиолетово-голубой подсветкой."
  },
  {
    id: 2,
    title: "NeonPulse Wireless Mouse",
    category: "Периферия",
    price: 28500,
    rating: 4.8,
    inStock: true,
    image: "https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=600&q=80",
    description: "Ультралегкая игровая мышь с сенсором 26000 DPI и RGB-контуром."
  },
  {
    id: 3,
    title: "HoloSound Studio Headset",
    category: "Аудио",
    price: 62000,
    rating: 4.9,
    inStock: true,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80",
    description: "Беспроводная гарнитура с объемным звуком 7.1 и шумоподавлением."
  },
  {
    id: 4,
    title: "Quantum LED Desk Mat",
    category: "Аксессуары",
    price: 12900,
    rating: 4.6,
    inStock: false,
    image: "https://images.unsplash.com/photo-1616588589676-62b3bd4ff6d2?auto=format&fit=crop&w=600&q=80",
    description: "Большой коврик с голубой неоновой окантовкой по периметру."
  },
  {
    id: 5,
    title: "Vortex UltraWide Monitor 34\"",
    category: "Мониторы",
    price: 249000,
    rating: 5.0,
    inStock: true,
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=600&q=80",
    description: "Изогнутый OLED-монитор 180 Гц с глубоким черным цветом."
  },
  {
    id: 6,
    title: "Matrix Gaming Chair RGB",
    category: "Мебель",
    price: 115000,
    rating: 4.7,
    inStock: true,
    image: "https://images.unsplash.com/photo-1598550476439-6847785fcea6?auto=format&fit=crop&w=600&q=80",
    description: "Эргономичное кибер-кресло с поддержкой поясницы и подсветкой."
  },
  {
    id: 7,
    title: "Cyberpunk Hoodie Neon",
    category: "Одежда",
    price: 24000,
    rating: 4.5,
    inStock: true,
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=600&q=80",
    description: "Оверсайз худи из плотного черного хлопка с рефлективным принтом."
  },
  {
    id: 8,
    title: "Neural Link TWS Earbuds",
    category: "Аудио",
    price: 35000,
    rating: 4.6,
    inStock: true,
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=600&q=80",
    description: "Беспроводные наушники в прозрачном кейсе с неоновым индикатором."
  },
  {
    id: 9,
    title: "Plasma Streamer Microphone",
    category: "Аудио",
    price: 49000,
    rating: 4.8,
    inStock: true,
    image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=600&q=80",
    description: "Студийный конденсаторный USB-микрофон с антивибрационным подвесом."
  },
  {
    id: 10,
    title: "Titanium Laptop Stand",
    category: "Аксессуары",
    price: 15500,
    rating: 4.8,
    inStock: true,
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=600&q=80",
    description: "Алюминиевая подставка с охлаждением для игровых ноутбуков."
  },
  {
    id: 11,
    title: "Stellar 4K AI Webcam",
    category: "Периферия",
    price: 42000,
    rating: 4.4,
    inStock: false,
    image: "https://images.unsplash.com/photo-1587826080692-f439cd0b70da?auto=format&fit=crop&w=600&q=80",
    description: "Веб-камера Ultra HD 60 FPS с кольцевой подсветкой и автофокусом."
  },
  {
    id: 12,
    title: "Neon Strip 5m Smart RGB",
    category: "Освещение",
    price: 9900,
    rating: 4.9,
    inStock: true,
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=600&q=80",
    description: "Умная неоновая лента с синхронизацией под музыку и игры."
  },
  {
    id: 13,
    title: "HyperDrive NVMe SSD 2TB",
    category: "Комплектующие",
    price: 79000,
    rating: 5.0,
    inStock: true,
    image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=600&q=80",
    description: "Сверхбыстрый накопитель PCIe 4.0 со скоростью чтения 7400 МБ/с."
  },
  {
    id: 14,
    title: "Quantum Power Bank 100W",
    category: "Аксессуары",
    price: 29000,
    rating: 4.7,
    inStock: true,
    image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?auto=format&fit=crop&w=600&q=80",
    description: "Внешний аккумулятор 30000 мАч с OLED-дисплеем мощности."
  },
  {
    id: 15,
    title: "Holo-Projector Galaxy Lamp",
    category: "Освещение",
    price: 21000,
    rating: 4.6,
    inStock: true,
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80",
    description: "Лазерный проектор туманностей в фиолетово-голубых тонах."
  },
  {
    id: 16,
    title: "RTX CyberCore GPU Backplate",
    category: "Комплектующие",
    price: 18500,
    rating: 4.7,
    inStock: true,
    image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=600&q=80",
    description: "Кастомная акриловая пластина для видеокарты с гравировкой OnShop."
  },
  {
    id: 17,
    title: "Phantom Wireless Gamepad",
    category: "Периферия",
    price: 34500,
    rating: 4.8,
    inStock: true,
    image: "https://images.unsplash.com/photo-1592840496694-26d035b52b48?auto=format&fit=crop&w=600&q=80",
    description: "Геймпад с датчиками Холла и полупрозрачным корпусом."
  },
  {
    id: 18,
    title: "Aether VR Headset Pro",
    category: "Гаджеты",
    price: 215000,
    rating: 4.9,
    inStock: true,
    image: "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?auto=format&fit=crop&w=600&q=80",
    description: "Шлем виртуальной реальности с дисплеями 4K на каждый глаз."
  },
  {
    id: 19,
    title: "Chrono Smart Watch Cyber",
    category: "Гаджеты",
    price: 54000,
    rating: 4.6,
    inStock: true,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80",
    description: "Смарт-часы в титановом корпусе с AMOLED-экраном."
  },
  {
    id: 20,
    title: "Flux Liquid Cooler 360mm",
    category: "Комплектующие",
    price: 68000,
    rating: 4.9,
    inStock: false,
    image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=600&q=80",
    description: "Система жидкостного охлаждения процессора с экраном на помпе."
  },
  {
    id: 21,
    title: "Nova Portable Mini Speaker",
    category: "Аудио",
    price: 19500,
    rating: 4.5,
    inStock: true,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=600&q=80",
    description: "Компактная Bluetooth-колонка с пульсирующей неоновой подсветкой."
  }
];

let nextId = 22;

app.get("/api/items", (req, res) => res.json(items));

app.get("/api/items/:id", (req, res) => {
  const item = items.find((x) => x.id === Number(req.params.id));
  if (!item) return res.status(404).json({ error: "Товар не найден" });
  res.json(item);
});

app.post("/api/items", (req, res) => {
  const { title, category, price, description, image, inStock } = req.body || {};
  if (!title) return res.status(400).json({ error: "Название обязательно" });
  const newItem = {
    id: nextId++,
    title,
    category: category || "Гаджеты",
    price: Number(price) || 19900,
    rating: 5.0,
    inStock: inStock !== undefined ? Boolean(inStock) : true,
    image: image || "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80",
    description: description || "Новый товар в каталоге OnShop."
  };
  items.push(newItem);
  res.status(201).json(newItem);
});

app.delete("/api/items/:id", (req, res) => {
  items = items.filter((x) => x.id !== Number(req.params.id));
  res.status(204).end();
});

app.listen(PORT, () => console.log(`OnShop API запущен: http://localhost:${PORT}/api/items`));