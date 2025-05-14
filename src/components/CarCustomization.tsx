
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Car, ChevronDown } from "lucide-react";
import { useGame } from "@/context/GameContext";
import { CarColor } from "./games/utils/carUtils";

interface CarCustomizationProps {
  isOpen?: boolean;
  onToggle?: () => void;
  embedded?: boolean;
}

// Available car colors
const carColors: CarColor[] = [
  { id: "1", name: "Coche Rojo", image: "cocherojo.png", color: "bg-red-500" },
  { id: "2", name: "Coche Azul", image: "cocheazul.png", color: "bg-blue-500" },
  { id: "3", name: "Coche Amarillo", image: "cocheamarillo.png", color: "bg-yellow-500" },
];

const CarCustomization: React.FC<CarCustomizationProps> = ({ 
  isOpen = false,
  onToggle = () => {},
  embedded = false
}) => {
  const [open, setOpen] = useState(isOpen);
  const { selectedCarColor, setSelectedCarColor } = useGame();
  
  // Auto-close after selection with a slight delay to show the selection animation
  useEffect(() => {
    if (selectedCarColor && open) {
      const timer = setTimeout(() => {
        setOpen(false);
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [selectedCarColor, open]);
  
  const handleToggle = () => {
    if (embedded) {
      if (onToggle) onToggle();
    } else {
      setOpen(!open);
      if (onToggle) onToggle();
    }
  };
  
  const handleSelectCar = (car: CarColor) => {
    setSelectedCarColor(car);
    
    // Auto-close after selection
    setTimeout(() => {
      if (embedded) {
        if (onToggle) onToggle();
      } else {
        setOpen(false);
      }
    }, 500);
  };
  
  if (embedded) {
    return (
      <div className="w-full">
        <div className="grid grid-cols-3 gap-2">
          {carColors.map((car) => (
            <motion.div
              key={car.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`
                cursor-pointer rounded-md p-2 flex flex-col items-center 
                ${selectedCarColor?.id === car.id ? 'ring-2 ring-purple-500 bg-purple-100' : 'bg-white'}
              `}
              onClick={() => handleSelectCar(car)}
            >
              <img
                src={`/lovable-uploads/${car.image}`}
                alt={car.name}
                className="h-12 w-auto mb-1"
              />
              {/* Remove the text labels as requested */}
            </motion.div>
          ))}
        </div>
      </div>
    );
  }
  
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button
          variant="outline"
          onClick={handleToggle}
          className="flex items-center gap-2 bg-white hover:bg-gray-100"
        >
          <Car size={18} />
          {/* Show only "Selecciona tu coche" instead of the selected car name */}
          Selecciona tu coche
          <ChevronDown size={16} className={open ? "rotate-180" : ""} />
        </Button>
      </DrawerTrigger>
      
      <DrawerContent className="p-4">
        <div className="grid grid-cols-3 gap-4">
          {carColors.map((car) => (
            <motion.div
              key={car.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`
                cursor-pointer rounded-md p-4 flex flex-col items-center 
                ${selectedCarColor?.id === car.id ? 'ring-2 ring-purple-500 bg-purple-100' : 'bg-white'}
              `}
              onClick={() => handleSelectCar(car)}
            >
              <img
                src={`/lovable-uploads/${car.image}`}
                alt={car.name}
                className="h-16 w-auto"
              />
              {/* Remove text labels in drawer as well */}
            </motion.div>
          ))}
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default CarCustomization;
