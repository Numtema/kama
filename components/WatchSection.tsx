'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { KamaSun } from './KamaSun';
import { 
  Play, 
  Video, 
  Clock, 
  Volume2, 
  FileText, 
  ShieldCheck, 
  ArrowRight, 
  X,
  ListOrdered
} from 'lucide-react';
import { WATCH_MEDIA } from '@/lib/kama-data';
import { VideoContent, EntityType } from '@/lib/types';

interface WatchSectionProps {
  onSelectEntity: (type: EntityType, id: string) => void;
}

export function WatchSection({ onSelectEntity }: WatchSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeVideoModal, setActiveVideoModal] = useState<VideoContent | null>(null);

  const categories = [
    { id: 'all', label: 'Tous les médias' },
    { id: 'documentaire', label: 'Documentaires' },
    { id: 'archive', label: 'Archives rares' },
    { id: 'conference', label: 'Conférences' },
  ];

  const filteredMedia = activeCategory === 'all'
    ? WATCH_MEDIA
    : WATCH_MEDIA.filter(m => m.category === activeCategory);

  return (
    <section id="regarder" className="py-16 md:py-24 px-4 sm:px-6 md:px-8 bg-[#121210] text-white">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 mb-2">
              <Video className="w-4 h-4 text-[#F2B844]" />
              <p className="text-xs uppercase tracking-widest font-bold text-[#F2B844]">
                Médiathèque & Archives
              </p>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#FAF9F5] font-sans">
              Regarder & Écouter l’Histoire
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-stone-400 max-w-md">
            Discours originaux restaurés, documentaires contemporains et interventions historiques avec retranscriptions intégrales.
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-[#F2B844] text-[#121210] shadow-md'
                    : 'bg-stone-900 text-stone-300 hover:bg-stone-800 border border-stone-800'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Horizontal Streaming Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredMedia.map((media) => (
            <motion.div
              key={media.id}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.2 }}
              onClick={() => setActiveVideoModal(media)}
              className="group rounded-3xl bg-stone-900 border border-stone-800 overflow-hidden shadow-md hover:shadow-2xl transition-all cursor-pointer flex flex-col justify-between"
            >
              {/* Video Thumbnail */}
              <div className="w-full aspect-[16/10] relative overflow-hidden bg-black">
                <img
                  src={media.thumbnail}
                  alt={media.title}
                  className="w-full h-full object-cover opacity-75 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                
                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-[#F2B844] text-[#121210] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Play className="w-5 h-5 fill-current ml-0.5" />
                  </div>
                </div>

                {/* Duration Tag */}
                <span className="absolute bottom-3 right-3 text-[10px] font-mono font-bold text-white bg-black/70 px-2 py-0.5 rounded-md backdrop-blur-xs">
                  {media.duration}
                </span>

                {/* Category Badge */}
                <span className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider text-[#121210] bg-[#F2B844] px-2.5 py-0.5 rounded-full">
                  {media.category}
                </span>
              </div>

              {/* Media Information */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold text-white group-hover:text-[#F8D889] transition-colors leading-snug line-clamp-2">
                    {media.title}
                  </h3>
                  {media.speaker && (
                    <p className="text-xs text-[#F2B844] mt-1 font-medium">
                      {media.speaker}
                    </p>
                  )}
                  <p className="text-xs text-stone-400 mt-2 line-clamp-2 leading-relaxed">
                    {media.summary}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-800 flex items-center justify-between text-xs text-stone-400">
                  <span className="flex items-center gap-1">
                    <FileText className="w-3.5 h-3.5 text-[#F2B844]" />
                    <span>Transcript inclus</span>
                  </span>
                  <span className="text-[#F2B844] font-bold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                    Visionner →
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Video Player Modal */}
        <AnimatePresence>
          {activeVideoModal && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setActiveVideoModal(null)}
                className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 transition-opacity"
              />

              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 10 }}
                  className="w-full max-w-4xl bg-[#191916] rounded-3xl border border-stone-800 shadow-2xl overflow-hidden pointer-events-auto flex flex-col max-h-[90vh]"
                >
                  {/* Modal Header */}
                  <div className="flex items-center justify-between p-4 sm:p-5 border-b border-stone-800">
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full text-xs font-bold uppercase bg-[#F2B844] text-[#121210]">
                        {activeVideoModal.category}
                      </span>
                      <span className="text-xs text-stone-400">• {activeVideoModal.year}</span>
                    </div>

                    <button
                      onClick={() => setActiveVideoModal(null)}
                      className="w-9 h-9 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-300 flex items-center justify-center transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Player Simulation / HTML5 Video */}
                  <div className="relative aspect-video w-full bg-black">
                    <video
                      controls
                      autoPlay
                      className="w-full h-full object-contain"
                      poster={activeVideoModal.thumbnail}
                    >
                      <source src={activeVideoModal.videoUrl} type="video/mp4" />
                      Votre navigateur ne supporte pas la lecture vidéo.
                    </video>
                  </div>

                  {/* Modal Body & Synchronized Transcript */}
                  <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-6">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-white font-serif">
                        {activeVideoModal.title}
                      </h3>
                      {activeVideoModal.speaker && (
                        <p className="text-sm text-[#F2B844] mt-1 font-semibold">
                          Intervenant : {activeVideoModal.speaker}
                        </p>
                      )}
                      <p className="text-xs sm:text-sm text-stone-300 mt-2 leading-relaxed">
                        {activeVideoModal.summary}
                      </p>
                    </div>

                    {/* Chapters */}
                    {activeVideoModal.chapters && activeVideoModal.chapters.length > 0 && (
                      <div className="p-4 rounded-2xl bg-stone-900/80 border border-stone-800">
                        <p className="text-xs uppercase font-bold tracking-wider text-[#F2B844] mb-3 flex items-center gap-1.5">
                          <ListOrdered className="w-4 h-4" /> Chapitres & Repères chronologiques
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {activeVideoModal.chapters.map((ch, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-xs text-stone-300">
                              <span className="font-mono text-[#F2B844] font-bold">{ch.time}</span>
                              <span className="line-clamp-1">{ch.title}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Full Transcript */}
                    {activeVideoModal.fullTranscript && (
                      <div className="p-5 rounded-2xl bg-stone-900 border border-stone-800">
                        <p className="text-xs uppercase font-bold tracking-wider text-stone-400 mb-2 flex items-center gap-1.5">
                          <FileText className="w-4 h-4 text-[#F2B844]" /> Transcription intégrale archivée
                        </p>
                        <div className="text-xs sm:text-sm text-stone-300 font-serif leading-relaxed whitespace-pre-line italic">
                          {activeVideoModal.fullTranscript}
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              </div>
            </>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
