
import React from "react";
import { useGame } from "@/context/GameContext";
import GamePopup from "@/components/GamePopup";

const SuccessAlert: React.FC = () => {
  const { score, submitSuccess, clearSubmitSuccess } = useGame();
  
  return (
    <GamePopup
      open={!!submitSuccess}
      onClose={clearSubmitSuccess}
      type="success"
      message={submitSuccess || ""}
      points={score}
    />
  );
};

export default SuccessAlert;
