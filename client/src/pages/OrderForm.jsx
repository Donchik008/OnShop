import { useState } from "react";
import Button from "../components/Button";

export default function OrderForm() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: ""
  });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const onChange = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  function validate(v) {
    const err = {};
    if (!v.fullName.trim()) err.fullName = "Укажите ФИО";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email))
      err.email = "Некорректный email";
    if (v.phone.trim().length < 10) err.phone = "Минимум 10 цифр";
    if (v.address.trim().length < 6) err.address = "Укажите адрес доставки";
    return err;
  }

  function onSubmit(e) {
    e.preventDefault();
    const err = validate(form);
    setErrors(err);
    if (Object.keys(err).length > 0) return;
    setSent(true);
    setForm({ fullName: "", email: "", phone: "", address: "" });
  }

  const inputStyle = {
    width: "100%",
    padding: "0.65rem",
    marginTop: "0.35rem",
    borderRadius: "8px",
    border: "1px solid #b026ff",
    background: "#0f101d",
    color: "#fff"
  };

  return (
    <div style={{ maxWidth: "500px", margin: "0 auto" }}>
      <h1 style={{ marginBottom: "1rem" }}>Оформление заказа OnShop</h1>
      <form
        onSubmit={onSubmit}
        noValidate
        style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
      >
        <label>
          ФИО{" "}
          <input
            name="fullName"
            value={form.fullName}
            onChange={onChange}
            style={inputStyle}
          />
          {errors.fullName && (
            <p style={{ color: "#ff2a85", fontSize: "0.85rem" }}>
              {errors.fullName}
            </p>
          )}
        </label>
        <label>
          Email{" "}
          <input
            name="email"
            value={form.email}
            onChange={onChange}
            style={inputStyle}
          />
          {errors.email && (
            <p style={{ color: "#ff2a85", fontSize: "0.85rem" }}>
              {errors.email}
            </p>
          )}
        </label>
        <label>
          Телефон{" "}
          <input
            name="phone"
            value={form.phone}
            onChange={onChange}
            style={inputStyle}
          />
          {errors.phone && (
            <p style={{ color: "#ff2a85", fontSize: "0.85rem" }}>
              {errors.phone}
            </p>
          )}
        </label>
        <label>
          Адрес{" "}
          <input
            name="address"
            value={form.address}
            onChange={onChange}
            style={inputStyle}
          />
          {errors.address && (
            <p style={{ color: "#ff2a85", fontSize: "0.85rem" }}>
              {errors.address}
            </p>
          )}
        </label>
        <Button type="submit">Подтвердить заказ</Button>
        {sent && (
          <p style={{ color: "#00f3ff", fontWeight: 600 }}>
            ✅ Заказ в OnShop оформлен!
          </p>
        )}
      </form>
    </div>
  );
}