
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { User, Check } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

interface PlayerNameInputProps {
  onSave: (name: string) => void;
  initialName?: string;
}

const PlayerNameInput: React.FC<PlayerNameInputProps> = ({ onSave, initialName = "" }) => {
  const [name, setName] = useState(initialName);
  const [isEditing, setIsEditing] = useState(!initialName);
  const { toast } = useToast();

  // Load saved name from localStorage on component mount
  useEffect(() => {
    const savedName = localStorage.getItem("matriculabraCadabra_playerName");
    if (savedName) {
      setName(savedName);
      setIsEditing(false);
      onSave(savedName);
    }
  }, [onSave]);

  const handleSave = () => {
    if (name.trim() === "") {
      toast({
        title: "Nombre no válido",
        description: "Por favor, introduce tu nombre para continuar."
      });
      return;
    }
    
    localStorage.setItem("matriculabraCadabra_playerName", name);
    setIsEditing(false);
    onSave(name);
    
    toast({
      title: "¡Nombre guardado!",
      description: `Tus puntos serán guardados como ${name}.`
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
      transition={{ delay: 0.1 }}
    >
      <div className="flex items-center gap-2">
        {!isEditing ? (
          <>
            <div className="flex items-center flex-grow">
              <User className="w-5 h-5 text-purple-600 mr-2" />
              <span className="text-lg font-medium text-purple-800 kids-text">{name}</span>
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

export default PlayerNameInput;
