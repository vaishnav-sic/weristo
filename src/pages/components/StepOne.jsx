import React, { useState } from "react";
import "../cssFiles/StepOne.css";

const StepOne = () => {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      {isOpen && (
        <div className="stepone-overlay">
          <div className="stepone-container">
            <div className="stepone-header">
              <h2 className="stepone-title">
                Select Carcass
                <br /> (Material, Thickness & Grade)
              </h2>
              <span className="stepone-cost">
                Real time Cost: <span id="real-time-cost">1,00,000</span>
              </span>
              <button className="stepone-close-button" onClick={handleClose}>
                ✖
              </button>
            </div>
            <div className="stepone-image-section">
              <div className="stepone-product-image">
                <span className="stepone-placeholder-text">
                  Product Image 360D view
                  <br />
                  Select Product Carcass Option
                </span>
              </div>
              <div className="stepone-thumbnails">
                {[...Array(19)].map((_, index) => (
                  <img
                    key={index}
                    src="https://placehold.co/50x50"
                    alt="Thumb Image"
                  />
                ))}
                <button className="stepone-scroll-button">{">"}</button>
              </div>
            </div>
            <div className="stepone-step-info">
              <div className="stepone-step">Step 1 of 5</div>
              <textarea
                className="stepone-description"
                placeholder="Product Description"
                readOnly
              ></textarea>
            </div>
            <div className="stepone-navigation">
              <button className="stepone-nav-button stepone-back-button">
                Back
              </button>
              <button className="stepone-nav-button stepone-next-button">
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default StepOne;
