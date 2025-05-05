'use client';

import React from 'react';
import classNames from 'classnames';

interface ColorsBgProps {
  children?: React.ReactNode;
  className?: string;
}

export default function ColorsBg({ children, className }: ColorsBgProps) {
  return (
    <div
      className={classNames(
        'relative w-full z-0 min-h-screen overflow-hidden',
        className
      )}
      style={{
        backgroundImage: `
          radial-gradient(circle at -45% 30%, rgba(255, 72, 0, 0.94) 5%, transparent 35%),
          radial-gradient(circle at 45% 45%, rgb(23, 5, 65) 20%, transparent 40%),
          radial-gradient(circle at 20% 65%, #000000 20%, transparent 80%),
          radial-gradient(circle at 98% 95%, #309e30 0%, transparent 70%),
          radial-gradient(circle at bottom right, rgb(0, 0, 0) 10%, rgb(0, 0, 0) 50%)
        `,
        backgroundBlendMode: 'normal, screen',
      }}
    >
      {/* Textura de ruido funcional */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          mixBlendMode: 'soft-light',
          opacity: 0.2,
          pointerEvents: 'none',
        }}
        aria-hidden="true"
      />

      {/* Contenido */}
      <div className="relative z-10">

        {children}
      </div>
    </div>
  );
}
