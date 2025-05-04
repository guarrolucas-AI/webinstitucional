"use client"

import type React from "react"
import { Instagram } from "lucide-react"
import AnimatedGraph from "@/components/ui/animated-graph"
import Image from "next/image"

export default function ServiciosSection() {
  return (
    <section id='servicios' className="flex w-full py-12 md:py-24 lg:py-10">
        <div className="absolute top-280 left-60 w-full flex justify-center -translate-y-1/2 z-0">
    <Image
      src='w.svg'
      width={1580}
      height={1580}
      alt="Decoración W"
      className="-scale-x-100 opacity-30"
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
        <ServiceCard
          title="Consultoría"
          subtitle="Empresarial"
          description="Impulsamos la transformación de tu empresa con asesoramiento legal, contable, operativo, tecnológico, comercial y de capital humano."
        >
          <AnimatedGraph></AnimatedGraph>
        </ServiceCard>
       
        {/* Marketing Card */}
        <ServiceCard
          title="Marketing"
          subtitle="Inbound"
          description="Lideramos el crecimiento de tu negocio con estrategias inbound que atraen, convierten y fidelizan clientes."
        >
          <div>
            <div className="flex items-center text-left gap-3 border border-white/20 backdrop-blur-sm p-2 m-3 rounded-lg text-sm">
              <Instagram className="text-white" />
              <div>
                <div className="text-white font-medium">Instagram</div>
                <div className="text-gray-400 ">Lorem ipsum dolor sit</div>
              </div>
            </div>
            <div className="flex items-center text-left gap-3 border border-white/20 backdrop-blur-sm p-2 m-3 rounded-lg text-sm">
              <Instagram className="text-white" />
              <div>
                <div className="text-white font-medium">Instagram</div>
                <div className="text-gray-400 ">Lorem ipsum dolor sit</div>
              </div>
            </div>
           
         
          </div>
        </ServiceCard>
  
        {/* Software Solutions Card */}
        <ServiceCard
          title="Soluciones de"
          subtitle="Software"
          description="Ofrecemos soluciones de software innovadoras a través de un equipo de profesionales que transforman tu empresa."
        >
          <div className="bg-black/30 backdrop-blur-sm p-4 rounded-lg h-48 flex items-center justify-center overflow-hidden relative">
            <pre className="text-gray-300 text-xs">
              {`function optimize() {
    return {
      efficiency: +103%,
      cost: -67%
    }
  }`}
            </pre>
            <div className="absolute bottom-4 right-4">
              <div className="bg-black/50 text-white text-xs px-2 py-1 rounded">Tobor B</div>
            </div>
          </div>
        </ServiceCard>
      </div>
    </div>
  </section>
  )
}

interface ServiceCardProps {
  title: string
  subtitle: string
  description: string
  children: React.ReactNode
}

function ServiceCard({ title, subtitle, description, children }: ServiceCardProps) {
  return (
    <div className="rounded-3xl overflow-hidden backdrop-blur-sm border border-white/10 flex flex-col z-1 relative">
      <div className="absolute inset-0 opacity-20 mix-blend-soft-light pointer-events-none" 
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 300 300' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")`,
        }}
      />
      
      {/* Contenido principal */}
      <div className="p-0 m-5 border rounded-3xl border-white/10 relative">
        {children}
      </div>
      
      <div className="p-6 pt-0 relative z-10">
        <h3 className="text-white text-2xl text-left font-regular">{title}</h3>
        <h4 className="text-white text-2xl text-left font-bold mb-3">{subtitle}</h4>
        <p className="text-white/80 text-left text-sm">{description}</p>
      </div>
    </div>
  )
}
