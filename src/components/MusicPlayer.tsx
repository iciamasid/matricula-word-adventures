
import React, { useState, useRef, useEffect } from "react";
import { VolumeX, Volume2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useGame } from "@/context/GameContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { useToast } from "@/hooks/use-toast";

const MusicPlayer: React.FC = () => {
  const { isMusicPlaying, setIsMusicPlaying, currentLevel, shouldPlayLevelUpSound } = useGame();
  const [volume, setVolume] = useState(0.5);
  const [showVolumeControl, setShowVolumeControl] = useState(false);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);
  const isMobile = useIsMobile();
  const { toast } = useToast();
  
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
        setAutoplayBlocked(true);
        setIsMusicPlaying(false);
        
        // Show toast notification about autoplay being blocked
        toast({
          title: "¡Música bloqueada!",
          description: "Toca en cualquier parte de la pantalla y luego pulsa el botón de sonido",
        });
      });
    } else {
      backgroundMusicRef.current.pause();
    }
  }, [isMusicPlaying, setIsMusicPlaying, toast]);
  
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
  
  // Handle first user interaction to enable autoplay
  useEffect(() => {
    const handleUserInteraction = () => {
      if (autoplayBlocked && backgroundMusicRef.current) {
        setAutoplayBlocked(false);
        setIsMusicPlaying(true);
        backgroundMusicRef.current.play().catch(e => console.log(e));
        document.removeEventListener('click', handleUserInteraction);
      }
    };

    if (autoplayBlocked) {
      document.addEventListener('click', handleUserInteraction);
    }
    
    return () => {
      document.removeEventListener('click', handleUserInteraction);
    };
  }, [autoplayBlocked, setIsMusicPlaying]);
  
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
      onTouchStart={() => {
        setShowVolumeControl(true);
        setTimeout(() => setShowVolumeControl(false), 3000);
      }}
    >
      <AnimatePresence>
        {(showVolumeControl || isMobile) && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "auto", opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            className="bg-white/80 backdrop-blur-sm rounded-full p-2 mr-2"
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
      </AnimatePresence>
      
      <Button
        onClick={toggleMusic}
        size="icon"
        className={`rounded-full ${
          isMusicPlaying ? "bg-purple-600" : "bg-purple-400"
        } hover:bg-purple-700 text-white`}
        aria-label={isMusicPlaying ? "Silenciar música" : "Activar música"}
      >
        {isMusicPlaying ? (
          <Volume2 className="h-4 w-4 animate-pulse" />
        ) : (
          <VolumeX className="h-4 w-4" />
        )}
      </Button>
    </motion.div>
  );
};

export default MusicPlayer;
