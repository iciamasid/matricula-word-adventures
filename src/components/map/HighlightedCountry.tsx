
import React from 'react';
import { motion } from 'framer-motion';
import { getCountryPosition } from '@/utils/mapData';
import { WORLD_DESTINATIONS } from '@/utils/mapData';

interface HighlightedCountryProps {
  country: string;
}

const HighlightedCountry: React.FC<HighlightedCountryProps> = ({ country }) => {
  return (
    <motion.div 
      className="absolute w-3 h-3 z-10" 
      style={{ 
        left: getCountryPosition(country).left,
        top: getCountryPosition(country).top,
        transform: "translate(-50%, -50%)"
      }}
      initial={{ scale: 0 }}
      animate={{ scale: [0, 1.2, 1] }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-white rounded-full p-0.5 shadow-lg"> 
        <div className="bg-red-500 rounded-full w-2 h-2 flex items-center justify-center pulse"> 
          <span className="text-white text-[8px] font-bold">
            {WORLD_DESTINATIONS.find(dest => dest.country === country)?.flag || "🚩"}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default HighlightedCountry;
