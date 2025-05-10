
import React, { useEffect, useRef } from "react";
import { useGame } from "@/context/GameContext";
import { motion } from "framer-motion";
import { MapPin, Map, Sparkles } from "lucide-react";

// Spanish city coordinates (approximate)
const CITY_COORDINATES: Record<string, [number, number]> = {
  "Madrid": [40.4168, -3.7038],
  "Barcelona": [41.3851, 2.1734],
  "Valencia": [39.4699, -0.3763],
  "Sevilla": [37.3891, -5.9845],
  "Bilbao": [43.2603, -2.9334],
  "Granada": [37.1773, -3.5986],
  "Toledo": [39.8628, -4.0273],
  "Santiago de Compostela": [42.8782, -8.5448],
  "Segovia": [40.9429, -4.1088],
  "Córdoba": [37.8882, -4.7794],
  "Salamanca": [40.9651, -5.6639],
  "San Sebastián": [43.3224, -1.9838],
  "Mallorca": [39.6952, 3.0175],
  "Canarias": [28.2916, -16.6291]
};

const WorldMap: React.FC = () => {
  const { destination, level, totalPoints } = useGame();
  const mapRef = useRef<HTMLDivElement>(null);
  
  // Get all destinations up to current level
  const getVisitedCities = () => {
    const destinations = [
      "Madrid", "Barcelona", "Valencia", "Sevilla", "Bilbao",
      "Granada", "Toledo", "Santiago de Compostela", "Segovia",
      "Córdoba", "Salamanca", "San Sebastián", "Mallorca", "Canarias"
    ];
    
    return destinations.slice(0, level);
  };
  
  const visitedCities = getVisitedCities();
  
  return (
    <motion.div 
      className="w-full max-w-xs bg-white p-4 rounded-lg shadow-lg border-2 border-blue-100"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center mb-2">
        <Map className="h-5 w-5 text-game-blue mr-2" />
        <h3 className="text-sm font-medium text-gray-700">Tu viaje por España</h3>
      </div>
      <div className="relative h-64 bg-blue-50 rounded-lg border border-gray-200 overflow-hidden">
        {/* Map background */}
        <div className="absolute inset-0 bg-blue-50">
          {/* Simple map of Spain outline */}
          <svg viewBox="0 0 300 200" className="w-full h-full">
            <defs>
              <linearGradient id="water" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ccf2ff" />
                <stop offset="100%" stopColor="#99e6ff" />
              </linearGradient>
              <linearGradient id="land" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#e6f7d9" />
                <stop offset="100%" stopColor="#c6e6b3" />
              </linearGradient>
            </defs>
            
            {/* Water background */}
            <rect x="0" y="0" width="300" height="200" fill="url(#water)" />
            
            {/* Spain mainland */}
            <path 
              d="M80,60 C100,40 130,30 160,35 C190,40 210,60 220,90 C230,120 225,150 200,170 C175,190 140,185 110,170 C80,155 60,130 65,100 C70,70 80,60 80,60 Z" 
              fill="url(#land)" 
              stroke="#66994d" 
              strokeWidth="2" 
            />
            
            {/* Balearic Islands */}
            <ellipse cx="230" cy="100" rx="15" ry="10" fill="url(#land)" stroke="#66994d" strokeWidth="1" />
            
            {/* Canary Islands */}
            <ellipse cx="60" cy="170" rx="20" ry="10" fill="url(#land)" stroke="#66994d" strokeWidth="1" />
          </svg>
        </div>
        
        {/* Cities */}
        {visitedCities.map((city, index) => {
          const coords = CITY_COORDINATES[city];
          if (!coords) return null;
          
          // Convert geographic coordinates to relative position in the SVG
          // Scale for Spain's approximate longitude/latitude
          const x = ((coords[1] + 9) * 8) + 80;
          const y = (45 - coords[0]) * 4 + 30;
          
          return (
            <React.Fragment key={city}>
              {/* Draw route line to next city */}
              {index > 0 && (
                <svg className="absolute inset-0 w-full h-full" style={{ pointerEvents: "none" }}>
                  <motion.line
                    x1={((CITY_COORDINATES[visitedCities[index-1]][1] + 9) * 8) + 80}
                    y1={(45 - CITY_COORDINATES[visitedCities[index-1]][0]) * 4 + 30}
                    x2={x}
                    y2={y}
                    stroke={index === visitedCities.length - 1 ? "#E74C3C" : "#2ECC71"}
                    strokeWidth="3"
                    strokeDasharray={index === visitedCities.length - 1 ? "5,5" : "none"}
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                  />
                </svg>
              )}
              
              {/* City marker */}
              <motion.div 
                className="absolute" 
                style={{ left: `${x}px`, top: `${y}px`, transform: 'translate(-50%, -50%)' }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.2, type: "spring" }}
              >
                {index === visitedCities.length - 1 ? (
                  <motion.div
                    animate={{ 
                      scale: [1, 1.2, 1],
                      y: [0, -5, 0]
                    }}
                    transition={{ 
                      duration: 1.5, 
                      repeat: Infinity,
                      repeatType: "reverse" 
                    }}
                  >
                    <MapPin 
                      className="w-6 h-6 text-game-red drop-shadow-md"
                    />
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="absolute -top-1 -right-1"
                    >
                      <Sparkles className="w-3 h-3 text-yellow-400" />
                    </motion.div>
                  </motion.div>
                ) : (
                  <MapPin 
                    className="w-5 h-5 text-game-green"
                  />
                )}
                <motion.div 
                  className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-bold whitespace-nowrap bg-white px-1 rounded shadow-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.2 + 0.3 }}
                >
                  {city}
                </motion.div>
              </motion.div>
              
              {/* Animated path for current location */}
              {index === visitedCities.length - 1 && (
                <motion.div
                  className="absolute"
                  style={{ left: `${x}px`, top: `${y}px`, transform: 'translate(-50%, -50%)' }}
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0, 0.8, 0]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "loop"
                  }}
                >
                  <div className="w-8 h-8 rounded-full bg-red-500/30" />
                </motion.div>
              )}
            </React.Fragment>
          );
        })}
      </div>
      <div className="mt-2 text-xs text-center text-gray-600 font-medium">
        Próximo destino: {level < Object.keys(CITY_COORDINATES).length ? 
          Object.keys(CITY_COORDINATES)[level] : "¡España completada!"}
      </div>
      <motion.div
        className="mt-2 h-1 bg-blue-200 rounded-full overflow-hidden"
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        transition={{ duration: 1 }}
      >
        <motion.div
          className="h-full bg-gradient-to-r from-game-blue to-game-purple"
          initial={{ width: "0%" }}
          animate={{ width: `${Math.min(100, (level / Object.keys(CITY_COORDINATES).length) * 100)}%` }}
          transition={{ duration: 1, delay: 0.5 }}
        />
      </motion.div>
    </motion.div>
  );
};

export default WorldMap;
