
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
        className={`absolute w-1 h-1 z-10 ${isHighlighted ? 'z-20' : ''}`} 
        style={{ 
          left: position.left,
          top: position.top,
          transform: "translate(-50%, -50%)"
        }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        whileHover={{ scale: 1.3, zIndex: 30 }}
      >
        <div className="bg-white rounded-full p-0.5 shadow-lg">
          {isHighlighted ? (
            <div className="bg-red-500 rounded-full w-1 h-1 flex items-center justify-center pulse">
              <span className="text-white text-[3px] font-bold">
                {countryFlag}
              </span>
            </div>
          ) : (
            <div className="bg-blue-500 rounded-full w-1 h-1" />
          )}
        </div>
      </motion.div>
    </Link>
  );
};

export default CountryMarker;
