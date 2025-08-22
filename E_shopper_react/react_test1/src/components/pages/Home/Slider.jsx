import React, { useState } from "react";
import styles from "../../../css/Slider.module.css";

const slides = [
  {
    img: "src/img/carousel-1.jpg",
    title: "Reasonable Price",
    subtitle: "10% off on your first order",
  },
  {
    img: "src/img/carousel-2.jpg",
    title: "Fashionable Dress",
    subtitle: "10% off on your first order",
  },
];

function Slider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className={styles.slider}>
      <div className={styles.sliderImages}>
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`${styles.slide} ${
              index === currentIndex ? styles.active : ""
            }`}
          >
            <img src={slide.img} alt={slide.title} />
            <div className={styles.overlay}>
              <h2>{slide.subtitle}</h2>
              <h1>{slide.title}</h1>
              <button className={styles.shopb}>Shop Now</button>
            </div>
          </div>
        ))}
      </div>

      <button className={`${styles.button} ${styles.left}`} onClick={prevSlide}>
        <i className="fa-solid fa-chevron-left"></i>
      </button>
      <button
        className={`${styles.button} ${styles.right}`}
        onClick={nextSlide}
      >
        <i className="fa-solid fa-chevron-right"></i>
      </button>
    </div>
  );
}

export default Slider;
