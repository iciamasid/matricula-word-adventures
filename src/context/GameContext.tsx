import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import { 
  generateLicensePlate, 
  getConsonantsFromPlate, 
  calculateScore, 
  getLevel, 
  wordExists
} from "../utils/gameUtils";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import BonusPopup from "@/components/BonusPopup";
import CompletionBanner from "@/components/CompletionBanner";
import { useLanguage, Language } from "@/context/LanguageContext";

// Ciudades del mundo con datos interesantes para niños - Updated with Spain as level 0
const WORLD_DESTINATIONS = [
  {
    city: "Madrid",
    country: "España",
    flag: "🇪🇸",
    fact: "¡En Madrid está el museo del Prado con obras de arte increíbles! Es una de las galerías de arte más famosas del mundo."
  },
  {
    city: "Madrid",
    country: "España",
    flag: "🇪🇸",
    fact: "¡En Madrid está el museo del Prado con obras de arte increíbles! Es una de las galerías de arte más famosas del mundo."
  },
  {
    city: "París",
    country: "Francia", 
    flag: "🇫🇷",
    fact: "¡La Torre Eiffel mide 324 metros! ¡Es tan alta como un edificio de 81 pisos y fue construida en 1889!"
  },
  {
    city: "Roma",
    country: "Italia",
    flag: "🇮🇹",
    fact: "En Roma puedes visitar el Coliseo, ¡donde luchaban los gladiadores hace 2000 años! Podía albergar a más de 50.000 personas."
  },
  {
    city: "Moscú",
    country: "Rusia",
    flag: "🇷🇺",
    fact: "¡La Plaza Roja de Moscú es tan grande que caben 6 campos de fútbol! A su lado está el Kremlin, una fortaleza con murallas de color rojo."
  },
  {
    city: "Tokio",
    country: "Japón",
    flag: "🇯🇵",
    fact: "¡En Tokio hay máquinas expendedoras que venden casi de todo: desde juguetes hasta paraguas! Hay más de 5 millones de máquinas en Japón."
  },
  {
    city: "Sídney",
    country: "Australia",
    flag: "🇦🇺",
    fact: "La Ópera de Sídney parece barcos con velas desplegadas en el puerto. ¡Tardaron 14 años en construirla!"
  },
  {
    city: "Nueva York",
    country: "Estados Unidos",
    flag: "🇺🇸",
    fact: "¡La Estatua de la Libertad fue un regalo de Francia a Estados Unidos! Mide 93 metros y su corona tiene 7 picos que representan los 7 continentes."
  },
  {
    city: "Ciudad de México",
    country: "Méjico",
    flag: "🇲🇽",
    fact: "Los antiguos aztecas construyeron Ciudad de México sobre un lago. ¡Todavía hay partes de la ciudad que se hunden un poco cada año!"
  },
  {
    city: "Lima",
    country: "Perú",
    flag: "🇵🇪",
    fact: "¡Lima es conocida como la Ciudad de los Reyes y fue fundada en 1535! Tiene deliciosa comida como el ceviche y está cerca del océano Pacífico."
  },
  {
    city: "Buenos Aires",
    country: "Argentina",
    flag: "🇦🇷",
    fact: "¡En Buenos Aires hay una librería en un antiguo teatro! Es tan bonita que la llaman 'la librería más bella del mundo'."
  },
  {
    city: "Madrid",
    country: "España",
    flag: "🇪🇸",
    fact: "¡Has completado la vuelta al mundo! Madrid es la capital de España y tiene la Plaza Mayor, un lugar histórico con 400 años de antigüedad."
  }
];

interface CarColor {
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
  clearSuccess: () => void; // New function
  closeBonusPopup: () => void;
  closeCompletionBanner: () => void;
  resetGame: () => void;
  setPlayerName: (name: string) => void;
  setPlayerAge: (age: number) => void;
  setPlayerGender: (gender: "niño" | "niña") => void;
  setIsGeneratingLicensePlate: (isGenerating: boolean) => void;
  setSelectedCarColor: (carColor: CarColor | null) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { toast } = useToast();
  const { language, t } = useLanguage();
  
