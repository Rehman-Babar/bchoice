import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import ZoomImage from "../../../hook/zoomImg";

const ModalPortal = ({ children }) => {
  return ReactDOM.createPortal(
    children,
    document.body // Render the modal at the end of the body
  );
};

const Modal = ({ isOpen, onClose, description, imageSrc, content, footer }) => {
  if (!isOpen) return null;

  return (
    <ModalPortal>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-[40rem] mx-auto relative ">
          <button className="absolute top-3 right-3 text-3xl text-gray-500 hover:text-gray-800" onClick={onClose}>
            &times;
          </button>

          <div className="flex flex-col md:flex-row gap-7 relative">
            <div>
              {imageSrc && (
                <div className="flex justify-center group">
                  {/* <img
                    src={imageSrc}
                    alt={description}
                    className=" w-72 h-60 object-cover rounded-sm border-2 border-gray-300"
                  /> */}
                  <ZoomImage
                    src={imageSrc}
                    alt={description}
                    containerClassName="h-72"
                    className={
                      " w-[20rem] rounded-md object-scale-down border-2 border-gray-300 transition-transform duration-300 group-hover:scale-150"
                    }></ZoomImage>
                </div>
              )}
            </div>
            <div className="flex flex-col  justify-center">
              {description && <p className=" text-sm text-gray-900 mb-2">{description}</p>}

              <div className="flex items-center">{content}</div>

              {footer && <div className="border-t pt-4 mt-4">{footer}</div>}
            </div>
          </div>
          {/* 
          <div className="flex justify-center mt-4">
            <button className="bg-red-500 text-white py-2 px-6 rounded-md hover:bg-red-600" onClick={onClose}>
              Close
            </button>
          </div> */}
        </div>
      </div>
    </ModalPortal>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
  imageSrc: PropTypes.string,
  content: PropTypes.node,
  footer: PropTypes.node,
};

export default Modal;
