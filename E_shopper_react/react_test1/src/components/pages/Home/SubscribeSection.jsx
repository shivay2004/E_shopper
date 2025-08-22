import React, { useState } from "react";
import styles from "../../../css/SubscribeSection.module.css";

function SubscribeSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubscribe = () => {
    if (validateEmail(email)) {
      setStatus("Thank you for subscribing");
    } else {
      setStatus("Please enter a valid email address.");
    }
  };

  return (
    <div className={styles.subscribe}>
      <div className={styles.textBox}>
        <h2 className={styles.title}>Stay Updated</h2>
        <p>
          Amet lorem at rebum amet dolores. Elitr lorem dolor sed amet diam
          labore at justo ipsum eirmod duo labore labore.
        </p>
      </div>
      <div className={styles.form}>
        <input
          type="email"
          placeholder="Email Goes Here"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={handleSubscribe}>Subscribe</button>
      </div>
      {status && <div className={styles.status}>{status}</div>}
    </div>
  );
}

export default SubscribeSection;
