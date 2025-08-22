import React, { useEffect, useState } from "react";
import styles from "../css/BackToTop.module.css";

function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 200);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      className={`${styles.backToTop} ${visible ? styles.show : ""}`}
      onClick={scrollToTop}
    >
      <i className="fa-solid fa-angles-up fa-sharp"></i>
    </button>
  );
}

export default BackToTop;
