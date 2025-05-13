
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { User, Check } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/context/LanguageContext";

interface PlayerAgeInputProps {
  onSave?: (age: number) => void; // Make onSave optional
  initialAge?: number;
}

const PlayerAgeInput: React.FC<PlayerAgeInputProps> = ({ onSave, initialAge }) => {
  const [age, setAge] = useState<string>(initialAge?.toString() || "");
  const [isEditing, setIsEditing] = useState(!initialAge);
  const { toast } = useToast();
  const { t, isEnglish } = useLanguage();

  // Determine theme colors based on language
  const buttonTheme = isEnglish 
    ? "bg-game-orange hover:bg-game-orange/90" 
    : "bg-game-purple hover:bg-game-purple/90";
  
  const borderColor = isEnglish
    ? "border-orange-400 text-orange-700 hover:bg-orange-100"
    : "border-purple-400 text-purple-700 hover:bg-purple-100";
  
  const textColor = isEnglish ? "text-orange-800" : "text-purple-800";
  const iconColor = isEnglish ? "text-orange-600" : "text-purple-600";

  // Load saved age from localStorage on component mount
  useEffect(() => {
    const savedAge = localStorage.getItem("matriculabraCadabra_playerAge");
    if (savedAge) {
      setAge(savedAge);
      setIsEditing(false);
      // Only call onSave if it's actually a function
      if (onSave && typeof onSave === 'function') {
        onSave(parseInt(savedAge));
      } else {
        // If no onSave function is provided, just save to localStorage
        localStorage.setItem("matriculabraCadabra_playerAge", savedAge);
      }
    }
  }, [onSave]);

  const handleSave = () => {
    const ageNum = parseInt(age);
    if (isNaN(ageNum) || ageNum < 1 || ageNum > 120) {
      toast({
        title: t("invalid_age"),
        description: t("please_enter_age")
      });
      return;
    }
    
    localStorage.setItem("matriculabraCadabra_playerAge", ageNum.toString());
    setIsEditing(false);
    
    // Only call onSave if it's actually a function
    if (onSave && typeof onSave === 'function') {
      onSave(ageNum);
    }
    
    toast({
      title: t("age_saved"),
      description: `${t("your_age_has_been_saved")}`
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSave();
    }
  };

  return (
    <motion.div
      className="bg-white/90 rounded-lg p-3 shadow-md mb-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="flex items-center gap-2">
        {!isEditing ? (
          <>
            <div className="flex items-center flex-grow">
              <User className={`w-5 h-5 ${iconColor} mr-2`} />
              <span className={`text-lg font-medium ${textColor} kids-text`}>{age} {t("years")}</span>
            </div>
            <Button
              size="sm"
              variant="outline"
              className={borderColor}
              onClick={() => setIsEditing(true)}
            >
              {t("edit")}
            </Button>
          </>
        ) : (
          <div className="flex w-full gap-2">
            <Input
              type="number"
              min="1"
              max="120"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={t("your_age")}
              className="flex-grow kids-text"
              autoFocus
            />
            <Button 
              onClick={handleSave}
              size="sm" 
              variant="default"
              className={buttonTheme}
            >
              <Check className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default PlayerAgeInput;
