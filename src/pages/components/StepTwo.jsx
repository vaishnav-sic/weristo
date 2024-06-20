import React, { useState } from "react";
// import "./cssFiles/StepTwo.css";

const StepTwo = () => {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      {isOpen && (
        <div className="steptwo-overlay">
          <div className="steptwo-container">
            <div className="steptwo-header">
              <h2 className="steptwo-title">
                Select Internal Laminate
                <br /> (Material, Thickness & Grade)
              </h2>
              <span className="steptwo-cost">
                Real time Cost: <span id="real-time-cost">1,00,000</span>
              </span>
              <button className="steptwo-close-button" onClick={handleClose}>
                ✖
              </button>
            </div>
            <div className="steptwo-content">
              <div className="steptwo-item">
                <div className="steptwo-item-image">
                  <span className="steptwo-placeholder-text">
                    Product Image 360D view
                    <br />
                    Select Product Internal Laminate Option
                  </span>
                </div>
                <div className="steptwo-thumbnails">
                  {[...Array(10)].map((_, index) => (
                    <img
                      key={index}
                      src="https://placehold.co/50x50"
                      alt="Thumb Image"
                    />
                  ))}
                  <button className="steptwo-scroll-button">{">"}</button>
                </div>
              </div>
            </div>
            <div className="steptwo-footer">
              <div className="steptwo-step">Step 2 of 5</div>
              <div className="steptwo-navigation">
                <button className="steptwo-nav-button steptwo-back-button">
                  Back
                </button>
                <button className="steptwo-nav-button steptwo-next-button">
                  Next
                </button>
              </div>
            </div>
            <div className="steptwo-description">
              <textarea
                className="steptwo-description-textarea"
                placeholder="Product Description"
                readOnly
              ></textarea>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default StepTwo;
