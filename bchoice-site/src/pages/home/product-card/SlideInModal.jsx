// SlideInModal.jsx
import React from "react";
import ReactDOM from "react-dom";
import "./SlideInModal.css"; // Import the CSS file for the slide-in animation

const SlideInModal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-end items-center z-50">
      <div className="slide-in-modal bg-white p-8 rounded-lg shadow-lg w-96">
        <button className="absolute top-2 right-2 text-gray-600" onClick={onClose}>
          ×
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
};

export default SlideInModal;
