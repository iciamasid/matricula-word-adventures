
import React from "react";
import { motion } from "framer-motion";
import { X, Target, Award, Book, Bike, Paintbrush, Play } from "lucide-react";

interface MotorcycleDriveGameInstructionsProps {
  onClose: () => void;
}

const MotorcycleDriveGameInstructions: React.FC<MotorcycleDriveGameInstructionsProps> = ({
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
        className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl p-8 max-w-2xl w-full shadow-2xl relative overflow-y-auto max-h-[85vh] border-4 border-teal-200"
        onClick={e => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-600 hover:text-teal-600 transition-colors">
          <X className="w-8 h-8" />
        </button>

        <h2 className="text-5xl font-bold mb-6 text-transparent bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text flex items-center gap-3">
          <Book className="w-12 h-12 text-teal-500" />
          ¡Conduce tu moto! 🏍️
        </h2>

        <div className="space-y-6">
          <motion.div 
            whileHover={{ scale: 1.02 }} 
            transition={{ type: "spring", stiffness: 300 }} 
            className="bg-white p-6 rounded-2xl shadow-lg border-l-4 border-teal-400"
          >
            <h3 className="text-3xl font-bold text-gray-800 mb-3 flex items-center gap-2">
              <Target className="w-8 h-8 text-teal-500" />
              🎯 ¿Cómo funciona?
            </h3>
            <p className="text-lg font-medium text-gray-700 leading-relaxed">
              ¡Dibuja un camino con tu dedo y tu moto súper veloz lo seguirá! Es como ser un piloto de carreras: dibuja, acelera y ¡disfruta la velocidad! 🎨🏍️💨
            </p>
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.02 }} 
            transition={{ type: "spring", stiffness: 300 }} 
            className="bg-white p-6 rounded-2xl shadow-lg border-l-4 border-green-400"
          >
            <h3 className="text-3xl font-bold text-gray-800 mb-3 flex items-center gap-2">
              <Paintbrush className="w-8 h-8 text-green-500" />
              ✏️ Paso 1: ¡Dibuja tu pista!
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-2xl">👆</span>
                <span className="text-lg font-medium text-gray-700">Toca el botón "Dibujar camino" para activar el modo dibujo</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">🏁</span>
                <span className="text-lg font-medium text-gray-700">Dibuja con tu dedo desde donde está la moto hasta la meta</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">🌀</span>
                <span className="text-lg font-medium text-gray-700">¡Haz curvas cerradas, rectas de velocidad, lo que se te ocurra!</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">⚪</span>
                <span className="text-lg font-medium text-gray-700">Al terminar aparecerá un punto blanco donde quieres llegar</span>
              </div>
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.02 }} 
            transition={{ type: "spring", stiffness: 300 }} 
            className="bg-white p-6 rounded-2xl shadow-lg border-l-4 border-orange-400"
          >
            <h3 className="text-3xl font-bold text-gray-800 mb-3 flex items-center gap-2">
              <Award className="w-8 h-8 text-orange-500" />
              ⚡ Paso 2: ¡Controla la velocidad!
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-2xl">🐌</span>
                <span className="text-lg font-medium text-gray-700">Barra hacia la izquierda = velocidad tranquila para curvas</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">🚀</span>
                <span className="text-lg font-medium text-gray-700">Barra hacia la derecha = ¡velocidad máxima como un rayo!</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">🏍️</span>
                <span className="text-lg font-medium text-gray-700">¡Las motos son más rápidas que los coches!</span>
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
              🏍️ Paso 3: ¡A acelerar!
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-2xl">▶️</span>
                <span className="text-lg font-medium text-gray-700">Toca "Conducir" y tu moto seguirá la pista que creaste</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">💨</span>
                <span className="text-lg font-medium text-gray-700">¡Mira cómo se inclina en las curvas como una moto real!</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">🔄</span>
                <span className="text-lg font-medium text-gray-700">Borra y crea nuevas pistas cuando quieras</span>
              </div>
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.02 }} 
            transition={{ type: "spring", stiffness: 300 }} 
            className="bg-gradient-to-r from-teal-100 to-cyan-100 p-6 rounded-2xl shadow-lg border-l-4 border-teal-400"
          >
            <h3 className="text-3xl font-bold text-gray-800 mb-3 flex items-center gap-2">
              <Bike className="w-8 h-8 text-teal-500" />
              💡 ¡Trucos de piloto experto!
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-2xl">🏁</span>
                <span className="text-lg font-medium text-gray-700">Crea circuitos de carreras con curvas desafiantes</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">⚡</span>
                <span className="text-lg font-medium text-gray-700">Prueba velocidad alta en rectas y baja en curvas</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">🌪️</span>
                <span className="text-lg font-medium text-gray-700">¡Haz espirales, ochos y figuras locas!</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">🎯</span>
                <span className="text-lg font-medium text-gray-700">Desafíate con pistas cada vez más complicadas</span>
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
              className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white py-4 px-6 rounded-2xl text-2xl font-bold shadow-lg transition-all duration-200"
            >
              ¡Vamos a acelerar! 🏍️💨
            </button>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default MotorcycleDriveGameInstructions;
