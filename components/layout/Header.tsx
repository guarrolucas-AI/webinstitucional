"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Image from "next/image";
import { Button } from "../ui/button";

const navItems = [
  { label: "Servicios", href: "#servicios" },
  { label: "Proyectos", href: "#proyectos" },
  { label: "Simulador", href: "#simulador" },
  { label: "Team", href: "#team" },
  { label: "Whatsapp", href: "/#wpp" },
];

const opacityValue = 0.4;

export function Header() {
  const [isScrolled, setIsScrolled] = React.useState(false);

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
        {/* Logo */}
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

        {/* Nav desktop */}
        <nav
          className="hidden md:flex items-center font-inter space-x-4 rounded-lg backdrop-blur-xl pt-2 pb-2 pr-8 pl-8 mr-13"
          style={{
            background: `linear-gradient(126deg, 
              rgba(59,122,9,${opacityValue}) 0%, 
              rgba(214,120,45,${opacityValue}) 20%, 
              rgba(200,64,64,${opacityValue}) 40%, 
              rgba(200,64,64,${opacityValue}) 60%, 
              rgba(68,102,170,${opacityValue}) 100%)`,
          }}>
          {navItems.map((item, index) => (
            <React.Fragment key={item.href}>
              <Link
                href={item.href}
                className="text-[0.60rem] font-light text-white transition-colors  hover:text-foreground"
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
                <span className="text-white/80  text-[10px]">|</span>
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
  className="w-10 h-10 rounded-md backdrop-blur-sm border border-white/20 shadow-md transition hover:scale-105"
  style={{
    background: `linear-gradient(
      250deg,
      rgba(59, 122, 59, 0.5) 0%,
      rgba(200, 64, 64, 0.5) 33%,
      rgba(214, 120, 45, 0.5) 66%,
      rgba(68, 102, 170, 0.5) 100%
    )`,
    backgroundSize: "cover",
  }}
>
  <Menu className="h-5 w-5 text-white" />
  <span className="sr-only">Menu</span>
</Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="bg-black/90 backdrop-blur-sm text-white"
            >
              <nav className="flex flex-col gap-6 mt-16 items-start">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-lg font-medium hover:text-primary transition-colors"
                  >
                    {item.label === "Whatsapp" ? (
                      <Image
                        src="icons/whatsapp.svg"
                        width={24}
                        height={24}
                        alt="Whatsapp"
                      />
                    ) : (
                      item.label
                    )}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
