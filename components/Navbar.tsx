'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { KamaSun } from './KamaSun';
import { 
  Search, 
  Menu, 
  X, 
  Sparkles, 
  Bookmark, 
  Layers, 
  Clock, 
  Video, 
  Compass, 
  UploadCloud, 
  Bot,
  Globe2,
  ChevronDown,
  Users,
  Building2,
  MapPin,
  Calendar,
  Zap,
  Sparkle,
  Atom,
  Palette,
  Scale,
  Flame,
  Plane,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { EntityType } from '@/lib/types';

interface NavbarProps {
  onOpenSearch?: () => void;
  onOpenAssistant?: () => void;
  onOpenArchivist?: () => void;
  onOpenUploader?: () => void;
  savedCount?: number;
  onOpenSaved?: () => void;
  activeSection?: string;
  onNavigateToSection?: (sectionId: string) => void;
  onSelectEntity?: (type: EntityType, id: string) => void;
  onExploreCategory?: (category: string) => void;
}

export function Navbar({
  onOpenSearch,
  onOpenAssistant,
  onOpenArchivist,
  onOpenUploader,
  savedCount = 0,
  onOpenSaved,
  activeSection = 'decouvrir',
  onNavigateToSection,
  onSelectEntity,
  onExploreCategory
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isExplorePanelOpen, setIsExplorePanelOpen] = useState(false);
  const [isMobileExploreSheetOpen, setIsMobileExploreSheetOpen] = useState(false);
  const exploreRef = useRef<HTMLDivElement>(null);

  const handleAssistant = onOpenArchivist || onOpenAssistant || (() => {});

  const handleNavClick = (sectionId: string) => {
    setIsMobileMenuOpen(false);
    setIsExplorePanelOpen(false);
    setIsMobileExploreSheetOpen(false);
    if (onNavigateToSection) {
      onNavigateToSection(sectionId);
    } else {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Close explore dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (exploreRef.current && !exploreRef.current.contains(event.target as Node)) {
        setIsExplorePanelOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Top-level menu: Discover, Explorer, Timeline, Media Library
  const topMenuItems = [
    { id: 'decouvrir', label: 'Découvrir', target: 'decouvrir' },
    { id: 'explorer', label: 'Explorer', isMegaDropdown: true },
    { id: 'chronologie', label: 'Chronologie', target: 'chronologie' },
    { id: 'regarder', label: 'Médiathèque', target: 'regarder' },
  ];

  // The 11 mandatory categories for the Explorer panel
  const explorerCategories = [
    { 
      id: 'people', 
      label: 'Personnages', 
      desc: 'Souverains, stratèges, savants & héros', 
      icon: Users,
      color: 'text-[#A65438]',
      bg: 'bg-[#A65438]/10',
      target: 'personnes'
    },
    { 
      id: 'civilizations', 
      label: 'Civilisations', 
      desc: 'Mali, Songhaï, Kongo, Aksoum, Kemet', 
      icon: Building2,
      color: 'text-[#F2B844]',
      bg: 'bg-[#F2B844]/15',
      target: 'civilisations'
    },
    { 
      id: 'countries', 
      label: 'Territoires', 
      desc: 'Territoires ancestraux & géopolitique', 
      icon: MapPin,
      color: 'text-[#1F392E]',
      bg: 'bg-[#1F392E]/10',
      target: 'explorer'
    },
    { 
      id: 'eras', 
      label: 'Époques', 
      desc: 'Antiquité, Moyen Âge, Indépendances', 
      icon: Calendar,
      color: 'text-amber-700',
      bg: 'bg-amber-100',
      target: 'chronologie'
    },
    { 
      id: 'events', 
      label: 'Événements', 
      desc: '1236, 1791, 1804, 1896, 1960, 1983', 
      icon: Zap,
      color: 'text-red-700',
      bg: 'bg-red-100',
      target: 'chronologie'
    },
    { 
      id: 'cultures', 
      label: 'Cultures', 
      desc: 'Cosmogonies, Ubuntu, griots & mémoires', 
      icon: Sparkle,
      color: 'text-purple-700',
      bg: 'bg-purple-100',
      target: 'stories'
    },
    { 
      id: 'sciences', 
      label: 'Sciences', 
      desc: 'Astronomie, manuscrits & métallurgie', 
      icon: Atom,
      color: 'text-cyan-800',
      bg: 'bg-cyan-100',
      target: 'graphe'
    },
    { 
      id: 'arts', 
      label: 'Arts', 
      desc: 'Bronzes, masques, Négritude & musiques', 
      icon: Palette,
      color: 'text-rose-700',
      bg: 'bg-rose-100',
      target: 'decouvrir'
    },
    { 
      id: 'politics', 
      label: 'Politique', 
      desc: 'Panafricanisme, traités & chartes', 
      icon: Scale,
      color: 'text-emerald-800',
      bg: 'bg-emerald-100',
      target: 'graphe'
    },
    { 
      id: 'resistances', 
      label: 'Résistances', 
      desc: 'Marronnage, révoltes & anticolonialisme', 
      icon: Flame,
      color: 'text-orange-700',
      bg: 'bg-orange-100',
      target: 'parcours'
    },
    { 
      id: 'diasporas', 
      label: 'Diasporas', 
      desc: 'Caraïbes, Amériques & mondes noirs', 
      icon: Plane,
      color: 'text-blue-700',
      bg: 'bg-blue-100',
      target: 'explorer'
    }
  ];

  const handleCategoryClick = (cat: typeof explorerCategories[0]) => {
    setIsExplorePanelOpen(false);
    setIsMobileMenuOpen(false);
    setIsMobileExploreSheetOpen(false);
    if (onExploreCategory) {
      onExploreCategory(cat.id);
    }
    handleNavClick(cat.target);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 px-3 sm:px-6 md:px-8 pt-2.5 sm:pt-4 transition-all">
        <div className="max-w-7xl mx-auto">
          <motion.nav
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className={`relative flex items-center justify-between px-3.5 sm:px-6 py-2 sm:py-3 rounded-full transition-all duration-300 ${
              isScrolled
                ? 'bg-[#FAF9F5]/92 backdrop-blur-xl border border-[#121210]/12 shadow-[0_12px_32px_rgba(20,18,12,0.08)]'
                : 'bg-[#FAF9F5]/80 backdrop-blur-md border border-[#121210]/8 shadow-sm'
            }`}
          >
            {/* Logo & Brand Flag */}
            <div 
              onClick={() => handleNavClick('hero')}
              className="flex items-center gap-2.5 sm:gap-3 cursor-pointer group select-none min-h-[44px]"
            >
              <KamaSun size={30} animate={true} />
              <div className="flex flex-col">
                <span className="text-lg sm:text-2xl font-bold tracking-tight text-[#121210] font-sans flex items-center gap-1.5 leading-none">
                  KAMA
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F2B844]" />
                </span>
                <span className="text-[8.5px] sm:text-[9px] uppercase tracking-widest text-[#77746A] font-semibold mt-0.5">
                  The Living Archive
                </span>
              </div>
            </div>

            {/* Clean Top-Level Navigation Menu (Discover, Explorer, Timeline, Media Library) */}
            <div className="hidden md:flex items-center gap-1 lg:gap-1.5" ref={exploreRef}>
              {topMenuItems.map((item) => {
                if (item.isMegaDropdown) {
                  return (
                    <div key={item.id} className="relative">
                      <button
                        onClick={() => setIsExplorePanelOpen(!isExplorePanelOpen)}
                        className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all min-h-[40px] ${
                          isExplorePanelOpen
                            ? 'bg-[#121210] text-[#FAF9F5] shadow-sm'
                            : 'text-[#46443D] hover:bg-stone-200/60 hover:text-[#121210]'
                        }`}
                      >
                        <Compass className="w-3.5 h-3.5 text-[#A65438]" />
                        <span>{item.label}</span>
                        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isExplorePanelOpen ? 'rotate-180 text-[#F2B844]' : 'text-[#77746A]'}`} />
                      </button>

                      {/* Sophisticated Expandable Mega-Panel for 'Explorer' */}
                      <AnimatePresence>
                        {isExplorePanelOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 12, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 8, scale: 0.98 }}
                            transition={{ duration: 0.18, ease: 'easeOut' }}
                            className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[680px] lg:w-[760px] p-5 rounded-3xl bg-[#FAF9F5] border border-[#121210]/12 shadow-[0_24px_54px_rgba(18,18,16,0.14)] z-50 backdrop-blur-2xl"
                          >
                            {/* Mega-Panel Header with Search Shortcut & Knowledge Graph Link */}
                            <div className="flex items-center justify-between pb-3.5 mb-3.5 border-b border-[#121210]/8">
                              <div className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-[#F2B844]" />
                                <h4 className="text-xs uppercase font-bold tracking-widest text-[#121210]">
                                  Explorer les 11 Univers KAMA
                                </h4>
                              </div>

                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => {
                                    setIsExplorePanelOpen(false);
                                    handleNavClick('graphe');
                                  }}
                                  className="text-[11px] font-bold text-[#A65438] hover:text-[#743825] flex items-center gap-1 bg-[#A65438]/10 px-2.5 py-1 rounded-full transition-colors"
                                >
                                  <span>Graphe de Connaissances</span>
                                  <ArrowRight className="w-3 h-3" />
                                </button>
                              </div>
                            </div>

                            {/* The 11 Categories Grid */}
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                              {explorerCategories.map((cat) => {
                                const Icon = cat.icon;
                                return (
                                  <button
                                    key={cat.id}
                                    onClick={() => handleCategoryClick(cat)}
                                    className="text-left p-3 rounded-2xl bg-white hover:bg-[#FFF2CE]/60 border border-[#121210]/6 hover:border-[#121210]/15 transition-all group flex items-start gap-2.5"
                                  >
                                    <div className={`p-2 rounded-xl shrink-0 ${cat.bg} ${cat.color} group-hover:scale-105 transition-transform`}>
                                      <Icon className="w-4 h-4" />
                                    </div>
                                    <div className="min-w-0">
                                      <div className="text-xs font-bold text-[#121210] group-hover:text-[#A65438] transition-colors leading-tight">
                                        {cat.label}
                                      </div>
                                      <div className="text-[10px] text-[#77746A] line-clamp-1 mt-0.5">
                                        {cat.desc}
                                      </div>
                                    </div>
                                  </button>
                                );
                              })}
                            </div>

                            {/* Scientific Standards Footer */}
                            <div className="mt-4 pt-3 border-t border-[#121210]/8 flex items-center justify-between text-[11px] text-[#77746A]">
                              <span className="flex items-center gap-1.5">
                                <ShieldCheck className="w-3.5 h-3.5 text-[#1F392E]" />
                                Corpus sourcé : UNESCO, archives nationales & manuscrits originaux.
                              </span>
                              <button
                                onClick={() => {
                                  setIsExplorePanelOpen(false);
                                  if (onOpenSearch) onOpenSearch();
                                }}
                                className="font-bold text-[#121210] hover:text-[#A65438] underline"
                              >
                                Recherche avancée ⌘K
                              </button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                const isActive = activeSection === item.target;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.target!)}
                    className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all min-h-[40px] ${
                      isActive
                        ? 'bg-[#121210] text-[#FAF9F5] shadow-sm'
                        : 'text-[#46443D] hover:bg-stone-200/60 hover:text-[#121210]'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>

            {/* Right Action Tools: Search Icon, Archiviste IA, Contribuer */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              {/* Search Button (with Search Icon) */}
              <button
                onClick={onOpenSearch}
                className="flex items-center justify-center gap-1.5 px-3 sm:px-4 py-2 rounded-full bg-white hover:bg-stone-50 text-[#121210] border border-[#121210]/10 shadow-sm text-xs font-semibold transition-all group min-h-[44px]"
                title="Rechercher (⌘K)"
                aria-label="Ouvrir la recherche"
              >
                <Search className="w-4 h-4 text-[#A65438] group-hover:scale-110 transition-transform" />
                <span className="hidden sm:inline">Rechercher</span>
                <kbd className="hidden lg:inline-block px-1.5 py-0.5 text-[10px] font-mono text-stone-500 bg-stone-100 rounded border border-stone-200">
                  ⌘K
                </kbd>
              </button>

              {/* Archiviste IA Trigger */}
              <button
                onClick={handleAssistant}
                className="hidden sm:flex px-3 py-2 rounded-full bg-[#F2B844]/20 hover:bg-[#F2B844]/35 text-[#743825] border border-[#F2B844]/40 text-xs font-bold items-center gap-1.5 transition-all min-h-[44px]"
                title="Archiviste IA KAMA"
              >
                <Sparkles className="w-4 h-4 text-[#A65438]" />
                <span className="hidden xl:inline">Archiviste IA</span>
              </button>

              {/* Mobile Hamburger Menu Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden w-11 h-11 rounded-full bg-white border border-[#121210]/10 text-[#121210] flex items-center justify-center active:scale-95 transition-transform"
                aria-label="Ouvrir le menu complet"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </motion.nav>

          {/* Mobile Navigation Drawer */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="md:hidden mt-2 p-4 sm:p-5 rounded-3xl bg-[#FAF9F5] border border-[#121210]/12 shadow-2xl space-y-4 max-h-[80vh] overflow-y-auto"
              >
                <div className="flex items-center justify-between px-2 pb-2 border-b border-[#121210]/8">
                  <span className="text-[10px] uppercase font-bold text-[#77746A] tracking-wider">
                    Menu KAMA Living Archive
                  </span>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-1 rounded-full text-stone-500 hover:text-stone-900"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Primary navigation list */}
                <div className="space-y-1">
                  {topMenuItems.map((item) => {
                    if (item.isMegaDropdown) {
                      return (
                        <div key={item.id} className="pt-1">
                          <button
                            onClick={() => {
                              setIsMobileMenuOpen(false);
                              setIsMobileExploreSheetOpen(true);
                            }}
                            className="w-full text-left py-3 px-3.5 rounded-2xl bg-white border border-[#121210]/8 text-xs font-bold text-[#121210] flex items-center justify-between shadow-2xs active:bg-stone-50"
                          >
                            <span className="flex items-center gap-2">
                              <Compass className="w-4 h-4 text-[#A65438]" />
                              <span>Explorer les 11 Univers KAMA</span>
                            </span>
                            <span className="text-[10px] font-mono text-[#A65438] bg-[#A65438]/10 px-2 py-0.5 rounded-full">
                              11 rubriques →
                            </span>
                          </button>
                        </div>
                      );
                    }

                    return (
                      <button
                        key={item.id}
                        onClick={() => handleNavClick(item.target!)}
                        className="w-full text-left py-3 px-3.5 rounded-2xl text-sm font-bold text-[#121210] hover:bg-white border border-transparent hover:border-[#121210]/6 transition-colors flex items-center justify-between min-h-[46px]"
                      >
                        <span>{item.label}</span>
                        <ArrowRight className="w-4 h-4 text-[#77746A]" />
                      </button>
                    );
                  })}
                </div>

                {/* Quick actions in mobile menu */}
                <div className="pt-3 border-t border-[#121210]/10 flex flex-col gap-2">
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      handleAssistant();
                    }}
                    className="w-full py-3 px-4 rounded-2xl bg-[#F2B844]/20 hover:bg-[#F2B844]/30 text-[#743825] text-xs font-bold flex items-center justify-center gap-2 border border-[#F2B844]/40 min-h-[46px]"
                  >
                    <Sparkles className="w-4 h-4 text-[#A65438]" />
                    <span>Lancer l’Archiviste IA KAMA</span>
                  </button>

                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      handleNavClick('graphe');
                    }}
                    className="w-full py-3 px-4 rounded-2xl bg-white text-[#121210] text-xs font-bold flex items-center justify-center gap-2 border border-[#121210]/10 min-h-[46px]"
                  >
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span>Graphe de Connaissances Dynamique</span>
                  </button>

                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      if (onOpenUploader) onOpenUploader();
                      else handleNavClick('archives');
                    }}
                    className="w-full py-3 px-4 rounded-2xl bg-[#1F392E]/10 text-[#1F392E] text-xs font-bold flex items-center justify-center gap-2 border border-[#1F392E]/20 min-h-[46px]"
                  >
                    <UploadCloud className="w-4 h-4" />
                    <span>Contribuer une archive (Vercel Blob)</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* Mobile Bottom Navigation Dock (Barre de navigation rapide optimisée pouce) */}
      <nav 
        aria-label="Navigation mobile rapide"
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FAF9F5]/92 backdrop-blur-xl border-t border-[#121210]/12 px-3 py-1.5 pb-safe shadow-[0_-8px_24px_rgba(18,18,16,0.08)] flex items-center justify-around"
      >
        {/* 1. Découvrir */}
        <button
          onClick={() => handleNavClick('decouvrir')}
          className="flex flex-col items-center justify-center py-1 px-2.5 rounded-2xl transition-all min-h-[48px] min-w-[56px] active:scale-95 text-[#121210]"
        >
          <Layers className="w-5 h-5 text-[#A65438]" />
          <span className="text-[10px] font-bold mt-0.5 tracking-tight">Découvrir</span>
        </button>

        {/* 2. Explorer (Opens Mobile Univers Sheet) */}
        <button
          onClick={() => setIsMobileExploreSheetOpen(true)}
          className="flex flex-col items-center justify-center py-1 px-2.5 rounded-2xl transition-all min-h-[48px] min-w-[56px] active:scale-95 text-[#121210]"
        >
          <Compass className="w-5 h-5 text-[#F2B844]" />
          <span className="text-[10px] font-bold mt-0.5 tracking-tight">Explorer</span>
        </button>

        {/* 3. Chronologie */}
        <button
          onClick={() => handleNavClick('chronologie')}
          className="flex flex-col items-center justify-center py-1 px-2.5 rounded-2xl transition-all min-h-[48px] min-w-[56px] active:scale-95 text-[#121210]"
        >
          <Clock className="w-5 h-5 text-stone-700" />
          <span className="text-[10px] font-bold mt-0.5 tracking-tight">Chronologie</span>
        </button>

        {/* 4. Recherche (⌘K) */}
        <button
          onClick={onOpenSearch}
          className="flex flex-col items-center justify-center py-1 px-2.5 rounded-2xl transition-all min-h-[48px] min-w-[56px] active:scale-95 text-[#121210]"
        >
          <Search className="w-5 h-5 text-[#A65438]" />
          <span className="text-[10px] font-bold mt-0.5 tracking-tight">Recherche</span>
        </button>

        {/* 5. Archiviste IA */}
        <button
          onClick={handleAssistant}
          className="flex flex-col items-center justify-center py-1 px-2.5 rounded-2xl transition-all min-h-[48px] min-w-[56px] active:scale-95 text-[#743825]"
        >
          <div className="relative">
            <Sparkles className="w-5 h-5 text-[#A65438]" />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#F2B844] animate-pulse" />
          </div>
          <span className="text-[10px] font-bold mt-0.5 tracking-tight">Archiviste</span>
        </button>
      </nav>

      {/* Mobile 11-Univers Bottom Sheet Modal */}
      <AnimatePresence>
        {isMobileExploreSheetOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileExploreSheetOpen(false)}
              className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-xs z-50 transition-opacity"
            />

            <div className="md:hidden fixed inset-x-0 bottom-0 z-50 pointer-events-none">
              <motion.div
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                transition={{ type: 'spring', damping: 28, stiffness: 280 }}
                className="w-full bg-[#FAF9F5] rounded-t-3xl border-t border-[#121210]/15 shadow-2xl p-5 pb-8 max-h-[85vh] overflow-y-auto pointer-events-auto flex flex-col"
              >
                {/* Drag Handle & Header */}
                <div className="flex items-center justify-center pb-2">
                  <div className="w-12 h-1.5 bg-stone-300 rounded-full" />
                </div>

                <div className="flex items-center justify-between pb-3.5 mb-3 border-b border-[#121210]/8">
                  <div className="flex items-center gap-2">
                    <KamaSun size={20} animate={true} />
                    <h3 className="text-sm font-bold text-[#121210] font-sans uppercase tracking-wider">
                      Les 11 Univers KAMA
                    </h3>
                  </div>

                  <button
                    onClick={() => setIsMobileExploreSheetOpen(false)}
                    className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-stone-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Categories Grid */}
                <div className="grid grid-cols-2 gap-2 flex-1">
                  {explorerCategories.map((cat) => {
                    const Icon = cat.icon;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => handleCategoryClick(cat)}
                        className="text-left p-3 rounded-2xl bg-white border border-[#121210]/8 hover:border-[#121210]/20 flex flex-col justify-between transition-all min-h-[64px] active:scale-95"
                      >
                        <div className="flex items-center gap-2">
                          <div className={`p-1.5 rounded-lg ${cat.bg} ${cat.color}`}>
                            <Icon className="w-3.5 h-3.5" />
                          </div>
                          <span className="text-xs font-bold text-[#121210] leading-tight">
                            {cat.label}
                          </span>
                        </div>
                        <span className="text-[9.5px] text-[#77746A] line-clamp-1 mt-1">
                          {cat.desc}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Footer Graphe Link */}
                <div className="mt-4 pt-3 border-t border-[#121210]/8 flex items-center justify-between">
                  <button
                    onClick={() => {
                      setIsMobileExploreSheetOpen(false);
                      handleNavClick('graphe');
                    }}
                    className="w-full py-3 px-4 rounded-2xl bg-[#121210] text-[#FAF9F5] text-xs font-bold flex items-center justify-center gap-2 transition-colors min-h-[44px]"
                  >
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Explorer le Graphe de Connaissances →</span>
                  </button>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
