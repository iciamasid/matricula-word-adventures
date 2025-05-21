
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface LockedMotorcyclePopupProps {
  motorcycleName: string;
  level: number;
  onClose: () => void;
}

const LockedMotorcyclePopup: React.FC<LockedMotorcyclePopupProps> = ({
  motorcycleName,
  level,
  onClose,
}) => {
  const { isEnglish } = useLanguage();

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-gradient-to-br from-cyan-100 to-sky-50 border-2 border-cyan-300 p-0">
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="p-6"
          >
            <div className="flex flex-col items-center text-center">
              <div className="h-16 w-16 bg-cyan-500 rounded-full flex items-center justify-center mb-4">
                <Lock className="h-8 w-8 text-white" />
              </div>
              
              <h2 className="text-2xl font-bold mb-2 text-cyan-800 kids-text">
                {isEnglish ? "Motorcycle Locked" : "Moto Bloqueada"}
              </h2>
              
              <p className="text-center mb-4 text-gray-600 kids-text">
                {isEnglish 
                  ? `The ${motorcycleName} motorcycle will be unlocked when you reach level ${level}!`
                  : `¡La moto ${motorcycleName} se desbloqueará cuando llegues al nivel ${level}!`
                }
              </p>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={onClose}
                  className="bg-cyan-500 hover:bg-cyan-600 text-white kids-text"
                >
                  {isEnglish ? "OK, I'll keep playing!" : "¡Vale, seguiré jugando!"}
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LockedMotorcyclePopup;
