
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
      {/* Success message will be replaced with the stylized popup similar to BonusPopup */}
      
      <div className="flex gap-2">
        <Input
          ref={inputRef}
          type="text"
          value={currentWord}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="ESCRIBE UNA PALABRA"
          className="flex-1 text-center font-bold text-2xl py-6 uppercase border-2 border-purple-400 shadow-md kids-text"
          autoComplete="off"
        />
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            onClick={handleSubmit}
            className={`h-full bg-game-purple hover:bg-game-purple/90 text-2xl ${isAnimating ? "animate-bounce" : ""}`}
            disabled={currentWord.trim().length < 3}
            size="lg"
          >
            <ArrowRight className="w-7 h-7" />
          </Button>
        </motion.div>
      </div>
      
      {/* Display consonants below the license plate - make them bigger */}
      <div className="flex justify-center gap-3 mt-3">
        {plateConsonants.split("").map((letter, index) => (
          <motion.div
            key={index}
            className={`inline-flex items-center justify-center w-14 h-14 ${CONSONANT_COLORS[index % CONSONANT_COLORS.length]} text-white text-3xl font-bold rounded-md shadow-md kids-text`}
            whileHover={{ scale: 1.1 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
          >
            {letter}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default WordInput;
