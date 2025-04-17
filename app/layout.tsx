import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { gotham, inter } from "@/assets/fonts";
import { cn } from "@/lib/utils";
import NoiseBackground from "@/components/layout/NoiseBackground";

export const metadata: Metadata = {
  title: "Wikinbound",
  description: "Wikinbound es una pyme argentina dedicada al servicio de consultoría para negocios,incubadora de proyectos y desarrollo de software. Cuenta con 6 años en el mercado brindado servicios especializado a empresas nacionales e internacionales. La organización tiene un enfoque personalizado desde la empatía y desde la capacidad de análisis e interpretación de las necesidades del cliente. Tiene la capacidad de interpretar y de llevar a la realidad las ideas de los clientes en un tiempo reducido y con un nivel de servicio de excelencia",
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
          <NoiseBackground>
            <Header />
            {children}
          </NoiseBackground>
          {/*<Footer/> */}
        </main>
      </body>
    </html>
  );
}
