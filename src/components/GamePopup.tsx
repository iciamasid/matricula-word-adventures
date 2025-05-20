
import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/LanguageContext';

export interface GamePopupProps {
  open: boolean;
  onClose: () => void;
  type: 'success' | 'error' | 'info' | 'levelUp';
  message: string;
  level?: number;
  explanation?: string;
  icon?: React.ReactNode;
  points?: number;
}

const GamePopup: React.FC<GamePopupProps> = ({
  open,
  onClose,
  type,
  message,
  level,
  explanation,
  icon,
  points
}) => {
  const { isEnglish } = useLanguage();
  
  // If popup is not open, don't render anything
  if (!open) return null;

  // Determine background color based on type
  let bgColor = 'bg-blue-100';
  let bgGradient = 'from-blue-50 to-blue-100';
  let textColor = 'text-blue-800';
  let borderColor = 'border-blue-300';
  let buttonColor = 'bg-blue-500 hover:bg-blue-600';
  
  switch (type) {
    case 'success':
      bgColor = 'bg-green-100';
      bgGradient = 'from-green-50 to-green-100';
      textColor = 'text-green-800';
      borderColor = 'border-green-300';
      buttonColor = 'bg-green-500 hover:bg-green-600';
      break;
    case 'error':
      bgColor = 'bg-red-100';
      bgGradient = 'from-red-50 to-red-100';
      textColor = 'text-red-800';
      borderColor = 'border-red-300';
      buttonColor = 'bg-red-500 hover:bg-red-600';
      break;
    case 'info':
      bgColor = 'bg-blue-100';
      bgGradient = 'from-blue-50 to-blue-100';
      textColor = 'text-blue-800';
      borderColor = 'border-blue-300';
      buttonColor = 'bg-blue-500 hover:bg-blue-600';
      break;
    case 'levelUp':
      bgColor = 'bg-yellow-100';
      bgGradient = 'from-yellow-50 to-amber-100';
      textColor = 'text-yellow-800';
      borderColor = 'border-yellow-300';
      buttonColor = 'bg-yellow-500 hover:bg-yellow-600';
      break;
    default:
      break;
  }

  return (
    <motion.div
      className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-black/50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className={`rounded-lg shadow-xl p-6 bg-gradient-to-b ${bgGradient} ${borderColor} border-4 relative max-w-md w-full mx-4`}
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -50, opacity: 0 }}
      >
        {/* Close button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </Button>

        {/* Icon if provided */}
        {icon && (
          <motion.div 
            className="flex justify-center mb-4"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring" }}
          >
            {icon}
          </motion.div>
        )}

        {/* Message */}
        <motion.h2 
          className={`text-2xl font-bold ${textColor} mb-4 text-center kids-text`}
          animate={{ 
            scale: type === 'levelUp' ? [1, 1.05, 1] : 1 
          }}
          transition={{ 
            duration: 2, 
            repeat: type === 'levelUp' ? Infinity : 0,
            repeatType: "reverse"
          }}
        >
          {message}
        </motion.h2>

        {/* Level if provided */}
        {level && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <p className={`${textColor} mb-2 text-center text-xl font-bold`}>
              {isEnglish ? "Level" : "Nivel"}: {level}
            </p>
          </motion.div>
        )}

        {/* Points if provided */}
        {points !== undefined && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-white/80 rounded-lg p-2 mb-3 shadow-inner"
          >
            <p className={`${textColor} text-center text-xl font-bold`}>
              {isEnglish ? "Points" : "Puntos"}: +{points}
            </p>
          </motion.div>
        )}

        {/* Explanation if provided */}
        {explanation && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <p className="text-gray-700 mb-4 text-center kids-text">
              {explanation}
            </p>
          </motion.div>
        )}

        {/* Close button */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Button 
            onClick={onClose} 
            className={`${buttonColor} text-white kids-text`}
          >
            {isEnglish ? "Close" : "Cerrar"}
          </Button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default GamePopup;
