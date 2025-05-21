
import React, { useEffect } from "react";
import { useGame } from "@/context/GameContext";
import GamePopup from "@/components/GamePopup";
import { useLanguage } from "@/context/LanguageContext";

const LevelUpAlert: React.FC = () => {
  const { level, showLevelUp, clearLevelUpMessage, originInfo } = useGame();
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
  
  // No more handling for level 10 completion here, as it's now done in CompletionBanner
  
  // Get the current country based on origin info
  const getCurrentCountry = () => {
    return originInfo?.country || "";
  };
  
  // Add text about choosing another car
  const carText = isEnglish 
    ? "You can now choose a new car!" 
    : "¡Ahora puedes elegir un nuevo coche!";
  
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
  
  // Add the car text to the explanation
  const explanation = `${baseExplanation}${countryMessage ? "\n" + countryMessage : ""}\n${carText}`;
  
  return (
    <GamePopup
      open={showLevelUp && level < 10} // Only show for levels below 10
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
