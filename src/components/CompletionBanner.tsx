
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useGame } from '@/context/GameContext';
import { Button } from "@/components/ui/button";
import { Trophy, CheckCircle, Bike } from "lucide-react";

interface CompletionBannerProps {
  open: boolean;
  onClose: () => void;
}

const CompletionBanner: React.FC<CompletionBannerProps> = ({ open, onClose }) => {
  const navigate = useNavigate();
  const { resetGame } = useGame();
  const [closing, setClosing] = useState(false);

  if (!open) return null;
  
  const handleClose = () => {
    setClosing(true);
    setTimeout(() => {
      onClose();
      setClosing(false);
    }, 300);
  };

  const handleRestart = () => {
    resetGame();
    onClose();
  };
  
  // New handler to navigate to motorcycle game
  const handleGoToMotorcycle = () => {
    onClose();
    navigate('/motorcycle-game');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: closing ? 0 : 1 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-60"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: closing ? 0.8 : 1, opacity: closing ? 0 : 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-0.5 rounded-xl max-w-md w-11/12"
      >
        <div className="bg-white rounded-lg p-6 text-center">
          <div className="mb-4 flex flex-col items-center">
            <motion.div
              animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: 1 }}
              className="text-yellow-500 mb-2"
            >
              <Trophy size={60} />
            </motion.div>
            <h2 className="text-3xl font-bold text-purple-800 kids-text">¡ENHORABUENA!</h2>
          </div>

          <div className="text-lg text-gray-700 kids-text mb-6 space-y-4">
            <p>¡Has completado la vuelta al mundo en coche!</p>
            
            <div className="flex items-center justify-center gap-2 text-green-600">
              <CheckCircle size={20} />
              <span>10 países visitados</span>
            </div>
            
            <p>Ahora puedes empezar una nueva aventura o continuar explorando con motos.</p>
          </div>
          
          <div className="flex flex-col space-y-3">
            <Button
              onClick={handleGoToMotorcycle}
              className="bg-teal-600 hover:bg-teal-700 kids-text text-lg flex items-center justify-center"
            >
              <Bike className="mr-2 h-5 w-5" />
              Jugar con Motos
            </Button>
            
            <Button 
              onClick={handleRestart}
              className="bg-purple-600 hover:bg-purple-700 kids-text text-lg"
            >
              Volver a empezar
            </Button>
            
            <Button
              onClick={handleClose}
              variant="outline"
              className="border-purple-300 text-purple-700 hover:bg-purple-50 kids-text"
            >
              Cerrar
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CompletionBanner;
