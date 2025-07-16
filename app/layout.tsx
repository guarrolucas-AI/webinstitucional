import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { gotham, inter } from "@/assets/fonts";
import { cn } from "@/lib/utils";
import CustomCursor from "@/components/CustomCursor";

export const metadata: Metadata = {
  title: "Wikinbound – Soluciones digitales para negocios modernos",
  description:
    "Potenciamos empresas con desarrollo web, marketing digital, automatización y sistemas personalizados. Consultoría, diseño e innovación desde Argentina para el mundo.",
  openGraph: {
    title: "Wikinbound – Soluciones digitales para trasformar negocios modernos",
    description:
      "Consultoría, desarrollo web y automatización de procesos para empresas que buscan crecer. 6 años de experiencia en el mercado.",
    url: "https://wikinbound.com",
    siteName: "Wikinbound",
    images: [
      {
        url: "https://wikinbound.com/og-image.png", 
        width: 1200,
        height: 630,
        alt: "Wikinbound - Servicios digitales",
      },
    ],
    locale: "es_AR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wikinbound – Soluciones digitales para trasformar negocios modernos",
    description:
      "Desarrollo web, sistemas y consultoría con enfoque ágil y personalizado. Transformamos ideas en soluciones reales.",
    images: ["https://wikinbound.com/og-image.png"], 
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          'min-h-screen bg-[#121212] font-inter flex flex-col antialiased',
          gotham.variable,
          inter.variable
        )}
      >
        <main className="flex-1">
            <Header />
            {children}
            <div className="hidden md:flex ">
              <CustomCursor/>
            </div>
        </main>
      </body>
    </html>
  );
}
