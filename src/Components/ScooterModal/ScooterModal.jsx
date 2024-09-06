import React from "react";
import ReactDOM from "react-dom";
import { FaTimes } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap CSS is included
import "bootstrap/dist/js/bootstrap.bundle.min"; // Ensure Bootstrap JS is included
import "./ScooterModal.css"; // Ensure this path is correct

const ScooterModal = ({ isOpen, onClose, images }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="scooter-modal-overlay mt-5" onClick={onClose}>
      <div
        className="scooter-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="scooter-modal-close" onClick={onClose}>
          <FaTimes />
        </button>
        <div id="carouselExample" className="carousel slide">
          <div className="carousel-inner">
            {images.map((img, index) => (
              <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                <img src={img} width={400} height={400} className="d-block w-100" alt={`Slide ${index}`} tabIndex="-1" />
              </div>
            ))}
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExample"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExample"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("modal-root") // Ensure you have a div with id 'modal-root' in your public/index.html
  );
};

export default ScooterModal;
