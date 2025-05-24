
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
  const { markCountryAsVisited, requiredCountryToVisit, clearLevelUpMessage } = useGame();
  
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
  
  // Handle closing the country modal - CRITICAL FIX: Always clear level up message
  const handleCloseCountryModal = () => {
    // Mark the country as visited when the modal is closed
    if (selectedCountry && requiredCountryToVisit && selectedCountry.name === requiredCountryToVisit) {
      markCountryAsVisited(requiredCountryToVisit);
      console.log(`Country ${requiredCountryToVisit} marked as visited from map`);
    }
    
    // CRITICAL FIX: Always clear the level up message when closing country modal
    // This ensures that whether the user came from the popup button or clicked the flag directly,
    // the level up popup closes and the word input field gets enabled
    clearLevelUpMessage();
    console.log('Level up message cleared from country modal close');
    
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
