
import React from "react";
import { useGame } from "@/context/GameContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Sparkles, Award, Star, CarFront } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const LevelRewards: React.FC = () => {
  const { destination, destinationInfo } = useGame();
  const navigate = useNavigate();
  
  const handleExploreCountry = () => {
    navigate(`/country/${destinationInfo.country}`);
  };
  
  return (
    <motion.div 
      className="w-full max-w-md mt-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <Card className="shadow-lg border-2 border-purple-300 bg-purple-50">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl text-purple-800 flex items-center justify-center kids-text">
            <Sparkles className="h-6 w-6 text-yellow-500 mr-2" />
            ¡Tu recompensa: Conoce el mundo!
            <motion.div
              animate={{ rotate: [0, 10, 0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="ml-2"
            >
              <Star className="h-6 w-6 text-yellow-500" />
            </motion.div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <motion.div 
            className="flex items-center justify-center gap-3"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <motion.div 
              className="bg-purple-200 p-3 rounded-full"
              animate={{ 
                boxShadow: ['0 0 0 rgba(147, 51, 234, 0)', '0 0 15px rgba(147, 51, 234, 0.7)', '0 0 0 rgba(147, 51, 234, 0)']
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <MapPin className="h-7 w-7 text-purple-700" />
            </motion.div>
            <div>
              <div className="flex items-center gap-2">
                <AnimatePresence mode="wait">
                  <motion.p 
                    key={destination}
                    className="text-3xl font-bold text-purple-900 kids-text"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.3 }}
                  >
                    {destinationInfo.city}
                  </motion.p>
                </AnimatePresence>
                <motion.span 
                  className="text-5xl"
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
              <p className="text-xl text-purple-700 font-medium kids-text">{destinationInfo.country}</p>
            </div>
          </motion.div>
          
          <div className="bg-purple-100 p-4 rounded-lg border border-purple-200">
            <div className="flex justify-end">
              <motion.div 
                animate={{ x: [0, 10, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="mb-2"
              >
                <CarFront size={36} className="text-purple-600" />
              </motion.div>
            </div>
            
            <motion.div 
              className="flex gap-3 items-start"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <motion.div
                animate={{ rotate: [0, 10, 0, -10, 0], scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="flex-shrink-0 mt-1 text-3xl"
              >
                {"🌟"}
              </motion.div>
              <p className="text-lg text-purple-800 leading-relaxed kids-text reward-text">{destinationInfo.fact}</p>
            </motion.div>
            
            {destinationInfo.city && (
              <motion.div
                className="mt-4 flex flex-col items-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 }}
              >
                <div className="flex items-center mb-3">
                  <Award className="text-yellow-500 h-10 w-10 mr-2" />
                  <motion.p 
                    className="text-center text-purple-900 font-medium text-xl kids-text"
                    animate={{ 
                      color: ['#6b46c1', '#b794f4', '#6b46c1']
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    ¡Has desbloqueado {destinationInfo.city}!
                  </motion.p>
                </div>
                
                <Button 
                  onClick={handleExploreCountry}
                  className="bg-purple-600 hover:bg-purple-700 text-white font-bold text-lg px-6 py-3 kids-text"
                >
                  Conoce {destinationInfo.country} {destinationInfo.flag}
                </Button>
              </motion.div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default LevelRewards;
