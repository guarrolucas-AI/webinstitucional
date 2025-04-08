'use client'

import NoiseBackground from '@/components/layout/NoiseBackground';
import BusinessSimulator from '@/components/sections/BusinessAI/BusinessAi';
import ContactForm from '@/components/sections/Contact/Contact';
import Hero from '@/components/sections/Hero/Hero'
import ProyectosSection from '@/components/sections/Proyectos/Proyectos';
import ServiciosSection from '@/components/sections/Servicios/Servicios';
import TeamSection from '@/components/sections/Team/Team';
import { WeAreWikinbound } from '@/components/sections/WeAreWikinbound/WeAreWikinbound';
import React from 'react'

const WebInstitucional = () => {
  return (
    <>
    <NoiseBackground>
    <Hero />
    </NoiseBackground>
    <NoiseBackground>
    <WeAreWikinbound />
    </NoiseBackground>
     {/*
    <ServiciosSection />
    <ProyectosSection />
    <BusinessSimulator />
    <TeamSection />
    <ContactForm />  */}
    </>
  )
};

export default WebInstitucional;

