
import React, { useEffect, useRef } from "react";
import { useGame } from "@/context/GameContext";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

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
    <div className="w-full max-w-xs bg-white p-4 rounded-lg shadow">
      <h3 className="text-sm text-gray-500 mb-2">Tu viaje por España</h3>
      <div className="relative h-48 bg-blue-50 rounded border border-gray-200 overflow-hidden">
        {/* Map background */}
        <div className="absolute inset-0 bg-blue-50">
          {/* Simple map of Spain outline */}
          <svg viewBox="0 0 100 100" className="w-full h-full text-blue-100">
            <path 
              d="M20,30 C25,25 35,20 45,15 C55,10 70,15 75,25 C80,35 85,45 80,55 C75,65 65,70 55,75 C45,80 35,75 25,70 C15,65 10,50 15,40 C20,30 25,25 20,30 Z" 
              fill="currentColor" 
              stroke="#ddd" 
              strokeWidth="1" 
            />
          </svg>
        </div>
        
        {/* Cities */}
        {visitedCities.map((city, index) => {
          const coords = CITY_COORDINATES[city];
          if (!coords) return null;
          
          // Convert geographic coordinates to relative position in the SVG
          const x = ((coords[1] + 10) * 3) + 30;
          const y = (40 - coords[0]) * 1.5 + 30;
          
          return (
            <React.Fragment key={city}>
              {/* Draw route line to next city */}
              {index > 0 && (
                <svg className="absolute inset-0 w-full h-full" style={{ pointerEvents: "none" }}>
                  <line
                    x1={((CITY_COORDINATES[visitedCities[index-1]][1] + 10) * 3) + 30}
                    y1={(40 - CITY_COORDINATES[visitedCities[index-1]][0]) * 1.5 + 30}
                    x2={x}
                    y2={y}
                    stroke={index === visitedCities.length - 1 ? "#E74C3C" : "#2ECC71"}
                    strokeWidth="2"
                    strokeDasharray={index === visitedCities.length - 1 ? "3,3" : "none"}
                  />
                </svg>
              )}
              
              {/* City marker */}
              <motion.div 
                className="absolute" 
                style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)' }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <MapPin 
                  className={`w-5 h-5 ${index === visitedCities.length - 1 ? 'text-game-red animate-pulse' : 'text-game-green'}`}
                />
                <div className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 text-xs font-bold whitespace-nowrap">
                  {city}
                </div>
              </motion.div>
            </React.Fragment>
          );
        })}
      </div>
      <div className="mt-2 text-xs text-center text-gray-600">
        Próximo destino: {level < Object.keys(CITY_COORDINATES).length ? 
          Object.keys(CITY_COORDINATES)[level] : "¡España completada!"}
      </div>
    </div>
  );
};

export default WorldMap;
