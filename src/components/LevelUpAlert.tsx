
import React from "react";
import { useGame } from "@/context/GameContext";
import GamePopup from "@/components/GamePopup";
import { useLanguage } from "@/context/LanguageContext";

const LevelUpAlert: React.FC = () => {
  const { level, showLevelUp, clearLevelUpMessage } = useGame();
  const { isEnglish } = useLanguage();
  
  // Create simplified level up message
  const explanation = isEnglish 
    ? `Level ${level}` 
    : `Nivel ${level}`;
  
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
