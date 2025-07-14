interface CardsProps {
    title: string
    subtitle: string
    description: string
    children: React.ReactNode
  }
  
  const opacityValue = 0.2

  function Cards({ title, subtitle, description, children }: CardsProps) {
    return (
      <div className="rounded-3xl overflow-hidden backdrop-blur-sm border border-white/10 flex flex-col z-1 relative w-full max-w-full sm:max-w-xl md:max-w-2xl mx-auto">
        <div
          className="absolute inset-0 opacity-20 mix-blend-soft-light pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 300 300' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")`,
          }}
        />
  
        {/* Contenido principal */}
        <div
  className="flex items-center justify-center m-4 sm:m-5 p-4 sm:p-6 border rounded-3xl border-white/80 relative min-h-[200px] sm:min-h-[240px] overflow-hidden"
  style={{
    background: `linear-gradient(126deg, rgba(59,122,59,${opacityValue}), rgba(200,64,64,${opacityValue}), rgba(214,120,45,${opacityValue}), rgba(68,102,170,${opacityValue}))`,
  }}
>
          {children}
        </div>
  
        <div className="p-4 sm:p-6 pt-0 relative z-10">
          <h3 className="text-white text-xl sm:text-2xl text-left font-normal">{title}</h3>
          <h4 className="text-white text-xl sm:text-2xl text-left font-bold mb-2 sm:mb-3">{subtitle}</h4>
          <p className="text-white/80 text-left text-sm">{description}</p>
        </div>
      </div>
    )
  }
  
  export default Cards
  