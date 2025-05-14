
import React from 'react';
import { motion } from 'framer-motion';
import { getCountryPosition } from '@/utils/mapData';
import { WORLD_DESTINATIONS } from '@/utils/mapData';

interface HighlightedCountryProps {
  country: string;
}

const HighlightedCountry: React.FC<HighlightedCountryProps> = ({ country }) => {
  // Find the country's flag from the destinations data
  const countryData = WORLD_DESTINATIONS.find(dest => dest.country === country);
  const countryFlag = countryData?.flag || "🚩";
  
  // Get the country position on the map
  const position = getCountryPosition(country);
  
  return (
    <motion.div 
      className="absolute z-30" 
      style={{ 
        left: position.left,
        top: position.top,
        transform: "translate(-50%, -50%)"
      }}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.8, type: "spring" }}
    >
      {/* Pulsing background effect */}
      <motion.div 
        className="absolute rounded-full bg-red-500/30"
        style={{ width: '40px', height: '40px', left: '-20px', top: '-20px' }}
        animate={{ 
          scale: [1, 1.6, 1],
          opacity: [0.7, 0.2, 0.7]
        }}
        transition={{ 
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Marker container */}
      <div className="bg-white rounded-full p-1.5 shadow-lg relative z-20">
        <motion.div 
          className="bg-red-600 rounded-full w-6 h-6 flex items-center justify-center"
          animate={{ 
            boxShadow: ['0 0 0px rgba(239, 68, 68, 0)', '0 0 10px rgba(239, 68, 68, 0.7)', '0 0 0px rgba(239, 68, 68, 0)']
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <motion.span 
            className="text-white text-lg"
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 10, -10, 0]
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {countryFlag}
          </motion.span>
        </motion.div>
      </div>
      
      {/* Country name label */}
      <motion.div 
        className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-white px-2.5 py-1 rounded-md shadow-md text-sm font-bold text-purple-800 whitespace-nowrap"
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        {country}
      </motion.div>
    </motion.div>
  );
};

export default HighlightedCountry;
