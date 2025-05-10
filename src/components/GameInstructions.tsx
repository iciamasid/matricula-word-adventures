
import React from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";

interface GameInstructionsProps {
  onClose: () => void;
}

const GameInstructions: React.FC<GameInstructionsProps> = ({ onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 flex items-center justify-center z-50 bg-black/70 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-xl p-6 max-w-md w-full mx-auto shadow-lg relative overflow-y-auto max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-3xl font-bold mb-4 text-purple-800 kids-text">
          ¿Cómo jugar?
        </h2>

        <div className="space-y-4">
          <div>
            <h3 className="text-2xl font-bold text-purple-700 kids-text mb-2">
              Objetivo del juego
            </h3>
            <p className="instruction-text kids-text">
              ¡Forma palabras usando las consonantes de la matrícula del coche!
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-purple-700 kids-text mb-2">
              Reglas
            </h3>
            <ul className="list-disc pl-6 space-y-2">
              <li className="instruction-text kids-text">
                Fíjate en las TRES letras de la matrícula.
              </li>
              <li className="instruction-text kids-text">
                Piensa una palabra que contenga al menos una de esas letras.
              </li>
              <li className="instruction-text kids-text">
                ¡Cuantas más letras de la matrícula uses, más puntos conseguirás!
              </li>
              <li className="instruction-text kids-text">
                Si usas las 3 letras, ¡ganarás muchos puntos extra!
              </li>
              <li className="instruction-text kids-text">
                Las palabras deben tener al menos 3 letras.
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-purple-700 kids-text mb-2">
              Puntuación
            </h3>
            <ul className="list-disc pl-6 space-y-2">
              <li className="instruction-text kids-text">
                10 puntos por cada letra de la palabra.
              </li>
              <li className="instruction-text kids-text">
                25 puntos adicionales por usar 1 consonante de la matrícula.
              </li>
              <li className="instruction-text kids-text">
                50 puntos adicionales por usar 2 consonantes diferentes.
              </li>
              <li className="instruction-text kids-text">
                100 puntos adicionales por usar las 3 consonantes diferentes.
              </li>
              <li className="instruction-text kids-text">
                ¡Bonus de 200 puntos por palabras en inglés!
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-purple-700 kids-text mb-2">
              Niveles y viajes
            </h3>
            <p className="instruction-text kids-text">
              Por cada cierta cantidad de puntos, subirás de nivel y desbloquearás un viaje a un nuevo país. 
              ¡Explora el mundo con tus palabras!
            </p>
          </div>

          <div className="pt-2">
            <button
              onClick={onClose}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded-lg kids-text"
            >
              ¡Entendido!
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default GameInstructions;
