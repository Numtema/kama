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
  const exploreRef = useRef<HTMLDivElement>(null);

  const handleAssistant = onOpenArchivist || onOpenAssistant || (() => {});

  const handleNavClick = (sectionId: string) => {
    setIsMobileMenuOpen(false);
    setIsExplorePanelOpen(false);
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
    { id: 'decouvrir', label: 'Discover', target: 'decouvrir' },
    { id: 'explorer', label: 'Explorer', isMegaDropdown: true },
    { id: 'chronologie', label: 'Timeline', target: 'chronologie' },
    { id: 'regarder', label: 'Media Library', target: 'regarder' },
  ];

  // The 11 mandatory categories for the Explorer panel
  const explorerCategories = [
    { 
      id: 'people', 
      label: 'People', 
      desc: 'Souverains, stratèges, savants & héros', 
      icon: Users,
      color: 'text-[#A65438]',
      bg: 'bg-[#A65438]/10',
      target: 'personnes'
    },
    { 
      id: 'civilizations', 
      label: 'Civilizations', 
      desc: 'Mali, Songhaï, Kongo, Aksoum, Kemet', 
      icon: Building2,
      color: 'text-[#F2B844]',
      bg: 'bg-[#F2B844]/15',
      target: 'civilisations'
    },
    { 
      id: 'countries', 
      label: 'Countries', 
      desc: 'Territoires ancestraux & géopolitique', 
      icon: MapPin,
      color: 'text-[#1F392E]',
      bg: 'bg-[#1F392E]/10',
      target: 'explorer'
    },
    { 
      id: 'eras', 
      label: 'Eras', 
      desc: 'Antiquité, Moyen Âge, Indépendances', 
      icon: Calendar,
      color: 'text-amber-700',
      bg: 'bg-amber-100',
      target: 'chronologie'
    },
    { 
      id: 'events', 
      label: 'Events', 
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
      label: 'Politics', 
      desc: 'Panafricanisme, traités & chartes', 
      icon: Scale,
      color: 'text-emerald-800',
      bg: 'bg-emerald-100',
      target: 'graphe'
    },
    { 
      id: 'resistances', 
      label: 'Resistances', 
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
    if (onExploreCategory) {
      onExploreCategory(cat.id);
    }
    handleNavClick(cat.target);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-3 sm:px-6 md:px-8 pt-3 sm:pt-4 transition-all">
      <div className="max-w-7xl mx-auto">
        <motion.nav
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className={`relative flex items-center justify-between px-4 sm:px-6 py-2.5 sm:py-3 rounded-full transition-all duration-300 ${
            isScrolled
              ? 'bg-[#FAF9F5]/90 backdrop-blur-xl border border-[#121210]/12 shadow-[0_12px_32px_rgba(20,18,12,0.08)]'
              : 'bg-[#FAF9F5]/75 backdrop-blur-md border border-[#121210]/8 shadow-sm'
          }`}
        >
          {/* Logo & Brand Flag */}
          <div 
            onClick={() => handleNavClick('hero')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <KamaSun size={32} animate={true} />
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-bold tracking-tight text-[#121210] font-sans flex items-center gap-1.5">
                KAMA
                <span className="w-1.5 h-1.5 rounded-full bg-[#F2B844]" />
              </span>
              <span className="hidden sm:block text-[9px] uppercase tracking-widest text-[#77746A] -mt-1 font-medium">
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
                      className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all ${
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
                  className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all ${
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
          <div className="flex items-center gap-2">
            {/* Search Button (with Search Icon) */}
            <button
              onClick={onOpenSearch}
              className="flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white hover:bg-stone-50 text-[#121210] border border-[#121210]/10 shadow-sm text-xs font-semibold transition-all group"
              title="Rechercher (⌘K)"
            >
              <Search className="w-4 h-4 text-[#A65438] group-hover:scale-110 transition-transform" />
              <span className="hidden sm:inline">Search</span>
              <kbd className="hidden lg:inline-block px-1.5 py-0.5 text-[10px] font-mono text-stone-500 bg-stone-100 rounded border border-stone-200">
                ⌘K
              </kbd>
            </button>

            {/* Archiviste IA Trigger */}
            <button
              onClick={handleAssistant}
              className="p-2 sm:px-3 sm:py-2 rounded-full bg-[#F2B844]/20 hover:bg-[#F2B844]/35 text-[#743825] border border-[#F2B844]/40 text-xs font-bold flex items-center gap-1.5 transition-all"
              title="Archiviste IA KAMA"
            >
              <Sparkles className="w-4 h-4 text-[#A65438]" />
              <span className="hidden xl:inline">Archiviste IA</span>
            </button>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-full bg-white border border-[#121210]/10 text-[#121210]"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </motion.nav>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="md:hidden mt-2 p-4 rounded-3xl bg-[#FAF9F5] border border-[#121210]/12 shadow-2xl space-y-3"
            >
              <div className="text-[10px] uppercase font-bold text-[#77746A] tracking-wider px-2">
                Navigation Principale
              </div>

              {topMenuItems.map((item) => {
                if (item.isMegaDropdown) {
                  return (
                    <div key={item.id} className="pt-2">
                      <div className="text-xs font-bold text-[#121210] px-3 py-1.5 flex items-center gap-2">
                        <Compass className="w-4 h-4 text-[#A65438]" />
                        <span>Explorer (11 Univers)</span>
                      </div>
                      <div className="grid grid-cols-2 gap-1.5 mt-1.5 pl-2">
                        {explorerCategories.map((cat) => (
                          <button
                            key={cat.id}
                            onClick={() => handleCategoryClick(cat)}
                            className="p-2 rounded-xl bg-white text-left text-xs font-bold text-[#121210] hover:bg-[#FFF2CE] border border-[#121210]/6 transition-colors"
                          >
                            {cat.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                }

                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.target!)}
                    className="w-full text-left py-2 px-3 rounded-xl text-sm font-bold text-[#121210] hover:bg-white transition-colors flex items-center justify-between"
                  >
                    <span>{item.label}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#77746A]" />
                  </button>
                );
              })}

              <div className="pt-3 border-t border-[#121210]/10 flex flex-col gap-2">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    handleAssistant();
                  }}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#F2B844]/20 text-[#743825] text-xs font-bold flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-[#A65438]" />
                  Archiviste IA KAMA
                </button>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    if (onOpenUploader) onOpenUploader();
                    else handleNavClick('archives');
                  }}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#1F392E]/10 text-[#1F392E] text-xs font-bold flex items-center justify-center gap-2"
                >
                  <UploadCloud className="w-4 h-4" />
                  Contribuer une archive (Vercel Blob)
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
