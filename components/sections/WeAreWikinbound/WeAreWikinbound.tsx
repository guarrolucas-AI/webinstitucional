"use client";

import { useState, useEffect, useRef } from "react";
import { Github, Figma, Sparkles, SquareCode, FramerIcon } from "lucide-react";
import Link from "next/link";

const opacityValue = 0.2;
const opacityValue1 = 0.6;

const icons = [
  {
    id: 1,
    component: (
      <div className="bg-white rounded p-2">
        <span className="text-orange-600 font-bold">Ps</span>
      </div>
    ),
    name: "Photoshop",
  },
  {
    id: 2,
    component: (
      <div className="bg-white rounded p-2">
        <span className="text-orange-600 font-bold">Ai</span>
      </div>
    ),
    name: "Illustrator",
  },
  {
    id: 3,
    component: (
      <div className="p-2">
        <Figma className="text-white" size={32} />
      </div>
    ),
    name: "Figma",
  },
  {
    id: 4,
    component: (
      <div className="p-2">
        <Sparkles className="text-white" size={32} />
      </div>
    ),
    name: "Spark",
  },
  {
    id: 5,
    component: (
      <div className="bg-white rounded-full p-2">
        <SquareCode className="text-purple-600" size={24} />
      </div>
    ),
    name: "Discord",
  },
  {
    id: 6,
    component: (
      <div className="bg-white rounded p-2">
        <span className="font-bold">N</span>
      </div>
    ),
    name: "Notion",
  },
  {
    id: 7,
    component: (
      <div className="p-2">
        <FramerIcon className="text-white" size={32} />
      </div>
    ),
    name: "Framer",
  },
  {
    id: 8,
    component: (
      <div className="p-2">
        <Github className="text-white" size={32} />
      </div>
    ),
    name: "GitHub",
  },
];

export const WeAreWikinbound = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [iconStates, setIconStates] = useState(
    icons.map((_, i) => ({
      position: -100 - i * 120, // Start offscreen to the left with more spacing
      opacity: 0,
    }))
  );
  const [, setContainerWidth] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);

  // Update container width and window width on resize
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
      setWindowWidth(window.innerWidth);
    };

    // Initial measurement
    updateDimensions();

    // Set up resize listener
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  // Animation effect
  useEffect(() => {
    if (!windowWidth) return;

    const animationInterval = setInterval(() => {
      setIconStates((prevStates) => {
        return prevStates.map((state) => {
          // Move right by 3px each frame
          let newPosition = state.position + 3;

          // Reset position when icon exits right side
          if (newPosition > windowWidth + 100) {
            newPosition = -120;
          }

          // Calculate opacity based on position
          let newOpacity = 0;
          if (newPosition < 0) {
            // Fading in
            newOpacity = Math.max(0, 1 + newPosition / 60);
          } else if (newPosition > windowWidth - 100) {
            // Fading out
            newOpacity = Math.max(
              0,
              1 - (newPosition - (windowWidth - 100)) / 100
            );
          } else {
            // Fully visible in the middle
            newOpacity = 1;
          }

          return {
            position: newPosition,
            opacity: newOpacity,
          };
        });
      });
    }, 16); // ~60fps

    return () => clearInterval(animationInterval);
  }, [windowWidth]);

  return (
    <section className="w-full flex justify-center mt-15 items-center py-2 md:py-14 lg:py-22">
      <div className="container px-4 md:px-6 flex flex-col items-center justify-center text-center relative z-10">
        <div className="space-y-6 relative w-full">
          <Link href={'#simulador'}>
            <div className="absolute mr-1 right-0 z-20" style={{ top: "-130px" }}>
              <div 
                style={{
                  background: `linear-gradient(130deg, 
                    rgba(68,102,170,${opacityValue1}) 0%, 
                    rgba(200,64,64,${opacityValue1}) 30%, 
                    rgba(214,120,45,${opacityValue1}) 60%, 
                    rgba(59,122,59,${opacityValue1}) 100%)`,
                }}
                className="rounded-md tracking-wider px-4 py-3 text-white/80 text-xs md:text-md shadow-md"
              >
                Simulador de Negocio con AI
              </div>
            </div>
          </Link>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-tight">
            We&apos;re{" "}
            <span
              style={{
                background:
                  "linear-gradient(to right, white 25%,rgba(4, 46, 253, 0.65) 60%,rgba(253, 223, 71, 0.73) 80%,rgba(249, 116, 22, 0.66) 90%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Wikinbound
            </span>
          </h1>
          <p className="text-lg md:text-3xl text-white/70 max-w-4xl mx-auto mb-4">
            Desarrollamos soluciones innovadoras utilizando las tecnologías más
            avanzadas del mercado para garantizar resultados excepcionales.
          </p>
        </div>

        {/* Animated icons carousel - full width */}
        <div
          className="w-screen py-4 flex mt-20  justify-center items-center overflow-hidden"
          style={{
            background: `linear-gradient(to right, rgba(59,122,59,${opacityValue}), rgba(194,150,60,${opacityValue}), rgba(214,120,45,${opacityValue}), rgba(200,64,64,${opacityValue}), rgba(68,102,170,${opacityValue}))`,
          }}
        >
          <div
            ref={containerRef}
            className="relative flex justify-center h-24 w-full"
          >
            {icons.map((icon, index) => (
              <div
                key={icon.id}
                className="absolute flex flex-col items-center justify-center w-16 h-16"
                style={{
                  left: `${iconStates[index].position}px`,
                  opacity: iconStates[index].opacity,
                  transition: "opacity 0.2s ease-in-out",
                }}
              >
                {icon.component}
                <span className="text-xs text-white mt-1">{icon.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};