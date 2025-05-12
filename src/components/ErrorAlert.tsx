
import React from "react";
import { useGame } from "@/context/GameContext";
import GamePopup from "@/components/GamePopup";

const ErrorAlert: React.FC = () => {
  const { errorMessage, successMessage, pointsEarned, clearError, clearSuccess } = useGame();
  
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
