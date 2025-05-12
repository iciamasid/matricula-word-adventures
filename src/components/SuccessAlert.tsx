
import React from "react";
import { useGame } from "@/context/GameContext";
import GamePopup from "@/components/GamePopup";
import { useLanguage } from "@/context/LanguageContext";

const SuccessAlert: React.FC = () => {
  const { score, submitSuccess, clearSubmitSuccess } = useGame();
  const { isEnglish } = useLanguage();
  
  // Create simplified message with just the kilometers (changed from points)
  const explanation = isEnglish 
    ? `${score} Kms` 
    : `${score} Kms`;
  
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
