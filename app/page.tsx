"use client";

import ColorsBg from "@/components/layout/ColorsBg";
import Footer from "@/components/layout/Footer";
import BusinessSimulator from "@/components/sections/BusinessAI/BusinessAi";
import ContactForm from "@/components/sections/Contact/Contact";
import Hero from "@/components/sections/Hero/Hero";
import ProyectosSection from "@/components/sections/Proyectos/Proyectos";
import ServiciosSection from "@/components/sections/Servicios/Servicios";
import { WeAreWikinbound } from "@/components/sections/WeAreWikinbound/WeAreWikinbound";
import React from "react";

const WebInstitucional = () => {
  return (
    <>
      <ColorsBg>
        <main className="flex flex-col px-4 space-y-24">
          <Hero section={ "home" } />
          <WeAreWikinbound />
          <ServiciosSection />
          <ProyectosSection />
          <BusinessSimulator />
          <ContactForm />
        </main>
        <Footer />
      </ColorsBg>
    </>
  );
};

export default WebInstitucional;
