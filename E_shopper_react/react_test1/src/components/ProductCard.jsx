import styles from "../css/ProductSection.module.css";
import { useCart } from "../context/CartContext";
import QuantityCounter from "./QuantityCounter";
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  const { cart, addToCart, increment, decrement } = useCart();

  const inCart = cart.find(
    (item) =>
      item.id === product.id &&
      item.size === product.sizes?.[0] &&
      item.color === product.colors?.[0]
  );

  return (
    <div className={styles.card}>
      <div className={styles.imgBox}>
        <img src={product.image} alt={product.name} />
      </div>
      <div>
        <h6>{product.name}</h6>
        <div className={styles.price}>
          <span>${product.price}.00</span>{" "}
          <span>
            <del>${product.original_price}.00</del>
          </span>
        </div>
      </div>

      {inCart ? (
        <div className={styles.cartActions}>
          <Link to={`/details/${product.id}`}>
            <i className="fas fa-eye"></i> View Detail
          </Link>
          <QuantityCounter
            quantity={
              cart.find(
                (item) =>
                  item.id === product.id &&
                  item.size === product.sizes?.[0] &&
                  item.color === product.colors?.[0]
              )?.quantity || 1
            }
            onIncrement={() =>
              increment(product.id, product.sizes?.[0], product.colors?.[0])
            }
            onDecrement={() =>
              decrement(product.id, product.sizes?.[0], product.colors?.[0])
            }
          />
        </div>
      ) : (
        <div className={styles.cartActions}>
          <Link to={`/details/${product.id}`}>
            <i className="fas fa-eye"></i> View Detail
          </Link>
          <button
            onClick={() =>
              addToCart(
                product.id,
                product.sizes?.[0] || "Default",
                product.colors?.[0] || "Default",
                1,
                product.price,
                product.image,
                product.name
              )
            }
            className={styles.addCartBtn}
          >
            <i className="fas fa-shopping-cart"></i> Add To Cart
          </button>
        </div>
      )}
    </div>
  );
}
