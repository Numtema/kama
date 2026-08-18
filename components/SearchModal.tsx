'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  X, 
  User, 
  Calendar, 
  Landmark, 
  BookOpen, 
  Video, 
  Compass, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { 
  HISTORICAL_PEOPLE, 
  HISTORICAL_EVENTS, 
  CIVILIZATIONS, 
  ARTICLE_DOSSIERS, 
  WATCH_MEDIA,
  KAMA_PATHS 
} from '@/lib/kama-data';
import { EntityType } from '@/lib/types';
import { useLanguage } from '@/lib/LanguageContext';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectEntity: (type: EntityType, id: string) => void;
}

export function SearchModal({ isOpen, onClose, onSelectEntity }: SearchModalProps) {
  const { t } = useLanguage();
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => inputRef.current?.focus(), 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      } else if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const cleanQuery = query.toLowerCase().trim();

  // Filter items
  const matchedPeople = HISTORICAL_PEOPLE.filter(p => 
    p.name.toLowerCase().includes(cleanQuery) || 
    p.summary.toLowerCase().includes(cleanQuery) ||
    p.title.toLowerCase().includes(cleanQuery)
  );

  const matchedEvents = HISTORICAL_EVENTS.filter(e => 
    e.title.toLowerCase().includes(cleanQuery) || 
    e.summary.toLowerCase().includes(cleanQuery) ||
    e.place.toLowerCase().includes(cleanQuery) ||
    e.date.toLowerCase().includes(cleanQuery)
  );

  const matchedCivs = CIVILIZATIONS.filter(c => 
    c.name.toLowerCase().includes(cleanQuery) || 
    c.overview.toLowerCase().includes(cleanQuery) ||
    c.location.toLowerCase().includes(cleanQuery)
  );

  const matchedArticles = ARTICLE_DOSSIERS.filter(a => 
    a.title.toLowerCase().includes(cleanQuery) || 
    a.subtitle.toLowerCase().includes(cleanQuery) ||
    a.category.toLowerCase().includes(cleanQuery)
  );

  const matchedVideos = WATCH_MEDIA.filter(v => 
    v.title.toLowerCase().includes(cleanQuery) || 
    v.summary.toLowerCase().includes(cleanQuery) ||
    v.category.toLowerCase().includes(cleanQuery)
  );

  const totalResults = 
    (activeFilter === 'all' || activeFilter === 'person' ? matchedPeople.length : 0) +
    (activeFilter === 'all' || activeFilter === 'event' ? matchedEvents.length : 0) +
    (activeFilter === 'all' || activeFilter === 'civilization' ? matchedCivs.length : 0) +
    (activeFilter === 'all' || activeFilter === 'article' ? matchedArticles.length : 0) +
    (activeFilter === 'all' || activeFilter === 'video' ? matchedVideos.length : 0);

  const handleItemClick = (type: EntityType, id: string) => {
    onSelectEntity(type, id);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 transition-opacity"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -10 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-2xl bg-[#FAF9F5] rounded-3xl border border-[#121210]/15 shadow-2xl overflow-hidden pointer-events-auto flex flex-col max-h-[80vh]"
            >
              {/* Search Bar Input */}
              <div className="relative flex items-center p-4 sm:p-5 border-b border-[#121210]/10 bg-white/80">
                <Search className="w-5 h-5 text-[#A65438] absolute left-6" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={t('search.placeholder', 'Rechercher une personne, empire, date, révolution, archive...')}
                  className="w-full pl-12 pr-12 py-2 text-base md:text-lg bg-transparent text-[#121210] placeholder-[#77746A] focus:outline-none"
                />
                {query ? (
                  <button
                    onClick={() => setQuery('')}
                    className="p-1 rounded-full text-stone-400 hover:text-stone-700 absolute right-14"
                  >
                    <X className="w-4 h-4" />
                  </button>
                ) : null}
                <button
                  onClick={onClose}
                  className="px-2.5 py-1 text-xs font-medium text-stone-500 bg-stone-100 rounded-md border border-stone-200"
                >
                  ESC
                </button>
              </div>

              {/* Filter Pills */}
              <div className="flex items-center gap-2 p-3 px-5 overflow-x-auto border-b border-[#121210]/6 bg-[#F5F2EA]/70 scrollbar-none text-xs">
                {[
                  { id: 'all', label: t('search.all', 'Tout explorer') },
                  { id: 'person', label: t('nav.people', 'Personnes'), icon: User },
                  { id: 'event', label: t('search.events', 'Événements'), icon: Calendar },
                  { id: 'civilization', label: t('nav.civilizations', 'Civilisations'), icon: Landmark },
                  { id: 'article', label: t('search.dossiers', 'Dossiers'), icon: BookOpen },
                  { id: 'video', label: t('nav.watch', 'Regarder'), icon: Video },
                ].map((f) => {
                  const Icon = f.icon;
                  const isActive = activeFilter === f.id;
                  return (
                    <button
                      key={f.id}
                      onClick={() => setActiveFilter(f.id)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-medium whitespace-nowrap transition-colors ${
                        isActive
                          ? 'bg-[#121210] text-white shadow-sm'
                          : 'bg-white/80 text-[#46443D] hover:bg-white border border-[#121210]/6'
                      }`}
                    >
                      {Icon && <Icon className="w-3.5 h-3.5" />}
                      {f.label}
                    </button>
                  );
                })}
              </div>

              {/* Results View */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-6">
                {cleanQuery === '' ? (
                  <div className="py-8 text-center">
                    <div className="w-12 h-12 rounded-full bg-[#F2B844]/20 flex items-center justify-center mx-auto mb-3 text-[#A65438]">
                      <Sparkles className="w-6 h-6" />
                    </div>
                    <p className="text-sm font-semibold text-[#121210]">{t('search.exploreArchive', 'Explorez la bibliothèque vivante')}</p>
                    <p className="text-xs text-[#77746A] mt-1 max-w-sm mx-auto">
                      {t('search.helper', 'Tapez un mot-clé comme « Thomas Sankara », « Empire du Mali », « Haïti 1804 », ou explorez nos suggestions.')}
                    </p>

                    <div className="mt-6 flex flex-wrap justify-center gap-2">
                      {['Mansa Moussa', 'Révolution de 1983', 'Reine Nzinga', 'Charte de Kouroukan', 'Cheikh Anta Diop', 'Bois-Caïman 1791'].map((tag) => (
                        <button
                          key={tag}
                          onClick={() => setQuery(tag)}
                          className="px-3.5 py-1.5 rounded-full text-xs bg-white border border-[#121210]/10 hover:border-[#F2B844] transition-colors text-[#46443D]"
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : totalResults === 0 ? (
                  <div className="py-12 text-center">
                    <p className="text-base font-semibold text-[#121210]">{t('search.noResults', 'Aucun élément trouvé pour')} « {query} »</p>
                    <p className="text-xs text-[#77746A] mt-1">
                      {t('search.noResultsSub', 'Essayez un autre mot-clé ou demandez à notre archiviste IA.')}
                    </p>
                  </div>
                ) : (
                  <>
                    {/* People Section */}
                    {(activeFilter === 'all' || activeFilter === 'person') && matchedPeople.length > 0 && (
                      <div>
                        <p className="text-xs uppercase tracking-wider font-semibold text-[#77746A] mb-2 px-1">
                          Personnes historiques ({matchedPeople.length})
                        </p>
                        <div className="space-y-1.5">
                          {matchedPeople.map((p) => (
                            <div
                              key={p.id}
                              onClick={() => handleItemClick('person', p.id)}
                              className="group flex items-center justify-between p-3 rounded-2xl bg-white hover:bg-[#FFF2CE]/40 border border-[#121210]/6 hover:border-[#F2B844]/60 cursor-pointer transition-all"
                            >
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full overflow-hidden bg-stone-200 flex-shrink-0 relative">
                                  <Image
                                    src={p.image}
                                    alt={p.name}
                                    fill
                                    sizes="40px"
                                    referrerPolicy="no-referrer"
                                    className="object-cover"
                                  />
                                </div>
                                <div>
                                  <h4 className="text-sm font-bold text-[#121210] group-hover:text-[#A65438] transition-colors">
                                    {p.name}
                                  </h4>
                                  <p className="text-xs text-[#77746A] line-clamp-1">{p.title}</p>
                                </div>
                              </div>
                              <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-[#121210] group-hover:translate-x-0.5 transition-all" />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Events Section */}
                    {(activeFilter === 'all' || activeFilter === 'event') && matchedEvents.length > 0 && (
                      <div>
                        <p className="text-xs uppercase tracking-wider font-semibold text-[#77746A] mb-2 px-1">
                          Événements & Révolutions ({matchedEvents.length})
                        </p>
                        <div className="space-y-1.5">
                          {matchedEvents.map((e) => (
                            <div
                              key={e.id}
                              onClick={() => handleItemClick('event', e.id)}
                              className="group flex items-center justify-between p-3 rounded-2xl bg-white hover:bg-[#FFF2CE]/40 border border-[#121210]/6 hover:border-[#F2B844]/60 cursor-pointer transition-all"
                            >
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-[#F2B844]/15 flex items-center justify-center text-xs font-bold text-[#743825] flex-shrink-0">
                                  {e.date.split(' ')[0]}
                                </div>
                                <div>
                                  <h4 className="text-sm font-bold text-[#121210] group-hover:text-[#A65438] transition-colors">
                                    {e.title}
                                  </h4>
                                  <p className="text-xs text-[#77746A] line-clamp-1">{e.place} • {e.era}</p>
                                </div>
                              </div>
                              <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-[#121210] group-hover:translate-x-0.5 transition-all" />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Civilizations Section */}
                    {(activeFilter === 'all' || activeFilter === 'civilization') && matchedCivs.length > 0 && (
                      <div>
                        <p className="text-xs uppercase tracking-wider font-semibold text-[#77746A] mb-2 px-1">
                          Civilisations & Royaumes ({matchedCivs.length})
                        </p>
                        <div className="space-y-1.5">
                          {matchedCivs.map((c) => (
                            <div
                              key={c.id}
                              onClick={() => handleItemClick('civilization', c.id)}
                              className="group flex items-center justify-between p-3 rounded-2xl bg-white hover:bg-[#FFF2CE]/40 border border-[#121210]/6 hover:border-[#F2B844]/60 cursor-pointer transition-all"
                            >
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl overflow-hidden bg-stone-200 flex-shrink-0 relative">
                                  <Image
                                    src={c.image}
                                    alt={c.name}
                                    fill
                                    sizes="40px"
                                    referrerPolicy="no-referrer"
                                    className="object-cover"
                                  />
                                </div>
                                <div>
                                  <h4 className="text-sm font-bold text-[#121210] group-hover:text-[#A65438] transition-colors">
                                    {c.name}
                                  </h4>
                                  <p className="text-xs text-[#77746A]">{c.periodSpan} • {c.location.split('(')[0]}</p>
                                </div>
                              </div>
                              <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-[#121210] group-hover:translate-x-0.5 transition-all" />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Articles Section */}
                    {(activeFilter === 'all' || activeFilter === 'article') && matchedArticles.length > 0 && (
                      <div>
                        <p className="text-xs uppercase tracking-wider font-semibold text-[#77746A] mb-2 px-1">
                          Dossiers d’Analyse ({matchedArticles.length})
                        </p>
                        <div className="space-y-1.5">
                          {matchedArticles.map((a) => (
                            <div
                              key={a.id}
                              onClick={() => handleItemClick('article', a.id)}
                              className="group flex items-center justify-between p-3 rounded-2xl bg-white hover:bg-[#FFF2CE]/40 border border-[#121210]/6 hover:border-[#F2B844]/60 cursor-pointer transition-all"
                            >
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl overflow-hidden bg-stone-200 flex-shrink-0 relative">
                                  <Image
                                    src={a.heroImage}
                                    alt={a.title}
                                    fill
                                    sizes="40px"
                                    referrerPolicy="no-referrer"
                                    className="object-cover"
                                  />
                                </div>
                                <div>
                                  <h4 className="text-sm font-bold text-[#121210] group-hover:text-[#A65438] transition-colors line-clamp-1">
                                    {a.title}
                                  </h4>
                                  <p className="text-xs text-[#77746A]">{a.territory} • {a.readTimeMin} min de lecture</p>
                                </div>
                              </div>
                              <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-[#121210] group-hover:translate-x-0.5 transition-all" />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Video / Watch Section */}
                    {(activeFilter === 'all' || activeFilter === 'video') && matchedVideos.length > 0 && (
                      <div>
                        <p className="text-xs uppercase tracking-wider font-semibold text-[#77746A] mb-2 px-1">
                          Archives & Documentaires ({matchedVideos.length})
                        </p>
                        <div className="space-y-1.5">
                          {matchedVideos.map((v) => (
                            <div
                              key={v.id}
                              onClick={() => handleItemClick('video', v.id)}
                              className="group flex items-center justify-between p-3 rounded-2xl bg-white hover:bg-[#FFF2CE]/40 border border-[#121210]/6 hover:border-[#F2B844]/60 cursor-pointer transition-all"
                            >
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl overflow-hidden bg-stone-200 flex-shrink-0 relative">
                                  <Image
                                    src={v.thumbnail}
                                    alt={v.title}
                                    fill
                                    sizes="40px"
                                    referrerPolicy="no-referrer"
                                    className="object-cover"
                                  />
                                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                                    <Video className="w-4 h-4 text-white" />
                                  </div>
                                </div>
                                <div>
                                  <h4 className="text-sm font-bold text-[#121210] group-hover:text-[#A65438] transition-colors line-clamp-1">
                                    {v.title}
                                  </h4>
                                  <p className="text-xs text-[#77746A]">{v.category.toUpperCase()} • {v.duration}</p>
                                </div>
                              </div>
                              <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-[#121210] group-hover:translate-x-0.5 transition-all" />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* Footer */}
              <div className="p-3 px-5 border-t border-[#121210]/10 bg-[#FAF9F5] flex items-center justify-between text-xs text-[#77746A]">
                <span>Knowledge Graph connecté KAMA</span>
                <span>Astuce : <strong>⌘K</strong> pour ouvrir à tout moment</span>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
