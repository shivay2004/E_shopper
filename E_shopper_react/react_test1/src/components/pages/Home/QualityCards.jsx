import styles from "../../../css/QualityCards.module.css";

const qualityItems = [
  { icon: "fa-check", text: "Quality Product" },
  { icon: "fa-shipping-fast", text: "Free Shipping" },
  { icon: "fa-exchange-alt", text: "14-Day Return" },
  { icon: "fa-phone-volume", text: "24/7 Support" },
];

function QualityCards() {
  return (
    <div className={styles.quality}>
      {qualityItems.map((item, idx) => (
        <div key={idx} className={styles.card}>
          <h1 className={`fa ${item.icon}`}></h1>
          <h5>{item.text}</h5>
        </div>
      ))}
    </div>
  );
}

export default QualityCards;
