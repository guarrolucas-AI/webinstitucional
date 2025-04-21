'use client';

import React from 'react';
import classNames from 'classnames';

interface ColorsBgProps {
  children?: React.ReactNode;
  className?: string;
}

export default function ColorsBg({ 
  children, 
  className
}: ColorsBgProps) {

  return (
    <div
      className={classNames(
        'relative w-full min-h-screen overflow-hidden',
        className
      )}
      style={{
        backgroundImage: `
    radial-gradient(circle at 5% 20%, #db5400 4%, transparent 20%),
    radial-gradient(circle at 70% 40%,rgb(23, 5, 65) 10%, transparent 40%),

    /* Negro justo antes del verde, un poco más arriba */
    radial-gradient(circle at 20% 72%, #000000 20%, transparent 50%),

    /* Verde en la parte inferior derecha */
    radial-gradient(circle at 98% 95%, #309e30 0%, transparent 50%), 

    /* Fondo general oscuro */
    radial-gradient(circle at bottom right, rgb(0, 0, 0) 10%, rgb(0, 0, 0) 50%)
  `,
        backgroundBlendMode: 'normal, screen',
      }}
    >
{/* 
      <div className="absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-emerald-600/20 blur-[120px] z-0"></div> */}

      {/* Ruido para textura */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 300 300' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.5'/%3E%3C/svg%3E")`,
          mixBlendMode: 'soft-light',
          pointerEvents: 'none',
          opacity: 0.3,
        }}
      />
      {/* Contenido */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
