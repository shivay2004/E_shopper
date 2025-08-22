import { Link } from "react-router-dom";
import styles from "../../css/QuickLink.module.css";

export default function QuickLink() {
  return (
    <div className={styles.quickLinks}>
      <h2>Quick Links</h2>
      <ul>
        <li>
          <Link to="/">
            <i className="fa-solid fa-chevron-right"></i> Home
          </Link>
        </li>
        <li>
          <Link to="/shop">
            <i className="fa-solid fa-chevron-right"></i> Shop
          </Link>
        </li>
        <li>
          <Link to="/details">
            <i className="fa-solid fa-chevron-right"></i> Details
          </Link>
        </li>
        <li>
          <Link to="/cart">
            <i className="fa-solid fa-chevron-right"></i> Shopping Cart
          </Link>
        </li>
        <li>
          <Link to="/checkout">
            <i className="fa-solid fa-chevron-right"></i> Checkout
          </Link>
        </li>
        <li>
          <Link to="/contact">
            <i className="fa-solid fa-chevron-right"></i> Contact
          </Link>
        </li>
      </ul>
    </div>
  );
}
