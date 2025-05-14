import React, { createContext, useState, useContext, useEffect } from 'react';
import { CarColor } from '@/components/games/utils/carUtils';
import { generateLicensePlate, getConsonantsFromPlate, getLevel } from '@/utils/gameUtils';
import { WORLD_DESTINATIONS } from '@/utils/mapData';

interface CountryInfo {
  city: string;
  country: string;
  flag: string;
  fact?: string;
}

interface GameContextType {
  // Original properties
  originInfo: CountryInfo;
  destinationInfo: CountryInfo;
  originWord: string;
  destinationWord: string;
  selectedCarColor: CarColor | null;
  setOriginInfo: (info: CountryInfo) => void;
  setDestinationInfo: (info: CountryInfo) => void;
  setOriginWord: (word: string) => void;
  setDestinationWord: (word: string) => void;
  setSelectedCarColor: (color: CarColor | null) => void;
  
  // Player information
  playerName: string;
  playerAge: number | null;
  playerGender: string;
  setPlayerName: (name: string) => void;
  setPlayerAge: (age: number | null) => void;
  setPlayerGender: (gender: string) => void;
  
  // Game state and progress
  level: number;
  score: number;
  previousScore: number;
  totalPoints: number;
  highScore: number;
  gamesPlayed: number;
  
  // License plate related
  licensePlate: string;
  plateConsonants: string;
  currentWord: string;
  setCurrentWord: (word: string) => void;
  submitWord: () => void;
  generateNewPlate: () => void;
  isGeneratingLicensePlate: boolean;
  setIsGeneratingLicensePlate: (isGenerating: boolean) => void;
  
  // Game feedback and messages
  submitSuccess: string | null;
  clearSubmitSuccess: () => void;
  errorMessage: string | null;
  clearError: () => void;
  showLevelUp: boolean;
  clearLevelUpMessage: () => void;
  
  // Popups and banners
  showBonusPopup: boolean;
  setShowBonusPopup: (show: boolean) => void;
  bonusPoints: number;
  showAgeBonusPopup: boolean;
  showCompletionBanner: boolean;
  
  // Game control
  resetGame: () => void;
}

const GameContext = createContext<GameContextType | null>(null);

// Create a key for localStorage to store game state
const GAME_STATE_KEY = 'matriculabra_game_state';

