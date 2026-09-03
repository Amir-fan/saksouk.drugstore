'use client';

import { createContext, useContext, useLayoutEffect, useState, ReactNode } from 'react';
import { siteContent } from '../content/site';

export type Language = 'en' | 'ar';
export type ContentType = typeof siteContent.en;

export const LanguageContext = createContext<{ lang: Language; setLang: (l: Language) => void; content: ContentType }>({
  lang: 'en', setLang: () => {}, content: siteContent.en,
});

export const useLanguage = () => useContext(LanguageContext);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>(() => {
    if (typeof window === 'undefined') return 'en';
    const saved = window.localStorage.getItem('saksouk_lang');
    return saved === 'ar' ? 'ar' : 'en';
  });

  useLayoutEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    localStorage.setItem('saksouk_lang', lang);
  }, [lang]);

  const content = siteContent[lang] as unknown as ContentType;

  return (
    <LanguageContext.Provider value={{ lang, setLang, content }}>
      {children}
    </LanguageContext.Provider>
  );
}
