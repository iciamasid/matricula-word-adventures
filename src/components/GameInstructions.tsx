
import React from "react";
import { motion } from "framer-motion";
import { X, Target, Award, Star, Book, Zap } from "lucide-react";

interface GameInstructionsProps {
  onClose: () => void;
}

const GameInstructions: React.FC<GameInstructionsProps> = ({ onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 flex items-end justify-end z-50 bg-black/70 p-4" 
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-xl p-6 max-w-md w-full mb-4 mr-4 shadow-lg relative overflow-y-auto max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-3xl kids-text mb-4 text-purple-800 flex items-center gap-2">
          <Book className="w-7 h-7 text-purple-600" />
          ¿Cómo jugar?
        </h2>

        <div className="space-y-4">
          <div className="bg-purple-50 p-4 rounded-lg">
            <h3 className="text-2xl kids-text text-purple-700 mb-2 flex items-center gap-2">
              <Target className="w-6 h-6 text-purple-600" />
              Objetivo del juego
            </h3>
            <p className="instruction-text kids-text">
              ¡Forma palabras usando las consonantes de la matrícula del coche!
            </p>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="text-2xl kids-text text-blue-700 mb-2 flex items-center gap-2">
              <Award className="w-6 h-6 text-blue-600" />
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

          <div className="bg-yellow-50 p-4 rounded-lg">
            <h3 className="text-2xl kids-text text-yellow-700 mb-2 flex items-center gap-2">
              <Star className="w-6 h-6 text-yellow-500" />
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

          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="text-2xl kids-text text-green-700 mb-2 flex items-center gap-2">
              <Zap className="w-6 h-6 text-green-600" />
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
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-lg kids-text text-lg"
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
