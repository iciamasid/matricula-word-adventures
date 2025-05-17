
import React from 'react';
import AdSense from './AdSense';
import { useIsMobile } from '@/hooks/use-mobile';

interface AdBannerProps {
  position: 'top' | 'bottom' | 'sidebar' | 'in-content';
  className?: string;
}

const AdBanner: React.FC<AdBannerProps> = ({ position, className = '' }) => {
  const isMobile = useIsMobile();
  
  // Configuraciones específicas basadas en la posición
  const getAdConfig = () => {
    switch (position) {
      case 'top':
        return {
          slot: '1234567890', // Reemplazar con tu slot ID real
          format: 'horizontal' as const,
          className: `w-full ${isMobile ? 'h-[100px]' : 'h-[120px]'} ${className}`,
          style: { minHeight: isMobile ? '100px' : '120px' }
        };
      case 'bottom':
        return {
          slot: '0987654321', // Reemplazar con tu slot ID real
          format: 'horizontal' as const,
          className: `w-full ${isMobile ? 'h-[100px]' : 'h-[120px]'} ${className}`,
          style: { minHeight: isMobile ? '100px' : '120px' }
        };
      case 'sidebar':
        return {
          slot: '1122334455', // Reemplazar con tu slot ID real
          format: 'vertical' as const,
          className: `${className}`,
          style: { minHeight: '600px', width: isMobile ? '300px' : '300px' }
        };
      case 'in-content':
      default:
        return {
          slot: '5566778899', // Reemplazar con tu slot ID real
          format: 'rectangle' as const,
          className: `w-full ${className}`,
          style: { minHeight: '250px' }
        };
    }
  };
  
  const config = getAdConfig();

  return (
    <div className={`ad-banner ${position}-ad bg-white/30 backdrop-blur-sm rounded-lg overflow-hidden shadow-sm border border-gray-200/20 flex items-center justify-center ${config.className}`}>
      <AdSense
        slot={config.slot}
        format={config.format}
        style={config.style}
      />
    </div>
  );
};

export default AdBanner;
