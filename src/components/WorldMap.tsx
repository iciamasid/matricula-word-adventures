
import React from 'react';
import { motion } from 'framer-motion';
import CountryMarkers from './map/CountryMarkers';
import { AspectRatio } from '@/components/ui/aspect-ratio';

interface WorldMapProps {
  highlightCountry: string;
  unlockedCountries: string[];
}

const WorldMap: React.FC<WorldMapProps> = ({
  highlightCountry,
  unlockedCountries
}) => {
  return (
    <motion.div 
      className="relative w-full rounded-lg overflow-hidden shadow-md" 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 0.5 }}
    >
      <AspectRatio ratio={16 / 9} className="bg-blue-100">
        <div className="absolute inset-0 bg-blue-50 bg-opacity-70">
          {/* World map background could go here */}
        </div>
        
        {/* Country markers */}
        <CountryMarkers 
          highlightCountry={highlightCountry} 
          unlockedCountries={unlockedCountries} 
        />
      </AspectRatio>
    </motion.div>
  );
};

export default WorldMap;
