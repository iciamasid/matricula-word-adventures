import React from "react";
import { motion } from "framer-motion";
import { X, Target, Award, Star, Book, Zap, Check, Globe } from "lucide-react";
interface GameInstructionsProps {
  onClose: () => void;
}
const GameInstructions: React.FC<GameInstructionsProps> = ({
  onClose
}) => {
  return <motion.div initial={{
    opacity: 0
  }} animate={{
    opacity: 1
  }} exit={{
    opacity: 0
  }} className="fixed inset-0 flex items-end justify-end z-50 bg-black/70 p-4" onClick={onClose}>
      <motion.div initial={{
      scale: 0.9,
      opacity: 0,
      y: 50
    }} animate={{
      scale: 1,
      opacity: 1,
      y: 0
    }} transition={{
      duration: 0.3
    }} className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-xl p-6 max-w-md w-full mb-4 mr-4 shadow-lg relative overflow-y-auto max-h-[80vh] border-4 border-yellow-400" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-3 right-3 text-white hover:text-yellow-300">
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-3xl kids-text mb-4 text-white flex items-center gap-2">
          <Book className="w-7 h-7 text-yellow-300" />
          ¿Cómo jugar?
        </h2>

        <div className="space-y-5">
          <motion.div className="bg-white/20 backdrop-blur-sm p-4 rounded-lg" whileHover={{
          scale: 1.02
        }} transition={{
          type: "spring",
          stiffness: 300
        }}>
            <h3 className="text-2xl kids-text text-yellow-300 mb-2 flex items-center gap-2">
              <Target className="w-6 h-6 text-yellow-300" />
              Objetivo del juego
            </h3>
            <p className="instruction-text kids-text text-white">
              ¡Forma palabras usando las consonantes de la matrícula del coche!
            </p>
          </motion.div>

          <motion.div className="bg-white/20 backdrop-blur-sm p-4 rounded-lg" whileHover={{
          scale: 1.02
        }} transition={{
          type: "spring",
          stiffness: 300
        }}>
            <h3 className="text-2xl kids-text text-yellow-300 mb-2 flex items-center gap-2">
              <Award className="w-6 h-6 text-yellow-300" />
              Puntuación
            </h3>
            <ul className="list-none space-y-2">
              <li className="instruction-text kids-text text-white flex items-start gap-2">
                <Check className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" /> 
                <span>100 puntos por usar las 3 consonantes en el mismo orden</span>
              </li>
              <li className="instruction-text kids-text text-white flex items-start gap-2">
                <Check className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" /> 
                <span>75 puntos por usar las 3 consonantes en otro orden</span>
              </li>
              <li className="instruction-text kids-text text-white flex items-start gap-2">
                <Check className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" /> 
                <span>50 puntos por usar 2 consonantes en el mismo orden</span>
              </li>
              <li className="instruction-text kids-text text-white flex items-start gap-2">
                <Check className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" /> 
                <span>25 puntos por usar 2 consonantes en otro orden</span>
              </li>
              <li className="instruction-text kids-text text-white flex items-start gap-2">
                <Check className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" /> 
                <span>10 puntos por usar 1 consonante</span>
              </li>
              <li className="instruction-text kids-text text-white flex items-start gap-2">
                <Check className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" /> 
                <span>¡Bonus de 200 puntos por palabras en inglés!</span>
              </li>
              <li className="instruction-text kids-text text-white flex items-start gap-2">
                <Check className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" /> 
                <span>¡Bonus de 500 puntos si los números de la matrícula son 6666! Y 20 puntos si aparece tu edad entre los números.
              </span>
              </li>
              <li className="instruction-text kids-text text-red-300 flex items-start gap-2">
                <X className="w-5 h-5 text-red-400 mt-1 flex-shrink-0" /> 
                <span>Se restan 20 puntos si la palabra no existe o no contiene ninguna consonante</span>
              </li>
            </ul>
          </motion.div>

          <motion.div className="bg-white/20 backdrop-blur-sm p-4 rounded-lg" whileHover={{
          scale: 1.02
        }} transition={{
          type: "spring",
          stiffness: 300
        }}>
            <h3 className="text-2xl kids-text text-yellow-300 mb-2 flex items-center gap-2">
              <Globe className="w-6 h-6 text-yellow-300" />
              Niveles y viajes
            </h3>
            <p className="instruction-text kids-text text-white">
              Por cada 500 puntos, subirás de nivel y desbloquearás un viaje a un nuevo país. 
              ¡Explora el mundo con tus palabras y descubre lugares increíbles!
            </p>
          </motion.div>

          <motion.div whileHover={{
          scale: 1.05
        }} whileTap={{
          scale: 0.95
        }} className="pt-2">
            <button onClick={onClose} className="w-full bg-yellow-400 hover:bg-yellow-500 text-purple-900 py-3 px-4 rounded-lg kids-text text-xl font-bold">
              ¡Entendido!
            </button>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>;
};
export default GameInstructions;