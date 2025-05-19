
import React, { useEffect } from "react";
import { useGame } from "@/context/GameContext";
import GamePopup from "@/components/GamePopup";
import { useLanguage } from "@/context/LanguageContext";
import CompletionConfetti from "./CompletionConfetti";

const LevelUpAlert: React.FC = () => {
  const { level, showLevelUp, clearLevelUpMessage, originInfo, resetGame } = useGame();
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
      console.log("Level 10 reached! Showing completion message before resetting game.");
      
      // Reset game after the popup is shown and closed (8 seconds)
      const timer = setTimeout(() => {
        console.log("Resetting game after level 10 completion...");
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
  
  // Show both the level up popup and the completion confetti for level 10
  return (
    <>
      <GamePopup
        open={showLevelUp}
        onClose={clearLevelUpMessage}
        type="levelUp"
        message={isEnglish ? "LEVEL UP!" : "¡SUBIDA DE NIVEL!"}
        level={level}
        explanation={explanation}
      />
      
      {/* Show completion confetti only at level 10 */}
      {showLevelUp && level >= 10 && (
        <CompletionConfetti onClose={clearLevelUpMessage} />
      )}
    </>
  );
};

export default LevelUpAlert;
