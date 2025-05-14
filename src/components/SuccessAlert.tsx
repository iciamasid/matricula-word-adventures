
import React, { useEffect } from "react";
import { useGame } from "@/context/GameContext";
import GamePopup from "@/components/GamePopup";

const SuccessAlert: React.FC = () => {
  const { score, submitSuccess, clearSubmitSuccess } = useGame();
  
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
  
  // Only show the kilometers value
  const explanation = `${score} Kms`;
  
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
