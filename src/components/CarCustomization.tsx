
import React from "react";
import { useGame } from "@/context/GameContext";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Car } from "lucide-react";

interface CarOption {
  id: string;
  name: string;
  image: string;
  color: string;
}

const CarCustomization: React.FC = () => {
  const { selectedCarColor, setSelectedCarColor } = useGame();

  const carOptions: CarOption[] = [
    { id: "1", name: "Coche Amarillo", image: "coche_portada.gif", color: "bg-yellow-500" },
    { id: "2", name: "Coche Azul", image: "cocheazul.png", color: "bg-blue-500" },
    { id: "3", name: "Coche Rojo", image: "cocherojo.png", color: "bg-red-500" },
  ];

  return (
    <motion.div
      className="w-full rounded-lg p-4 shadow-lg bg-purple-100"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <div className="text-center mb-3">
        <h3 className="text-xl text-purple-800 kids-text font-normal flex items-center justify-center">
          <Car className="mr-2 h-5 w-5 text-purple-700" />
          Personaliza tu coche
        </h3>
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
              <p className="text-xs text-center kids-text">{car.name}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default CarCustomization;
