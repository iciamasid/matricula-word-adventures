
import React from "react";
import { useGame } from "@/context/GameContext";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ErrorAlert: React.FC = () => {
  const { errorMessage, clearError } = useGame();
  
  return (
    <AnimatePresence>
      {errorMessage && (
        <motion.div 
          className="absolute top-20 left-1/2 transform -translate-x-1/2 w-full max-w-xs z-50"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20, transition: { duration: 0.2 } }}
          transition={{ type: "spring", damping: 15 }}
        >
          <Alert variant="destructive" className="relative border-2 border-red-500 bg-white shadow-lg">
            <motion.div 
              animate={{ rotate: [0, -5, 5, -5, 5, 0] }}
              transition={{ duration: 0.5 }}
            >
              <AlertTriangle className="h-5 w-5" />
            </motion.div>
            <AlertTitle className="text-lg">¡Error!</AlertTitle>
            <AlertDescription className="text-base">{errorMessage}</AlertDescription>
            <motion.button 
              onClick={clearError}
              className="absolute top-2 right-2 text-destructive hover:text-destructive/80"
              whileHover={{ scale: 1.2, rotate: 90 }}
              transition={{ duration: 0.2 }}
            >
              <X className="h-5 w-5" />
            </motion.button>
          </Alert>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ErrorAlert;
