
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertDialog, AlertDialogContent } from "@/components/ui/alert-dialog";
import { Trophy, Star, Map, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGame } from "@/context/GameContext";
import confetti from "canvas-confetti";
import { useLanguage } from "@/context/LanguageContext";

interface WorldCompletionBannerProps {
  open: boolean;
  onClose: () => void;
}

const WorldCompletionBanner: React.FC<WorldCompletionBannerProps> = ({ 
  open, 
  onClose
}) => {
  const { playerName, playerGender, totalPoints, resetGame } = useGame();
  const { t, isEnglish } = useLanguage();
  const [confettiLaunched, setConfettiLaunched] = useState(false);
  
  // Create confetti effect
  useEffect(() => {
    if (open && !confettiLaunched) {
      const duration = 8 * 1000;
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
  
  // Handle restart game
  const handleRestartGame = () => {
    resetGame();
    onClose();
  };
  
  // Get player name or default to appropriate title
  const name = playerName || (
    playerGender === "niño" ? (isEnglish ? "champion" : "campeón") : 
    playerGender === "niña" ? (isEnglish ? "champion" : "campeona") : 
    (isEnglish ? "champion" : "campeón/a")
  );
  
  // Create rainbow gradient background
  const rainbowBackground = "bg-gradient-to-br from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500";
  
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
              <div className={`${rainbowBackground} p-8 rounded-2xl border-8 border-yellow-300 shadow-[0_0_50px_rgba(234,179,8,0.7)] relative z-10 overflow-hidden`}>
                {/* Background animation */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                  <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle,_white_10%,_transparent_70%)]"></div>
                  {[...Array(20)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute bg-yellow-300 rounded-full"
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
                      className="flex justify-center mb-6"
                      animate={{ rotate: [0, 5, 0, -5, 0], scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <img 
                        src="/lovable-uploads/tierra.gif" 
                        alt={isEnglish ? "World" : "Mundo"}
                        className="w-40 h-40 object-contain rounded-full border-4 border-white shadow-lg"
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
                    
                    <div className="flex justify-around gap-4 mt-8 flex-wrap">
                      {['🇪🇸', '🇫🇷', '🇮🇹', '🇷🇺', '🇯🇵', '🇦🇺', '🇺🇸', '🇲🇽', '🇵🇪', '🇦🇷'].map((flag, i) => (
                        <motion.div 
                          key={i}
                          className="text-4xl"
                          animate={{ 
                            rotate: [0, i % 2 === 0 ? 20 : -20, 0],
                            scale: [1, 1.2, 1]
                          }}
                          transition={{ 
                            duration: 2 + (i * 0.2), 
                            repeat: Infinity,
                            delay: i * 0.2
                          }}
                        >
                          {flag}
                        </motion.div>
                      ))}
                    </div>
                    
                    <motion.div 
                      className="mt-8"
                      whileHover={{ scale: 1.05 }}
                    >
                      <Button 
                        onClick={handleRestartGame}
                        className="bg-blue-600 hover:bg-blue-700 text-white text-xl px-8 py-6 rounded-full kids-text"
                      >
                        <Gift className="mr-2 h-6 w-6" />
                        {isEnglish ? "Start new adventure!" : "¡Comenzar nueva aventura!"}
                      </Button>
                    </motion.div>
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

export default WorldCompletionBanner;
