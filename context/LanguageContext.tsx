'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ar } from '@/locales/ar';
import { en } from '@/locales/en';

type Language = 'ar' | 'en';
type Translations = typeof ar | typeof en;

interface LanguageContextType {
  lang: Language;
  dir: 'rtl' | 'ltr';
  t: Translations;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>('ar');
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const savedLang = localStorage.getItem('lang') as Language;
    if (savedLang === 'en' || savedLang === 'ar') {
      setLang(savedLang);
    }
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (!isInitialized) return;
    localStorage.setItem('lang', lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang, isInitialized]);

  const toggleLanguage = () => {
    setLang((prev) => (prev === 'ar' ? 'en' : 'ar'));
  };

  const t = lang === 'ar' ? ar : en;

  return (
    <LanguageContext.Provider value={{ lang, dir: t.dir, t, toggleLanguage }}>
      <div style={{ opacity: isInitialized ? 1 : 0, transition: 'opacity 0.15s ease-in' }}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return context;
}
