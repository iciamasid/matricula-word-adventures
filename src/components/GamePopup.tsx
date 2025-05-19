
import React, { useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { motion } from "framer-motion";
import { useGame } from "@/context/GameContext";

interface GamePopupProps {
  open: boolean;
  onClose: () => void;
  type: "success" | "error" | "levelUp";
  message: string;
  explanation?: string;
  points?: number;
  level?: number;
  extraContent?: React.ReactNode; // Add support for extra content
  preventAutoClose?: boolean; // Add option to prevent auto-closing
}

const GamePopup: React.FC<GamePopupProps> = ({
  open,
  onClose,
  type,
  message,
  explanation,
  points,
  level,
  extraContent, // Add extra content prop
  preventAutoClose = false // Default to false for backward compatibility
}) => {
  const { countryVisitRequired } = useGame?.() || { countryVisitRequired: false };
  
  // Auto-close after 5 seconds for success messages, but not if preventAutoClose is true
  // or if it's a levelUp popup and countryVisitRequired is true
  useEffect(() => {
    if (open && type === "success" && !preventAutoClose) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000);
      return () => clearTimeout(timer);
    }
    
    // For levelUp popups, only auto-close if there's no country visit required
    if (open && type === "levelUp" && !countryVisitRequired && !preventAutoClose) {
      const timer = setTimeout(() => {
        onClose();
      }, 8000);
      return () => clearTimeout(timer);
    }
  }, [open, onClose, type, preventAutoClose, countryVisitRequired]);

  // Determine background color and border based on type
  let bgColor = "bg-green-100";
  let borderColor = "border-green-300";
  let textColor = "text-green-800";

  if (type === "error") {
    bgColor = "bg-red-100";
    borderColor = "border-red-300";
    textColor = "text-red-800";
  } else if (type === "levelUp") {
    bgColor = "bg-purple-100";
    borderColor = "border-purple-300";
    textColor = "text-purple-800";
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className={`${bgColor} p-6 rounded-lg border-4 ${borderColor} shadow-xl max-w-md`}>
        <div className="flex flex-col items-center text-center space-y-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20
            }}
            className="rounded-full p-4"
          >
            <motion.div
              animate={{ 
                rotate: [0, 360],
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {type === "success" && <span className="text-4xl">🎉</span>}
              {type === "error" && <span className="text-4xl">⚠️</span>}
              {type === "levelUp" && <span className="text-4xl">🚀</span>}
            </motion.div>
          </motion.div>
          
          <motion.h2 
            className="text-2xl font-bold kids-text"
            style={{ color: textColor }}
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            {message}
          </motion.h2>
          
          {explanation && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className={`${textColor} kids-text text-lg whitespace-pre-line`}
            >
              {explanation}
            </motion.p>
          )}
          
          {/* Render extra content if provided */}
          {extraContent && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="w-full"
            >
              {extraContent}
            </motion.div>
          )}
          
          {points && (
            <motion.p 
              className="text-3xl font-bold text-green-600 kids-text"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.7, repeat: Infinity }}
            >
              +{points} kms
            </motion.p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GamePopup;
