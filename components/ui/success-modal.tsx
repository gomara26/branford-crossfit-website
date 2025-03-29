"use client";

import { motion, AnimatePresence } from "framer-motion";
import { IoCheckmarkCircle } from "react-icons/io5";

interface SuccessModalProps {
  message: string;
  isOpen: boolean;
  onClose: () => void;
}

export function SuccessModal({ message, isOpen, onClose }: SuccessModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-[#1a1a1a] rounded-lg p-8 max-w-md w-full text-center"
          >
            <div className="flex justify-center mb-4">
              <IoCheckmarkCircle className="w-16 h-16 text-green-500" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Success!</h3>
            <p className="text-gray-300 mb-6">{message}</p>
            <button
              onClick={onClose}
              className="px-6 py-3 bg-[#FF8C00] text-white rounded-lg hover:bg-[#FF8C00]/90 transition-colors"
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 