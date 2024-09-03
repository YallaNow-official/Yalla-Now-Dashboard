// src/components/PdfModal.js
import "./PdfModal.css";
import React from "react";
import ReactDOM from "react-dom";
import { FaTimes } from "react-icons/fa"; // Font Awesome icon for closing

const PdfModal = ({ isOpen, onClose, pdfUrl }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="pdf-modal-overlay" onClick={onClose}>
      <div className="pdf-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="pdf-modal-close" onClick={onClose}>
          <FaTimes />
        </button>
        <iframe src={pdfUrl} width="100%" height="100%" title="PDF Viewer"></iframe>
      </div>
    </div>,
    document.getElementById("modal-root") // Ensure you have a div with id 'modal-root' in your public/index.html
  );
};

export default PdfModal;
