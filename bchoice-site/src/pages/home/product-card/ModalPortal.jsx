import React from "react";
import ReactDOM from "react-dom";

const ModalPortal = ({ children }) => {
  return ReactDOM.createPortal(
    children,
    document.body // Render the modal at the end of the body
  );
};

export default ModalPortal;
