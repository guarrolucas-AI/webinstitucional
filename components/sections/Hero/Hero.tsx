import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import styles from "./Hero.module.css";

const opacityValue = 0.4;

export default function Hero() {
  const [activeButton, setActiveButton] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveButton((prev) => (prev + 1) % 3);
    }, 3000); // Cambio cada 2 segundos (ajustable)
    return () => clearInterval(interval);
  }, []);

  const buttons = [
    {
      label: "Software factory",
      position: "bottom-0 left-50", // Más cerca del borde inferior derecho
    },
    {
      label: "Marketing",
      position: "top-10 left-10", // Más arriba y a la izquierda
    },
    {
      label: "Consultoría",
      position: "top-10 left-50", // Más arriba y a la derecha
    },
  ];
  
  return (
    <section className="w-full flex justify-center py-12 mb-10 md:py-24 lg:py-32">
      <div className="container px-4 mt-20 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-10 justify-items-center">
              <h1 className="font-inter text-7xl text-center lg:text-left font-regular md:text-7xl lg:text-[80px] text-white leading-[0.9] tracking-wide">
                Explorá
                <br />
                <span className="md:font-regular lg:font-regular xl:font-regular ">
                un mundo
                </span>
                <br />
                <span className="font-inter font-extrabold text-white">
                  sin límites
                </span>
              </h1>
              <div />
            </div>
          </div>
          <div className="relative z-0">
            <div className="flex pl-120 justify-center items-center">
              <div className={`${styles.circle} ${styles["circle-1"]}`} />
              <div className={`${styles.circle} ${styles["circle-2"]}`} />
              <div className={`${styles.circle} ${styles["circle-3"]}`} />
        
              {buttons.map((btn, index) => (
                <motion.button
                  key={index}
                  animate={{
                    opacity: activeButton === index ? 1 : 0,
                    scale: activeButton === index ? 1 : 0.95,
                  }}
                  transition={{ duration: 0.5 }}
                  style={{
                    background: `linear-gradient(to right, rgba(59,122,59,${opacityValue}), rgba(194,150,60,${opacityValue}), rgba(214,120,45,${opacityValue}), rgba(200,64,64,${opacityValue}), rgba(68,102,170,${opacityValue}))`,
                    pointerEvents: activeButton === index ? "auto" : "none",
                  }}
                  className={`absolute ${btn.position} font-inter font-light text-lg text-white backdrop-blur-sm px-9 py-2 rounded-md flex items-center gap-3`}
                  aria-label={btn.label}
                >
                  <motion.span
                    className="w-2 h-2 bg-white rounded-full"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  {btn.label}
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
