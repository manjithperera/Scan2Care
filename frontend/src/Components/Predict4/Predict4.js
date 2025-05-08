import React from "react";
import styles from "./Predict4.module.css";  // Ensure you have the correct CSS file

const DiagnosisResult = () => {
  return (
    <div className={styles.diagnosis_container}>
      {/* Header Section */}
      <div className={styles.header_section}>
        <img
          className={styles.user_image}
          src="/images/face-symptoms.png" // Replace with actual image path
          alt="User with skin condition"
        />
        <div className={styles.header_text}>
          <h2>Understand Your Skin Better with AI-Powered Insights</h2>
          <div className={styles.progress_dots}>
            <span className={styles.dot_active}></span>
            <span className={styles.dot}></span>
            <span className={styles.dot}></span>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className={styles.progress_bar_container}>
        <div className={styles.progress_bar}>
          <div className={styles.progress_fill} style={{ width: "66%" }}></div>
        </div>
      </div>

      {/* Diagnosis Result */}
      <div className={styles.result_section}>
        <h2>66%</h2>
        <h3>Result : Skin Cancer</h3>
        <p className={styles.bold_text}>
          There is a possibility of skin cancer based on the images and the details that you provide
        </p>
        <p className={styles.description}>
          Skin cancer is an abnormal growth of skin cells, often caused by prolonged exposure to UV radiation from the sun or tanning beds. The most common types include basal cell carcinoma (BCC), squamous cell carcinoma (SCC), and melanoma, the most dangerous form. Symptoms to watch for include non-healing sores, changes in moles, and lesions with irregular borders. To prevent skin cancer, avoid prolonged sun exposure, wear sunscreen with SPF 30 or higher, use protective clothing, and avoid tanning beds. Regular self-examinations and routine checkups with a dermatologist are crucial for early detection and effective treatment. If you notice unusual skin changes, consult a dermatologist immediately for evaluation.
        </p>
        <a href="/doctors" className={styles.doctor_link}>
          Visit Doctors page to find the specialized doctor for your specific skin disease
        </a>
      </div>

      {/* Navigation Buttons */}
      <div className={styles.button_container}>
        <button className={styles.back_button}>BACK</button>
        <button className={styles.explore_button}>Explore Now</button>
      </div>
    </div>
  );
};

export default DiagnosisResult;
