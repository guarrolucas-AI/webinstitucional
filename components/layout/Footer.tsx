import Link from "next/link";
import Image from "next/image";
import React from "react";
import { motion, } from "framer-motion";
import { useInView } from "react-intersection-observer";

const navItems = [
  { label: "Servicios", href: "#servicios" },
  { label: "Proyectos", href: "#proyectos" },
  { label: "Simulador", href: "#simulador" },
  { label: "Team", href: "#team" },
  { label: "Whatsapp", href: "/#wpp" },
];

const opacityValue = 0.4;

export default function Footer() {
  const { ref, inView } = useInView({
    triggerOnce: false, // para que se repita cada vez que entra en pantalla
    threshold: 0.1, // se activa cuando al menos el 10% del footer se ve
  });

  return (
    <motion.footer
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full bg-black/20 mt-20 flex flex-col items-center"
    >
      {/* Logo */}
      <div className="py-12">
        <Link href="/" className="flex items-center justify-center">
          <Image src="/logo-blanco.svg" width={270} height={250} alt="Logo" />
        </Link>
      </div>

      {/* Navigation */}
      <nav
        className="rounded-lg backdrop-blur-xl px-10 py-2 flex items-center justify-between"
        style={{
          background: `linear-gradient(to right, rgba(59,122,59,${opacityValue}), rgba(200,64,64,${opacityValue}), rgba(214,120,45,${opacityValue}), rgba(68,102,170,${opacityValue}))`,
        }}
      >
        {navItems.map((item, index) => (
          <React.Fragment key={item.href}>
            <Link
              href={item.href}
              className="text-[0.60rem] font-light text-white text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label === "Whatsapp" ? (
                <Image
                  src="icons/whatsapp.svg"
                  width={22}
                  height={22}
                  alt="Whatsapp"
                />
              ) : (
                item.label
              )}
            </Link>
            {index < navItems.length - 1 && (
              <span className="text-white font-light text-[15px] mx-3">|</span>
            )}
          </React.Fragment>
        ))}
      </nav>

      {/* Copyright */}
      <div className="flex justify-center items-center text-center pt-6 pb-12 text-white text-xs space-x-4">
        <p>Desarrollado por Wikinbound</p>
        <span>|</span>
        <p>Copyright © 2025</p>
      </div>
    </motion.footer>
  );
}
