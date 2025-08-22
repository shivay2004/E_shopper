import { useState } from "react";
import styles from "../css/ImageSlider.module.css";

export default function ImageSlider({ images = [] }) {
  const [index, setIndex] = useState(0);

  const prev = () => {
    setIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const next = () => {
    setIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <div className={styles.sliderContainer}>
      <div
        className={styles.sliderTrack}
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {images.map((img, i) => (
          <img key={i} src={img} alt={`slide-${i}`} className={styles.slide} />
        ))}
      </div>

      <div className={styles.prevBtn} onClick={prev}>
        <i className="fa-solid fa-chevron-left" />
      </div>
      <div className={styles.nextBtn} onClick={next}>
        <i className="fa-solid fa-chevron-right" />
      </div>
    </div>
  );
}
