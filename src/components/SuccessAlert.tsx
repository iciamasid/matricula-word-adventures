
import React from "react";
import { useGame } from "@/context/GameContext";
import GamePopup from "@/components/GamePopup";

const SuccessAlert: React.FC = () => {
  const { successMessage, successPoints, successExplanation, clearSuccess } = useGame();
  
  return (
    <GamePopup
      open={!!successMessage}
      onClose={clearSuccess}
      type="success"
      message={successMessage || ""}
      points={successPoints}
      explanation={successExplanation}
    />
  );
};

export default SuccessAlert;
