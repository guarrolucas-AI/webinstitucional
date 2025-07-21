'use client'

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
const teamMembers = [
  {
    name: "Lucas Cesar Guarro",
    role: "CEO Founder",
    image: "/lucas.jpeg",
    description:
      "Consultor en desarrollo de negocios. Especializado en estrategias de crecimiento y expansión para tu empresa...",
  },
  {
    name: "Cintia Vanina Christiansen",
    role: "Co-Founder",
    image: "/cintia.png",
    description:
      "Fundadora de Wikinbound con grandes habilidades de diseño y estrategias de CM...",
  },
  {
    name: "Gonzalo S. A. Gómez",
    role: "CTO",
    image: "/gonzalo.png",
    description:
      "Responsable de tecnología, software factory. Apasionado IT con numerosas habilidades...",
  },
  {
    name: "Jose Luis",
    role: "Consultor",
    image: "/jose-luis.jpeg",
    description:
      "Consultor con más de 30 años de experiencia trabajando para multinacionales...",
  },
  {
    name: "Juan",
    role: "Contador",
    image: "/placeholder.svg?height=128&width=128",
    description:
      "Contador público con gran experiencia nacional e internacional...",
  },
  {
    name: "Lourdes",
    role: "Community Manager",
    image: "/placeholder.svg?height=128&width=128",
    description: "Diseño y CM especializada en expresión artística...",
  },
  {
    name: "Mauro Young",
    role: "Abogado",
    image: "/placeholder.svg?height=128&width=128",
    description:
      "Abogado especializado en desarrollo de negocios con experiencia en derecho inmobiliario, penal y migraciones...",
  },
  {
    name: "Profesionales a disposición en Wikinbound",
    role: "Más equipo",
    image: "/placeholder.svg?height=128&width=128",
    description:
      "Contamos con muchos profesionales más para poder acompañarte a desarrollar tu negocio...",
  },
];

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6 },
  }),
  exit: { opacity: 0, y: 30, transition: { duration: 0.4 } },
};

function TeamMember({ member, index, isLast }: { member: typeof teamMembers[0]; index: number; isLast: boolean; }) {
  return (
    <motion.div
      custom={index}
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={`flex flex-col md:flex-row items-center bg-white/5 rounded-xl p-6 gap-6 ${
        isLast ? "border-b-0" : "border-b border-white/10"
      }`}
    >
      <div className="flex-shrink-0">
        <Image
          src={member.image}
          alt={member.name}
          width={128}
          height={128}
          className="rounded-full object-cover"
        />
      </div>
      <div className="flex-1 text-center md:text-left">
        <h2 className="text-2xl font-semibold text-white">{member.name}</h2>
        <p className="text-lg text-gray-400">{member.role}</p>
        <p className="mt-2 text-gray-300">{member.description}</p>
      </div>
    </motion.div>
  );
}

export default function TeamSection() {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.2 });
  const [visibleCount, setVisibleCount] = useState(3);

  useEffect(() => {
    controls.start(inView ? "visible" : "hidden");
  }, [inView, controls]);

  return (
    <section
      ref={ref}
      id="team"
      className="relative mt-10 w-full p-6 md:p-12 max-w-4xl mx-auto"
    >
      {/* Cabecera */}
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 30 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
        }}
        initial="hidden"
        animate={controls}
        className="mb-16 text-center"
      >
        <h1 className="mb-4 text-6xl font-bold text-white">Team</h1>
        <p className="text-xl text-gray-400">
          Tecnología, estrategia y personas construyendo soluciones integrales.
        </p>
      </motion.div>

      {/* Miembros */}
      <motion.div
        initial="hidden"
        animate={controls}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.1 } },
        }}
        className="space-y-8"
      >
        {teamMembers.slice(0, visibleCount).map((m, i) => (
          <TeamMember
            key={m.name}
            member={m}
            index={i}
            isLast={i === visibleCount - 1}
          />
        ))}

        {/* Botón Ver más / Ver menos */}
        <div className="text-center mt-8">
          {visibleCount < teamMembers.length ? (
            <button
              onClick={() => setVisibleCount(teamMembers.length)}
              className="rounded-xl border border-white/10 px-6 py-2 text-white hover:bg-white/10 transition"
            >
              Ver más colaboradores
            </button>
          ) : (
            <button
              onClick={() => setVisibleCount(3)}
              className="rounded-xl border border-white/10 px-6 py-2 text-white hover:bg-white/10 transition"
            >
              Ver menos colaboradores
            </button>
          )}
        </div>
      </motion.div>
    </section>
  );
}