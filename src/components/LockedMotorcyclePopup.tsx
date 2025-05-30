
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Lock, Car, Bike } from "lucide-react";

interface LockedMotorcyclePopupProps {
  open: boolean;
  onClose: () => void;
  currentLevel: number;
}

const LockedMotorcyclePopup = ({
  open,
  onClose,
  currentLevel
}: LockedMotorcyclePopupProps) => {
  const levelsRemaining = Math.max(0, 10 - currentLevel);
  
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40" 
          />
          
          {/* Popup */}
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.8,
              y: 50
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0
            }}
            exit={{
              opacity: 0,
              scale: 0.8,
              y: 50
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 25
            }}
            className="fixed inset-0 flex items-center justify-center z-50 p-4"
          >
            <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-2xl p-6 max-w-sm w-full mx-4 shadow-2xl border-4 border-teal-200">
              {/* Header with animated icons */}
              <div className="text-center mb-4">
                <div className="flex justify-center items-center gap-3 mb-3">
                  <motion.div
                    animate={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Car className="w-8 h-8 text-purple-600" />
                  </motion.div>
                  
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <Lock className="w-6 h-6 text-amber-500" />
                  </motion.div>
                  
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                  >
                    <Bike className="w-8 h-8 text-teal-600" />
                  </motion.div>
                </div>
                
                <h2 className="text-xl font-bold text-teal-800 kids-text mb-2">
                  🏍️ ¡Las motos están bloqueadas! 🔒
                </h2>
              </div>

              {/* Simplified Message */}
              <div className="text-center mb-4">
                <p className="text-base text-teal-700 kids-text mb-3">
                  ¡Completa todos los niveles con coches para desbloquear las motos! 🚗✨
                </p>
                
                <div className="bg-white/70 rounded-xl p-3 mb-3">
                  <p className="text-teal-800 kids-text font-semibold text-sm">
                    Nivel actual: <span className="text-purple-600">{currentLevel}</span>/10
                  </p>
                  {levelsRemaining > 0 && (
                    <p className="text-teal-700 kids-text mt-1 text-base">
                      Te faltan <span className="font-bold text-amber-600">{levelsRemaining} niveles</span>
                    </p>
                  )}
                </div>
              </div>

              {/* Close Button - Positioned higher */}
              <div className="text-center">
                <Button 
                  onClick={onClose}
                  className="bg-teal-600 hover:bg-teal-700 text-white kids-text px-6 py-2 rounded-full shadow-lg transform hover:scale-105 transition-all duration-200 text-lg"
                >
                  ¡Entendido! 🚗
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default LockedMotorcyclePopup;
