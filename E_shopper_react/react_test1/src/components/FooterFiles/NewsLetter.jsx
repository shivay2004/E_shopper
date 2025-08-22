import React, { useState } from "react";
import styles from "../../css/NewsLetter.module.css";
export default function Newsletter() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ name, email });
  };

  return (
    <div className={styles.newsletter}>
      <h2>Newsletter</h2>
      <form id="newsletterForm" onSubmit={handleSubmit}>
        <input
          type="text"
          id="nameInput"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          id="newsletterEmailInput"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Subscribe Now</button>
      </form>
      <div id="newsletterStatus">{status}</div>
    </div>
  );
}
