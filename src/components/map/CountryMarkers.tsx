
import React, { useState } from 'react';
import HighlightedCountry from './HighlightedCountry';
import UnlockedCountries from './UnlockedCountries';
import CountryModal from '@/components/CountryModal';
import { useGame } from '@/context/GameContext';

interface CountryMarkersProps {
  highlightCountry?: string;
  unlockedCountries?: string[];
}

const CountryMarkers: React.FC<CountryMarkersProps> = ({ 
  highlightCountry, 
  unlockedCountries = [] 
}) => {
  const [showCountryModal, setShowCountryModal] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<any>(null);
  const { markCountryAsVisited, requiredCountryToVisit } = useGame();
  
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
  
  // Handle country click from markers
  const handleCountryClick = (countryInfo: any) => {
    setSelectedCountry(countryInfo);
    setShowCountryModal(true);
  };
  
  // Handle closing the country modal
  const handleCloseCountryModal = () => {
    // Mark the country as visited when the modal is closed
    if (selectedCountry && requiredCountryToVisit && selectedCountry.name === requiredCountryToVisit) {
      markCountryAsVisited(requiredCountryToVisit);
      console.log(`Country ${requiredCountryToVisit} marked as visited from map`);
    }
    setShowCountryModal(false);
    setSelectedCountry(null);
  };
  
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
        onCountryClick={handleCountryClick}
      />
      
      {/* Country Modal */}
      <CountryModal
        open={showCountryModal}
        onClose={handleCloseCountryModal}
        country={selectedCountry}
      />
    </>
  );
};

export default CountryMarkers;
