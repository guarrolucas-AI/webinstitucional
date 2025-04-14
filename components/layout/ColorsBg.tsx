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
        background: `linear-gradient(to bottom, 
          #121212 5%,        /* Parte superior */
            rgba(189, 58, 22, 0.41) 25%,       /* Transición oscura */
          #101048 40%,       /* Azul en el medio */
          #0d0e2c 60%,       /* Otra transición */
          #331b00 80%,       /* Naranja antes del final */
          #093018 100%       /* Verde en la parte inferior */
        )`,
      }}
    >
      {/* Glow de acento opcional */}
      <div className="absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-emerald-600/20 blur-[120px] z-0"></div>

      {/* Ruido para textura */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 300 300' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.5'/%3E%3C/svg%3E")`,
          mixBlendMode: 'soft-light',
          pointerEvents: 'none',
          opacity: 0.1,
        }}
      />
      {/* Contenido */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
