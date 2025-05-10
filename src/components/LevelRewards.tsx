
import React from "react";
import { useGame } from "@/context/GameContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import { motion } from "framer-motion";
import WorldMap from "./WorldMap";

const LevelRewards: React.FC = () => {
  const { destination, level } = useGame();
  
  return (
    <div className="w-full max-w-xs">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm text-gray-500">Recompensas</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center">
            <div className="bg-game-green/10 p-2 rounded-full mr-3">
              <MapPin className="h-5 w-5 text-game-green" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium">Destino actual</p>
              <motion.p 
                className="text-lg font-semibold"
                key={destination}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {destination}
              </motion.p>
            </div>
          </div>
          
          <WorldMap />
          
          <div className="text-xs text-gray-500 text-center mt-2">
            Siguiente destino en nivel {level + 1}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LevelRewards;
