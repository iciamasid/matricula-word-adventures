
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
import { Star, X, MapPin, Bike } from "lucide-react";
import useSound from "./hooks/useSoundEffect";
import { cn } from "@/lib/utils";

interface GamePopupProps {
  open: boolean;
  onClose: () => void;
  type: "error" | "success" | "levelUp";
  message: string;
  level?: number;
  explanation?: string;
  points: number;
  countryToVisit?: string;
  requireCountryVisit?: boolean;
  motorcycleOption?: boolean;
  onMotorcycleClick?: () => void;
}

const GamePopup: React.FC<GamePopupProps> = ({
  open,
  onClose,
  type,
  message,
  level = 1,
  explanation = "",
  points,
  countryToVisit,
  requireCountryVisit = false,
  motorcycleOption = false,
  onMotorcycleClick
}) => {
  const [isVisible, setIsVisible] = useState(open);
  const { playLevelUpSound } = useSound();
  const navigate = useNavigate();
  const { isEnglish } = useLanguage();

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (open) {
      setIsVisible(true);
      
      // Play sound for level up
      if (type === "levelUp") {
        playLevelUpSound();
      }
      
      // Auto close for success messages after 3 seconds
      if (type === "success") {
        timer = setTimeout(() => {
          setIsVisible(false);
          setTimeout(onClose, 300); // Wait for animation to finish
        }, 3000);
      }
    } else {
      setIsVisible(false);
    }
    
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [open, onClose, type, playLevelUpSound]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300); // Wait for animation to finish
  };

  const handleVisitCountry = () => {
    if (countryToVisit) {
      navigate(`/country/${countryToVisit}`);
      handleClose();
    }
  };

  const getBgColor = () => {
    switch (type) {
      case "error":
        return "from-red-500 to-red-600";
      case "success":
        return "from-green-500 to-green-600";
      case "levelUp":
        return "from-purple-500 to-indigo-600";
      default:
        return "from-blue-500 to-blue-600";
    }
  };

  const getBorderColor = () => {
    switch (type) {
      case "error":
        return "border-red-400";
      case "success":
        return "border-green-400";
      case "levelUp":
        return "border-purple-400";
      default:
        return "border-blue-400";
    }
  };

  const getIcon = () => {
    switch (type) {
      case "error":
        return <X className="h-8 w-8 text-red-100" />;
      case "success":
        return <Star className="h-8 w-8 text-yellow-300" />;
      case "levelUp":
        return <Star className="h-8 w-8 text-yellow-300" />;
      default:
        return <Star className="h-8 w-8 text-blue-100" />;
    }
  };

  if (!open && !isVisible) return null;

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center z-50 bg-black/60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className={`max-w-sm w-11/12 bg-gradient-to-r ${getBgColor()} p-1 rounded-xl`}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          >
            <div className={`bg-white rounded-lg p-5 ${getBorderColor()}`}>
              <div className="flex items-center mb-3">
                <div className={`flex-shrink-0 rounded-full p-2 
                  ${type === 'error' ? 'bg-red-500' : type === 'success' ? 'bg-green-500' : 'bg-purple-600'}`}>
                  {getIcon()}
                </div>
                <h3 className="ml-3 text-xl font-bold kids-text">
                  {message}
                </h3>
                
                {/* Display level badge for level up */}
                {type === "levelUp" && (
                  <div className="ml-auto bg-purple-100 text-purple-800 text-xl font-bold rounded-full h-10 w-10 flex items-center justify-center kids-text">
                    {level}
                  </div>
                )}
              </div>
              
              {/* Show points for success */}
              {type === "success" && points > 0 && (
                <motion.div
                  className="text-center text-2xl font-bold text-green-600 mb-3 kids-text"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: [0.8, 1.2, 1] }}
                  transition={{ duration: 0.5 }}
                >
                  +{points} {isEnglish ? "points" : "puntos"}
                </motion.div>
              )}
              
              {/* Explanation text */}
              {explanation && (
                <p className="text-gray-700 text-md mb-4 kids-text whitespace-pre-line">
                  {explanation}
                </p>
              )}
              
              {/* Action buttons */}
              <div className="flex flex-col space-y-2">
                {/* Button to visit country if required */}
                {requireCountryVisit && countryToVisit && (
                  <Button
                    onClick={handleVisitCountry}
                    className="kids-text bg-blue-600 hover:bg-blue-700 text-white flex items-center"
                  >
                    <MapPin className="mr-2 h-4 w-4" />
                    {isEnglish ? "Visit " + countryToVisit : "Visitar " + countryToVisit}
                  </Button>
                )}
                
                {/* Button to play with motorcycles if offered */}
                {motorcycleOption && onMotorcycleClick && (
                  <Button
                    onClick={onMotorcycleClick}
                    className="kids-text bg-teal-600 hover:bg-teal-700 text-white flex items-center"
                  >
                    <Bike className="mr-2 h-4 w-4" />
                    {isEnglish ? "Play with motorcycles" : "Jugar con motos"}
                  </Button>
                )}
                
                {/* Close button */}
                <Button
                  onClick={handleClose}
                  variant="outline"
                  className={cn(
                    "kids-text",
                    type === "error" ? "text-red-700 border-red-300 hover:bg-red-50" :
                    type === "success" ? "text-green-700 border-green-300 hover:bg-green-50" :
                    "text-purple-700 border-purple-300 hover:bg-purple-50"
                  )}
                >
                  {isEnglish ? "Close" : "Cerrar"}
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GamePopup;
