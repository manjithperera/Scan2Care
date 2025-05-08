import React from "react";
import { FaTiktok, FaFacebookF, FaInstagram } from "react-icons/fa";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <h2 className="footer-title">SCAN2CARE</h2>
      <p className="footer-subtitle">Stay Ahead in Skin Health</p>
      <p className="footer-description">
        Join thousands of users who trust our platform for proactive skin
        disease detection and management. <br/> Take the first step toward healthier
        skin today.
      </p>
      <hr className="footer-divider" />
      {/* Combined navigation and social media into one row */}
      <div className="footer-row">
        <ul className="footer-menu">
        <p classname="footer-title">SCAN2CARE</p>
          <li><a href="/" className="footer-link">Home</a></li>
          <li><a href="/predict" className="footer-link">Predict</a></li>
          <li><a href="/doctors" className="footer-link">Doctors</a></li>
          <li><a href="/about" className="footer-link">About Us</a></li>
          <li><a href="/contact" className="footer-link">Contact Us</a></li>
        </ul>
        <div className="footer-social-media">
          <a href="https://tiktok.com" className="footer-social-link" target="_blank" rel="noreferrer">
            <div className="icon-circle"><FaTiktok size={15} /></div>
          </a>
          <a href="https://facebook.com" className="footer-social-link" target="_blank" rel="noreferrer">
            <div className="icon-circle"><FaFacebookF size={15} /></div>
          </a>
          <a href="https://instagram.com" className="footer-social-link" target="_blank" rel="noreferrer">
            <div className="icon-circle"><FaInstagram size={15} /></div>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;