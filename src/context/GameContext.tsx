
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
  showAgeBonusPopup: boolean;
  showCompletionBanner: boolean;
  
  // Game control
  resetGame: () => void;
}

export const GameContext = createContext<GameContextType>({
  originInfo: { city: '', country: '', flag: '' },
  destinationInfo: { city: '', country: '', flag: '' },
  originWord: '',
  destinationWord: '',
  selectedCarColor: { id: "2", name: "Coche Azul", image: "cocheazul.png", color: "bg-blue-500" }, // Set blue car as default
  setOriginInfo: () => {},
  setDestinationInfo: () => {},
  setOriginWord: () => {},
  setDestinationWord: () => {},
  setSelectedCarColor: () => {},
  
  // Default values for player info
  playerName: '',
  playerAge: null,
  playerGender: '',
  setPlayerName: () => {},
  setPlayerAge: () => {},
  setPlayerGender: () => {},
  
  // Default values for game state
  level: 1,
  score: 0,
  previousScore: 0,
  totalPoints: 0,
  highScore: 0,
  gamesPlayed: 0,
  
  // Default values for license plate
  licensePlate: '',
  plateConsonants: '',
  currentWord: '',
  setCurrentWord: () => {},
  submitWord: () => {},
  generateNewPlate: () => {},
  isGeneratingLicensePlate: false,
  setIsGeneratingLicensePlate: () => {},
  
  // Default values for feedback
  submitSuccess: null,
  clearSubmitSuccess: () => {},
  errorMessage: null,
  clearError: () => {},
  showLevelUp: false,
  clearLevelUpMessage: () => {},
  
  // Default values for popups
  showBonusPopup: false,
  showAgeBonusPopup: false,
  showCompletionBanner: false,
  
  // Default game control
  resetGame: () => {},
});

