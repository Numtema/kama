'use client';

import React from 'react';
import { motion } from 'motion/react';

interface KamaSunProps {
  className?: string;
  size?: number;
  animate?: boolean;
  color?: string;
}

export function KamaSun({ 
  className = '', 
  size = 28, 
  animate = false,
  color = '#F2B844'
}: KamaSunProps) {
  return (
    <div 
      className={`inline-flex items-center justify-center relative flex-shrink-0 ${className}`}
      style={{ width: size, height: size }}
    >
      <motion.svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full overflow-visible"
        animate={animate ? { rotate: [0, 6, -6, 0] } : undefined}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Subtle glow aura */}
        <circle cx="50" cy="50" r="28" fill={color} fillOpacity="0.18" />
        
        {/* Core central sun disc */}
        <circle cx="50" cy="50" r="18" fill={color} />
        
        {/* Inner subtle core */}
        <circle cx="50" cy="50" r="10" fill="#FFF2CE" fillOpacity="0.4" />

        {/* 8 Symmetrical sleek editorial solar rays */}
        {/* Cardinal North */}
        <line x1="50" y1="18" x2="50" y2="4" stroke={color} strokeWidth="4.5" strokeLinecap="round" />
        {/* Cardinal South */}
        <line x1="50" y1="82" x2="50" y2="96" stroke={color} strokeWidth="4.5" strokeLinecap="round" />
        {/* Cardinal West */}
        <line x1="18" y1="50" x2="4" y2="50" stroke={color} strokeWidth="4.5" strokeLinecap="round" />
        {/* Cardinal East */}
        <line x1="82" y1="50" x2="96" y2="50" stroke={color} strokeWidth="4.5" strokeLinecap="round" />

        {/* Diagonal North-West */}
        <line x1="27" y1="27" x2="16" y2="16" stroke={color} strokeWidth="3.5" strokeLinecap="round" strokeOpacity="0.85" />
        {/* Diagonal North-East */}
        <line x1="73" y1="27" x2="84" y2="16" stroke={color} strokeWidth="3.5" strokeLinecap="round" strokeOpacity="0.85" />
        {/* Diagonal South-West */}
        <line x1="27" y1="73" x2="16" y2="84" stroke={color} strokeWidth="3.5" strokeLinecap="round" strokeOpacity="0.85" />
        {/* Diagonal South-East */}
        <line x1="73" y1="73" x2="84" y2="84" stroke={color} strokeWidth="3.5" strokeLinecap="round" strokeOpacity="0.85" />
      </motion.svg>
    </div>
  );
}
