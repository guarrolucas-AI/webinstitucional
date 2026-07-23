import type { Metadata } from "next";
import { cookies } from "next/headers";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { gotham, inter } from "@/assets/fonts";
import { cn } from "@/lib/utils";
import CustomCursor from "@/components/CustomCursor";
import { LocaleProvider } from "@/lib/i18n/LocaleContext";
import { dictionaries, type Locale } from "@/lib/i18n/dictionary";

async function getLocale(): Promise<Locale> {
  const cookieStore = await cookies();
  return cookieStore.get("NEXT_LOCALE")?.value === "en" ? "en" : "es";
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = dictionaries[locale].meta;

  return {
    metadataBase: new URL("https://wikinbound.com"),
    title: t.title,
    description: t.description,
    alternates: {
      canonical: "https://wikinbound.com",
    },
    openGraph: {
      title: t.ogTitle,
      description: t.ogDescription,
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
      locale: locale === "en" ? "en_US" : "es_AR",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t.ogTitle,
      description: t.ogDescription,
      images: ["https://wikinbound.com/og-image.png"],
    },
  };
}

const ORGANIZATION_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Wikinbound",
  url: "https://wikinbound.com",
  logo: "https://wikinbound.com/logo.svg",
  description:
    "Consultoría, desarrollo web, marketing digital y automatización de procesos para empresas que buscan crecer.",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+54-9-11-5834-6643",
    email: "contacto@wikinbound.com",
    contactType: "customer service",
    areaServed: "AR",
    availableLanguage: ["Spanish", "English"],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  return (
    <html lang={locale}>
      <body
        className={cn(
          'min-h-screen bg-[#121212] font-inter flex flex-col antialiased',
          gotham.variable,
          inter.variable
        )}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION_JSON_LD) }}
        />
        <LocaleProvider locale={locale}>
          <main className="flex-1">
              <Header />
              {children}
              <div className="hidden md:flex ">
                <CustomCursor/>
              </div>
          </main>
        </LocaleProvider>
      </body>
    </html>
  );
}
