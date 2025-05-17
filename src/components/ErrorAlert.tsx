
import React from "react";
import { useGame } from "@/context/GameContext";
import GamePopup from "@/components/GamePopup";
import { useLanguage } from "@/context/LanguageContext";

const ErrorAlert: React.FC = () => {
  const { errorMessage, clearError } = useGame();
  const { t, isEnglish } = useLanguage();
  
  // Get localized message for points deduction
  const explanation = isEnglish ? "-20 Points deducted" : "-20 Puntos restados";
  
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
