
import React, { createContext, useContext, useState, useEffect } from "react";
import { 
  generateLicensePlate, 
  getConsonantsFromPlate, 
  calculateScore, 
  getLevel, 
  getDestination,
  wordExists
} from "../utils/gameUtils";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

interface GameContextType {
  licensePlate: string;
  plateConsonants: string;
  currentWord: string;
  score: number;
  totalPoints: number;
  level: number;
  destination: string;
  highScore: number;
  gamesPlayed: number;
  errorMessage: string | null;
  
  // Actions
  generateNewPlate: () => void;
  setCurrentWord: (word: string) => void;
  submitWord: () => void;
  shuffleConsonants: () => string;
  clearError: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { toast } = useToast();
  
  // Game state
  const [licensePlate, setLicensePlate] = useState("");
  const [plateConsonants, setPlateConsonants] = useState("");
  const [currentWord, setCurrentWord] = useState("");
  const [score, setScore] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);
  const [level, setLevel] = useState(1);
  const [destination, setDestination] = useState("Madrid");
  const [highScore, setHighScore] = useState(0);
  const [gamesPlayed, setGamesPlayed] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  // Initialize the game
  useEffect(() => {
    const savedTotalPoints = localStorage.getItem("matriculabraCadabra_totalPoints");
    const savedHighScore = localStorage.getItem("matriculabraCadabra_highScore");
    const savedGamesPlayed = localStorage.getItem("matriculabraCadabra_gamesPlayed");
    
    if (savedTotalPoints) setTotalPoints(parseInt(savedTotalPoints));
    if (savedHighScore) setHighScore(parseInt(savedHighScore));
    if (savedGamesPlayed) setGamesPlayed(parseInt(savedGamesPlayed));
    
    generateNewPlate();
  }, []);
  
  // Update level and destination when points change
  useEffect(() => {
    const newLevel = getLevel(totalPoints);
    if (newLevel !== level) {
      setLevel(newLevel);
      const newDestination = getDestination(newLevel);
      setDestination(newDestination);
      
      toast({
        title: "¡Nivel nuevo!",
        description: `Has alcanzado el nivel ${newLevel}. ¡Ahora viajas a ${newDestination}!`,
      });
    }
    
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
  
  // Generate a new license plate
  const generateNewPlate = () => {
    const newPlate = generateLicensePlate();
    setLicensePlate(newPlate);
    setPlateConsonants(getConsonantsFromPlate(newPlate));
    setCurrentWord("");
    setScore(0);
    setErrorMessage(null);
    
    // Check if plate contains "666" and award bonus points
    if (newPlate.substring(0, 4).includes("666")) {
      const bonusPoints = 1000;
      setTotalPoints(prev => prev + bonusPoints);
      
      toast({
        title: "¡NÚMERO DE LA SUERTE!",
        description: `¡Has conseguido el 666! Bonus de ${bonusPoints} puntos.`,
        variant: "destructive",
      });
    }
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
      
      if (newScore >= 100) {
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
      
      // Generate a new plate after submission
      setTimeout(() => {
        generateNewPlate();
      }, 1500);
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
        totalPoints,
        level,
        destination,
        highScore,
        gamesPlayed,
        errorMessage,
        generateNewPlate,
        setCurrentWord,
        submitWord,
        shuffleConsonants,
        clearError
      }}
    >
      {children}
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
