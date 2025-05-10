
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useGame } from "@/context/GameContext";
import { ArrowRight } from "lucide-react";

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
      <div className="text-center mb-2">
        <span className="text-sm text-gray-500">
          Forma una palabra usando estas consonantes:
        </span>
        <div className="flex justify-center gap-2 mt-1">
          {plateConsonants.split("").map((letter, index) => (
            <span 
              key={index}
              className="inline-flex items-center justify-center w-8 h-8 bg-game-blue text-white font-bold rounded-md animate-pulse-scale"
            >
              {letter}
            </span>
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
          className="flex-1 text-center font-medium"
          autoComplete="off"
        />
        <Button
          onClick={handleSubmit}
          className={isAnimating ? "animate-bounce" : ""}
          disabled={currentWord.trim().length < 3}
        >
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default WordInput;
