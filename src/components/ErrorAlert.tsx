
import React from "react";
import { useGame } from "@/context/GameContext";
import GamePopup from "@/components/GamePopup";

const ErrorAlert: React.FC = () => {
  const { state, clearError, clearSuccess } = useGame();
  const { errorMessage, successMessage, pointsEarned } = state;
  
  return (
    <>
      <GamePopup
        open={!!errorMessage}
        onClose={clearError}
        type="error"
        message={errorMessage || ""}
        points={-20}
      />
      
      <GamePopup
        open={!!successMessage}
        onClose={clearSuccess}
        type="success"
        message={successMessage || ""}
        points={pointsEarned}
      />
    </>
  );
};

export default ErrorAlert;
