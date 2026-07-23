"use client";

import { useState, useEffect, useRef } from "react";
import { useInView, motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useI18n } from "@/lib/i18n/LocaleContext";

const opacityValue = 0.2;
const opacityValue1 = 0.6;

const icons = [
  { id: 1, src: "/icons/photoshop.svg", name: "Photoshop" },
  { id: 2, src: "/icons/illustrator.svg", name: "Illustrator" },
  { id: 3, src: "/icons/figma.svg", name: "Figma" },
  { id: 4, src: "/icons/nodejs.svg", name: "NodeJS" },
  { id: 5, src: "/icons/react.svg", name: "React" },
  { id: 6, src: "/icons/notion.svg", name: "Notion" },
  { id: 7, src: "/icons/wordpress.svg", name: "Wordpress" },
  { id: 8, src: "/icons/github.svg", name: "GitHub" },
  { id: 9, src: "/icons/nestjs.svg", name: "Nestjs" },
  { id: 10, src: "/icons/nextjs.svg", name: "Nextjs" },
  { id: 11, src: "/icons/git.svg", name: "Git" },
];

export const WeAreWikinbound = () => {
  const { t } = useI18n();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-20% 0px" });

  const [offset, setOffset] = useState(0);
  const speed = 1.2;
  const spacing = 120;

  const scrollingIcons = [...icons, ...icons]; // Duplicamos íconos para loop infinito
  const totalWidth = icons.length * spacing;

  useEffect(() => {
    if (!isInView) return;
    const interval = setInterval(() => {
      setOffset((prev) => prev - speed);
    }, 16);
    return () => clearInterval(interval);
  }, [isInView]);

  return (
    <section
      ref={sectionRef}
      className="w-full flex justify-center  pt-48 pb-24 relative items-center"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1 }}
        className="container px-4 md:px-6 flex flex-col items-center justify-center text-center relative lg:z-10"
      >
        <div className="space-y-6 relative w-full">
          <Link href="#simulador">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="absolute mr-1 right-0 z-20"
              style={{ top: "-130px" }}
            >
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
                {t.weAre.badge}
              </div>
            </motion.div>
          </Link>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-tight"
          >
            {t.weAre.title}{" "}
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
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-lg md:text-3xl text-white/70 max-w-4xl mx-auto mb-4"
          >
            {t.weAre.description}
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.4 }}
          className="w-screen py-4 flex mt-10 justify-center items-center overflow-hidden"
          style={{
            background: `linear-gradient(to right, rgba(59,122,59,${opacityValue}), rgba(194,150,60,${opacityValue}), rgba(214,120,45,${opacityValue}), rgba(200,64,64,${opacityValue}), rgba(68,102,170,${opacityValue}))`,
          }}
        >
          <div className="relative w-full h-20 overflow-hidden">
            <div
              className="absolute flex"
              style={{
                width: `${scrollingIcons.length * spacing}px`,
                transform: `translateX(${offset % -totalWidth}px)`,
                transition: "transform 0.016s linear",
              }}
            >
              {scrollingIcons.map((icon, i) => (
                <div
                  key={i}
                  className="flex flex-col mt-2 items-center justify-center w-28"
                >
                  <Image src={icon.src} alt={icon.name} width={40} height={40} />
                  <span className="text-xs text-white mt-1">{icon.name}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};
