import React from "react";
import { motion } from "framer-motion";
import { Globe, Star, Info } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface IconData {
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  borderColor: string;
  title: string;
}

// Update the component to make it work with the way it's being used in CountryPage
const CountryPageIcons = ({ country }: { country: string }) => {
  const { isEnglish } = useLanguage();
  
  // Facts about the country that will be displayed with icons
  const facts = [
    {
      type: "fact",
      content: isEnglish 
        ? `${country} has a rich cultural heritage.` 
        : `${country} tiene un rico patrimonio cultural.`
    },
    {
      type: "language",
      content: isEnglish 
        ? `Learn about the language spoken in ${country}.` 
        : `Aprende sobre el idioma hablado en ${country}.`
    },
    {
      type: "famousFor",
      content: isEnglish 
        ? `${country} is famous for its unique cuisine and landscape.`
        : `${country} es famoso por su cocina única y paisajes.`
    }
  ];
  
  const getIconData = (type: string): IconData => {
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

  return (
    <div className="space-y-4">
      {facts.map((fact, index) => {
        const iconData = getIconData(fact.type);
        
        return (
          <div key={index} className={`rounded-lg ${iconData.bgColor} border ${iconData.borderColor} p-4`}>
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
              {fact.content}
            </div>
          </div>
        );
      })}
    </div>
  );
};

// Keep the original component for backwards compatibility
interface CountryPageIconProps {
  type: "fact" | "language" | "famousFor";
  children: React.ReactNode;
}

export const CountryPageIcon: React.FC<CountryPageIconProps> = ({ type, children }) => {
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
