
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { getCountryPosition, getCountryImage } from '@/utils/mapData';
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
          key={country} 
          country={country} 
          index={index} 
          isHighlighted={highlightCountry === country} 
        />
      ))}
    </>
  );
};

export default UnlockedCountries;
