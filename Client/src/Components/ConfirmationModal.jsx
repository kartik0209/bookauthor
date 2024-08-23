import React from "react";

const ConfirmationModal = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-sm mx-4">
        <div className="p-4">
          <p className="text-gray-800 mb-4">{message}</p>
          <div className="flex justify-end space-x-4">
            <button
              onClick={onConfirm}
              className="bg-green-600 text-white rounded-lg py-2 px-4 font-medium hover:bg-green-700 transition duration-300"
            >
              Confirm
            </button>
            <button
              onClick={onCancel}
              className="bg-red-600 text-white rounded-lg py-2 px-4 font-medium hover:bg-red-700 transition duration-300"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
