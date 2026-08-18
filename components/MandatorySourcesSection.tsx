'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, 
  BookOpen, 
  FileText, 
  Building2, 
  Copy, 
  Check, 
  ExternalLink, 
  Bookmark, 
  Sparkles, 
  Search, 
  ChevronRight,
  Filter,
  GraduationCap,
  Archive,
  Compass
} from 'lucide-react';
import { HistoricalSource, MandatorySourceTier } from '@/lib/types';

interface MandatorySourcesSectionProps {
  sources: HistoricalSource[];
  title?: string;
  subtitle?: string;
  contextTitle?: string;
  onOpenSourceModal?: (source: HistoricalSource) => void;
  className?: string;
}

export function MandatorySourcesSection({
  sources,
  title = 'Sources & Références Vérifiées',
  subtitle = 'Méthodologie historiographique KAMA : chaque affirmation s’appuie sur des archives authentifiées et des publications académiques à comité de lecture.',
  contextTitle,
  onOpenSourceModal,
  className = ''
}: MandatorySourcesSectionProps) {
  const [selectedTier, setSelectedTier] = useState<MandatorySourceTier | 'all'>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Normalize source tier
  const getSourceTier = (src: HistoricalSource): MandatorySourceTier => {
    if (src.type === 'primary' || src.type === 'archive') return 'primary';
    if (src.type === 'academic' || src.type === 'book' || src.type === 'institutional') return 'academic';
    return 'further_exploration';
  };

  const categorizedSources = {
    primary: sources.filter(s => getSourceTier(s) === 'primary'),
    academic: sources.filter(s => getSourceTier(s) === 'academic'),
    further_exploration: sources.filter(s => getSourceTier(s) === 'further_exploration')
  };

  // If a source doesn't fit in further exploration but user has few, ensure balance
  const effectiveFurther = categorizedSources.further_exploration.length > 0 
    ? categorizedSources.further_exploration 
    : [
        {
          id: 'further-unesco-db',
          title: 'Histoire Générale de l’Afrique (8 Volumes) - Portail Numérique',
          author: 'Comité Scientifique International de l’UNESCO',
          year: 'Collection permanente',
          type: 'academic' as const,
          archiveInstitution: 'UNESCO Publishing / Siège mondial',
          excerpt: 'Consultation intégrale des traités, cartes historiques et comptes-rendus des colloques d’historiens africains.',
          reliabilityNote: 'Accès ouvert pour la recherche fondamentale.'
        }
      ];

  const handleCopyCitation = (source: HistoricalSource, e: React.MouseEvent) => {
    e.stopPropagation();
    const citation = `${source.author} (${source.year}). "${source.title}". ${source.publisher || source.archiveInstitution || 'KAMA Living Archive'}.`;
    navigator.clipboard.writeText(citation);
    setCopiedId(source.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const tiersConfig = [
    {
      id: 'primary' as const,
      label: 'Sources Primaires',
      sublabel: 'Manuscrits, décrets, journaux & archives directes',
      badge: 'bg-[#F2B844]/20 text-[#743825] border-[#F2B844]/50',
      icon: Archive,
      count: categorizedSources.primary.length
    },
    {
      id: 'academic' as const,
      label: 'Sources Académiques',
      sublabel: 'Recherches universitaires & ouvrages à comité de lecture',
      badge: 'bg-[#1F392E]/12 text-[#1F392E] border-[#1F392E]/35',
      icon: GraduationCap,
      count: categorizedSources.academic.length
    },
    {
      id: 'further_exploration' as const,
      label: 'Pour aller plus loin',
      sublabel: 'Institutions partenaires, musées & fonds documentaires',
      badge: 'bg-[#A65438]/15 text-[#743825] border-[#A65438]/35',
      icon: Compass,
      count: effectiveFurther.length
    }
  ];

  const getFilteredList = () => {
    let list: { source: HistoricalSource; tier: MandatorySourceTier }[] = [];
    
    categorizedSources.primary.forEach(s => list.push({ source: s, tier: 'primary' }));
    categorizedSources.academic.forEach(s => list.push({ source: s, tier: 'academic' }));
    effectiveFurther.forEach(s => list.push({ source: s, tier: 'further_exploration' }));

    if (selectedTier !== 'all') {
      list = list.filter(item => item.tier === selectedTier);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(item => 
        item.source.title.toLowerCase().includes(q) ||
        item.source.author.toLowerCase().includes(q) ||
        (item.source.archiveInstitution && item.source.archiveInstitution.toLowerCase().includes(q)) ||
        (item.source.excerpt && item.source.excerpt.toLowerCase().includes(q))
      );
    }

    return list;
  };

  const filteredItems = getFilteredList();

  return (
    <section 
      id="sources-references" 
      className={`py-12 px-4 sm:px-6 md:px-8 rounded-3xl bg-[#FAF9F5] border border-[#121210]/10 shadow-[0_4px_24px_rgba(18,18,16,0.03)] ${className}`}
    >
      <div className="max-w-5xl mx-auto">
        {/* Header with Scientific Verification Seal */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 border-b border-[#121210]/8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1F392E]/10 text-[#1F392E] text-[11px] font-semibold tracking-wide border border-[#1F392E]/20">
                <ShieldCheck className="w-3.5 h-3.5 text-[#1F392E]" />
                Standard Scientifique Obligatoire KAMA
              </span>
              {contextTitle && (
                <span className="text-xs text-[#77746A] truncate max-w-xs">
                  • Dossier : {contextTitle}
                </span>
              )}
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold font-serif text-[#121210] tracking-tight">
              {title}
            </h3>
            <p className="text-sm text-[#46443D] mt-1.5 max-w-2xl leading-relaxed">
              {subtitle}
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto bg-white/80 p-1.5 rounded-2xl border border-[#121210]/8 shadow-sm">
            <div className="text-right px-3 py-1">
              <div className="text-xs font-bold text-[#121210]">100% Vérifié</div>
              <div className="text-[10px] text-[#77746A]">Sources croisées</div>
            </div>
            <div className="w-9 h-9 rounded-xl bg-[#F2B844]/20 flex items-center justify-center text-[#743825]">
              <Sparkles className="w-4 h-4 text-[#A65438]" />
            </div>
          </div>
        </div>

        {/* 3 Mandatory Category Filter Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-6">
          {tiersConfig.map((tier) => {
            const Icon = tier.icon;
            const isSelected = selectedTier === tier.id;
            return (
              <button
                key={tier.id}
                onClick={() => setSelectedTier(selectedTier === tier.id ? 'all' : tier.id)}
                className={`p-3.5 rounded-2xl text-left border transition-all relative overflow-hidden flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[#121210] text-[#FAF9F5] border-[#121210] shadow-md scale-[1.01]'
                    : 'bg-white/90 text-[#121210] border-[#121210]/8 hover:border-[#121210]/20 hover:bg-white'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-2">
                    <div className={`p-1.5 rounded-lg ${isSelected ? 'bg-white/15 text-[#F2B844]' : 'bg-[#FAF9F5] text-[#121210]'}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold tracking-tight">
                      {tier.label}
                    </span>
                  </div>
                  <span className={`text-[11px] font-mono px-2 py-0.5 rounded-full font-bold ${
                    isSelected ? 'bg-white/20 text-[#FAF9F5]' : 'bg-[#FAF9F5] text-[#46443D] border border-[#121210]/8'
                  }`}>
                    {tier.count}
                  </span>
                </div>
                <p className={`text-[11px] leading-snug line-clamp-1 ${isSelected ? 'text-stone-300' : 'text-[#77746A]'}`}>
                  {tier.sublabel}
                </p>
              </button>
            );
          })}
        </div>

        {/* Search within sources */}
        {sources.length > 3 && (
          <div className="relative mb-6">
            <Search className="w-4 h-4 text-[#77746A] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher par auteur, titre, institution d’archive ou extrait..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/90 border border-[#121210]/10 text-xs text-[#121210] placeholder:text-[#77746A] focus:outline-none focus:ring-2 focus:ring-[#A65438]/20 focus:border-[#A65438]"
            />
          </div>
        )}

        {/* Source Cards List */}
        <div className="space-y-3.5">
          {filteredItems.length === 0 ? (
            <div className="py-12 text-center bg-white/60 rounded-2xl border border-[#121210]/6">
              <FileText className="w-8 h-8 text-[#77746A] mx-auto mb-2 opacity-50" />
              <p className="text-xs text-[#77746A]">Aucune source ne correspond à ce filtre.</p>
            </div>
          ) : (
            filteredItems.map(({ source, tier }, index) => {
              const tierBadge = tier === 'primary' 
                ? { label: 'Source Primaire', badgeClass: 'bg-[#F2B844]/20 text-[#743825] border-[#F2B844]/40' }
                : tier === 'academic'
                ? { label: 'Source Académique', badgeClass: 'bg-[#1F392E]/10 text-[#1F392E] border-[#1F392E]/30' }
                : { label: 'Pour aller plus loin', badgeClass: 'bg-[#A65438]/15 text-[#743825] border-[#A65438]/30' };

              return (
                <motion.div
                  key={source.id || index}
                  layout
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 sm:p-5 rounded-2xl bg-white border border-[#121210]/8 hover:border-[#121210]/20 hover:shadow-md transition-all group"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                    <div className="flex-1">
                      {/* Badge and Metadata */}
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border uppercase tracking-wider ${tierBadge.badgeClass}`}>
                          {tierBadge.label}
                        </span>
                        <span className="text-xs font-mono font-bold text-[#A65438]">
                          {source.year}
                        </span>
                        {source.archiveInstitution && (
                          <span className="inline-flex items-center gap-1 text-[11px] text-[#77746A] bg-[#FAF9F5] px-2 py-0.5 rounded-md border border-[#121210]/6">
                            <Building2 className="w-3 h-3 text-[#A65438]" />
                            {source.archiveInstitution}
                          </span>
                        )}
                      </div>

                      {/* Source Title & Author */}
                      <h4 className="text-base font-bold text-[#121210] font-serif leading-snug group-hover:text-[#A65438] transition-colors">
                        {source.title}
                      </h4>
                      <p className="text-xs text-[#46443D] font-medium mt-0.5">
                        Auteur(s) / Éditeur : <span className="text-[#121210] font-semibold">{source.author}</span>
                        {source.publisher && ` — Éditions : ${source.publisher}`}
                      </p>

                      {/* Excerpt if present */}
                      {source.excerpt && (
                        <blockquote className="mt-3 pl-3 border-l-2 border-[#F2B844] text-xs italic text-[#46443D] bg-[#FAF9F5]/70 py-1.5 pr-2 rounded-r-lg">
                          « {source.excerpt} »
                        </blockquote>
                      )}

                      {/* Methodological / Reliability Note */}
                      {source.reliabilityNote && (
                        <div className="mt-2.5 flex items-start gap-1.5 text-[11px] text-[#77746A]">
                          <ShieldCheck className="w-3.5 h-3.5 text-[#1F392E] shrink-0 mt-0.5" />
                          <span><strong className="text-[#121210]">Attestation méthodologique :</strong> {source.reliabilityNote}</span>
                        </div>
                      )}
                    </div>

                    {/* Actions: Copy citation & Open drawer */}
                    <div className="flex items-center sm:flex-col gap-2 shrink-0 self-end sm:self-start mt-2 sm:mt-0">
                      <button
                        onClick={(e) => handleCopyCitation(source, e)}
                        title="Copier la citation académique (Norme APA/Chicago)"
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FAF9F5] hover:bg-[#FFF2CE] border border-[#121210]/10 text-xs font-semibold text-[#121210] transition-colors"
                      >
                        {copiedId === source.id ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                            <span className="text-[11px] text-emerald-700">Cité !</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5 text-[#77746A]" />
                            <span className="text-[11px]">Citer</span>
                          </>
                        )}
                      </button>

                      {onOpenSourceModal && (
                        <button
                          onClick={() => onOpenSourceModal(source)}
                          className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#121210] hover:bg-[#A65438] text-[#FAF9F5] text-xs font-semibold transition-colors"
                        >
                          <span className="text-[11px]">Détails</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}
