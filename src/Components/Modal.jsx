import React from 'react';

const Modal = ({ isOpen, onClose, onSave, value, onChange, isDeleteModal, onDeleteConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-gray-800 p-6 rounded-2xl w-full max-w-sm shadow-lg">
        {isDeleteModal ? (
          <>
            <h2 className="text-2xl font-semibold text-center mb-4 text-white">Are you sure?</h2>
            <p className="text-center mb-6 text-gray-300">Do you really want to delete this todo?</p>
            <div className="flex justify-end gap-4">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={onDeleteConfirm}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all"
              >
                Confirm Delete
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-semibold text-center mb-4 text-white">Update Task</h2>
            <input
              type="text"
              value={value}
              onChange={onChange}
              className="w-full p-3 mb-6 bg-gray-700 text-white rounded-lg focus:outline-none"
              placeholder="Update your task"
            />
            <div className="flex justify-end gap-4">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={onSave}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all"
              >
                Save
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Modal;
