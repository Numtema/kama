'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  SupportedLanguage,
  SUPPORTED_LANGUAGES,
  LanguageOption,
  translations,
} from './translations';

interface LanguageContextType {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  t: (key: string, fallback?: string) => string;
  languages: LanguageOption[];
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = 'kama_preferred_language';

function getInitialLanguage(): SupportedLanguage {
  if (typeof window === 'undefined') return 'fr';
  try {
    const savedLang = localStorage.getItem(STORAGE_KEY) as SupportedLanguage | null;
    if (savedLang && ['fr', 'en', 'es', 'pt', 'ar'].includes(savedLang)) {
      return savedLang;
    }
  } catch {
    // Ignore localStorage read errors
  }

  if (typeof window !== 'undefined' && window.navigator) {
    const browserLang = (navigator.language || (navigator.languages && navigator.languages[0]) || 'fr').toLowerCase();
    if (browserLang.startsWith('en')) return 'en';
    if (browserLang.startsWith('es')) return 'es';
    if (browserLang.startsWith('pt')) return 'pt';
    if (browserLang.startsWith('ar')) return 'ar';
    if (browserLang.startsWith('fr')) return 'fr';
  }
  return 'fr';
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<SupportedLanguage>(getInitialLanguage);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = language;
      document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    }
  }, [language]);

  const setLanguage = (lang: SupportedLanguage) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // Ignore storage errors
    }
  };

  const t = (key: string, fallback?: string): string => {
    const langDict = translations[language] || translations.fr;
    if (langDict && langDict[key]) {
      return langDict[key];
    }
    // Fallback to French if missing in target lang
    if (translations.fr && translations.fr[key]) {
      return translations.fr[key];
    }
    return fallback || key;
  };

  const isRTL = language === 'ar';

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
        languages: SUPPORTED_LANGUAGES,
        isRTL,
      }}
    >
      <div dir={isRTL ? 'rtl' : 'ltr'} className="w-full transition-opacity">
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (!context) {
    // Safe fallback if used outside provider
    return {
      language: 'fr',
      setLanguage: () => {},
      t: (key: string, fallback?: string) => translations.fr[key] || fallback || key,
      languages: SUPPORTED_LANGUAGES,
      isRTL: false,
    };
  }
  return context;
}
