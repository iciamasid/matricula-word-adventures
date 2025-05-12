
import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
} from "react";
import { generatePlate } from "@/lib/plateGenerator";
import { isValidWord } from "@/lib/wordValidator";
import { getCountryInfo } from "@/lib/countryInfo";
import { toast } from "@/hooks/use-toast";
import { calculateWordPoints } from "@/lib/calculateWordPoints";
import { useLanguage } from "@/context/LanguageContext";

// Define the types for the game state
interface GameState {
  licensePlate: string;
  plateConsonants: string[];
  currentWord: string;
  score: number;
  previousScore: number;
  gamesPlayed: number;
  level: number;
  destinationInfo: {
    city: string;
    country: string;
    flag: string;
  };
  originInfo: {
    city: string;
    country: string;
    flag: string;
  };
  errorMessage: string | null;
  successMessage: string | null;
  pointsEarned: number;
  showBonusPopup: boolean;
  showAgeBonusPopup: boolean;
  showCompletionBanner: boolean;
  playerName: string;
  playerAge: number | null;
  playerGender: string | null;
  selectedCarColor: {
    id: string;
    name: string;
    image: string;
    color: string;
  } | null;
  isGeneratingLicensePlate: boolean;
}

// Define the actions that can be dispatched to the reducer
type GameAction =
  | { type: "GENERATE_PLATE"; payload: { plate: string; consonants: string[] } }
  | { type: "SET_WORD"; payload: string }
  | { type: "SUBMIT_WORD" }
  | { type: "UPDATE_SCORE"; payload: number }
  | { type: "RESET_GAME" }
  | { type: "SET_ERROR"; payload: string }
  | { type: "CLEAR_ERROR" }
  | { type: "SET_SUCCESS"; payload: { message: string; pointsEarned: number } }
  | { type: "CLEAR_SUCCESS" }
  | { type: "SHOW_BONUS_POPUP" }
  | { type: "CLOSE_BONUS_POPUP" }
  | { type: "SHOW_AGE_BONUS_POPUP" }
  | { type: "CLOSE_AGE_BONUS_POPUP" }
  | { type: "SHOW_COMPLETION_BANNER" }
  | { type: "CLOSE_COMPLETION_BANNER" }
  | { type: "SET_PLAYER_NAME"; payload: string }
  | { type: "SET_PLAYER_AGE"; payload: number }
  | { type: "SET_PLAYER_GENDER"; payload: string }
  | {
      type: "SET_CAR_COLOR";
      payload: {
        id: string;
        name: string;
        image: string;
        color: string;
      } | null;
    }
  | { type: "SET_IS_GENERATING_LICENSE_PLATE"; payload: boolean };

// Initial state for the game
const initialState: GameState = {
  licensePlate: "",
  plateConsonants: [],
  currentWord: "",
  score: 0,
  previousScore: 0,
  gamesPlayed: 0,
  level: 0,
  destinationInfo: {
    city: "",
    country: "",
    flag: "",
  },
  originInfo: {
    city: "",
    country: "",
    flag: "",
  },
  errorMessage: null,
  successMessage: null,
  pointsEarned: 0,
  showBonusPopup: false,
  showAgeBonusPopup: false,
  showCompletionBanner: false,
  playerName: "",
  playerAge: null,
  playerGender: null,
  selectedCarColor: null,
  isGeneratingLicensePlate: false,
};

