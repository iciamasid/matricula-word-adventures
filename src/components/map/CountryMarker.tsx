
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { getCountryPosition, getCountryImage } from '@/utils/mapData';
import { WORLD_DESTINATIONS } from '@/utils/mapData';

interface CountryMarkerProps {
  country: string;
  index: number;
  isHighlighted?: boolean;
}

const CountryMarker: React.FC<CountryMarkerProps> = ({ country, index, isHighlighted }) => {
  // Get country information
  const position = getCountryPosition(country);
  
  // Find country flag
  const countryData = WORLD_DESTINATIONS.find(dest => dest.country === country);
  const countryFlag = countryData?.flag || "🚩";
  
  return (
    <Link to={`/country/${country}`}>
      <motion.div 
        className={`absolute z-10 ${isHighlighted ? 'z-30' : ''}`} 
        style={{ 
          left: position.left,
          top: position.top,
          transform: "translate(-50%, -50%)"
        }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        whileHover={{ scale: 1.5, zIndex: 40 }}
      >
        {isHighlighted ? (
          // Enhanced highlighted country marker
          <motion.div 
            className="relative"
            whileHover={{ scale: 1.2 }}
          >
            {/* Pulsing ring effect */}
            <motion.div 
              className="absolute rounded-full bg-red-500/30"
              style={{ width: '36px', height: '36px', left: '-18px', top: '-18px' }}
              animate={{ 
                scale: [1, 1.5, 1],
                opacity: [0.7, 0.2, 0.7]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            {/* Inner marker */}
            <div className="bg-white rounded-full p-1 shadow-lg relative z-20">
              <div className="bg-red-500 rounded-full w-5 h-5 flex items-center justify-center">
                <motion.span 
                  className="text-white font-bold text-sm"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  {countryFlag}
                </motion.span>
              </div>
            </div>
            
            {/* Country name label */}
            <motion.div 
              className="absolute top-6 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded shadow text-xs whitespace-nowrap font-bold text-purple-800"
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {country}
            </motion.div>
          </motion.div>
        ) : (
          // Regular country marker (unlocked)
          <motion.div 
            className="relative"
            whileHover={{ scale: 1.2 }}
          >
            <div className="bg-white rounded-full p-0.5 shadow-lg">
              <div className="bg-blue-500 rounded-full w-3 h-3 flex items-center justify-center">
                <motion.span 
                  className="text-white text-xs opacity-0"
                  whileHover={{ opacity: 1 }}
                >
                  {countryFlag}
                </motion.span>
              </div>
            </div>
            
            {/* Country name on hover */}
            <motion.div 
              className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-white px-1.5 py-0.5 rounded shadow text-xs whitespace-nowrap font-bold text-blue-800 opacity-0"
              whileHover={{ opacity: 1 }}
            >
              {country}
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    </Link>
  );
};

export default CountryMarker;
