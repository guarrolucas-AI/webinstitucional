import Link from "next/link"
import { Phone } from "lucide-react"

export default function Footer() {
  return (
        <div className="min-h-screen w-full flex items-center justify-center p-4">
        <div className="w-full max-w-6xl grid md:grid-cols-2 gap-8">

        {/* Footer */}
        <footer className="">
          {/* Logo */}
          <div className="flex justify-center py-12">
            <div className="flex items-center">
              <div className="bg-white rounded-md p-3 mr-3">
                <svg width="40" height="30" viewBox="0 0 40 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M5 5C8 15 15 20 20 20C25 20 30 15 35 5"
                    stroke="black"
                    strokeWidth="5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <div className="text-white">
                <div className="text-2xl font-bold tracking-wider">WIKI INBOUND</div>
                <div className="text-xs tracking-wider">CHANGE MANAGEMENT</div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="mx-auto my-6 max-w-3xl rounded-full bg-gradient-to-r from-blue-500/20 via-red-500/20 to-green-500/20 p-[1px]">
            <nav className="flex items-center justify-between rounded-full bg-zinc-900/90 px-8 py-4">
              <Link href="/servicios" className="px-4 text-white hover:text-gray-300">
                Servicios
              </Link>
              <span className="text-white">|</span>
              <Link href="/proyectos" className="px-4 text-white hover:text-gray-300">
                Proyectos
              </Link>
              <span className="text-white">|</span>
              <Link href="/simulador" className="px-4 text-white hover:text-gray-300">
                Simulador
              </Link>
              <span className="text-white">|</span>
              <Link href="/team" className="px-4 text-white hover:text-gray-300">
                Team
              </Link>
              <span className="text-white">|</span>
              <Link
                href="https://wa.me/message"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-green-600"
              >
                <Phone className="h-5 w-5" />
              </Link>
            </nav>
          </div>

          {/* Copyright */}
          <div className="flex justify-center pb-12 pt-6 text-white">
            <p>Desarrolado por Wikinbound</p>
            <span className="mx-4">|</span>
            <p>Copyright © 2025</p>
          </div>
        </footer>
        </div>
      </div>
  )
}

