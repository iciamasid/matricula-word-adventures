import React, { createContext, useState, useContext, useEffect } from 'react';
import { CarColor } from '@/components/games/utils/carUtils';
import { generateLicensePlate, getConsonantsFromPlate, getLevel } from '@/utils/gameUtils';
import { WORLD_DESTINATIONS } from '@/utils/mapData';
import { useLanguage } from '@/context/LanguageContext';

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
  setLevel: (level: number) => void;
  setTotalPoints: (points: number) => void;
  
  // License plate related
  licensePlate: string;
  plateConsonants: string;
  currentWord: string;
  setCurrentWord: (word: string) => void;
  submitWord: () => Promise<void>;
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
  
  // Birthday bonus properties
  showBirthdayBonusPopup: boolean;
  setShowBirthdayBonusPopup: (show: boolean) => void;
  birthYearBonus: number;
  
  // Add updateDestinations function to the interface
  updateDestinations: (level: number) => void;
  
  // Add selectedMotorcycle property
  selectedMotorcycle: CarColor | null;
  setSelectedMotorcycle: (motorcycle: CarColor | null) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

// Create a key for localStorage to store game state
const GAME_STATE_KEY = 'matriculabra_game_state';

export const GameProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  // Get current language from LanguageContext
  const { language } = useLanguage?.() || { language: 'es' };

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
  
  // Set the default selected car to the blue one (id: "2") which is always unlocked
  const [selectedCarColor, setSelectedCarColor] = useState<CarColor | null>({ 
    id: "2", 
    name: "Coche Azul", 
    image: "cocheazul.png", 
    color: "bg-blue-500",
    unlockedAtLevel: 0 // Always unlocked
  });
  
  // Add the missing selectedMotorcycle state
  const [selectedMotorcycle, setSelectedMotorcycle] = useState<CarColor | null>({ 
    id: "1", 
    name: "Moto Blanca", 
    image: "Motoblanca.jpg", 
    color: "bg-white",
    unlockedAtLevel: 0 // Always unlocked
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
  
  // Birthday bonus states - MOVED HERE before they're used
  const [showBirthdayBonusPopup, setShowBirthdayBonusPopup] = useState<boolean>(false);
  const [birthYearBonus, setBirthYearBonus] = useState<number>(50);
  const [lastBirthYearShow, setLastBirthYearShow] = useState<number>(0);
  
  // Special 6666 bonus states - REMOVED DUPLICATES
  const [has6666Triggered, setHas6666Triggered] = useState<boolean>(false);
  
  // Clear feedback functions
  const clearSubmitSuccess = () => setSubmitSuccess(null);
  const clearError = () => setErrorMessage(null);
  const clearLevelUpMessage = () => setShowLevelUp(false);
  
  // Load game state from localStorage on initial mount - MODIFIED TO HANDLE RESET FIRST
  useEffect(() => {
    try {
      // Check for motorcycle game reset flags FIRST
      const motorcycleGameReset = sessionStorage.getItem('motorcycleGameReset');
      const motorcycleStartLevel = sessionStorage.getItem('motorcycleStartLevel');
      const motorcycleStartPoints = sessionStorage.getItem('motorcycleStartPoints');
      
      if (motorcycleGameReset === 'true') {
        // Apply reset immediately
        const startLevel = parseInt(motorcycleStartLevel || '1');
        const startPoints = parseInt(motorcycleStartPoints || '0');
        
        console.log(`Applying motorcycle game reset: Level ${startLevel}, Points ${startPoints}`);
        
        // Reset game state to specified values
        setLevel(startLevel);
        setTotalPoints(startPoints);
        setScore(0);
        setPreviousScore(0);
        setGamesPlayed(0);
        
        // Clear the reset flags immediately
        sessionStorage.removeItem('motorcycleGameReset');
        sessionStorage.removeItem('motorcycleStartLevel');
        sessionStorage.removeItem('motorcycleStartPoints');
        
        // Update destinations for the reset level
        updateDestinations(startLevel);
        
        console.log(`Motorcycle game reset applied successfully: Level ${startLevel}, Points ${startPoints}`);
        return; // Exit early, don't load saved state
      }
      
      // Only load saved state if no reset flags were present
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
        if (parsedState.selectedMotorcycle) setSelectedMotorcycle(parsedState.selectedMotorcycle);
        
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
        selectedMotorcycle,
      };
      
      localStorage.setItem(GAME_STATE_KEY, JSON.stringify(gameState));
      console.log('Game state saved to localStorage');
    } catch (error) {
      console.error('Error saving game state:', error);
    }
  }, [level, totalPoints, gamesPlayed, highScore, playerName, playerAge, playerGender, selectedCarColor, selectedMotorcycle]);
  
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
      color: "bg-blue-500",
      unlockedAtLevel: 0
    });
    
    setSelectedMotorcycle({ 
      id: "1", 
      name: "Moto Blanca", 
      image: "Motoblanca.jpg", 
      color: "bg-white",
      unlockedAtLevel: 0
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
    
    // Clear any reset flags from sessionStorage
    sessionStorage.removeItem('motorcycleGameReset');
    sessionStorage.removeItem('motorcycleStartLevel');
    sessionStorage.removeItem('motorcycleStartPoints');
    
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
      
      // Check if reaching level 10 or above
      if (newLevel >= 10) {
        // Show completion banner/confetti if we're just now reaching level 10
        if (level < 10) {
          setShowCompletionBanner(true);
          
          // Auto-hide completion banner after 8 seconds
          setTimeout(() => {
            setShowCompletionBanner(false);
          }, 8000);
          
          console.log("¡Reached level 10! Showing special completion message.");
        }
        
        // Update to level 10 (or whatever the new level is)
        setLevel(newLevel);
        setShowLevelUp(true);
        
        // Play special completion sound
        try {
          const audio = new Audio('/lovable-uploads/level-up.mp3');
          audio.volume = 0.8;
          audio.play();
        } catch (e) {
          console.error("Could not play completion sound", e);
        }
        
        // Auto-hide level up message after 5 seconds
        setTimeout(() => {
          clearLevelUpMessage();
        }, 5000);
        
        console.log(`Advanced to level ${newLevel}! Showing completion congratulations!`);
        
        // Update destinations for level 10
        updateDestinations(10);
      } else {
        setLevel(newLevel);
        setShowLevelUp(true);
        
        // Play level up sound
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
  
  // Check for birth year in license plate
  useEffect(() => {
    if (playerAge && licensePlate && gamesPlayed > 0) {
      const currentYear = new Date().getFullYear();
      const birthYear = currentYear - playerAge;
      
      // Check if the license plate contains the player's birth year
      if (licensePlate.includes(birthYear.toString()) && !showBirthdayBonusPopup) {
        // Check if we haven't shown this recently (approximately every 10 games)
        if (gamesPlayed - lastBirthYearShow >= 10) {
          console.log(`Found birth year ${birthYear} in license plate`);
          
          // Add bonus points and show popup
          setTotalPoints(prev => prev + birthYearBonus);
          setShowBirthdayBonusPopup(true);
          setLastBirthYearShow(gamesPlayed);
        }
      }
    }
  }, [licensePlate, playerAge, gamesPlayed]);

  // Check for 6666 in license plate
  useEffect(() => {
    if (licensePlate && licensePlate.includes('6666') && !has6666Triggered) {
      console.log('Found 6666 in license plate!');
      
      // Add bonus points and show popup
      setTotalPoints(prev => prev + bonusPoints);
      setShowBonusPopup(true);
      setHas6666Triggered(true); // Only trigger once per session
      
      // Reset the trigger after the popup is closed (30 seconds)
      setTimeout(() => {
        setHas6666Triggered(false);
      }, 30000);
    }
  }, [licensePlate, has6666Triggered, bonusPoints]);

  // Modified World Tour progression (removing Peru)
  // Level 1: Spain -> France
  // Level 2: France -> Italy
  // Level 3: Italy -> Russia
  // Level 4: Russia -> Japan
  // Level 5: Japan -> Australia
  // Level 6: Australia -> USA
  // Level 7: USA -> Mexico
  // Level 8: Mexico -> Argentina
  // Level 9: Argentina -> Spain (complete the world tour)
  
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
        destinationCountry = WORLD_DESTINATIONS.find(dest => dest.country === 'Argentina') || 
                        { city: 'Buenos Aires', country: 'Argentina', flag: '🇦🇷', fact: '¡Las Cataratas del Iguazú tienen 275 saltos de agua diferentes!' };
        break;
      case 9:
        originCountry = WORLD_DESTINATIONS.find(dest => dest.country === 'Argentina') || 
                        { city: 'Buenos Aires', country: 'Argentina', flag: '🇦🇷', fact: '¡Las Cataratas del Iguazú tienen 275 saltos de agua diferentes!' };
        destinationCountry = WORLD_DESTINATIONS.find(dest => dest.country === 'España') || 
                        { city: 'Madrid', country: 'España', flag: '🇪🇸', fact: '¡Has completado la vuelta al mundo y has regresado a España!' };
        break;
      case 10:
        // Special case for level 10 - you completed the world tour!
        originCountry = WORLD_DESTINATIONS.find(dest => dest.country === 'España') || 
                      { city: 'Madrid', country: 'España', flag: '🇪🇸', fact: '¡ENHORABUENA! ¡Has completado la vuelta al mundo!' };
        destinationCountry = WORLD_DESTINATIONS.find(dest => dest.country === 'España') || 
                      { city: 'Madrid', country: 'España', flag: '🇪🇸', fact: '¡Has completado la vuelta al mundo y eres una estrella de la geografía!' };
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
    
    // Special condition: if close to 10th game after last birth year shown, increase chance of birth year
    if (playerAge && gamesPlayed - lastBirthYearShow >= 9) {
      const birthYear = new Date().getFullYear() - playerAge;
      
      // 50% chance to show birth year
      if (Math.random() > 0.5) {
        newPlate = String(birthYear) + generateLicensePlate().substring(4);
        console.log(`Generated special birth year plate: ${newPlate} (Game ${gamesPlayed + 1})`);
      } else {
        newPlate = generateLicensePlate();
        console.log(`Generated regular plate: ${newPlate} (Game ${gamesPlayed + 1})`);
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
  
  // Submit word function - Updated to handle language-specific validation
  const submitWord = async () => {
    if (!currentWord || currentWord.length < 4) {
      // Error message based on language
      const errorMsg = language === 'en' 
        ? 'Word is too short (minimum 4 letters)'
        : 'La palabra es demasiado corta (mínimo 4 letras)';
      setErrorMessage(errorMsg);
      return;
    }
    
    console.log(`Submitting word: ${currentWord} in language: ${language}`);
    
    // Check if word is valid
    try {
      const { wordExists, isValidWord, calculateScore } = await import('@/utils/gameUtils');
      
      // First check if the word contains at least one consonant from the license plate
      if (!isValidWord(currentWord, plateConsonants)) {
        // Error message based on language
        const errorMsg = language === 'en' 
          ? 'Word must include at least one consonant from the license plate'
          : 'La palabra debe incluir al menos una consonante de la matrícula';
        setErrorMessage(errorMsg);
        console.log(`Word rejected: ${currentWord} (doesn't contain any consonant from ${plateConsonants})`);
        
        // IMPORTANT: Deduct points for invalid words
        setTotalPoints(prev => Math.max(0, prev - 20));
        return;
      }
      
      // Then check if the word exists in our dictionary for the current language
      const isValid = await wordExists(currentWord, language as 'es' | 'en');
      if (!isValid) {
        // Error message based on language
        const errorMsg = language === 'en' 
          ? 'Invalid word: this word does not exist'
          : 'Palabra no válida: no existe esta palabra';
        setErrorMessage(errorMsg);
        console.log(`Word rejected: ${currentWord} (not in ${language} dictionary)`);
        
        // IMPORTANT: Deduct points for invalid words
        setTotalPoints(prev => Math.max(0, prev - 20));
        return;
      }
      
      // Calculate score based on word and current license plate, considering current language
      const calculatedScore = await calculateScore(currentWord, plateConsonants, language as 'es' | 'en');
      console.log(`Score calculated for ${currentWord}: ${calculatedScore}`);
      
      if (calculatedScore < 0) {
        // Word is invalid
        const errorMsg = language === 'en' 
          ? 'Invalid word or does not contain required consonants'
          : 'Palabra no válida o no contiene las consonantes requeridas';
        setErrorMessage(errorMsg);
        console.log(`Word rejected: ${currentWord} (negative score ${calculatedScore})`);
        
        // IMPORTANT: Deduct points for invalid words (the negative score amount)
        setTotalPoints(prev => Math.max(0, prev + calculatedScore)); // Add negative score
        return;
      }
      
      // Word is valid, update score
      setPreviousScore(score);
      setScore(calculatedScore);
      setTotalPoints(prev => prev + calculatedScore);
      console.log(`Word accepted: ${currentWord} (+${calculatedScore} points, total: ${totalPoints + calculatedScore})`);
      
      // Success message based on language
      if (calculatedScore > 75) {
        const successMsg = language === 'en' 
          ? `${currentWord} is correct! +${calculatedScore} points`
          : `¡${currentWord} es correcta! +${calculatedScore} puntos`;
        setSubmitSuccess(successMsg);
      } else {
        const successMsg = language === 'en' 
          ? `Correct word! +${calculatedScore} points`
          : `¡Palabra correcta! +${calculatedScore} puntos`;
        setSubmitSuccess(successMsg);
      }
      
      // Track high score
      if (calculatedScore > highScore) {
        setHighScore(calculatedScore);
        console.log(`New high score: ${calculatedScore}`);
      }
      
      // Reset current word
      setCurrentWord('');
    } catch (error) {
      console.error('Error submitting word:', error);
      setErrorMessage('Error processing word');
    }
  };

  // Generate a plate on initial load if there isn't one already
  useEffect(() => {
    if (!licensePlate) {
      generateNewPlateImpl();
    }
  }, [licensePlate]);
  
  // Initial setup - ensure Spain is always unlocked
  useEffect(() => {
    console.log(`Initial setup for level ${level}`);
    updateDestinations(level);
  }, []);
  
  // Create the context value
  const value: GameContextType = {
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
    setLevel,
    setTotalPoints,
    
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
    
    // Birthday bonus properties
    showBirthdayBonusPopup,
    setShowBirthdayBonusPopup,
    birthYearBonus,
    
    // Add updateDestinations function to the context value
    updateDestinations,
    
    // Add selectedMotorcycle property
    selectedMotorcycle,
    setSelectedMotorcycle,
  };

  return (
    <GameContext.Provider value={value}>
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
