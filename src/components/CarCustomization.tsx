import React from "react";
import { motion } from "framer-motion";
import { useGame } from "@/context/GameContext";
import { CarColor } from "./games/utils/carUtils";

// Available car colors - reordered and added new cars
const carColors: CarColor[] = [{
  id: "2",
  name: "Coche Azul",
  image: "cocheazul.png",
  color: "bg-blue-500"
}, {
  id: "3",
  name: "Coche Amarillo",
  image: "cocheamarillo.png",
  color: "bg-yellow-500"
}, {
  id: "1",
  name: "Coche Rojo",
  image: "cocherojo.png",
  color: "bg-red-500"
}, {
  id: "5",
  name: "Coche Verde",
  image: "cocheverde.png",
  color: "bg-green-500"
}, {
  id: "4",
  name: "Coche Morado con Llamas",
  image: "cochecolores.png",
  color: "bg-purple-500"
}, {
  id: "6",
  name: "Coche Negro",
  image: "cochenegro.png",
  color: "bg-gray-900"
}, {
  id: "7",
  name: "Coche Blanco",
  image: "cocheblanco.png",
  color: "bg-gray-100"
}, {
  id: "8",
  name: "Coche Azul Racing",
  image: "cocheformulauno.png",
  color: "bg-sky-400"
}, {
  id: "9",
  name: "Coche Dorado",
  image: "cocheoro.png",
  color: "bg-amber-300"
}];
const CarCustomization: React.FC = () => {
  const {
    selectedCarColor,
    setSelectedCarColor
  } = useGame();

  // Handle car selection
  const handleCarSelect = (car: CarColor) => {
    setSelectedCarColor(car);

    // Play a selection sound
    try {
      const audio = new Audio('/lovable-uploads/level-up.mp3');
      audio.volume = 0.3;
      audio.play();
    } catch (e) {
      console.error("Could not play car selection sound", e);
    }
  };
  return <div className="w-full flex flex-col items-center">
      <div className="flex flex-wrap justify-center gap-4 mb-4 w-full">
        {carColors.map(car => <motion.div key={car.id} whileHover={{
        scale: 1.1
      }} whileTap={{
        scale: 0.95
      }} className={`relative cursor-pointer p-2 rounded-lg ${selectedCarColor?.id === car.id ? 'ring-4 ring-purple-500 bg-purple-100' : ''}`} onClick={() => handleCarSelect(car)}>
            <img src={`/lovable-uploads/${car.image}`} alt={car.name} className="w-16 h-16 object-contain" />
            {selectedCarColor?.id === car.id && <motion.div initial={{
          scale: 0
        }} animate={{
          scale: 1
        }} className="absolute -top-2 -right-2 bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center">
                ✓
              </motion.div>}
          </motion.div>)}
      </div>
      
      {/* Display selected car larger */}
      {selectedCarColor && <motion.div className="mt-2 mb-4" initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      duration: 0.3
    }}>
          
          
        </motion.div>}
    </div>;
};
export default CarCustomization;
