import { Icons } from "@/components/icons"

export const WeAreWikinbound = () => {
  return (
    <section className="w-full flex justify-center items-center py-2 md:py-14 lg:py-22">
      
    <div className="container px-4 md:px-6 flex flex-col items-center justify-center text-center relative z-10 space-y-10">
      
      {/* Título y descripción */}
      <div className="space-y-6">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-tight">
          We&apos;re  <span
    style={{
      background: "linear-gradient(to right, white 35%,rgb(4, 45, 253) 60%, #fde047 80%, #f97316 90%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent"
    }}
  >
    Wikinbound
  </span>
        </h1>
        <p className="text-xl md:text-2xl text-white max-w-3xl mx-auto">
          Desarrollamos soluciones innovadoras utilizando las tecnologías más avanzadas del mercado para garantizar
          resultados excepcionales.
        </p>
      </div>

      {/* Íconos de tecnologías */}
      <div className="flex flex-wrap justify-center gap-4 md:gap-6">
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

      {/* Badge flotante */}
      <div className="relative top-6 right-6 z-10">
        <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-yellow-500 rounded-full px-4 py-2 text-white text-xs md:text-sm shadow-md">
          Simulador de Negocio con AI
        </div>
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
