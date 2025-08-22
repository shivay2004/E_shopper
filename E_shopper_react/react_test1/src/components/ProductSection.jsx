import React, { useEffect, useState } from "react";
import styles from "../css/ProductSection.module.css";
import ProductCard from "./ProductCard";

export default function ProductSection({ title }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/prod-card")
      .then((res) => res.json())
      .then((data) => setProducts(data.slice(0, 8)))
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  return (
    <div style={{ paddingTop: "5rem" }}>
      <h2 className={styles.centerText}>{title}</h2>
      <div className={styles.grid}>
        {products.map((prod) => (
          <ProductCard key={prod.id} product={prod} />
        ))}
      </div>
    </div>
  );
}
