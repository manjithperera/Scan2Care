import React, { useState } from "react";
import "./Predict2.css";

const Predict2ImageUpload = ({ onNext, onBack }) => {
  const [images, setImages] = useState([null, null, null]);
  const [files, setFiles] = useState([null, null, null]);
  const [loading, setLoading] = useState(false);
  const [predictions, setPredictions] = useState([]);

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

  const handleNextClick = async () => {
    const formData = new FormData();
    files.forEach((file) => {
      if (file) formData.append("files", file);
    });

    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/predict", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setPredictions(data.predictions);
      setLoading(false);

      console.log("Predictions:", data.predictions);

      // Optional: send predictions to next page
      onNext(data.predictions);

    } catch (error) {
      console.error("Error uploading images:", error);
      setLoading(false);
    }
  };

  return (
    <div className="Predict2-container">
      {/* Header Section */}
      <div className="Predict2-header">
        <div className="Predict2-header-content">
          <img src="/images/skin-banner.png" alt="Skin Analysis" className="Predict2-header-image" />
          <h2 className="Predict2-title">Understand Your Skin Better with AI-Powered Insights</h2>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="Predict2-progress-bar">
        <div className="Predict2-progress-step Predict2-completed">✔ Symptoms</div>
        <div className="Predict2-progress-line"></div>
        <div className="Predict2-progress-step Predict2-active">02 Images</div>
        <div className="Predict2-progress-line"></div>
        <div className="Predict2-progress-step">03 Questionnaire</div>
      </div>

      {/* Upload Instructions */}
      <p className="Predict2-instructions">
        Share images of the skin concern for precise AI-based analysis. Ensure good lighting and clarity for the best results.
      </p>

      {/* Upload Boxes */}
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

      {/* Navigation Buttons */}
      <div className="Predict2-buttons">
        <button className="Predict2-back-button" onClick={onBack}>BACK</button>
        <button 
          className="Predict2-next-button" 
          onClick={handleNextClick}
          disabled={!files.some(f => f !== null) || loading}
        >
          {loading ? "Processing..." : "NEXT"}
        </button>
      </div>

      {/* Predictions (for dev) */}
      {predictions.length > 0 && (
        <div className="Predict2-results">
          <h3>Predictions:</h3>
          <ul>
            {predictions.map((p, i) => (
              <li key={i}>Image {i + 1}: {p}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Predict2ImageUpload;
