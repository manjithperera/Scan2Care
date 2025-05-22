import React, { useState } from "react";
import "./Predict2.css";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { useNavigate } from "react-router-dom";

const Predict2ImageUpload = () => {
  const [images, setImages] = useState([null, null, null]);
  const [files, setFiles] = useState([null, null, null]);
  const navigate = useNavigate();

  const handleImageUpload = (event, index) => {
    const file = event.target.files[0];
    if (file) {
      const newImages = [...images];
      const newFiles = [...files];
      newImages[index] = URL.createObjectURL(file);
      newFiles[index] = file;
      setImages(newImages);
      setFiles(newFiles);
    }
  };

  const handleNextClick = () => {
    const uploadedFiles = files.filter(file => file);
    if (uploadedFiles.length === 0) {
      alert("Please upload at least one image.");
      return;
    }

    navigate("/predict3", { state: { uploadedFiles } });
  };

  return (
    <div>
      <Navbar />
      <div className="Predict2-container">
        <div className="Predict2-header">
          <div className="Predict2-header-content">
            <img src="/images/Group 1000002611 copy.png" alt="Skin Analysis" className="Predict2-header-image" />
            <h2 className="Predict2-title">Understand Your Skin Better with AI-Powered Insights</h2>
          </div>
        </div>

        <div className="Predict2-progress-bar">
          <div className="Predict2-progress-step Predict2-completed">✔ Symptoms</div>
          <div className="Predict2-progress-line"></div>
          <div className="Predict2-progress-step Predict2-active">02 Images</div>
          <div className="Predict2-progress-line"></div>
          <div className="Predict2-progress-step">03 Questionnaire</div>
        </div>

        <p className="Predict2-instructions">
          Share images of the skin concern for precise AI-based analysis.
        </p>

        <div className="Predict2-upload-container">
          {images.map((image, index) => (
            <label key={index} className="Predict2-upload-box">
              {image ? (
                <img src={image} alt={`Uploaded ${index + 1}`} className="Predict2-uploaded-image" />
              ) : (
                <div className="Predict2-upload-placeholder">
                  <img src="/images/upload-icon.png" alt="Upload" className="Predict2-upload-icon" />
                  <span>Upload here</span>
                </div>
              )}
              <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, index)} />
            </label>
          ))}
        </div>

        <div className="Predict2-buttons">
          <button className="Predict2-back-button" onClick={() => navigate("/predict1")}>BACK</button>
          <button className="Predict2-next-button" onClick={handleNextClick}>NEXT</button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Predict2ImageUpload;
