import React from "react";
import styles from "../css/QuantityCounter.module.css";

function QuantityCounter({ quantity, onIncrement, onDecrement }) {
  return (
    <div className={styles.horizontalButtons}>
      <div className={`${styles.quantityCounter} ${styles.counterDetail}`}>
        <button onClick={onDecrement}>
          <i className="fa-solid fa-minus"></i>
        </button>
        <input
          type="text"
          readOnly
          value={quantity}
          name="quantity"
          id="quantityCounter"
        />
        <button onClick={onIncrement}>
          <i className="fa-solid fa-plus"></i>
        </button>
      </div>
    </div>
  );
}

export default QuantityCounter;
