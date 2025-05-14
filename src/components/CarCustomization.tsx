import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Car, ChevronDown } from "lucide-react";
import { useGame } from "@/context/GameContext";
import { CarColor } from "./games/utils/carUtils";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useLanguage } from "@/context/LanguageContext";
interface CarCustomizationProps {
  isOpen?: boolean;
  onToggle?: () => void;
  embedded?: boolean;
}

// Available car colors
const carColors: CarColor[] = [{
  id: "1",
  name: "Coche Rojo",
  image: "cocherojo.png",
  color: "bg-red-500"
}, {
  id: "2",
  name: "Coche Azul",
  image: "cocheazul.png",
  color: "bg-blue-500"
}, {
  id: "3",
  name: "Coche Amarillo",
  image: "cocheamarillo.png",
  color: "bg-yellow-500"
}];
const CarCustomization: React.FC<CarCustomizationProps> = ({
  isOpen = false,
  onToggle = () => {},
  embedded = false
}) => {
  const [open, setOpen] = useState(false);
  const {
    selectedCarColor,
    setSelectedCarColor
  } = useGame();
  const {
    isEnglish
  } = useLanguage();

  // Get the selected car image
  const selectedCarImage = selectedCarColor?.image ? `/lovable-uploads/${selectedCarColor.image}` : null;

  // Auto-close after selection with a sufficient delay to allow user selection
  useEffect(() => {
    // Only close if a car has been selected AND the user has clicked on it (not on initial render)
    if (selectedCarColor && open) {
      const timer = setTimeout(() => {
        setOpen(false);
        if (onToggle) onToggle();
      }, 2000); // 2 seconds delay to ensure user has time to see the selection
      return () => clearTimeout(timer);
    }
  }, [selectedCarColor, open, onToggle]);
  const handleSelectCar = (car: CarColor) => {
    setSelectedCarColor(car);
    // No auto-close here, the effect will handle it with a delay
  };
  return <div className="w-full">
      <Collapsible open={open} onOpenChange={setOpen} className="w-full">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {selectedCarImage && <img src={selectedCarImage} alt="Selected car" className="h-10 w-auto" />}
          </div>
          <CollapsibleTrigger asChild>
            <Button variant="outline" size="sm" className={`${isEnglish ? 'border-orange-400 text-orange-700 hover:bg-orange-100' : 'border-purple-400 text-purple-700 hover:bg-purple-100'} flex items-center gap-2`}>
              <Car className="h-4 w-4" />
              <span className="kids-text text-base">
                {isEnglish ? "Select car" : "Selecciona tu coche"}
              </span>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </CollapsibleTrigger>
        </div>
        
        <CollapsibleContent className="mt-2">
          <div className="grid grid-cols-3 gap-2">
            {carColors.map(car => <motion.div key={car.id} whileHover={{
            scale: 1.05
          }} whileTap={{
            scale: 0.95
          }} className={`
                  cursor-pointer rounded-md p-2 flex flex-col items-center 
                  ${selectedCarColor?.id === car.id ? 'ring-2 ring-purple-500 bg-purple-100' : 'bg-white'}
                `} onClick={() => handleSelectCar(car)}>
                <img src={`/lovable-uploads/${car.image}`} alt={car.name} className="h-12 w-auto mb-1" />
                {/* No text labels for cleaner UI */}
              </motion.div>)}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>;
};
export default CarCustomization;