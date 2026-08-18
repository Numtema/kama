'use client';

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { KamaSun } from './KamaSun';
import { 
  X, 
  MapPin, 
  Calendar, 
  Quote, 
  ShieldCheck, 
  ArrowRight, 
  Layers, 
  BookOpen, 
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { HistoricalPerson, EntityType, HistoricalSource } from '@/lib/types';
import { MandatorySourcesSection } from './MandatorySourcesSection';

interface PersonDetailModalProps {
  person: HistoricalPerson | null;
  onClose: () => void;
  onSelectEntity: (type: EntityType, id: string) => void;
  onOpenSource: (source: HistoricalSource) => void;
}

export function PersonDetailModal({
  person,
  onClose,
  onSelectEntity,
  onOpenSource
}: PersonDetailModalProps) {
  if (!person) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 transition-opacity"
      />

      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          className="w-full max-w-3xl bg-[#FAF9F5] rounded-3xl border border-[#121210]/15 shadow-2xl overflow-hidden pointer-events-auto flex flex-col max-h-[90vh]"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between p-4 sm:p-6 border-b border-[#121210]/10 bg-white">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#A65438]/15 text-[#743825]">
                Biographie KAMA
              </span>
              <span className="text-xs text-[#77746A] font-mono">
                {person.birthYear} – {person.deathYear || 'Présent'}
              </span>
            </div>

            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Scrollable Body */}
          <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-6">
            
            {/* Top Profile Summary */}
            <div className="flex flex-col sm:flex-row gap-6 items-start">
              <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl overflow-hidden bg-stone-200 flex-shrink-0 shadow-md">
                <img
                  src={person.image}
                  alt={person.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1">
                <p className="text-xs uppercase font-bold tracking-widest text-[#A65438]">
                  {person.region} • {person.era}
                </p>
                <h3 className="text-2xl sm:text-3xl font-bold text-[#121210] font-serif leading-tight mt-1">
                  {person.name}
                </h3>
                <p className="text-sm font-semibold text-[#77746A] mt-1">
                  {person.title}
                </p>
                <p className="text-xs sm:text-sm text-[#46443D] mt-3 leading-relaxed">
                  {person.summary}
                </p>
              </div>
            </div>

            {/* Quote Block */}
            {person.quote && (
              <div className="p-5 rounded-2xl bg-[#FFF2CE]/40 border border-[#F2B844]/40 text-center">
                <Quote className="w-6 h-6 text-[#F2B844] mx-auto mb-1.5" />
                <blockquote className="text-base sm:text-lg font-serif italic text-[#121210] leading-snug">
                  « {person.quote.text} »
                </blockquote>
                <p className="text-xs uppercase font-sans tracking-wider font-bold text-[#743825] mt-2">
                  — {person.quote.context} ({person.quote.year})
                </p>
              </div>
            )}

            {/* Key Contributions */}
            <div className="p-5 rounded-2xl bg-white border border-[#121210]/10 shadow-xs">
              <h4 className="text-sm font-bold text-[#121210] mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#1F392E]" />
                Faits marquants & Héritage historique
              </h4>
              <ul className="space-y-2.5">
                {person.keyContributions.map((contrib, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#46443D] leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#A65438] flex-shrink-0 mt-2" />
                    <span>{contrib}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Knowledge Graph Connections */}
            <div className="p-5 rounded-2xl bg-[#F5F2EA]/80 border border-[#121210]/8">
              <h4 className="text-xs uppercase font-bold tracking-wider text-[#121210] mb-3 flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-[#A65438]" /> Connexions dans l’Archive KAMA
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {person.connectedEntities.map((ref) => (
                  <div
                    key={ref.id}
                    onClick={() => {
                      onClose();
                      onSelectEntity(ref.type, ref.id);
                    }}
                    className="p-3 rounded-xl bg-white hover:bg-[#FFF2CE]/60 border border-[#121210]/6 cursor-pointer flex items-center justify-between transition-colors group"
                  >
                    <div>
                      <p className="text-xs font-bold text-[#121210] group-hover:text-[#A65438]">
                        {ref.title}
                      </p>
                      <p className="text-[10px] text-[#77746A]">{ref.relationship}</p>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-stone-400 group-hover:text-[#121210] group-hover:translate-x-0.5 transition-all" />
                  </div>
                ))}
              </div>
            </div>

            {/* Sources & Citations */}
            {person.sources && person.sources.length > 0 && (
              <div className="pt-2">
                <MandatorySourcesSection
                  sources={person.sources}
                  title={`Sources & Références : ${person.name}`}
                  subtitle={`Corpus documentaire primaire et académique appuyant la biographie de ${person.name}.`}
                  contextTitle={person.name}
                  onOpenSourceModal={onOpenSource}
                />
              </div>
            )}

          </div>

          {/* Modal Footer */}
          <div className="p-4 sm:p-5 border-t border-[#121210]/10 bg-[#FAF9F5] flex items-center justify-between">
            <span className="text-xs text-[#77746A]">
              KAMA Living Knowledge Graph
            </span>

            {person.dossierId && (
              <button
                onClick={() => {
                  onClose();
                  onSelectEntity('article', person.dossierId!);
                }}
                className="px-5 py-2 rounded-full bg-[#121210] hover:bg-[#2B2925] text-white text-xs font-semibold flex items-center gap-2 transition-colors"
              >
                <span>Lire le dossier complet</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
