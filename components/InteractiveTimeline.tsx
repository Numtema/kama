'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { KamaSun } from './KamaSun';
import { Clock, ArrowRight, ShieldCheck, Sparkles, Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import { EntityType } from '@/lib/types';

interface TimelineEventItem {
  id: string;
  year: number;
  yearDisplay: string;
  title: string;
  category: string;
  place: string;
  summary: string;
  image: string;
  targetType: EntityType;
  targetId: string;
  sourceAttribution: string;
}

const TIMELINE_DATA: TimelineEventItem[] = [
  {
    id: 'tl-1',
    year: -3100,
    yearDisplay: '-3100',
    title: 'Unification de Kemet & Essor de Ta-Seti (Nubie)',
    category: 'Antiquité & Vallée du Nil',
    place: 'Thèbes / Memphis / Napata',
    summary: 'Fondation des premières dynasties pharaoniques et essor architectural le long de la Vallée du Nil, berceau de l’astronomie et des hiéroglyphes.',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    targetType: 'civilization',
    targetId: 'kemet-egypte-nubie',
    sourceAttribution: 'Actes du Colloque du Caire de l’UNESCO (1974)'
  },
  {
    id: 'tl-2',
    year: 1236,
    yearDisplay: '1236',
    title: 'Proclamation de la Charte de Kouroukan Fouga',
    category: 'Moyen Âge mandingue',
    place: 'Kangaba, Empire du Mali',
    summary: 'Soundiata Keïta réunit les sages du Manden et proclame l’une des premières déclarations des droits humains et de paix civile.',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
    targetType: 'event',
    targetId: 'kouroukan-fouga-1236',
    sourceAttribution: 'Patrimoine Culturel Immatériel UNESCO'
  },
  {
    id: 'tl-3',
    year: 1324,
    yearDisplay: '1324',
    title: 'Le Pèlerinage au Caire de Mansa Moussa',
    category: 'Économie & Savoirs',
    place: 'Tombouctou → Le Caire',
    summary: 'L’empereur du Mali traverse le Sahara avec des tonnes d’or, dévaluant durablement le cours du métal au Caire et commandant la Mosquée Djingareyber.',
    image: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=800&q=80',
    targetType: 'person',
    targetId: 'mansa-musa',
    sourceAttribution: 'Chroniques d’Al-Umari (1342)'
  },
  {
    id: 'tl-4',
    year: 1464,
    yearDisplay: '1464',
    title: 'Avènement de l’Empire Songhaï sous Sonni Ali Ber',
    category: 'Grandes Civilisations',
    place: 'Gao & Tombouctou',
    summary: 'Structuration d’un empire administratif immense, création de l’université de Sankoré et floraison des traités de jurisprudence.',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80',
    targetType: 'civilization',
    targetId: 'empire-songhai',
    sourceAttribution: 'Histoire Générale de l’Afrique UNESCO Vol. IV'
  },
  {
    id: 'tl-5',
    year: 1622,
    yearDisplay: '1622',
    title: 'Traité de Luanda : Résistance de la Reine Nzinga',
    category: 'Résistances Royales',
    place: 'Ndongo & Matamba (Angola)',
    summary: 'La souveraine négocie d’égal à égal avec le gouverneur portugais et préserve la liberté de son royaume pendant 40 ans.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
    targetType: 'person',
    targetId: 'queen-nzinga',
    sourceAttribution: 'Archives de Luanda & Matamba'
  },
  {
    id: 'tl-6',
    year: 1791,
    yearDisplay: '1791',
    title: 'Cérémonie du Bois-Caïman & Insurrection de Saint-Domingue',
    category: 'Révolution Haïtienne',
    place: 'Morne-Rouge, Haïti',
    summary: 'Le serment sacré de Boukman et Cécile Fatiman déclenche l’insurrection générale qui détruira l’esclavage dans les Caraïbes.',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
    targetType: 'story',
    targetId: 'story-haiti-1791',
    sourceAttribution: 'Mémoires de Toussaint Louverture'
  },
  {
    id: 'tl-7',
    year: 1804,
    yearDisplay: '1804',
    title: 'Proclamation de l’Indépendance d’Haïti',
    category: 'Victoire & Souveraineté',
    place: 'Gonaïves, Haïti',
    summary: 'Après la victoire de Vertières, Jean-Jacques Dessalines proclame la première République noire indépendante au monde.',
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80',
    targetType: 'event',
    targetId: 'revolution-haitienne-1804',
    sourceAttribution: 'Acte d’Indépendance d’Haïti (1804)'
  },
  {
    id: 'tl-8',
    year: 1896,
    yearDisplay: '1896',
    title: 'Victoire éclatante d’Adoua (Éthiopie)',
    category: 'Résistance Anticoloniale',
    place: 'Adoua, Tigré (Éthiopie)',
    summary: 'L’empereur Menelik II et l’impératrice Taytu écrasent l’armée coloniale italienne et garantissent la souveraineté éthiopienne.',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    targetType: 'event',
    targetId: 'bataille-adoua-1896',
    sourceAttribution: 'Traités d’Addis-Abeba de 1896'
  },
  {
    id: 'tl-9',
    year: 1960,
    yearDisplay: '1960',
    title: 'L’Année des Indépendances & Discours de Lumumba',
    category: 'Décolonisation & Souveraineté',
    place: 'Léopoldville (Kinshasa)',
    summary: 'Le 30 juin 1960, Patrice Lumumba dénonce le paternalisme colonial et proclame la fierté et la souveraineté du Congo.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
    targetType: 'person',
    targetId: 'patrice-lumumba',
    sourceAttribution: 'Enregistrement sonore RTBF / Archives Nationales RDC'
  },
  {
    id: 'tl-10',
    year: 1974,
    yearDisplay: '1974',
    title: 'Le Colloque d’Égyptologie du Caire (UNESCO)',
    category: 'Renaissance Scientifique',
    place: 'Le Caire, Égypte',
    summary: 'Cheikh Anta Diop et Théophile Obenga démontrent scientifiquement l’africanité de la civilisation pharaonique.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=800&q=80',
    targetType: 'person',
    targetId: 'cheikh-anta-diop',
    sourceAttribution: 'Rapport officiel du Colloque du Caire, UNESCO'
  },
  {
    id: 'tl-11',
    year: 1983,
    yearDisplay: '1983',
    title: 'Révolution du Burkina Faso sous Thomas Sankara',
    category: 'Panafricanisme & Écologie',
    place: 'Ouagadougou',
    summary: 'Refondation républicaine, souveraineté alimentaire, droits des femmes et refus de la dette extérieure.',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    targetType: 'person',
    targetId: 'thomas-sankara',
    sourceAttribution: 'Discours à l’OUA Addis-Abeba 1987'
  }
];

interface InteractiveTimelineProps {
  onSelectEntity: (type: EntityType, id: string) => void;
}

export function InteractiveTimeline({ onSelectEntity }: InteractiveTimelineProps) {
  const [selectedIndex, setSelectedIndex] = useState<number>(2); // Default to Mansa Musa 1324
  const selectedEvent = TIMELINE_DATA[selectedIndex];

  return (
    <section id="chronologie" className="py-16 md:py-24 px-4 sm:px-6 md:px-8 border-t border-[#121210]/8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 mb-2">
              <Clock className="w-4 h-4 text-[#A65438]" />
              <p className="text-xs uppercase tracking-widest font-bold text-[#A65438]">
                Voyage Temporel Vivant
              </p>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#121210] font-sans">
              La Chronologie KAMA
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#77746A] max-w-md">
            Parcourez 5 000 ans d’histoire continue à travers les tournants géopolitiques, intellectuels et libérateurs.
          </p>
        </div>

        {/* Horizontal Timeline Track */}
        <div className="relative p-6 sm:p-8 rounded-3xl bg-white border border-[#121210]/10 shadow-sm overflow-hidden mb-8">
          
          {/* Scrollable Date Track */}
          <div className="overflow-x-auto pb-4 pt-2 scrollbar-none">
            <div className="flex items-center gap-3 sm:gap-4 min-w-[720px] relative">
              
              {/* Connecting Background Line */}
              <div className="absolute top-1/2 left-4 right-4 h-0.5 bg-[#121210]/10 -translate-y-1/2 z-0" />

              {TIMELINE_DATA.map((item, idx) => {
                const isSelected = selectedIndex === idx;
                return (
                  <button
                    key={item.id}
                    onClick={() => setSelectedIndex(idx)}
                    className={`relative z-10 flex flex-col items-center gap-2.5 transition-all group flex-1 ${
                      isSelected ? 'scale-105' : 'opacity-70 hover:opacity-100'
                    }`}
                  >
                    {/* Node Dot */}
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center font-mono text-xs font-bold transition-all shadow-xs ${
                        isSelected
                          ? 'bg-[#121210] text-[#F2B844] ring-4 ring-[#F2B844]/40 scale-110'
                          : 'bg-[#FAF9F5] text-[#121210] border border-[#121210]/20 group-hover:border-[#A65438]'
                      }`}
                    >
                      {item.year > 0 ? (item.year > 1000 ? `'${item.year.toString().slice(-2)}` : item.year) : item.year}
                    </div>

                    {/* Year Label */}
                    <span
                      className={`text-xs font-bold tracking-tight whitespace-nowrap transition-colors ${
                        isSelected ? 'text-[#121210]' : 'text-[#77746A]'
                      }`}
                    >
                      {item.yearDisplay}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Navigation Arrows for Track */}
          <div className="flex items-center justify-between pt-3 border-t border-[#121210]/8 mt-3 text-xs text-[#77746A]">
            <span>-3000 av. J.-C.</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSelectedIndex((prev) => Math.max(0, prev - 1))}
                disabled={selectedIndex === 0}
                className="p-1.5 rounded-full bg-[#FAF9F5] border border-[#121210]/10 disabled:opacity-30 hover:bg-stone-100"
                aria-label="Précédent"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="font-mono text-xs font-bold text-[#121210]">
                {selectedIndex + 1} / {TIMELINE_DATA.length}
              </span>
              <button
                onClick={() => setSelectedIndex((prev) => Math.min(TIMELINE_DATA.length - 1, prev + 1))}
                disabled={selectedIndex === TIMELINE_DATA.length - 1}
                className="p-1.5 rounded-full bg-[#FAF9F5] border border-[#121210]/10 disabled:opacity-30 hover:bg-stone-100"
                aria-label="Suivant"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <span>2026 Aujourd’hui</span>
          </div>

        </div>

        {/* Selected Event Focus Card */}
        <AnimatePresence mode="wait">
          {selectedEvent && (
            <motion.div
              key={selectedEvent.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-10 rounded-3xl bg-white border border-[#121210]/10 shadow-lg items-center"
            >
              {/* Left Details (7 cols) */}
              <div className="lg:col-span-7 flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-[#F2B844] text-[#121210]">
                      Année {selectedEvent.yearDisplay}
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-[#1F392E]/10 text-[#1F392E]">
                      {selectedEvent.category}
                    </span>
                    <span className="text-xs text-[#77746A]">• {selectedEvent.place}</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-bold text-[#121210] font-serif leading-tight mt-2">
                    {selectedEvent.title}
                  </h3>

                  <p className="text-sm sm:text-base text-[#46443D] mt-4 leading-relaxed">
                    {selectedEvent.summary}
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-[#121210]/8 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-xs text-[#77746A]">
                    <ShieldCheck className="w-4 h-4 text-[#A65438]" />
                    <span>Source : <strong>{selectedEvent.sourceAttribution}</strong></span>
                  </div>

                  <button
                    onClick={() => onSelectEntity(selectedEvent.targetType, selectedEvent.targetId)}
                    className="px-6 py-2.5 rounded-full bg-[#121210] hover:bg-[#2B2925] text-white text-xs font-semibold flex items-center gap-2 shadow-xs hover:shadow-md transition-all group"
                  >
                    <span>Explorer cet événement</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>

              {/* Right Media Preview (5 cols) */}
              <div className="lg:col-span-5 h-64 sm:h-72 rounded-2xl overflow-hidden relative shadow-md bg-stone-200">
                <img
                  src={selectedEvent.image}
                  alt={selectedEvent.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <p className="text-[10px] uppercase font-bold tracking-wider text-[#F2B844]">
                    Document d’époque KAMA
                  </p>
                  <p className="text-xs font-semibold line-clamp-1">
                    {selectedEvent.title}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
