import React, { useState } from "react";
import "../cssFiles/StepFour.css";

const StepFour = () => {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      {isOpen && (
        <div className="stepfour-overlay">
          <div className="stepfour-container">
            <div className="stepfour-header">
              <h2 className="stepfour-title">
                Select Shutter Design
                <br />
                (Material, Thickness & Grade)
              </h2>
              <span className="stepfour-cost">
                Real time Cost: <span id="real-time-cost">1,00,000</span>
              </span>
              <button className="stepfour-close-button" onClick={handleClose}>
                ✖
              </button>
            </div>
            <div className="stepfour-content">
              <div className="stepfour-item-image">
                <span className="stepfour-placeholder-text">
                  Door Options Images
                  <br />
                  {/* Select Product Carcass Option */}
                </span>
              </div>
              <div className="stepfour-thumbnails">
                {[...Array(10)].map((_, index) => (
                  <img
                    key={index}
                    src="https://placehold.co/50x50"
                    alt="Thumb Image"
                  />
                ))}
                <button className="stepfour-scroll-button">{">"}</button>
              </div>
            </div>
            <div className="stepfour-step-info">
              <div className="stepfour-step">Step 4 of 5</div>
              <textarea
                className="stepfour-description"
                placeholder="Product Description"
                readOnly
              ></textarea>
            </div>
            <div className="stepfour-footer">
              <div className="stepfour-navigation">
                <button className="stepfour-nav-button stepfour-back-button">
                  Back
                </button>
                <button className="stepfour-nav-button stepfour-next-button">
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default StepFour;
