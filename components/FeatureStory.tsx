'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { KamaSun } from './KamaSun';
import { 
  BookOpen, 
  Sparkles, 
  Clock, 
  Quote, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Share2, 
  Bookmark,
  Volume2,
  Layers
} from 'lucide-react';
import { ARTICLE_DOSSIERS } from '@/lib/kama-data';
import { EntityType, HistoricalSource } from '@/lib/types';
import { MandatorySourcesSection } from './MandatorySourcesSection';

interface FeatureStoryProps {
  onSelectEntity: (type: EntityType, id: string) => void;
  onOpenSource: (source: HistoricalSource) => void;
  isSaved?: boolean;
  onToggleSave?: () => void;
}

export function FeatureStory({
  onSelectEntity,
  onOpenSource,
  isSaved = false,
  onToggleSave
}: FeatureStoryProps) {
  const dossier = ARTICLE_DOSSIERS[0]; // Thomas Sankara Dossier
  const [readingMode, setReadingMode] = useState<'essential' | 'full'>('essential');

  return (
    <section id="grande-histoire" className="py-16 md:py-24 px-4 sm:px-6 md:px-8 bg-[#FAF9F5] border-t border-[#121210]/8">
      <div className="max-w-4xl mx-auto">
        
        {/* Editorial Eyebrow & Metadata */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-[#121210]/8 mb-8">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#A65438]/15 text-[#743825]">
              {dossier.category}
            </span>
            <span className="text-xs text-[#77746A]">• {dossier.territory}</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 text-xs text-[#77746A] font-medium">
              <Clock className="w-3.5 h-3.5" />
              <span>{readingMode === 'essential' ? '2 min chrono' : `${dossier.readTimeMin} min de lecture`}</span>
            </div>

            {onToggleSave && (
              <button
                onClick={onToggleSave}
                className={`p-2 rounded-full border transition-all ${
                  isSaved 
                    ? 'bg-[#121210] text-[#F2B844] border-[#121210]' 
                    : 'bg-white text-stone-700 border-stone-200 hover:border-stone-400'
                }`}
                title="Sauvegarder pour plus tard"
              >
                <Bookmark className="w-4 h-4 fill-current" />
              </button>
            )}
          </div>
        </div>

        {/* Big Headline */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#121210] font-sans leading-[1.08]">
          {dossier.title}
        </h2>

        <p className="mt-4 text-base sm:text-lg text-[#46443D] leading-relaxed font-serif">
          {dossier.subtitle}
        </p>

        {/* Dual Reading Mode Switcher Tabs */}
        <div className="my-8 p-1.5 rounded-2xl bg-[#F5F2EA] border border-[#121210]/10 flex items-center justify-between">
          <button
            onClick={() => setReadingMode('essential')}
            className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
              readingMode === 'essential'
                ? 'bg-white text-[#121210] shadow-sm'
                : 'text-[#77746A] hover:text-[#121210]'
            }`}
          >
            <Sparkles className="w-4 h-4 text-[#F2B844]" />
            <span>Comprendre en 2 min</span>
            <span className="hidden sm:inline text-[10px] px-2 py-0.5 rounded-full bg-[#FFF2CE] text-[#743825] font-semibold">
              Synthèse 5 points
            </span>
          </button>

          <button
            onClick={() => setReadingMode('full')}
            className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
              readingMode === 'full'
                ? 'bg-white text-[#121210] shadow-sm'
                : 'text-[#77746A] hover:text-[#121210]'
            }`}
          >
            <BookOpen className="w-4 h-4 text-[#A65438]" />
            <span>Lire le dossier complet</span>
            <span className="hidden sm:inline text-[10px] px-2 py-0.5 rounded-full bg-[#FAF9F5] border border-stone-200 text-[#77746A]">
              12 min
            </span>
          </button>
        </div>

        {/* Hero Image Showcase */}
        <div className="rounded-3xl overflow-hidden shadow-md bg-stone-900 border border-[#121210]/10 my-8">
          <div className="relative aspect-[16/9] w-full">
            <Image
              src={dossier.heroImage}
              alt={dossier.title}
              fill
              sizes="(max-width: 896px) 100vw, 896px"
              referrerPolicy="no-referrer"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-white text-xs">
              <p className="italic text-stone-200">{dossier.imageCaption}</p>
            </div>
          </div>
        </div>

        {/* Reading Mode 1: 2-min Essential */}
        {readingMode === 'essential' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="space-y-8"
          >
            {/* 5 Key Facts Box */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#121210]/10 shadow-xs">
              <h3 className="text-lg font-bold text-[#121210] flex items-center gap-2 mb-4">
                <CheckCircle2 className="w-5 h-5 text-[#1F392E]" />
                Les 5 faits essentiels à retenir
              </h3>
              <ul className="space-y-3.5">
                {dossier.essential.keyFacts.map((fact, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-[#46443D] leading-relaxed">
                    <span className="w-5 h-5 rounded-full bg-[#FFF2CE] text-[#743825] font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span>{fact}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Core Historical Quote Block */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#FFF2CE]/50 border border-[#F2B844]/40 text-center relative overflow-hidden">
              <Quote className="w-10 h-10 text-[#F2B844]/60 mx-auto mb-2" />
              <blockquote className="text-xl sm:text-2xl font-serif italic text-[#121210] leading-snug">
                « {dossier.essential.coreQuote.text} »
              </blockquote>
              <p className="text-xs uppercase tracking-wider font-bold text-[#743825] mt-4">
                — {dossier.essential.coreQuote.author} ({dossier.essential.coreQuote.year})
              </p>
            </div>

            {/* Mini Timeline */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#121210]/10 shadow-xs">
              <h3 className="text-base font-bold text-[#121210] mb-4">
                Chronologie en 5 dates clés
              </h3>
              <div className="space-y-4 relative border-l-2 border-[#121210]/10 ml-3 pl-5">
                {dossier.essential.timeline.map((item, idx) => (
                  <div key={idx} className="relative">
                    <span className="absolute -left-[27px] top-1.5 w-3 h-3 rounded-full bg-[#A65438] border-2 border-white" />
                    <p className="text-xs font-bold text-[#A65438] font-mono">{item.year}</p>
                    <p className="text-sm text-[#121210] font-medium">{item.event}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Reading Mode 2: Full Dossier */}
        {readingMode === 'full' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="space-y-10"
          >
            {dossier.sections.map((section, idx) => (
              <article key={idx} className="space-y-4">
                <h3 className="text-2xl sm:text-3xl font-bold text-[#121210] font-serif leading-tight">
                  {section.heading}
                </h3>
                {section.subheading && (
                  <p className="text-sm font-semibold uppercase tracking-wider text-[#A65438]">
                    {section.subheading}
                  </p>
                )}

                <div className="text-base sm:text-lg text-[#33322E] leading-relaxed space-y-4 font-normal whitespace-pre-line">
                  {section.content}
                </div>

                {/* Optional Quote */}
                {section.quote && (
                  <div className="my-6 p-6 rounded-2xl bg-[#FFF2CE]/40 border-l-4 border-[#F2B844] italic font-serif text-lg text-[#121210]">
                    « {section.quote.text} »
                    <p className="text-xs uppercase font-sans tracking-wider font-bold text-[#743825] mt-2 not-italic">
                      — {section.quote.author} ({section.quote.year})
                    </p>
                  </div>
                )}

                {/* Optional Archive Snippet */}
                {section.archiveSnippet && (
                  <div className="my-6 p-6 rounded-2xl bg-white border border-[#121210]/10 shadow-xs">
                    <p className="text-xs uppercase tracking-wider font-bold text-[#1F392E] flex items-center gap-1.5 mb-2">
                      <ShieldCheck className="w-4 h-4" /> {section.archiveSnippet.title}
                    </p>
                    <blockquote className="text-sm italic font-serif text-[#121210] leading-relaxed">
                      « {section.archiveSnippet.text} »
                    </blockquote>
                    <p className="text-[11px] text-[#77746A] mt-2">
                      Provenance : {section.archiveSnippet.origin}
                    </p>
                  </div>
                )}
              </article>
            ))}
          </motion.div>
        )}

        {/* Connected Entities & Knowledge Graph Links */}
        <div className="mt-12 pt-8 border-t border-[#121210]/10">
          <div className="flex items-center gap-2 mb-4">
            <Layers className="w-4 h-4 text-[#A65438]" />
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#121210]">
              Connexions dans le Knowledge Graph KAMA
            </h4>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {dossier.continueExploring.map((ref) => (
              <div
                key={ref.id}
                onClick={() => onSelectEntity(ref.type, ref.id)}
                className="p-4 rounded-2xl bg-white hover:bg-[#FFF2CE]/50 border border-[#121210]/8 hover:border-[#F2B844] transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#A65438]">
                    {ref.relationship}
                  </span>
                  <p className="text-sm font-bold text-[#121210] mt-1 group-hover:text-[#A65438] transition-colors">
                    {ref.title}
                  </p>
                </div>
                <span className="text-xs font-semibold text-[#121210] mt-3 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                  Explorer →
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Verified Sources & References Section */}
        <div className="mt-12">
          <MandatorySourcesSection
            sources={dossier.sources}
            title="Sources & Références du Dossier"
            subtitle={`Inventaire exhaustif des sources primaires, traités et recherches universitaires documentant le règne et le pèlerinage de ${dossier.title}.`}
            contextTitle={dossier.title}
            onOpenSourceModal={onOpenSource}
          />
        </div>

      </div>
    </section>
  );
}
