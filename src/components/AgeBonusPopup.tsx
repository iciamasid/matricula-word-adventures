
import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { motion } from "framer-motion";
import { Award } from "lucide-react";

interface AgeBonusPopupProps {
  open: boolean;
  onClose: () => void;
  points: number;
  age: number;
}

const AgeBonusPopup: React.FC<AgeBonusPopupProps> = ({ open, onClose, points, age }) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-purple-100 p-6 rounded-lg border-4 border-yellow-400 shadow-xl max-w-sm">
        <div className="flex flex-col items-center text-center space-y-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20
            }}
            className="bg-yellow-400 rounded-full p-4"
          >
            <motion.div
              animate={{ 
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Award className="h-10 w-10 text-purple-700" />
            </motion.div>
          </motion.div>
          
          <div>
            <motion.h2 
              className="text-2xl font-bold text-purple-800 kids-text"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              ¡BONUS DE EDAD!
            </motion.h2>
            <p className="mt-2 text-purple-700 kids-text text-lg">
              ¡La matrícula tiene tu edad ({age})!
            </p>
            <div className="mt-4 bg-white p-3 rounded-lg shadow-inner">
              <motion.p 
                className="text-3xl font-bold text-green-600 kids-text"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.7, repeat: Infinity }}
              >
                +{points} puntos
              </motion.p>
            </div>
          </div>

          <motion.div
            className="w-full mt-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <p className="text-sm text-purple-600 italic">
              ¡Sigue jugando para conseguir más puntos!
            </p>
          </motion.div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AgeBonusPopup;
