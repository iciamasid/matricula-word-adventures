
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";
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
    submitSuccess
  } = useGame();
  
  const { t, isEnglish } = useLanguage();
  const isMobile = useIsMobile();
  
  const inputRef = useRef<HTMLInputElement>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [placeholderText, setPlaceholderText] = useState("");
  const [fullPlaceholder, setFullPlaceholder] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Remove the auto-focus on the input so keyboard doesn't appear automatically
  useEffect(() => {
    // Don't auto-focus the input
    // This is intentionally left empty to prevent auto-focus
    
    // Set the full placeholder text based on language
    // Ensure plateConsonants is always an array we can join
    let consonantsText = "";
    
    if (Array.isArray(plateConsonants)) {
      // If it's already an array, use it
      consonantsText = plateConsonants.join(', ');
    } else if (typeof plateConsonants === 'string') {
      // If it's a string, convert to array if possible or use as is
      consonantsText = plateConsonants;
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
  
  // Generate new plate automatically after successful word submission
  useEffect(() => {
    // If there was a successful submission
    if (submitSuccess) {
      // Wait for 3 seconds before generating a new plate
      const timer = setTimeout(() => {
        generateNewPlate();
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [submitSuccess, generateNewPlate]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentWord(e.target.value.toUpperCase());
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !isSubmitting) {
      handleSubmit();
    }
  };
  
  const handleSubmit = async () => {
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    setIsAnimating(true);
    
    try {
      await submitWord();
    } finally {
      setIsAnimating(false);
      setIsSubmitting(false);
    }
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
  
  // Minimum word length for submit button to be enabled
  const minWordLength = 4;

  // Localized button text
  const submitButtonLabel = isEnglish ? "Submit" : "Enviar";
  
  // Show hint about accents in Spanish mode
  const showAccentHint = !isEnglish && currentWord.trim().length > 0;
  
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
          // Remove autofocus attribute to prevent keyboard from showing up automatically
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
            disabled={currentWord.trim().length < minWordLength || isSubmitting} 
            size="lg"
          >
            {isEnglish ? 
              <ArrowRight className="w-7 h-7" /> :  
              <ArrowRight className="w-7 h-7" />
            }
          </Button>
        </motion.div>
      </div>
      
      {/* Warning for short words - INCREASED TEXT SIZE */}
      {currentWord.trim().length > 0 && currentWord.trim().length < minWordLength && (
        <p className={`text-lg mt-2 ${isEnglish ? "text-orange-600" : "text-purple-600"} font-medium kids-text text-center`}>
          {isEnglish ? `Words must be at least ${minWordLength} letters long` : `Las palabras deben tener al menos ${minWordLength} letras`}
        </p>
      )}
      
      {/* Hint about accents in Spanish mode - INCREASED TEXT SIZE */}
      {showAccentHint && (
        <p className="text-lg mt-2 text-purple-500 italic kids-text text-center">
          Consejo: Las palabras con o sin tildes son válidas
        </p>
      )}
    </div>
  );
};

export default WordInput;
