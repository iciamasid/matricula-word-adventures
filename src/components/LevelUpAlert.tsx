
import React, { useEffect } from "react";
import { useGame } from "@/context/GameContext";
import GamePopup from "@/components/GamePopup";
import { useLanguage } from "@/context/LanguageContext";

const LevelUpAlert: React.FC = () => {
  const { level, showLevelUp, clearLevelUpMessage } = useGame();
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

  // Get the newly unlocked country based on level
  const getUnlockedCountry = () => {
    switch(level) {
      case 1:
        return isEnglish ? "France" : "Francia";
      case 2:
        return isEnglish ? "Italy" : "Italia";
      case 3:
        return isEnglish ? "Russia" : "Rusia";
      case 4:
        return isEnglish ? "Japan" : "Japón";
      case 5:
        return isEnglish ? "Australia" : "Australia";
      case 6:
        return isEnglish ? "United States" : "Estados Unidos";
      case 7:
        return isEnglish ? "Mexico" : "México";
      case 8:
        return isEnglish ? "Peru" : "Perú";
      case 9:
        return isEnglish ? "Argentina" : "Argentina";
      case 10:
        return isEnglish ? "Spain (Full World Tour!)" : "España (¡Vuelta al mundo completa!)";
      default:
        return "";
    }
  };
  
  // Simplified explanation
  const baseExplanation = isEnglish 
    ? `Level ${level}` 
    : `Nivel ${level}`;
  
  // Modified message to say "Now you are in" instead of "You can now travel to"
  const unlockedCountry = getUnlockedCountry();
  const unlockedMessage = unlockedCountry 
    ? (isEnglish 
        ? `Now you are in ${unlockedCountry}!` 
        : `¡Ahora estás en ${unlockedCountry}!`) 
    : "";
  
  const explanation = `${baseExplanation}${unlockedMessage ? "\n" + unlockedMessage : ""}`;
  
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
