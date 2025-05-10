
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertDialog, AlertDialogContent } from "@/components/ui/alert-dialog";
import { Award, Gift, Star, Check, X, Trophy } from "lucide-react";

interface GamePopupProps {
  open: boolean;
  onClose: () => void;
  type: "success" | "error" | "levelUp";
  message: string;
  points?: number;
  level?: number;
}

const GamePopup: React.FC<GamePopupProps> = ({ 
  open, 
  onClose, 
  type, 
  message, 
  points = 0, 
  level 
}) => {
  const [stars, setStars] = useState<{x: number, y: number, size: number, delay: number}[]>([]);
  
  // Generate random stars for background animation
  useEffect(() => {
    if (open) {
      const newStars = Array.from({ length: 30 }, () => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 1,
        delay: Math.random() * 2
      }));
      setStars(newStars);
      
      // Auto-close after 3 seconds
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [open, onClose]);

  // Define colors and icons based on type
  const getColors = () => {
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
        <AlertDialog open={open}>
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
              
              {/* Main popup content */}
              <div className={`bg-gradient-to-br ${colors.from} ${colors.via} ${colors.to} p-6 rounded-2xl border-4 ${colors.border} ${colors.shadow} relative z-10`}>
                <div className="text-center">
                  <motion.div 
                    animate={{ scale: [1, 1.2, 1], rotate: [0, 5, 0, -5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="flex justify-center items-center mb-4"
                  >
                    <div className={`${colors.bgIconColor} p-2 rounded-full`}>
                      {colors.icon}
                    </div>
                  </motion.div>
                  
                  <motion.h2 
                    className="text-3xl font-bold mb-2 text-white kids-text"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    {message}
                  </motion.h2>
                  
                  {points !== 0 && (
                    <motion.h3 
                      className="text-2xl font-bold mb-6 text-yellow-300 kids-text"
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      {points > 0 ? `+${points} PUNTOS` : `${points} PUNTOS`}
                    </motion.h3>
                  )}
                  
                  {level && type === "levelUp" && (
                    <div className="mb-4">
                      <motion.div
                        className="text-4xl font-bold text-yellow-300 kids-text"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      >
                        ¡NIVEL {level}!
                      </motion.div>
                      <div className="flex justify-center space-x-2 mt-2">
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
                            <Star className="h-6 w-6 text-yellow-300" />
                          </motion.div>
                        ))}
                      </div>
                    </div>
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
