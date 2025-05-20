
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
    submitSuccess,
    pendingCountryVisit,
    isWordInputDisabled
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
    
    // Set the full placeholder text based on language and disabled state
    let text = "";
    
    // Si hay un país pendiente de visitar, cambia el placeholder
    if (pendingCountryVisit) {
      text = isEnglish 
        ? `VISIT ${pendingCountryVisit} FIRST!` 
        : `¡VISITA ${pendingCountryVisit} PRIMERO!`;
    } else {
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
      text = isEnglish 
        ? `USE THESE LETTERS: ${consonantsText}` 
        : `USA ESAS LETRAS: ${consonantsText}`;
    }
    
    setFullPlaceholder(text);
  }, [plateConsonants, isEnglish, pendingCountryVisit]);
  
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
    // If there was a successful submission and no pending country visit
    if (submitSuccess && !pendingCountryVisit) {
      // Wait for 3 seconds before generating a new plate
      const timer = setTimeout(() => {
        generateNewPlate();
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [submitSuccess, generateNewPlate, pendingCountryVisit]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // No cambiar nada si está deshabilitado
    if (isWordInputDisabled) return;
    setCurrentWord(e.target.value.toUpperCase());
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !isSubmitting && !isWordInputDisabled) {
      handleSubmit();
    }
  };
  
  const handleSubmit = async () => {
    if (isSubmitting || isWordInputDisabled) return;
    
    setIsSubmitting(true);
    setIsAnimating(true);
    
    try {
      await submitWord();
    } finally {
      setIsAnimating(false);
      setIsSubmitting(false);
    }
  };
  
  // Determine border color based on language or disabled state
  const borderColor = isWordInputDisabled 
    ? "border-red-500" 
    : isEnglish 
      ? "border-orange-400" 
      : "border-purple-400";
  
  // Determine gradient colors for button based on language or disabled state
  const buttonGradient = isWordInputDisabled
    ? "from-gray-400 to-gray-600"
    : isEnglish
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
  
  // Input class changes when disabled
  const inputClasses = `flex-1 text-center font-bold py-6 uppercase border-2 ${borderColor} shadow-md kids-text ${fontSize} ${isWordInputDisabled ? 'bg-gray-100 cursor-not-allowed' : ''}`;
  
  // Show visit country warning if needed
  const showVisitWarning = isWordInputDisabled && pendingCountryVisit;
  
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
          className={inputClasses} 
          autoComplete="off"
          disabled={isWordInputDisabled}
          // Remove autofocus attribute to prevent keyboard from showing up automatically
        />
        <motion.div 
          whileHover={!isWordInputDisabled ? {
            scale: 1.05
          } : {}}
          whileTap={!isWordInputDisabled ? {
            scale: 0.95
          } : {}}
        >
          <Button 
            onClick={handleSubmit} 
            className={`h-full bg-gradient-to-r ${buttonGradient} ${isMobile ? "text-xl" : "text-2xl"} ${isAnimating ? "animate-bounce" : ""}`} 
            disabled={currentWord.trim().length < minWordLength || isSubmitting || isWordInputDisabled} 
            size="lg"
          >
            {isEnglish ? 
              <ArrowRight className="w-7 h-7" /> :  
              <ArrowRight className="w-7 h-7" />
            }
          </Button>
        </motion.div>
      </div>
      
      {/* Warning for short words */}
      {currentWord.trim().length > 0 && currentWord.trim().length < minWordLength && !isWordInputDisabled && (
        <p className={`text-sm mt-1 ${isEnglish ? "text-orange-600" : "text-purple-600"} font-medium kids-text text-center`}>
          {isEnglish ? `Words must be at least ${minWordLength} letters long` : `Las palabras deben tener al menos ${minWordLength} letras`}
        </p>
      )}
      
      {/* Visit country warning */}
      {showVisitWarning && (
        <motion.p 
          className="text-sm mt-1 text-red-600 font-bold kids-text text-center"
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0, scale: [1, 1.05, 1] }}
          transition={{ 
            duration: 0.5,
            scale: {
              repeat: Infinity,
              repeatType: "reverse",
              duration: 1.5
            } 
          }}
        >
          {isEnglish 
            ? `Visit ${pendingCountryVisit} first! Click on the flag.` 
            : `¡Visita ${pendingCountryVisit} primero! Haz clic en la bandera.`}
        </motion.p>
      )}
      
      {/* Hint about accents in Spanish mode */}
      {showAccentHint && !isWordInputDisabled && (
        <p className="text-xs mt-1 text-purple-500 italic kids-text text-center">
          Consejo: Las palabras con o sin tildes son válidas
        </p>
      )}
    </div>
  );
};

export default WordInput;
