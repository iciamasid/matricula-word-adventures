
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useGame } from "@/context/GameContext";
import { ArrowRight, Check, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Array of colors for the consonant squares with more game-themed colors
const CONSONANT_COLORS = ["bg-game-purple", "bg-game-blue", "bg-game-yellow"];
const SUCCESS_MESSAGES = ["¡PERFECTO!", "¡EXCELENTE!", "¡GENIAL!", "¡INCREÍBLE!"];

const WordInput: React.FC = () => {
  const { currentWord, setCurrentWord, submitWord, plateConsonants, score } = useGame();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  
  useEffect(() => {
    // Focus the input when the component mounts
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    // Show success message when score increases
    if (score > 0) {
      const randomMessage = SUCCESS_MESSAGES[Math.floor(Math.random() * SUCCESS_MESSAGES.length)];
      setSuccessMessage(randomMessage);
      setShowSuccess(true);
      const timer = setTimeout(() => {
        setShowSuccess(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [score]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentWord(e.target.value.toUpperCase());
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    setIsAnimating(true);
    submitWord();
    setTimeout(() => setIsAnimating(false), 500);
  };

  return (
    <div className="w-full max-w-xs relative">
      {/* Success message - positioned at bottom center */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div 
            className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-green-500 text-white py-3 px-6 rounded-lg shadow-lg z-50 flex items-center gap-2"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ type: "spring", damping: 12 }}
          >
            <motion.div animate={{ rotate: [0, 15, -15, 15, 0] }} transition={{ duration: 0.5 }}>
              <Star className="h-6 w-6 text-yellow-300" />
            </motion.div>
            <span className="text-2xl font-bold kids-text">{successMessage}</span>
            <motion.div animate={{ rotate: [0, -15, 15, -15, 0] }} transition={{ duration: 0.5 }}>
              <Star className="h-6 w-6 text-yellow-300" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="flex gap-2">
        <Input
          ref={inputRef}
          type="text"
          value={currentWord}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="ESCRIBE UNA PALABRA CON ESAS CONSONANTES"
          className="flex-1 text-center font-bold text-lg py-5 uppercase border-2 border-purple-400 shadow-md kids-text"
          autoComplete="off"
        />
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            onClick={handleSubmit}
            className={`h-full bg-game-purple hover:bg-game-purple/90 text-xl ${isAnimating ? "animate-bounce" : ""}`}
            disabled={currentWord.trim().length < 3}
            size="lg"
          >
            <ArrowRight className="w-6 h-6" />
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default WordInput;
