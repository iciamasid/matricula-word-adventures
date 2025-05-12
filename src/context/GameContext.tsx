
import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";

// Define the CarColor type
export interface CarColor {
  id: string;
  name: string;
  image: string;
  color: string;
}

interface GameContextType {
  licensePlate: string;
  plateConsonants: string;
  currentWord: string;
  score: number;
  previousScore: number;
  totalPoints: number;
  level: number;
  destination: string;
  destinationInfo: {
    city: string;
    country: string;
    flag: string;
    fact: string;
  };
  originInfo: {
    city: string;
    country: string;
    flag: string;
    fact: string;
  };
  highScore: number;
  gamesPlayed: number;
  errorMessage: string | null;
  showBonusPopup: boolean;
  bonusPoints: number;
  playerName: string;
  playerAge: number;
  playerGender: "niño" | "niña" | "";
  showCompletionBanner: boolean;
  isGeneratingLicensePlate: boolean;
  selectedCarColor: CarColor | null;
  
  // Success state properties
  successMessage: string | null;
  successPoints: number;
  successExplanation: string | null;
  
  // Actions
  generateNewPlate: () => void;
  setCurrentWord: (word: string) => void;
  submitWord: () => void;
  shuffleConsonants: () => string;
  clearError: () => void;
  clearSuccess: () => void;
  closeBonusPopup: () => void;
  closeCompletionBanner: () => void;
  resetGame: () => void;
  setPlayerName: (name: string) => void;
  setPlayerAge: (age: number) => void;
  setPlayerGender: (gender: "niño" | "niña") => void;
  setIsGeneratingLicensePlate: (isGenerating: boolean) => void;
  setSelectedCarColor: (carColor: CarColor | null) => void;
}

// Create the context with a default value
const GameContext = createContext<GameContextType | undefined>(undefined);

// Create the useGame hook
export const useGame = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
};

interface GameProviderProps {
  children: ReactNode;
}

export const GameProvider = ({ children }: GameProviderProps) => {
  // State for game
  const [licensePlate, setLicensePlate] = useState<string>("1234ABC");
  const [plateConsonants, setPlateConsonants] = useState<string>("ABC");
  const [currentWord, setCurrentWord] = useState<string>("");
  const [score, setScore] = useState<number>(0);
  const [previousScore, setPreviousScore] = useState<number>(0);
  const [totalPoints, setTotalPoints] = useState<number>(0);
  const [level, setLevel] = useState<number>(1);
  const [destination, setDestination] = useState<string>("");
  const [destinationInfo, setDestinationInfo] = useState({
    city: "Madrid",
    country: "España",
    flag: "🇪🇸",
    fact: "Madrid es la capital de España y una de las ciudades más vibrantes de Europa."
  });
  const [originInfo, setOriginInfo] = useState({
    city: "Madrid",
    country: "España",
    flag: "🇪🇸",
    fact: "Madrid es la capital de España y una de las ciudades más vibrantes de Europa."
  });
  const [highScore, setHighScore] = useState<number>(0);
  const [gamesPlayed, setGamesPlayed] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showBonusPopup, setShowBonusPopup] = useState<boolean>(false);
  const [bonusPoints, setBonusPoints] = useState<number>(0);
  const [playerName, setPlayerName] = useState<string>("");
  const [playerAge, setPlayerAge] = useState<number>(0);
  const [playerGender, setPlayerGender] = useState<"niño" | "niña" | "">("");
  const [showCompletionBanner, setShowCompletionBanner] = useState<boolean>(false);
  const [isGeneratingLicensePlate, setIsGeneratingLicensePlate] = useState<boolean>(false);
  const [selectedCarColor, setSelectedCarColor] = useState<CarColor | null>(null);
  
  // Success state
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [successPoints, setSuccessPoints] = useState<number>(0);
  const [successExplanation, setSuccessExplanation] = useState<string | null>(null);
  
  // Generate a new license plate
  const generateNewPlate = useCallback(() => {
    // Implementation would go here
    console.log("Generating new plate...");
    // For now, just set a placeholder
    setLicensePlate("5678XYZ");
    setPlateConsonants("XYZ");
    setIsGeneratingLicensePlate(false);
  }, []);
  
  // Submit a word
  const submitWord = useCallback(() => {
    // Implementation would go here
    console.log(`Submitting word: ${currentWord}`);
  }, [currentWord]);
  
  // Shuffle the consonants
  const shuffleConsonants = useCallback(() => {
    if (typeof plateConsonants === 'string') {
      const consonantArray = plateConsonants.split('');
      // Fisher-Yates shuffle algorithm
      for (let i = consonantArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [consonantArray[i], consonantArray[j]] = [consonantArray[j], consonantArray[i]];
      }
      const shuffled = consonantArray.join('');
      setPlateConsonants(shuffled);
      return shuffled;
    }
    return plateConsonants;
  }, [plateConsonants]);
  
  // Clear error message
  const clearError = useCallback(() => {
    setErrorMessage(null);
  }, []);
  
  // Clear success message
  const clearSuccess = useCallback(() => {
    setSuccessMessage(null);
    setSuccessPoints(0);
    setSuccessExplanation(null);
  }, []);
  
  // Close bonus popup
  const closeBonusPopup = useCallback(() => {
    setShowBonusPopup(false);
  }, []);
  
  // Close completion banner
  const closeCompletionBanner = useCallback(() => {
    setShowCompletionBanner(false);
  }, []);
  
  // Reset game
  const resetGame = useCallback(() => {
    setScore(0);
    setPreviousScore(0);
    setTotalPoints(0);
    setLevel(1);
    setDestination("");
    setLicensePlate("1234ABC");
    setPlateConsonants("ABC");
    setCurrentWord("");
    setGamesPlayed(0);
    setErrorMessage(null);
    setSuccessMessage(null);
    setSuccessPoints(0);
    setSuccessExplanation(null);
    setShowBonusPopup(false);
    setBonusPoints(0);
    setShowCompletionBanner(false);
  }, []);
  
  // Context value
  const value = {
    licensePlate,
    plateConsonants,
    currentWord,
    score,
    previousScore,
    totalPoints,
    level,
    destination,
    destinationInfo,
    originInfo,
    highScore,
    gamesPlayed,
    errorMessage,
    showBonusPopup,
    bonusPoints,
    playerName,
    playerAge,
    playerGender,
    showCompletionBanner,
    isGeneratingLicensePlate,
    selectedCarColor,
    successMessage,
    successPoints,
    successExplanation,
    
    // Actions
    generateNewPlate,
    setCurrentWord,
    submitWord,
    shuffleConsonants,
    clearError,
    clearSuccess,
    closeBonusPopup,
    closeCompletionBanner,
    resetGame,
    setPlayerName,
    setPlayerAge,
    setPlayerGender,
    setIsGeneratingLicensePlate,
    setSelectedCarColor,
  };
  
  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};
