import React, { useState } from "react";
import "../cssFiles/StepThree.css"; // Import the CSS file

export default function StepThree() {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      {isOpen && (
        <div className="widget-overlay">
          <div className="widget-container">
            <div className="widget-header">
              <h2 className="widget-title">
                Select Accessories
                <br />
                (Material, Thickness & Grade)
              </h2>
              <span className="widget-cost">Real time Cost: 1,00,000</span>
              <button className="widget-close-button" onClick={handleClose}>
                ✖
              </button>
            </div>
            <div className="widget-content">
              <div className="widget-item">
                <h3 className="widget-item-title">Drawer</h3>
                <div className="widget-item-container">
                  <button className="widget-item-button">&lt;</button>
                  <div className="widget-item-image">Drawer Image</div>
                  <button className="widget-item-button">&gt;</button>
                </div>
              </div>
              <div className="widget-item">
                <h3 className="widget-item-title">Hanging Rod</h3>
                <div className="widget-item-container">
                  <button className="widget-item-button">&lt;</button>
                  <div className="widget-item-image">Hanging Rod Image</div>
                  <button className="widget-item-button">&gt;</button>
                </div>
              </div>
            </div>
            <div className="widget-footer">
              <span className="widget-step">Step 3 of 5</span>
            </div>
            <div className="widget-description">
              <label
                htmlFor="product-description"
                className="widget-description-label"
              >
                Product Description:
              </label>
              <textarea
                id="product-description"
                className="widget-description-textarea"
              ></textarea>
            </div>
            <div className="widget-navigation">
              <button className="widget-nav-button widget-back-button">
                Back
              </button>
              <button className="widget-nav-button widget-next-button">
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
