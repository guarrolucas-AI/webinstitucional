"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import Image from "next/image";

export default function BusinessSimulator() {
  const [salesAmount, setSalesAmount] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica para registrar las ventas
    console.log({ salesAmount, location, date });
  };

  return (
    <section id='simulador' className="w-full mt-20 max-w-5xl mx-auto">
       <div className="absolute top-780 right-50 w-full flex justify-center -translate-y-1/2">
                <Image
                  src='w.svg'
                  width={980}
                  height={980}
                  alt="Decoración W"
                />
              </div>
      <h1 className="text-5xl font-bold text-white text-center mb-8">
        Inteligencia Artificial y tu negocio
      </h1>

      <div className="rounded-3xl overflow-hidden  backdrop-blur-sm bg-white/5 border border-white/20">
        <div className="p-8 md:p-12 grid md:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-4">
            <h2 className="text-5xl font-bold text-white">
              Simulador
              <br />
              de negocio
            </h2>
            <p className="text-white text-2xl">
              Acá podés simular con AI
              <br />
              la proyección de tu empresa
              <br />
              hacia el futuro.
            </p>
            <p className="text-green-300 opacity-80 mt-16">
              Usar con precaución, proyecto experimental
            </p>
          </div>
          
          {/* Right Column */}
          <div className="space-y-6">
            <Tabs defaultValue="manual" className="w-full">
              <div className="flex justify-end mb-4">
                <TabsList className="bg-transparent">
                  <TabsTrigger 
                    value="chat" 
                    className={cn(
                      "data-[state=active]:bg-white data-[state=active]:text-black",
                      "text-white"
                    )}
                  >
                    Chat
                  </TabsTrigger>
                  <TabsTrigger 
                    value="manual" 
                    className={cn(
                      "data-[state=active]:bg-white data-[state=active]:text-black",
                      "text-white"
                    )}
                  >
                    Entrada manual de datos
                  </TabsTrigger>
                  <TabsTrigger 
                    value="dashboard" 
                    className={cn(
                      "data-[state=active]:bg-white data-[state=active]:text-black",
                      "text-white"
                    )}
                  >
                    Dashboard
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="manual">
                <div className="bg-black/20 backdrop-blur-sm rounded-lg p-6 text-white">
                  <h3 className="text-xl mb-4">Registro de Manual de ventas</h3>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="sales-amount" className="block">
                        Monto de ventas
                      </label>
                      <Input
                        id="sales-amount"
                        type="text"
                        value={salesAmount}
                        onChange={(e) => setSalesAmount(e.target.value)}
                        placeholder="0.00"
                        className="bg-transparent border-white/30 text-white"
                        prefix="$"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="location" className="block">
                        Ubicación
                      </label>
                      <Input
                        id="location"
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="bg-transparent border-white/30 text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="date" className="block">
                        Fecha
                      </label>
                      <Input
                        id="date"
                        type="text"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        placeholder="de Marzo de 2025"
                        className="bg-transparent border-white/30 text-white"
                      />
                    </div>
                  </form>
                </div>
                <div className="flex justify-end mt-4">
                  <Button 
                    type="submit" 
                    className="bg-white text-black hover:bg-white/90"
                    onClick={handleSubmit}
                  >
                    Registrar ventas
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="chat">
                <div className="bg-black/20 backdrop-blur-sm rounded-lg p-6 text-white h-64 flex items-center justify-center">
                  <p>Funcionalidad de chat en desarrollo</p>
                </div>
              </TabsContent>

              <TabsContent value="dashboard">
                <div className="bg-black/20 backdrop-blur-sm rounded-lg p-6 text-white h-64 flex items-center justify-center">
                  <p>Dashboard en desarrollo</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </section>
  );
}
