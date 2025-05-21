
import React from "react";
import { motion } from "framer-motion";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trophy, Bike } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useGame } from "@/context/GameContext";

interface CompletionBannerProps {
  open: boolean;
  onClose: () => void;
}

const CompletionBanner: React.FC<CompletionBannerProps> = ({ open, onClose }) => {
  const { isEnglish } = useLanguage();
  const { resetGame, startMotorcycleTour, level } = useGame();

  // Handler to start a new game
  const handleNewGame = () => {
    resetGame();
    onClose();
  };

  // Handler to start motorcycle tour
  const handleStartMotorcycleTour = () => {
    startMotorcycleTour();
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-gradient-to-br from-purple-100 to-indigo-50 border-2 border-purple-300 p-0">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="p-6"
        >
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="h-16 w-16 bg-purple-500 rounded-full flex items-center justify-center mb-2">
              <Trophy className="h-8 w-8 text-white" />
            </div>

            <h2 className="text-2xl font-bold mb-1 text-purple-800 kids-text">
              {isEnglish ? "CONGRATULATIONS!" : "¡ENHORABUENA!"}
            </h2>

            <p className="text-center mb-2 text-gray-600 kids-text">
              {isEnglish
                ? `You've completed all ${level} levels of the World Tour!`
                : `¡Has completado los ${level} niveles de la Vuelta al Mundo!`}
            </p>

            <div className="flex flex-col gap-3 w-full max-w-xs">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={handleNewGame}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white kids-text"
                >
                  {isEnglish ? "Start New Game" : "Iniciar Nuevo Juego"}
                </Button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={handleStartMotorcycleTour}
                  className="w-full bg-cyan-600 hover:bg-cyan-700 text-white kids-text flex items-center justify-center gap-2"
                >
                  <Bike className="w-5 h-5" />
                  {isEnglish ? "Start Motorcycle Tour!" : "¡Iniciar Tour en Moto!"}
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

export default CompletionBanner;
