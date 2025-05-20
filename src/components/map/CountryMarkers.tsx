
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
  // Make sure Spain is always included in unlockedCountries
  const ensureSpainIsUnlocked = (countries: string[]) => {
    const hasSpain = countries.some(country => 
      country.toLowerCase() === "españa" || 
      country.toLowerCase() === "spain"
    );
    
    if (!hasSpain) {
      return [...countries, "España"];
    }
    
    return countries;
  };
  
  const finalUnlockedCountries = ensureSpainIsUnlocked(unlockedCountries);
  
  return (
    <>
      {/* Conditionally render highlighted country */}
      {highlightCountry && (
        <HighlightedCountry country={highlightCountry} />
      )}

      {/* Render unlocked countries */}
      <UnlockedCountries 
        countries={finalUnlockedCountries} 
        highlightCountry={highlightCountry} 
      />
    </>
  );
};

export default CountryMarkers;
