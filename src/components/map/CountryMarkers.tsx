
import React from 'react';
import HighlightedCountry from './HighlightedCountry';
import UnlockedCountries from './UnlockedCountries';

interface CountryMarkersProps {
  highlightCountry?: string;
  unlockedCountries?: string[];
  requiredVisitCountry?: string | null;
}

const CountryMarkers: React.FC<CountryMarkersProps> = ({ 
  highlightCountry, 
  unlockedCountries = [],
  requiredVisitCountry
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
  
  // Get country that should be highlighted - either the manually highlighted one,
  // or the required visit country if it exists
  const effectiveHighlightCountry = requiredVisitCountry || highlightCountry;
  
  return (
    <>
      {/* Conditionally render highlighted country */}
      {effectiveHighlightCountry && (
        <HighlightedCountry 
          country={effectiveHighlightCountry} 
          isRequiredVisit={!!requiredVisitCountry && effectiveHighlightCountry === requiredVisitCountry}
        />
      )}

      {/* Render unlocked countries */}
      <UnlockedCountries 
        countries={finalUnlockedCountries} 
        highlightCountry={effectiveHighlightCountry}
        requiredVisitCountry={requiredVisitCountry}
      />
    </>
  );
};

export default CountryMarkers;
