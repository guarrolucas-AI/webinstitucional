"use client";
import { useState } from "react";
import Image from "next/image";

const teamMembers = [
  {
    name: "Lucas Cesar Guarro",
    role: "CEO Founder",
    image: "/lucas.png",
    description: "Consultor en desarrollo de negocios. Especializado en estrategias de crecimiento y expansión para tu empresa que esta comenzando y también para aquella que necesita un impulso. 15 años de experiencia en multinacional y pymes.Especializado en incubación de proyectos, análisis de viabilidad y proyecciones económicas y de mercado. Agenda una reunión conmigo para que podamos evaluar juntos tus ideas, emprendimiento o tu empresa.",
  },
  {
    name: "Cintia Vanina Christiansen",
    role: "Co-Founder",
    image: "/cintia.png",
    description: "Fundadora de Wikinbound con grandes habilidades de diseño y estrategias de CM, especializada en creación de marca, captación de concepto de comunicación y estrategias de proyección efectiva.",
  },
  {
    name: "Gonzalo S. A. Gómez",
    role: "CTO",
    image: "/gonzalo.png",
    description: "Responsable de tecnología, software factory. Apasionado IT con numerosas habilidades para poder acompañarte en el desarrollo de tu idea. No dejes de soñar, de imaginar, nosotros podemos hacer realidad eso que siempre quisiste desarrollar.",
  },
  {
    name: "Juan",
    role: "Contador",
    image: "/placeholder.svg?height=128&width=128",
    description: "Contador público con gran experiencia nacional e internacional, integra nuestro equipo con el fin de garantizar los requerimientos contables y la viabilidad financiera de tus proyectos.",
  },
  {
    name: "Lourdes",
    role: "Community Manager",
    image: "/placeholder.svg?height=128&width=128",
    description: "Diseño y CM especializada en expresión artística, para que tus diseños sean únicos.",
  },
  {
    name: "Jose Luis",
    role: "Consultor",
    image: "/placeholder.svg?height=128&width=128",
    description: "Consultor con mas de 30 años de experiencia trabajando para multinacionales en las áreas soft de capital humano, gracias a él te podemos garantizar que vas a poder contar con los mejores profesionales para cada una de las tareas que tengas que delegar y desarrollar.",
  },
  {
    name: "Profesionales a disposición en Wikinbound",
    role: "Más equipo",
    image: "/placeholder.svg?height=128&width=128",
    description: "Contamos con muchos profesionales mas para poder acompañarte a desarrollar tu negocio, no dudes en contactarnos para poder conocerlos.",
  },
];

export default function TeamSection() {
  const [visibleCount, setVisibleCount] = useState(3);

  const showMore = () => {
    setVisibleCount(teamMembers.length);
  };

  const showLess = () => {
    setVisibleCount(3); // Puedes ajustar este valor según el número de miembros que quieras mostrar inicialmente
  };

  return (
    <section id="team" className="relative mt-10 w-full p-6 md:p-12">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-16 text-center">
          <h1 className="mb-4 text-6xl font-bold text-white">Team</h1>
          <p className="text-xl text-gray-400">
            Tecnología, estrategia y personas construyendo soluciones
            integrales.
          </p>
        </div>

        {/* Team Members */}
        <div className="space-y-8">
          {teamMembers.slice(0, visibleCount).map((member, index) => (
            <div key={index}>
              <div className="flex flex-col space-y-6 md:flex-row md:space-x-8 md:space-y-0">
                <div className="flex-shrink-0">
                  <div className="h-32 w-32 overflow-hidden rounded-full border-4 border-white ">
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={128}
                      height={128}
                      className="h-full w-full grayscale object-cover"
                    />
                  </div>
                </div>
                <div className="flex flex-col md:flex-row justify-between gap-6 w-full mb-1">
                  {/* Columna izquierda: Rol + Nombre */}
                  <div className="w-full md:w-1/3 mb-2">
                    <h2 className="text-2xl font-bold text-white">
                      {member.role}
                    </h2>
                    <p className="text-1xl text-gray-400">{member.name}</p>
                  </div>

                  {/* Columna derecha: Descripción */}
                  <div className="w-full md:w-3/3">
                    <p className="text-gray-400">{member.description}</p>
                  </div>
                </div>
              </div>
              {index < visibleCount - 1 && (
                <hr className="border-white my-6 ml-40" />
              )}
            </div>
          ))}

          {/* Show More or Show Less Button */}
          <div className="text-center mt-8">
            {visibleCount < teamMembers.length ? (
              <button
                onClick={showMore}
                className="rounded-xl border border-white/10 px-6 py-2 text-white hover:bg-white/10 transition"
              >
                Ver más colaboradores
              </button>
            ) : (
              <button
                onClick={showLess}
                className="rounded-xl border border-white/10 px-6 py-2 text-white hover:bg-white/10 transition"
              >
                Ver menos colaboradores
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