// Reducer function to handle state updates
const gameReducer = (state: GameState, action: GameAction): GameState => {
  switch (action.type) {
    case "GENERATE_PLATE":
      return {
        ...state,
        licensePlate: action.payload.plate,
        plateConsonants: action.payload.consonants,
      };
    case "SET_WORD":
      return { ...state, currentWord: action.payload };
    case "UPDATE_SCORE":
      return { ...state, score: state.score + action.payload };
    case "RESET_GAME":
      return {
        ...initialState,
        playerName: state.playerName, // Keep player name
        playerAge: state.playerAge, // Keep player age
        playerGender: state.playerGender, // Keep player gender
        selectedCarColor: state.selectedCarColor, // Keep car color
      };
    case "SET_ERROR":
      return { ...state, errorMessage: action.payload };
    case "CLEAR_ERROR":
      return { ...state, errorMessage: null };
    case "SET_SUCCESS":
      return {
        ...state,
        successMessage: action.payload.message,
        pointsEarned: action.payload.pointsEarned,
      };
    case "CLEAR_SUCCESS":
      return { ...state, successMessage: null, pointsEarned: 0 };
    case "SHOW_BONUS_POPUP":
      return { ...state, showBonusPopup: true };
    case "CLOSE_BONUS_POPUP":
      return { ...state, showBonusPopup: false };
    case "SHOW_AGE_BONUS_POPUP":
      return { ...state, showAgeBonusPopup: true };
    case "CLOSE_AGE_BONUS_POPUP":
      return { ...state, showAgeBonusPopup: false };
    case "SHOW_COMPLETION_BANNER":
      return { ...state, showCompletionBanner: true };
    case "CLOSE_COMPLETION_BANNER":
      return { ...state, showCompletionBanner: false };
    case "SET_PLAYER_NAME":
      return { ...state, playerName: action.payload };
    case "SET_PLAYER_AGE":
      return { ...state, playerAge: action.payload };
    case "SET_PLAYER_GENDER":
      return { ...state, playerGender: action.payload };
    case "SET_CAR_COLOR":
      return { ...state, selectedCarColor: action.payload };
    case "SET_IS_GENERATING_LICENSE_PLATE":
      return { ...state, isGeneratingLicensePlate: action.payload };
    case "SUBMIT_WORD": {
      const word = state.currentWord.trim().toUpperCase();
      const isValid = isValidWord(word, state.plateConsonants);

      if (!isValid) {
        return {
          ...state,
          errorMessage: "¡Palabra no válida! Intenta otra vez.",
          successMessage: null, // Clear any existing success message
          pointsEarned: 0, // Reset points earned
        };
      }

      const points = calculateWordPoints(word);

      return {
        ...state,
        score: state.score + points,
        previousScore: points,
        currentWord: "",
        gamesPlayed: state.gamesPlayed + 1,
        level: Math.floor((state.score + points) / 1000),
        successMessage: `¡Palabra válida: ${word}!`,
        pointsEarned: points,
        errorMessage: null, // Clear any existing error message
      };
    }
    default:
      return state;
  }
};

// Create the game context
interface GameContextValue {
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
  generateNewPlate: () => void;
  submitWord: () => void;
  clearError: () => void;
  clearSuccess: () => void;
  showBonus: () => void;
  closeBonus: () => void;
  showAgeBonus: () => void;
  closeAgeBonus: () => void;
  showCompletion: () => void;
  closeCompletion: () => void;
  setPlayerName: (name: string) => void;
  setPlayerAge: (age: number) => void;
  setPlayerGender: (gender: string) => void;
  setSelectedCarColor: (car: {
    id: string;
    name: string;
    image: string;
    color: string;
  } | null) => void;
  setIsGeneratingLicensePlate: (isGenerating: boolean) => void;
  setCurrentWord: (word: string) => void;
}

const GameContext = createContext<GameContextValue>({
  state: initialState,
  dispatch: () => null,
  generateNewPlate: () => {},
  submitWord: () => {},
  clearError: () => {},
  clearSuccess: () => {},
  showBonus: () => {},
  closeBonus: () => {},
  showAgeBonus: () => {},
  closeAgeBonus: () => {},
  showCompletion: () => {},
  closeCompletion: () => {},
  setPlayerName: () => {},
  setPlayerAge: () => {},
  setPlayerGender: () => {},
  setSelectedCarColor: () => {},
  setIsGeneratingLicensePlate: () => {},
  setCurrentWord: () => {},
});

// Game context provider component
interface GameProviderProps {
  children: React.ReactNode;
}

