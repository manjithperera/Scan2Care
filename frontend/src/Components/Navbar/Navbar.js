import React, { useState } from "react";
import styles from "./Navbar.module.css"

const Navbar = () => {
  const [activeItem, setActiveItem] = useState("");

  const handleItemClick = (item) => {
    setActiveItem(item); // Set the active item when clicked
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar_container}>
        <div className={styles.navbar_logo}>
          <div className={styles.navbar_logo_row}>
            <img src="../images/logo.png" alt="Scan2Care Logo" />
            <div className={styles.navbar_title_subtitle}>
              <span className={styles.navbar_title}>SCAN2CARE</span>
              <span className={styles.navbar_subtitle}>Stay Ahead in Skin Health</span>
            </div>
          </div>
        </div>
        <ul className={styles.navbar_links}>
          <li className={styles.navbar_item}>
            <a
              href="#home"
              className={activeItem === "home" ? "active" : ""}
              onClick={() => handleItemClick("home")}
            >
              HOME
            </a>
          </li>
          <li className={styles.navbar_item}>
            <a
              href="#predict"
              className={activeItem === "predict" ? "active" : ""}
              onClick={() => handleItemClick("predict")}
            >
              PREDICT
            </a>
          </li>
          <li className={styles.navbar_item}>
            <a
              href="#doctors"
              className={activeItem === "doctors" ? "active" : ""}
              onClick={() => handleItemClick("doctors")}
            >
              DOCTORS
            </a>
          </li>
          <li className={styles.navbar_item}>
            <a
              href="#about"
              className={activeItem === "about" ? "active" : ""}
              onClick={() => handleItemClick("about")}
            >
              ABOUT US
            </a>
          </li>
          <li className={styles.navbar_item}>
            <a
              href="#contact"
              className={activeItem === "contact" ? "active" : ""}
              onClick={() => handleItemClick("contact")}
            >
              CONTACT US
            </a>
          </li>
        </ul>
        <div className={styles.navbar_actions}>
          <button className={styles.btn.login}>LOG IN</button>
        <button className={styles.btn.signup}>SIGN UP</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
