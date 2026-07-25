"use client"

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Wrench,
  Car,
  LayoutDashboard,
  ClipboardCheck,
  Dumbbell,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

const ICONS: Record<string, LucideIcon> = {
  wrench: Wrench,
  car: Car,
  "layout-dashboard": LayoutDashboard,
  "clipboard-check": ClipboardCheck,
  dumbbell: Dumbbell,
  sparkles: Sparkles,
};

import { useI18n } from "@/lib/i18n/LocaleContext";

export default function ProyectosSection() {
  const { t } = useI18n();
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
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <section
      id="proyectos"
      ref={sectionRef}
      className="flex w-full"
    >
      {/* Fondo decorativo */}
      <div className="absolute top-480 right-100 w-full flex justify-center -translate-y-1/2 z-0">
        <Image src="w.svg" width={580} height={580} alt="Decoración W" />
      </div>

      <motion.div
        className="max-w-7xl mx-auto relative z-10 w-full"
        variants={containerFade}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {/* Encabezado */}
        <motion.div variants={fadeInUp} className="text-center text-white mb-16">
          <h1 className="text-6xl font-regular mb-4">{t.proyectos.heading}</h1>
          <p className="text-gray-300/90 text-lg md:text-xl max-w-4xl mx-auto">
            {t.proyectos.subheading}
          </p>
        </motion.div>

        {/* Grid de casos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          {t.proyectos.cases.map((c) => {
            const Icon = ICONS[c.icon] ?? Sparkles;
            return (
              <motion.article
                key={c.name}
                variants={fadeInUp}
                className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 md:p-8 flex flex-col gap-4"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-white text-xl font-semibold">{c.name}</h3>
                    <p className="text-gray-400 text-sm mt-1">{c.role}</p>
                  </div>
                  <div className="shrink-0 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-green-300" />
                  </div>
                </div>

                <ul className="space-y-2">
                  {c.caps.map((cap) => (
                    <li key={cap} className="text-white/80 text-sm leading-relaxed pl-4 relative">
                      <span className="absolute left-0 top-[0.6em] w-2 h-px bg-green-300/70" />
                      {cap}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2 mt-auto pt-2 border-t border-white/10">
                  {c.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] text-gray-300 border border-white/15 rounded-full px-2.5 py-1"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.article>
            );
          })}
        </div>
      </motion.div>
    </section>
  )
}
