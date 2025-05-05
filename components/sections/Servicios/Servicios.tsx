"use client"

import type React from "react"
import AnimatedGraph from "@/components/ui/animated-graph"
import Image from "next/image"
import Cards from "@/components/ui/cards"
import AnimatedInbound from "@/components/ui/animatedInbound"
import AnimatedSoftware from "@/components/ui/animatedSoftware"

export default function ServiciosSection() {
  return (
    <section id='servicios' className="flex w-full py-12 md:py-24 lg:py-10">
        <div className="absolute top-280 left-50 w-full flex justify-center -translate-y-1/2 -z-20">
    <Image
      src='w.svg'
      width={1680}
      height={1680}
      alt="Decoración W"
      className="-scale-x-100  opacity-40"
    />
  </div>
    <div className="container mx-auto px-4 md:px-6 flex flex-col items-center justify-center text-center relative z-10 space-y-10">
      <div className="text-center mb-12">
        <h2 className="text-5xl font-regular text-white mb-2">Servicios</h2>
        <p className="text-gray-300/70 text-xl">Consultoría, marketing y tecnología para transformar tu negocio</p>
      </div>
  
      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 w-full max-w-7xl">
        {/* Business Consulting Card */}
        <Cards
          title="Consultoría"
          subtitle="Empresarial"
          description="Impulsamos la transformación de tu empresa con asesoramiento legal, contable, operativo, tecnológico, comercial y de capital humano."
        >
          <AnimatedGraph></AnimatedGraph>
        </Cards>
       
        {/* Marketing Card */}
        <Cards
          title="Marketing"
          subtitle="Inbound"
          description="Lideramos el crecimiento de tu negocio con estrategias inbound que atraen, convierten y fidelizan clientes."
        >
          <AnimatedInbound/>
        </Cards>
  
        {/* Software Solutions Card */}
        <Cards
          title="Soluciones de"
          subtitle="Software"
          description="Ofrecemos soluciones de software innovadoras a través de un equipo de profesionales que transforman tu empresa."
        >
        <AnimatedSoftware/>
        </Cards>
      </div>
    </div>
  </section>
  )
}

