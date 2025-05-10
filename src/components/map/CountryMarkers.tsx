
import React from 'react';
import HighlightedCountry from './HighlightedCountry';
import UnlockedCountries from './UnlockedCountries';

interface CountryMarkersProps {
  highlightCountry?: string;
  unlockedCountries?: string[];
}

const CountryMarkers: React.FC<CountryMarkersProps> = ({ 
  highlightCountry, 
  unlockedCountries = [] 
}) => {
  return (
    <>
      {/* Conditionally render highlighted country */}
      {highlightCountry && (
        <HighlightedCountry country={highlightCountry} />
      )}

      {/* Render unlocked countries */}
      <UnlockedCountries 
        countries={unlockedCountries} 
        highlightCountry={highlightCountry} 
      />
    </>
  );
};

export default CountryMarkers;
