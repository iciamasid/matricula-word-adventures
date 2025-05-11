import React from 'react';
import { motion } from 'framer-motion';
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
  return <motion.div className="relative w-full h-full overflow-hidden" initial={{
    opacity: 0,
    scale: 0.9
  }} animate={{
    opacity: 1,
    scale: 1
  }} transition={{
    duration: 0.5
  }}>
      <motion.div className="w-full h-full relative" style={{
      scale: zoom,
      transformOrigin: "center",
      marginLeft: "4mm" // Shift the map 4mm to the right as requested
    }}>
        {/* Base map image */}
        <img src="/lovable-uploads/310987b9-7b6d-48c9-8dec-f37f4487ca8c.png" alt="World Map" style={{
        minWidth: "100%",
        minHeight: "100%"
      }} className="w-full h-full object-cover" />

        {/* Country markers component */}
        <CountryMarkers highlightCountry={highlightCountry} unlockedCountries={unlockedCountries} />
      </motion.div>
    </motion.div>;
};
export default MapDisplay;