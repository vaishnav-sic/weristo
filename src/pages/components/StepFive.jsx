import React, { useState } from "react";
import "../cssFiles/StepFive.css"; // Import the CSS file

export default function StepFive() {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      {isOpen && (
        <div className="stepFive-overlay">
          <div className="stepFive-container">
            <div className="stepFive-header">
              <div>
                <h2 className="stepFive-title">Review Your Product</h2>
                <p className="stepFive-subtitle">
                  (Material, Thickness & Grade)
                </p>
              </div>
              <p className="stepFive-cost">Final Cost: 1,00,000</p>
              <button className="stepFive-closeButton" onClick={handleClose}>
                ✖
              </button>
            </div>
            <div className="stepFive-imageSection">
              <p className="stepFive-imageTitle">Final 3D Look</p>
            </div>
            <div className="stepFive-buttons">
              <div className="stepFive-buttonGroup">
                <button className="stepFive-button">Closed Shutter View</button>
                <button className="stepFive-button">Internals</button>
                <button className="stepFive-button">Drawer</button>
                <button className="stepFive-button">Accessories</button>
              </div>
              <button className="stepFive-scrollButton">&gt;</button>
            </div>
            <div className="stepFive-stepInfo">
              <p className="stepFive-step">Step 5 of 5</p>
            </div>
            <div className="stepFive-footer">
              <div className="stepFive-descriptionSection">
                <p className="stepFive-descriptionLabel">
                  Product Description:
                </p>
                <textarea className="stepFive-description" />
              </div>
              <button className="stepFive-placeOrderButton">Place Order</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
