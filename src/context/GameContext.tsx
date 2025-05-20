import React, { createContext, useState, useContext, useEffect } from "react";
import { fetchDestinationInfo, fetchOriginInfo } from "@/lib/api";
import { getPlateConsonants } from "@/lib/licensePlateGenerator";
import { toast } from "@/hooks/use-toast";

type GameContextType = {
  playerName: string;
  setPlayerName: (name: string) => void;
  playerGender: string;
  setPlayerGender: (gender: string) => void;
  playerAge: number | null;
  setPlayerAge: (age: number | null) => void;
  totalPoints: number;
  addPoints: (points: number) => void;
  destinationInfo: any;
  originInfo: any;
  level: number;
  setLevel: (level: number) => void;
  currentWord: string;
  setCurrentWord: (word: string) => void;
  error: string;
  setError: (error: string) => void;
  success: string;
  setSuccess: (success: string) => void;
  showError: boolean;
  setShowError: (show: boolean) => void;
  showSuccess: boolean;
  setShowSuccess: (show: boolean) => void;
  showLevelUp: boolean;
  setShowLevelUp: (show: boolean) => void;
  clearLevelUpMessage: () => void;
  resetGame: () => void;
  plateConsonants: string;
  setPlateConsonants: (consonants: string) => void;
  selectedCarColor: any;
  setSelectedCarColor: (color: any) => void;
  destinations: string[];
  setDestinations: (destinations: string[]) => void;
  updateDestinations: (level: number) => void;
  showBonusPopup: boolean;
  setShowBonusPopup: (show: boolean) => void;
  bonusPoints: number | null;
  setBonusPoints: (points: number | null) => void;
  licensePlate: string;
  setLicensePlate: (plate: string) => void;
  showBirthdayBonusPopup: boolean;
  setShowBirthdayBonusPopup: (show: boolean) => void;
  birthYearBonus: number | null;
  setBirthYearBonus: (points: number | null) => void;
  showAgeBonusPopup: boolean;
  setShowAgeBonusPopup: (show: boolean) => void;
  gameCount: number;
  
  // Properties needed by other components
  showCompletionBanner?: boolean;
  errorMessage?: string;
  clearError?: () => void;
  isGeneratingLicensePlate?: boolean;
  setIsGeneratingLicensePlate?: (isGenerating: boolean) => void;
  submitSuccess?: string;
  clearSubmitSuccess?: () => void;
  generateNewPlate?: () => void;
  gamesPlayed?: number;
  score?: number;
  highScore?: number;
  submitWord?: (word: string) => void;
};

const defaultContext: GameContextType = {
  playerName: "",
  setPlayerName: () => {},
  playerGender: "",
  setPlayerGender: () => {},
  playerAge: null,
  setPlayerAge: () => {},
  totalPoints: 0,
  addPoints: () => {},
  destinationInfo: null,
  originInfo: null,
  level: 1,
  setLevel: () => {},
  currentWord: "",
  setCurrentWord: () => {},
  error: "",
  setError: () => {},
  success: "",
  setSuccess: () => {},
  showError: false,
  setShowError: () => {},
  showSuccess: false,
  setShowSuccess: () => {},
  showLevelUp: false,
  setShowLevelUp: () => {},
  clearLevelUpMessage: () => {},
  resetGame: () => {},
  plateConsonants: "",
  setPlateConsonants: () => {},
  selectedCarColor: null,
  setSelectedCarColor: () => {},
  destinations: [],
  setDestinations: () => {},
  updateDestinations: () => {},
  showBonusPopup: false,
  setShowBonusPopup: () => {},
  bonusPoints: null,
  setBonusPoints: () => {},
  licensePlate: "",
  setLicensePlate: () => {},
  showBirthdayBonusPopup: false,
  setShowBirthdayBonusPopup: () => {},
  birthYearBonus: null,
  setBirthYearBonus: () => {},
  showAgeBonusPopup: false,
  setShowAgeBonusPopup: () => {},
  gameCount: 0,
  
  // Default values for additional properties
  showCompletionBanner: false,
  errorMessage: "",
  clearError: () => {},
  isGeneratingLicensePlate: false,
  setIsGeneratingLicensePlate: () => {},
  submitSuccess: "",
  clearSubmitSuccess: () => {},
  generateNewPlate: () => {},
  gamesPlayed: 0,
  score: 0,
  highScore: 0,
  submitWord: () => {},
};

