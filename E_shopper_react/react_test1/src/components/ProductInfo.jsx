import React from "react";
import QuantityCounter from "./QuantityCounter";
import SocialLinks from "./headerfiles/SocialLinks";
import styles from "../css/ProductInfo.module.css";

export default function ProductInfo({
  name,
  price,
  sizes = [],
  colors = [],
  quantity,
  setQuantity,
  selectedSize,
  setSelectedSize,
  selectedColor,
  setSelectedColor,
  handleAddToCart,
}) {
  return (
    <div className={styles.productInformation}>
      <h1>{name}</h1>

      <p className={styles.ratingProdInfo}>
        <i className="fa-solid fa-star" />
        <i className="fa-solid fa-star" />
        <i className="fa-solid fa-star" />
        <i className="fa-solid fa-star-half-stroke" />
        <i className="fa-regular fa-star" />
      </p>

      <h2>${price}.00</h2>

      <p className={styles.fillerTextDetails}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde rerum
        dolore animi placeat. Odio doloribus impedit ab, quis quaerat amet
        veritatis quas...
      </p>

      <div className={styles.sizeOptions}>
        <p>Sizes: </p>
        <form>
          {sizes.map((size) => (
            <label key={size}>
              <input
                type="radio"
                name="size"
                value={size}
                checked={selectedSize === size}
                onChange={() => setSelectedSize(size)}
              />
              {size}
            </label>
          ))}
        </form>
      </div>

      <div className={styles.colorOptions}>
        <p>Colors: </p>
        <form>
          {colors.map((color) => (
            <label key={color}>
              <input
                type="radio"
                name="color"
                value={color}
                checked={selectedColor === color}
                onChange={() => setSelectedColor(color)}
              />
              {color}
            </label>
          ))}
        </form>
      </div>

      <div className={styles.horizontalButtons}>
        <QuantityCounter
          quantity={quantity}
          onIncrement={() => setQuantity((q) => q + 1)}
          onDecrement={() => setQuantity((q) => Math.max(1, q - 1))}
        />
        <button className={styles.addToCart} onClick={handleAddToCart}>
          <i className="fa-solid fa-shopping-cart" /> Add To Cart
        </button>
      </div>

      <div className={styles.icon}>
        Share on: <SocialLinks />
      </div>
    </div>
  );
}
