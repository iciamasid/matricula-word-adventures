
import React from "react";
import { useGame } from "@/context/GameContext";
import GamePopup from "@/components/GamePopup";
import { useLanguage } from "@/context/LanguageContext";

const SuccessAlert: React.FC = () => {
  const { score, submitSuccess, clearSubmitSuccess } = useGame();
  const { isEnglish } = useLanguage();
  
  // Calculate kilometers based on score (1 point = 1 km)
  const kilometers = score;
  
  // Create explanation message based on language
  const explanation = isEnglish 
    ? `You've traveled ${kilometers} km towards your destination!` 
    : `¡Has recorrido ${kilometers} km hacia tu destino!`;
  
  return (
    <GamePopup
      open={!!submitSuccess}
      onClose={clearSubmitSuccess}
      type="success"
      message={submitSuccess || ""}
      points={score}
      explanation={explanation}
    />
  );
};

export default SuccessAlert;
