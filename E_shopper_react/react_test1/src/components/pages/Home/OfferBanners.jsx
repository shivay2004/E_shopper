import React from "react";
import styles from "../../../css/OfferBanners.module.css";

function OfferBanners() {
  return (
    <div className={styles.offerContainer}>
      <div className={styles.offerBox + " " + styles.left}>
        <img src="src/img/offer-1.png" alt="Spring Collection" />
        <div className={styles.content}>
          <h5>20% off the all order</h5>
          <h1>Spring Collection</h1>
          <a href="#">Shop Now</a>
        </div>
      </div>

      <div className={styles.offerBox + " " + styles.right}>
        <img src="src/img/offer-2.png" alt="Winter Collection" />
        <div className={styles.content}>
          <h5>20% off the all order</h5>
          <h1>Winter Collection</h1>
          <a href="#">Shop Now</a>
        </div>
      </div>
    </div>
  );
}

export default OfferBanners;
