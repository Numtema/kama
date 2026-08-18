'use client';

import React from 'react';
import { motion } from 'motion/react';
import { KamaSun } from './KamaSun';
import { ArrowRight, Compass, Sparkles, BookOpen, Globe2, ShieldCheck } from 'lucide-react';
import { EntityType } from '@/lib/types';

interface HeroSectionProps {
  onExploreClick: () => void;
  onOpenSearch: () => void;
  onSelectEntity: (type: EntityType, id: string) => void;
}

export function HeroSection({
  onExploreClick,
  onOpenSearch,
  onSelectEntity
}: HeroSectionProps) {
  const quickTags = [
    { label: 'Mansa Moussa 1324', type: 'person' as EntityType, id: 'mansa-musa' },
    { label: 'Révolution Haïtienne 1804', type: 'event' as EntityType, id: 'revolution-haitienne-1804' },
    { label: 'Thomas Sankara 1983', type: 'person' as EntityType, id: 'thomas-sankara' },
    { label: 'Charte de Kouroukan Fouga', type: 'event' as EntityType, id: 'kouroukan-fouga-1236' },
    { label: 'Cheikh Anta Diop', type: 'person' as EntityType, id: 'cheikh-anta-diop' },
  ];

  return (
    <section id="hero" className="relative pt-28 pb-16 md:pt-36 md:pb-24 px-4 sm:px-6 md:px-8 overflow-hidden">
      {/* Subtle organic ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#F2B844]/12 blur-[120px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-[300px] h-[300px] bg-[#A65438]/8 blur-[100px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Editorial Headline Column (7 cols) */}
          <motion.div 
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col items-start"
          >
            {/* Editorial Descriptor Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 border border-[#121210]/10 shadow-xs mb-6">
              <KamaSun size={18} animate={true} />
              <span className="text-xs font-semibold uppercase tracking-wider text-[#121210]">
                The Living Archive • Bibliothèque Vivante
              </span>
            </div>

            {/* Monumental Headline */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#121210] font-sans uppercase leading-[1.04] max-w-2xl">
              L’histoire noire <br />
              n’a jamais été <br />
              <span className="relative inline-block text-[#A65438]">
                une note
                <svg className="absolute -bottom-2 left-0 w-full" height="8" viewBox="0 0 100 8" preserveAspectRatio="none" fill="none">
                  <path d="M0 5C20 2 80 2 100 5" stroke="#F2B844" strokeWidth="4" strokeLinecap="round" />
                </svg>
              </span> de bas de page.
            </h1>

            {/* Subheading */}
            <p className="mt-6 text-base sm:text-lg text-[#46443D] leading-relaxed max-w-xl font-normal">
              Explorez des millénaires d’histoires, de civilisations, de pensées, de révolutions et de créations reliées dans un <strong>graphe vivant de connaissances</strong>.
            </p>

            {/* Primary & Secondary Action Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4 w-full sm:w-auto">
              <button
                onClick={onExploreClick}
                className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#121210] hover:bg-[#2B2925] text-[#FAF9F5] text-sm font-semibold tracking-wide flex items-center justify-center gap-2.5 shadow-md hover:shadow-lg transition-all group"
              >
                <span>Commencer à explorer</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onOpenSearch}
                className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-white hover:bg-stone-50 text-[#121210] border border-[#121210]/12 text-sm font-semibold shadow-xs flex items-center justify-center gap-2 transition-all"
              >
                <span>Recherche dans l’archive (⌘K)</span>
              </button>
            </div>

            {/* Quick Exploration Chips */}
            <div className="mt-10 pt-6 border-t border-[#121210]/8 w-full">
              <p className="text-[11px] font-bold uppercase tracking-widest text-[#77746A] mb-3">
                Accès direct aux grands repères :
              </p>
              <div className="flex flex-wrap gap-2">
                {quickTags.map((tag) => (
                  <button
                    key={tag.id}
                    onClick={() => onSelectEntity(tag.type, tag.id)}
                    className="px-3 py-1 rounded-full text-xs font-medium bg-white/90 hover:bg-[#FFF2CE]/80 border border-[#121210]/8 text-[#121210] hover:border-[#F2B844] transition-colors flex items-center gap-1.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#A65438]" />
                    {tag.label}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Featured Hero Visual Card (5 cols) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative"
          >
            {/* Primary Featured Card */}
            <div 
              onClick={() => onSelectEntity('person', 'mansa-musa')}
              className="group relative rounded-3xl overflow-hidden bg-stone-900 border border-[#121210]/12 shadow-xl cursor-pointer aspect-[4/5] sm:aspect-[4/4.5] lg:aspect-[4/5] flex flex-col justify-between p-6 sm:p-8"
            >
              {/* Background Archive Image with subtle zoom on hover */}
              <div className="absolute inset-0 z-0">
                <img
                  src="https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=1200&q=80"
                  alt="Mansa Moussa et l'Empire du Mali"
                  className="w-full h-full object-cover opacity-60 group-hover:scale-105 group-hover:opacity-75 transition-all duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/30" />
              </div>

              {/* Top Card Badge */}
              <div className="relative z-10 flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#F2B844] text-[#121210] shadow-sm">
                  <KamaSun size={14} color="#121210" />
                  Dossier à l’Honneur
                </span>

                <span className="text-xs font-mono text-white/70 bg-black/40 px-2.5 py-0.5 rounded-full backdrop-blur-xs border border-white/10">
                  1324 • Tombouctou
                </span>
              </div>

              {/* Bottom Card Information */}
              <div className="relative z-10">
                <p className="text-xs uppercase tracking-widest text-[#F2B844] font-semibold mb-1">
                  Empire du Mali • Âge d’Or
                </p>
                <h3 className="text-2xl sm:text-3xl font-bold text-white font-serif leading-tight group-hover:text-[#F8D889] transition-colors">
                  Mansa Moussa Keïta
                </h3>
                <p className="text-xs sm:text-sm text-stone-200 mt-2 line-clamp-2 leading-relaxed">
                  L’homme dont la générosité et l’or bouleversèrent l’économie de la Méditerranée et firent de Tombouctou la capitale des savoirs.
                </p>

                <div className="mt-4 pt-4 border-t border-white/15 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-stone-300">
                    <ShieldCheck className="w-4 h-4 text-[#F2B844]" />
                    <span>Sources Ibn Battuta & Al-Umari</span>
                  </div>
                  <span className="text-xs font-semibold text-[#F2B844] group-hover:translate-x-1 transition-transform flex items-center gap-1">
                    Lire le dossier →
                  </span>
                </div>
              </div>
            </div>

            {/* Floating Mini Archive Tag */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              onClick={() => onSelectEntity('event', 'revolution-haitienne-1804')}
              className="absolute -bottom-6 -left-4 sm:-left-6 p-4 rounded-2xl bg-[#FAF9F5]/95 backdrop-blur-md border border-[#121210]/12 shadow-xl cursor-pointer hover:bg-white transition-all max-w-[260px] hidden sm:block group"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#A65438]/15 flex items-center justify-center text-[#A65438] font-bold text-xs flex-shrink-0">
                  1804
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#121210] group-hover:text-[#A65438] transition-colors line-clamp-1">
                    Haïti : Première République Noire
                  </h4>
                  <p className="text-[10px] text-[#77746A] line-clamp-1">
                    Révolution & liberté inconditionnelle
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
