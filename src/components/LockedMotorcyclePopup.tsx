
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Lock, Car, Bike } from "lucide-react";

interface LockedMotorcyclePopupProps {
  open: boolean;
  onClose: () => void;
  currentLevel: number;
}

const LockedMotorcyclePopup = ({ open, onClose, currentLevel }: LockedMotorcyclePopupProps) => {
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
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 25 
            }}
            className="fixed inset-0 flex items-center justify-center z-50 p-4"
          >
            <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-3xl p-8 max-w-md w-full mx-4 shadow-2xl border-4 border-teal-200">
              {/* Header with animated icons */}
              <div className="text-center mb-6">
                <div className="flex justify-center items-center gap-4 mb-4">
                  <motion.div
                    animate={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Car className="w-12 h-12 text-purple-600" />
                  </motion.div>
                  
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <Lock className="w-8 h-8 text-amber-500" />
                  </motion.div>
                  
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                  >
                    <Bike className="w-12 h-12 text-teal-600" />
                  </motion.div>
                </div>
                
                <h2 className="text-2xl font-bold text-teal-800 kids-text mb-2">
                  🏍️ ¡Las motos están bloqueadas! 🔒
                </h2>
              </div>

              {/* Message */}
              <div className="text-center mb-6">
                <p className="text-lg text-teal-700 kids-text mb-4">
                  ¡Qué emocionante que quieras conducir motos! 🤩
                </p>
                <p className="text-base text-teal-600 kids-text mb-4">
                  Pero primero necesitas completar <strong>todos los niveles con coches</strong> para demostrar que eres un conductor experto. 🚗✨
                </p>
                <div className="bg-white/70 rounded-2xl p-4 mb-4">
                  <p className="text-teal-800 kids-text font-semibold">
                    Nivel actual: <span className="text-purple-600">{currentLevel}</span>/10
                  </p>
                  {levelsRemaining > 0 && (
                    <p className="text-teal-700 kids-text text-sm mt-2">
                      Te faltan <span className="font-bold text-amber-600">{levelsRemaining} niveles</span> para desbloquear las motos
                    </p>
                  )}
                </div>
                <p className="text-base text-teal-600 kids-text">
                  ¡Sigue jugando con coches y pronto podrás usar motos increíbles! 🌟
                </p>
              </div>

              {/* Close Button */}
              <div className="text-center">
                <Button
                  onClick={onClose}
                  className="bg-teal-600 hover:bg-teal-700 text-white kids-text text-lg px-8 py-3 rounded-full shadow-lg transform hover:scale-105 transition-all duration-200"
                >
                  ¡Entendido! Seguiré con coches 🚗
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
