
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { RefreshCw, Trophy, Star } from "lucide-react";
import { useGame } from "@/context/GameContext";
import confetti from "canvas-confetti";

const GameOverScreen: React.FC = () => {
  const { resetGame, totalPoints, level } = useGame();
  
  // Disparar confeti cuando se muestra la pantalla
  React.useEffect(() => {
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    
    const randomInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min;
    };
    
    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();
      
      if (timeLeft <= 0) {
        return clearInterval(interval);
      }
      
      const particleCount = 50 * (timeLeft / duration);
      
      // Disparar confeti desde ambos lados
      confetti({
        particleCount,
        startVelocity: 30,
        spread: 360,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ['#ffd700', '#ff4500', '#9c27b0', '#3f51b5', '#4caf50'],
      });
      
      confetti({
        particleCount,
        startVelocity: 30,
        spread: 360,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ['#ffd700', '#ff4500', '#9c27b0', '#3f51b5', '#4caf50'],
      });
      
    }, 250);
    
    return () => clearInterval(interval);
  }, []);
  
  const handleRestart = () => {
    resetGame();
  };
  
  return (
    <motion.div 
      className="fixed inset-0 z-[1000] bg-black/70 backdrop-blur-md flex flex-col items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="w-full max-w-md bg-gradient-to-b from-purple-300/95 to-purple-500/95 rounded-2xl shadow-2xl p-6 text-center"
        initial={{ scale: 0.8, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ 
          type: "spring", 
          stiffness: 400, 
          damping: 15, 
          delay: 0.2 
        }}
      >
        <div className="flex justify-center mb-4">
          <motion.div
            initial={{ rotate: -20, scale: 0.8 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Trophy className="h-28 w-28 text-yellow-300 filter drop-shadow-lg" />
          </motion.div>
        </div>
        
        <motion.h1 
          className="text-4xl font-bold text-white mb-3 kids-text tracking-wider"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          ¡JUEGO COMPLETADO!
        </motion.h1>
        
        <motion.div 
          className="text-xl text-purple-100 mb-6 font-medium"
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          Has recorrido el mundo entero
        </motion.div>
        
        <motion.div 
          className="mb-8 bg-white/20 rounded-lg p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <div className="flex items-center justify-center gap-2 text-white font-bold text-lg mb-1">
            <Star className="w-5 h-5 text-yellow-300" />
            <span>Puntuación final:</span>
          </div>
          <div className="text-3xl font-bold text-yellow-300 kids-text">
            {totalPoints} puntos
          </div>
          <div className="text-white text-sm mt-2">
            ¡Has alcanzado el nivel {level}!
          </div>
        </motion.div>
        
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mb-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <Button 
            onClick={handleRestart}
            className="bg-purple-700 hover:bg-purple-800 text-white w-full py-6 rounded-xl text-xl kids-text"
            size="lg"
          >
            <RefreshCw className="mr-2 h-5 w-5" /> 
            ¡Iniciar nueva aventura!
          </Button>
        </motion.div>
        
        <motion.div 
          className="text-sm text-purple-200"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          Gracias por jugar a Matriculabra
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default GameOverScreen;
