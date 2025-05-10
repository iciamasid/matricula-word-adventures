
import React from "react";
import { useGame } from "@/context/GameContext";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ErrorAlert: React.FC = () => {
  const { errorMessage, clearError } = useGame();
  
  if (!errorMessage) return null;
  
  return (
    <AnimatePresence>
      <motion.div 
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-full max-w-xs z-50"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
      >
        <Alert variant="destructive" className="relative">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{errorMessage}</AlertDescription>
          <button 
            onClick={clearError}
            className="absolute top-2 right-2 text-destructive hover:text-destructive/80"
          >
            <X className="h-4 w-4" />
          </button>
        </Alert>
      </motion.div>
    </AnimatePresence>
  );
};

export default ErrorAlert;
