
import React, { useEffect } from "react";
import { useGame } from "@/context/GameContext";
import GamePopup from "@/components/GamePopup";
import { useLanguage } from "@/context/LanguageContext";
import { useLocation } from "react-router-dom";

const LevelUpAlert: React.FC = () => {
  const { level, showLevelUp, clearLevelUpMessage, originInfo, resetGame } = useGame();
  const { isEnglish } = useLanguage();
  const location = useLocation();
  
  // Determine if we're in motorcycle game
  const isMotorcycleGame = location.pathname === '/motorcycle-game';
  
  // Check for navigation back from countries - only clear if not coming from a level up
  useEffect(() => {
    const navigatingBack = sessionStorage.getItem('navigatingBack');
    if (navigatingBack && navigatingBack !== 'motorcycle-game' && navigatingBack !== 'car-game') {
      // If it's just 'true', clear the level up message
      if (navigatingBack === 'true') {
        clearLevelUpMessage();
      }
      // Remove the flag
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

  // Get the current country based on origin info and game type
  const getCurrentCountry = () => {
    if (isMotorcycleGame) {
      // Motorcycle game countries
      switch (level) {
        case 1:
          return "España";
        case 2:
          return "Reino_Unido";
        case 3:
          return "Grecia";
        case 4:
          return "Noruega";
        case 5:
          return "China";
        case 6:
          return "Canada";
        case 7:
          return "Costa_Rica";
        case 8:
          return "Brasil";
        case 9:
          return "Peru";
        case 10:
          return "España";
        default:
          return "España";
      }
    } else {
      // Car game countries
      switch (level) {
        case 1:
          return "España";
        case 2:
          return "Francia";
        case 3:
          return "Italia";
        case 4:
          return "Rusia";
        case 5:
          return "Japón";
        case 6:
          return "Estados_Unidos";
        case 7:
          return "México";
        case 8:
          return "Australia";
        case 9:
          return "Argentina";
        case 10:
          return "España";
        default:
          return "España";
      }
    }
  };

  // Get country display name
  const getCountryDisplayName = () => {
    if (isMotorcycleGame) {
      switch (level) {
        case 1:
          return "España";
        case 2:
          return "Reino Unido";
        case 3:
          return "Grecia";
        case 4:
          return "Noruega";
        case 5:
          return "China";
        case 6:
          return "Canadá";
        case 7:
          return "Costa Rica";
        case 8:
          return "Brasil";
        case 9:
          return "Perú";
        case 10:
          return "España";
        default:
          return "España";
      }
    } else {
      switch (level) {
        case 1:
          return "España";
        case 2:
          return "Francia";
        case 3:
          return "Italia";
        case 4:
          return "Rusia";
        case 5:
          return "Japón";
        case 6:
          return "Estados Unidos";
        case 7:
          return "México";
        case 8:
          return "Australia";
        case 9:
          return "Argentina";
        case 10:
          return "España";
        default:
          return "España";
      }
    }
  };
  
  // Add text about choosing another vehicle
  const vehicleText = isMotorcycleGame
    ? (isEnglish ? "You can now choose a new motorcycle!" : "¡Ahora puedes elegir una nueva moto!")
    : (isEnglish ? "You can now choose a new car!" : "¡Ahora puedes elegir un nuevo coche!");
  
  // Simplified explanation
  const baseExplanation = isEnglish 
    ? `Level ${level}` 
    : `Nivel ${level}`;
  
  // Message now uses the display country name
  const currentCountryDisplay = getCountryDisplayName();
  const countryMessage = currentCountryDisplay 
    ? (isEnglish 
        ? `Now you are in ${currentCountryDisplay}!` 
        : `¡Ahora estás en ${currentCountryDisplay}!`) 
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
      countryToVisit={getCurrentCountry()} // Pass the country code for routing
      requireCountryVisit={level < 10} // Require visit for all levels except completion (level 10)
      preventAutoClose={level < 10} // Don't auto-close for levels requiring country visit
    />
  );
};

export default LevelUpAlert;
