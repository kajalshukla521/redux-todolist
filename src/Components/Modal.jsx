import React from 'react';

const Modal = ({ isOpen, onClose, onSave, value, onChange }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-gray-800 p-6 rounded-lg w-full max-w-sm shadow-lg">
        <h2 className="text-xl font-bold text-center mb-4">Update Task</h2>
        <input
          type="text"
          value={value}
          onChange={onChange}
          className="w-full p-3 mb-4 bg-gray-700 text-white rounded-lg focus:outline-none"
          placeholder="Update your task"
        />
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
