import styles from "./Card.module.css";

export default function Card({ title, description, footer, badge, image, price }) {
  return (
    <article className={styles.card}>
      {image && (
        <div className={styles.imageWrap}>
          <img src={image} alt={title} className={styles.image} loading="lazy" />
        </div>
      )}
      <div className={styles.body}>
        <div>
          {badge && (
            <span style={{ fontSize: "0.75rem", color: "#b026ff", fontWeight: 700 }}>
              {badge}
            </span>
          )}
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.description}>{description}</p>
        </div>
        <div>
          {price !== undefined && (
            <div style={{ fontSize: "1.2rem", fontWeight: 800, color: "#00f3ff", marginBottom: "0.6rem" }}>
              {price.toLocaleString()} ₸
            </div>
          )}
          {footer}
        </div>
      </div>
    </article>
  );
}