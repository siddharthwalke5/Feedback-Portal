import { useState } from 'react';

export default function Modal({ title, onClose, onSubmit, children }) {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
    onClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">{title}</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {children}
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={handleClose}
                className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition duration-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
}
