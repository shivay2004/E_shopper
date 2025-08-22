import React, { useEffect, useRef } from "react";
import styles from "../../../css/VendorCarousel.module.css";

const images = [
  "src/img/vendor-1.jpg",
  "src/img/vendor-2.jpg",
  "src/img/vendor-3.jpg",
  "src/img/vendor-4.jpg",
  "src/img/vendor-5.jpg",
  "src/img/vendor-6.jpg",
  "src/img/vendor-7.jpg",
  "src/img/vendor-8.jpg",
  "src/img/vendor-1.jpg",
  "src/img/vendor-2.jpg",
  "src/img/vendor-3.jpg",
  "src/img/vendor-4.jpg",
  "src/img/vendor-5.jpg",
  "src/img/vendor-6.jpg",
  "src/img/vendor-7.jpg",
  "src/img/vendor-8.jpg",
];

function VendorCarousel() {
  const trackRef = useRef(null);
  let currentIndex = 0;

  useEffect(() => {
    const slide = () => {
      if (!trackRef.current) return;
      currentIndex = (currentIndex + 1) % 8;
      const shift = currentIndex * 150;
      Array.from(trackRef.current.children).forEach((img, i) => {
        img.style.transform = `translateX(-${shift}px)`;
      });
    };

    const interval = setInterval(slide, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.carousel}>
      <div className={styles.track} ref={trackRef}>
        {images.map((img, idx) => (
          <img key={idx} src={img} alt="vendor" className={styles.slide} />
        ))}
      </div>
    </div>
  );
}

export default VendorCarousel;
