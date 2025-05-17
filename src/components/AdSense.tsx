
import React, { useEffect, useRef } from 'react';

interface AdSenseProps {
  slot?: string;
  format?: 'auto' | 'rectangle' | 'horizontal' | 'vertical';
  style?: React.CSSProperties;
  className?: string;
}

const AdSense: React.FC<AdSenseProps> = ({ 
  slot = '', 
  format = 'auto',
  style = {},
  className = ''
}) => {
  const adRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Solo ejecutar en cliente
    if (typeof window === 'undefined') return;
    
    try {
      // Esperar a que AdSense esté cargado
      if (adRef.current && (window as any).adsbygoogle) {
        (window as any).adsbygoogle = (window as any).adsbygoogle || [];
        (window as any).adsbygoogle.push({});
      }
    } catch (error) {
      console.error('Error al cargar el anuncio:', error);
    }
  }, []);

  return (
    <div className={`ad-container my-4 overflow-hidden rounded-lg ${className}`} style={style}>
      <ins
        className="adsbygoogle"
        style={{
          display: 'block',
          overflow: 'hidden', 
          ...style
        }}
        data-ad-client="ca-pub-4321448416977763"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
};

export default AdSense;
