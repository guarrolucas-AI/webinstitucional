"use client"

import { User, Circle, ArrowRight, Paperclip, CreditCard, Users, ShoppingCart, Cloud, Settings, MessageSquare } from "lucide-react";
import Image from "next/image";
import Cards from "@/components/ui/cards";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function ProyectosSection() {
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

  const icons = [
    { id: 'credit-card', icon: CreditCard },
    { id: 'users', icon: Users },
    { id: 'shopping-cart', icon: ShoppingCart },
    { id: 'cloud', icon: Cloud },
    { id: 'settings', icon: Settings },
    { id: 'message', icon: MessageSquare },
  ];

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
        className="max-w-7xl mx-auto relative z-10"
        variants={containerFade}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {/* Encabezado */}
        <motion.div variants={fadeInUp} className="text-center text-white  mb-16">
          <h1 className="text-6xl font-regular mb-4">Proyectos</h1>
          <p className="text-gray-300/90 text-lg md:text-xl max-w-4xl mx-auto">
           Implementamos estrategias de innovación y fortalecimiento empresarial mejorando significativamente organizaciones.
          </p>
        </motion.div>

        {/* Grid de tarjetas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 w-full max-w-7xl">
          {/* Card 1 */}
          <motion.div variants={fadeInUp}>
            <Cards
              title="E-Commerce"
              subtitle="para Negocios"
              description="Buscamos las mejores automatizaciones para hacer crecer empresas y emprendimientos"
            >
              <div className="flex-1 flex items-center justify-center relative">
                <div className="absolute inset-0 opacity-20 flex items-center justify-center">
                  <div className="grid grid-cols-3 gap-4">
                    {icons.map(({ id, icon: Icon }) => (
                      <div
                        key={id}
                        className="w-16 h-16 bg-white/30 rounded-md flex items-center justify-center"
                      >
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="relative z-10 rounded-full border-2 border-white/50 w-32 h-32 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="text-4xl font-bold">100+</div>
                    <div className="text-[12px]">Automatizaciones</div>
                  </div>
                </div>
              </div>
            </Cards>
          </motion.div>

          {/* Card 2 */}
          <motion.div variants={fadeInUp}>
            <Cards
              title="Estrategia de"
              subtitle="Leads"
              description="Organizamos y automatizamos el seguimiento de prospectos."
            >
             <div className="flex flex-col justify-center gap-y-6 w-full mx-auto">
                <div className="flex items-center justify-end space-x-3">
                  <div className="text-right">
                    <div className="font-medium text-white">Lead 1</div>
                    <div className="text-sm text-gray-300">Estoy interesado en el producto ... </div>
                  </div>
                  <div className="bg-transparent border border-white rounded-md p-1">
                    <User size={20} className="text-white" />
                  </div>
                </div>
                <div className="flex items-center m-2 space-x-3">
                  <div className="bg-transparent border border-white rounded-md p-1">
                    <Circle size={20} className="text-white" />
                  </div>
                  <div>
                    <div className="font-medium text-white">Estrategia</div>
                    <div className="text-sm text-gray-300">Propuesta solida de alto valor</div>
                  </div>
                </div>
                <div className="w-full h-10 bg-transparent border border-white rounded-full overflow-hidden flex items-center px-3 justify-between">
                  <Paperclip size={20} className="text-white" />
                  <ArrowRight size={20} className="text-white" />
                </div>
              </div>
            </Cards>
          </motion.div>

          {/* Card 3 */}
          <motion.div variants={fadeInUp}>
            <Cards
              title="Sistemas de"
              subtitle="Gestión personalizados"
              description="Creamos sistemas a medida para digitalizar tu operación."
            >
              <div className="w-full h-40 relative flex items-center justify-center">
                <svg viewBox="0 0 300 100" className="w-full h-full">
                  <path
                    d="M0,50 Q75,10 150,50 Q225,90 300,50"
                    fill="none"
                    stroke="white"
                    strokeWidth="1.5"
                    className="opacity-50"
                  />
                  <circle cx="150" cy="50" r="4" fill="white" />
                  <circle cx="300" cy="50" r="4" fill="white" />
                </svg>
              </div>
            </Cards>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
