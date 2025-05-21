import React from "react";
import { motion } from "framer-motion";
import { X, Target, Award, Star, Book, Globe, Car, Gift } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
interface GameInstructionsProps {
  onClose: () => void;
}
const GameInstructions: React.FC<GameInstructionsProps> = ({
  onClose
}) => {
  const {
    t
  } = useLanguage();

  // Always use purple theme since we removed English
  const primaryColor = "purple";
  const bgGradient = "from-purple-600 to-purple-800";
  const iconColor = "text-yellow-300";
  return <motion.div initial={{
    opacity: 0
  }} animate={{
    opacity: 1
  }} exit={{
    opacity: 0
  }} className="fixed inset-0 flex items-center justify-center z-50 bg-black/70 p-4" onClick={onClose}>
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
    }} className={`bg-gradient-to-br ${bgGradient} rounded-xl p-6 max-w-md w-full mb-4 mr-4 shadow-lg relative overflow-y-auto max-h-[80vh] border-4 border-yellow-400`} onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-3 right-3 text-white hover:text-yellow-300">
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-3xl kids-text mb-4 text-white flex items-center gap-2">
          <Book className={iconColor + " w-7 h-7"} />
          {"¿Cómo jugar?"}
        </h2>

        <div className="space-y-5">
          <motion.div whileHover={{
          scale: 1.02
        }} transition={{
          type: "spring",
          stiffness: 300
        }} className="backdrop-blur-sm p-4 rounded-lg bg-stone-400">
            <h3 className={`text-2xl kids-text text-yellow-300 mb-2 flex items-center gap-2`}>
              <Target className={iconColor + " w-6 h-6"} />
              {"Objetivo del juego"}
            </h3>
            <p className="instruction-text kids-text text-white text-lg font-light">
              {"¡Forma palabras usando las consonantes de la matrícula del coche! Las palabras deben tener al menos 5 letras (las palabras de 4 letras o menos no son válidas)."}
            </p>
          </motion.div>

          <motion.div className="bg-white/20 backdrop-blur-sm p-4 rounded-lg" whileHover={{
          scale: 1.02
        }} transition={{
          type: "spring",
          stiffness: 300
        }}>
            <h3 className={`text-2xl kids-text text-yellow-300 mb-2 flex items-center gap-2`}>
              <Award className={iconColor + " w-6 h-6"} />
              {"Puntuación"}
            </h3>
            <ul className="list-none space-y-2">
              <li className="instruction-text kids-text text-white text-lg flex items-start gap-2">
                <span className="text-green-400 mt-1 flex-shrink-0">✓</span> 
                <span>{"100 puntos por usar las 3 consonantes en el mismo orden"}</span>
              </li>
              <li className="instruction-text kids-text text-white text-lg flex items-start gap-2">
                <span className="text-green-400 mt-1 flex-shrink-0">✓</span> 
                <span>{"75 puntos por usar las 3 consonantes en otro orden"}</span>
              </li>
              <li className="instruction-text kids-text text-white text-lg flex items-start gap-2">
                <span className="text-green-400 mt-1 flex-shrink-0">✓</span>
                <span>{"50 puntos por usar 2 consonantes en el mismo orden"}</span>
              </li>
              <li className="instruction-text kids-text text-white text-lg flex items-start gap-2">
                <span className="text-green-400 mt-1 flex-shrink-0">✓</span> 
                <span>{"25 puntos por usar 2 consonantes en otro orden"}</span>
              </li>
              <li className="instruction-text kids-text text-white text-lg flex items-start gap-2">
                <span className="text-green-400 mt-1 flex-shrink-0">✓</span> 
                <span>{"10 puntos por usar 1 consonante"}</span>
              </li>
              <li className="instruction-text kids-text text-white text-lg flex items-start gap-2">
                <span className="text-green-400 mt-1 flex-shrink-0">✓</span> 
                <span>
                  {"Bonus por longitud: +5 puntos por letra para palabras de más de 5 letras (máximo 50 puntos)"}
                </span>
              </li>
              
              <li className="instruction-text kids-text text-red-300 text-lg flex items-start gap-2">
                <X className="w-5 h-5 text-red-400 mt-1 flex-shrink-0" /> 
                <span>
                  {"-20 puntos de penalización si la palabra no existe, es demasiado corta (menos de 5 letras), o no contiene ninguna consonante de la matrícula"}
                </span>
              </li>
            </ul>
          </motion.div>

          <motion.div className="bg-white/20 backdrop-blur-sm p-4 rounded-lg" whileHover={{
          scale: 1.02
        }} transition={{
          type: "spring",
          stiffness: 300
        }}>
            <h3 className={`text-2xl kids-text text-yellow-300 mb-2 flex items-center gap-2`}>
              <Globe className={iconColor + " w-6 h-6"} />
              {"Niveles y viajes"}
            </h3>
            <p className="instruction-text kids-text text-white text-lg">
              {"Por cada 500 puntos, subirás de nivel y desbloquearás un viaje a un nuevo país. ¡Explora el mundo con tus palabras y descubre lugares increíbles! Pincha sobre las banderas y explora cada país."}
            </p>
          </motion.div>

          <motion.div className="bg-white/20 backdrop-blur-sm p-4 rounded-lg" whileHover={{
          scale: 1.02
        }} transition={{
          type: "spring",
          stiffness: 300
        }}>
            <h3 className={`text-2xl kids-text text-yellow-300 mb-2 flex items-center gap-2`}>
              <Car className={iconColor + " w-6 h-6"} />
              {"Personalización"}
            </h3>
            <p className="instruction-text kids-text text-white text-lg">
              {"¡Cada vez que subas de nivel podrás elegir un nuevo coche! Personaliza tu vehículo y viaja con estilo por todo el mundo."}
            </p>
          </motion.div>

          <motion.div className="bg-white/20 backdrop-blur-sm p-4 rounded-lg" whileHover={{
          scale: 1.02
        }} transition={{
          type: "spring",
          stiffness: 300
        }}>
            <h3 className={`text-2xl kids-text text-yellow-300 mb-2 flex items-center gap-2`}>
              <Gift className={iconColor + " w-6 h-6"} />
              {"Bonificaciones especiales"}
            </h3>
            <p className="instruction-text kids-text text-white text-lg">
              {"¡Atento a las bonificaciones especiales! Si tu matrícula muestra el número '6666', podrías recibir un bonus de 500 puntos con un mensaje plateado especial. Esta bonificación aparece aproximadamente cada 20 partidas."}
            </p>
          </motion.div>

          <motion.div whileHover={{
          scale: 1.05
        }} whileTap={{
          scale: 0.95
        }} className="pt-2">
            <button onClick={onClose} className={`w-full bg-yellow-400 hover:bg-yellow-500 text-purple-900 py-3 px-4 rounded-lg kids-text text-xl font-bold`}>
              {"¡Entendido!"}
            </button>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>;
};
export default GameInstructions;