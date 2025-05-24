
import React from "react";
import { motion } from "framer-motion";
import { X, Target, Award, Book, Globe, Car } from "lucide-react";

interface CarGameInstructionsProps {
  onClose: () => void;
}

const CarGameInstructions: React.FC<CarGameInstructionsProps> = ({
  onClose
}) => {
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
          ¡Aventura con coches! 🚗
        </h2>

        <div className="space-y-6">
          <motion.div 
            whileHover={{ scale: 1.02 }} 
            transition={{ type: "spring", stiffness: 300 }} 
            className="bg-white p-6 rounded-2xl shadow-lg border-l-4 border-blue-400"
          >
            <h3 className="text-3xl font-bold text-gray-800 mb-3 flex items-center gap-2">
              <Target className="w-8 h-8 text-blue-500" />
              🎯 Tu primera aventura
            </h3>
            <p className="text-lg font-medium text-gray-700 leading-relaxed">
              ¡Bienvenido a la aventura con coches! 🚗 Forma palabras con las letras de las matrículas de los coches. ¡Cuantas más letras uses y mejor las combines, más puntos ganarás! ✨
            </p>
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.02 }} 
            transition={{ type: "spring", stiffness: 300 }} 
            className="bg-white p-6 rounded-2xl shadow-lg border-l-4 border-green-400"
          >
            <h3 className="text-3xl font-bold text-gray-800 mb-3 flex items-center gap-2">
              <Award className="w-8 h-8 text-green-500" />
              🏆 ¿Cómo ganar puntos?
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-2xl">🌟</span>
                <span className="text-lg font-medium text-gray-700">100 puntos por usar las 3 consonantes en el mismo orden</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">⭐</span>
                <span className="text-lg font-medium text-gray-700">75 puntos por usar las 3 consonantes en otro orden</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">✨</span>
                <span className="text-lg font-medium text-gray-700">50 puntos por usar 2 consonantes en el mismo orden</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">💫</span>
                <span className="text-lg font-medium text-gray-700">25 puntos por usar 2 consonantes en otro orden</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">🎈</span>
                <span className="text-lg font-medium text-gray-700">10 puntos por usar 1 consonante</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">🎁</span>
                <span className="text-lg font-medium text-gray-700">Bonus por longitud: +5 puntos por letra extra (máximo 50)</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">❌</span>
                <span className="text-lg font-medium text-red-500">-20 puntos si la palabra no existe</span>
              </div>
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.02 }} 
            transition={{ type: "spring", stiffness: 300 }} 
            className="bg-white p-6 rounded-2xl shadow-lg border-l-4 border-yellow-400"
          >
            <h3 className="text-3xl font-bold text-gray-800 mb-3 flex items-center gap-2">
              <Globe className="w-8 h-8 text-yellow-500" />
              🌍 ¡Viaja por el mundo!
            </h3>
            <p className="text-lg font-medium text-gray-700 leading-relaxed">
              Con cada 500 puntos subirás de nivel y desbloquearás un nuevo país. ¡Hay 10 niveles increíbles esperándote! Haz clic en las banderas para aprender sobre cada lugar que visites. 🗺️
            </p>
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.02 }} 
            transition={{ type: "spring", stiffness: 300 }} 
            className="bg-white p-6 rounded-2xl shadow-lg border-l-4 border-purple-400"
          >
            <h3 className="text-3xl font-bold text-gray-800 mb-3 flex items-center gap-2">
              <Car className="w-8 h-8 text-purple-500" />
              🚙 ¡Colecciona coches geniales!
            </h3>
            <p className="text-lg font-medium text-gray-700 leading-relaxed">
              ¡Cada vez que subas de nivel podrás elegir un nuevo coche súper genial! Personaliza tu vehículo y viaja con estilo por todo el mundo. 🎨
            </p>
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.02 }} 
            transition={{ type: "spring", stiffness: 300 }} 
            className="bg-gradient-to-r from-orange-100 to-pink-100 p-6 rounded-2xl shadow-lg border-l-4 border-orange-400"
          >
            <h3 className="text-3xl font-bold text-gray-800 mb-3">
              🏍️ ¡Desbloquea las motos!
            </h3>
            <p className="text-lg font-medium text-gray-700 leading-relaxed">
              ¡Cuando completes todos los 10 niveles con coches, podrás empezar una nueva aventura con motos súper veloces! Una experiencia completamente nueva te está esperando. 🌟
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
              ¡Vamos a conducir! 🚗💨
            </button>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CarGameInstructions;
