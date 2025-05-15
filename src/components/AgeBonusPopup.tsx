
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertDialog, AlertDialogContent } from "@/components/ui/alert-dialog";
import { Gift, Star } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface AgeBonusPopupProps {
  open: boolean;
  onClose: () => void;
  age: number | null;
  points: number;
}

const AgeBonusPopup: React.FC<AgeBonusPopupProps> = ({ 
  open, 
  onClose, 
  age,
  points 
}) => {
  const { t, isEnglish } = useLanguage();
  const [stars, setStars] = useState<{x: number, y: number, size: number, delay: number}[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  
  // Generate random stars for background animation
  useEffect(() => {
    if (open) {
      setIsVisible(true);
      const newStars = Array.from({ length: 30 }, () => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 1,
        delay: Math.random() * 2
      }));
      setStars(newStars);
      
      // Auto-close after 3.5 seconds
      const timer = setTimeout(() => {
        handleClose();
      }, 3500);
      
      return () => clearTimeout(timer);
    }
  }, [open]);
  
  // Handle proper closing with animation
  const handleClose = () => {
    setIsVisible(false);
    // Wait for exit animation to finish before calling onClose
    setTimeout(() => {
      onClose();
    }, 300);
  };

  return (
    <AnimatePresence>
      {open && (
        <AlertDialog open={isVisible} onOpenChange={() => handleClose()}>
          <AlertDialogContent className="max-w-sm border-0 p-0 bg-transparent">
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className="relative w-full max-w-xs mx-auto"
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
              
              {/* Main popup content with pink theme */}
              <div className="bg-gradient-to-br from-pink-500 via-pink-400 to-pink-600 p-6 rounded-2xl border-4 border-yellow-300 shadow-[0_0_30px_rgba(236,72,153,0.7)] relative z-10">
                <div className="text-center">
                  <motion.div 
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="flex justify-center items-center mb-4"
                  >
                    <div className="bg-yellow-400 p-2 rounded-full">
                      <Gift className="w-10 h-10 text-pink-900" />
                    </div>
                  </motion.div>
                  
                  <motion.h2 
                    className="text-3xl font-bold mb-2 text-white kids-text"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    {isEnglish ? "AGE BONUS!" : "¡BONUS POR EDAD!"}
                  </motion.h2>
                  
                  <motion.div 
                    className="text-2xl font-bold mb-4 text-yellow-300 kids-text"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {isEnglish 
                      ? `The plate matches your age: ${age}!` 
                      : `¡La matrícula coincide con tu edad: ${age}!`}
                  </motion.div>
                  
                  <motion.div
                    className="text-xl font-bold text-white kids-text mb-2"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    <div className="flex justify-center items-center">
                      <Star className="h-5 w-5 text-yellow-300 mr-2" />
                      <span>+{points} {isEnglish ? "POINTS!" : "PUNTOS!"}</span>
                      <Star className="h-5 w-5 text-yellow-300 ml-2" />
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </AnimatePresence>
  );
};

export default AgeBonusPopup;
