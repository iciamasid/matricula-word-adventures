
import React from "react";
import { useGame } from "@/context/GameContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const LevelRewards: React.FC = () => {
  const { destination, destinationInfo } = useGame();
  
  return (
    <motion.div 
      className="w-full max-w-md mt-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <Card className="shadow-lg border-2 border-blue-100">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg text-gray-700 flex items-center justify-center">
            <Sparkles className="h-5 w-5 text-yellow-400 mr-2" />
            Tu recompensa: ¡Conoce el mundo!
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <motion.div 
            className="flex items-center justify-center gap-3"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <motion.div 
              className="bg-game-green/10 p-3 rounded-full"
              animate={{ 
                boxShadow: ['0 0 0 rgba(46, 204, 113, 0)', '0 0 10px rgba(46, 204, 113, 0.5)', '0 0 0 rgba(46, 204, 113, 0)']
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <MapPin className="h-6 w-6 text-game-green" />
            </motion.div>
            <div>
              <div className="flex items-center gap-2">
                <AnimatePresence mode="wait">
                  <motion.p 
                    key={destination}
                    className="text-2xl font-bold"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.3 }}
                  >
                    {destinationInfo.city}
                  </motion.p>
                </AnimatePresence>
                <motion.span 
                  className="text-2xl"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, -10, 0]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 3
                  }}
                >
                  {destinationInfo.flag}
                </motion.span>
              </div>
              <p className="text-sm text-gray-500">{destinationInfo.country}</p>
            </div>
          </motion.div>
          
          <div className="bg-blue-50 p-4 rounded-lg">
            <motion.div 
              className="flex gap-3 items-start"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <motion.div
                animate={{ rotate: [0, 10, 0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="flex-shrink-0 mt-1"
              >
                {"🌟"}
              </motion.div>
              <p className="text-sm text-gray-700">{destinationInfo.fact}</p>
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default LevelRewards;
