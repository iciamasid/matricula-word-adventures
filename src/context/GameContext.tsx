import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import { toast } from "@/hooks/use-toast";
import { useLanguage } from "./LanguageContext";

// Types
type GameContextType = {
  playerName: string;
  setPlayerName: (name: string) => void;
  licensePlate: string;
  plateConsonants: string;
  isGeneratingLicensePlate: boolean;
  generateNewPlate: () => void;
  wordInput: string;
  setWordInput: (word: string) => void;
  submitWord: () => void;
  score: number;
  previousScore: number;
  level: number;
  totalPoints: number;
  showErrorPopup: boolean;
  errorMessage: string;
  closeErrorPopup: () => void;
  showSuccessPopup: boolean;
  successMessage: string;
  closeSuccessPopup: () => void;
  showLevelUpPopup: boolean;
  closeLevelUpPopup: () => void;
  submitSuccess: boolean;
  resetGame: () => void;
  selectedCarColor: CarColor | null;
  setSelectedCarColor: (color: CarColor) => void;
  originInfo: CountryInfo;
  destinationInfo: CountryInfo;
};

type CarColor = {
  name: string;
  color: string;
  image: string;
};

type CountryInfo = {
  country: string;
  city: string;
  flag: string;
};

// Constants
const CAR_COLORS: CarColor[] = [
  { name: "Rojo", color: "bg-red-500", image: "coche_rojo.png" },
  { name: "Azul", color: "bg-blue-500", image: "coche_azul.png" },
  { name: "Verde", color: "bg-green-500", image: "coche_verde.png" },
  { name: "Amarillo", color: "bg-yellow-500", image: "coche_amarillo.png" },
  { name: "Morado", color: "bg-purple-500", image: "coche_morado.png" },
];

// Country data for the game's "world tour" feature
const COUNTRIES_ES: CountryInfo[] = [
  { country: "España", city: "Madrid", flag: "🇪🇸" },
  { country: "Francia", city: "París", flag: "🇫🇷" },
  { country: "Italia", city: "Roma", flag: "🇮🇹" },
  { country: "Rusia", city: "Moscú", flag: "🇷🇺" },
  { country: "Japón", city: "Tokio", flag: "🇯🇵" },
  { country: "Australia", city: "Sídney", flag: "🇦🇺" },
  { country: "Estados Unidos", city: "Nueva York", flag: "🇺🇸" },
  { country: "Méjico", city: "Ciudad de México", flag: "🇲🇽" },
  { country: "Perú", city: "Lima", flag: "🇵🇪" },
  { country: "Argentina", city: "Buenos Aires", flag: "🇦🇷" },
  { country: "España", city: "Madrid", flag: "🇪🇸" }, // Return to Spain to complete the tour
];

const COUNTRIES_EN: CountryInfo[] = [
  { country: "Spain", city: "Madrid", flag: "🇪🇸" },
  { country: "France", city: "Paris", flag: "🇫🇷" },
  { country: "Italy", city: "Rome", flag: "🇮🇹" },
  { country: "Russia", city: "Moscow", flag: "🇷🇺" },
  { country: "Japan", city: "Tokyo", flag: "🇯🇵" },
  { country: "Australia", city: "Sydney", flag: "🇦🇺" },
  { country: "United States", city: "New York", flag: "🇺🇸" },
  { country: "Mexico", city: "Mexico City", flag: "🇲🇽" },
  { country: "Peru", city: "Lima", flag: "🇵🇪" },
  { country: "Argentina", city: "Buenos Aires", flag: "🇦🇷" },
  { country: "Spain", city: "Madrid", flag: "🇪🇸" }, // Return to Spain to complete the tour
];

