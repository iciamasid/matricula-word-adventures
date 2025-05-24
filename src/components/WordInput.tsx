
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, MapPin } from "lucide-react";
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
    countryVisitRequired,
    requiredCountryToVisit
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
    if (!countryVisitRequired) {
      setCurrentWord(e.target.value.toUpperCase());
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !isSubmitting && !countryVisitRequired) {
      handleSubmit();
    }
  };
  
  const handleSubmit = async () => {
    if (isSubmitting || countryVisitRequired) return;
    
    setIsSubmitting(true);
    setIsAnimating(true);
    
    try {
      await submitWord();
    } finally {
      setIsAnimating(false);
      setIsSubmitting(false);
    }
  };
  
  // Determine border color based on language and disabled state
  const borderColor = countryVisitRequired 
    ? "border-gray-300" 
    : (isEnglish ? "border-orange-400" : "border-purple-400");
  
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
  
  // Get the placeholder text based on whether visit is required
  const getPlaceholderText = () => {
    if (countryVisitRequired) {
      return isEnglish 
        ? `Visit ${requiredCountryToVisit} to continue` 
        : `Visita ${requiredCountryToVisit} para continuar`;
    }
    return placeholderText || " ";
  };
  
  return (
    <div className="w-full max-w-xs relative">
      {/* Show visit requirement message */}
      {countryVisitRequired && (
        <motion.div 
          className="mb-2 text-center"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="bg-amber-100 border border-amber-300 rounded-lg p-2 text-amber-800 text-sm font-medium flex items-center justify-center gap-2">
            <MapPin className="w-4 h-4" />
            {isEnglish 
              ? `Visit ${requiredCountryToVisit} to continue playing!`
              : `¡Visita ${requiredCountryToVisit} para continuar jugando!`
            }
          </div>
        </motion.div>
      )}
      
      <div className="flex gap-2">
        <Input 
          ref={inputRef} 
          type="text" 
          value={currentWord} 
          onChange={handleInputChange} 
          onKeyDown={handleKeyDown} 
          placeholder={getPlaceholderText()}
          disabled={countryVisitRequired}
          className={`flex-1 text-center font-bold py-6 uppercase border-2 ${borderColor} shadow-md kids-text ${fontSize} ${countryVisitRequired ? 'bg-gray-50 text-gray-400 cursor-not-allowed' : ''}`} 
          autoComplete="off"
        />
        <motion.div 
          whileHover={{
            scale: countryVisitRequired ? 1 : 1.05
          }} 
          whileTap={{
            scale: countryVisitRequired ? 1 : 0.95
          }}
        >
          <Button 
            onClick={handleSubmit} 
            className={`h-full bg-gradient-to-r ${buttonGradient} ${isMobile ? "text-xl" : "text-2xl"} ${isAnimating ? "animate-bounce" : ""} ${countryVisitRequired ? 'opacity-50 cursor-not-allowed' : ''}`} 
            disabled={currentWord.trim().length < minWordLength || isSubmitting || countryVisitRequired} 
            size="lg"
          >
            {isEnglish ? 
              <ArrowRight className="w-7 h-7" /> :  
              <ArrowRight className="w-7 h-7" />
            }
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default WordInput;
