import Logo from "../headerfiles/Logo";
import CompInfo from "./CompInfo";
import Newsletter from "./NewsLetter";
import QuickLink from "./QuickLinks";
import styles from "../../css/Footer.module.css";
export default function Footer() {
  return (
    <>
      <footer className={styles.footer}>
        <div className={styles.footerUpper}>
          <div className={styles.aboutCompany}>
            <Logo />
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Totam
              assumenda voluptas aut rerum accusamus nesciunt.
            </p>
            <CompInfo />
          </div>

          <div className={styles.footerRight}>
            <QuickLink />
            <QuickLink />
            <Newsletter />
          </div>
        </div>

        <div className={styles.splitLine}></div>

        <div className={styles.footerLower}>
          <div>
            <p>
              © <strong>Shopper.</strong> All Rights Reserved. Designed by{" "}
              <strong>Shivay</strong>
            </p>
            <p>
              Distributed By <a href="#">Rajesh Sir</a>
            </p>
          </div>

          <img src="/src/img/payments.png" alt="payment" />
        </div>
      </footer>
    </>
  );
}
