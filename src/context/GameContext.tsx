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
import AgeBonusPopup from "@/components/AgeBonusPopup";
import CompletionBanner from "@/components/CompletionBanner";

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
  showAgeBonusPopup: boolean;
  showCompletionBanner: boolean;
  
  // Actions
  generateNewPlate: () => void;
  setCurrentWord: (word: string) => void;
  submitWord: () => void;
  shuffleConsonants: () => string;
  clearError: () => void;
  closeBonusPopup: () => void;
  closeAgeBonusPopup: () => void;
  closeCompletionBanner: () => void;
  resetGame: () => void;
  setPlayerName: (name: string) => void;
  setPlayerAge: (age: number) => void;
  setPlayerGender: (gender: "niño" | "niña") => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { toast } = useToast();
  
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
  const [isGeneratingNewPlate, setIsGeneratingNewPlate] = useState(false);
  
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
          title: "¡Nivel nuevo!",
          description: `Has alcanzado el nivel ${newLevel}. ¡Ahora viajas desde ${originDestination.city} hasta ${newDestinationInfo.city}!`,
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
  }, [totalPoints, level, toast]);
  
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
    if (isGeneratingNewPlate && !showBonusPopup && !showAgeBonusPopup) {
      const timer = setTimeout(() => {
        doGenerateNewPlate();
        setIsGeneratingNewPlate(false);
      }, 500); // Small delay to ensure animations complete
      
      return () => clearTimeout(timer);
    }
  }, [showBonusPopup, showAgeBonusPopup, isGeneratingNewPlate]);
  
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
        setShowAgeBonusPopup(true);
        
        toast({
          title: "¡Bonus de edad!",
          description: `¡Tu matrícula contiene tu edad! +${ageBonusPoints} puntos.`,
        });
      }
    }
  };
  
  // Generate a new license plate - now just sets a flag when we're ready to generate
  const generateNewPlate = () => {
    // If any popup is shown, set the flag to generate later
    if (showBonusPopup || showAgeBonusPopup || showCompletionBanner) {
      setIsGeneratingNewPlate(true);
      return;
    }
    
    // Otherwise generate immediately
    doGenerateNewPlate();
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
  
  // Submit the current word
  const submitWord = () => {
    if (currentWord.length < 3) {
      setErrorMessage("Introduce una palabra de al menos 3 letras");
      return;
    }
    
    // Check if the word exists in our dictionary
    if (!wordExists(currentWord)) {
      setErrorMessage(`"${currentWord}" no es una palabra válida. Se restan 20 puntos.`);
      setTotalPoints(prev => Math.max(0, prev - 20));
      return;
    }
    
    const newScore = calculateScore(currentWord, plateConsonants);
    
    if (newScore < 0) {
      setErrorMessage(`La palabra no contiene ninguna de las consonantes. Se restan ${Math.abs(newScore)} puntos.`);
      setTotalPoints(prev => Math.max(0, prev + newScore)); // Adding negative score
      return;
    }
    
    if (newScore > 0) {
      setScore(newScore);
      setTotalPoints(prev => prev + newScore);
      
      // Update high score if needed
      if (newScore > highScore) {
        setHighScore(newScore);
        localStorage.setItem("matriculabraCadabra_highScore", newScore.toString());
      }
      
      // Increment games played
      const newGamesPlayed = gamesPlayed + 1;
      setGamesPlayed(newGamesPlayed);
      localStorage.setItem("matriculabraCadabra_gamesPlayed", newGamesPlayed.toString());
      
      let successMessage = "¡Palabra aceptada!";
      
      if (newScore === 200) {
        successMessage = "¡PALABRA EN INGLÉS!";
      } else if (newScore >= 100) {
        successMessage = "¡PERFECTO!";
      } else if (newScore >= 75) {
        successMessage = "¡EXCELENTE!";
      } else if (newScore >= 50) {
        successMessage = "¡MUY BIEN!";
      }
      
      toast({
        title: successMessage,
        description: `Has ganado ${newScore} puntos.`,
      });
      
      // Flag that we want to generate a new plate after popups close
      setIsGeneratingNewPlate(true);
    } else {
      setErrorMessage("La palabra debe contener al menos una consonante de la matrícula.");
    }
  };
  
  // Shuffle the consonants to help the player
  const shuffleConsonants = () => {
    const array = [...plateConsonants];
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array.join("");
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
        showAgeBonusPopup,
        showCompletionBanner,
        generateNewPlate,
        setCurrentWord,
        submitWord,
        shuffleConsonants,
        clearError,
        closeBonusPopup,
        closeAgeBonusPopup,
        closeCompletionBanner,
        resetGame,
        setPlayerName: (name: string) => setPlayerName(name),
        setPlayerAge: (age: number) => setPlayerAge(age),
        setPlayerGender: (gender: "niño" | "niña") => setPlayerGender(gender)
      }}
    >
      {children}
      {showBonusPopup && <BonusPopup open={showBonusPopup} onClose={closeBonusPopup} points={bonusPoints} />}
      {showAgeBonusPopup && <AgeBonusPopup open={showAgeBonusPopup} onClose={closeAgeBonusPopup} points={bonusPoints} age={playerAge} />}
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
