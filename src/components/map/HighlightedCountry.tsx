
import React from 'react';
import { motion } from 'framer-motion';
import { getCountryPosition } from '@/utils/mapData';
import { WORLD_DESTINATIONS } from '@/utils/mapData';

interface HighlightedCountryProps {
  country: string;
}

const HighlightedCountry: React.FC<HighlightedCountryProps> = ({
  country
}) => {
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
      initial={{
        scale: 0
      }} 
      animate={{
        scale: 1
      }} 
      transition={{
        duration: 0.8,
        type: "spring"
      }}
    >
      {/* Pulsing background effect */}
      <motion.div 
        className="absolute rounded-full bg-red-500/30" 
        style={{
          width: '40px',
          height: '40px',
          left: '-20px',
          top: '-20px'
        }} 
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
      <div className="bg-white rounded-full p-1 shadow-lg relative z-20">
        <motion.div
          animate={{
            rotate: [0, 10, -10, 0],
            y: [0, -2, 0, 2, 0]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear"
          }}
          className="text-2xl"
        >
          {countryFlag}
        </motion.div>
      </div>
      
      {/* Country name label */}
      <motion.div 
        className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded shadow text-xs whitespace-nowrap z-20"
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        {country}
      </motion.div>
    </motion.div>
  );
};

export default HighlightedCountry;
