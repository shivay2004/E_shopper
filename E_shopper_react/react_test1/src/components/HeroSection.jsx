import styles from "../css/HeroSection.module.css";
import { Link } from "react-router-dom";
function HeroSection({ heading, page }) {
  return (
    <div className={styles.hero}>
      <h1>{heading}</h1>
      <p>
        <Link to="/">Home </Link> - <span>{page}</span>
      </p>
    </div>
  );
}

export default HeroSection;
