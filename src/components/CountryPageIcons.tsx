
import React from "react";
import { motion } from "framer-motion";
import { Globe, Star, Info } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface CountryPageIconsProps {
  type: "fact" | "language" | "famousFor";
  children: React.ReactNode;
}

const CountryPageIcons: React.FC<CountryPageIconsProps> = ({ type, children }) => {
  const { isEnglish } = useLanguage();
  
  const getIcon = () => {
    switch (type) {
      case "fact":
        return {
          icon: <Info className="w-7 h-7" />,
          color: "text-yellow-500",
          bgColor: "bg-yellow-100",
          borderColor: "border-yellow-300",
          title: isEnglish ? "Fun Fact" : "Dato curioso"
        };
      case "language":
        return {
          icon: <Globe className="w-7 h-7" />,
          color: "text-blue-500",
          bgColor: "bg-blue-100",
          borderColor: "border-blue-300",
          title: isEnglish ? "Language" : "Idioma"
        };
      case "famousFor":
        return {
          icon: <Star className="w-7 h-7" />,
          color: "text-purple-500",
          bgColor: "bg-purple-100",
          borderColor: "border-purple-300",
          title: isEnglish ? "Famous For" : "Famoso por"
        };
      default:
        return {
          icon: <Info className="w-7 h-7" />,
          color: "text-blue-500",
          bgColor: "bg-blue-100",
          borderColor: "border-blue-300",
          title: isEnglish ? "Information" : "Información"
        };
    }
  };

  const iconData = getIcon();

  return (
    <div className={`rounded-lg ${iconData.bgColor} border ${iconData.borderColor} p-4 mb-4`}>
      <div className="flex items-center mb-2">
        <motion.div
          className={`${iconData.color} mr-2`}
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {iconData.icon}
        </motion.div>
        <h3 className="text-xl font-bold kids-text">{iconData.title}</h3>
      </div>
      <div className="kids-text text-gray-700">
        {children}
      </div>
    </div>
  );
};

export default CountryPageIcons;
