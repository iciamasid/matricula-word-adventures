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
  return <motion.div className="relative w-full rounded-lg overflow-hidden shadow-md" initial={{
    opacity: 0
  }} animate={{
    opacity: 1
  }} transition={{
    duration: 0.5
  }}>
      <AspectRatio ratio={2 / 1} className="bg-blue-50">
        
      </AspectRatio>
    </motion.div>;
};
export default WorldMap;