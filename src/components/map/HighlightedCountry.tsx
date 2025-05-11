
import React from 'react';
import { motion } from 'framer-motion';
import { getCountryPosition } from '@/utils/mapData';
import { WORLD_DESTINATIONS } from '@/utils/mapData';

interface HighlightedCountryProps {
  country: string;
}

const HighlightedCountry: React.FC<HighlightedCountryProps> = ({ country }) => {
  // Find the country's flag from the destinations data
  const countryFlag = WORLD_DESTINATIONS.find(dest => dest.country === country)?.flag || "🚩";
  
  // Get the country position on the map
  const position = getCountryPosition(country);
  
  return (
    <motion.div 
      className="absolute w-1 h-1 z-10" 
      style={{ 
        left: position.left,
        top: position.top,
        transform: "translate(-50%, -50%)"
      }}
      initial={{ scale: 0 }}
      animate={{ scale: [0, 1.2, 1] }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-white rounded-full p-0.5 shadow-lg"> 
        <div className="bg-red-500 rounded-full w-1 h-1 flex items-center justify-content pulse"> 
          <span className="text-white text-[3px] font-bold">
            {countryFlag}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default HighlightedCountry;
