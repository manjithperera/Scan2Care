import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const [activeItem, setActiveItem] = useState("");
  const user = useSelector((state) => state.user);
  const isLoggedIn = user?.name && user?.user_type === "doctor";

  const handleItemClick = (item) => {
    setActiveItem(item);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar_container}>
        <div className={styles.navbar_logo}>
          <div className={styles.navbar_logo_row}>
            <img src="/images/logo.png" alt="Scan2Care Logo" />
            <div className={styles.navbar_title_subtitle}>
              <span className={styles.navbar_title}>SCAN2CARE</span>
              <span className={styles.navbar_subtitle}>Stay Ahead in Skin Health</span>
            </div>
          </div>
        </div>

        {/* Update links to match your route paths in App.js */}
        <ul className={styles.navbar_links}>
          <li className={styles.navbar_item}>
            <Link to="/Home" className={activeItem === "home" ? "active" : ""} onClick={() => handleItemClick("home")}>
              HOME
            </Link>
          </li>
          <li className={styles.navbar_item}>
            <Link to="/Predict1" className={activeItem === "predict" ? "active" : ""} onClick={() => handleItemClick("predict")}>
              PREDICT
            </Link>
          </li>
          <li className={styles.navbar_item}>
            <Link to="/Doctors" className={activeItem === "doctors" ? "active" : ""} onClick={() => handleItemClick("doctors")}>
              DOCTORS
            </Link>
          </li>
          <li className={styles.navbar_item}>
            <Link to="/ContactUs" className={activeItem === "about" ? "active" : ""} onClick={() => handleItemClick("about")}>
              ABOUT US
            </Link>
          </li>
          <li className={styles.navbar_item}>
            <Link to="/ContactUs" className={activeItem === "contact" ? "active" : ""} onClick={() => handleItemClick("contact")}>
              CONTACT US
            </Link>
          </li>
        </ul>

        <div className={styles.navbar_actions}>
          {isLoggedIn ? (
            <div className={styles.welcomeMessage}>👨‍⚕️ Dr. {user.name}</div>
          ) : (
            <>
              <Link to="/">
                <button className={styles.btn_login}>LOG IN</button>
              </Link>
              <Link to="/signup">
                <button className={styles.btn_signup}>SIGN UP</button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
