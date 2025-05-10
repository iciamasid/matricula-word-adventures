
import React from 'react';
import { motion } from 'framer-motion';

interface WorldMapProps {
  highlightCountry?: string;
  unlockedCountries?: string[];
}

const WorldMap: React.FC<WorldMapProps> = ({ highlightCountry, unlockedCountries = [] }) => {
  return (
    <div className="bg-[#9a83b9] h-full w-full flex items-center justify-center p-3">
      <motion.div 
        className="relative w-full h-full"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-full h-full relative">
          {/* Usar la imagen del mapa mundi como fondo */}
          <img 
            src="/lovable-uploads/775e117d-bc61-4576-a77e-acba4f134785.png" 
            alt="Mapa Mundi Infantil"
            className="w-full h-full object-cover rounded-lg"
          />
          
          {/* Highlight the selected country if provided */}
          {highlightCountry && (
            <motion.div
              className="absolute"
              style={{
                left: highlightCountry === "España" ? "47.5%" : 
                    highlightCountry === "Francia" ? "48.5%" : 
                    highlightCountry === "Italia" ? "50.5%" : 
                    highlightCountry === "Reino Unido" ? "46.5%" : 
                    highlightCountry === "Estados Unidos" ? "20%" : 
                    highlightCountry === "Japón" ? "80%" : 
                    highlightCountry === "Australia" ? "80%" : 
                    highlightCountry === "Brasil" ? "27%" : 
                    highlightCountry === "Egipto" ? "51%" : 
                    highlightCountry === "China" ? "72%" : 
                    highlightCountry === "Sudáfrica" ? "51%" : 
                    highlightCountry === "Kenia" ? "53%" : "50%",
                top: highlightCountry === "España" ? "30%" : 
                    highlightCountry === "Francia" ? "28%" : 
                    highlightCountry === "Italia" ? "31%" : 
                    highlightCountry === "Reino Unido" ? "24%" : 
                    highlightCountry === "Estados Unidos" ? "34%" : 
                    highlightCountry === "Japón" ? "36%" : 
                    highlightCountry === "Australia" ? "72%" : 
                    highlightCountry === "Brasil" ? "70%" : 
                    highlightCountry === "Egipto" ? "46%" : 
                    highlightCountry === "China" ? "36%" : 
                    highlightCountry === "Sudáfrica" ? "70%" : 
                    highlightCountry === "Kenia" ? "56%" : "50%",
              }}
            >
              <motion.div
                className="w-16 h-16 rounded-full bg-purple-500/70 border-4 border-white"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ 
                  scale: [0.8, 1.2, 1],
                  opacity: 1
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
            </motion.div>
          )}
          
          {/* Mostrar los países desbloqueados */}
          {unlockedCountries && unlockedCountries.map((country, index) => (
            country !== highlightCountry && (
              <motion.div
                key={country}
                className="absolute"
                style={{
                  left: country === "España" ? "47.5%" : 
                      country === "Francia" ? "48.5%" : 
                      country === "Italia" ? "50.5%" : 
                      country === "Reino Unido" ? "46.5%" : 
                      country === "Estados Unidos" ? "20%" : 
                      country === "Japón" ? "80%" : 
                      country === "Australia" ? "80%" : 
                      country === "Brasil" ? "27%" : 
                      country === "Egipto" ? "51%" : 
                      country === "China" ? "72%" : 
                      country === "Sudáfrica" ? "51%" : 
                      country === "Kenia" ? "53%" : "50%",
                  top: country === "España" ? "30%" : 
                      country === "Francia" ? "28%" : 
                      country === "Italia" ? "31%" : 
                      country === "Reino Unido" ? "24%" : 
                      country === "Estados Unidos" ? "34%" : 
                      country === "Japón" ? "36%" : 
                      country === "Australia" ? "72%" : 
                      country === "Brasil" ? "70%" : 
                      country === "Egipto" ? "46%" : 
                      country === "China" ? "36%" : 
                      country === "Sudáfrica" ? "70%" : 
                      country === "Kenia" ? "56%" : "50%",
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 + index * 0.1 }}
              >
                <motion.div
                  className="w-8 h-8 rounded-full bg-yellow-400 border-2 border-white flex items-center justify-center"
                  animate={{ 
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay: index * 0.2
                  }}
                >
                  <span className="text-sm font-bold">⭐</span>
                </motion.div>
              </motion.div>
            )
          ))}
          
          {/* Etiqueta del país destacado */}
          {highlightCountry && (
            <motion.div
              className="absolute bg-white/90 px-3 py-1 rounded-lg shadow-lg"
              style={{
                left: highlightCountry === "España" ? "47.5%" : 
                    highlightCountry === "Francia" ? "48.5%" : 
                    highlightCountry === "Italia" ? "50.5%" : 
                    highlightCountry === "Reino Unido" ? "46.5%" : 
                    highlightCountry === "Estados Unidos" ? "20%" : 
                    highlightCountry === "Japón" ? "80%" : 
                    highlightCountry === "Australia" ? "80%" : 
                    highlightCountry === "Brasil" ? "27%" : 
                    highlightCountry === "Egipto" ? "51%" : 
                    highlightCountry === "China" ? "72%" : 
                    highlightCountry === "Sudáfrica" ? "51%" : 
                    highlightCountry === "Kenia" ? "53%" : "50%",
                top: highlightCountry === "España" ? "22%" : 
                    highlightCountry === "Francia" ? "20%" : 
                    highlightCountry === "Italia" ? "23%" : 
                    highlightCountry === "Reino Unido" ? "16%" : 
                    highlightCountry === "Estados Unidos" ? "26%" : 
                    highlightCountry === "Japón" ? "28%" : 
                    highlightCountry === "Australia" ? "64%" : 
                    highlightCountry === "Brasil" ? "62%" : 
                    highlightCountry === "Egipto" ? "38%" : 
                    highlightCountry === "China" ? "28%" : 
                    highlightCountry === "Sudáfrica" ? "62%" : 
                    highlightCountry === "Kenia" ? "48%" : "42%",
                transform: "translate(-50%, -50%)"
              }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <span className="text-purple-800 font-bold">{highlightCountry}</span>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default WorldMap;
