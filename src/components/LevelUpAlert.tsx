
import React, { useEffect } from "react";
import { useGame } from "@/context/GameContext";
import GamePopup from "@/components/GamePopup";
import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";

const LevelUpAlert: React.FC = () => {
  const { 
    level, 
    showLevelUp, 
    clearLevelUpMessage, 
    originInfo, 
    resetGame, 
    setCountryVisitRequired,
    countryVisitRequired
  } = useGame();
  const { isEnglish } = useLanguage();
  
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
  
  // Set the requirement to visit country when leveling up
  useEffect(() => {
    if (showLevelUp && level < 10) {
      // Set the flag that requires the user to visit the country
      setCountryVisitRequired(true);
    }
  }, [showLevelUp, level, setCountryVisitRequired]);

  // Get the current country based on origin info
  const getCurrentCountry = () => {
    return originInfo?.country || "";
  };
  
  // Get the next country to visit
  const getNextCountry = () => {
    switch (level) {
      case 1:
        return "Francia";
      case 2:
        return "Italia";
      case 3:
        return "Rusia";
      case 4:
        return "Japón";
      case 5:
        return "Australia";
      case 6:
        return "Estados Unidos";
      case 7:
        return "México";
      case 8:
        return "Argentina";
      case 9:
        return "España";
      default:
        return "";
    }
  };
  
  // Get the flag for the next country
  const getNextCountryFlag = () => {
    switch (level) {
      case 1:
        return "🇫🇷";
      case 2:
        return "🇮🇹";
      case 3:
        return "🇷🇺";
      case 4:
        return "🇯🇵";
      case 5:
        return "🇦🇺";
      case 6:
        return "🇺🇸";
      case 7:
        return "🇲🇽";
      case 8:
        return "🇦🇷";
      case 9:
        return "🇪🇸";
      default:
        return "";
    }
  };
  
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
  
  // Add instruction to visit the next country
  const visitMessage = level < 10 
    ? (isEnglish 
        ? `\nYou must visit ${getNextCountry()} ${getNextCountryFlag()} by clicking on its flag on the map to continue playing!` 
        : `\n¡Debes visitar ${getNextCountry()} ${getNextCountryFlag()} haciendo clic en su bandera en el mapa para seguir jugando!`)
    : "";
  
  const explanation = `${baseExplanation}${countryMessage ? "\n" + countryMessage : ""}${visitMessage}`;
  
  // Additional attention-grabbing component for the visit instruction
  const VisitInstruction = () => {
    if (level >= 10) return null;
    
    return (
      <motion.div 
        className="mt-3 p-3 bg-yellow-100 rounded-lg border-2 border-yellow-400"
        animate={{ 
          scale: [1, 1.03, 1],
          borderColor: ['#FBBF24', '#F59E0B', '#FBBF24']
        }}
        transition={{ 
          repeat: Infinity, 
          duration: 2 
        }}
      >
        <p className="text-yellow-800 font-bold kids-text text-center">
          {isEnglish 
            ? `Click on the ${getNextCountry()} ${getNextCountryFlag()} flag on the map!` 
            : `¡Haz clic en la bandera de ${getNextCountry()} ${getNextCountryFlag()} en el mapa!`}
        </p>
      </motion.div>
    );
  };
  
  return (
    <GamePopup
      open={showLevelUp}
      onClose={clearLevelUpMessage}
      type="levelUp"
      message={isEnglish ? "LEVEL UP!" : "¡SUBIDA DE NIVEL!"}
      level={level}
      explanation={explanation}
      extraContent={<VisitInstruction />}
    />
  );
};

export default LevelUpAlert;
