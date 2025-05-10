
import React, { useState } from 'react';
import ZoomControls from './map/ZoomControls';
import MapDisplay from './map/MapDisplay';

interface WorldMapProps {
  highlightCountry?: string;
  unlockedCountries?: string[];
}

const WorldMap: React.FC<WorldMapProps> = ({ highlightCountry, unlockedCountries = [] }) => {
  const [zoom, setZoom] = useState(1);
  
  const handleZoomIn = () => {
    if (zoom < 2) setZoom(prev => prev + 0.25);
  };

  const handleZoomOut = () => {
    if (zoom > 0.5) setZoom(prev => prev - 0.25);
  };
  
  return (
    <div className="bg-[#9a83b9] h-full w-full flex items-center justify-center p-3 relative rounded-lg border-4 border-white/50">
      {/* Zoom controls */}
      <ZoomControls onZoomIn={handleZoomIn} onZoomOut={handleZoomOut} />
      
      {/* Map display with countries */}
      <MapDisplay 
        zoom={zoom} 
        highlightCountry={highlightCountry} 
        unlockedCountries={unlockedCountries} 
      />
    </div>
  );
};

export default WorldMap;
