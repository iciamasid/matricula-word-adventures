
import React from "react";
import { motion } from "framer-motion";
import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LockedCarPopupProps {
  carName: string;
  level: number;
  onClose: () => void;
}

const LockedCarPopup: React.FC<LockedCarPopupProps> = ({
  carName,
  level,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-gradient-to-r from-pink-300 to-pink-400 rounded-xl shadow-lg p-6 max-w-md w-11/12 border-2 border-pink-500"
      >
        <div className="flex flex-col items-center text-center">
          <motion.div
            animate={{ rotate: [0, -10, 10, -10, 10, 0] }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-pink-100 rounded-full p-5 mb-4"
          >
            <Lock className="w-10 h-10 text-pink-700" />
          </motion.div>
          
          <h2 className="text-2xl font-bold kids-text text-pink-900 mb-2">
            ¡Coche bloqueado!
          </h2>

          <motion.div 
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mb-4 text-lg text-pink-800 kids-text"
          >
            <p className="mb-2">
              ¡Todavía no has desbloqueado el coche {carName}!
            </p>
            <p>
              Tienes que subir de nivel para desbloquear este coche. Continúa formando palabras con las letras de las matrículas.
            </p>
            <p className="mt-2 text-sm">
              (Se desbloquea en el nivel {level})
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              onClick={onClose} 
              className="bg-pink-700 hover:bg-pink-800 text-white kids-text px-8 py-2 text-lg"
            >
              Vale
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default LockedCarPopup;
