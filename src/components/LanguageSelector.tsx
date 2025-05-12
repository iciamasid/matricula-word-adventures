
import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const LanguageSelector: React.FC = () => {
  const { language, setLanguage, isSpanish, isEnglish } = useLanguage();

  return (
    <motion.div
      className="fixed top-14 left-2 z-50 flex gap-2 rounded-lg p-2 bg-white/80 backdrop-blur-sm shadow-md"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <Button
        variant="ghost"
        size="sm"
        className={`flex items-center gap-1 ${
          isSpanish 
            ? "bg-purple-200 text-purple-800 hover:bg-purple-300" 
            : "hover:bg-purple-100 text-gray-700"
        }`}
        onClick={() => setLanguage('es')}
      >
        <span className="text-xl mr-1">🇪🇸</span>
        <span className={`text-sm ${isSpanish ? "font-bold" : "font-normal"}`}>ES</span>
      </Button>
      
      <Button
        variant="ghost"
        size="sm"
        className={`flex items-center gap-1 ${
          isEnglish 
            ? "bg-orange-200 text-orange-800 hover:bg-orange-300" 
            : "hover:bg-orange-100 text-gray-700"
        }`}
        onClick={() => setLanguage('en')}
      >
        <span className="text-xl mr-1">🇬🇧</span>
        <span className={`text-sm ${isEnglish ? "font-bold" : "font-normal"}`}>EN</span>
      </Button>
    </motion.div>
  );
};

export default LanguageSelector;
