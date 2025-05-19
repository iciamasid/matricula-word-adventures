
import React from 'react';
import CountryMarker from './CountryMarker';

interface UnlockedCountriesProps {
  countries: string[];
  highlightCountry?: string;
  requiredVisitCountry?: string | null;
}

const UnlockedCountries: React.FC<UnlockedCountriesProps> = ({ 
  countries, 
  highlightCountry,
  requiredVisitCountry 
}) => {
  // Process countries to ensure Spain is always included
  // and to handle different name variations
  const processCountries = (countryList: string[]) => {
    // Spain must always be included
    const hasSpain = countryList.some(country => 
      country.toLowerCase().includes("españa") || 
      country.toLowerCase().includes("spain")
    );
    
    if (!hasSpain) {
      return [...countryList, "España"];
    }
    
    return countryList;
  };
  
  const finalCountries = processCountries(countries);
  
  return (
    <>
      {finalCountries.map((country, index) => (
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
