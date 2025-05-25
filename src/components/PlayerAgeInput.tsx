
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar, Check } from "lucide-react";
import { motion } from "framer-motion";
import AgeSavedPopup from "@/components/AgeSavedPopup";

interface PlayerAgeInputProps {
  onSave: (age: number) => void;
  initialAge?: number;
}

const PlayerAgeInput: React.FC<PlayerAgeInputProps> = ({ onSave, initialAge }) => {
  const [age, setAge] = useState(initialAge?.toString() || "");
  const [isEditing, setIsEditing] = useState(!initialAge);
  const [showAgeSavedPopup, setShowAgeSavedPopup] = useState(false);

  // Detect current game type for theming
  const isMotorcycleGame = window.location.pathname.includes('motorcycle');
  
  // Determine theme colors based on game type
  const buttonTheme = isMotorcycleGame 
    ? "bg-teal-600 hover:bg-teal-700" 
    : "bg-game-purple hover:bg-game-purple/90";
  
  const borderColor = isMotorcycleGame
    ? "border-teal-400 text-teal-700 hover:bg-teal-100"
    : "border-purple-400 text-purple-700 hover:bg-purple-100";
  
  const textColor = isMotorcycleGame ? "text-teal-800" : "text-purple-800";
  const iconColor = isMotorcycleGame ? "text-teal-600" : "text-purple-600";

  // Load saved age from localStorage on component mount
  useEffect(() => {
    const savedAge = localStorage.getItem("matriculabraCadabra_playerAge");
    if (savedAge) {
      const ageNumber = parseInt(savedAge);
      setAge(savedAge);
      setIsEditing(false);
      onSave(ageNumber);
    } else {
      setIsEditing(true);
    }
  }, [onSave]);

  const handleSave = () => {
    const ageNumber = parseInt(age);
    if (isNaN(ageNumber) || ageNumber < 3 || ageNumber > 99) {
      return;
    }
    
    localStorage.setItem("matriculabraCadabra_playerAge", age);
    setIsEditing(false);
    onSave(ageNumber);
    
    // Show friendly popup instead of toast
    setShowAgeSavedPopup(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSave();
    }
  };

  return (
    <>
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
                <Calendar className={`w-5 h-5 ${iconColor} mr-2`} />
                <span className={`text-lg font-medium ${textColor} kids-text`}>{age} años</span>
              </div>
              <Button
                size="sm"
                variant="outline"
                className={borderColor}
                onClick={() => setIsEditing(true)}
              >
                Editar
              </Button>
            </>
          ) : (
            <div className="flex w-full gap-2">
              <Input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Tu edad"
                min={3}
                max={99}
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

      <AgeSavedPopup 
        open={showAgeSavedPopup}
        onClose={() => setShowAgeSavedPopup(false)}
        age={parseInt(age)}
      />
    </>
  );
};

export default PlayerAgeInput;
