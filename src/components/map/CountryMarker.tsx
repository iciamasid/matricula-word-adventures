
import React from 'react';
import { motion } from 'framer-motion';
import { getCountryPosition, getCountryImage } from '@/utils/mapData';
import { WORLD_DESTINATIONS } from '@/utils/mapData';
import { useGame } from '@/context/GameContext';
import { getCountryInfo } from '@/data/countryData';

interface CountryMarkerProps {
  country: string;
  index: number;
  isHighlighted?: boolean;
  onCountryClick?: (countryInfo: any) => void;
}

const CountryMarker: React.FC<CountryMarkerProps> = ({ country, index, isHighlighted, onCountryClick }) => {
  // Get country information
  const position = getCountryPosition(country);
  const countryImage = getCountryImage(country);
  const { markCountryAsVisited, requiredCountryToVisit } = useGame();
  
  // Find country flag emoji as fallback
  const countryData = WORLD_DESTINATIONS.find(dest => dest.country === country);
  const countryFlag = countryData?.flag || "🚩";
  
  // Check if this country is the one that needs to be visited
  const isRequiredToVisit = requiredCountryToVisit === country;
  
  // Handle country click
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    // Get country info and open modal
    const countryInfo = getCountryInfo(country);
    if (onCountryClick && countryInfo) {
      onCountryClick(countryInfo);
    }
    
    // If this is the required country to visit, mark it as visited
    if (isRequiredToVisit) {
      markCountryAsVisited(country);
    }
  };
  
  return (
    <motion.div 
      className={`absolute z-10 cursor-pointer ${isHighlighted ? 'z-30' : ''} ${isRequiredToVisit ? 'z-40' : ''}`} 
      style={{ 
        left: position.left,
        top: position.top,
        transform: "translate(-50%, -50%)"
      }}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.5, zIndex: 40 }}
      onClick={handleClick}
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
          
          {/* Inner marker with flag image */}
          <div className="bg-white rounded-full p-1 shadow-lg relative z-20">
            <div className="bg-red-500 rounded-full w-5 h-5 flex items-center justify-center overflow-hidden">
              <img 
                src={countryImage} 
                alt={`${country} flag`}
                className="w-full h-full object-cover rounded-full"
                onError={(e) => {
                  // Fallback to emoji if image fails to load
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  target.parentElement!.innerHTML = `<span class="text-white font-bold text-xs">${countryFlag}</span>`;
                }}
              />
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
        // Regular country marker (unlocked) with flag image
        <motion.div 
          className="relative"
          whileHover={{ scale: 1.2 }}
        >
          {/* Special pulsing animation for required countries */}
          {isRequiredToVisit && (
            <motion.div 
              className="absolute rounded-full bg-yellow-400/50"
              style={{ width: '24px', height: '24px', left: '-12px', top: '-12px' }}
              animate={{ 
                scale: [1, 1.8, 1],
                opacity: [0.8, 0.3, 0.8]
              }}
              transition={{ 
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          )}
          
          <div className="bg-white rounded-full p-0.5 shadow-lg">
            <div className={`${isRequiredToVisit ? 'bg-yellow-500' : 'bg-blue-500'} rounded-full w-3 h-3 flex items-center justify-center overflow-hidden`}>
              <img 
                src={countryImage} 
                alt={`${country} flag`}
                className="w-full h-full object-cover rounded-full opacity-90"
                onError={(e) => {
                  // Fallback to emoji if image fails to load
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  target.parentElement!.innerHTML = `<span class="text-white text-xs">${countryFlag}</span>`;
                }}
              />
            </div>
          </div>
          
          {/* Country name on hover */}
          <motion.div 
            className={`absolute top-4 left-1/2 transform -translate-x-1/2 bg-white px-1.5 py-0.5 rounded shadow text-xs whitespace-nowrap font-bold ${isRequiredToVisit ? 'text-yellow-800' : 'text-blue-800'} opacity-0`}
            whileHover={{ opacity: 1 }}
          >
            {country}
            {isRequiredToVisit && (
              <div className="text-xs text-yellow-600">¡Haz clic para visitar!</div>
            )}
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default CountryMarker;
