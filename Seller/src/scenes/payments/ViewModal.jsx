// Modal Component
const Modal = ({ children, onClose }) => {
    return (
      <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex items-center justify-center z-50">
        <div className="relative bg-white rounded-lg shadow-lg w-11/12 max-w-md p-4">
          {/* Close Button */}
          <button
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl"
            onClick={onClose}
          >
            &times;
          </button>
          {children}
        </div>
      </div>
    );
  };
export default Modal  