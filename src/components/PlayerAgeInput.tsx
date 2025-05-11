
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { User, Check } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

interface PlayerAgeInputProps {
  onSave: (age: number) => void;
  initialAge?: number;
}

const PlayerAgeInput: React.FC<PlayerAgeInputProps> = ({ onSave, initialAge }) => {
  const [age, setAge] = useState<string>(initialAge?.toString() || "");
  const [isEditing, setIsEditing] = useState(!initialAge);
  const { toast } = useToast();

  // Load saved age from localStorage on component mount
  useEffect(() => {
    const savedAge = localStorage.getItem("matriculabraCadabra_playerAge");
    if (savedAge) {
      setAge(savedAge);
      setIsEditing(false);
      onSave(parseInt(savedAge));
    }
  }, [onSave]);

  const handleSave = () => {
    const ageNum = parseInt(age);
    if (isNaN(ageNum) || ageNum < 1 || ageNum > 120) {
      toast({
        title: "Edad no válida",
        description: "Por favor, introduce una edad entre 1 y 120 años."
      });
      return;
    }
    
    localStorage.setItem("matriculabraCadabra_playerAge", ageNum.toString());
    setIsEditing(false);
    onSave(ageNum);
    
    toast({
      title: "¡Edad guardada!",
      description: `Tu edad (${ageNum}) ha sido guardada.`
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
              <User className="w-5 h-5 text-purple-600 mr-2" />
              <span className="text-lg font-medium text-purple-800 kids-text">{age} años</span>
            </div>
            <Button
              size="sm"
              variant="outline"
              className="border-purple-400 text-purple-700 hover:bg-purple-100"
              onClick={() => setIsEditing(true)}
            >
              Cambiar
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
              placeholder="Tu edad"
              className="flex-grow kids-text"
              autoFocus
            />
            <Button 
              onClick={handleSave}
              size="sm" 
              variant="default"
              className="bg-game-purple hover:bg-game-purple/90"
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
