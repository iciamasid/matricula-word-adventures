
import React, { useState, useEffect } from "react";
import { useGame } from "@/context/GameContext";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Globe, MapPin, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";

const WordInput: React.FC = () => {
  const { 
    plateConsonants, 
    currentWord, 
    setCurrentWord, 
    submitWord, 
    countryVisitRequired 
  } = useGame();
  const { isEnglish, t } = useLanguage?.() || { isEnglish: false };
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  
  const handleWordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Convert to lowercase and only allow letters
    const value = event.target.value.toLowerCase().replace(/[^a-zñáéíóúü]/gi, '');
    setCurrentWord(value);
  };
  
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (countryVisitRequired) {
      // Show toast message if country visit is required
      toast({
        title: isEnglish ? "Visit required!" : "¡Visita requerida!",
        description: isEnglish 
          ? "You must visit the newly unlocked country before continuing." 
          : "Debes visitar el país desbloqueado antes de continuar.",
        variant: "destructive"
      });
      return;
    }
    
    if (currentWord.length === 0) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await submitWord();
    } catch (error) {
      console.error("Error submitting word:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Reset word input field when plateConsonants changes
  useEffect(() => {
    setCurrentWord("");
  }, [plateConsonants, setCurrentWord]);
  
  // Determine if form should be disabled
  const isFormDisabled = countryVisitRequired || isSubmitting;
  
  // Get input background color based on language
  const inputBgColor = isEnglish ? "bg-orange-50" : "bg-purple-50";
  const inputBorderColor = isEnglish ? "border-orange-300" : "border-purple-300";
  const inputTextColor = isEnglish ? "text-orange-900" : "text-purple-900";
  const buttonBgColor = isEnglish 
    ? isFormDisabled ? "bg-gray-400" : "bg-orange-600 hover:bg-orange-700" 
    : isFormDisabled ? "bg-gray-400" : "bg-purple-600 hover:bg-purple-700";
  
  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative">
        {countryVisitRequired && (
          <motion.div 
            className="absolute -top-16 left-0 right-0 bg-yellow-100 p-3 rounded-lg border-2 border-yellow-400 z-10 shadow-md"
            initial={{ opacity: 0, y: -10 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              borderColor: ['#FBBF24', '#F59E0B', '#FBBF24']
            }}
            transition={{ 
              duration: 0.3,
              borderColor: { repeat: Infinity, duration: 2 }
            }}
          >
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-yellow-600" />
              <p className="text-yellow-800 font-bold kids-text text-sm">
                {isEnglish 
                  ? "Visit the unlocked country on the map to continue!" 
                  : "¡Visita el país desbloqueado en el mapa para continuar!"}
              </p>
              <Globe className="h-5 w-5 text-yellow-600" />
            </div>
          </motion.div>
        )}
        
        <div className="flex items-stretch">
          <input
            type="text"
            value={currentWord}
            onChange={handleWordChange}
            disabled={isFormDisabled}
            className={`flex-grow py-3 px-4 rounded-l-md ${inputBgColor} ${inputBorderColor} ${inputTextColor} kids-text text-xl font-normal border-2 focus:outline-none focus:ring-2 focus:ring-purple-400 disabled:bg-gray-100 disabled:text-gray-400 disabled:border-gray-300`}
            placeholder={isEnglish ? "Type a word..." : "Escribe una palabra..."}
          />
          <Button 
            type="submit" 
            disabled={isFormDisabled} 
            className={`rounded-r-md ${buttonBgColor} text-white kids-text text-xl font-normal px-6`}
          >
            {isEnglish ? "GO!" : "¡VAMOS!"}
          </Button>
        </div>
        
        {countryVisitRequired && (
          <div className="mt-2 flex items-center gap-2">
            <MapPin className="h-4 w-4 text-pink-600" />
            <p className="text-sm text-pink-600 kids-text">
              {isEnglish 
                ? "Click on the map flags to explore countries!" 
                : "¡Haz clic en las banderas del mapa para explorar países!"}
            </p>
          </div>
        )}
      </div>
    </form>
  );
};

export default WordInput;
