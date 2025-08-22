import React, { useState } from "react";
import ReviewSection from "./ReviewSection";
import styles from "../css/AdditionalInfo.module.css";

export default function AdditionalInfoTabs({ name }) {
  const [activeTab, setActiveTab] = useState("addInfo1");

  const renderContent = () => {
    switch (activeTab) {
      case "addInfo1":
        return (
          <div>
            <h2>Product Description</h2>
            <p style={{ fontSize: "1.2rem", color: "gray" }}>
              Eos no lorem eirmod diam diam, eos elitr et gubergren diam sea.
              Consetetur vero aliquyam invidunt duo dolores et duo sit. Vero
              diam ea vero et dolore rebum...
            </p>
            <br />
            <p style={{ fontSize: "1.2rem", color: "gray" }}>
              Dolore magna est eirmod sanctus dolor, amet diam et eirmod et
              ipsum. Amet dolore tempor consetetur sed lorem dolor sit lorem
              tempor...
            </p>
          </div>
        );

      case "addInfo2":
        return (
          <div>
            <h2>Additional Information</h2>
            <p style={{ fontSize: "1.2rem", color: "gray" }}>
              Eos no lorem eirmod diam diam, eos elitr et gubergren diam sea.
              Consetetur vero aliquyam invidunt duo dolores et duo sit...
            </p>
            <br />
            <div className={styles.infoLists}>
              <ul style={{ fontSize: "1.2rem" }}>
                <li>Sit erat duo lorem duo ea consetetur...</li>
                <li>Sit erat duo lorem duo ea consetetur...</li>
                <li>Sit erat duo lorem duo ea consetetur...</li>
                <li>Sit erat duo lorem duo ea consetetur...</li>
              </ul>
              <ul style={{ fontSize: "1.2rem" }}>
                <li>Sit erat duo lorem duo ea consetetur...</li>
                <li>Sit erat duo lorem duo ea consetetur...</li>
                <li>Sit erat duo lorem duo ea consetetur...</li>
                <li>Sit erat duo lorem duo ea consetetur...</li>
              </ul>
            </div>
          </div>
        );

      case "addInfo3":
        return (
          <div>
            <ReviewSection productName={name} />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={styles.additionalInfo}>
      <nav className={styles.nav}>
        <ul>
          <li
            className={activeTab === "addInfo1" ? styles.active : ""}
            onClick={() => setActiveTab("addInfo1")}
          >
            Description
          </li>
          <li
            className={activeTab === "addInfo2" ? styles.active : ""}
            onClick={() => setActiveTab("addInfo2")}
          >
            Information
          </li>
          <li
            className={activeTab === "addInfo3" ? styles.active : ""}
            onClick={() => setActiveTab("addInfo3")}
          >
            Reviews
          </li>
        </ul>
      </nav>

      <div className={styles.content}>{renderContent()}</div>
    </div>
  );
}
