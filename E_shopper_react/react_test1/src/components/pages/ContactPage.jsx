import React, { useState } from "react";
import HeroSection from "../HeroSection";
import CompInfo from "../FooterFiles/CompInfo";
import styles from "../../css/ContactPage.module.css";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent!");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <>
      <HeroSection heading="CONTACT US" page="Contact" />
      <div className={styles.centerText}>
        <h1>Contact For Any Queries</h1>
      </div>
      <div className={styles.contactMain}>
        <div className={styles.contactForm}>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="subject"
              id="subject"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleChange}
              required
            />
            <textarea
              name="message"
              id="message"
              placeholder="Message"
              value={formData.message}
              onChange={handleChange}
              required
            />
            <button type="submit">Send Message</button>
          </form>
        </div>

        <div className={styles.contactInfo}>
          <h2>Get In Touch</h2>
          <p>
            Justo sed diam ut sed amet duo amet lorem amet stet sea ipsum, sed
            duo amet et. Est elitr dolor elitr erat sit sit. Dolor diam et erat
            clita ipsum justo sed.
          </p>

          <h2>Store 1</h2>
          <CompInfo />

          <h2>Store 2</h2>
          <CompInfo />
        </div>
      </div>
    </>
  );
}
