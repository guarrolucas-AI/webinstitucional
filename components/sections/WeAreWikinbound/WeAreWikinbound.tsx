import { Icons } from "@/components/icons"

export const WeAreWikinbound = () => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-transparent relative z-0">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2 relative">

          {/* Gradients Backgrounds */}
          <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-red-500/20 blur-[120px] rounded-full z-0"></div>
          <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-green-500/20 blur-[120px] rounded-full z-0"></div>
          <div className="absolute top-1/2 right-0 w-1/3 h-1/3 bg-blue-500/20 blur-[120px] rounded-full transform -translate-y-1/2 z-0"></div>

          {/* Columna de contenido */}
          <div className="flex flex-col justify-center space-y-6 z-10">
            <div className="space-y-2">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-tight">
                We&apos;re Wikinbound
              </h1>
              <p className="text-xl md:text-2xl text-white">
                Desarrollamos soluciones innovadoras utilizando las tecnologías más avanzadas del mercado para garantizar
                resultados excepcionales.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 md:gap-6">
              {[
                "photoshop",
                "illustrator",
                "figma",
                "notion",
                "discord",
                "framer",
                "github",
              ].map((tech) => (
                <TechIcon key={tech} name={tech} />
              ))}
            </div>
          </div>

          {/* Badge flotante */}
          <div className="absolute top-6 right-6 z-10">
            <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-yellow-500 rounded-full px-4 py-2 text-white text-xs md:text-sm shadow-md">
              Simulador de Negocio con AI
            </div>
          </div>

          {/* Empty col (para balancear diseño 2 columnas si necesario) */}
          <div className="hidden lg:block" />
        </div>
      </div>
    </section>
  )
}

function TechIcon({ name }: { name: string }) {
  return (
    <div className="bg-white w-12 h-12 md:w-16 md:h-16 rounded-md flex items-center justify-center shadow-sm hover:scale-105 transition-transform duration-300">
      <Icons name={name} className="w-8 h-8 md:w-10 md:h-10 text-black" />
    </div>
  )
}
