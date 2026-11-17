export default function List({ title, items }) {
  return (
    <section>
      {title && (
        <h2 style={{ marginBottom: "0.75rem", color: "#b026ff" }}>{title}</h2>
      )}
      <ul style={{ paddingLeft: "1.25rem", color: "#f0f4ff" }}>
        {items.map((item, idx) => (
          <li key={item.id ?? idx} style={{ marginBottom: "0.4rem" }}>
            {typeof item === "string" ? item : item.title}
          </li>
        ))}
      </ul>
    </section>
  );
}