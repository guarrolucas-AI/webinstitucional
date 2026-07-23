"use client"

import type React from "react"
import AnimatedGraph from "@/components/ui/animated-graph"
import Image from "next/image"
import Cards from "@/components/ui/cards"
import AnimatedInbound from "@/components/ui/animatedInbound"
import AnimatedSoftware from "@/components/ui/animatedSoftware"
import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { useI18n } from "@/lib/i18n/LocaleContext"

export default function ServiciosSection() {
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
        staggerChildren: 0.15,
      },
    },
  };

  return (
    <section
      id='servicios'
      ref={sectionRef}
      className="flex w-full py-12 md:py-24 lg:py-10 relative"
    >
      {/* Fondo decorativo */}
      <div className="absolute top-280 left-50 w-full flex justify-center -translate-y-1/2 -z-20">
        <Image
          src='w.svg'
          width={1680}
          height={1680}
          alt="Decoración W"
          className="-scale-x-100  opacity-40"
        />
      </div>

      <motion.div
        className="w-full max-w-7xl mx-auto flex flex-col items-center justify-center text-center relative z-10 space-y-16"
        variants={containerFade}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {/* Título y subtítulo */}
        <motion.div variants={fadeInUp} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-semibold text-white mb-2">{t.servicios.heading}</h2>
          <p className="text-gray-300/90 text-lg md:text-xl">
            {t.servicios.subheading}
          </p>
        </motion.div>

        {/* Grid de tarjetas */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-2 w-full auto-rows-fr"
          variants={containerFade}
        >
          {/* Card 1 */}
          <motion.div variants={fadeInUp} className="h-full">
            <Cards
              title={t.servicios.cards.consultoria.title}
              subtitle={t.servicios.cards.consultoria.subtitle}
              description={t.servicios.cards.consultoria.description}
            >
              <div className="min-h-[200px] flex items-center justify-center w-full">
                <AnimatedGraph efficiencyLabel={t.servicios.graph.efficiency} costLabel={t.servicios.graph.cost} />
              </div>
            </Cards>
          </motion.div>

          {/* Card 2 */}
          <motion.div variants={fadeInUp} className="h-full">
            <Cards
              title={t.servicios.cards.marketing.title}
              subtitle={t.servicios.cards.marketing.subtitle}
              description={t.servicios.cards.marketing.description}
            >
              <div className="min-h-[200px] flex items-center justify-center w-full">
                <AnimatedInbound items={t.servicios.inboundCards} />
              </div>
            </Cards>
          </motion.div>

          {/* Card 3 */}
          <motion.div variants={fadeInUp} className="h-full">
            <Cards
              title={t.servicios.cards.software.title}
              subtitle={t.servicios.cards.software.subtitle}
              description={t.servicios.cards.software.description}
            >
              <div className="min-h-[200px] flex items-center justify-center w-full">
                <AnimatedSoftware descriptions={t.servicios.softwareDescriptions} />
              </div>
            </Cards>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}
