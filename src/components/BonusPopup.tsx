
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertDialog, AlertDialogContent } from "@/components/ui/alert-dialog";
import { Award, Star } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface BonusPopupProps {
  open: boolean;
  onClose: () => void;
  points: number;
}

const BonusPopup: React.FC<BonusPopupProps> = ({ 
  open, 
  onClose, 
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
      
      // Auto-close after 4 seconds
      const timer = setTimeout(() => {
        handleClose();
      }, 4000);
      
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
          <AlertDialogContent className="max-w-lg border-0 p-0 bg-transparent">
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className="relative w-full max-w-md mx-auto"
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
              
              {/* Main popup content with purple theme */}
              <div className="bg-gradient-to-br from-purple-600 via-purple-500 to-purple-700 p-6 rounded-2xl border-4 border-yellow-300 shadow-[0_0_30px_rgba(147,51,234,0.7)] relative z-10">
                <div className="text-center">
                  <motion.div 
                    animate={{ 
                      rotate: [0, 360],
                      scale: [1, 1.2, 1]
                    }}
                    transition={{ 
                      rotate: { duration: 2, repeat: Infinity, ease: "linear" },
                      scale: { duration: 1.5, repeat: Infinity }
                    }}
                    className="flex justify-center items-center mb-4"
                  >
                    <div className="bg-yellow-400 p-3 rounded-full">
                      <Award className="w-14 h-14 text-purple-900" />
                    </div>
                  </motion.div>
                  
                  <motion.div className="mb-4">
                    <motion.h2 
                      className="text-4xl font-bold mb-2 text-white kids-text"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      {isEnglish ? "SPECIAL BONUS!" : "¡BONUS ESPECIAL!"}
                    </motion.h2>
                    
                    <motion.div 
                      className="text-3xl font-bold mb-2 text-yellow-300 kids-text"
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      6666
                    </motion.div>
                  </motion.div>
                  
                  <motion.div
                    className="text-2xl font-bold text-white kids-text mb-4"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    <div className="flex justify-center items-center">
                      <Star className="h-6 w-6 text-yellow-300 mr-2" />
                      <span>+{points} {isEnglish ? "KILOMETERS!" : "KILÓMETROS!"}</span>
                      <Star className="h-6 w-6 text-yellow-300 ml-2" />
                    </div>
                  </motion.div>
                  
                  <p className="text-xl text-purple-100 kids-text">
                    {isEnglish 
                      ? "You found the lucky plate!" 
                      : "¡Has encontrado la matrícula de la suerte!"}
                  </p>
                </div>
              </div>
            </motion.div>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </AnimatePresence>
  );
};

export default BonusPopup;
