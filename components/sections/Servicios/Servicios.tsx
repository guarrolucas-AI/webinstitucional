"use client"

import type React from "react"
import { Instagram } from "lucide-react"

export default function ServiciosSection() {
  return (
    <section id='servicios' className="flex w-full py-12 md:py-24 lg:py-32 ">
      <div className="container px-4 md:px-6 flex flex-col items-center justify-center text-center relative z-10 space-y-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-white mb-2">Servicios</h2>
          <p className="text-gray-300 text-xl">Lorem ipsum dolor sit amet, consectetuer</p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Business Consulting Card */}
     
          <ServiceCard
            title="Consultoría"
            subtitle="Empresarial"
            description="Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tinci"
          >
            <div className="relative h-48 w-full">
              <div className="absolute border top-4 left-4 bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full text-white text-sm">
                Efficiency +103%
              </div>
              <div className="absolute bottom-4 right-4 bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full text-white text-sm border border-green-400">  
                Cost -67%
              </div>
              <div className="w-full h-full flex items-center justify-center">
                <svg viewBox="0 0 200 100" className="w-full h-full">
                  <path d="M0,50 Q50,10 100,50 T200,50" fill="none" stroke="#4ade80" strokeWidth="2" />
                  <path d="M0,80 Q50,60 100,40 T200,20" fill="none" stroke="#f87171" strokeWidth="2" />
                  <circle cx="50" cy="50" r="4" fill="white" />
                  <circle cx="150" cy="50" r="4" fill="white" />
                </svg>
              </div>
            </div>
          </ServiceCard>
         

          {/* Marketing Card */}
          <ServiceCard
            title="Marketing"
            subtitle="Inbound"
            description="Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tinci"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-3 border bg-black/30 backdrop-blur-sm p-3 rounded-lg">
                <Instagram className="text-white" />
                <div>
                  <div className="text-white font-medium">Instagram</div>
                  <div className="text-gray-400 text-sm">orem ipsum dolor sit</div>
                </div>
              </div>

              <div className="bg-black/30 backdrop-blur-sm p-3 rounded-lg">
                <div className="flex justify-between items-center">
                  <div className="bg-indigo-900/50 px-2 py-1 rounded text-white text-sm">APP1</div>
                  <div className="text-white text-sm">Aplicación 01</div>
                </div>
                <div className="text-gray-400 text-sm mt-1">Lorem ipsum dolor sit</div>
              </div>

              <div className="bg-black/30 backdrop-blur-sm p-3 rounded-lg">
                <div className="flex justify-between items-center">
                  <div className="bg-indigo-900/50 px-2 py-1 rounded text-white text-sm">APP2</div>
                  <div className="text-white text-sm">Aplicación 02</div>
                </div>
                <div className="text-gray-400 text-sm mt-1">Lorem ipsum dolor sit</div>
              </div>
            </div>
          </ServiceCard>

          {/* Software Solutions Card */}
          <ServiceCard
            title="Soluciones de"
            subtitle="Software"
            description="Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tinci"
          >
            <div className="bg-black/30 backdrop-blur-sm p-4 rounded-lg h-48 overflow-hidden">
              <div className="text-gray-400 text-sm mb-2"></div>
              <pre className="text-gray-300 text-xs">
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
    <div className="rounded-3xl overflow-hidden backdrop-blur-md bg-white/5 border border-white/10 flex flex-col">
      <div className={`p-4 m-5 border rounded-3xl border-white/10`}>
      {children}
      </div>
      <div className="p-6 pt-2">
        <h3 className="text-white text-2xl font-medium">{title}</h3>
        <h4 className="text-white text-2xl font-bold mb-3">{subtitle}</h4>
        <p className="text-gray-400 text-sm">{description}</p>
      </div>
    </div>
  )
}

