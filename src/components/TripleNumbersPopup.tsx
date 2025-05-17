
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertDialog, AlertDialogContent, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Award, Star } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useGame } from "@/context/GameContext";

const TripleNumbersPopup: React.FC = () => {
  const { showTripleNumbersPopup, bonusPoints } = useGame();
  const [stars, setStars] = useState<{x: number, y: number, size: number, delay: number}[]>([]);
  const { isEnglish } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  
  // Generate random stars for background animation and handle visibility
  useEffect(() => {
    if (showTripleNumbersPopup) {
      console.log("Triple numbers popup should be visible now");
      setIsVisible(true);
      
      const newStars = Array.from({ length: 50 }, () => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        delay: Math.random() * 3
      }));
      setStars(newStars);
      
      // Play bonus sound
      try {
        const audio = new Audio('/lovable-uploads/level-up.mp3');
        audio.volume = 0.7;
        audio.play();
      } catch (e) {
        console.error("Could not play bonus sound", e);
      }
    } else {
      setIsVisible(false);
    }
  }, [showTripleNumbersPopup]);

  // Teal color theme
  const colorTheme = {
    gradient: "from-teal-700 via-teal-600 to-teal-800",
    border: "border-yellow-400",
    button: "bg-yellow-400 hover:bg-yellow-300 text-teal-900"
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <AlertDialog open={isVisible}>
          <AlertDialogContent className="max-w-4xl border-0 p-0 bg-transparent">
            <AlertDialogTitle className="sr-only">Triple Numbers Bonus</AlertDialogTitle>
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className="relative w-full max-w-lg mx-auto"
            >
              {/* Background with stars animation */}
              <div className="absolute inset-0 overflow-hidden rounded-2xl">
                {stars.map((star, index) => (
                  <motion.div
                    key={index}
                    className="absolute rounded-full bg-yellow-300"
                    style={{ 
                      left: `${star.x}%`,
                      top: `${star.y}%`,
                      width: `${star.size}px`,
                      height: `${star.size}px`
                    }}
                    animate={{ 
                      opacity: [0, 1, 0],
                      scale: [0, 1, 0]
                    }}
                    transition={{ 
                      duration: 2,
                      delay: star.delay,
                      repeat: Infinity,
                      repeatDelay: 3
                    }}
                  />
                ))}
              </div>
              
              {/* Main bonus content */}
              <div className={`bg-gradient-to-br ${colorTheme.gradient} p-8 rounded-2xl border-4 ${colorTheme.border} shadow-[0_0_30px_rgba(20,184,166,0.7)] relative z-10`}>
                <div className="text-center">
                  <motion.div 
                    animate={{ scale: [1, 1.2, 1], rotate: [0, 5, 0, -5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="flex justify-center items-center mb-4"
                  >
                    <div className="bg-yellow-500 p-2 rounded-full">
                      <Award className="w-12 h-12 text-teal-900" />
                    </div>
                  </motion.div>
                  
                  <motion.h2 
                    className="text-4xl font-bold mb-2 text-white"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    {isEnglish ? "TRIPLE NUMBERS!" : "¡NÚMEROS TRIPLES!"}
                  </motion.h2>
                  
                  <div className="flex justify-center items-center my-4">
                    <motion.div
                      animate={{ 
                        rotateY: [0, 360],
                        scale: [1, 1.2, 1]
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="text-5xl font-bold text-yellow-300 mx-2"
                    >
                      1
                    </motion.div>
                    <motion.div
                      animate={{ 
                        rotateY: [0, 360],
                        scale: [1, 1.2, 1]
                      }}
                      transition={{ duration: 3, delay: 0.3, repeat: Infinity }}
                      className="text-5xl font-bold text-yellow-300 mx-2"
                    >
                      1
                    </motion.div>
                    <motion.div
                      animate={{ 
                        rotateY: [0, 360],
                        scale: [1, 1.2, 1]
                      }}
                      transition={{ duration: 3, delay: 0.6, repeat: Infinity }}
                      className="text-5xl font-bold text-yellow-300 mx-2"
                    >
                      1
                    </motion.div>
                  </div>
                  
                  <motion.h3 
                    className="text-3xl font-bold mb-6 text-yellow-300"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {isEnglish ? `BONUS OF ${bonusPoints} POINTS!` : `¡BONUS DE ${bonusPoints} PUNTOS!`}
                  </motion.h3>
                  
                  <div className="flex justify-center space-x-2 mb-4">
                    {[1, 2, 3].map((i) => (
                      <motion.div
                        key={i}
                        animate={{ 
                          rotate: [0, 360],
                          scale: [1, 1.5, 1]
                        }}
                        transition={{ 
                          duration: 2,
                          delay: i * 0.3,
                          repeat: Infinity
                        }}
                      >
                        <Star className="h-8 w-8 text-yellow-300" />
                      </motion.div>
                    ))}
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

export default TripleNumbersPopup;
