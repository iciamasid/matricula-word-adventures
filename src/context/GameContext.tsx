
import React, { createContext, useContext, useState, useEffect } from "react";
import { 
  generateLicensePlate, 
  getConsonantsFromPlate, 
  calculateScore, 
  getLevel, 
  getCarModel, 
  getDestination 
} from "../utils/gameUtils";
import { useToast } from "@/components/ui/use-toast";

interface GameContextType {
  licensePlate: string;
  plateConsonants: string;
  currentWord: string;
  score: number;
  totalPoints: number;
  level: number;
  carModel: string;
  destination: string;
  highScore: number;
  gamesPlayed: number;
  
  // Actions
  generateNewPlate: () => void;
  setCurrentWord: (word: string) => void;
  submitWord: () => void;
  shuffleConsonants: () => string;
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
  const [carModel, setCarModel] = useState("Compact");
  const [destination, setDestination] = useState("Madrid");
  const [highScore, setHighScore] = useState(0);
  const [gamesPlayed, setGamesPlayed] = useState(0);
  
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
  
  // Update level, car model and destination when points change
  useEffect(() => {
    const newLevel = getLevel(totalPoints);
    if (newLevel !== level) {
      setLevel(newLevel);
      setCarModel(getCarModel(newLevel));
      setDestination(getDestination(newLevel));
      
      toast({
        title: "¡Nivel nuevo!",
        description: `Has alcanzado el nivel ${newLevel}. ¡Ahora puedes conducir un ${getCarModel(newLevel)} a ${getDestination(newLevel)}!`,
      });
    }
    
    // Save to localStorage
    localStorage.setItem("matriculabraCadabra_totalPoints", totalPoints.toString());
  }, [totalPoints, level, toast]);
  
  // Generate a new license plate
  const generateNewPlate = () => {
    const newPlate = generateLicensePlate();
    setLicensePlate(newPlate);
    setPlateConsonants(getConsonantsFromPlate(newPlate));
    setCurrentWord("");
    setScore(0);
  };
  
  // Submit the current word
  const submitWord = () => {
    if (currentWord.length < 3) {
      toast({
        title: "Palabra demasiado corta",
        description: "Introduce una palabra de al menos 3 letras.",
        variant: "destructive"
      });
      return;
    }
    
    const newScore = calculateScore(currentWord, plateConsonants);
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
      
      toast({
        title: "¡Palabra aceptada!",
        description: `Has ganado ${newScore} puntos.`,
      });
      
      // Generate a new plate after submission
      setTimeout(() => {
        generateNewPlate();
      }, 1500);
    } else {
      toast({
        title: "Palabra no válida",
        description: "La palabra no contiene las consonantes de la matrícula.",
        variant: "destructive"
      });
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
        carModel,
        destination,
        highScore,
        gamesPlayed,
        generateNewPlate,
        setCurrentWord,
        submitWord,
        shuffleConsonants
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
