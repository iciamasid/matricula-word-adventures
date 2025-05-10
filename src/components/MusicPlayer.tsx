
import React, { useState, useRef, useEffect } from "react";
import { Music, VolumeX, Volume2 } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useGame } from "@/context/GameContext";
import { useIsMobile } from "@/hooks/use-mobile";

const MusicPlayer: React.FC = () => {
  const { isMusicPlaying, setIsMusicPlaying, currentLevel, shouldPlayLevelUpSound } = useGame();
  const [volume, setVolume] = useState(0.5);
  const [showVolumeControl, setShowVolumeControl] = useState(false);
  const isMobile = useIsMobile();
  
  const backgroundMusicRef = useRef<HTMLAudioElement | null>(null);
  const levelUpSoundRef = useRef<HTMLAudioElement | null>(null);
  
  // Initialize audio elements
  useEffect(() => {
    backgroundMusicRef.current = new Audio('/lovable-uploads/background-music.mp3');
    backgroundMusicRef.current.loop = true;
    backgroundMusicRef.current.volume = volume;
    
    levelUpSoundRef.current = new Audio('/lovable-uploads/level-up.mp3');
    levelUpSoundRef.current.volume = volume;
    
    // Clean up
    return () => {
      if (backgroundMusicRef.current) {
        backgroundMusicRef.current.pause();
        backgroundMusicRef.current = null;
      }
      if (levelUpSoundRef.current) {
        levelUpSoundRef.current = null;
      }
    };
  }, []);
  
  // Handle volume change
  useEffect(() => {
    if (backgroundMusicRef.current) {
      backgroundMusicRef.current.volume = volume;
    }
    if (levelUpSoundRef.current) {
      levelUpSoundRef.current.volume = volume;
    }
  }, [volume]);
  
  // Handle music play/pause
  useEffect(() => {
    if (!backgroundMusicRef.current) return;
    
    if (isMusicPlaying) {
      backgroundMusicRef.current.play().catch((error) => {
        console.log("Autoplay prevented:", error);
        setIsMusicPlaying(false);
      });
    } else {
      backgroundMusicRef.current.pause();
    }
  }, [isMusicPlaying, setIsMusicPlaying]);
  
  // Handle level up sound
  useEffect(() => {
    if (!levelUpSoundRef.current || !shouldPlayLevelUpSound) return;
    
    levelUpSoundRef.current.currentTime = 0;
    levelUpSoundRef.current.play().catch(error => 
      console.log("Couldn't play level up sound:", error)
    );
  }, [shouldPlayLevelUpSound]);
  
  // Auto-pause when tab is inactive
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && backgroundMusicRef.current && isMusicPlaying) {
        backgroundMusicRef.current.pause();
      } else if (!document.hidden && backgroundMusicRef.current && isMusicPlaying) {
        backgroundMusicRef.current.play().catch(e => console.log(e));
      }
    };
    
    document.addEventListener("visibilitychange", handleVisibilityChange);
    
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [isMusicPlaying]);
  
  const toggleMusic = () => {
    setIsMusicPlaying(!isMusicPlaying);
  };
  
  return (
    <motion.div
      className="fixed bottom-4 right-4 z-50 flex items-center gap-2"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      onMouseEnter={() => setShowVolumeControl(true)}
      onMouseLeave={() => setShowVolumeControl(false)}
    >
      {showVolumeControl && !isMobile && (
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: "auto", opacity: 1 }}
          exit={{ width: 0, opacity: 0 }}
          className="bg-white/80 rounded-full p-2 mr-2"
        >
          <div className="w-24 flex items-center gap-2">
            <VolumeX className="h-4 w-4 text-purple-800" />
            <Slider
              value={[volume * 100]}
              onValueChange={(val) => setVolume(val[0] / 100)}
              max={100}
              step={1}
              className="cursor-pointer"
            />
            <Volume2 className="h-4 w-4 text-purple-800" />
          </div>
        </motion.div>
      )}
      
      <Button
        onClick={toggleMusic}
        size="icon"
        className={`rounded-full ${
          isMusicPlaying ? "bg-purple-600" : "bg-purple-400"
        } hover:bg-purple-700 text-white`}
        aria-label={isMusicPlaying ? "Pausar música" : "Reproducir música"}
      >
        <Music className={`h-4 w-4 ${isMusicPlaying ? "animate-pulse" : ""}`} />
      </Button>
    </motion.div>
  );
};

export default MusicPlayer;
