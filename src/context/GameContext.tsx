
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
