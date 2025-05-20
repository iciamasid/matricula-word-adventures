
import React from 'react';
import CountryMarker from './CountryMarker';

interface UnlockedCountriesProps {
  countries: string[];
  highlightCountry?: string;
  requiredVisitCountry?: string;
}

const UnlockedCountries: React.FC<UnlockedCountriesProps> = ({ 
  countries, 
  highlightCountry,
  requiredVisitCountry
}) => {
  // Filter out the highlighted country since it's already shown
  const filteredCountries = highlightCountry 
    ? countries.filter(country => country !== highlightCountry) 
    : countries;
  
  return (
    <>
      {filteredCountries.map((country, index) => {
        // Check if this country needs to be visited
        const needsVisit = requiredVisitCountry === country;
        
        return (
          <CountryMarker 
            key={index} 
            country={country} 
            index={index}
            isHighlighted={false}
            needsVisit={needsVisit}
          />
        );
      })}
    </>
  );
};

export default UnlockedCountries;