export const GameProvider: React.FC<{
  children: React.ReactNode | ((props: { 
    showBonusPopup: boolean;
    setShowBonusPopup: (show: boolean) => void;
    bonusPoints: number;
  }) => React.ReactNode);
}> = ({ children }) => {
  // Initialize with default country information
  const [originInfo, setOriginInfo] = useState<CountryInfo>({ 
    city: 'Madrid', 
    country: 'España', 
    flag: '🇪🇸',
    fact: '¡En Madrid está el museo del Prado con obras de arte increíbles! Es una de las galerías de arte más famosas del mundo.'
  });
  
  const [destinationInfo, setDestinationInfo] = useState<CountryInfo>({ 
    city: 'París', 
    country: 'Francia', 
    flag: '🇫🇷',
    fact: '¡La Torre Eiffel mide 324 metros! ¡Es tan alta como un edificio de 81 pisos y fue construida en 1889!'
  });
  
  const [originWord, setOriginWord] = useState<string>('');
  const [destinationWord, setDestinationWord] = useState<string>('');
  // Set the default selected car to the blue one (id: "2")
  const [selectedCarColor, setSelectedCarColor] = useState<CarColor | null>({ 
    id: "2", 
    name: "Coche Azul", 
    image: "cocheazul.png", 
    color: "bg-blue-500" 
  });
  
  // Player information states
  const [playerName, setPlayerName] = useState<string>('');
  const [playerAge, setPlayerAge] = useState<number | null>(null);
  const [playerGender, setPlayerGender] = useState<string>('');
  
  // Game state and progress states
  const [level, setLevel] = useState<number>(1);
  const [score, setScore] = useState<number>(0);
  const [previousScore, setPreviousScore] = useState<number>(0);
  const [totalPoints, setTotalPoints] = useState<number>(0);
  const [highScore, setHighScore] = useState<number>(0);
  const [gamesPlayed, setGamesPlayed] = useState<number>(0);
  
  // License plate related states
  const [licensePlate, setLicensePlate] = useState<string>('');
  const [plateConsonants, setPlateConsonants] = useState<string>('');
  const [currentWord, setCurrentWord] = useState<string>('');
  const [isGeneratingLicensePlate, setIsGeneratingLicensePlate] = useState<boolean>(false);
  
  // Game feedback and messages states
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showLevelUp, setShowLevelUp] = useState<boolean>(false);
  
  // Popups and banners states
  const [showBonusPopup, setShowBonusPopup] = useState<boolean>(false);
  const [bonusPoints, setBonusPoints] = useState<number>(500);
  const [showAgeBonusPopup, setShowAgeBonusPopup] = useState<boolean>(false);
  const [showCompletionBanner, setShowCompletionBanner] = useState<boolean>(false);
  
  // Track previous destination to set as origin when leveling up
  const [previousDestination, setPreviousDestination] = useState<CountryInfo | null>(null);
  
  // Clear feedback functions
  const clearSubmitSuccess = () => setSubmitSuccess(null);
  const clearError = () => setErrorMessage(null);
  const clearLevelUpMessage = () => setShowLevelUp(false);
  
  // Load game state from localStorage on initial mount
  useEffect(() => {
    try {
      const savedState = localStorage.getItem(GAME_STATE_KEY);
      if (savedState) {
        const parsedState = JSON.parse(savedState);
        
        // Restore game state
        if (parsedState.level) setLevel(parsedState.level);
        if (parsedState.totalPoints) setTotalPoints(parsedState.totalPoints);
        if (parsedState.gamesPlayed) setGamesPlayed(parsedState.gamesPlayed);
        if (parsedState.highScore) setHighScore(parsedState.highScore);
        if (parsedState.playerName) setPlayerName(parsedState.playerName);
        if (parsedState.playerAge) setPlayerAge(parsedState.playerAge);
        if (parsedState.playerGender) setPlayerGender(parsedState.playerGender);
        if (parsedState.selectedCarColor) setSelectedCarColor(parsedState.selectedCarColor);
        
        console.log('Game state loaded from localStorage:', parsedState);
        
        // Generate level appropriate destinations
        if (parsedState.level) {
          updateDestinations(parsedState.level);
        }
      }
    } catch (error) {
      console.error('Error loading game state:', error);
    }
  }, []);
  
  // Save game state to localStorage whenever important state changes
  useEffect(() => {
    try {
      const gameState = {
        level,
        totalPoints,
        gamesPlayed,
        highScore,
        playerName,
        playerAge,
        playerGender,
        selectedCarColor,
      };
      
      localStorage.setItem(GAME_STATE_KEY, JSON.stringify(gameState));
      console.log('Game state saved to localStorage');
    } catch (error) {
      console.error('Error saving game state:', error);
    }
  }, [level, totalPoints, gamesPlayed, highScore, playerName, playerAge, playerGender, selectedCarColor]);
  
  // Game control functions
  const resetGame = () => {
    // Initialize with default country information
    setOriginInfo({ 
      city: 'Madrid', 
      country: 'España', 
      flag: '🇪🇸',
      fact: '¡En Madrid está el museo del Prado con obras de arte increíbles! Es una de las galerías de arte más famosas del mundo.'
    });
    
    setDestinationInfo({ 
      city: 'París', 
      country: 'Francia', 
      flag: '🇫🇷',
      fact: '¡La Torre Eiffel mide 324 metros! ¡Es tan alta como un edificio de 81 pisos y fue construida en 1889!'
    });
    
    setOriginWord('');
    setDestinationWord('');
    setSelectedCarColor({ 
      id: "2", 
      name: "Coche Azul", 
      image: "cocheazul.png", 
      color: "bg-blue-500" 
    });
    
    setPlayerName('');
    setPlayerAge(null);
    setPlayerGender('');
    
    setLevel(1);
    setScore(0);
    setPreviousScore(0);
    setTotalPoints(0);
    setHighScore(0);
    setGamesPlayed(0);
    
    setLicensePlate('');
    setPlateConsonants('');
    setCurrentWord('');
    setIsGeneratingLicensePlate(false);
    
    setSubmitSuccess(null);
    setErrorMessage(null);
    setShowLevelUp(false);
    
    setShowBonusPopup(false);
    setBonusPoints(500);
    setShowAgeBonusPopup(false);
    setShowCompletionBanner(false);
    
    setPreviousDestination(null);
    
    // Clear any active messages
    clearSubmitSuccess();
    clearError();
    clearLevelUpMessage();
    
    // Reset popup states
    setShowBonusPopup(false);
    setShowAgeBonusPopup(false);
    setShowCompletionBanner(false);
    
    // Reset previous destination
    setPreviousDestination(null);
    
    // Reset origin and destination to defaults (Spain -> France for level 1)
    setOriginInfo({ 
      city: 'Madrid', 
      country: 'España', 
      flag: '🇪🇸',
      fact: '¡En Madrid está el museo del Prado con obras de arte increíbles! Es una de las galerías de arte más famosas del mundo.'
    });
    setDestinationInfo({ 
      city: 'París', 
      country: 'Francia', 
      flag: '🇫🇷',
      fact: '¡La Torre Eiffel mide 324 metros! ¡Es tan alta como un edificio de 81 pisos y fue construida en 1889!'
    });
    
    // Generate new plate after reset
    generateNewPlateImpl();
  };
  
  // Function to check level based on points
  useEffect(() => {
    // Calculate new level based on total points
    const newLevel = getLevel(totalPoints);
    
    // If level has increased, show level up message
    if (newLevel > level) {
      // Save current destination as previous before updating
      setPreviousDestination({...destinationInfo});
      
      setLevel(newLevel);
      setShowLevelUp(true);
      
      // Play level up sound (optional)
      try {
        const audio = new Audio('/lovable-uploads/level-up.mp3');
        audio.volume = 0.5;
        audio.play();
      } catch (e) {
        console.error("Could not play level up sound", e);
      }
      
      // Auto-hide level up message after 5 seconds
      setTimeout(() => {
        clearLevelUpMessage();
      }, 5000);
      
      console.log(`Level up from ${level} to ${newLevel}! Updating destinations...`);
      // Update destinations for the new level
      updateDestinations(newLevel);
    }
  }, [totalPoints]);
  
  // Check for special license plate patterns and player age bonus
  useEffect(() => {
    if (licensePlate) {
      const numbers = licensePlate.substring(0, 4);
      
      // Check for 6666 pattern (bonus points)
      if (numbers === "6666" && !showBonusPopup) {
        setShowBonusPopup(true);
        
        // Add bonus points - 500 points
        const bonusAmount = 500;
        setBonusPoints(bonusAmount);
        setTotalPoints(prev => prev + bonusAmount);
        console.log(`🎉 Special 6666 license plate bonus! +${bonusAmount} points!`);
        
        // Auto-hide bonus popup after 5 seconds
        setTimeout(() => {
          setShowBonusPopup(false);
        }, 5000);
      }
      
      // Check if license plate matches player age for bonus
      if (playerAge !== null && parseInt(numbers) === playerAge && !showAgeBonusPopup) {
        setShowAgeBonusPopup(true);
        
        // Add age bonus points (20 points)
        const ageBonusPoints = 20;
        setTotalPoints(prev => prev + ageBonusPoints);
        console.log(`🎂 Age match bonus! License plate matches your age (${playerAge})! +${ageBonusPoints} points!`);
        
        // Auto-hide age bonus popup after 4 seconds
        setTimeout(() => {
          setShowAgeBonusPopup(false);
        }, 4000);
      }
    }
  }, [licensePlate, playerAge]);
  
  // Country progression for the world tour
  // Level 1: Spain -> France
  // Level 2: France -> Italy
  // Level 3: Italy -> Russia
  // Level 4: Russia -> Japan
  // Level 5: Japan -> Australia
  // Level 6: Australia -> USA
  // Level 7: USA -> Mexico
  // Level 8: Mexico -> Peru
  // Level 9: Peru -> Argentina
  // Level 10: Argentina -> Spain
  
  // Function to get destinations based on level, using previous destination as new origin
  const updateDestinations = (currentLevel: number) => {
    console.log(`Updating destinations for level ${currentLevel}`);
    
    // Handle origin and destination based on current level
    let originCountry, destinationCountry;
    
    switch(currentLevel) {
      case 1:
        originCountry = WORLD_DESTINATIONS.find(dest => dest.country === 'España') || 
                        { city: 'Madrid', country: 'España', flag: '🇪🇸', fact: '¡En Madrid está el museo del Prado con obras de arte increíbles!' };
        destinationCountry = WORLD_DESTINATIONS.find(dest => dest.country === 'Francia') || 
                        { city: 'París', country: 'Francia', flag: '🇫🇷', fact: '¡La Torre Eiffel mide 324 metros!' };
        break;
      case 2:
        originCountry = WORLD_DESTINATIONS.find(dest => dest.country === 'Francia') || 
                        { city: 'París', country: 'Francia', flag: '🇫🇷', fact: '¡La Torre Eiffel mide 324 metros!' };
        destinationCountry = WORLD_DESTINATIONS.find(dest => dest.country === 'Italia') || 
                        { city: 'Roma', country: 'Italia', flag: '🇮🇹', fact: '¡El Coliseo romano tenía capacidad para 50.000 espectadores!' };
        break;
      case 3:
        originCountry = WORLD_DESTINATIONS.find(dest => dest.country === 'Italia') || 
                        { city: 'Roma', country: 'Italia', flag: '🇮🇹', fact: '¡El Coliseo romano tenía capacidad para 50.000 espectadores!' };
        destinationCountry = WORLD_DESTINATIONS.find(dest => dest.country === 'Rusia') || 
                        { city: 'Moscú', country: 'Rusia', flag: '🇷🇺', fact: '¡La Plaza Roja de Moscú es tan grande como 9 campos de fútbol!' };
        break;
      case 4:
        originCountry = WORLD_DESTINATIONS.find(dest => dest.country === 'Rusia') || 
                        { city: 'Moscú', country: 'Rusia', flag: '🇷🇺', fact: '¡La Plaza Roja de Moscú es tan grande como 9 campos de fútbol!' };
        destinationCountry = WORLD_DESTINATIONS.find(dest => dest.country === 'Japón') || 
                        { city: 'Tokio', country: 'Japón', flag: '🇯🇵', fact: '¡En Japón hay más de 200 volcanes!' };
        break;
      case 5:
        originCountry = WORLD_DESTINATIONS.find(dest => dest.country === 'Japón') || 
                        { city: 'Tokio', country: 'Japón', flag: '🇯🇵', fact: '¡En Japón hay más de 200 volcanes!' };
        destinationCountry = WORLD_DESTINATIONS.find(dest => dest.country === 'Australia') || 
                        { city: 'Sídney', country: 'Australia', flag: '🇦🇺', fact: '¡Australia tiene más de 10.000 playas! Tardarías 27 años en visitar una cada día.' };
        break;
      case 6:
        originCountry = WORLD_DESTINATIONS.find(dest => dest.country === 'Australia') || 
                        { city: 'Sídney', country: 'Australia', flag: '🇦🇺', fact: '¡Australia tiene más de 10.000 playas! Tardarías 27 años en visitar una cada día.' };
        destinationCountry = WORLD_DESTINATIONS.find(dest => dest.country === 'Estados Unidos') || 
                        { city: 'Nueva York', country: 'Estados Unidos', flag: '🇺🇸', fact: '¡El Gran Cañón en Estados Unidos tiene más de 1.6 km de profundidad!' };
        break;
      case 7:
        originCountry = WORLD_DESTINATIONS.find(dest => dest.country === 'Estados Unidos') || 
                        { city: 'Nueva York', country: 'Estados Unidos', flag: '🇺🇸', fact: '¡El Gran Cañón en Estados Unidos tiene más de 1.6 km de profundidad!' };
        destinationCountry = WORLD_DESTINATIONS.find(dest => dest.country === 'México') || 
                        { city: 'Ciudad de México', country: 'México', flag: '🇲🇽', fact: '¡México tiene 34 sitios declarados Patrimonio de la Humanidad por la UNESCO!' };
        break;
      case 8:
        originCountry = WORLD_DESTINATIONS.find(dest => dest.country === 'México') || 
                        { city: 'Ciudad de México', country: 'México', flag: '🇲🇽', fact: '¡México tiene 34 sitios declarados Patrimonio de la Humanidad por la UNESCO!' };
        destinationCountry = WORLD_DESTINATIONS.find(dest => dest.country === 'Perú') || 
                        { city: 'Lima', country: 'Perú', flag: '🇵🇪', fact: '¡Machu Picchu en Perú fue construido hace más de 500 años sin usar ruedas ni animales de tiro!' };
        break;
      case 9:
        originCountry = WORLD_DESTINATIONS.find(dest => dest.country === 'Perú') || 
                        { city: 'Lima', country: 'Perú', flag: '🇵🇪', fact: '¡Machu Picchu en Perú fue construido hace más de 500 años sin usar ruedas ni animales de tiro!' };
        destinationCountry = WORLD_DESTINATIONS.find(dest => dest.country === 'Argentina') || 
                        { city: 'Buenos Aires', country: 'Argentina', flag: '🇦🇷', fact: '¡Las Cataratas del Iguazú tienen 275 saltos de agua diferentes!' };
        break;
      case 10:
        originCountry = WORLD_DESTINATIONS.find(dest => dest.country === 'Argentina') || 
                        { city: 'Buenos Aires', country: 'Argentina', flag: '🇦🇷', fact: '¡Las Cataratas del Iguazú tienen 275 saltos de agua diferentes!' };
        destinationCountry = WORLD_DESTINATIONS.find(dest => dest.country === 'España') || 
                        { city: 'Madrid', country: 'España', flag: '🇪🇸', fact: '¡Has completado la vuelta al mundo y has regresado a España!' };
        break;
      default:
        // Default to level 1 case
        originCountry = WORLD_DESTINATIONS.find(dest => dest.country === 'España') || 
                        { city: 'Madrid', country: 'España', flag: '🇪🇸', fact: '¡En Madrid está el museo del Prado con obras de arte increíbles!' };
        destinationCountry = WORLD_DESTINATIONS.find(dest => dest.country === 'Francia') || 
                        { city: 'París', country: 'Francia', flag: '🇫🇷', fact: '¡La Torre Eiffel mide 324 metros! ¡Es tan alta como un edificio de 81 pisos y fue construida en 1889!' };
    }
    
    // Update origin and destination states
    setOriginInfo(originCountry);
    setDestinationInfo(destinationCountry);
    
    console.log(`Updated destinations for level ${currentLevel}: Origin=${originCountry.country}, Destination=${destinationCountry.country}`);
  };
  
  // Generate a new license plate using the utility functions
  const generateNewPlateImpl = () => {
    let newPlate;
    setIsGeneratingLicensePlate(true);
    
    // Every 5th game, generate a special 6666 plate for bonus
    if ((gamesPlayed + 1) % 5 === 0) {
      // Create a plate that starts with 6666
      // More Spanish-friendly consonants (weighted)
      const spanishConsonants = "BCDFGHJKLMNPQRSTVZRRSTDLNC";
      const randomConsonants = Array(3)
        .fill("")
        .map(() => spanishConsonants.charAt(Math.floor(Math.random() * spanishConsonants.length)))
        .join("");
      
      newPlate = `6666${randomConsonants}`;
      console.log(`Generated special 6666 plate: ${newPlate} (Game ${gamesPlayed + 1})`);
      
      // Ensure bonus popup appears with the special plate
      setShowBonusPopup(true);
      
      // Add bonus points
      const bonusAmount = 500;
      setBonusPoints(bonusAmount);
      setTotalPoints(prev => prev + bonusAmount);
      
      // Play bonus sound
      try {
        const audio = new Audio('/lovable-uploads/level-up.mp3');
        audio.volume = 0.6;
        audio.play();
      } catch (e) {
        console.error("Could not play bonus sound", e);
      }
    } else {
      newPlate = generateLicensePlate();
      console.log(`Generated regular plate: ${newPlate} (Game ${gamesPlayed + 1})`);
    }
    
    setLicensePlate(newPlate);
    const extractedConsonants = getConsonantsFromPlate(newPlate);
    setPlateConsonants(extractedConsonants);
    console.log(`Extracted consonants: ${extractedConsonants}`);
    
    setIsGeneratingLicensePlate(false);
    setGamesPlayed(prevGamesPlayed => prevGamesPlayed + 1);
  };
  
  // License plate functions
  const generateNewPlate = () => {
    generateNewPlateImpl();
  };
  
  // Submit word function
  const submitWord = () => {
    if (!currentWord || currentWord.length < 3) {
      setErrorMessage('La palabra es demasiado corta');
      return;
    }
    
    console.log(`Submitting word: ${currentWord}`);
    
    // Check if word is valid
    import('@/utils/gameUtils').then(({ wordExists, isValidWord, calculateScore }) => {
      // First check if the word contains at least one consonant from the license plate
      if (!isValidWord(currentWord, plateConsonants)) {
        setErrorMessage('La palabra debe incluir al menos una consonante de la matrícula');
        console.log(`Word rejected: ${currentWord} (doesn't contain any consonant from ${plateConsonants})`);
        return;
      }
      
      // Then check if the word exists in our dictionary
      if (!wordExists(currentWord, 'es')) {
        setErrorMessage('Palabra no válida: no existe esta palabra');
        console.log(`Word rejected: ${currentWord} (not in dictionary)`);
        return;
      }
      
      // Calculate score based on word and current license plate
      const calculatedScore = calculateScore(currentWord, plateConsonants, 'es');
      console.log(`Score calculated for ${currentWord}: ${calculatedScore}`);
      
      if (calculatedScore < 0) {
        // Word is invalid
        setErrorMessage('Palabra no válida o no contiene las consonantes requeridas');
        console.log(`Word rejected: ${currentWord} (negative score ${calculatedScore})`);
        return;
      }
      
      // Word is valid, update score
      setPreviousScore(score);
      setScore(calculatedScore);
      setTotalPoints(prev => prev + calculatedScore);
      console.log(`Word accepted: ${currentWord} (+${calculatedScore} points, total: ${totalPoints + calculatedScore})`);
      
      if (calculatedScore > 75) {
        setSubmitSuccess(`¡${currentWord} es correcta! +${calculatedScore} puntos`);
      } else {
        setSubmitSuccess(`¡Palabra correcta! +${calculatedScore} puntos`);
      }
      
      // Track high score
      if (calculatedScore > highScore) {
        setHighScore(calculatedScore);
        console.log(`New high score: ${calculatedScore}`);
      }
      
      // Reset current word
      setCurrentWord('');
    });
  };

  // Generate a plate on initial load if there isn't one already
  useEffect(() => {
    if (!licensePlate) {
      generateNewPlateImpl();
    }
  }, [licensePlate]);
  
  // Initial setup - ensure Level 1 has correct origin/destination
  useEffect(() => {
    console.log(`Initial setup for level ${level}`);
    updateDestinations(level);
  }, []);

  // Create the context value
  const contextValue: GameContextType = {
    originInfo,
    destinationInfo,
    originWord,
    destinationWord,
    selectedCarColor,
    setOriginInfo,
    setDestinationInfo,
    setOriginWord,
    setDestinationWord,
    setSelectedCarColor,
    
    // Player information
    playerName,
    playerAge,
    playerGender,
    setPlayerName,
    setPlayerAge,
    setPlayerGender,
    
    // Game state and progress
    level,
    score,
    previousScore,
    totalPoints,
    highScore,
    gamesPlayed,
    
    // License plate related
    licensePlate,
    plateConsonants,
    currentWord,
    setCurrentWord,
    submitWord,
    generateNewPlate,
    isGeneratingLicensePlate,
    setIsGeneratingLicensePlate,
    
    // Game feedback and messages
    submitSuccess,
    clearSubmitSuccess,
    errorMessage,
    clearError,
    showLevelUp,
    clearLevelUpMessage,
    
    // Popups and banners
    showBonusPopup,
    setShowBonusPopup,
    bonusPoints,
    showAgeBonusPopup,
    showCompletionBanner,
    
    // Game control
    resetGame,
  };

  // Check if children is a function to pass bonus popup state
  if (typeof children === 'function') {
    return (
      <GameContext.Provider value={contextValue}>
        {children({ showBonusPopup, setShowBonusPopup, bonusPoints })}
      </GameContext.Provider>
    );
  }

  return (
    <GameContext.Provider value={contextValue}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
