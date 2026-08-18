'use client';

import React from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { KamaSun } from './KamaSun';
import { 
  X, 
  MapPin, 
  Calendar, 
  Landmark, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Layers,
  Crown
} from 'lucide-react';
import { Civilization, EntityType, HistoricalSource } from '@/lib/types';
import { MandatorySourcesSection } from './MandatorySourcesSection';

interface CivilizationDetailModalProps {
  civilization: Civilization | null;
  onClose: () => void;
  onSelectEntity: (type: EntityType, id: string) => void;
  onOpenSource: (source: HistoricalSource) => void;
}

export function CivilizationDetailModal({
  civilization,
  onClose,
  onSelectEntity,
  onOpenSource
}: CivilizationDetailModalProps) {
  if (!civilization) return null;

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
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#1F392E]/10 text-[#1F392E]">
                Civilisation & Royaume
              </span>
              <span className="text-xs text-[#77746A] font-mono">
                {civilization.periodSpan}
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
            
            {/* Hero Image & Headline */}
            <div className="h-56 sm:h-64 rounded-2xl overflow-hidden relative bg-stone-900 shadow-md">
              <Image
                src={civilization.image}
                alt={civilization.name}
                fill
                sizes="(max-width: 768px) 100vw, 800px"
                referrerPolicy="no-referrer"
                className="object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <p className="text-xs uppercase font-bold tracking-widest text-[#F2B844]">
                  Capitale : {civilization.capital}
                </p>
                <h3 className="text-2xl sm:text-3xl font-bold font-serif leading-tight">
                  {civilization.name}
                </h3>
              </div>
            </div>

            {/* Overview */}
            <div className="p-5 rounded-2xl bg-white border border-[#121210]/10 shadow-xs">
              <h4 className="text-xs uppercase font-bold tracking-wider text-[#A65438] mb-2">
                Territoire & Contexte historique
              </h4>
              <p className="text-xs font-semibold text-[#121210] mb-2 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#A65438]" /> {civilization.location}
              </p>
              <p className="text-xs sm:text-sm text-[#46443D] leading-relaxed">
                {civilization.overview}
              </p>
            </div>

            {/* Key Achievements */}
            <div className="p-5 rounded-2xl bg-[#FFF2CE]/30 border border-[#F2B844]/30">
              <h4 className="text-sm font-bold text-[#121210] mb-3 flex items-center gap-2">
                <Crown className="w-4 h-4 text-[#743825]" />
                Innovations politiques, culturelles & économiques
              </h4>
              <ul className="space-y-2">
                {civilization.keyAchievements.map((ach, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#46443D]">
                    <CheckCircle2 className="w-4 h-4 text-[#1F392E] flex-shrink-0 mt-0.5" />
                    <span>{ach}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Notable Figures */}
            <div className="p-5 rounded-2xl bg-white border border-[#121210]/10">
              <h4 className="text-xs uppercase font-bold tracking-wider text-[#121210] mb-3">
                Souverains & Savants emblématiques
              </h4>
              <div className="flex flex-wrap gap-2">
                {civilization.notableFigures.map((fig, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-full text-xs font-semibold bg-[#F5F2EA] text-[#121210] border border-[#121210]/8"
                  >
                    {fig}
                  </span>
                ))}
              </div>
            </div>

            {/* Sources */}
            {civilization.sources && civilization.sources.length > 0 && (
              <div className="pt-2">
                <MandatorySourcesSection
                  sources={civilization.sources}
                  title={`Sources & Références : ${civilization.name}`}
                  subtitle={`Archives et corpus archéologiques et textuels documentant la civilisation de ${civilization.name}.`}
                  contextTitle={civilization.name}
                  onOpenSourceModal={onOpenSource}
                />
              </div>
            )}

          </div>

          {/* Modal Footer */}
          <div className="p-4 sm:p-5 border-t border-[#121210]/10 bg-[#FAF9F5] flex items-center justify-between">
            <span className="text-xs text-[#77746A]">
              KAMA Living Archive • Atlas Historique
            </span>
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-full bg-[#121210] text-white text-xs font-semibold hover:bg-[#2B2925] transition-colors"
            >
              Fermer la fiche
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
