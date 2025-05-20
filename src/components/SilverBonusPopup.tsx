
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { useGame } from "@/context/GameContext";

interface SilverBonusPopupProps {
  open: boolean;
  onClose: () => void;
  points: number;
}

const SilverBonusPopup: React.FC<SilverBonusPopupProps> = ({ open, onClose, points }) => {
  const { isEnglish } = useLanguage();
  const { currentWord } = useGame();
  
  // Auto-close after 6 seconds
  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        onClose();
      }, 6000);
      
      return () => clearTimeout(timer);
    }
  }, [open, onClose]);
  
  if (!open) return null;
  
  // Texto según idioma
  const title = isEnglish ? "LUCKY NUMBER!" : "¡NÚMERO DE LA SUERTE!";
  const message = isEnglish 
    ? `You found the magic number 6666! You've earned ${points} bonus points!` 
    : `¡Has encontrado el número mágico 6666! ¡Has ganado ${points} puntos extra!`;
  
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <motion.div 
        initial={{ opacity: 0, scale: 0.5 }} 
        animate={{ opacity: 1, scale: 1 }} 
        exit={{ opacity: 0, scale: 0.5 }}
        className="relative"
      >
        {/* Fondo brillante plateado */}
        <motion.div 
          className="absolute -inset-6 bg-gradient-to-r from-gray-300 via-gray-100 to-gray-400 rounded-lg blur-xl opacity-70"
          animate={{
            scale: [1, 1.02, 1],
            opacity: [0.7, 0.9, 0.7],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        
        {/* Contenido principal */}
        <div className="relative bg-gradient-to-b from-gray-100 to-gray-300 border-4 border-gray-400 p-6 rounded-lg shadow-xl min-w-[280px] md:min-w-[350px] text-center">
          {/* Estrella plateada en la parte superior */}
          <motion.div 
            className="absolute -top-10 left-1/2 transform -translate-x-1/2 text-5xl"
            animate={{
              rotate: 360,
              scale: [1, 1.2, 1]
            }}
            transition={{
              rotate: { duration: 10, repeat: Infinity, ease: "linear" },
              scale: { duration: 2, repeat: Infinity, repeatType: "reverse" }
            }}
          >
            ✨
          </motion.div>
          
          {/* Título */}
          <motion.h2 
            className="text-2xl font-bold text-gray-800 mb-4 kids-text"
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {title}
          </motion.h2>
          
          {/* Número mágico */}
          <motion.div 
            className="text-4xl font-bold mb-4 text-gray-800"
            animate={{
              scale: [1, 1.2, 1],
              color: ["#666666", "#AAAAAA", "#666666"]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            6666
          </motion.div>
          
          {/* Mensaje */}
          <p className="text-gray-700 mb-4 kids-text font-medium">
            {message}
          </p>
          
          {/* Puntos */}
          <motion.div 
            className="bg-gray-800 text-white py-2 px-4 rounded-lg inline-block"
            animate={{
              scale: [1, 1.05, 1],
              boxShadow: [
                "0 0 0 0 rgba(192, 192, 192, 0)",
                "0 0 0 10px rgba(192, 192, 192, 0.4)",
                "0 0 0 0 rgba(192, 192, 192, 0)"
              ]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            <span className="text-2xl font-bold kids-text">+{points} 🎲</span>
          </motion.div>
          
          {/* Decoración */}
          <div className="absolute -right-2 -top-2 text-3xl">🎯</div>
          <div className="absolute -left-2 -bottom-2 text-3xl">🎲</div>
        </div>
      </motion.div>
    </div>
  );
};

export default SilverBonusPopup;
