
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { getCountryPosition, getCountryImage } from '@/utils/mapData';

interface UnlockedCountriesProps {
  countries: string[];
  highlightCountry?: string;
}

const UnlockedCountries: React.FC<UnlockedCountriesProps> = ({ countries, highlightCountry }) => {
  return (
    <>
      {countries.map((country, index) => (
        <Link to={`/country/${country}`} key={country} className="block">
          <motion.div 
            className="absolute unlocked-country"
            style={{ 
              left: getCountryPosition(country).left,
              top: getCountryPosition(country).top,
              transform: "translate(-50%, -50%)",
              zIndex: highlightCountry === country ? 20 : 5
            }}
            animate={{ 
              y: [0, -3, 0], 
              scale: highlightCountry === country ? 1.2 : 1
            }}
            transition={{ 
              y: { duration: 2, repeat: Infinity, repeatType: "reverse" },
              scale: { duration: 0.3 }
            }}
            whileHover={{ scale: 1.2 }}
          >
            <motion.div 
              className="bg-white rounded-full p-0.5 shadow-lg" 
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <img 
                src={getCountryImage(country)} 
                alt={country}
                className="w-3 h-3 rounded-full object-cover" 
              />
            </motion.div>
          </motion.div>
        </Link>
      ))}
    </>
  );
};

export default UnlockedCountries;
