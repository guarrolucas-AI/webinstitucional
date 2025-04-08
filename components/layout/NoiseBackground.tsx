'use client';

import React from 'react';
import classNames from 'classnames';

interface NoiseBackgroundProps {
  children?: React.ReactNode;
  className?: string;
}

export default function NoiseBackground({ children, className }: NoiseBackgroundProps) {
  return (
    <div className={classNames('w-full h-full', className)}>
      {/* Capa de ruido */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 300 300' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.70'/%3E%3C/svg%3E")`,
          mixBlendMode: 'soft-light',
          opacity: 2,
          pointerEvents: 'none'
        }}
      />
      
      <div className="">
        {children}
      </div>
    </div>
  );
}