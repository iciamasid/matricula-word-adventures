
import { useNavigate } from 'react-router-dom';
import { useGame } from '@/context/GameContext';

export const useCountryNavigation = (countryName: string) => {
  const navigate = useNavigate();
  const { level, totalPoints } = useGame();

  const handleReturnToGame = () => {
    console.log(`Navigating back from ${countryName} with level: ${level}, points: ${totalPoints}`);
    
    // Save current game state to sessionStorage before navigating
    const gameState = {
      level: level,
      totalPoints: totalPoints,
      timestamp: Date.now()
    };
    
    sessionStorage.setItem('restoreGameState', JSON.stringify(gameState));
    console.log('Saved game state to sessionStorage:', gameState);
    
    // Determine which game to return to based on current URL or game type
    const currentPath = window.location.pathname;
    const motorcycleCountries = ['Portugal', 'Reino_Unido', 'Grecia', 'Noruega', 'China', 'Canada', 'Costa_Rica', 'Brasil', 'Peru'];
    const carCountries = ['España', 'Francia', 'Italia', 'Rusia', 'Japón', 'Estados Unidos', 'México', 'Australia', 'Argentina'];
    
    // Check if it's a motorcycle game country
    const isMotorcycleCountry = motorcycleCountries.some(country => 
      currentPath.includes(country) || countryName === country
    );
    
    // Check if it's a car game country  
    const isCarCountry = carCountries.some(country => 
      currentPath.includes(country) || countryName === country
    );
    
    if (isMotorcycleCountry) {
      console.log(`${countryName} is a motorcycle country, returning to motorcycle game`);
      sessionStorage.setItem('navigatingBack', 'motorcycle-game');
      navigate('/motorcycle-game');
    } else if (isCarCountry) {
      console.log(`${countryName} is a car country, returning to index`);
      sessionStorage.setItem('navigatingBack', 'car-game');
      navigate('/');
    } else {
      // Default fallback - check what was stored in sessionStorage
      const storedGameType = sessionStorage.getItem('currentGameType');
      if (storedGameType === 'motorcycle-game') {
        sessionStorage.setItem('navigatingBack', 'motorcycle-game');
        navigate('/motorcycle-game');
      } else {
        sessionStorage.setItem('navigatingBack', 'car-game');
        navigate('/');
      }
    }
  };

  return { handleReturnToGame };
};
