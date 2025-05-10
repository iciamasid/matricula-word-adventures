
import React from "react";
import { useGame } from "@/context/GameContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import WorldMap from "./WorldMap";

const LevelRewards: React.FC = () => {
  const { destination, level } = useGame();
  
  return (
    <motion.div 
      className="w-full max-w-xs"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <Card className="shadow-lg border-2 border-blue-100">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm text-gray-500 flex items-center">
            <Sparkles className="h-4 w-4 text-yellow-400 mr-2" />
            Recompensas
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <motion.div 
            className="flex items-center"
            whileHover={{ scale: 1.02, x: 5 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <motion.div 
              className="bg-game-green/10 p-2 rounded-full mr-3"
              animate={{ 
                boxShadow: ['0 0 0 rgba(46, 204, 113, 0)', '0 0 10px rgba(46, 204, 113, 0.5)', '0 0 0 rgba(46, 204, 113, 0)']
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <MapPin className="h-5 w-5 text-game-green" />
            </motion.div>
            <div className="space-y-1">
              <p className="text-sm font-medium">Destino actual</p>
              <AnimatePresence mode="wait">
                <motion.p 
                  key={destination}
                  className="text-xl font-bold"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  {destination}
                </motion.p>
              </AnimatePresence>
            </div>
          </motion.div>
          
          <WorldMap />
          
          <motion.div 
            className="text-xs text-gray-500 text-center mt-2"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Siguiente destino en nivel {level + 1}
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default LevelRewards;
