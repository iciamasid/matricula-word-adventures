
import React from "react";
import { motion } from "framer-motion";
import { X, Target, Award, Book, Globe, Car, Bike } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface GameInstructionsProps {
  onClose: () => void;
}

const GameInstructions: React.FC<GameInstructionsProps> = ({
  onClose
}) => {
  const { t } = useLanguage();

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }} 
      className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 p-4" 
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 max-w-2xl w-full shadow-2xl relative overflow-y-auto max-h-[85vh] border-4 border-blue-200"
        onClick={e => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-600 hover:text-purple-600 transition-colors">
          <X className="w-8 h-8" />
        </button>

        <h2 className="text-5xl font-bold mb-6 text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text flex items-center gap-3">
          <Book className="w-12 h-12 text-blue-500" />
          ¡Aprende a jugar! 🎮
        </h2>

        <div className="space-y-6">
          <motion.div 
            whileHover={{ scale: 1.02 }} 
            transition={{ type: "spring", stiffness: 300 }} 
            className="bg-white p-6 rounded-2xl shadow-lg border-l-4 border-blue-400"
          >
            <h3 className="text-3xl font-bold text-gray-800 mb-3 flex items-center gap-2">
              <Target className="w-8 h-8 text-blue-500" />
              🎯 ¿Cómo se juega?
            </h3>
            <p className="text-lg font-medium text-gray-700 leading-relaxed">
              ¡Forma palabras usando las letras de las matrículas! 🚗 Las palabras deben tener al menos 5 letras para que valgan puntos. ¡Cuantas más letras uses, más puntos ganarás! ✨
            </p>
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.02 }} 
            transition={{ type: "spring", stiffness: 300 }} 
            className="bg-white p-6 rounded-2xl shadow-lg border-l-4 border-green-400"
          >
            <h3 className="text-3xl font-bold text-gray-800 mb-3 flex items-center gap-2">
              <Car className="w-8 h-8 text-green-500" />
              🚗 Primera aventura: ¡Coches!
            </h3>
            <p className="text-lg font-medium text-gray-700 leading-relaxed">
              Empezarás conduciendo coches por 10 niveles increíbles. ¡Viaja por países fantásticos y colecciona coches geniales! Cada 500 puntos subes de nivel y desbloqueas un nuevo país. 🌍
            </p>
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.02 }} 
            transition={{ type: "spring", stiffness: 300 }} 
            className="bg-white p-6 rounded-2xl shadow-lg border-l-4 border-orange-400"
          >
            <h3 className="text-3xl font-bold text-gray-800 mb-3 flex items-center gap-2">
              <Bike className="w-8 h-8 text-orange-500" />
              🏍️ Segunda aventura: ¡Motos!
            </h3>
            <p className="text-lg font-medium text-gray-700 leading-relaxed">
              ¡Cuando completes todos los niveles con coches, podrás viajar en moto! Una nueva aventura te espera con motos súper geniales y nuevos destinos por descubrir. 🌟
            </p>
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.02 }} 
            transition={{ type: "spring", stiffness: 300 }} 
            className="bg-white p-6 rounded-2xl shadow-lg border-l-4 border-yellow-400"
          >
            <h3 className="text-3xl font-bold text-gray-800 mb-3 flex items-center gap-2">
              <Award className="w-8 h-8 text-yellow-500" />
              🏆 ¿Cómo ganar puntos?
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-2xl">🌟</span>
                <span className="text-lg font-medium text-gray-700">100 puntos por usar las 3 letras en orden</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">⭐</span>
                <span className="text-lg font-medium text-gray-700">75 puntos por usar las 3 letras en diferente orden</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">✨</span>
                <span className="text-lg font-medium text-gray-700">50 puntos por usar 2 letras en orden</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">💫</span>
                <span className="text-lg font-medium text-gray-700">25 puntos por usar 2 letras en diferente orden</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">🎈</span>
                <span className="text-lg font-medium text-gray-700">10 puntos por usar 1 letra</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">🎁</span>
                <span className="text-lg font-medium text-gray-700">+5 puntos extra por cada letra adicional (máximo 50 puntos)</span>
              </div>
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.02 }} 
            transition={{ type: "spring", stiffness: 300 }} 
            className="bg-white p-6 rounded-2xl shadow-lg border-l-4 border-purple-400"
          >
            <h3 className="text-3xl font-bold text-gray-800 mb-3 flex items-center gap-2">
              <Globe className="w-8 h-8 text-purple-500" />
              🌍 ¡Explora el mundo!
            </h3>
            <p className="text-lg font-medium text-gray-700 leading-relaxed">
              ¡Haz clic en las banderas para aprender sobre cada país que visites! Descubrirás lugares increíbles, culturas fascinantes y datos súper divertidos. 🗺️✈️
            </p>
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }} 
            className="pt-4"
          >
            <button 
              onClick={onClose} 
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white py-4 px-6 rounded-2xl text-2xl font-bold shadow-lg transition-all duration-200"
            >
              ¡Entendido, vamos a jugar! 🚀
            </button>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default GameInstructions;
