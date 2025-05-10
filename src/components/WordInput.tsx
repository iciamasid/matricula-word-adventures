
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useGame } from "@/context/GameContext";
import { ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Array of colors for the consonant squares with more distinctive colors
const CONSONANT_COLORS = ["bg-game-blue", "bg-game-purple", "bg-game-orange"];

const WordInput: React.FC = () => {
  const { currentWord, setCurrentWord, submitWord, plateConsonants } = useGame();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  
  useEffect(() => {
    // Focus the input when the component mounts
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentWord(e.target.value);
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
    <div className="w-full max-w-xs">
      <div className="text-center mb-4">
        <span className="text-sm text-gray-500">
          Forma una palabra usando estas consonantes:
        </span>
        <div className="flex justify-center gap-3 mt-3">
          {plateConsonants.split("").map((letter, index) => (
            <motion.div
              key={index}
              className={`inline-flex items-center justify-center w-14 h-14 ${CONSONANT_COLORS[index]} text-white text-2xl font-bold rounded-md`}
              whileHover={{ scale: 1.1, rotate: 5 }}
              animate={{ 
                scale: [1, 1.05, 1],
                transition: { 
                  duration: 1.5, 
                  repeat: Infinity, 
                  repeatType: "reverse",
                  delay: index * 0.3
                }
              }}
            >
              {letter}
            </motion.div>
          ))}
        </div>
      </div>
      
      <div className="flex gap-2">
        <Input
          ref={inputRef}
          type="text"
          value={currentWord}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Escribe una palabra"
          className="flex-1 text-center font-medium text-lg py-5"
          autoComplete="off"
        />
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            onClick={handleSubmit}
            className={`h-full ${isAnimating ? "animate-bounce" : ""}`}
            disabled={currentWord.trim().length < 3}
            size="lg"
          >
            <ArrowRight className="w-5 h-5" />
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default WordInput;
