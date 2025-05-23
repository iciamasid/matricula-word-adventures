
import React, { useEffect } from "react";
import { useGame } from "@/context/GameContext";
import GamePopup from "@/components/GamePopup";
import { useLanguage } from "@/context/LanguageContext";
import { useNavigate } from "react-router-dom";

const LevelUpAlert: React.FC = () => {
  const { level, showLevelUp, clearLevelUpMessage, originInfo, resetGame } = useGame();
  const { isEnglish } = useLanguage();
  const navigate = useNavigate();
  
  // Verificar si estamos navegando entre páginas
  useEffect(() => {
    const navigatingBack = sessionStorage.getItem('navigatingBack');
    if (navigatingBack === 'true') {
      // Si estamos navegando entre páginas, limpiar el mensaje de nivel
      clearLevelUpMessage();
      // Eliminar el flag de navegación
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
  
  // Check if we're in motorcycle game
  const isMotorcycleGame = window.location.pathname.includes("motorcycle");
  
  // Add text about choosing another car or motorcycle
  const vehicleText = isMotorcycleGame
    ? (isEnglish 
        ? "You can now choose a new motorcycle!" 
        : "¡Ahora puedes elegir una nueva moto!")
    : (isEnglish 
        ? "You can now choose a new car!" 
        : "¡Ahora puedes elegir un nuevo coche!");
  
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
  
  // Add the option to play with motorcycles after completing car game
  const motorcycleMessage = level >= 10 && !isMotorcycleGame ? 
    (isEnglish ? "\nYou can now also play with motorcycles!" : "\n¡Ahora también puedes jugar con motos!") : "";
  
  const finalExplanation = explanation + motorcycleMessage;
  
  // Handler for motorcycle game suggestion
  const handleMotorcycleOption = () => {
    if (level >= 10 && !isMotorcycleGame) {
      navigate('/motorcycle-game');
    }
  };
  
  return (
    <GamePopup
      open={showLevelUp}
      onClose={clearLevelUpMessage}
      type="levelUp"
      message={isEnglish ? "LEVEL UP!" : "¡SUBIDA DE NIVEL!"}
      level={level}
      explanation={finalExplanation}
      points={0}
      countryToVisit={currentCountry} // Pass the country to visit
      requireCountryVisit={!!currentCountry} // Require visit only if there's a country
      motorcycleOption={level >= 10 && !isMotorcycleGame}
      onMotorcycleClick={handleMotorcycleOption}
    />
  );
};

export default LevelUpAlert;
