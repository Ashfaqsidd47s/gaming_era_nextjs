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
      <div className=" bg-popover text-primary-foreground p-6 rounded-lg shadow-lg w-80 sm:w-96 relative">
        {/* Close button in the top-right corner */}
        <button
          onClick={onCancel}
          className="absolute top-2 right-2 text-muted hover:text-primary-foreground focus:outline-none"
        >
          <MdClose size={24} />
        </button>

        <h2 className="text-xl font-semibold mb-4">{title}</h2>
        <p className="text-muted mb-6">{description}</p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-muted border border-background rounded-lg bg-primary-foreground/20  hover:bg-primary-foreground/30 focus:outline-none"
          >
            Cancel
          </button>
          <button
            onClick={onAction}
            className="px-4 py-2 text-primary-foreground bg-primary/70 rounded-lg hover:bg-primary/80 focus:outline-none"
          >
            {actionButton}
          </button>
        </div>
      </div>
    </div>
  );
}
