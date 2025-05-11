import React, { useState } from 'react';
import ZoomControls from './map/ZoomControls';
import MapDisplay from './map/MapDisplay';
interface WorldMapProps {
  highlightCountry?: string;
  unlockedCountries?: string[];
}
const WorldMap: React.FC<WorldMapProps> = ({
  highlightCountry,
  unlockedCountries = []
}) => {
  const [zoom, setZoom] = useState(1);
  const handleZoomIn = () => {
    if (zoom < 2) setZoom(prev => prev + 0.25);
  };
  const handleZoomOut = () => {
    if (zoom > 0.5) setZoom(prev => prev - 0.25);
  };
  return;
};
export default WorldMap;