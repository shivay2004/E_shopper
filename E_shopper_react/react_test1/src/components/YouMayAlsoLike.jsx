import { useEffect, useRef, useState } from "react";
import styles from "../css/YouMayAlsoLike.module.css";
import ImgCard from "./ProductCard";

export default function YouMayAlsoLike() {
  const [cards, setCards] = useState([]);
  const [index, setIndex] = useState(0);
  const beltRef = useRef(null);

  useEffect(() => {
    fetch("http://localhost:3000/prod-card")
      .then((res) => res.json())
      .then((data) => setCards(data));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % cards.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [cards]);

  useEffect(() => {
    if (beltRef.current) {
      beltRef.current.style.transform = `translateX(-${index * 25}%)`;
    }
  }, [index]);

  return (
    <div className={styles.sliderDetail}>
      <h2 className={styles.centerText}>You May Also Like</h2>
      <div className={styles.sliderWindow}>
        <div className={styles.imgBelt} ref={beltRef}>
          {cards.map((card) => (
            <div key={card.id} className={styles.imgCard}>
              <ImgCard product={card} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
