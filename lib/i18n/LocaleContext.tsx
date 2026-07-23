"use client";

import { createContext, useContext } from "react";
import { dictionaries, type Dictionary, type Locale } from "./dictionary";

const LocaleContext = createContext<{ locale: Locale; t: Dictionary } | null>(null);

export function LocaleProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  return (
    <LocaleContext.Provider value={{ locale, t: dictionaries[locale] }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error("useI18n must be used within a LocaleProvider");
  }
  return context;
}
