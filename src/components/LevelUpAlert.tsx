
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

  // Get the current country based on origin info
  const getCurrentCountry = () => {
    return originInfo?.country || "";
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
  
  const explanation = `${baseExplanation}${countryMessage ? "\n" + countryMessage : ""}`;
  
  return (
    <GamePopup
      open={showLevelUp}
      onClose={clearLevelUpMessage}
      type="levelUp"
      message={isEnglish ? "LEVEL UP!" : "¡SUBIDA DE NIVEL!"}
      level={level}
      explanation={explanation}
    />
  );
};

export default LevelUpAlert;
