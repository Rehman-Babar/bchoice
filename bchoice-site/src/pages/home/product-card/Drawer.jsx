// src/components/Drawer.js
import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

const DrawerPortal = ({ children }) => {
  return ReactDOM.createPortal(children, document.body); // Render the drawer at the end of the body
};

const Drawer = ({ isOpen, onClose, content }) => {
  if (!isOpen) return null;

  return (
    <DrawerPortal>
      <div className="fixed inset-0 flex z-50">
        {/* Overlay */}
        <div className="fixed inset-0 bg-black bg-opacity-50 " onClick={onClose}></div>

        {/* Drawer */}
        <div
          className={`fixed top-0 right-0 h-full w-72 md:w-[23rem] lg:w-96 bg-white shadow-lg transform transition-transform duration-300 ease-in-out overflow-y-scroll scroll-smooth ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}>
          <button className="absolute top-4 right-4 text-2xl text-red-600" onClick={onClose}>
            &times;
          </button>
          <div className="text-black text-2xl text-start p-4 border-b ">Shoping Cart</div>
          <div className="p-4">{content}</div>
        </div>
      </div>
    </DrawerPortal>
  );
};

Drawer.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  content: PropTypes.node.isRequired,
};

export default Drawer;
