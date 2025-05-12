
import React from 'react';
import HighlightedCountry from './map/HighlightedCountry';
import UnlockedCountries from './map/UnlockedCountries';

interface WorldMapProps {
  highlightCountry: string;
  unlockedCountries: string[];
}

const WorldMap: React.FC<WorldMapProps> = ({ highlightCountry, unlockedCountries }) => {
  // Ensure the highlightCountry is not empty
  const country = highlightCountry || "España";
  // Ensure unlockedCountries is always an array
  const countries = Array.isArray(unlockedCountries) ? unlockedCountries : [];
  
  return (
    <div className="relative w-full">
      <div className="max-w-3xl mx-auto">
        <svg viewBox="0 0 1000 500" className="w-full h-auto">
          <UnlockedCountries countries={countries} />
          <HighlightedCountry country={country} />
        </svg>
      </div>
    </div>
  );
};

export default WorldMap;
