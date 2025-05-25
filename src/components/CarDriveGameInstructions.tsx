
import React from "react";
import { motion } from "framer-motion";
import { X, Target, Award, Book, Car, Paintbrush, Play } from "lucide-react";

interface CarDriveGameInstructionsProps {
  onClose: () => void;
}

const CarDriveGameInstructions: React.FC<CarDriveGameInstructionsProps> = ({
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
          ¡Conduce tu coche! 🚗
        </h2>

        <div className="space-y-6">
          <motion.div 
            whileHover={{ scale: 1.02 }} 
            transition={{ type: "spring", stiffness: 300 }} 
            className="bg-white p-6 rounded-2xl shadow-lg border-l-4 border-blue-400"
          >
            <h3 className="text-3xl font-bold text-gray-800 mb-3 flex items-center gap-2">
              <Target className="w-8 h-8 text-blue-500" />
              🎯 ¿Cómo funciona?
            </h3>
            <p className="text-lg font-medium text-gray-700 leading-relaxed">
              ¡Dibuja un camino con tu dedo y tu coche lo seguirá! Es súper fácil: dibuja, ajusta la velocidad y ¡conduce! 🎨🚗
            </p>
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.02 }} 
            transition={{ type: "spring", stiffness: 300 }} 
            className="bg-white p-6 rounded-2xl shadow-lg border-l-4 border-green-400"
          >
            <h3 className="text-3xl font-bold text-gray-800 mb-3 flex items-center gap-2">
              <Paintbrush className="w-8 h-8 text-green-500" />
              ✏️ Paso 1: ¡Dibuja tu camino!
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-2xl">👆</span>
                <span className="text-lg font-medium text-gray-700">Toca el botón "Dibujar camino" para activar el modo dibujo</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">🖊️</span>
                <span className="text-lg font-medium text-gray-700">Dibuja con tu dedo desde donde está el coche hasta donde quieres llegar</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">🎨</span>
                <span className="text-lg font-medium text-gray-700">¡Puedes hacer curvas, rectas, zigzag... lo que quieras!</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">⚪</span>
                <span className="text-lg font-medium text-gray-700">Al terminar aparecerá un punto blanco donde acabaste de dibujar</span>
              </div>
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.02 }} 
            transition={{ type: "spring", stiffness: 300 }} 
            className="bg-white p-6 rounded-2xl shadow-lg border-l-4 border-yellow-400"
          >
            <h3 className="text-3xl font-bold text-gray-800 mb-3 flex items-center gap-2">
              <Award className="w-8 h-8 text-yellow-500" />
              ⚡ Paso 2: ¡Elige tu velocidad!
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-2xl">🐌</span>
                <span className="text-lg font-medium text-gray-700">Mueve la barra hacia la izquierda para ir más despacio</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">🏎️</span>
                <span className="text-lg font-medium text-gray-700">Mueve la barra hacia la derecha para ir súper rápido</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">🎯</span>
                <span className="text-lg font-medium text-gray-700">¡Encuentra la velocidad perfecta para ti!</span>
              </div>
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.02 }} 
            transition={{ type: "spring", stiffness: 300 }} 
            className="bg-white p-6 rounded-2xl shadow-lg border-l-4 border-purple-400"
          >
            <h3 className="text-3xl font-bold text-gray-800 mb-3 flex items-center gap-2">
              <Play className="w-8 h-8 text-purple-500" />
              🚗 Paso 3: ¡A conducir!
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-2xl">▶️</span>
                <span className="text-lg font-medium text-gray-700">Toca "Conducir" y tu coche seguirá el camino que dibujaste</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">👀</span>
                <span className="text-lg font-medium text-gray-700">¡Mira cómo gira y se mueve siguiendo tu dibujo!</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">🔄</span>
                <span className="text-lg font-medium text-gray-700">Puedes borrar todo y dibujar un nuevo camino cuando quieras</span>
              </div>
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.02 }} 
            transition={{ type: "spring", stiffness: 300 }} 
            className="bg-gradient-to-r from-blue-100 to-purple-100 p-6 rounded-2xl shadow-lg border-l-4 border-blue-400"
          >
            <h3 className="text-3xl font-bold text-gray-800 mb-3 flex items-center gap-2">
              <Car className="w-8 h-8 text-blue-500" />
              💡 ¡Consejos útiles!
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-2xl">🎨</span>
                <span className="text-lg font-medium text-gray-700">Dibuja caminos largos y curvos para ver cómo gira el coche</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">🌟</span>
                <span className="text-lg font-medium text-gray-700">Prueba diferentes velocidades para cada camino</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">🎪</span>
                <span className="text-lg font-medium text-gray-700">¡Haz formas divertidas como círculos, corazones o estrellas!</span>
              </div>
            </div>
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
              ¡Vamos a dibujar! 🎨🚗
            </button>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CarDriveGameInstructions;
