import React from 'react'
import { Instagram, Megaphone, BadgePercent } from "lucide-react";

const icons = [
  <Instagram key="instagram" className="text-white text-lg" />,
  <Megaphone key="megaphone" className="text-white text-lg" />,
  <BadgePercent key="badge-percent" className="text-white text-lg" />,
];

interface AnimatedInboundProps {
  items?: { title: string; desc: string }[]
}

function AnimatedInbound({
  items = [
    { title: "Redes sociales", desc: "Captura atención visualmente." },
    { title: "Atracción", desc: "Genera tráfico cualificado." },
    { title: "Conversión", desc: "Convierte tráfico en clientes." },
  ],
}: AnimatedInboundProps) {
  const cards = items.map((item, i) => ({ ...item, icon: icons[i] }));
 return (
    <div className="flex flex-col h-[180px] w-full max-w-sm mx-auto gap-3 p-2">
      {cards.map((card, index) => (
        <div
          key={index}
          className="w-full text-left border border-white/20 backdrop-blur-sm rounded-lg overflow-hidden"
          style={{
            animation: `float 3s ease-in-out ${index * 0.3}s infinite`,
          }}
        >
          <div className="flex items-center gap-3 pl-3 pr-3 mb-1 mt-1">
            <div className="flex-shrink-0">
              {card.icon}
            </div>
            <div className="flex-1">
              <div className="text-white text-[15px] lg:font-medium">{card.title}</div>
              <div className="text-white text-[10px]  lg:text-sm">{card.desc}</div>
            </div>
          </div>
        </div>
      ))}
      
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
        }
      `}</style>
    </div>
  );
}

export default AnimatedInbound