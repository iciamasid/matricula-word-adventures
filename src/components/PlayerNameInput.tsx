
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { User, Check, Child } from "lucide-react";
import { motion } from "framer-motion";
import NameSavedPopup from "@/components/NameSavedPopup";

interface PlayerNameInputProps {
  onSave: (name: string) => void;
  initialName?: string;
}

const PlayerNameInput: React.FC<PlayerNameInputProps> = ({ onSave, initialName = "" }) => {
  const [name, setName] = useState(initialName);
  const [isEditing, setIsEditing] = useState(!initialName);
  const [showNameSavedPopup, setShowNameSavedPopup] = useState(false);

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

  // Simple gender detection function
  const detectGender = (playerName: string) => {
    const femaleNames = [
      'ana', 'maria', 'carmen', 'isabel', 'dolores', 'pilar', 'josefa', 'francisca', 'antonia', 'mercedes',
      'elena', 'laura', 'paula', 'sofia', 'lucia', 'alba', 'noa', 'emma', 'julia', 'claudia',
      'aitana', 'chloe', 'valentina', 'valeria', 'daniela', 'natalia', 'olivia', 'carla', 'sara',
      'marta', 'andrea', 'cristina', 'patricia', 'monica', 'raquel', 'beatriz', 'clara', 'irene'
    ];
    
    const normalizedName = playerName.toLowerCase().trim();
    return femaleNames.includes(normalizedName) ? 'girl' : 'boy';
  };

  // Load saved name from localStorage on component mount
  useEffect(() => {
    const savedName = localStorage.getItem("matriculabraCadabra_playerName");
    if (savedName) {
      setName(savedName);
      setIsEditing(false);
      onSave(savedName);
    } else {
      // No saved name, make sure editing mode is active
      setIsEditing(true);
    }
  }, [onSave]);

  const handleSave = () => {
    if (name.trim() === "") {
      return;
    }
    
    localStorage.setItem("matriculabraCadabra_playerName", name);
    setIsEditing(false);
    onSave(name);
    
    // Show friendly popup instead of toast
    setShowNameSavedPopup(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSave();
    }
  };

  const getChildIcon = () => {
    const gender = detectGender(name);
    return gender === 'girl' ? (
      <svg className={`w-5 h-5 ${iconColor} mr-2`} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm-1.5 6h3c.8 0 1.5.7 1.5 1.5v6c0 .8-.7 1.5-1.5 1.5h-.5v5c0 .6-.4 1-1 1s-1-.4-1-1v-5h-.5c-.8 0-1.5-.7-1.5-1.5v-6c0-.8.7-1.5 1.5-1.5z"/>
        <circle cx="8" cy="6" r="1.5" fill="currentColor" opacity="0.5"/>
        <circle cx="16" cy="6" r="1.5" fill="currentColor" opacity="0.5"/>
      </svg>
    ) : (
      <svg className={`w-5 h-5 ${iconColor} mr-2`} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm-1.5 6h3c.8 0 1.5.7 1.5 1.5v6c0 .8-.7 1.5-1.5 1.5h-.5v5c0 .6-.4 1-1 1s-1-.4-1-1v-5h-.5c-.8 0-1.5-.7-1.5-1.5v-6c0-.8.7-1.5 1.5-1.5z"/>
        <rect x="9" y="15" width="2" height="7" fill="currentColor"/>
        <rect x="13" y="15" width="2" height="7" fill="currentColor"/>
      </svg>
    );
  };

  return (
    <>
      <motion.div
        className="bg-white/90 rounded-lg p-3 shadow-md mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="flex items-center gap-2">
          {!isEditing ? (
            <>
              <div className="flex items-center flex-grow">
                {getChildIcon()}
                <span className={`text-lg font-medium ${textColor} kids-text`}>{name}</span>
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
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Tu nombre"
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

      <NameSavedPopup 
        open={showNameSavedPopup}
        onClose={() => setShowNameSavedPopup(false)}
        playerName={name}
        gender={detectGender(name)}
      />
    </>
  );
};

export default PlayerNameInput;
