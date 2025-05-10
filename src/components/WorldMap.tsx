
import React from 'react';
import { motion } from 'framer-motion';

interface WorldMapProps {
  highlightCountry?: string;
}

const WorldMap: React.FC<WorldMapProps> = ({ highlightCountry }) => {
  return (
    <div className="bg-purple-50 h-full w-full flex items-center justify-center p-3">
      <motion.div 
        className="relative w-full h-full"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <svg
          viewBox="0 0 1000 500"
          className="w-full h-full"
          style={{ filter: 'drop-shadow(1px 1px 3px rgba(0,0,0,0.2))' }}
        >
          {/* Simplified world map outlines */}
          <g fill="#d1c2e1" stroke="#9a83b9" strokeWidth="1">
            {/* North America */}
            <path d="M150,120 L280,120 L330,220 L280,270 L210,290 L160,260 L130,200 Z" />
            
            {/* South America */}
            <path d="M230,290 L280,290 L310,380 L270,450 L210,430 L200,340 Z" />
            
            {/* Europe */}
            <path d="M450,120 L550,100 L570,170 L510,190 L480,150 Z" />
            
            {/* Africa */}
            <path d="M450,200 L550,200 L580,300 L530,380 L460,350 L430,270 Z" />
            
            {/* Asia */}
            <path d="M580,100 L800,120 L820,220 L750,300 L620,290 L580,200 L570,170 Z" />
            
            {/* Australia */}
            <path d="M750,320 L850,330 L870,380 L820,410 L760,390 Z" />
          </g>
          
          {/* Highlight the selected country if provided */}
          {highlightCountry && (
            <motion.circle
              cx={highlightCountry === "España" ? 475 : 
                  highlightCountry === "Francia" ? 485 : 
                  highlightCountry === "Italia" ? 505 : 
                  highlightCountry === "Reino Unido" ? 465 : 
                  highlightCountry === "Estados Unidos" ? 200 : 
                  highlightCountry === "Japón" ? 800 : 
                  highlightCountry === "Australia" ? 800 : 
                  highlightCountry === "Brasil" ? 270 : 
                  highlightCountry === "Egipto" ? 510 : 
                  highlightCountry === "China" ? 720 : 
                  highlightCountry === "Sudáfrica" ? 510 : 
                  highlightCountry === "Kenia" ? 530 : 500}
              cy={highlightCountry === "España" ? 150 : 
                  highlightCountry === "Francia" ? 140 : 
                  highlightCountry === "Italia" ? 155 : 
                  highlightCountry === "Reino Unido" ? 120 : 
                  highlightCountry === "Estados Unidos" ? 170 : 
                  highlightCountry === "Japón" ? 180 : 
                  highlightCountry === "Australia" ? 360 : 
                  highlightCountry === "Brasil" ? 350 : 
                  highlightCountry === "Egipto" ? 230 : 
                  highlightCountry === "China" ? 180 : 
                  highlightCountry === "Sudáfrica" ? 350 : 
                  highlightCountry === "Kenia" ? 280 : 250}
              r="20"
              fill="#ff5c8d"
              stroke="#fff"
              strokeWidth="2"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ 
                scale: [0.8, 1.2, 1],
                opacity: 1
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
          )}
          
          {/* Country Labels */}
          {highlightCountry && (
            <motion.text
              x={highlightCountry === "España" ? 475 : 
                 highlightCountry === "Francia" ? 485 : 
                 highlightCountry === "Italia" ? 505 : 
                 highlightCountry === "Reino Unido" ? 465 : 
                 highlightCountry === "Estados Unidos" ? 200 : 
                 highlightCountry === "Japón" ? 800 : 
                 highlightCountry === "Australia" ? 800 : 
                 highlightCountry === "Brasil" ? 270 : 
                 highlightCountry === "Egipto" ? 510 : 
                 highlightCountry === "China" ? 720 : 
                 highlightCountry === "Sudáfrica" ? 510 : 
                 highlightCountry === "Kenia" ? 530 : 500}
              y={highlightCountry === "España" ? 130 : 
                 highlightCountry === "Francia" ? 120 : 
                 highlightCountry === "Italia" ? 135 : 
                 highlightCountry === "Reino Unido" ? 100 : 
                 highlightCountry === "Estados Unidos" ? 150 : 
                 highlightCountry === "Japón" ? 160 : 
                 highlightCountry === "Australia" ? 340 : 
                 highlightCountry === "Brasil" ? 330 : 
                 highlightCountry === "Egipto" ? 210 : 
                 highlightCountry === "China" ? 160 : 
                 highlightCountry === "Sudáfrica" ? 330 : 
                 highlightCountry === "Kenia" ? 260 : 230}
              fontSize="12"
              fontWeight="bold"
              textAnchor="middle"
              fill="#5c0099"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {highlightCountry}
            </motion.text>
          )}
        </svg>
      </motion.div>
    </div>
  );
};

export default WorldMap;
