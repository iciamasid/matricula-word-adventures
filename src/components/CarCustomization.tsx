
import React from "react";
import { useGame } from "@/context/GameContext";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Car, ChevronUp, ChevronDown, Save } from "lucide-react";

interface CarOption {
  id: string;
  name: string;
  image: string;
  color: string;
}

interface CarCustomizationProps {
  isOpen: boolean;
  onToggle: () => void;
}

const CarCustomization: React.FC<CarCustomizationProps> = ({ isOpen, onToggle }) => {
  const { selectedCarColor, setSelectedCarColor } = useGame();

  const carOptions: CarOption[] = [
    { id: "1", name: "Coche Amarillo", image: "cocheamarillo.png", color: "bg-yellow-500" },
    { id: "2", name: "Coche Azul", image: "cocheazul.png", color: "bg-blue-500" },
    { id: "3", name: "Coche Rojo", image: "cocherojo.png", color: "bg-red-500" },
  ];

  const handleSave = () => {
    onToggle();
  };

  return (
    <motion.div
      className={`w-full rounded-lg p-4 shadow-lg bg-purple-100 ${isOpen ? "block" : "hidden"}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <div className="text-center mb-3 flex justify-between items-center">
        <h3 className="text-xl text-purple-800 kids-text font-normal flex items-center">
          <Car className="mr-2 h-5 w-5 text-purple-700" />
          Selecciona tu coche
        </h3>
        <Button 
          size="sm" 
          variant="outline" 
          className="border-purple-400 text-purple-700 hover:bg-purple-100"
          onClick={handleSave}
        >
          <Save className="h-4 w-4 mr-1" /> Guardar
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {carOptions.map((car) => (
          <motion.div
            key={car.id}
            className={`rounded-lg p-2 cursor-pointer ${
              selectedCarColor?.id === car.id
                ? "ring-2 ring-purple-500 bg-purple-50"
                : "bg-white hover:bg-purple-50"
            }`}
            whileHover={{ scale: 1.05 }}
            onClick={() => setSelectedCarColor(car)}
          >
            <div className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full mb-2 ${car.color}`}></div>
              <img
                src={`/lovable-uploads/${car.image}`}
                alt={car.name}
                className="h-12 w-auto mb-1"
              />
              {/* Car name removed as requested */}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default CarCustomization;