// Create the context
const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Player state
  const [playerName, setPlayerName] = useState<string>("");
  const [selectedCarColor, setSelectedCarColor] = useState<CarColor | null>(null);
  
  // Game state
  const [licensePlate, setLicensePlate] = useState<string>("");
  const [plateConsonants, setPlateConsonants] = useState<string>("");
  const [isGeneratingLicensePlate, setIsGeneratingLicensePlate] = useState<boolean>(false);
  const [wordInput, setWordInput] = useState<string>("");
  const [score, setScore] = useState<number>(0);
  const [previousScore, setPreviousScore] = useState<number>(0);
  const [level, setLevel] = useState<number>(0);
  const [totalPoints, setTotalPoints] = useState<number>(0);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);
  const [needsNewPlate, setNeedsNewPlate] = useState<boolean>(false);
  
  // Popup states
  const [showErrorPopup, setShowErrorPopup] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [showSuccessPopup, setShowSuccessPopup] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [showLevelUpPopup, setShowLevelUpPopup] = useState<boolean>(false);
  
  // Country tour state
  const [originCountryIndex, setOriginCountryIndex] = useState<number>(0);
  const [destinationCountryIndex, setDestinationCountryIndex] = useState<number>(1);
  
  // Language context
  const { language, t } = useLanguage();
  
  // Refs
  const isNavigating = useRef<boolean>(false);
  
  // Get the appropriate country list based on language
  const COUNTRIES = language === 'es' ? COUNTRIES_ES : COUNTRIES_EN;
  
  // Origin and destination info
  const originInfo = COUNTRIES[originCountryIndex];
  const destinationInfo = COUNTRIES[destinationCountryIndex];

  // Function to initialize the game
  useEffect(() => {
    // Check if we're navigating back from another page
    const navigatingBack = sessionStorage.getItem('navigatingBack') === 'true';
    if (navigatingBack) {
      isNavigating.current = true;
      sessionStorage.removeItem('navigatingBack');
    }
    
    // Load saved game state
    const savedName = localStorage.getItem("matriculabraCadabra_playerName");
    const savedCarColor = localStorage.getItem("matriculabraCadabra_carColor");
    const savedScore = localStorage.getItem("matriculabraCadabra_score");
    const savedLevel = localStorage.getItem("matriculabraCadabra_level");
    const savedTotalPoints = localStorage.getItem("matriculabraCadabra_totalPoints");
    const savedOriginIndex = localStorage.getItem("matriculabraCadabra_originIndex");
    const savedDestinationIndex = localStorage.getItem("matriculabraCadabra_destinationIndex");
    const lastPlate = localStorage.getItem("matriculabraCadabra_plate");
    
    // Set saved values if they exist
    if (savedName) setPlayerName(savedName);
    if (savedCarColor) {
      const parsedColor = JSON.parse(savedCarColor);
      setSelectedCarColor(parsedColor);
    }
    if (savedScore) setScore(parseInt(savedScore));
    if (savedLevel) setLevel(parseInt(savedLevel));
    if (savedTotalPoints) setTotalPoints(parseInt(savedTotalPoints));
    if (savedOriginIndex) setOriginCountryIndex(parseInt(savedOriginIndex));
    if (savedDestinationIndex) setDestinationCountryIndex(parseInt(savedDestinationIndex));
    
    if (!lastPlate || !isNavigating.current) {
      // Generate a new license plate on first access or if explicitly requested
      setIsGeneratingLicensePlate(true); // Set flag to true before generating
      doGenerateNewPlate();
      
      // Reset the flag after a delay to allow animation to complete
      setTimeout(() => {
        setIsGeneratingLicensePlate(false);
      }, 5000); // Increased from 2500 to 5000 for longer animation
    } else {
      // Just load the last known plate without generating a new one
      const savedPlate = localStorage.getItem("matriculabraCadabra_plate");
      const savedConsonants = localStorage.getItem("matriculabraCadabra_plateConsonants");
      if (savedPlate) setLicensePlate(savedPlate);
      if (savedConsonants) setPlateConsonants(savedConsonants);
    }
    
    // Reset navigation flag
    isNavigating.current = false;
  }, []);
  
  // Save game state whenever it changes
  useEffect(() => {
    if (playerName) localStorage.setItem("matriculabraCadabra_playerName", playerName);
    if (selectedCarColor) localStorage.setItem("matriculabraCadabra_carColor", JSON.stringify(selectedCarColor));
    if (score > 0) localStorage.setItem("matriculabraCadabra_score", score.toString());
    if (level > 0) localStorage.setItem("matriculabraCadabra_level", level.toString());
    if (totalPoints > 0) localStorage.setItem("matriculabraCadabra_totalPoints", totalPoints.toString());
    localStorage.setItem("matriculabraCadabra_originIndex", originCountryIndex.toString());
    localStorage.setItem("matriculabraCadabra_destinationIndex", destinationCountryIndex.toString());
    if (licensePlate) localStorage.setItem("matriculabraCadabra_plate", licensePlate);
    if (plateConsonants) localStorage.setItem("matriculabraCadabra_plateConsonants", plateConsonants);
  }, [playerName, selectedCarColor, score, level, totalPoints, originCountryIndex, destinationCountryIndex, licensePlate, plateConsonants]);
  
  // Handle level up and country progression
  useEffect(() => {
    if (needsNewPlate && !showLevelUpPopup) {
      doGenerateNewPlate();
      setNeedsNewPlate(false);
      
      // Reset the animation flag after a delay
      setTimeout(() => {
        setIsGeneratingLicensePlate(false);
      }, 5000);
    }
  }, [needsNewPlate, showLevelUpPopup]);
  
  // Generate a random 4-digit number
  const generateRandomNumber = () => {
    return Math.floor(1000 + Math.random() * 9000).toString();
  };
  
  // Generate 3 random consonants
  const generateRandomConsonants = () => {
    const consonants = "BCDFGHJKLMNPQRSTVWXYZ";
    let result = "";
    for (let i = 0; i < 3; i++) {
      result += consonants.charAt(Math.floor(Math.random() * consonants.length));
    }
    return result;
  };
  
  // Generate a new license plate - internal implementation
  const doGenerateNewPlate = () => {
    const newNumber = generateRandomNumber();
    const newConsonants = generateRandomConsonants();
    setLicensePlate(newNumber + newConsonants);
    setPlateConsonants(newConsonants);
    setWordInput("");
    setSubmitSuccess(false);
  };
  
  // Generate a new license plate - now ensures the animation flag is set correctly
  const generateNewPlate = () => {
    // Start the animation
    setIsGeneratingLicensePlate(true);
    
    // Check if we're in the level up state
    if (showLevelUpPopup) {
      setNeedsNewPlate(true);
      return;
    }
    
    // Otherwise generate immediately with a small delay to ensure animation renders
    setTimeout(() => {
      doGenerateNewPlate();
      
      // Reset the flag after animation completes
      setTimeout(() => {
        setIsGeneratingLicensePlate(false);
      }, 5000); // Increased from 2500 to 5000 for longer animation
    }, 100);
  };
  
  // Submit a word
  const submitWord = () => {
    // Basic validation
    if (!wordInput.trim()) {
      showError(t("enter_word"));
      return;
    }
    
    // Check if the word contains all the consonants from the license plate
    const consonantsArray = plateConsonants.split('');
    const wordUppercase = wordInput.toUpperCase();
    
    // Check if all consonants are in the word
    const allConsonantsIncluded = consonantsArray.every(consonant => 
      wordUppercase.includes(consonant)
    );
    
    if (!allConsonantsIncluded) {
      showError(t("word_must_contain_all_consonants"));
      return;
    }
    
    // Calculate score based on word length
    const wordScore = calculateScore(wordInput);
    
    // Update score and check for level up
    setPreviousScore(score);
    const newScore = score + wordScore;
    setScore(newScore);
    setTotalPoints(totalPoints + wordScore);
    
    // Check if player leveled up
    const currentLevel = Math.floor(score / 100);
    const newLevel = Math.floor(newScore / 100);
    
    if (newLevel > currentLevel && newLevel <= 10) {
      // Level up!
      setLevel(newLevel);
      setShowLevelUpPopup(true);
      
      // Update origin and destination for the "world tour"
      setOriginCountryIndex(newLevel - 1);
      setDestinationCountryIndex(newLevel);
    }
    
    // Show success message
    showSuccess(t("correct_word_points", { points: wordScore }));
    setSubmitSuccess(true);
  };
  
  // Calculate score based on word length and complexity
  const calculateScore = (word: string) => {
    const length = word.length;
    let score = length * 2; // Base score
    
    // Bonus for longer words
    if (length >= 8) score += 5;
    if (length >= 12) score += 10;
    
    return score;
  };
  
  // Show error popup
  const showError = (message: string) => {
    setErrorMessage(message);
    setShowErrorPopup(true);
    
    // Auto-hide after 3 seconds
    setTimeout(() => {
      setShowErrorPopup(false);
    }, 3000);
  };
  
  // Close error popup
  const closeErrorPopup = () => {
    setShowErrorPopup(false);
  };
  
  // Show success popup
  const showSuccess = (message: string) => {
    setSuccessMessage(message);
    setShowSuccessPopup(true);
    
    // Auto-hide after 3 seconds
    setTimeout(() => {
      setShowSuccessPopup(false);
    }, 3000);
  };
  
  // Close success popup
  const closeSuccessPopup = () => {
    setShowSuccessPopup(false);
  };
  
  // Close level up popup
  const closeLevelUpPopup = () => {
    setShowLevelUpPopup(false);
    
    // Generate new plate if needed
    if (needsNewPlate) {
      doGenerateNewPlate();
      setNeedsNewPlate(false);
      
      // Reset the animation flag after a delay
      setTimeout(() => {
        setIsGeneratingLicensePlate(false);
      }, 5000);
    }
  };
  
  // Reset the game
  const resetGame = () => {
    setScore(0);
    setPreviousScore(0);
    setLevel(0);
    setTotalPoints(0);
    setOriginCountryIndex(0);
    setDestinationCountryIndex(1);
    generateNewPlate();
    
    // Clear localStorage
    localStorage.removeItem("matriculabraCadabra_score");
    localStorage.removeItem("matriculabraCadabra_level");
    localStorage.removeItem("matriculabraCadabra_totalPoints");
    localStorage.removeItem("matriculabraCadabra_originIndex");
    localStorage.removeItem("matriculabraCadabra_destinationIndex");
    
    // Show toast notification
    toast({
      title: t("game_reset"),
      description: t("progress_reset"),
    });
  };

  return (
    <GameContext.Provider
      value={{
        playerName,
        setPlayerName,
        licensePlate,
        plateConsonants,
        isGeneratingLicensePlate,
        generateNewPlate,
        wordInput,
        setWordInput,
        submitWord,
        score,
        previousScore,
        level,
        totalPoints,
        showErrorPopup,
        errorMessage,
        closeErrorPopup,
        showSuccessPopup,
        successMessage,
        closeSuccessPopup,
        showLevelUpPopup,
        closeLevelUpPopup,
        submitSuccess,
        resetGame,
        selectedCarColor,
        setSelectedCarColor,
        originInfo,
        destinationInfo,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

// Custom hook to use the game context
export const useGame = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
};
