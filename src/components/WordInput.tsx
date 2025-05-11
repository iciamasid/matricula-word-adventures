
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useGame } from "@/context/GameContext";
import { ArrowRight, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Array of colors for the consonant squares with more game-themed colors
const CONSONANT_COLORS = ["bg-game-purple", "bg-game-blue", "bg-game-yellow"];
const WordInput: React.FC = () => {
  const {
    currentWord,
    setCurrentWord,
    submitWord,
    plateConsonants,
    score
  } = useGame();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  useEffect(() => {
    // Focus the input when the component mounts
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
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
  return <div className="w-full max-w-xs relative">      
      <div className="flex gap-2">
        <Input ref={inputRef} type="text" value={currentWord} onChange={handleInputChange} onKeyDown={handleKeyDown} placeholder="Escribe aquí" className="flex-1 text-center font-bold text-3xl py-6 uppercase border-2 border-purple-400 shadow-md kids-text" autoComplete="off" />
        <motion.div whileHover={{
        scale: 1.05
      }} whileTap={{
        scale: 0.95
      }}>
          <Button onClick={handleSubmit} className={`h-full bg-game-purple hover:bg-game-purple/90 text-2xl ${isAnimating ? "animate-bounce" : ""}`} disabled={currentWord.trim().length < 3} size="lg">
            <ArrowRight className="w-7 h-7" />
          </Button>
        </motion.div>
      </div>
    </div>;
};
export default WordInput;
