"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getMessages, Lang } from "@/lib/i18n";

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: ReturnType<typeof getMessages>;
};

const LanguageContext = createContext<Ctx | null>(null);

export function LanguageProvider({ initialLang, children }: { initialLang?: Lang; children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initialLang || "en");

  useEffect(() => {
    try {
      const saved = (localStorage.getItem("lang") as Lang) || undefined;
      if (saved && saved !== lang) setLangState(saved);
    } catch {}
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem("lang", l);
      document.cookie = `lang=${l}; Path=/; Max-Age=31536000; SameSite=Lax`;
    } catch {}
  };

  const t = useMemo(() => getMessages(lang), [lang]);
  const value: Ctx = { lang, setLang, t };
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
