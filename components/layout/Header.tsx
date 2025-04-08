'use client'

import Link from 'next/link'
import { Menu } from "lucide-react"
import { cn } from "@/lib/utils"
import React from 'react'
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import Image from "next/image"
import { Button } from '../ui/button'



const navItems = [
  { label: "Servicios", href: "/#services" },
  { label: "Proyectos", href: "/#projects" },
  { label: "Simulador", href: "/#simulator" },
  { label: "Team", href: "/#team" },
  { label: "Whatsapp", href: "/#wpp", }, 
]
  const opacityValue = 0.4;

export function Header() {
    const [isScrolled, setIsScrolled] = React.useState(false)

    React.useEffect(() => {
      const handleScroll = () => {
        setIsScrolled(window.scrollY > 10)
      }
  
      window.addEventListener("scroll", handleScroll)
      return () => window.removeEventListener("scroll", handleScroll)
    }, [])


  return (
    <header className={cn('fixed top-0 z-50 pt-4 w-full transition-shadow duration-200', isScrolled)}>
    <div className="flex h-16 items-center justify-around px-4 md:px-6 mt-4 w-full">
      <div>
        <Link href="/" className="flex items-center space-x-2">
          <Image src={'/logo.png'} width={240} height={150} alt="Logo" />
        </Link>
      </div>
      <nav
        className="hidden rounded-xl backdrop-blur-xl pt-3 pb-3 pr-8 pl-8 md:flex md:items-center md:space-x-8"
        style={{
          background: `linear-gradient(to right, rgba(59,122,59,${opacityValue}), rgba(194,150,60,${opacityValue}), rgba(214,120,45,${opacityValue}), rgba(200,64,64,${opacityValue}), rgba(68,102,170,${opacityValue}))`
        }}
      >
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="text-sm font-medium text-white text-muted-foreground transition-colors hover:text-foreground"
          >
            {item.label === 'Whatsapp' ? (
              <Image src={'icons/whatsapp.svg'} width={22} height={22} alt="Whatsapp" />
            ) : (
              item.label
            )}
          </Link>
        ))}
      </nav>
  
      <div className="md:hidden flex items-center space-x-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <nav className="flex flex-col space-y-4 pt-10">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  </header>
  )
}
