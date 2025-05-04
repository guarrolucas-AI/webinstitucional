import { User, Circle } from "lucide-react"
import Image from "next/image"

export default function ProyectosSection() {
  return (
    <section id='proyectos' className="w-full text-white py-16 px-4">
       <div className="absolute top-480 right-100 w-full flex justify-center -translate-y-1/2 z-0">
          <Image
            src='w.svg'
            width={580}
            height={580}
            alt="Decoración W"
          />
        </div>
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-16">
          <h1 className="text-6xl font-regylar mb-4">Proyectos</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* E-Commerce Card */}
          <div className="rounded-3xl overflow-hidden backdrop-blur-sm bg-white/5 border border-white/10 p-6 flex flex-col h-96">
            <div className="flex-1 flex items-center justify-center relative">
              <div className="absolute inset-0 opacity-20 flex items-center justify-center">
                <div className="grid grid-cols-3 gap-4">
                  {["visa", "mastercard", "paypal", "mercado", "stripe"].map((brand, i) => (
                    <div key={i} className="w-16 h-10 bg-white/30 rounded-md"></div>
                  ))}
                </div>
              </div>
              <div className="relative z-10 rounded-full border-2 border-white/50 w-40 h-40 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-5xl font-bold">100+</div>
                  <div className="text-sm">Automations</div>
                </div>
              </div>
            </div>
            <div className="mt-6">
              <h2 className="text-2xl font-medium">E-Commerce</h2>
              <h3 className="text-3xl font-bold">para Negocios</h3>
            </div>
          </div>

          {/* Estrategia Card */}
          <div className="rounded-3xl overflow-hidden backdrop-blur-sm bg-white/5 border border-white/10 p-6 flex flex-col h-96">
            <div className="flex-1 flex flex-col justify-center space-y-6">
              <div className="flex items-center space-x-3">
                <div className="bg-white/10 p-2 rounded-md">
                  <User size={24} />
                </div>
                <div>
                  <div className="font-medium">Lead 1</div>
                  <div className="text-sm text-gray-400">Lorem ipsum dolor sit</div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="bg-white/10 p-2 rounded-md">
                  <Circle size={24} />
                </div>
                <div>
                  <div className="font-medium">Estrategia</div>
                  <div className="text-sm text-gray-400">Lorem ipsum dolor sit</div>
                </div>
              </div>

              <div className="w-full h-10 bg-white/10 rounded-full overflow-hidden flex items-center">
                <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 w-3/4"></div>
                <div className="ml-auto mr-2">
                  <span className="text-xs">▶</span>
                </div>
              </div>
            </div>
            <div className="mt-6">
              <h2 className="text-2xl font-medium">Estrategia de</h2>
              <h3 className="text-3xl font-bold">Leads</h3>
            </div>
          </div>

          {/* Sistemas Card */}
          <div className="rounded-3xl overflow-hidden backdrop-blur-sm bg-white/5 border border-white/10 p-6 flex flex-col h-96">
            <div className="flex-1 flex items-center justify-center">
              <div className="w-full h-40 relative">
                <svg viewBox="0 0 300 100" className="w-full h-full">
                  <path
                    d="M0,50 Q75,10 150,50 Q225,90 300,50"
                    fill="none"
                    stroke="white"
                    strokeWidth="1.5"
                    className="opacity-50"
                  />
                  <circle cx="150" cy="50" r="4" fill="white" />
                  <circle cx="300" cy="50" r="4" fill="white" />
                </svg>
              </div>
            </div>
            <div className="mt-6">
              <h2 className="text-2xl font-medium">
                Sistemas de <span className="font-bold">Gestión</span>
              </h2>
              <h3 className="text-3xl font-bold">personalizados</h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

