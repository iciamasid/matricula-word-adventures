
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
  points?: number; // Added missing points prop
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
  let textColor = 'text-blue-800';
  let borderColor = 'border-blue-300';
  
  switch (type) {
    case 'success':
      bgColor = 'bg-green-100';
      textColor = 'text-green-800';
      borderColor = 'border-green-300';
      break;
    case 'error':
      bgColor = 'bg-red-100';
      textColor = 'text-red-800';
      borderColor = 'border-red-300';
      break;
    case 'info':
      bgColor = 'bg-blue-100';
      textColor = 'text-blue-800';
      borderColor = 'border-blue-300';
      break;
    case 'levelUp':
      bgColor = 'bg-yellow-100';
      textColor = 'text-yellow-800';
      borderColor = 'border-yellow-300';
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
        className={`rounded-lg shadow-xl p-6 ${bgColor} ${borderColor} border relative max-w-md w-full mx-4`}
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
          <div className="flex justify-center mb-4">
            {icon}
          </div>
        )}

        {/* Message */}
        <h2 className={`text-2xl font-bold ${textColor} mb-4 text-center kids-text`}>
          {message}
        </h2>

        {/* Level if provided */}
        {level && (
          <p className="text-gray-700 mb-2 text-center">
            {isEnglish ? "Level" : "Nivel"}: {level}
          </p>
        )}

        {/* Points if provided */}
        {points !== undefined && (
          <p className="text-gray-700 mb-2 text-center">
            {isEnglish ? "Points" : "Puntos"}: {points}
          </p>
        )}

        {/* Explanation if provided */}
        {explanation && (
          <p className="text-gray-700 mb-4 text-center kids-text">
            {explanation}
          </p>
        )}

        {/* Close button */}
        <div className="text-center">
          <Button onClick={onClose}>
            {isEnglish ? "Close" : "Cerrar"}
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default GamePopup;
