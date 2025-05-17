
import React from "react";
import { useGame } from "@/context/GameContext";
import GamePopup from "@/components/GamePopup";

const ErrorAlert: React.FC = () => {
  const { errorMessage, clearError } = useGame();
  
  // Simplified points display
  const explanation = "-20 Kms";
  
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
