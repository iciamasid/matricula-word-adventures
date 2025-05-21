
import React, { useEffect } from "react";
import { useGame } from "@/context/GameContext";
import GamePopup from "@/components/GamePopup";
import { useLanguage } from "@/context/LanguageContext";

const LevelUpAlert: React.FC = () => {
  const { level, showLevelUp, clearLevelUpMessage, originInfo, resetGame, isMotorcycleMode } = useGame();
  const { isEnglish } = useLanguage();
  
  // Check if we're navigating between pages
  useEffect(() => {
    const navigatingBack = sessionStorage.getItem('navigatingBack');
    if (navigatingBack === 'true') {
      // If navigating between pages, clear the level message
      clearLevelUpMessage();
      // Remove the navigation flag
      sessionStorage.removeItem('navigatingBack');
    }
  }, [clearLevelUpMessage]);
  
  // Special handling for level 10 completion - reset the game
  useEffect(() => {
    if (showLevelUp && level >= 10) {
      // Reset game after the popup is shown and closed (8 seconds)
      const timer = setTimeout(() => {
        resetGame();
        clearLevelUpMessage();
      }, 8000);
      
      return () => clearTimeout(timer);
    }
  }, [showLevelUp, level, resetGame, clearLevelUpMessage]);

  // Get the current country based on origin info
  const getCurrentCountry = () => {
    return originInfo?.country || "";
  };
  
  // Add text about choosing another vehicle based on game mode
  const vehicleText = isEnglish 
    ? `You can now choose a new ${isMotorcycleMode ? 'motorcycle' : 'car'}!` 
    : `¡Ahora puedes elegir ${isMotorcycleMode ? 'una nueva moto' : 'un nuevo coche'}!`;
  
  // Simplified explanation
  const baseExplanation = isEnglish 
    ? `Level ${level}` 
    : `Nivel ${level}`;
  
  // Message now uses the origin country (where you actually are)
  const currentCountry = getCurrentCountry();
  const countryMessage = currentCountry 
    ? (isEnglish 
        ? `Now you are in ${currentCountry}!` 
        : `¡Ahora estás en ${currentCountry}!`) 
    : "";
  
  // Add the vehicle text to the explanation
  const explanation = `${baseExplanation}${countryMessage ? "\n" + countryMessage : ""}\n${vehicleText}`;
  
  return (
    <GamePopup
      open={showLevelUp}
      onClose={clearLevelUpMessage}
      type="levelUp"
      message={isEnglish ? "LEVEL UP!" : "¡SUBIDA DE NIVEL!"}
      level={level}
      explanation={explanation}
      points={0}
      countryToVisit={currentCountry} // Pass the country to visit
      requireCountryVisit={!!currentCountry} // Require visit only if there's a country
    />
  );
};

export default LevelUpAlert;
