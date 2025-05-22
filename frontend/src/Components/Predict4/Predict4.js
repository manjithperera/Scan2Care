import React from "react";
import styles from "./Predict4.module.css";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { Link, useLocation } from "react-router-dom";

const DiagnosisResult = () => {
  const location = useLocation();
  const { predictions } = location.state || { predictions: [] };
  const topPrediction = predictions?.[0];

  console.log("Predictions received in Predict4:", predictions);

  return (
    <div>
      <Navbar />
      <div className={styles.diagnosis_container}>
        {/* Header Section */}
        <div className={styles.header_section}>
          <img className={styles.user_image} src="/images/Frame 67.png" alt="User with skin condition" />
          <div className={styles.header_text}>
            <h2>Understand Your Skin Better with AI-Powered Insights</h2>
            <div className={styles.progress_dots}>
              <span className={styles.dot}></span>
              <span className={styles.dot}></span>
              <span className={styles.dot_active}></span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className={styles.progress_bar_container}>
          <div className={styles.progress_bar}>
            <div className={styles.progress_fill} style={{ width: "100%" }}></div>
          </div>
        </div>

        {/* Diagnosis Result */}
        <div className={styles.result_section}>
          {topPrediction && topPrediction?.confidence !== undefined ? (
            <>
              <h2>{topPrediction.confidence.toFixed(2)}%</h2>
              <h3>Result: {topPrediction.predicted_class || "Unknown"}</h3>
              <p className={styles.bold_text}>
                Based on the uploaded images and your symptoms, there is a possibility of{" "}
                {topPrediction.predicted_class}.
              </p>

              {/* Probability Breakdown */}
              {topPrediction.probabilities && (
                <div className={styles.probability_table}>
                  <h4>Confidence Scores</h4>
                  <ul>
                    {Object.entries(topPrediction.probabilities).map(([label, percent]) => (
                      <li key={label}>
                        <strong>{label}</strong>: {percent?.toFixed ? percent.toFixed(2) : percent}%
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <p className={styles.description}>
                Skin cancer is an abnormal growth of skin cells, often caused by prolonged
                exposure to UV radiation from the sun or tanning beds. The most common types
                include basal cell carcinoma (BCC), squamous cell carcinoma (SCC), and melanoma,
                the most dangerous form. Symptoms to watch for include non-healing sores,
                changes in moles, and lesions with irregular borders.
                <br /><br />
                To prevent skin cancer, avoid prolonged sun exposure, wear sunscreen with SPF 30
                or higher, use protective clothing, and avoid tanning beds. Regular self-examinations
                and routine checkups with a dermatologist are crucial for early detection and
                effective treatment.
              </p>

              <a href="/doctors" className={styles.doctor_link}>
                Visit the Doctors page to find a specialist for your skin condition
              </a>
            </>
          ) : (
            <p className={styles.error_text}>
              ⚠️ Prediction data not available or incomplete. Please try again.
            </p>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className={styles.button_container}>
          <Link to="/predict3"><button className={styles.back_button}>BACK</button></Link>
          <Link to="/doctors"><button className={styles.explore_button}>Explore Now</button></Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DiagnosisResult;
