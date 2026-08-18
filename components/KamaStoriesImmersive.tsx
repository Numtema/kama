'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { KamaSun } from './KamaSun';
import { Sparkles, MapPin, Quote, ShieldCheck, ArrowRight, BookOpen, Volume2 } from 'lucide-react';
import { KAMA_STORIES } from '@/lib/kama-data';
import { EntityType } from '@/lib/types';

interface KamaStoriesImmersiveProps {
  onSelectEntity: (type: EntityType, id: string) => void;
}

export function KamaStoriesImmersive({ onSelectEntity }: KamaStoriesImmersiveProps) {
  const story = KAMA_STORIES[0];
  const [activeChapter, setActiveChapter] = useState<number>(0);

  return (
    <section id="stories" className="py-16 md:py-24 px-4 sm:px-6 md:px-8 bg-[#18352B] text-white">
      <div className="max-w-5xl mx-auto">
        
        {/* Story Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-xs text-[#F2B844] border border-white/15 mb-4 text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            KAMA Stories • Récit Immersif
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white font-serif leading-tight">
            1791 : {story.title}
          </h2>
          <p className="text-sm sm:text-base text-stone-200 mt-3 font-light">
            {story.tagline}
          </p>

          <div className="mt-4 flex items-center justify-center gap-2 text-xs text-stone-300">
            <MapPin className="w-3.5 h-3.5 text-[#F2B844]" />
            <span>{story.location}</span>
          </div>
        </div>

        {/* Cinematic Chapter Navigation */}
        <div className="flex items-center justify-center gap-2 mb-10 overflow-x-auto pb-2 scrollbar-none">
          {story.chapters.map((ch, idx) => (
            <button
              key={idx}
              onClick={() => setActiveChapter(idx)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                activeChapter === idx
                  ? 'bg-[#F2B844] text-[#121210] shadow-lg scale-105'
                  : 'bg-white/10 text-stone-300 hover:bg-white/20'
              }`}
            >
              {ch.title.split('.')[0]}
            </button>
          ))}
        </div>

        {/* Active Chapter Display Card */}
        <motion.div
          key={activeChapter}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="p-6 sm:p-12 rounded-3xl bg-black/40 backdrop-blur-md border border-white/15 shadow-2xl relative overflow-hidden"
        >
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="text-2xl sm:text-3xl font-bold text-white font-serif">
                {story.chapters[activeChapter].title}
              </h3>
              {story.chapters[activeChapter].mapLocation && (
                <span className="text-xs text-[#F2B844] flex items-center gap-1 font-mono">
                  <MapPin className="w-3.5 h-3.5" />
                  {story.chapters[activeChapter].mapLocation}
                </span>
              )}
            </div>

            <p className="text-base sm:text-lg text-stone-200 leading-relaxed font-light">
              {story.chapters[activeChapter].text}
            </p>

            {/* Quote if present */}
            {story.chapters[activeChapter].quote && (
              <div className="my-8 p-6 sm:p-8 rounded-2xl bg-[#F2B844]/15 border border-[#F2B844]/30 text-center">
                <Quote className="w-8 h-8 text-[#F2B844] mx-auto mb-2 opacity-80" />
                <blockquote className="text-lg sm:text-xl font-serif italic text-white leading-snug">
                  {story.chapters[activeChapter].quote}
                </blockquote>
                {story.chapters[activeChapter].quoteAuthor && (
                  <p className="text-xs uppercase font-sans tracking-wider font-bold text-[#F2B844] mt-3">
                    — {story.chapters[activeChapter].quoteAuthor}
                  </p>
                )}
              </div>
            )}

            {/* Media Image if present */}
            {story.chapters[activeChapter].mediaUrl && (
              <div className="my-6 rounded-2xl overflow-hidden shadow-lg border border-white/10">
                <img
                  src={story.chapters[activeChapter].mediaUrl}
                  alt="Illustration historique"
                  className="w-full h-64 sm:h-80 object-cover"
                />
                {story.chapters[activeChapter].mediaCaption && (
                  <p className="p-3 bg-black/60 text-xs text-stone-300 italic">
                    {story.chapters[activeChapter].mediaCaption}
                  </p>
                )}
              </div>
            )}

            {/* Chapter Stepper Buttons */}
            <div className="pt-6 border-t border-white/10 flex items-center justify-between">
              <button
                onClick={() => setActiveChapter(Math.max(0, activeChapter - 1))}
                disabled={activeChapter === 0}
                className="text-xs text-stone-400 hover:text-white disabled:opacity-30 transition-colors"
              >
                ← Chapitre précédent
              </button>

              {activeChapter < story.chapters.length - 1 ? (
                <button
                  onClick={() => setActiveChapter(activeChapter + 1)}
                  className="px-6 py-2.5 rounded-full bg-[#F2B844] text-[#121210] font-bold text-xs hover:bg-[#F8D889] transition-colors flex items-center gap-2"
                >
                  <span>Chapitre suivant</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  onClick={() => onSelectEntity('event', 'revolution-haitienne-1804')}
                  className="px-6 py-2.5 rounded-full bg-white text-[#121210] font-bold text-xs hover:bg-stone-200 transition-colors flex items-center gap-2"
                >
                  <span>Voir la fiche 1804</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
