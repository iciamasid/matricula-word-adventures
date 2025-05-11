
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HelpButtonProps {
  className?: string;
}

const HelpButton: React.FC<HelpButtonProps> = ({ className }) => {
  const [showHelp, setShowHelp] = useState(false);
  
  return (
    <>
      <Button
        variant="outline"
        size="icon"
        onClick={() => setShowHelp(true)}
        className={`rounded-full bg-yellow-400 hover:bg-yellow-500 text-purple-900 ${className}`}
      >
        <HelpCircle className="h-6 w-6" />
      </Button>
      
      <AnimatePresence>
        {showHelp && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowHelp(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl p-6 max-w-md w-full shadow-xl border-4 border-yellow-400"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-white kids-text">¿Cómo jugar?</h2>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="rounded-full bg-yellow-400 hover:bg-yellow-500 text-purple-900 h-8 w-8"
                  onClick={() => setShowHelp(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              <ol className="list-decimal list-inside space-y-3 text-white kids-text">
                <li className="flex items-start gap-2">
                  <span className="bg-green-500 text-white font-bold rounded-full h-6 w-6 flex items-center justify-center mt-1">1</span>
                  <div>Haz clic en el botón <span className="font-bold bg-green-500 text-white px-2 py-1 rounded">Dibujar Camino</span></div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-green-500 text-white font-bold rounded-full h-6 w-6 flex items-center justify-center mt-1">2</span>
                  <div>Mantén presionado y mueve tu dedo para dibujar el camino</div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-green-500 text-white font-bold rounded-full h-6 w-6 flex items-center justify-center mt-1">3</span>
                  <div>Cuando termines, pulsa el botón <span className="font-bold bg-cyan-500 text-white px-2 py-1 rounded">Jugar</span></div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-green-500 text-white font-bold rounded-full h-6 w-6 flex items-center justify-center mt-1">4</span>
                  <div>¡Mira cómo el cochecito sigue tu camino!</div>
                </li>
              </ol>
              
              <div className="mt-6 text-center">
                <Button 
                  onClick={() => setShowHelp(false)}
                  className="bg-yellow-400 hover:bg-yellow-500 text-purple-900 font-bold kids-text text-xl"
                >
                  ¡Entendido!
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default HelpButton;
