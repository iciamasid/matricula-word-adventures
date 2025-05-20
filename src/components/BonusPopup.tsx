
import React, { useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { motion } from "framer-motion";
import { Gift, Star } from "lucide-react";

interface BonusPopupProps {
  open: boolean;
  onClose: () => void;
  points: number;
}

const BonusPopup: React.FC<BonusPopupProps> = ({ open, onClose, points }) => {
  // Auto-close after 6 seconds
  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        onClose();
      }, 6000);
      
      // Play bonus sound
      try {
        const audio = new Audio('/lovable-uploads/level-up.mp3');
        audio.volume = 0.5;
        audio.play();
      } catch (e) {
        console.error("Could not play bonus sound", e);
      }
      
      return () => clearTimeout(timer);
    }
  }, [open, onClose]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-gradient-to-b from-yellow-50 to-amber-100 p-6 rounded-lg border-4 border-amber-400 shadow-xl max-w-sm">
        <div className="flex flex-col items-center text-center space-y-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20
            }}
            className="bg-amber-400 rounded-full p-4"
          >
            <motion.div
              animate={{ 
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Gift className="h-10 w-10 text-amber-800" />
            </motion.div>
          </motion.div>
          
          <div>
            <motion.h2 
              className="text-2xl font-bold text-amber-800 kids-text"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              ¡BONUS ESPECIAL!
            </motion.h2>
            <p className="mt-2 text-amber-700 kids-text text-lg">
              ¡Has encontrado la matrícula legendaria!
            </p>
            <div className="mt-4 bg-white p-3 rounded-lg shadow-inner">
              <motion.p 
                className="text-3xl font-bold text-green-600 kids-text"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.7, repeat: Infinity }}
              >
                +{points} kms
              </motion.p>
            </div>
          </div>

          <motion.div
            className="w-full mt-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex justify-center space-x-2">
              {[1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  animate={{ 
                    rotate: [0, 360],
                    scale: [1, 1.5, 1]
                  }}
                  transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }}
                >
                  <Star className="h-6 w-6 text-amber-500" fill="currentColor" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BonusPopup;
