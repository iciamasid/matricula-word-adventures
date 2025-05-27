
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Gift, Loader2, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { adService, RewardedAdReward } from '@/services/AdService';
import { toast } from '@/hooks/use-toast';

interface RewardedAdButtonProps {
  onRewardEarned?: (reward: RewardedAdReward) => void;
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const RewardedAdButton: React.FC<RewardedAdButtonProps> = ({
  onRewardEarned,
  disabled = false,
  className = '',
  children
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isAdReady, setIsAdReady] = useState(false);

  useEffect(() => {
    checkAdAvailability();
  }, []);

  const checkAdAvailability = async () => {
    const ready = await adService.isRewardedAdReady();
    setIsAdReady(ready);
  };

  const handleWatchAd = async () => {
    if (disabled || isLoading || !isAdReady) return;

    setIsLoading(true);
    
    try {
      toast({
        title: "🎬 Cargando anuncio...",
        description: "Preparando tu recompensa especial",
        duration: 2000
      });

      const reward = await adService.showRewardedAd();
      
      if (reward) {
        toast({
          title: "🎉 ¡Recompensa ganada!",
          description: `Has ganado ${reward.amount} puntos extra`,
          duration: 4000
        });
        
        onRewardEarned?.(reward);
      } else {
        toast({
          title: "😔 No se pudo mostrar el anuncio",
          description: "Inténtalo de nuevo en unos momentos",
          variant: "destructive",
          duration: 3000
        });
      }
    } catch (error) {
      console.error('RewardedAdButton: Error showing ad:', error);
      toast({
        title: "❌ Error",
        description: "Hubo un problema con el anuncio",
        variant: "destructive",
        duration: 3000
      });
    } finally {
      setIsLoading(false);
      // Recheck availability after showing ad
      setTimeout(checkAdAvailability, 1000);
    }
  };

  const isButtonDisabled = disabled || isLoading || !isAdReady;

  return (
    <motion.div
      whileHover={!isButtonDisabled ? { scale: 1.05 } : {}}
      whileTap={!isButtonDisabled ? { scale: 0.95 } : {}}
      animate={{
        y: isAdReady && !disabled ? [0, -2, 0] : 0,
        boxShadow: isAdReady && !disabled ? [
          "0 4px 6px rgba(0, 0, 0, 0.1)",
          "0 8px 12px rgba(0, 0, 0, 0.15)",
          "0 4px 6px rgba(0, 0, 0, 0.1)"
        ] : "0 4px 6px rgba(0, 0, 0, 0.1)"
      }}
      transition={{
        y: { duration: 2, repeat: Infinity },
        boxShadow: { duration: 2, repeat: Infinity }
      }}
    >
      <Button
        onClick={handleWatchAd}
        disabled={isButtonDisabled}
        className={`bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white border-yellow-400 kids-text font-bold ${className}`}
        size="lg"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            Cargando...
          </>
        ) : (
          <>
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Gift className="w-5 h-5 mr-2" />
            </motion.div>
            {children || (
              <>
                <Play className="w-4 h-4 mr-1" />
                Ver anuncio para puntos extra
              </>
            )}
          </>
        )}
      </Button>
    </motion.div>
  );
};

export default RewardedAdButton;
