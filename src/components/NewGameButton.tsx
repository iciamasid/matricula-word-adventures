import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useGame } from "@/context/GameContext";
import { Plus, Star, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

const NewGameButton: React.FC = () => {
  const { generateNewPlate, gamesPlayed, showBonusPopup, showAgeBonusPopup, showCompletionBanner, setIsGeneratingLicensePlate } = useGame();
  const [isAnimating, setIsAnimating] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  
  // Check if any popups are open
  const popupsOpen = showBonusPopup || showAgeBonusPopup || showCompletionBanner;
  
  // Disable button when popups are open
  useEffect(() => {
    setButtonDisabled(popupsOpen);
  }, [popupsOpen]);
  
  const handleClick = () => {
    if (buttonDisabled) return;
    
    setIsAnimating(true);
    setButtonDisabled(true);
    
    // Signal that we're starting the license plate generation
    setIsGeneratingLicensePlate(true);
    
    // Trigger plate generation but with a 3 second delay for the animation
    setTimeout(() => {
      generateNewPlate();
      setButtonDisabled(false);
      
      // Keep the animation going for a bit longer after generation
      setTimeout(() => setIsAnimating(false), 1000);
    }, 3000);
  };
  
  return (
    <motion.div 
      className="text-center space-y-2 bg-white p-3 rounded-lg shadow-lg w-full max-w-xs mb-2"
      whileHover={{ scale: buttonDisabled ? 1 : 1.03 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Button
        onClick={handleClick}
        disabled={buttonDisabled}
        className={`px-4 py-4 ${buttonDisabled 
          ? 'bg-gray-400 cursor-not-allowed' 
          : 'bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800'
        } w-full ${isAnimating ? "animate-bounce" : ""}`}
      >
        <div className="relative w-full flex items-center justify-center">
          {/* Slot machine reel effect */}
          <div className="flex gap-1 mr-2">
            {isAnimating ? (
              <>
                <motion.span 
                  className="inline-block text-lg font-bold"
                  animate={{ y: [-20, 20], opacity: [0, 1, 0] }}
                  transition={{ duration: 0.3, times: [0, 0.5, 1], repeat: 10 }}
                >
                  7
                </motion.span>
                <motion.span 
                  className="inline-block text-lg font-bold"
                  animate={{ y: [-20, 20], opacity: [0, 1, 0] }}
                  transition={{ duration: 0.3, times: [0, 0.5, 1], repeat: 10, delay: 0.1 }}
                >
                  7
                </motion.span>
                <motion.span 
                  className="inline-block text-lg font-bold"
                  animate={{ y: [-20, 20], opacity: [0, 1, 0] }}
                  transition={{ duration: 0.3, times: [0, 0.5, 1], repeat: 10, delay: 0.2 }}
                >
                  7
                </motion.span>
              </>
            ) : (
              <Plus className="mr-0 h-4 w-4" />
            )}
          </div>
          <span className={isAnimating ? "ml-2" : ""}>
            {isAnimating ? (
              <div className="flex items-center">
                <span>Generando</span>
                <Loader2 className="ml-2 h-4 w-4 animate-spin" />
              </div>
            ) : (
              "Nueva Matrícula"
            )}
          </span>
        </div>
      </Button>
      
      <div className="flex items-center justify-center text-xs text-gray-500">
        <Star className="w-3 h-3 mr-1 text-game-yellow" />
        <span>{gamesPlayed} partidas jugadas</span>
      </div>
    </motion.div>
  );
};

export default NewGameButton;