const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  const { language } = useLanguage();

  // Function to generate a new license plate
  const generateNewPlate = useCallback(() => {
    const newPlate = generatePlate();
    dispatch({
      type: "GENERATE_PLATE",
      payload: { plate: newPlate.plate, consonants: newPlate.consonants },
    });

    // Determine origin and destination countries based on the level
    const originLevel = state.level % 10; // Cycle through levels 0-9
    const destinationLevel = (state.level + 1) % 10; // Ensure destination is different

    const origin = getCountryInfo(originLevel, language);
    const destination = getCountryInfo(destinationLevel, language);

    // Update origin and destination info in the state
    dispatch({ type: "SET_PLAYER_NAME", payload: state.playerName });
    dispatch({ type: "SET_PLAYER_AGE", payload: state.playerAge || 0 });
    dispatch({ type: "SET_PLAYER_GENDER", payload: state.playerGender || "" });
    dispatch({ type: "SET_CAR_COLOR", payload: state.selectedCarColor });
    setIsGeneratingLicensePlate(false);

    // Show completion banner if level is 10 or more
    if (state.level >= 10 && !state.showCompletionBanner) {
      showCompletion();
    }
  }, [
    state.level,
    language,
    state.playerName,
    state.playerAge,
    state.playerGender,
    state.selectedCarColor,
    state.showCompletionBanner,
  ]);

  // Function to set current word
  const setCurrentWord = (word: string) => {
    dispatch({ type: "SET_WORD", payload: word });
  };

  // Function to submit the current word
  const submitWord = () => {
    dispatch({ type: "SUBMIT_WORD" });
  };

  // Function to clear the error message
  const clearError = () => {
    dispatch({ type: "CLEAR_ERROR" });
  };

  // Function to clear the success message
  const clearSuccess = () => {
    dispatch({ type: "CLEAR_SUCCESS" });
  };

  // Function to show the bonus popup
  const showBonus = () => {
    dispatch({ type: "SHOW_BONUS_POPUP" });
  };

  // Function to close the bonus popup
  const closeBonus = () => {
    dispatch({ type: "CLOSE_BONUS_POPUP" });
  };

  // Function to show the age bonus popup
  const showAgeBonus = () => {
    dispatch({ type: "SHOW_AGE_BONUS_POPUP" });
  };

  // Function to close the age bonus popup
  const closeAgeBonus = () => {
    dispatch({ type: "CLOSE_AGE_BONUS_POPUP" });
  };

  // Function to show the completion banner
  const showCompletion = () => {
    dispatch({ type: "SHOW_COMPLETION_BANNER" });
  };

  // Function to close the completion banner
  const closeCompletion = () => {
    dispatch({ type: "CLOSE_COMPLETION_BANNER" });
  };

  const setPlayerName = (name: string) => {
    dispatch({ type: "SET_PLAYER_NAME", payload: name });
  };

  const setPlayerAge = (age: number) => {
    dispatch({ type: "SET_PLAYER_AGE", payload: age });
  };

  const setPlayerGender = (gender: string) => {
    dispatch({ type: "SET_PLAYER_GENDER", payload: gender });
  };

  const setSelectedCarColor = (car: {
    id: string;
    name: string;
    image: string;
    color: string;
  } | null) => {
    dispatch({ type: "SET_CAR_COLOR", payload: car });
  };

  const setIsGeneratingLicensePlate = (isGenerating: boolean) => {
    dispatch({ type: "SET_IS_GENERATING_LICENSE_PLATE", payload: isGenerating });
  };

  // Load stored game state from localStorage on component mount
  useEffect(() => {
    const storedState = localStorage.getItem("gameState");
    if (storedState) {
      const parsedState = JSON.parse(storedState);
      // Ensure the loaded state does not overwrite certain properties
      dispatch({ type: "SET_PLAYER_NAME", payload: parsedState.playerName });
      dispatch({ type: "SET_PLAYER_AGE", payload: parsedState.playerAge });
      dispatch({ type: "SET_PLAYER_GENDER", payload: parsedState.playerGender });
      dispatch({ type: "SET_CAR_COLOR", payload: parsedState.selectedCarColor });
    } else {
      generateNewPlate();
    }
  }, [generateNewPlate]);

  // Save game state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("gameState", JSON.stringify(state));
  }, [state]);

  // Provide the game context value
  return (
    <GameContext.Provider
      value={{
        state,
        dispatch,
        generateNewPlate,
        submitWord,
        clearError,
        clearSuccess,
        showBonus,
        closeBonus,
        showAgeBonus,
        closeAgeBonus,
        showCompletion,
        closeCompletion,
        setPlayerName,
        setPlayerAge,
        setPlayerGender,
        setSelectedCarColor,
        setIsGeneratingLicensePlate,
        setCurrentWord
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

// Hook to use the game context
const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
};

export { GameProvider, useGame };