export const GameProvider = ({ children }: { children: React.ReactNode }) => {
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
  const [selectedCarColor, setSelectedCarColor] = useState<CarColor>({ 
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
  const [showAgeBonusPopup, setShowAgeBonusPopup] = useState<boolean>(false);
  const [showCompletionBanner, setShowCompletionBanner] = useState<boolean>(false);
  
  // Track previous destination to set as origin when leveling up
  const [previousDestination, setPreviousDestination] = useState<CountryInfo | null>(null);
  
  // Clear feedback functions
  const clearSubmitSuccess = () => setSubmitSuccess(null);
  const clearError = () => setErrorMessage(null);
  const clearLevelUpMessage = () => setShowLevelUp(false);
  
  // Game control functions
  const resetGame = () => {
    setLevel(1);
    setScore(0);
    setPreviousScore(0);
    setTotalPoints(0);
    setGamesPlayed(0);
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
      setPreviousDestination(destinationInfo);
      
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
        
        // Add bonus points - increased to 500
        const bonusPoints = 500;
        setTotalPoints(prev => prev + bonusPoints);
        console.log(`🎉 Special 6666 license plate bonus! +${bonusPoints} points!`);
        
        // Auto-hide bonus popup after 4 seconds
        setTimeout(() => {
          setShowBonusPopup(false);
        }, 4000);
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
  
  // Function to get destinations based on level, using previous destination as new origin
  const updateDestinations = (currentLevel: number) => {
    console.log(`Updating destinations for level ${currentLevel}`);
    console.log(`Previous destination: ${previousDestination?.country || 'None'}`);
    
    // If we have a previous destination, set it as the origin
    if (previousDestination) {
      setOriginInfo(previousDestination);
      console.log(`Setting origin to previous destination: ${previousDestination.country}`);
    } else {
      // Default to Madrid if no previous destination (should only happen at game start)
      const spainOrigin = { 
        city: 'Madrid', 
        country: 'España', 
        flag: '🇪🇸', 
        fact: '¡En Madrid está el museo del Prado con obras de arte increíbles!' 
      };
      setOriginInfo(spainOrigin);
      console.log(`No previous destination, setting origin to default: ${spainOrigin.country}`);
    }
    
    // Get destination based on the level
    let destinationCountry;
    
    // Setting destinations based on level according to specified progression
    switch(currentLevel) {
      case 1:
        destinationCountry = WORLD_DESTINATIONS.find(dest => dest.country === 'Francia');
        console.log("Level 1: Destination set to France");
        break;
      case 2:
        destinationCountry = WORLD_DESTINATIONS.find(dest => dest.country === 'Italia');
        console.log("Level 2: Destination set to Italy");
        break;
      case 3:
        destinationCountry = WORLD_DESTINATIONS.find(dest => dest.country === 'Rusia');
        console.log("Level 3: Destination set to Russia");
        break;
      case 4:
        destinationCountry = WORLD_DESTINATIONS.find(dest => dest.country === 'Japón');
        console.log("Level 4: Destination set to Japan");
        break;
      case 5:
        destinationCountry = WORLD_DESTINATIONS.find(dest => dest.country === 'Australia');
        console.log("Level 5: Destination set to Australia");
        break;
      case 6:
        destinationCountry = WORLD_DESTINATIONS.find(dest => dest.country === 'Estados Unidos');
        console.log("Level 6: Destination set to United States");
        break;
      case 7:
        destinationCountry = WORLD_DESTINATIONS.find(dest => dest.country === 'México');
        console.log("Level 7: Destination set to Mexico");
        break;
      case 8:
        destinationCountry = WORLD_DESTINATIONS.find(dest => dest.country === 'Perú');
        console.log("Level 8: Destination set to Peru");
        break;
      case 9:
        destinationCountry = WORLD_DESTINATIONS.find(dest => dest.country === 'Argentina');
        console.log("Level 9: Destination set to Argentina");
        break;
      case 10:
        // Back to Spain for completing the world tour
        destinationCountry = WORLD_DESTINATIONS.find(dest => dest.country === 'España');
        console.log("Level 10: Destination set to Spain (completed world tour)");
        break;
      default:
        // Default to France for any other level
        destinationCountry = WORLD_DESTINATIONS.find(dest => dest.country === 'Francia');
        console.log(`Unknown level ${currentLevel}: Defaulting destination to France`);
    }
    
    // Fallback if not found
    if (!destinationCountry) {
      destinationCountry = {
        city: 'París',
        country: 'Francia',
        flag: '🇫🇷',
        fact: '¡La Torre Eiffel mide 324 metros! ¡Es tan alta como un edificio de 81 pisos y fue construida en 1889!'
      };
      console.log("Destination not found in WORLD_DESTINATIONS, using fallback");
    }
    
    // Update destination
    setDestinationInfo(destinationCountry);
    
    console.log(`Updated destinations for level ${currentLevel}: Origin=${originInfo.country}, Destination=${destinationCountry.country}`);
  };
  
  // Generate a new license plate using the utility functions
  const generateNewPlateImpl = () => {
    let newPlate;
    setIsGeneratingLicensePlate(true);
    
    // Every 5th game, generate a special 6666 plate for bonus
    if ((gamesPlayed + 1) % 5 === 0) {
      // Create a plate that starts with 6666
      const consonants = "BCDFGHJKLMNPQRSTVWXYZ";
      const randomConsonants = Array(3)
        .fill("")
        .map(() => consonants.charAt(Math.floor(Math.random() * consonants.length)))
        .join("");
      
      newPlate = `6666${randomConsonants}`;
      console.log(`Generated special 6666 plate: ${newPlate} (Game ${gamesPlayed + 1})`);
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
  
  // Improved submit word function with proper score calculation
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
    if (level === 1) {
      // Ensure level 1 always has Spain -> France
      const spainOrigin = WORLD_DESTINATIONS.find(dest => dest.country === 'España') || 
                      { city: 'Madrid', country: 'España', flag: '🇪🇸', fact: '¡En Madrid está el museo del Prado con obras de arte increíbles!' };
      
      const franceDestination = WORLD_DESTINATIONS.find(dest => dest.country === 'Francia') || 
                      { city: 'París', country: 'Francia', flag: '🇫🇷', fact: '¡La Torre Eiffel mide 324 metros! ¡Es tan alta como un edificio de 81 pisos y fue construida en 1889!' };
      
      setOriginInfo(spainOrigin);
      setDestinationInfo(franceDestination);
      console.log("Level 1 setup: Origin=Spain, Destination=France");
    }
  }, []);

  return (
    <GameContext.Provider value={{
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
      showAgeBonusPopup,
      showCompletionBanner,
      
      // Game control
      resetGame,
    }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => useContext(GameContext);
