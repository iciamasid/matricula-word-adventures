
import React from "react";
import { useGame } from "@/context/GameContext";
import GamePopup from "@/components/GamePopup";

const ErrorAlert: React.FC = () => {
  const { errorMessage, clearError } = useGame();
  
  return (
    <GamePopup
      open={!!errorMessage}
      onClose={clearError}
      type="error"
      message={errorMessage || ""}
      points={-20}
    />
  );
};

export default ErrorAlert;
