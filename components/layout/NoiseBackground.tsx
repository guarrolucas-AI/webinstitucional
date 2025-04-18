'use client';

import React from 'react';
import classNames from 'classnames';

interface NoiseBackgroundProps {
  children?: React.ReactNode;
  className?: string;
}

export default function NoiseBackground({ children, className }: NoiseBackgroundProps) {
  return (
    <div className={classNames('relative w-full', className)}>
      <div className="absolute bottom-0 left-0 h-full w-64 rounded-full blur-[100px] z-10"></div>
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 300 300' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.5'/%3E%3C/svg%3E")`,
          mixBlendMode: 'soft-light',
          pointerEvents: 'none',
          opacity: 0.5  ,
        }}
      />

      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
