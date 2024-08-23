import React from 'react';
import CloseIcon from "@mui/icons-material/Close";

function Modal({ children, showModal, setShowModal }) {
  if (!showModal) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="relative bg-white h-auto dark:bg-gray-800 rounded-2xl p-4 w-1/2">
        <button
          className="absolute top-1 right-2 text-gray-400 hover:text-gray-600"
          onClick={() => setShowModal(false)}
        >
          <CloseIcon />
        </button>
        {children}
      </div>
    </div>
  );
}

export default Modal;
