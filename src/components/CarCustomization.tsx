import React from "react";
import { motion } from "framer-motion";
import { useGame } from "@/context/GameContext";
import { CarColor } from "./games/utils/carUtils";
import { useLanguage } from "@/context/LanguageContext";

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
const CarCustomization: React.FC = () => {
  const {
    selectedCarColor
  } = useGame();
  const {
    isEnglish
  } = useLanguage();
  return;
};
export default CarCustomization;