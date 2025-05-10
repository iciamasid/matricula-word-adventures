
import React from "react";
import { useGame } from "@/context/GameContext";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const ErrorAlert: React.FC = () => {
  const { errorMessage, clearError } = useGame();
  
  return (
    <AnimatePresence>
      {errorMessage && (
        <motion.div 
          className="fixed top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-xs"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          <div className="bg-red-500 text-white px-4 py-3 rounded-lg shadow-lg relative">
            <button
              onClick={clearError}
              className="absolute right-2 top-2 text-white hover:bg-red-600 rounded-full p-1"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="pr-6 font-medium text-lg text-center kids-text">{errorMessage}</div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ErrorAlert;
