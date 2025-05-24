
import { useNavigate } from 'react-router-dom';

// Country mapping to determine which game they belong to
const COUNTRY_GAME_MAPPING = {
  // Car game countries - THESE SHOULD GO TO INDEX (/)
  "España": "car-game",
  "Francia": "car-game", 
  "Italia": "car-game",
  "Rusia": "car-game",
  "Japón": "car-game",
  "Estados Unidos": "car-game",
  "México": "car-game",
  "Australia": "car-game",
  "Argentina": "car-game",
  
  // Motorcycle game countries - THESE SHOULD GO TO MOTORCYCLE-GAME
  "Reino_Unido": "motorcycle-game",
  "Grecia": "motorcycle-game",
  "Noruega": "motorcycle-game", 
  "China": "motorcycle-game",
  "Canada": "motorcycle-game",
  "Costa_Rica": "motorcycle-game",
  "Brasil": "motorcycle-game",
  "Peru": "motorcycle-game"
};

export const useCountryNavigation = (countryName: string) => {
  const navigate = useNavigate();

  const handleReturnToGame = () => {
    // DEBUG: Log everything to trace the issue
    console.log('=== DEBUGGING COUNTRY NAVIGATION ===');
    console.log('Country name received:', countryName);
    console.log('Country mapping:', COUNTRY_GAME_MAPPING);
    console.log('Mapped game type:', COUNTRY_GAME_MAPPING[countryName as keyof typeof COUNTRY_GAME_MAPPING]);
    
    // Restore game state if it was stored
    const gameState = sessionStorage.getItem('gameStateBeforeCountry');
    if (gameState) {
      const parsedState = JSON.parse(gameState);
      console.log(`Restoring game state from ${countryName}:`, parsedState);
      
      sessionStorage.setItem('restoreGameState', JSON.stringify(parsedState));
      sessionStorage.removeItem('gameStateBeforeCountry');
    }
    
    // Determine return path based on country mapping
    const gameType = COUNTRY_GAME_MAPPING[countryName as keyof typeof COUNTRY_GAME_MAPPING];
    // FIX: Car game countries should go to INDEX (/), not /draw-game
    const returnPath = gameType === 'motorcycle-game' ? '/motorcycle-game' : '/';
    
    console.log('Calculated return path:', returnPath);
    console.log('About to navigate to:', returnPath);
    console.log('=== END DEBUGGING ===');
    
    sessionStorage.removeItem('navigatingBack');
    navigate(returnPath);
  };

  return { handleReturnToGame };
};
