
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useGame } from "@/context/GameContext";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

const WordInput: React.FC = () => {
  const {
    currentWord,
    setCurrentWord,
    submitWord,
    plateConsonants,
  } = useGame();
  
  const { t, isEnglish } = useLanguage();
  
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
  
  // Determine border color based on language
  const borderColor = isEnglish 
    ? "border-orange-400" 
    : "border-purple-400";
  
  // Determine gradient colors for button based on language
  const buttonGradient = isEnglish
    ? "from-orange-500 to-orange-700 hover:from-orange-600 hover:to-orange-800"
    : "from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800";
  
  return (
    <div className="w-full max-w-xs relative">      
      <div className="flex gap-2">
        <Input 
          ref={inputRef} 
          type="text" 
          value={currentWord} 
          onChange={handleInputChange} 
          onKeyDown={handleKeyDown} 
          placeholder={t("type_here")} 
          className={`flex-1 text-center font-bold text-3xl py-6 uppercase border-2 ${borderColor} shadow-md kids-text`} 
          autoComplete="off" 
        />
        <motion.div 
          whileHover={{
            scale: 1.05
          }} 
          whileTap={{
            scale: 0.95
          }}
        >
          <Button 
            onClick={handleSubmit} 
            className={`h-full bg-gradient-to-r ${buttonGradient} text-2xl ${isAnimating ? "animate-bounce" : ""}`} 
            disabled={currentWord.trim().length < 3} 
            size="lg"
          >
            <ArrowRight className="w-7 h-7" />
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default WordInput;
