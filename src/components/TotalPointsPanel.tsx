import React from "react";
import { motion } from "framer-motion";
import { useGame } from "@/context/GameContext";
import { Navigation, Star } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
const TotalPointsPanel: React.FC = () => {
  const {
    totalPoints
  } = useGame();
  const {
    t
  } = useLanguage();
  return;
};
export default TotalPointsPanel;