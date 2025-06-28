"use client"

import type React from "react"
import AnimatedGraph from "@/components/ui/animated-graph"
import Image from "next/image"
import Cards from "@/components/ui/cards"
import AnimatedInbound from "@/components/ui/animatedInbound"
import AnimatedSoftware from "@/components/ui/animatedSoftware"
import { useRef } from "react"
import { motion, useInView } from "framer-motion"

export default function ServiciosSection() {
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
      className="flex w-full py-12 md:py-24 lg:py-10"
    >
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
        className="container mx-auto px-4 md:px-6 flex flex-col items-center justify-center text-center relative z-10 space-y-10"
        variants={containerFade}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.div variants={fadeInUp} className="text-center mb-12">
          <h2 className="text-5xl font-regular text-white mb-2">Servicios</h2>
          <p className="text-gray-300/70 text-xl">
            Consultoría, marketing y tecnología para transformar tu negocio
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-2 w-full max-w-7xl"
          variants={containerFade}
        >
          <motion.div variants={fadeInUp}>
            <Cards
              title="Consultoría"
              subtitle="Empresarial"
              description="Impulsamos la transformación de tu empresa con asesoramiento legal, contable, operativo, tecnológico, comercial y de capital humano."
            >
              <AnimatedGraph />
            </Cards>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <Cards
              title="Marketing"
              subtitle="Inbound"
              description="Lideramos el crecimiento de tu negocio con estrategias inbound que atraen, convierten y fidelizan clientes."
            >
              <AnimatedInbound />
            </Cards>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <Cards
              title="Soluciones de"
              subtitle="Software"
              description="Ofrecemos soluciones de software innovadoras a través de un equipo de profesionales que transforman tu empresa."
            >
              <AnimatedSoftware />
            </Cards>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}
