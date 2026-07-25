"use client"

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useI18n } from "@/lib/i18n/LocaleContext";

export default function PackagesSection() {
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
    <section id="servicios-paquetes" className="w-full max-w-7xl mx-auto" ref={sectionRef}>
      <motion.div
        variants={containerFade}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.div variants={fadeInUp} className="text-center text-white mb-16">
          <h1 className="text-6xl font-regular mb-4">{t.packages.heading}</h1>
          <p className="text-gray-300/90 text-lg md:text-xl max-w-4xl mx-auto">
            {t.packages.subheading}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {t.packages.items.map((item) => (
            <motion.article
              key={item.num}
              variants={fadeInUp}
              className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 md:p-8 flex flex-col gap-3"
            >
              <div className="flex items-start justify-between gap-3">
                <span className="text-green-300/80 text-sm font-medium">{item.num}</span>
                <span className="text-white text-lg font-semibold whitespace-nowrap">{item.price}</span>
              </div>
              <h3 className="text-white text-xl font-semibold">{item.name}</h3>
              <span className="text-gray-400 text-xs uppercase tracking-wide">{item.scope}</span>
              <p className="text-white/80 text-sm leading-relaxed">{item.description}</p>
              <p className="text-gray-400 text-xs mt-auto pt-3 border-t border-white/10">
                {item.proof}
              </p>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
