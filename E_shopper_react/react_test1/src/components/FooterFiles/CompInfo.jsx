import styles from "../../css/CompInfo.module.css";
export default function CompInfo() {
  return (
    <ul className={styles.footericon}>
      <li>
        <i className="fa-solid fa-location-dot"></i>123 Street, New York,USA
      </li>
      <li>
        <i className="fa-solid fa-envelope"></i>info@example.com
      </li>
      <li>
        <i className="fa-solid fa-phone"></i>+012 345 67890
      </li>
    </ul>
  );
}
