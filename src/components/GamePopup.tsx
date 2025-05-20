
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertDialog, AlertDialogContent, AlertDialogTitle, AlertDialogDescription } from "@/components/ui/alert-dialog";
import { Award, Gift, Star, Check, X, Trophy } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface GamePopupProps {
  open: boolean;
  onClose: () => void;
  type: "success" | "error" | "levelUp" | "bonus";
  message: string;
  points?: number;
  level?: number;
  explanation?: string;
  icon?: React.ReactNode; // Add the icon prop to the interface
}

const GamePopup: React.FC<GamePopupProps> = ({ 
  open, 
  onClose, 
  type, 
  message, 
  points = 0, 
  level,
  explanation // Added explanation prop
}) => {
  const { isEnglish } = useLanguage();
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
      
      // Auto-close after 2 seconds (shortened from 3)
      const timer = setTimeout(() => {
        handleClose();
      }, 2000);
      
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

  // Check if this is the special completion popup (level 10)
  const isCompletion = type === "levelUp" && level === 10;

  // Define colors and icons based on type
  const getColors = () => {
    // Special case for completion popup (level 10)
    if (isCompletion) {
      return {
        from: "from-amber-500",
        via: "via-yellow-500",
        to: "to-amber-600",
        border: "border-purple-400",
        icon: <Trophy className="w-14 h-14 text-amber-800" />,
        bgIconColor: "bg-purple-200", 
        shadow: "shadow-[0_0_40px_rgba(245,158,11,0.9)]",
        textColor: "text-amber-800"
      };
    }
    
    switch(type) {
      case "success":
        return {
          from: "from-green-600",
          via: "via-green-500",
          to: "to-green-700",
          border: "border-yellow-400",
          icon: <Check className="w-10 h-10 text-green-900" />,
          bgIconColor: "bg-yellow-400",
          shadow: "shadow-[0_0_30px_rgba(34,197,94,0.7)]",
          textColor: "text-green-900"
        };
      case "error":
        return {
          from: "from-red-600",
          via: "via-red-500",
          to: "to-red-700", 
          border: "border-yellow-400",
          icon: <X className="w-10 h-10 text-red-900" />,
          bgIconColor: "bg-yellow-400",
          shadow: "shadow-[0_0_30px_rgba(220,38,38,0.7)]",
          textColor: "text-red-900"
        };
      case "bonus":
        return {
          from: "from-pink-600", 
          via: "via-pink-500", 
          to: "to-pink-700",
          border: "border-yellow-400",
          icon: <Gift className="w-10 h-10 text-pink-900" />,
          bgIconColor: "bg-yellow-400",
          shadow: "shadow-[0_0_30px_rgba(236,72,153,0.7)]",
          textColor: "text-pink-900"
        };
      case "levelUp":
        return {
          from: "from-blue-600", 
          via: "via-blue-500", 
          to: "to-blue-700",
          border: "border-yellow-400",
          icon: <Trophy className="w-10 h-10 text-blue-900" />,
          bgIconColor: "bg-yellow-400",
          shadow: "shadow-[0_0_30px_rgba(59,130,246,0.7)]",
          textColor: "text-blue-900"
        };
      default:
        return {
          from: "from-purple-600", 
          via: "via-purple-500", 
          to: "to-purple-700",
          border: "border-yellow-400",
          icon: <Star className="w-10 h-10 text-purple-900" />,
          bgIconColor: "bg-yellow-400",
          shadow: "shadow-[0_0_30px_rgba(168,85,247,0.7)]",
          textColor: "text-purple-900"
        };
    }
  };

  const colors = getColors();

  return (
    <AnimatePresence>
      {open && (
        <AlertDialog open={isVisible} onOpenChange={() => handleClose()}>
          <AlertDialogContent className={`max-w-sm border-0 p-0 bg-transparent ${isCompletion ? 'scale-110' : ''}`}>
            {/* Hidden, but needed for accessibility */}
            <AlertDialogTitle className="sr-only">{message}</AlertDialogTitle>
            <AlertDialogDescription className="sr-only">{explanation}</AlertDialogDescription>
            
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
                    className={`absolute rounded-full ${isCompletion ? 'bg-purple-300' : 'bg-yellow-300'}`}
                    style={{ 
                      left: `${star.x}%`,
                      top: `${star.y}%`,
                      width: `${isCompletion ? star.size * 1.5 : star.size}px`,
                      height: `${isCompletion ? star.size * 1.5 : star.size}px`
                    }}
                    animate={{ 
                      opacity: [0, 1, 0],
                      scale: [0, 1, 0]
                    }}
                    transition={{ 
                      duration: isCompletion ? 2.5 : 2,
                      delay: star.delay,
                      repeat: Infinity,
                      repeatDelay: 3
                    }}
                  />
                ))}
              </div>
              
              {/* Main popup content */}
              <div className={`bg-gradient-to-br ${colors.from} ${colors.via} ${colors.to} p-6 rounded-2xl border-4 ${colors.border} ${colors.shadow} relative z-10 ${isCompletion ? 'p-8' : ''}`}>
                <div className="text-center">
                  <motion.div 
                    animate={{ scale: isCompletion ? [1, 1.3, 1] : [1, 1.2, 1] }}
                    transition={{ duration: isCompletion ? 2 : 1.5, repeat: Infinity }}
                    className="flex justify-center items-center mb-4"
                  >
                    <div className={`${colors.bgIconColor} p-2 rounded-full`}>
                      {colors.icon}
                    </div>
                  </motion.div>
                  
                  {/* For level 10 completion, show a more emphatic message */}
                  {isCompletion ? (
                    <motion.div 
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="space-y-2"
                    >
                      <h2 className="text-4xl font-bold text-white kids-text">
                        ¡¡¡ENHORABUENA!!!
                      </h2>
                      <p className="text-2xl font-bold text-purple-200 kids-text">
                        ¡HAS SUPERADO TODOS LOS NIVELES!
                      </p>
                    </motion.div>
                  ) : (
                    <motion.h2 
                      className="text-3xl font-bold mb-2 text-white kids-text"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      {message}
                    </motion.h2>
                  )}
                  
                  {/* New simplified explanation text for kilometers */}
                  {explanation && !isCompletion && (
                    <motion.div 
                      className="text-2xl font-bold mb-2 text-yellow-300 kids-text"
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      {explanation}
                    </motion.div>
                  )}
                  
                  {level && type === "levelUp" && !isCompletion && (
                    <div className="mb-4">
                      <motion.div
                        className="text-4xl font-bold text-yellow-300 kids-text"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      >
                        {isEnglish ? `LEVEL ${level}!` : `¡NIVEL ${level}!`}
                      </motion.div>
                      <div className="flex justify-center space-x-2 mt-2">
                        {[1, 2, 3].map((i) => (
                          <motion.div
                            key={i}
                            animate={{ 
                              rotate: 360,
                              scale: [1, 1.5, 1]
                            }}
                            transition={{ 
                              duration: 2,
                              delay: i * 0.3,
                              repeat: Infinity
                            }}
                          >
                            <Star className="h-6 w-6 text-yellow-300" />
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* For level 10 completion - extra stars */}
                  {isCompletion && (
                    <div className="flex justify-center space-x-3 mt-4">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <motion.div
                          key={i}
                          animate={{ 
                            rotate: 360,
                            scale: [1, 1.8, 1]
                          }}
                          transition={{ 
                            duration: 2,
                            delay: i * 0.2,
                            repeat: Infinity
                          }}
                        >
                          <Star className="h-8 w-8 text-purple-200" />
                        </motion.div>
                      ))}
                    </div>
                  )}
                  
                  {/* Bonus points display */}
                  {type === "bonus" && points && (
                    <motion.div 
                      className="text-3xl font-bold text-yellow-300 kids-text mt-2"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      +{points} {isEnglish ? "POINTS!" : "¡PUNTOS!"}
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </AnimatePresence>
  );
};

export default GamePopup;
