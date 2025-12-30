"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import styles from "./Hero.module.css";

const opacityValue = 0.4;

const buttons = [
  {
    label: "Software factory",
    position: "bottom-35 left-70",
    mobilePosition: "bottom-12 left-[25px] transform translate-x-1/2",
  },
  {
    label: "Marketing",
    position: "top-10 left-5",
    mobilePosition: "top-10 left-1/2 transform -translate-x-1/2",
  },
  {
    label: "Consultoría",
    position: "top-10 left-5",
    mobilePosition: "top-1 left-[10px] transform translate-x-1/1",
  },
];

interface HeroProps {
  section: string
}
export default function Hero({ section }: HeroProps) {
  
  const sectionRef = useRef(null);
const isInView = useInView(sectionRef, { once: false, margin: "-20% 0px" });


  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  const containerFade = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  return (
    <section
      ref={sectionRef}
      className="w-full flex justify-center pt-30 md:pt-58 pb-30 lg:ml-10
      "
    >
      <motion.div
        className="container px-4 md:px-6"
        variants={containerFade}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-22 xl:grid-cols-2">
          {/* Texto */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-col justify-center space-y-4"
          >
            <motion.h1
              className="font-inter text-[42px] text-center lg:text-left font-regular md:text-7xl lg:text-[85px] text-white leading-[0.9] md:leading-[0.9] tracking-wide space-y-6 md:space-y-10 content-center"
              variants={fadeInUp}
              transition={{ duration: 1 }}
            >
              {
                (section === "home" && (
                  <div>
                    Explorá
                    <br />
                    <span>un mundo</span>
                    <br />
                    <span className="font-extrabold">sin límites</span>
                  </div>
                ))
              }
              {
                (section === "projects" && (
                  <div>
                    Conocé
                    <br />
                    <span>nuestros</span>
                    <br />
                    <span className="font-extrabold">éxitos.</span>
                  </div>
                ))
              }
            </motion.h1>
          </motion.div>

          {/* Círculos y botones */}
          <motion.div
            variants={containerFade}
            className="relative w-full z-0 h-64 ml-15 md:ml-48 lg:ml-15 mt-24 lg:mt-0"
          >
            <div className="flex justify-center items-center h-full relative">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className={`${styles.circle} ${styles[`circle-${i + 1}`]}`}
                  variants={fadeInUp}
                  transition={{ duration: 1, delay: i * 0.3 }}
                />
              ))}

              {buttons.map((btn, index) => (
                <motion.button
                  key={index}
                  variants={fadeInUp}
                  transition={{ duration: 0.6 }}
                  style={{
                    background: `linear-gradient(to right, rgba(59,122,59,${opacityValue}), rgba(194,150,60,${opacityValue}), rgba(214,120,45,${opacityValue}), rgba(200,64,64,${opacityValue}), rgba(68,102,170,${opacityValue}))`,
                  }}
                  className={`absolute ${btn.mobilePosition} sm:${btn.position} focus:outline-none font-inter font-light text-sm md:text-base text-white backdrop-blur-sm px-4 py-2 md:px-5 md:py-2 rounded-md flex items-center tracking-widest gap-3`}
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
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
