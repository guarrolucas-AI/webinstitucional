"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

export default function BusinessSimulator() {
  const [salesAmount, setSalesAmount] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");

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
    <section id='simulador' className="w-full mt-20 max-w-6xl mx-auto" ref={sectionRef}>
      <motion.div
        className="relative"
        variants={containerFade}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <div className="absolute pointer-events-none top-0 right-0 w-full flex justify-center">
          <Image src='w.svg' width={980} height={980} alt="Decoración W" />
        </div>

        <motion.h1 variants={fadeInUp} className="text-5xl font-normal text-white text-center mb-12">
          Inteligencia Artificial y tu negocio
        </motion.h1>

        <motion.div variants={fadeInUp} className="rounded-3xl overflow-hidden bg-white/5">
          <div className="p-8 md:p-12 grid md:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-4">
              <h2 className="text-5xl font-normal text-white">
                Simulador<br />de negocio
              </h2>
              <p className="text-white/80 text-2xl">
                Acá podés simular con AI<br />
                la proyección de tu empresa<br />
                hacia el futuro.
              </p>
              <p className="text-green-300 opacity-80 mt-10">
                Usar con precaución, proyecto experimental
              </p>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <Tabs defaultValue="manual" className="w-full">
                <TabsList className="bg-black/20 mb-4 p-1 w-full flex justify-between">
                  <TabsTrigger value="chat" className="flex-1 text-white mr-2 border-r border-orange-500/30 data-[state=active]:bg-white data-[state=active]:text-black">
                    Chat
                  </TabsTrigger>
                  <TabsTrigger value="manual" className="flex-1 text-white data-[state=active]:bg-white data-[state=active]:text-black rounded-md">
                    Entrada manual
                  </TabsTrigger>
                  <TabsTrigger value="dashboard" className="flex-1 text-white data-[state=active]:border-white data-[state=active]:text-black rounded-md">
                    Resultados
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="manual">
                  <div className="relative border border-white/20 backdrop-blur-2xl rounded-lg p-6 text-white overflow-hidden">
                    <div className="absolute inset-0 z-10 bg-black/40 backdrop-blur-3xl flex items-center justify-center">
                      <p className="text-white text-xl font-semibold text-center px-4">
                        Funcionalidad en desarrollo, muy pronto
                      </p>
                    </div>

                    <div className="pointer-events-none select-none opacity-50">
                      <h3 className="text-xl mb-4">Simulación de Crecimiento y Consultoría Empresarial</h3>
                      <form className="space-y-4">
                        <div className="space-y-2">
                          <label htmlFor="sales-amount" className="block">Nombre</label>
                          <Input
                            id="sales-amount"
                            type="text"
                            value={salesAmount}
                            onChange={(e) => setSalesAmount(e.target.value)}
                            placeholder="0.00"
                            className="bg-transparent border-white/30 text-white"
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="location" className="block">Industria</label>
                          <Input
                            id="location"
                            type="text"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className="bg-transparent border-white/30 text-white"
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="date" className="block">Tamaño de la empresa</label>
                          <Input
                            id="date"
                            type="text"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="bg-transparent border-white/30 text-white"
                          />
                        </div>
                        <div className="flex justify-end mt-4">
                          <Button type="submit" className="bg-white text-black hover:bg-white/90">
                            Registrar
                          </Button>
                        </div>
                      </form>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="chat">
                  <div className="relative border border-white/20 backdrop-blur-3xl rounded-lg p-6 text-white overflow-hidden h-96 flex flex-col">
                    <div className="flex-1 overflow-y-auto space-y-4 pr-2  opacity-50">
                      <h3 className="text-xl mb-3">Chat IA para Consultoría Empresarial</h3>
                      <div className="bg-white/10 rounded-lg p-3 max-w-sm self-start">
                        <p> Usuario: ¿Cómo puedo aumentar mis ventas este mes?</p>
                      </div>
                      <div className="bg-green-500/20 rounded-lg p-3 max-w-sm self-end">
                        <p> IA: Una buena opción sería ofrecer descuentos por tiempo limitado o analizar tus productos más vendidos.</p>
                      </div>
                      <div className="bg-white/10 rounded-lg p-3 max-w-sm self-start">
                        <p> Usuario: ¿Y cómo hago para proyectar mis ingresos?</p>
                      </div>
                      <div className="bg-green-500/20 rounded-lg p-3 max-w-sm self-end">
                        <p>IA: Puedo ayudarte con eso si me das tus ingresos mensuales estimados y el crecimiento esperado.</p>
                      </div>
                    </div>
                    <form className="mt-4 flex gap-2">
                      <Input type="text" placeholder="Escribí tu mensaje..." className="bg-transparent border-white/30 text-white flex-1" disabled />
                      <Button type="submit" className="bg-white text-black hover:bg-white/90" disabled>
                        Enviar
                      </Button>
                    </form>
                    <div className="absolute inset-0 z-10 bg-black/40 backdrop-blur-3xl flex items-center justify-center">
                      <p className="text-white text-xl font-semibold text-center px-4">
                        Chat AI en desarrollo, muy pronto
                      </p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="dashboard">
                  <div className="relative border border-white/20 backdrop-blur-lg rounded-lg p-6 text-white overflow-hidden flex flex-col">
                    <div className="flex-1 overflow-y-auto space-y-6 pr-2 opacity-50">
                      <h3 className="text-xl font-regular">Resumen de Proyección</h3>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="space-y-1">
                          <p className="text-white/60">Monto Total Ingresado</p>
                          <p className="text-green-300 text-xl">$25,000</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-white/60">Ubicación Promedio</p>
                          <p className="text-green-300 text-xl">Posadas, Misiones</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-white/60">Proyección IA</p>
                          <p className="text-green-300 text-xl">+18% en 3 meses</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-white/60">Sugerencia</p>
                          <p className="text-green-300 text-xl">Expandir red online</p>
                        </div>
                      </div>
                      <div className="mt-6">
                        <p className="text-white/70 text-sm">* Basado en datos estimados y análisis experimental.</p>
                      </div>
                    </div>
                    <div className="absolute inset-0 z-10 bg-black/40 backdrop-blur-3xl flex items-center justify-center">
                      <p className="text-white text-xl font-semibold text-center px-4">
                        Dashboard en desarrollo, muy pronto
                      </p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
