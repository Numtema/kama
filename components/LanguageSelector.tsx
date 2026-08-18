'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Globe2, Check, ChevronDown } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';
import { SupportedLanguage } from '@/lib/translations';

interface LanguageSelectorProps {
  compact?: boolean;
}

export function LanguageSelector({ compact = false }: LanguageSelectorProps) {
  const { language, setLanguage, languages } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentOption = languages.find((l) => l.code === language) || languages[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (code: SupportedLanguage) => {
    setLanguage(code);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-1.5 rounded-full border border-[#121210]/10 bg-white hover:bg-stone-50 transition-all text-[#121210] shadow-xs active:scale-95 ${
          compact
            ? 'px-2.5 py-1.5 text-xs'
            : 'px-3 py-2 text-xs font-semibold'
        }`}
        title="Changer de langue / Change language"
        aria-label={`Langue actuelle: ${currentOption.label}`}
      >
        <Globe2 className="w-3.5 h-3.5 text-[#A65438]" />
        <span className="font-mono text-[11px] uppercase tracking-wider font-bold">
          {currentOption.code}
        </span>
        <ChevronDown
          className={`w-3 h-3 text-stone-500 transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-[#F2B844]' : ''
          }`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.95 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="absolute right-0 top-full mt-2 w-48 p-1.5 rounded-2xl bg-[#FAF9F5] border border-[#121210]/12 shadow-[0_16px_36px_rgba(18,18,16,0.12)] z-50 backdrop-blur-2xl"
          >
            <div className="px-2.5 py-1.5 text-[9px] uppercase tracking-widest font-bold text-[#77746A] border-b border-[#121210]/6 mb-1">
              Langue / Language
            </div>

            <div className="space-y-0.5">
              {languages.map((lang) => {
                const isSelected = lang.code === language;
                return (
                  <button
                    key={lang.code}
                    onClick={() => handleSelect(lang.code)}
                    className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-xs font-medium transition-all text-left ${
                      isSelected
                        ? 'bg-[#121210] text-[#FAF9F5] font-bold shadow-xs'
                        : 'hover:bg-white text-[#121210]'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span className="text-sm leading-none">{lang.flag}</span>
                      <span>{lang.nativeLabel}</span>
                    </span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-[#F2B844]" />}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
