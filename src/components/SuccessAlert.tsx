
import React, { useEffect } from "react";
import { useGame } from "@/context/GameContext";
import GamePopup from "@/components/GamePopup";

const SuccessAlert: React.FC = () => {
  const { totalPoints, submitSuccess, clearSubmitSuccess } = useGame();
  
  // Verificar si estamos navegando entre páginas
  useEffect(() => {
    const navigatingBack = sessionStorage.getItem('navigatingBack');
    if (navigatingBack === 'true') {
      // Si estamos navegando entre páginas, limpiar el mensaje de éxito
      clearSubmitSuccess();
      // Eliminar el flag de navegación
      sessionStorage.removeItem('navigatingBack');
    }
  }, [clearSubmitSuccess]);
  
  // Show the total kilometers accumulated
  const explanation = `${totalPoints} Kms`;
  
  return (
    <GamePopup
      open={!!submitSuccess}
      onClose={clearSubmitSuccess}
      type="success"
      message={submitSuccess || ""}
      points={totalPoints}
      explanation={explanation}
    />
  );
};

export default SuccessAlert;
