import { useCart } from "../../context/CartContext";
import QuantityCounter from "../../components/QuantityCounter";
import HeroSection from "../HeroSection";
import styles from "../../css/CartPage.module.css";
import { Link } from "react-router-dom";

const SHIPPING_COST = 10;

export default function CartPage() {
  const { cart, increment, decrement, removeFromCart } = useCart();

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const total = subtotal + SHIPPING_COST;

  return (
    <>
      <HeroSection heading="SHOPPING CART" page="Shopping Cart" />
      <main className={styles.cartMain}>
        <div className={styles.cartTableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Products</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={`${item.id}-${item.size}-${item.color}`}>
                  <td>
                    <div className={styles.productCell}>
                      <img
                        className={styles.tableImg}
                        src={item.image}
                        alt={item.name}
                      />
                      {item.name} ({item.size}, {item.color})
                    </div>
                  </td>
                  <td>${item.price}</td>
                  <td>
                    <div className={styles.counterCart}>
                      <QuantityCounter
                        quantity={item.quantity}
                        onIncrement={() =>
                          increment(item.id, item.size, item.color)
                        }
                        onDecrement={() =>
                          decrement(item.id, item.size, item.color)
                        }
                      />
                    </div>
                  </td>
                  <td>${item.price * item.quantity}</td>
                  <td>
                    <button
                      className={styles.removeButton}
                      onClick={() =>
                        removeFromCart(item.id, item.size, item.color)
                      }
                    >
                      <i className="fa fa-times"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className={styles.checkoutContainer}>
          <div className={styles.couponBox}>
            <input type="text" placeholder="Coupon Code" />
            <input type="button" value="Apply Coupon" />
          </div>

          <div className={styles.cartSummary}>
            <h2>Cart Summary</h2>

            <div className={styles.cartSummaryBox}>
              <div>
                Subtotal <span>${subtotal}</span>
              </div>
              <div>
                Shipping <span>${SHIPPING_COST}</span>
              </div>
            </div>

            <div className={styles.cartSummaryBox}>
              <div id="total" className={styles.summaryTotal}>
                Total <span>${total}</span>
              </div>
              <Link to="/checkout">
                <button className={styles.pinkBackground}>
                  Proceed To Checkout
                </button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
