
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CountryMarkers from './CountryMarkers';

interface MapDisplayProps {
  zoom: number;
  highlightCountry?: string;
  unlockedCountries?: string[];
}

const MapDisplay: React.FC<MapDisplayProps> = ({
  zoom,
  highlightCountry,
  unlockedCountries = []
}) => {
  // Add auto-zoom effect when country changes
  const [currentZoom, setCurrentZoom] = useState(zoom);
  
  // Ensure Spain is always in the unlockedCountries list
  const ensureSpainIsIncluded = () => {
    if (!unlockedCountries.some(c => 
        c.toLowerCase() === "españa" || 
        c.toLowerCase() === "spain")) {
      return [...unlockedCountries, "España"];
    }
    return unlockedCountries;
  };
  
  const finalUnlockedCountries = ensureSpainIsIncluded();
  
  useEffect(() => {
    // Set initial zoom from props
    setCurrentZoom(zoom);
  }, [zoom]);

  return (
    <motion.div 
      initial={{
        opacity: 0,
        scale: 0.9
      }} 
      animate={{
        opacity: 1,
        scale: 1
      }} 
      transition={{
        duration: 0.5
      }} 
      className="relative w-full h-full overflow-hidden py-0"
    >
      <AnimatePresence>
        <motion.div 
          key={`map-${highlightCountry}`}
          className="w-full h-full relative" 
          style={{
            scale: currentZoom,
            transformOrigin: "center"
          }}
          initial={{ scale: currentZoom * 0.9 }}
          animate={{ scale: currentZoom }}
          transition={{ duration: 0.5 }}
        >
          {/* Base map image with improved styling */}
          <motion.img 
            src="/lovable-uploads/310987b9-7b6d-48c9-8dec-f37f4487ca8c.png" 
            alt="World Map" 
            style={{
              minWidth: "100%",
              minHeight: "100%"
            }} 
            className="w-full h-full object-cover rounded-md" 
          />

          {/* Enhanced country markers component */}
          <CountryMarkers 
            highlightCountry={highlightCountry} 
            unlockedCountries={finalUnlockedCountries} 
          />
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

export default MapDisplay;
