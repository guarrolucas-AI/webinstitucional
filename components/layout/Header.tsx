"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import React from "react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import Image from "next/image";
import { Button } from "../ui/button";
import { useI18n } from "@/lib/i18n/LocaleContext";

const opacityValue = 0.5;

export function Header() {
  const { t } = useI18n();
  const [isScrolled, setIsScrolled] = React.useState(false);

  const navItems = [
    { label: t.nav.servicios, href: "#servicios" },
    { label: t.nav.proyectos, href: "#proyectos" },
    { label: t.nav.precios, href: "#precios" },
    { label: t.nav.contacto, href: "#contacto" },
    { label: t.nav.whatsapp, href: "https://wa.me/5491158346643" },
  ];

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full pt-4 transition-shadow duration-200",
        isScrolled
      )}
    >
      <div className="flex h-10 items-center justify-between px-4 md:px-6 mt-4 md:mt-20 w-full">
        <div>
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/logo.svg"
              width={180}
              height={180}
              alt="Logo"
              className="md:w-[280px] md:h-[250px]"
            />
          </Link>
        </div>
        <nav
          className="hidden md:flex items-center font-inter space-x-4 rounded-lg backdrop-blur-xl pt-2 pb-2 pr-8 pl-8 mr-13"
          style={{
            background: `linear-gradient(126deg, 
              rgba(59,122,9,${opacityValue}) 0%, 
              rgba(214,120,45,${opacityValue}) 20%, 
              rgba(200,64,64,${opacityValue}) 40%, 
              rgba(200,64,64,${opacityValue}) 60%, 
              rgba(68,102,170,${opacityValue}) 100%)`,
          }}
        >
          {navItems.map((item, index) => (
            <React.Fragment key={item.href}>
              <Link
                href={item.href}
                className="text-[0.60rem] font-light text-white transition-colors  hover:text-orange-400"
              >
                {item.label === "Whatsapp" ? (
                  <Image
                    src="icons/whatsapp.svg"
                    width={22}
                    height={22}
                    className="opacity-80 animate-pulse"
                    alt="Whatsapp"
                  />
                ) : (
                  item.label
                )}
              </Link>
              {index < navItems.length - 1 && (
                <span className="text-white/80 text-[10px]">|</span>
              )}
            </React.Fragment>
          ))}
        </nav>

        {/* Nav mobile */}
        <div className="md:hidden flex items-center space-x-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="w-10 h-10 rounded-md border border-white/30 bg-white/5 backdrop-blur-md shadow-md transition hover:scale-105 hover:bg-white/10"
              >
                <Menu className="h-5 w-5 text-white/70" />
                <span className="sr-only">Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
  side="right"
  className="bg-gradient-to-b from-black/90 via-neutral-900/80 to-black/80 backdrop-blur-md text-white border-l border-white/10 shadow-xl px-6 py-8"
>
  <div className="flex flex-col h-full justify-between">

    {/* TÍTULO + LOGO */}
    <div className="flex flex-col items-start">
      <Image
        src="/logo.svg"
        width={180}
        height={140}
        alt="Wikinbound"
        className="object-contain -ml-5"
        priority
      />
      <SheetTitle className="text-[11px] mt-2 font-semibold text-white/80 tracking-wide mb-2">
        Gestión del cambio con innovación y tecnología.</SheetTitle>
    </div>

    {/* NAVEGACIÓN */}
    <div className="flex-1 mt-10">
      <nav className="flex flex-col gap-5">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center gap-3 text-base font-medium tracking-wide hover:text-orange-400 transition-all"
          >
            {item.label === "Whatsapp" ? (
              <>
                <Image
                  src="/icons/whatsapp.svg"
                  width={20}
                  height={20}
                  alt="WhatsApp"
                  className="animate-pulse"
                />
                <span>Whatsapp</span>
              </>
            ) : (
              <span>{item.label}</span>
            )}
          </Link>
        ))}
      </nav>
    </div>

    {/* FOOTER */}
    <div className="pt-8 border-t border-white/10 text-center text-xs text-white/50">
      <p className="mb-1 font-semibold tracking-wide">Wikinbound</p>
      <p>© {new Date().getFullYear()} Todos los derechos reservados</p>
    </div>
  </div>
</SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
