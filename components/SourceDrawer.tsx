'use client';

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, BookOpen, ShieldCheck, ExternalLink, Bookmark, Sparkles, Building2 } from 'lucide-react';
import { HistoricalSource } from '@/lib/types';

interface SourceDrawerProps {
  isOpen?: boolean;
  onClose: () => void;
  source: HistoricalSource | null;
}

export function SourceDrawer({ isOpen, onClose, source }: SourceDrawerProps) {
  const isVisible = isOpen !== undefined ? isOpen : !!source;
  if (!isVisible || !source) return null;

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'primary':
        return { label: 'Source Primaire d’Époque', bg: 'bg-[#F2B844]/20 text-[#743825] border-[#F2B844]/40' };
      case 'academic':
        return { label: 'Recherche Académique Vérifiée', bg: 'bg-[#1F392E]/10 text-[#1F392E] border-[#1F392E]/30' };
      case 'archive':
        return { label: 'Document d’Archive / Manuscrit', bg: 'bg-[#A65438]/15 text-[#743825] border-[#A65438]/30' };
      default:
        return { label: 'Ressource Documentaire', bg: 'bg-stone-200 text-stone-800 border-stone-300' };
    }
  };

  const badge = getTypeBadge(source.type);

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 transition-opacity"
          />

          {/* Drawer Sheet */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="fixed top-0 right-0 h-full w-full max-w-lg bg-[#FAF9F5] border-l border-[#121210]/10 shadow-2xl z-50 p-6 md:p-8 overflow-y-auto flex flex-col justify-between"
          >
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-6 border-b border-[#121210]/10">
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-5 h-5 text-[#A65438]" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#121210]/60">
                    Protocole de Vérification KAMA
                  </span>
                </div>
                <button
                  onClick={onClose}
                  className="w-10 h-10 rounded-full flex items-center justify-center bg-stone-200/70 hover:bg-stone-300/80 transition-colors text-stone-700"
                  aria-label="Fermer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Source Type Pill */}
              <div className="mt-6">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${badge.bg}`}>
                  <Sparkles className="w-3.5 h-3.5" />
                  {badge.label}
                </span>
              </div>

              {/* Title & Metadata */}
              <div className="mt-4">
                <h3 className="text-2xl font-bold text-[#121210] font-serif leading-tight">
                  {source.title}
                </h3>
                <p className="text-sm text-[#77746A] mt-2 flex items-center gap-2">
                  <span>Auteur / Source : <strong className="text-[#121210]">{source.author}</strong></span>
                  <span>•</span>
                  <span>Année : <strong className="text-[#121210]">{source.year}</strong></span>
                </p>
              </div>

              {/* Excerpt if present */}
              {source.excerpt && (
                <div className="mt-6 p-5 rounded-2xl bg-[#FFF2CE]/40 border border-[#F2B844]/30">
                  <p className="text-xs uppercase tracking-wider font-semibold text-[#743825] mb-2 flex items-center gap-1.5">
                    <Bookmark className="w-3.5 h-3.5" /> Extrait textuel archivé
                  </p>
                  <blockquote className="text-sm italic font-serif text-[#121210] leading-relaxed">
                    « {source.excerpt} »
                  </blockquote>
                </div>
              )}

              {/* Institutions & Publisher */}
              <div className="mt-6 space-y-4">
                {source.archiveInstitution && (
                  <div className="p-4 rounded-xl bg-white border border-[#121210]/6">
                    <p className="text-xs text-[#77746A] font-medium flex items-center gap-1.5 mb-1">
                      <Building2 className="w-3.5 h-3.5" /> Institution de conservation
                    </p>
                    <p className="text-sm font-semibold text-[#121210]">
                      {source.archiveInstitution}
                    </p>
                  </div>
                )}

                {source.publisher && (
                  <div className="p-4 rounded-xl bg-white border border-[#121210]/6">
                    <p className="text-xs text-[#77746A] font-medium flex items-center gap-1.5 mb-1">
                      <BookOpen className="w-3.5 h-3.5" /> Maison d’édition / Revue
                    </p>
                    <p className="text-sm font-semibold text-[#121210]">
                      {source.publisher}
                    </p>
                  </div>
                )}

                {/* Reliability Note */}
                {source.reliabilityNote && (
                  <div className="p-4 rounded-xl bg-[#1F392E]/5 border border-[#1F392E]/15">
                    <p className="text-xs text-[#1F392E] font-semibold flex items-center gap-1.5 mb-1">
                      <ShieldCheck className="w-3.5 h-3.5" /> Note historiographique
                    </p>
                    <p className="text-xs text-[#46443D] leading-relaxed">
                      {source.reliabilityNote}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="pt-6 border-t border-[#121210]/10 mt-8">
              <p className="text-xs text-[#77746A] mb-3">
                KAMA s’engage à documenter rigoureusement chaque fait à partir des sources primaires et du consensus scientifique international.
              </p>
              <button
                onClick={onClose}
                className="w-full py-3 px-4 rounded-full bg-[#121210] text-[#FAF9F5] text-sm font-medium hover:bg-[#2A2925] transition-colors"
              >
                Fermer la fiche source
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
