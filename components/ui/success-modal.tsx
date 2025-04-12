"use client";

import { motion, AnimatePresence } from "framer-motion";
import { IoCheckmarkCircle } from "react-icons/io5";

interface SuccessModalProps {
  show: boolean;
  onClose: () => void;
  message: string;
}

export function SuccessModal({ show, onClose, message }: SuccessModalProps) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
            <svg
              className="h-6 w-6 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h3 className="mt-4 text-lg font-medium text-gray-900">{message}</h3>
          <div className="mt-6">
            <button
              onClick={onClose}
              className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-[#FF8C00] border border-transparent rounded-md hover:bg-[#FF7C00] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#FF8C00]"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 