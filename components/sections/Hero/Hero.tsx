import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import styles from "./Hero.module.css";

const opacityValue = 0.4;

export default function Hero() {
  const [activeButton, setActiveButton] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveButton((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const buttons = [
    {
      label: "Software factory",
      position: "bottom-35 left-70", // Desktop position
      mobilePosition: "bottom-10 left-1/2 transform -translate-x-1/2" // Centered at bottom for mobile
    },
    {
      label: "Marketing",
      position: "top-10 left-5", // Desktop position
      mobilePosition: "top-20 left-1/2 transform -translate-x-1/2" // Centered higher for mobile
    },
    {
      label: "Consultoría",
      position: "top-25 left-80", // Desktop position
      mobilePosition: "top-1/3 left-1/2 transform -translate-x-1/2" // Centered in middle for mobile
    },
  ];
  
  return (
    <section className="w-full flex justify-center lg:mt-40 mt-20 lg:ml-10 py-12 md:py-24 lg:py-32 mb-20 md:mb-0">
      <div className="container px-4 md:px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-22 xl:grid-cols-2">
          {/* Text Content */}
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-6 md:space-y-10 content-center">
              <h1 className="font-inter text-[42px] text-center lg:text-left font-regular md:text-7xl lg:text-[85px] text-white leading-[0.9] md:leading-[0.9] tracking-wide">
                Explorá
                <br />
                <span className="md:font-regular lg:font-regular xl:font-regular">
                  un mundo
                </span>
                <br />
                <span className="font-inter font-extrabold text-white">
                  sin límites
                </span>
              </h1>
            </div>
          </div>

          {/* Circles and Buttons */}
          <div className="relative z-0 h-64 ml-15 mt-15 lg:mt-0 ml-0  md:h-auto">
            <div className="flex justify-center items-center h-full">
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
                  className={`absolute ${btn.mobilePosition} md:${btn.position} font-inter font-light text-sm md:text-base text-white backdrop-blur-sm px-4 py-2 md:px-5 md:py-2 rounded-md flex items-center tracking-widest gap-3`}
                  aria-label={btn.label}
                >
                  <motion.span
                    className="w-1.5 h-1.5 bg-white rounded-full"
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