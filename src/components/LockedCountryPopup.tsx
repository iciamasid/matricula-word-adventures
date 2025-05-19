
import React from "react";
import { motion } from "framer-motion";
import { Lock } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/button";

interface LockedCountryPopupProps {
  country: string;
  onClose: () => void;
}

const LockedCountryPopup: React.FC<LockedCountryPopupProps> = ({
  country,
  onClose,
}) => {
  const { isEnglish } = useLanguage();

  // Check if the country is Spain and prevent showing the popup
  // This is an additional safeguard in case some part of the code still tries to lock Spain
  const isSpain = country.toLowerCase().includes("spain") || 
                  country.toLowerCase().includes("españa") || 
                  country.toLowerCase() === "spain" || 
                  country.toLowerCase() === "españa";

  // If it's Spain, close the popup immediately
  if (isSpain) {
    onClose();
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-gradient-to-r from-pink-300 to-pink-400 rounded-xl shadow-lg p-6 max-w-md w-11/12 border-2 border-pink-500"
      >
        <div className="flex flex-col items-center text-center">
          <motion.div
            animate={{ rotate: [0, -10, 10, -10, 10, 0] }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-pink-100 rounded-full p-5 mb-4"
          >
            <Lock className="w-10 h-10 text-pink-700" />
          </motion.div>
          
          <h2 className="text-2xl font-bold kids-text text-pink-900 mb-2">
            {isEnglish ? "Country Locked!" : "¡País bloqueado!"}
          </h2>

          <motion.div 
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mb-4 text-lg text-pink-800 kids-text"
          >
            <p className="mb-2">
              {isEnglish 
                ? `You haven't unlocked ${country} yet!` 
                : `¡Todavía no has desbloqueado ${country}!`}
            </p>
            <p>
              {isEnglish 
                ? "Keep playing to discover new countries!" 
                : "¡Sigue jugando para descubrir nuevos países!"}
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              onClick={onClose} 
              className="bg-pink-700 hover:bg-pink-800 text-white kids-text px-8 py-2 text-lg"
            >
              {isEnglish ? "OK" : "Vale"}
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default LockedCountryPopup;
