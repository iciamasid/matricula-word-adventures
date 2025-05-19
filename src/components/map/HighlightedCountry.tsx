
import React from 'react';
import { motion } from 'framer-motion';
import { getCountryPosition } from '@/utils/mapData';
import { WORLD_DESTINATIONS } from '@/utils/mapData';
import { useGame } from '@/context/GameContext';
import { MapPin, Flag } from 'lucide-react';

interface HighlightedCountryProps {
  country: string;
  isRequiredVisit?: boolean;
}

const HighlightedCountry: React.FC<HighlightedCountryProps> = ({
  country,
  isRequiredVisit = false
}) => {
  const { level } = useGame();
  
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
      {/* Pulsing background effect - larger and more colorful for required visits */}
      <motion.div 
        className={`absolute rounded-full ${isRequiredVisit ? 'bg-yellow-500/50' : 'bg-red-500/30'}`}
        style={{
          width: isRequiredVisit ? '60px' : '40px',
          height: isRequiredVisit ? '60px' : '40px',
          left: isRequiredVisit ? '-30px' : '-20px',
          top: isRequiredVisit ? '-30px' : '-20px'
        }} 
        animate={{
          scale: [1, 1.6, 1],
          opacity: [0.7, 0.2, 0.7]
        }} 
        transition={{
          duration: isRequiredVisit ? 1.5 : 2.5,
          repeat: Infinity,
          ease: "easeInOut"
        }} 
      />
      
      {/* Second pulsing ring for required visits */}
      {isRequiredVisit && (
        <motion.div 
          className="absolute rounded-full bg-yellow-400/30"
          style={{
            width: '80px',
            height: '80px',
            left: '-40px',
            top: '-40px'
          }} 
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.5, 0.2, 0.5]
          }} 
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }} 
        />
      )}
      
      {/* Marker container */}
      <div className={`bg-white rounded-full p-2 shadow-lg relative z-20 ${isRequiredVisit ? 'border-2 border-yellow-400' : ''}`}>
        {/* If required visit, show special indicator */}
        {isRequiredVisit ? (
          <motion.div
            animate={{
              rotate: [0, 10, -10, 0],
              y: [0, -3, 0, 3, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear"
            }}
            className="relative"
          >
            <span className="text-3xl">{countryFlag}</span>
            
            {/* Animated "click me" indicator */}
            <motion.div 
              className="absolute -top-5 -right-5 bg-yellow-400 rounded-full p-1"
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity
              }}
            >
              <Flag className="h-4 w-4 text-white" />
            </motion.div>
          </motion.div>
        ) : (
          // Regular highlighted country or car icon for Spain at level 1
          <>
            {/* Show car icon for level 1 (Spain) */}
            {level === 1 && country === "España" ? (
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
                🚗
              </motion.div>
            ) : (
              <span className="text-2xl">{countryFlag}</span>
            )}
          </>
        )}
      </div>
      
      {/* Country name label for required visits */}
      {isRequiredVisit && (
        <motion.div
          className="absolute top-10 left-1/2 transform -translate-x-1/2 bg-yellow-100 px-3 py-1 rounded-full shadow-md border border-yellow-400"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <motion.p
            className="text-yellow-800 font-bold kids-text text-sm whitespace-nowrap"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            {country}
          </motion.p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default HighlightedCountry;
