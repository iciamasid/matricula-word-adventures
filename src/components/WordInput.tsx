
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Send } from "lucide-react";
import { useGame } from "@/context/GameContext";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { useIsMobile } from "@/hooks/use-mobile";

const WordInput: React.FC = () => {
  const {
    currentWord,
    setCurrentWord,
    submitWord,
    generateNewPlate,
    plateConsonants,
  } = useGame();
  
  const { t, isEnglish } = useLanguage();
  const isMobile = useIsMobile();
  
  const inputRef = useRef<HTMLInputElement>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [placeholderText, setPlaceholderText] = useState("");
  const [fullPlaceholder, setFullPlaceholder] = useState("");
  
  useEffect(() => {
    // Focus the input when the component mounts
    if (inputRef.current) {
      inputRef.current.focus();
    }
    
    // Set the full placeholder text based on language
    // Ensure plateConsonants is always an array we can join
    let consonantsText = "";
    
    if (Array.isArray(plateConsonants)) {
      // If it's already an array, use it
      consonantsText = plateConsonants.join(', ');
    } else if (typeof plateConsonants === 'string') {
      // If it's a string, convert to array if possible or use as is
      try {
        const parsedArray = JSON.parse(plateConsonants);
        if (Array.isArray(parsedArray)) {
          consonantsText = parsedArray.join(', ');
        } else {
          consonantsText = plateConsonants;
        }
      } catch {
        // If parsing fails, use the string directly
        consonantsText = plateConsonants;
      }
    } else if (plateConsonants) {
      // If it's another truthy value, convert to string
      consonantsText = String(plateConsonants);
    }
    
    // Now set the text using the simplified message
    const text = isEnglish 
      ? `USE THESE LETTERS: ${consonantsText}` 
      : `USA ESAS LETRAS: ${consonantsText}`;
    setFullPlaceholder(text);
  }, [plateConsonants, isEnglish]);
  
  // Animated placeholder effect
  useEffect(() => {
    if (!fullPlaceholder) return;
    
    let currentIndex = 0;
    let direction = 1; // 1 for forward, -1 for backward
    
    const interval = setInterval(() => {
      if (direction === 1) {
        // Moving forward, adding characters
        currentIndex += 1;
        if (currentIndex >= fullPlaceholder.length) {
          // When reaching the end, pause before going backward
          setTimeout(() => {
            direction = -1;
          }, 1000); 
        }
      } else {
        // Moving backward, removing characters
        currentIndex -= 1;
        if (currentIndex <= 0) {
          // When reaching the start, pause before going forward
          setTimeout(() => {
            direction = 1;
          }, 500);
        }
      }
      
      setPlaceholderText(fullPlaceholder.substring(0, currentIndex));
    }, 100);
    
    return () => clearInterval(interval);
  }, [fullPlaceholder]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentWord(e.target.value.toUpperCase());
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit();
      
      // Generate a new plate after submission
      setTimeout(() => {
        generateNewPlate();
      }, 3000); // Wait a bit to show the result before generating a new plate
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
  
  // Set font size based on mobile view
  const fontSize = isMobile ? "text-xl" : "text-3xl";
  
  return (
    <div className="w-full max-w-xs relative">      
      <div className="flex gap-2">
        <Input 
          ref={inputRef} 
          type="text" 
          value={currentWord} 
          onChange={handleInputChange} 
          onKeyDown={handleKeyDown} 
          placeholder={placeholderText || " "} 
          className={`flex-1 text-center font-bold py-6 uppercase border-2 ${borderColor} shadow-md kids-text ${fontSize}`} 
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
            className={`h-full bg-gradient-to-r ${buttonGradient} ${isMobile ? "text-xl" : "text-2xl"} ${isAnimating ? "animate-bounce" : ""}`} 
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
