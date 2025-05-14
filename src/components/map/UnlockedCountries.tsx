
import React from 'react';
import CountryMarker from './CountryMarker';

interface UnlockedCountriesProps {
  countries: string[];
  highlightCountry?: string;
}

const UnlockedCountries: React.FC<UnlockedCountriesProps> = ({ countries, highlightCountry }) => {
  return (
    <>
      {countries.map((country, index) => (
        <CountryMarker 
          key={`${country}-${index}`}
          country={country} 
          index={index} 
          isHighlighted={highlightCountry === country} 
        />
      ))}
    </>
  );
};

export default UnlockedCountries;
