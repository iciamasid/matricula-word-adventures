
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ZoomIn, ZoomOut, Map } from 'lucide-react';

interface WorldMapProps {
  highlightCountry?: string;
  unlockedCountries?: string[];
}

const WorldMap: React.FC<WorldMapProps> = ({ highlightCountry, unlockedCountries = [] }) => {
  const [zoom, setZoom] = useState(1);
  
  // Map countries to their positions
  const getCountryPosition = (country: string) => {
    const positions: Record<string, { left: string, top: string }> = {
      "España": { left: "47.5%", top: "30%" },
      "Francia": { left: "48.5%", top: "28%" },
      "Italia": { left: "50.5%", top: "31%" },
      "Rusia": { left: "60%", top: "22%" },
      "Japón": { left: "80%", top: "36%" },
      "Estados Unidos": { left: "20%", top: "34%" },
      "Argentina": { left: "30%", top: "75%" },
      "Méjico": { left: "18%", top: "45%" },
      "Australia": { left: "80%", top: "72%" },
      "Antártida": { left: "50%", top: "90%" },
    };
    
    return positions[country] || { left: "50%", top: "50%" };
  };

  const handleZoomIn = () => {
    if (zoom < 2) setZoom(prev => prev + 0.25);
  };

  const handleZoomOut = () => {
    if (zoom > 0.5) setZoom(prev => prev - 0.25);
  };
  
  return (
    <div className="bg-[#9a83b9] h-full w-full flex items-center justify-center p-3 relative rounded-lg border-4 border-white/50">
      {/* Zoom controls */}
      <div className="absolute top-2 right-2 z-10 flex gap-1">
        <button 
          onClick={handleZoomIn}
          className="bg-white/80 hover:bg-white p-1 rounded-md shadow-sm"
          aria-label="Zoom in"
        >
          <ZoomIn className="w-5 h-5 text-purple-800" />
        </button>
        <button 
          onClick={handleZoomOut}
          className="bg-white/80 hover:bg-white p-1 rounded-md shadow-sm"
          aria-label="Zoom out"
        >
          <ZoomOut className="w-5 h-5 text-purple-800" />
        </button>
      </div>
      
      <motion.div 
        className="relative w-full h-full overflow-hidden"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div 
          className="w-full h-full relative"
          style={{ 
            scale: zoom,
            transformOrigin: "center"
          }}
        >
          {/* Usar la imagen del mapa mundi como fondo */}
          <img 
            src="/lovable-uploads/775e117d-bc61-4576-a77e-acba4f134785.png" 
            alt="Mapa Mundi Infantil"
            className="w-full h-full object-cover rounded-lg"
          />
          
          {/* Highlight the selected country if provided AND it's unlocked */}
          {highlightCountry && unlockedCountries.includes(highlightCountry) && (
            <motion.div
              className="absolute"
              style={getCountryPosition(highlightCountry)}
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
          
          {/* Mostrar SOLO los países desbloqueados */}
          {unlockedCountries && unlockedCountries.map((country, index) => (
            <Link
              to={`/country/${country}`}
              key={country}
              className="absolute"
              style={getCountryPosition(country)}
            >
              <motion.div
                className="w-8 h-8 rounded-full bg-yellow-400 border-2 border-white flex items-center justify-center cursor-pointer"
                animate={{ 
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: index * 0.2
                }}
                whileHover={{ scale: 1.3 }}
              >
                <span className="text-sm font-bold">⭐</span>
              </motion.div>
              
              {/* Etiqueta del país */}
              <motion.div
                className="absolute bg-white/90 px-3 py-1 rounded-lg shadow-lg whitespace-nowrap"
                style={{
                  top: "110%",
                  left: "50%",
                  transform: "translateX(-50%)"
                }}
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <span className="text-purple-800 font-bold kids-text">{country}</span>
              </motion.div>
            </Link>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default WorldMap;
