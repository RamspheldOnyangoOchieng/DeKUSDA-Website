import React from "react";

export const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  showClose = true,
  className = "",
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div
        className={`bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 border-t-8 border-yellow-600 ${className} relative`}
      >
        {showClose && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-red-700 hover:text-red-900 text-2xl font-bold focus:outline-none"
            aria-label="Close"
          >
            &times;
          </button>
        )}
        {title && (
          <h2 className="text-2xl font-extrabold text-transparent bg-gradient-to-r from-yellow-600 via-red-600 to-green-900 bg-clip-text mb-4">
            {title}
          </h2>
        )}
        <div className="text-green-900">{children}</div>
      </div>
    </div>
  );
};

export default Modal;