
import React from 'react';
import HighlightedCountry from './map/HighlightedCountry';
import UnlockedCountries from './map/UnlockedCountries';

interface WorldMapProps {
  highlightCountry: string;
  unlockedCountries: string[];
}

// Fixed the return type by making it explicitly return JSX.Element
const WorldMap: React.FC<WorldMapProps> = ({ highlightCountry, unlockedCountries }) => {
  return (
    <div className="relative w-full">
      <div className="max-w-3xl mx-auto">
        <svg viewBox="0 0 1000 500" className="w-full h-auto">
          <UnlockedCountries countries={unlockedCountries} />
          <HighlightedCountry country={highlightCountry} />
        </svg>
      </div>
    </div>
  );
};

export default WorldMap;
