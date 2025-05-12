
import React from "react";
import { useGame } from "@/context/GameContext";
import GamePopup from "@/components/GamePopup";
import { useLanguage } from "@/context/LanguageContext";

const ErrorAlert: React.FC = () => {
  const { errorMessage, clearError } = useGame();
  const { isEnglish } = useLanguage();
  
  // Create simple explanation
  const explanation = isEnglish 
    ? `-20 Kms` 
    : `-20 Kms`;
  
  return (
    <GamePopup
      open={!!errorMessage}
      onClose={clearError}
      type="error"
      message={errorMessage || ""}
      points={-20}
      explanation={explanation}
    />
  );
};

export default ErrorAlert;
