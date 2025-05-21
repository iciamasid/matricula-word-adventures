
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertDialog, AlertDialogContent } from "@/components/ui/alert-dialog";
import { Trophy, Star, Rocket, Globe, PartyPopper, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGame } from "@/context/GameContext";
import confetti from "canvas-confetti";
import { useLanguage } from "@/context/LanguageContext";

interface CompletionBannerProps {
  open: boolean;
  onClose: () => void;
}

const CompletionBanner: React.FC<CompletionBannerProps> = ({ 
  open, 
  onClose
}) => {
  const { playerName, playerGender, totalPoints, resetGame } = useGame();
  const { t, isEnglish } = useLanguage();
  const [confettiLaunched, setConfettiLaunched] = useState(false);
  
  // Create confetti effect
  useEffect(() => {
    if (open && !confettiLaunched) {
      const duration = 5 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };
      
      const randomInRange = (min: number, max: number) => {
        return Math.random() * (max - min) + min;
      };
      
      const interval: any = setInterval(() => {
        const timeLeft = animationEnd - Date.now();
        
        if (timeLeft <= 0) {
          return clearInterval(interval);
        }
        
        const particleCount = 50 * (timeLeft / duration);
        
        // Launch particles from both sides
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
        });
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
        });
      }, 250);
      
      setConfettiLaunched(true);
      
      return () => clearInterval(interval);
    }
  }, [open, confettiLaunched]);
  
  // Auto-close after 12 seconds
  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        onClose();
      }, 12000);
      
      return () => clearTimeout(timer);
    }
  }, [open, onClose]);
  
  // Handle new game start
  const handleNewGame = () => {
    console.log("Starting new game from CompletionBanner");
    resetGame();
    onClose();
  };
  
  const name = playerName || (
    playerGender === "niño" ? (isEnglish ? "champion" : "campeón") : 
    playerGender === "niña" ? (isEnglish ? "champion" : "campeona") : 
    (isEnglish ? "champion" : "campeón/a")
  );
  
  return (
    <AnimatePresence>
      {open && (
        <AlertDialog open={open}>
          <AlertDialogContent className="max-w-4xl border-0 p-0 bg-transparent">
            <motion.div
              initial={{ scale: 0.5, opacity: 0, y: -100 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.5, opacity: 0, y: -100 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className="relative w-full max-w-4xl mx-auto"
            >
              {/* Fondo plateado */}
              <div className="bg-gradient-to-br from-gray-300 via-[#9F9EA1] to-gray-400 p-8 rounded-2xl border-8 border-gray-200 shadow-[0_0_50px_rgba(159,158,161,0.7)] relative z-10 overflow-hidden">
                {/* Background animation */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                  <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle,_white_10%,_transparent_70%)]"></div>
                  {[...Array(20)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute bg-gray-200 rounded-full"
                      style={{
                        width: Math.random() * 20 + 10,
                        height: Math.random() * 20 + 10,
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                      }}
                      animate={{
                        scale: [1, 2, 1],
                        opacity: [0.7, 1, 0.7],
                      }}
                      transition={{
                        duration: Math.random() * 3 + 2,
                        repeat: Infinity,
                        repeatType: "reverse",
                      }}
                    />
                  ))}
                </div>
                
                <div className="relative z-10">
                  <div className="text-center">
                    <motion.div
                      className="flex justify-center mb-4"
                      animate={{ rotate: [0, 5, 0, -5, 0], scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <img 
                        src="/lovable-uploads/fiesta.gif" 
                        alt={isEnglish ? "Celebration" : "Celebración"}
                        className="w-32 h-32 object-contain"
                      />
                    </motion.div>
                    
                    <motion.h2
                      className="text-5xl font-bold mb-4 text-white kids-text tracking-wider"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      {isEnglish ? `CONGRATULATIONS ${name.toUpperCase()}!` : `¡FELICIDADES ${name.toUpperCase()}!`}
                    </motion.h2>
                    
                    <motion.div
                      className="flex justify-center items-center mb-4 space-x-4"
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <Trophy className="h-8 w-8 text-yellow-300" />
                      <h3 className="text-3xl font-bold text-yellow-300 kids-text">
                        {isEnglish ? "YOU'VE COMPLETED THE WORLD TOUR!" : "¡HAS COMPLETADO LA VUELTA AL MUNDO!"}
                      </h3>
                      <Trophy className="h-8 w-8 text-yellow-300" />
                    </motion.div>
                    
                    <motion.div
                      className="text-center mb-6"
                      animate={{ y: [0, 5, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <p className="text-2xl text-white kids-text mb-2">
                        {isEnglish ? "You've earned a total of" : "Has conseguido un total de"}
                      </p>
                      <div className="flex items-center justify-center gap-2">
                        <Star className="h-6 w-6 text-yellow-300" />
                        <span className="text-4xl font-bold text-yellow-300 kids-text">
                          {totalPoints} {isEnglish ? "POINTS" : "PUNTOS"}
                        </span>
                        <Star className="h-6 w-6 text-yellow-300" />
                      </div>
                    </motion.div>
                    
                    {/* Mensaje adicional invitando a empezar una nueva partida */}
                    <motion.p 
                      className="text-2xl text-white kids-text mt-4 mb-6"
                      animate={{ opacity: [0.8, 1, 0.8] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      {isEnglish ? "You can start a new adventure!" : "¡Puedes empezar otra partida!"}
                    </motion.p>
                    
                    <div className="flex justify-center gap-4 mt-6">
                      <motion.div 
                        className="flex items-center gap-2"
                        animate={{ rotate: [0, 5, 0, -5, 0] }}
                        transition={{ duration: 3, repeat: Infinity }}
                      >
                        <PartyPopper className="h-8 w-8 text-white" />
                      </motion.div>
                      <motion.div 
                        className="flex items-center gap-2"
                        animate={{ rotate: [0, -5, 0, 5, 0] }}
                        transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                      >
                        <Globe className="h-8 w-8 text-white" />
                      </motion.div>
                      <motion.div 
                        className="flex items-center gap-2"
                        animate={{ rotate: [0, 5, 0, -5, 0] }}
                        transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                      >
                        <Rocket className="h-8 w-8 text-white" />
                      </motion.div>
                    </div>
                    
                    <div className="mt-8 flex flex-col md:flex-row justify-center gap-4">
                      <motion.div 
                        whileHover={{ scale: 1.05 }}
                      >
                        <Button 
                          onClick={onClose}
                          className="bg-blue-600 hover:bg-blue-700 text-white text-xl px-8 py-3 rounded-full kids-text"
                        >
                          {isEnglish ? "Keep playing!" : "¡Seguir jugando!"}
                        </Button>
                      </motion.div>
                      
                      {/* Botón de iniciar nueva partida - ahora más prominente */}
                      <motion.div 
                        whileHover={{ scale: 1.05 }}
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <Button 
                          onClick={handleNewGame}
                          className="bg-green-600 hover:bg-green-700 text-white text-xl px-8 py-3 rounded-full kids-text flex items-center gap-2"
                        >
                          <RefreshCw className="w-5 h-5" />
                          {isEnglish ? "Start New Game" : "Iniciar nueva partida"}
                        </Button>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </AnimatePresence>
  );
};

export default CompletionBanner;