const GameContext = createContext<GameContextType>(defaultContext);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [playerName, setPlayerName] = useState<string>("");
  const [playerGender, setPlayerGender] = useState<string>("");
  const [playerAge, setPlayerAge] = useState<number | null>(null);
  const [totalPoints, setTotalPoints] = useState<number>(0);
  const [destinationInfo, setDestinationInfo] = useState<any>(null);
  const [originInfo, setOriginInfo] = useState<any>(null);
  const [level, setLevel] = useState<number>(1);
  const [currentWord, setCurrentWord] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [showError, setShowError] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [showLevelUp, setShowLevelUp] = useState<boolean>(false);
  const [plateConsonants, setPlateConsonants] = useState<string>("");
  const [selectedCarColor, setSelectedCarColor] = useState<any>(null);
  const [destinations, setDestinations] = useState<string[]>([]);
  const [showBonusPopup, setShowBonusPopup] = useState<boolean>(false);
  const [bonusPoints, setBonusPoints] = useState<number | null>(null);
  const [licensePlate, setLicensePlate] = useState<string>("");
  const [showBirthdayBonusPopup, setShowBirthdayBonusPopup] = useState<boolean>(false);
  const [birthYearBonus, setBirthYearBonus] = useState<number | null>(null);
  const [showAgeBonusPopup, setShowAgeBonusPopup] = useState<boolean>(false);

  // Added state counters for bonus frequency
  const [gameCount, setGameCount] = useState<number>(0);
  const [birthdayBonusFrequency, setBirthdayBonusFrequency] = useState<number>(20);  // Show every ~20 games
  const [plateBonusFrequency, setPlateBonusFrequency] = useState<number>(20);        // Show every ~20 games

  // Additional states to handle missing properties
  const [isGeneratingLicensePlate, setIsGeneratingLicensePlate] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState("");
  const [gamesPlayed, setGamesPlayed] = useState(0);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [showCompletionBanner, setShowCompletionBanner] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Load player data from localStorage on component mount
  useEffect(() => {
    const storedPlayerName = localStorage.getItem("playerName");
    const storedPlayerGender = localStorage.getItem("playerGender");
    const storedPlayerAge = localStorage.getItem("playerAge");
     const storedTotalPoints = localStorage.getItem("totalPoints");
    const storedLevel = localStorage.getItem("level");
    const storedSelectedCarColor = localStorage.getItem("selectedCarColor");
    const storedDestinations = localStorage.getItem("destinations");
    
    if (storedPlayerName) setPlayerName(storedPlayerName);
    if (storedPlayerGender) setPlayerGender(storedPlayerGender);
    if (storedPlayerAge) setPlayerAge(parseInt(storedPlayerAge, 10));
    if (storedTotalPoints) setTotalPoints(parseInt(storedTotalPoints, 10));
    if (storedLevel) setLevel(parseInt(storedLevel, 10));
    if (storedSelectedCarColor) setSelectedCarColor(JSON.parse(storedSelectedCarColor));
    if (storedDestinations) setDestinations(JSON.parse(storedDestinations));
  }, []);

  // Save player data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("playerName", playerName);
    localStorage.setItem("playerGender", playerGender);
    if (playerAge !== null) {
        localStorage.setItem("playerAge", playerAge.toString());
    }
     localStorage.setItem("totalPoints", totalPoints.toString());
    localStorage.setItem("level", level.toString());
    localStorage.setItem("totalPoints", totalPoints.toString());
    localStorage.setItem("level", level.toString());
    localStorage.setItem("selectedCarColor", JSON.stringify(selectedCarColor));
    localStorage.setItem("destinations", JSON.stringify(destinations));
  }, [playerName, playerGender, playerAge, totalPoints, level, selectedCarColor, destinations]);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const origin = await fetchOriginInfo();
        setOriginInfo(origin);
        
        // Generate initial license plate
        const initialConsonants = getPlateConsonants();
        setPlateConsonants(initialConsonants);
        setLicensePlate(initialConsonants);
      } catch (error) {
        console.error("Error fetching origin info:", error);
      }
    };

    fetchInitialData();
  }, []);

  useEffect(() => {
    const fetchDestination = async () => {
      try {
        const destination = await fetchDestinationInfo(destinations[level - 1]);
        setDestinationInfo(destination);
      } catch (error) {
        console.error("Error fetching destination info:", error);
      }
    };

    if (level > 0 && destinations.length > 0 && destinations[level - 1]) {
      fetchDestination();
    }
  }, [level, destinations]);

  const addPoints = (points: number) => {
    setTotalPoints((prevPoints) => prevPoints + points);
  };

  const clearLevelUpMessage = () => {
    setShowLevelUp(false);
  };

  const resetGame = () => {
    setLevel(1);
    setTotalPoints(0);
    setDestinations([]);
    updateDestinations(1);
    localStorage.setItem("level", "1");
    localStorage.setItem("totalPoints", "0");
    toast({
      title: "¡Juego reiniciado!",
      description: "Has vuelto al nivel 0 y todos tus puntos se han reiniciado."
    });
  };

  const updateDestinations = async (level: number) => {
    const newDestinations: string[] = [];
    if (originInfo?.country) {
      newDestinations.push(originInfo.country);
    } else {
      newDestinations.push("España"); // Default origin
    }
    
    if (level >= 2) newDestinations.push("Francia");
    if (level >= 3) newDestinations.push("Italia");
    if (level >= 4) newDestinations.push("Rusia");
    if (level >= 5) newDestinations.push("Japón");
    if (level >= 6) newDestinations.push("Australia");
    if (level >= 7) newDestinations.push("Estados Unidos");
    if (level >= 8) newDestinations.push("Méjico");
    if (level >= 9) newDestinations.push("Argentina");
    if (level >= 10) newDestinations.push("España (vuelta completa)");
    
    setDestinations(newDestinations);
  };

  // Modified success handler to manage bonus frequency
  const handleSuccess = (word: string) => {
    setSuccess(`¡Correcto! Has encontrado la palabra ${word}.`);
    setShowSuccess(true);
    setError("");
    setShowError(false);
    addPoints(10);

    // Level up check
    if (totalPoints >= level * 100) {
      setLevel(level + 1);
      setShowLevelUp(true);
      updateDestinations(level + 1);
    }

    // Increment game count for tracking bonus frequency
    setGameCount(prevCount => prevCount + 1);
    
    // Handle license plate bonuses less frequently
    // Check for special plate numbers (only show bonuses occasionally)
    const checkForSpecialPlate = () => {
      // Plate 6666 - Special silver bonus (1 in ~20 chance)
      if (
        licensePlate === "6666" && 
        Math.floor(gameCount % plateBonusFrequency) === 0
      ) {
        // Show the bonus popup for 6666 license plate
        setBonusPoints(500); // 500 points for 6666
        setShowBonusPopup(true);
        addPoints(500);
      }
      
      // Birthday bonus - check if license plate matches birth year (1 in ~20 chance)
      if (
        playerAge && 
        playerAge > 0 && 
        parseInt(licensePlate) === (new Date().getFullYear() - playerAge) &&
        Math.floor(gameCount % birthdayBonusFrequency) === 0
      ) {
        // Show the birthday bonus popup
        setBirthYearBonus(50); // 50 points for birthday
        setShowBirthdayBonusPopup(true);
        addPoints(50);
      }
    };
    
    // Check for bonuses
    checkForSpecialPlate();

    // Generate new license plate
    const newConsonants = getPlateConsonants();
    setPlateConsonants(newConsonants);
    setLicensePlate(newConsonants);
  };

  const clearError = () => {
    setError("");
    setShowError(false);
    setErrorMessage("");
  };

  const clearSubmitSuccess = () => {
    setSubmitSuccess("");
    setShowSuccess(false);
  };

  const generateNewPlate = () => {
    // Generate new license plate
    const newConsonants = getPlateConsonants();
    setPlateConsonants(newConsonants);
    setLicensePlate(newConsonants);
    setGamesPlayed(prevGames => prevGames + 1);
    setIsGeneratingLicensePlate(false);
  };

  const submitWord = (word: string) => {
    setCurrentWord(word);
    // Implement word submission logic
    setSubmitSuccess(`¡Correcto! Has encontrado la palabra ${word}.`);
    setShowSuccess(true);
    addPoints(10);
    
    // Check for level up
    if (totalPoints >= level * 100) {
      setLevel(prevLevel => prevLevel + 1);
      setShowLevelUp(true);
      updateDestinations(level + 1);
      
      // Check for game completion
      if (level >= 9) {
        setShowCompletionBanner(true);
      }
    }
  };

  return (
    <GameContext.Provider
      value={{
        playerName,
        setPlayerName,
        playerGender,
        setPlayerGender,
        playerAge,
        setPlayerAge,
        totalPoints,
        addPoints,
        destinationInfo,
        originInfo,
        level,
        setLevel,
        currentWord,
        setCurrentWord,
        error,
        setError,
        success,
        setSuccess,
        showError,
        setShowError,
        showSuccess,
        setShowSuccess,
        showLevelUp,
        setShowLevelUp,
        clearLevelUpMessage,
        resetGame,
        plateConsonants,
        setPlateConsonants,
        selectedCarColor,
        setSelectedCarColor,
        destinations,
        setDestinations,
        updateDestinations,
        showBonusPopup,
        setShowBonusPopup,
        bonusPoints,
        setBonusPoints,
        licensePlate,
        setLicensePlate,
        showBirthdayBonusPopup,
        setShowBirthdayBonusPopup,
        birthYearBonus,
        setBirthYearBonus,
        showAgeBonusPopup,
        setShowAgeBonusPopup,
        gameCount,
        // Additional properties
        showCompletionBanner,
        errorMessage,
        clearError,
        isGeneratingLicensePlate,
        setIsGeneratingLicensePlate,
        submitSuccess,
        clearSubmitSuccess,
        generateNewPlate,
        gamesPlayed,
        score,
        highScore,
        submitWord
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
};
