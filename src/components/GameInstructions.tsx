
import React from "react";
import { motion } from "framer-motion";
import { X, Target, Award, Star, Book, Zap, Check, Globe } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface GameInstructionsProps {
  onClose: () => void;
}

const GameInstructions: React.FC<GameInstructionsProps> = ({ onClose }) => {
  const { t, isEnglish } = useLanguage();
  
  // Determine styling based on language
  const primaryColor = isEnglish ? "orange" : "purple";
  const bgGradient = isEnglish 
    ? "from-orange-600 to-orange-800" 
    : "from-purple-600 to-purple-800";
  const iconColor = "text-yellow-300";
  
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
        className={`bg-gradient-to-br ${bgGradient} rounded-xl p-6 max-w-md w-full mb-4 mr-4 shadow-lg relative overflow-y-auto max-h-[80vh] border-4 border-yellow-400`} 
        onClick={e => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-3 right-3 text-white hover:text-yellow-300">
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-3xl kids-text mb-4 text-white flex items-center gap-2">
          <Book className={iconColor + " w-7 h-7"} />
          {t('how_to_play')}
        </h2>

        <div className="space-y-5">
          <motion.div 
            className="bg-white/20 backdrop-blur-sm p-4 rounded-lg" 
            whileHover={{ scale: 1.02 }} 
            transition={{ type: "spring", stiffness: 300 }}
          >
            <h3 className={`text-2xl kids-text text-yellow-300 mb-2 flex items-center gap-2`}>
              <Target className={iconColor + " w-6 h-6"} />
              {isEnglish ? "Game Objective" : "Objetivo del juego"}
            </h3>
            <p className="instruction-text kids-text text-white">
              {isEnglish 
                ? "Form words using the consonants from the car's license plate! Words must be at least 4 letters long." 
                : "¡Forma palabras usando las consonantes de la matrícula del coche! Las palabras deben tener al menos 4 letras."}
            </p>
          </motion.div>

          <motion.div 
            className="bg-white/20 backdrop-blur-sm p-4 rounded-lg" 
            whileHover={{ scale: 1.02 }} 
            transition={{ type: "spring", stiffness: 300 }}
          >
            <h3 className={`text-2xl kids-text text-yellow-300 mb-2 flex items-center gap-2`}>
              <Award className={iconColor + " w-6 h-6"} />
              {isEnglish ? "Scoring" : "Puntuación"}
            </h3>
            <ul className="list-none space-y-2">
              <li className="instruction-text kids-text text-white flex items-start gap-2">
                <Check className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" /> 
                <span>{isEnglish ? "100 points for using all 3 consonants in the same order" : "100 puntos por usar las 3 consonantes en el mismo orden"}</span>
              </li>
              <li className="instruction-text kids-text text-white flex items-start gap-2">
                <Check className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" /> 
                <span>{isEnglish ? "75 points for using all 3 consonants in a different order" : "75 puntos por usar las 3 consonantes en otro orden"}</span>
              </li>
              <li className="instruction-text kids-text text-white flex items-start gap-2">
                <Check className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" /> 
                <span>{isEnglish ? "50 points for using 2 consonants in the same order" : "50 puntos por usar 2 consonantes en el mismo orden"}</span>
              </li>
              <li className="instruction-text kids-text text-white flex items-start gap-2">
                <Check className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" /> 
                <span>{isEnglish ? "25 points for using 2 consonants in a different order" : "25 puntos por usar 2 consonantes en otro orden"}</span>
              </li>
              <li className="instruction-text kids-text text-white flex items-start gap-2">
                <Check className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" /> 
                <span>{isEnglish ? "10 points for using 1 consonant" : "10 puntos por usar 1 consonante"}</span>
              </li>
              <li className="instruction-text kids-text text-white flex items-start gap-2">
                <Check className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" /> 
                <span>
                  {isEnglish 
                    ? "Length bonus: +5 points per letter for words longer than 4 letters (maximum 50 points)" 
                    : "Bonus por longitud: +5 puntos por letra para palabras de más de 4 letras (máximo 50 puntos)"
                  }
                </span>
              </li>
              <li className="instruction-text kids-text text-white flex items-start gap-2">
                <Check className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" /> 
                <span>
                  {isEnglish 
                    ? "+200 bonus points for valid Spanish words!" 
                    : "+200 puntos extra por palabras válidas en inglés!"
                  }
                </span>
              </li>
              <li className="instruction-text kids-text text-white flex items-start gap-2">
                <Check className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" /> 
                <span>
                  {isEnglish 
                    ? "+500 bonus points if the license plate numbers are 6666!" 
                    : "+500 puntos extra si los números de la matrícula son 6666!"
                  }
                </span>
              </li>
              <li className="instruction-text kids-text text-red-300 flex items-start gap-2">
                <X className="w-5 h-5 text-red-400 mt-1 flex-shrink-0" /> 
                <span>
                  {isEnglish
                    ? "-20 points penalty if the word doesn't exist, is too short (less than 4 letters), or doesn't contain any license plate consonant"
                    : "-20 puntos de penalización si la palabra no existe, es demasiado corta (menos de 4 letras), o no contiene ninguna consonante de la matrícula"
                  }
                </span>
              </li>
            </ul>
          </motion.div>

          <motion.div 
            className="bg-white/20 backdrop-blur-sm p-4 rounded-lg" 
            whileHover={{ scale: 1.02 }} 
            transition={{ type: "spring", stiffness: 300 }}
          >
            <h3 className={`text-2xl kids-text text-yellow-300 mb-2 flex items-center gap-2`}>
              <Globe className={iconColor + " w-6 h-6"} />
              {isEnglish ? "Levels and Travels" : "Niveles y viajes"}
            </h3>
            <p className="instruction-text kids-text text-white">
              {isEnglish
                ? "For every 500 points, you'll level up and unlock a trip to a new country. Explore the world with your words and discover amazing places!"
                : "Por cada 500 puntos, subirás de nivel y desbloquearás un viaje a un nuevo país. ¡Explora el mundo con tus palabras y descubre lugares increíbles!"
              }
            </p>
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }} 
            className="pt-2"
          >
            <button 
              onClick={onClose} 
              className={`w-full bg-yellow-400 hover:bg-yellow-500 ${isEnglish ? "text-orange-900" : "text-purple-900"} py-3 px-4 rounded-lg kids-text text-xl font-bold`}
            >
              {isEnglish ? "I understand!" : "¡Entendido!"}
            </button>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default GameInstructions;
