
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertDialog, AlertDialogContent } from "@/components/ui/alert-dialog";
import { Trophy, Star, Rocket, Globe, PartyPopper, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGame } from "@/context/GameContext";
import confetti from "canvas-confetti";
import { useLanguage } from "@/context/LanguageContext";
import LoadingScreen from "@/components/LoadingScreen";

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
  const [showRestartScreen, setShowRestartScreen] = useState(false);
  
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
  
  // Auto-close after 3 seconds (updated from 12)
  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        handleNewGame();
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [open]);
  
  // Handle new game start
  const handleNewGame = () => {
    // Show the restart loading screen
    setShowRestartScreen(true);
    
    // Close the completion banner
    onClose();
    
    // Reset game after a short delay to allow loading screen to display
    setTimeout(() => {
      resetGame();
      // Hide loading screen after reset
      setTimeout(() => {
        setShowRestartScreen(false);
      }, 2000); // Show loading screen for 2 seconds
    }, 500);
  };
  
  const name = playerName || (
    playerGender === "niño" ? (isEnglish ? "champion" : "campeón") : 
    playerGender === "niña" ? (isEnglish ? "champion" : "campeona") : 
    (isEnglish ? "champion" : "campeón/a")
  );
  
  return (
    <>
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
                <div className="bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 p-8 rounded-2xl border-8 border-yellow-300 shadow-[0_0_50px_rgba(234,179,8,0.7)] relative z-10 overflow-hidden">
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
                    </div>
                  </div>
                </div>
              </motion.div>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </AnimatePresence>
      
      {/* New Restart Loading Screen */}
      {showRestartScreen && (
        <RestartLoadingScreen onLoadComplete={() => setShowRestartScreen(false)} />
      )}
    </>
  );
};

// Create a specialized loading screen for game restart
const RestartLoadingScreen: React.FC<{ onLoadComplete: () => void }> = ({ onLoadComplete }) => {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    // Simulate progressive loading over 2 seconds
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        const newProgress = prevProgress + (100/20); // 20 steps to reach 100%
        
        if (newProgress >= 100) {
          clearInterval(interval);
          // Small delay to show 100% before completing
          setTimeout(() => {
            onLoadComplete();
          }, 200);
          return 100;
        }
        
        return newProgress;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [onLoadComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 flex flex-col items-center justify-center bg-gray-900/80 backdrop-blur-sm z-50"
    >
      <motion.div 
        className="max-w-md w-full px-4 flex flex-col items-center"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        <img 
          src="/lovable-uploads/9e7f018b-48ce-4158-acf0-ddcc7e2b4804.png" 
          alt="Matriculabra Cadabra" 
          className="w-full max-h-60 object-contain mb-8"
        />
        
        <div className="w-full space-y-3">
          <Progress value={progress} className="h-3 bg-purple-200" />
          <p className="text-center text-white kids-text text-xl drop-shadow-md">
            {progress < 100 ? "Iniciando nueva partida..." : "¡Listo!"}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Import Progress component to avoid TypeScript errors
import { Progress } from "@/components/ui/progress";

export default CompletionBanner;
