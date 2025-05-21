
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { User, Check } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/context/LanguageContext";

interface PlayerNameInputProps {
  onSave: (name: string) => void;
  initialName?: string;
}

const PlayerNameInput: React.FC<PlayerNameInputProps> = ({ onSave, initialName = "" }) => {
  const [name, setName] = useState(initialName);
  const [isEditing, setIsEditing] = useState(!initialName);
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
        title: t("invalid_name"),
        description: t("please_enter_name")
      });
      return;
    }
    
    localStorage.setItem("matriculabraCadabra_playerName", name);
    setIsEditing(false);
    onSave(name);
    
    toast({
      title: t("name_saved"),
      description: `${t("points_saved_as")} ${name}.`
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
              <User className={`w-5 h-5 ${iconColor} mr-2`} />
              <span className={`text-lg font-medium ${textColor} kids-text`}>{name}</span>
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
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={t("your_name")}
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

export default PlayerNameInput;
