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
      position: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
    },
    {
      label: "Marketing",
      position: "top-1/4 right-1/4",
    },
    {
      label: "Consultoría",
      position: "bottom-1/4 left-1/4",
    },
  ];

  return (
    <section className="w-full mt-20 py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12   xl:grid-cols-2">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="font-inter font-regular text-7xl text-white leading-tight[1.1] ">
                Explorá
                <br />
                un mundo
                <br />
                <span className="font-inter font-bold text-white">
                  sin límites
                </span>
              </h1>
              <div />
            </div>
          </div>
          <div className="relative z-0">
            <div className="">
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
                  className="text-white backdrop-blur-sm px-6 py-3 rounded-md flex items-center gap-3"
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