  // Game state
  const [licensePlate, setLicensePlate] = useState("");
  const [plateConsonants, setPlateConsonants] = useState(""); // Ensuring it's initialized as a string
  const [currentWord, setCurrentWord] = useState("");
  const [score, setScore] = useState(0);
  const [previousScore, setPreviousScore] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);
  const [level, setLevel] = useState(0); // Start at level 0 now
  const [destination, setDestination] = useState("Madrid");
  const [destinationInfo, setDestinationInfo] = useState(WORLD_DESTINATIONS[1]); // Level 0 destination
  const [originInfo, setOriginInfo] = useState(WORLD_DESTINATIONS[0]); // Added for origin info
  const [highScore, setHighScore] = useState(0);
  const [gamesPlayed, setGamesPlayed] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [bonusCounter, setBonusCounter] = useState(0);
  const [showBonusPopup, setShowBonusPopup] = useState(false);
  const [bonusPoints, setBonusPoints] = useState(0);
  const [lastLevel, setLastLevel] = useState(0); // Track the last level to detect level changes
  const [playerName, setPlayerName] = useState("");
  const [playerAge, setPlayerAge] = useState(0);
  const [playerGender, setPlayerGender] = useState<"niño" | "niña" | "">("");
  const [ageCounter, setAgeCounter] = useState(0);
  const [showAgeBonusPopup, setShowAgeBonusPopup] = useState(false);
  const [showCompletionBanner, setShowCompletionBanner] = useState(false);
  const [isGeneratingLicensePlate, setIsGeneratingLicensePlate] = useState(false);
  const [selectedCarColor, setSelectedCarColor] = useState<CarColor | null>(null);
  
  // Add success state variables
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [successPoints, setSuccessPoints] = useState(0);
  const [successExplanation, setSuccessExplanation] = useState<string | null>(null);
  
  // Add the missing state variables that were causing the error
  const [prevLevel, setPrevLevel] = useState(0);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [showLevelUpFromNavigation, setShowLevelUpFromNavigation] = useState(false);
  
  // Add a ref to track if this is the initial load
  const isInitialLoad = useRef(true);
  
  // Initialize the game
  useEffect(() => {
    const savedTotalPoints = localStorage.getItem("matriculabraCadabra_totalPoints");
    const savedHighScore = localStorage.getItem("matriculabraCadabra_highScore");
    const savedGamesPlayed = localStorage.getItem("matriculabraCadabra_gamesPlayed");
    const savedLevel = localStorage.getItem("matriculabraCadabra_level");
    
    if (savedTotalPoints) setTotalPoints(parseInt(savedTotalPoints));
    if (savedHighScore) setHighScore(parseInt(savedHighScore));
    if (savedGamesPlayed) setGamesPlayed(parseInt(savedGamesPlayed));
    if (savedLevel) setLevel(parseInt(savedLevel));
    
    // Load player name, age and gender
    const savedName = localStorage.getItem("matriculabraCadabra_playerName");
    const savedAge = localStorage.getItem("matriculabraCadabra_playerAge");
    const savedGender = localStorage.getItem("matriculabraCadabra_playerGender") as "niño" | "niña" | null;
    
    if (savedName) setPlayerName(savedName);
    if (savedAge) setPlayerAge(parseInt(savedAge));
    if (savedGender) setPlayerGender(savedGender);
    
    generateNewPlate();
  }, []);
  
  // Update level and destination when points change
  useEffect(() => {
    const newLevel = getLevel(totalPoints);
    
    // Only update destinations if level changes
    if (newLevel !== level) {
      setLevel(newLevel);
      
      // Save level to localStorage
      localStorage.setItem("matriculabraCadabra_level", newLevel.toString());
      
      // Set origin based on current level
      const originIndex = newLevel;
      const originDestination = WORLD_DESTINATIONS[originIndex];
      setOriginInfo(originDestination);
      
      // Set destination as the next level destination
      const destinationIndex = Math.min(newLevel + 1, WORLD_DESTINATIONS.length - 1);
      const newDestinationInfo = WORLD_DESTINATIONS[destinationIndex];
      setDestinationInfo(newDestinationInfo);
      setDestination(newDestinationInfo.city);
      
      // Only show level-up toast if it's not the initial load and level has actually increased
      if (!isInitialLoad.current && newLevel > lastLevel) {
        toast({
          title: t("new_level"),
          description: `${t("reached_level")} ${newLevel}. ${t("now_travel")} ${originDestination.city} ${t("to")} ${newDestinationInfo.city}!`,
        });
      }
      
      // Show completion banner when reaching level 10 (game completed)
      if (newLevel === 10 && lastLevel < 10 && !isInitialLoad.current) {
        setShowCompletionBanner(true);
      }
      
      // Update last level
      setLastLevel(newLevel);
    }
    
    // After first render, set initialLoad to false
    isInitialLoad.current = false;
    
    // Save to localStorage
    localStorage.setItem("matriculabraCadabra_totalPoints", totalPoints.toString());
  }, [totalPoints, level, toast, t]);
  
  // Clear error after 5 seconds
  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  // Modified: Track popup state changes to generate new plate when all popups are closed
  useEffect(() => {
    if (isGeneratingLicensePlate && !showBonusPopup && !showAgeBonusPopup && !showCompletionBanner) {
      const timer = setTimeout(() => {
        doGenerateNewPlate();
        setIsGeneratingLicensePlate(false);
      }, 500); // Small delay to ensure animations complete
      
      return () => clearTimeout(timer);
    }
  }, [showBonusPopup, showAgeBonusPopup, showCompletionBanner, isGeneratingLicensePlate]);
  
  // Show level up popup ONLY when level changes and not from navigation
  useEffect(() => {
    // Only show the popup when the level increases (not when loading the page or returning from navigation)
    if (level > prevLevel && prevLevel !== 0 && !showLevelUpFromNavigation) {
      setShowLevelUp(true);
      
      // Auto-close the level up popup after 2 seconds
      const timer = setTimeout(() => {
        setShowLevelUp(false);
      }, 2000); // Changed from default (longer) to 2 seconds as requested
      
      return () => clearTimeout(timer);
    }
    // Always update the previous level
    setPrevLevel(level);

    // Reset navigation flag
    setShowLevelUpFromNavigation(false);
  }, [level, prevLevel, showLevelUpFromNavigation]);
  
  // Reset the entire game
  const resetGame = () => {
    setTotalPoints(0);
    setLevel(0);
    setDestination("Madrid");
    setDestinationInfo(WORLD_DESTINATIONS[1]);
    setOriginInfo(WORLD_DESTINATIONS[0]);
    setGamesPlayed(0);
    setHighScore(0);
    setPreviousScore(0);
    setLastLevel(0);
    
    // Clear localStorage except player name and age
    localStorage.removeItem("matriculabraCadabra_totalPoints");
    localStorage.removeItem("matriculabraCadabra_highScore");
    localStorage.removeItem("matriculabraCadabra_gamesPlayed");
    localStorage.removeItem("matriculabraCadabra_level");
    
    // Generate a new plate
    generateNewPlate();
  };
  
  // Actual plate generation logic
  const doGenerateNewPlate = () => {
    let newPlate = "";
    // Increase bonus counter with each game
    const newBonusCounter = bonusCounter + 1;
    setBonusCounter(newBonusCounter);
    
    // Increase age counter for age bonus opportunities
    const newAgeCounter = ageCounter + 1;
    setAgeCounter(newAgeCounter);
    
    // Check if it's time for a bonus (6666) plate - every 5-10 games
    if (newBonusCounter >= 5 && newBonusCounter <= 10) {
      // Generate a plate with "6666" in it
      newPlate = "6666" + generateRandomConsonants();
      // Reset the counter
      setBonusCounter(0);
    }
    // Check if it's time for an age bonus - every 8-10 games
    else if (playerAge > 0 && newAgeCounter >= 8 && newAgeCounter <= 10) {
      // Generate a plate with player's age in it
      const ageString = playerAge.toString().padStart(2, '0');
      const extraDigits = 4 - ageString.length;
      const randomDigits = Array(extraDigits)
        .fill(0)
        .map(() => Math.floor(Math.random() * 10))
        .join("");
      
      newPlate = ageString + randomDigits + generateRandomConsonants();
      // Reset the age counter
      setAgeCounter(0);
    } else {
      // Generate a normal plate
      newPlate = generateLicensePlate();
    }
    
    setLicensePlate(newPlate);
    // Ensure plateConsonants is always a string
    setPlateConsonants(getConsonantsFromPlate(newPlate));
    setCurrentWord("");
    setPreviousScore(score);  // Store the previous round's score
    setScore(0);
    setErrorMessage(null);
    clearSuccess();
    
    // Check if plate contains "6666" and award bonus points
    if (newPlate.substring(0, 4) === "6666") {
      const bonusPointsValue = 500;
      setTotalPoints(prev => prev + bonusPointsValue);
      setBonusPoints(bonusPointsValue);
      setShowBonusPopup(true);
    }
    
    // Check if plate contains player's age and award bonus points
    if (playerAge > 0) {
      const ageString = playerAge.toString();
      const plateNumbers = newPlate.substring(0, 4);
      
      if (plateNumbers.includes(ageString)) {
        const ageBonusPoints = 20;
        setTotalPoints(prev => prev + ageBonusPoints);
        setBonusPoints(ageBonusPoints);
        // Don't show separate age bonus popup anymore
      }
    }
  };
  
  // Generate a new license plate - now just sets a flag when we're ready to generate
  const generateNewPlate = () => {
    // Start the animation
    setIsGeneratingLicensePlate(true);
    
    // If any popup is shown, wait for them to close (the useEffect above will handle generation)
    if (showBonusPopup || showAgeBonusPopup || showCompletionBanner) {
      return;
    }
    
    // Otherwise generate after a 3-second delay for the animation
    const timer = setTimeout(() => {
      doGenerateNewPlate();
      setIsGeneratingLicensePlate(false);
    }, 3000);
    
    return () => clearTimeout(timer);
  };
  
  const closeBonusPopup = () => {
    setShowBonusPopup(false);
  };
  
  const closeAgeBonusPopup = () => {
    setShowAgeBonusPopup(false);
  };

  const closeCompletionBanner = () => {
    setShowCompletionBanner(false);
  };
  
  // Generate random consonants for 6666 bonus plates
  const generateRandomConsonants = () => {
    const consonants = "BCDFGHJKLMNPQRSTVWXYZ";
    return Array(3)
      .fill("")
      .map(() => consonants.charAt(Math.floor(Math.random() * consonants.length)))
      .join("");
  };
  
  const clearError = () => {
    setErrorMessage(null);
  };
  
  // Clear success message function
  const clearSuccess = () => {
    setSuccessMessage(null);
    setSuccessPoints(0);
    setSuccessExplanation(null);
  };
  
  // Submit the current word - UPDATED for success messages
  const submitWord = () => {
    if (currentWord.length < 3) {
      setErrorMessage(t("min_chars"));
      return;
    }
    
    // Check if the word exists in our dictionary based on the current language
    if (!wordExists(currentWord, language)) {
      setErrorMessage(`"${currentWord}" ${t("invalid_word")}`);
      setTotalPoints(prev => Math.max(0, prev - 20));
      return;
    }
    
    // Calculate score considering the current language
    const newScore = calculateScore(currentWord, plateConsonants, language);
    
    if (newScore < 0) {
      setErrorMessage(`${t("no_consonants")} ${Math.abs(newScore)} ${t("points")}.`);
      setTotalPoints(prev => Math.max(0, prev + newScore)); // Adding negative score
      return;
    }
    
    if (newScore > 0) {
      // Check if there's an age match in the plate
      const hasAgeBonusPoints = playerAge > 0 && 
        licensePlate.substring(0, 4).includes(playerAge.toString());
      
      // Check if the word is in the opposite language
      const isOppositeLanguage = (language === 'es' && newScore === 200) || 
                               (language === 'en' && newScore === 200);
      
      setScore(newScore);
      setTotalPoints(prev => prev + newScore);
      
      // Generate appropriate success message
      let successMsg = t("word_accepted");
      
      if (isOppositeLanguage) {
        successMsg = language === 'es' ? t("english_word") : "¡PALABRA EN ESPAÑOL!";
      } else if (newScore >= 100) {
        successMsg = t("perfect");
      } else if (newScore >= 75) {
        successMsg = t("excellent");
      } else if (newScore >= 50) {
        successMsg = t("very_good");
      }
      
      // Generate detailed explanation
      const explanation = generateExplanation(
        currentWord,
        newScore,
        plateConsonants,
        hasAgeBonusPoints,
        isOppositeLanguage
      );
      
      // Set success state
      setSuccessMessage(successMsg);
      setSuccessPoints(newScore);
      setSuccessExplanation(explanation);
      
      // Update high score if needed
      if (newScore > highScore) {
        setHighScore(newScore);
        localStorage.setItem("matriculabraCadabra_highScore", newScore.toString());
      }
      
      // Increment games played
      const newGamesPlayed = gamesPlayed + 1;
      setGamesPlayed(newGamesPlayed);
      localStorage.setItem("matriculabraCadabra_gamesPlayed", newGamesPlayed.toString());
      
      // Flag that we want to generate a new plate after popups close
      setIsGeneratingLicensePlate(true);
    } else {
      setErrorMessage(t("must_contain"));
    }
  };
  
  // Generate explanation text based on score breakdown
  const generateExplanation = (
    word: string, 
    score: number, 
    plateConsonants: string,
    hasAgeBonusPoints: boolean,
    isOppositeLanguage: boolean
  ): string => {
    const uppercaseWord = word.toUpperCase();
    let explanation = "";
    
    // Check each consonant from the plate
    const consonantMatches = [];
    const consonantIndices: number[] = [];
    let inOrder = true;
    let lastIndex = -1;
    
    for (let i = 0; i < plateConsonants.length; i++) {
      const consonant = plateConsonants[i];
      const index = uppercaseWord.indexOf(consonant);
      
      if (index !== -1) {
        consonantMatches.push(consonant);
        consonantIndices.push(index);
        
        // Check if consonants appear in order
        if (lastIndex !== -1 && index <= lastIndex) {
          inOrder = false;
        }
        lastIndex = index;
      }
    }
    
    // Determine base score explanation
    if (isOppositeLanguage) {
      explanation += language === 'es' 
        ? "¡Palabra en inglés! +200 puntos. "
        : "¡Palabra en español! +200 puntos. ";
    } else {
      // Consonant matching explanation
      if (consonantMatches.length === 3) {
        explanation += inOrder 
          ? `Usaste las 3 letras (${consonantMatches.join(', ')}) en orden: +100 puntos. `
          : `Usaste las 3 letras (${consonantMatches.join(', ')}) sin orden: +75 puntos. `;
      } else if (consonantMatches.length === 2) {
        explanation += inOrder 
          ? `Usaste 2 letras (${consonantMatches.join(', ')}) en orden: +50 puntos. `
          : `Usaste 2 letras (${consonantMatches.join(', ')}) sin orden: +25 puntos. `;
      } else if (consonantMatches.length === 1) {
        explanation += `Usaste 1 letra (${consonantMatches[0]}): +10 puntos. `;
      }
      
      // Word length bonus
      const lengthBonus = Math.min(50, word.length * 5);
      explanation += `Longitud de palabra (${word.length} letras): +${lengthBonus} puntos. `;
    }
    
    // Age bonus explanation
    if (hasAgeBonusPoints) {
      explanation += `¡La matrícula coincide con tu edad (${playerAge})!: +20 puntos. `;
    }
    
    return explanation;
  };
  
  return (
    <GameContext.Provider
      value={{
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
        generateNewPlate,
        setCurrentWord,
        submitWord,
        shuffleConsonants,
        clearError,
        clearSuccess,
        closeBonusPopup,
        closeCompletionBanner,
        resetGame,
        setPlayerName: (name: string) => setPlayerName(name),
        setPlayerAge: (age: number) => setPlayerAge(age),
        setPlayerGender: (gender: "niño" | "niña") => setPlayerGender(gender),
        setIsGeneratingLicensePlate: (isGenerating: boolean) => setIsGeneratingLicensePlate(isGenerating),
        setSelectedCarColor: (carColor: CarColor | null) => setSelectedCarColor(carColor)
      }}
    >
      {children}
      {showBonusPopup && <BonusPopup open={showBonusPopup} onClose={closeBonusPopup} points={bonusPoints} />}
      {showCompletionBanner && <CompletionBanner open={showCompletionBanner} onClose={closeCompletionBanner} />}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
};
