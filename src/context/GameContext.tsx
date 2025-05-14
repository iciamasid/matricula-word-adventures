import React, { createContext, useState, useContext, useEffect } from 'react';
import { CarColor } from '@/components/games/utils/carUtils';
import { generateLicensePlate, getConsonantsFromPlate } from '@/utils/gameUtils';
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
    // Generate new plate after reset
    generateNewPlateImpl();
  };
  
  // Function to get random destinations based on level
  const updateDestinations = (currentLevel: number) => {
    // Always start from Madrid
    const originCountry = WORLD_DESTINATIONS.find(dest => dest.country === 'España') || 
                          { city: 'Madrid', country: 'España', flag: '🇪🇸', fact: '¡En Madrid está el museo del Prado con obras de arte increíbles!' };
    
    // Get a destination based on level
    let destinationCountry;
    
    switch(currentLevel) {
      case 1:
        destinationCountry = WORLD_DESTINATIONS.find(dest => dest.country === 'Francia');
        break;
      case 2:
        destinationCountry = WORLD_DESTINATIONS.find(dest => dest.country === 'Italia');
        break;
      case 3:
        destinationCountry = WORLD_DESTINATIONS.find(dest => dest.country === 'Rusia');
        break;
      case 4:
        destinationCountry = WORLD_DESTINATIONS.find(dest => dest.country === 'Japón');
        break;
      case 5:
        destinationCountry = WORLD_DESTINATIONS.find(dest => dest.country === 'Australia');
        break;
      case 6:
        destinationCountry = WORLD_DESTINATIONS.find(dest => dest.country === 'Estados Unidos');
        break;
      case 7:
        destinationCountry = WORLD_DESTINATIONS.find(dest => dest.country === 'México');
        break;
      case 8:
        destinationCountry = WORLD_DESTINATIONS.find(dest => dest.country === 'Perú');
        break;
      case 9:
        destinationCountry = WORLD_DESTINATIONS.find(dest => dest.country === 'Argentina');
        break;
      case 10:
        // Back to Spain for completing the world tour
        destinationCountry = WORLD_DESTINATIONS.find(dest => dest.country === 'España');
        break;
      default:
        // Default to France for any other level
        destinationCountry = WORLD_DESTINATIONS.find(dest => dest.country === 'Francia');
    }
    
    // Fallback if not found
    if (!destinationCountry) {
      destinationCountry = {
        city: 'París',
        country: 'Francia',
        flag: '🇫🇷',
        fact: '¡La Torre Eiffel mide 324 metros! ¡Es tan alta como un edificio de 81 pisos y fue construida en 1889!'
      };
    }
    
    setOriginInfo(originCountry);
    setDestinationInfo(destinationCountry);
  };
  
  // Update destinations whenever level changes
  useEffect(() => {
    updateDestinations(level);
  }, [level]);
  
  // Generate a new license plate using the utility functions
  const generateNewPlateImpl = () => {
    const newPlate = generateLicensePlate(); 
    setLicensePlate(newPlate);
    setPlateConsonants(getConsonantsFromPlate(newPlate));
    setIsGeneratingLicensePlate(false);
    setGamesPlayed(prevGamesPlayed => prevGamesPlayed + 1);
    
    // Also update the destinations if level has changed
    updateDestinations(level);
  };
  
  // License plate functions
  const generateNewPlate = () => {
    generateNewPlateImpl();
  };
  
  const submitWord = () => {
    // This is a placeholder - in a real implementation, this would handle word submission
    setSubmitSuccess('¡Palabra correcta!');
    setScore(50); // Example score
    setTotalPoints(totalPoints + 50);
    setCurrentWord('');
  };

  // Generate a plate on initial load if there isn't one already
  useEffect(() => {
    if (!licensePlate) {
      generateNewPlateImpl();
    }
  }, [licensePlate]);

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
