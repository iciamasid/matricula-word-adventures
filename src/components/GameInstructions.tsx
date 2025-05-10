
import React from "react";
import { motion } from "framer-motion";
import { X, Check, Info, Star } from "lucide-react";

interface GameInstructionsProps {
  onClose: () => void;
}

const GameInstructions: React.FC<GameInstructionsProps> = ({ onClose }) => {
  return (
    <motion.div
      className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 max-h-[90vh] overflow-y-auto"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", bounce: 0.3 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold flex items-center kids-text">
            <Info className="w-5 h-5 mr-2 text-game-blue" />
            Instrucciones del Juego
          </h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          <p className="font-medium text-lg kids-text">
            ¡Bienvenido/a a Matriculabra Cadabra! El juego de palabras con matrículas.
          </p>

          <div className="space-y-2">
            <h3 className="font-medium text-gray-800 text-lg kids-text">Cómo jugar:</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <Check className="w-4 h-4 text-game-green mt-0.5 mr-2 flex-shrink-0" />
                <span className="text-base kids-text">Observa las <strong>consonantes</strong> de la matrícula y forma palabras en español usando al menos una de ellas.</span>
              </li>
              <li className="flex items-start">
                <Check className="w-4 h-4 text-game-green mt-0.5 mr-2 flex-shrink-0" />
                <span className="text-base kids-text">Cuantas más consonantes de la matrícula uses, ¡más puntos conseguirás!</span>
              </li>
              <li className="flex items-start">
                <Check className="w-4 h-4 text-game-green mt-0.5 mr-2 flex-shrink-0" />
                <span className="text-base kids-text">Puedes presionar "Nueva matrícula" para cambiar a otra combinación si te quedas atascado.</span>
              </li>
              <li className="flex items-start">
                <Check className="w-4 h-4 text-game-green mt-0.5 mr-2 flex-shrink-0" />
                <span className="text-base kids-text">Acumula puntos para subir de nivel y desbloquear nuevos destinos.</span>
              </li>
              <li className="flex items-start">
                <Star className="w-4 h-4 text-game-yellow fill-game-yellow mt-0.5 mr-2 flex-shrink-0" />
                <span className="text-base kids-text"><strong>¡BONUS!</strong> Si consigues una matrícula con "666", ¡ganarás automáticamente 1000 puntos extra!</span>
              </li>
            </ul>
          </div>

          <div className="space-y-2">
            <h3 className="font-medium text-gray-800 text-lg kids-text">Puntuación:</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <Check className="w-4 h-4 text-game-green mt-0.5 mr-2 flex-shrink-0" />
                <span className="text-base kids-text"><strong>3 consonantes en orden:</strong> 100 puntos</span>
              </li>
              <li className="flex items-start">
                <Check className="w-4 h-4 text-game-green mt-0.5 mr-2 flex-shrink-0" />
                <span className="text-base kids-text"><strong>3 consonantes no ordenadas:</strong> 75 puntos</span>
              </li>
              <li className="flex items-start">
                <Check className="w-4 h-4 text-game-green mt-0.5 mr-2 flex-shrink-0" />
                <span className="text-base kids-text"><strong>2 consonantes en orden:</strong> 50 puntos</span>
              </li>
              <li className="flex items-start">
                <Check className="w-4 h-4 text-game-green mt-0.5 mr-2 flex-shrink-0" />
                <span className="text-base kids-text"><strong>2 consonantes no ordenadas:</strong> 25 puntos</span>
              </li>
              <li className="flex items-start">
                <Check className="w-4 h-4 text-game-green mt-0.5 mr-2 flex-shrink-0" />
                <span className="text-base kids-text"><strong>1 consonante:</strong> 10 puntos</span>
              </li>
              <li className="flex items-start">
                <X className="w-4 h-4 text-red-500 mt-0.5 mr-2 flex-shrink-0" />
                <span className="text-base kids-text"><strong>Palabra incorrecta:</strong> -20 puntos</span>
              </li>
              <li className="flex items-start">
                <Check className="w-4 h-4 text-game-green mt-0.5 mr-2 flex-shrink-0" />
                <span className="text-base kids-text">Palabras más largas reciben puntos extra.</span>
              </li>
            </ul>
          </div>

          <button
            onClick={onClose}
            className="bg-game-blue hover:bg-game-blue/90 text-white font-medium py-2 px-4 rounded w-full mt-2 text-lg kids-text"
          >
            ¡Entendido!
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default GameInstructions;
