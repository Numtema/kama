'use client';

import React from 'react';
import { motion } from 'motion/react';
import { KamaSun } from './KamaSun';
import { Play, BookOpen, Clock, ArrowRight, ShieldCheck, Sparkles, Volume2 } from 'lucide-react';
import { EntityType } from '@/lib/types';

interface DiscoverBentoProps {
  onSelectEntity: (type: EntityType, id: string) => void;
}

export function DiscoverBento({ onSelectEntity }: DiscoverBentoProps) {
  return (
    <section id="decouvrir" className="py-16 md:py-24 px-4 sm:px-6 md:px-8 border-t border-[#121210]/8">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#F2B844]" />
              <p className="text-xs uppercase tracking-widest font-bold text-[#A65438]">
                Sélection Éditoriale KAMA
              </p>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#121210] font-sans">
              À découvrir aujourd’hui
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#77746A] max-w-md">
            Des dossiers approfondis, archives sonores et documentaires pour plonger immédiatement au cœur de l’histoire vivante.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6">
          
          {/* Card 1: Large Story Card (Mansa Musa) - 7 cols */}
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
            onClick={() => onSelectEntity('article', 'dossier-mansa-musa')}
            className="md:col-span-7 rounded-3xl overflow-hidden bg-white border border-[#121210]/10 shadow-xs hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between group p-6 sm:p-8 relative"
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#FFF2CE]/60 rounded-full blur-3xl -z-0" />

            <div className="relative z-10 flex items-center justify-between mb-6">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#F2B844]/20 text-[#743825] border border-[#F2B844]/40 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5" />
                Dossier Complet • 14 min
              </span>
              <span className="text-xs text-[#77746A] font-mono">1324 • Sahel</span>
            </div>

            <div className="relative z-10 my-4">
              <p className="text-xs uppercase tracking-wider font-bold text-[#A65438] mb-1.5">
                Empire du Mali • Économie & Savoirs
              </p>
              <h3 className="text-2xl sm:text-3xl font-bold text-[#121210] font-serif leading-tight group-hover:text-[#A65438] transition-colors">
                Mansa Moussa : L’or, le savoir et l’épopée du Mali médiéval
              </h3>
              <p className="text-sm text-[#46443D] mt-3 line-clamp-3 leading-relaxed">
                Comment le souverain du Manden a placé l’Afrique au centre des équilibres économiques mondiaux et fait de Tombouctou la capitale des manuscrits scientifiques.
              </p>
            </div>

            <div className="relative z-10 pt-6 border-t border-[#121210]/8 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-[#77746A]">
                <ShieldCheck className="w-4 h-4 text-[#1F392E]" />
                <span>Sources primaires vérifiées (Ibn Battuta, Al-Umari)</span>
              </div>
              <span className="text-xs font-bold text-[#121210] group-hover:translate-x-1 transition-transform flex items-center gap-1">
                Explorer →
              </span>
            </div>
          </motion.div>

          {/* Card 2: Video Feature (Haïti 1804 / Sankara Archive) - 5 cols */}
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
            onClick={() => onSelectEntity('video', 'doc-sankara-addis')}
            className="md:col-span-5 rounded-3xl overflow-hidden bg-stone-900 border border-stone-800 shadow-xs hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between group p-6 sm:p-8 relative text-white"
          >
            <div className="absolute inset-0 z-0">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80"
                alt="Archive Thomas Sankara"
                className="w-full h-full object-cover opacity-45 group-hover:scale-105 group-hover:opacity-60 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30" />
            </div>

            <div className="relative z-10 flex items-center justify-between">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/20 backdrop-blur-xs text-white border border-white/20 flex items-center gap-1.5">
                <Volume2 className="w-3.5 h-3.5 text-[#F2B844]" />
                Archive Sonore • 07:24
              </span>
              <span className="text-xs font-mono text-white/70">OUA • 1987</span>
            </div>

            <div className="relative z-10 my-4">
              <div className="w-12 h-12 rounded-full bg-[#F2B844] text-[#121210] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
                <Play className="w-5 h-5 fill-current ml-0.5" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold font-serif leading-snug group-hover:text-[#F8D889] transition-colors">
                Thomas Sankara : Le Discours d’Addis-Abeba sur la dette
              </h3>
              <p className="text-xs sm:text-sm text-stone-300 mt-2 line-clamp-2">
                « La dette est une reconquête savamment organisée de l’Afrique. Nous ne pouvons pas la payer. »
              </p>
            </div>

            <div className="relative z-10 pt-4 border-t border-white/15 flex items-center justify-between text-xs text-stone-300">
              <span>Transcription & Analyse</span>
              <span className="text-[#F2B844] font-bold group-hover:translate-x-1 transition-transform">
                Écouter & Lire →
              </span>
            </div>
          </motion.div>

          {/* Card 3: Queen Nzinga - 4 cols */}
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
            onClick={() => onSelectEntity('person', 'queen-nzinga')}
            className="md:col-span-4 rounded-3xl bg-white border border-[#121210]/10 p-6 shadow-xs hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl overflow-hidden bg-stone-200 flex-shrink-0">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80"
                  alt="Reine Nzinga"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#A65438]">
                  Résistance Royale
                </span>
                <h4 className="text-base font-bold text-[#121210] group-hover:text-[#A65438] transition-colors">
                  Reine Nzinga Mbande
                </h4>
              </div>
            </div>

            <p className="text-xs text-[#46443D] my-4 leading-relaxed line-clamp-3">
              Quarante années de résistance diplomatique et militaire contre la couronne portugaise pour préserver la souveraineté du Ndongo et Matamba.
            </p>

            <div className="pt-3 border-t border-[#121210]/8 flex items-center justify-between text-xs font-semibold text-[#121210]">
              <span className="text-[#77746A]">1583 – 1663</span>
              <span className="group-hover:translate-x-1 transition-transform">Voir biographie →</span>
            </div>
          </motion.div>

          {/* Card 4: Event - Charte de Kouroukan Fouga (1236) - 4 cols */}
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
            onClick={() => onSelectEntity('event', 'kouroukan-fouga-1236')}
            className="md:col-span-4 rounded-3xl bg-[#FFF2CE]/40 border border-[#F2B844]/40 p-6 shadow-xs hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-[#F2B844] text-[#121210]">
                  Constitution 1236
                </span>
                <span className="text-xs font-mono text-[#743825]">UNESCO</span>
              </div>
              <h4 className="text-base font-bold text-[#121210] font-serif group-hover:text-[#743825] transition-colors">
                Charte de Kouroukan Fouga
              </h4>
              <p className="text-xs text-[#46443D] mt-2 leading-relaxed line-clamp-3">
                Proclamée sous Soundiata Keïta, l’une des plus anciennes déclarations universelles des droits humains et du vivre-ensemble.
              </p>
            </div>

            <div className="pt-3 border-t border-[#F2B844]/30 flex items-center justify-between text-xs font-semibold text-[#743825] mt-4">
              <span>Empire du Mali</span>
              <span className="group-hover:translate-x-1 transition-transform">Découvrir le texte →</span>
            </div>
          </motion.div>

          {/* Card 5: Story Feature - Haïti 1791 (Bois-Caïman) - 4 cols */}
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
            onClick={() => onSelectEntity('story', 'story-haiti-1791')}
            className="md:col-span-4 rounded-3xl bg-[#1F392E] text-white p-6 shadow-xs hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-white/20 text-white">
                  Récit Immersif
                </span>
                <span className="text-xs font-mono text-white/70">1791 – 1804</span>
              </div>
              <h4 className="text-base font-bold font-serif group-hover:text-[#F8D889] transition-colors">
                1791 : La Nuit où Haïti bascula
              </h4>
              <p className="text-xs text-stone-200 mt-2 leading-relaxed line-clamp-3">
                Du serment du Bois-Caïman sous l’orage à la victoire de Vertières brisant les chaînes de l’esclavage colonial.
              </p>
            </div>

            <div className="pt-3 border-t border-white/15 flex items-center justify-between text-xs font-semibold text-[#F2B844] mt-4">
              <span>Haïti & Caraïbes</span>
              <span className="group-hover:translate-x-1 transition-transform">Entrer dans le récit →</span>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
