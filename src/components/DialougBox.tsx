'use client';

import React from 'react';
import { MdClose } from 'react-icons/md'; // Importing the Close Icon from react-icons

interface DialogBoxProps {
  title: string;
  description: string;
  onCancel: () => void;
  onAction: () => void;
  actionButton?: string; 
}

export default function DialogBox({
  title,
  description,
  onCancel,
  onAction,
  actionButton = "Confirm"
}: DialogBoxProps) {
  return (
    <div className=" w-full h-full fixed top-0 left-0 flex items-center justify-center bg-black bg-opacity-60 z-[100]">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80 sm:w-96 relative">
        {/* Close button in the top-right corner */}
        <button
          onClick={onCancel}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          <MdClose size={24} />
        </button>

        <h2 className="text-xl font-semibold text-gray-800 mb-4">{title}</h2>
        <p className="text-gray-600 mb-6">{description}</p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-gray-500 border border-gray-300 rounded-lg hover:bg-gray-100 focus:outline-none"
          >
            Cancel
          </button>
          <button
            onClick={onAction}
            className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none"
          >
            {actionButton}
          </button>
        </div>
      </div>
    </div>
  );
}
