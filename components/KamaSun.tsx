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
  // Generate 16 solar rays (8 primary tapered crown rays + 8 secondary diamond rays)
  const primaryRays = [0, 45, 90, 135, 180, 225, 270, 315];
  const secondaryRays = [22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5];

  return (
    <div 
      className={`inline-flex items-center justify-center relative flex-shrink-0 ${className}`}
      style={{ width: size, height: size }}
      aria-label="KAMA Sun"
    >
      <motion.svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full overflow-visible"
        animate={animate ? { rotate: 360 } : undefined}
        transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
      >
        <defs>
          <radialGradient id={`sun-glow-${size}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={color} stopOpacity="0.45" />
            <stop offset="60%" stopColor={color} stopOpacity="0.15" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Ambient atmospheric solar halo */}
        <circle cx="50" cy="50" r="46" fill={`url(#sun-glow-${size})`} />

        {/* 8 Primary Majestic Tapered Solar Rays */}
        {primaryRays.map((angle) => (
          <g key={`primary-${angle}`} transform={`rotate(${angle} 50 50)`}>
            {/* Tapered triangular solar ray */}
            <path
              d="M46.5 24L50 4L53.5 24C52.2 24.5 50 25 46.5 24Z"
              fill={color}
            />
          </g>
        ))}

        {/* 8 Secondary Diamond Inter-Rays */}
        {secondaryRays.map((angle) => (
          <g key={`secondary-${angle}`} transform={`rotate(${angle} 50 50)`}>
            <path
              d="M48 24.5L50 11L52 24.5C51.2 24.8 50 25 48 24.5Z"
              fill={color}
              fillOpacity="0.9"
            />
          </g>
        ))}

        {/* Outer Solar Ring / Orbit */}
        <circle
          cx="50"
          cy="50"
          r="23.5"
          stroke={color}
          strokeWidth="1.75"
          strokeOpacity="0.6"
        />

        {/* Core Living Sun Disc */}
        <circle
          cx="50"
          cy="50"
          r="19"
          fill={color}
        />

        {/* Inner Luminous Core Accent */}
        <circle
          cx="50"
          cy="50"
          r="12.5"
          fill="#FFF9E6"
          fillOpacity="0.3"
        />

        {/* Central Solar Spark */}
        <circle
          cx="50"
          cy="50"
          r="5.5"
          fill="#FFFDF7"
          fillOpacity="0.75"
        />
      </motion.svg>
    </div>
  );
}

