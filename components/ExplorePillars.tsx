'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  User, 
  Landmark, 
  Calendar, 
  MapPin, 
  Sparkles, 
  Layers, 
  ArrowRight,
  ShieldCheck,
  Compass
} from 'lucide-react';
import { 
  HISTORICAL_PEOPLE, 
  CIVILIZATIONS, 
  HISTORICAL_EVENTS 
} from '@/lib/kama-data';
import { EntityType } from '@/lib/types';

interface ExplorePillarsProps {
  onSelectEntity: (type: EntityType, id: string) => void;
}

export function ExplorePillars({ onSelectEntity }: ExplorePillarsProps) {
  const [activeTab, setActiveTab] = useState<'civilisations' | 'personnes' | 'evenements' | 'regions'>('civilisations');

  const regions = [
    { name: 'Afrique de l’Ouest', count: 'Mali, Songhaï, Ghana, Ashanti, Burkina Faso', id: 'west-africa' },
    { name: 'Afrique Centrale & Grands Lacs', count: 'Kongo, Ndongo, Matamba, RDC', id: 'central-africa' },
    { name: 'Vallée du Nil & Corne de l’Afrique', count: 'Kemet, Nubie (Koush), Méroé, Aksoum, Éthiopie', id: 'nil-horn' },
    { name: 'Caraïbes & Mondes Créoles', count: 'Haïti 1804, Saint-Domingue, Martinique, Guadeloupe', id: 'caribbean' },
    { name: 'Amériques & Diasporas', count: 'Underground Railroad, Palmares, Harlem, Afro-Brésil', id: 'americas' },
    { name: 'Afrique Australe', count: 'Royaume Zoulou, Grand Zimbabwe, Mapungubwe', id: 'southern-africa' }
  ];

  return (
    <section id="explorer" className="py-16 md:py-24 px-4 sm:px-6 md:px-8 bg-[#F5F2EA]/60 border-t border-[#121210]/8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#121210]/8 shadow-xs mb-3">
            <Compass className="w-3.5 h-3.5 text-[#A65438]" />
            <span className="text-xs font-bold uppercase tracking-widest text-[#121210]">
              Cartographie des Connaissances
            </span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#121210] font-sans">
            Explorer l’Histoire par Piliers
          </h2>
          <p className="text-xs sm:text-sm text-[#77746A] mt-2">
            Passez d’une civilisation à une personnalité, d’un événement fondateur à un territoire sans rupture.
          </p>

          {/* Navigation Tabs */}
          <div className="mt-8 inline-flex p-1.5 rounded-full bg-[#FAF9F5] border border-[#121210]/10 shadow-xs gap-1">
            {[
              { id: 'civilisations', label: 'Civilisations & Royaumes', icon: Landmark },
              { id: 'personnes', label: 'Personnes', icon: User },
              { id: 'evenements', label: 'Événements', icon: Calendar },
              { id: 'regions', label: 'Territoires & Diasporas', icon: MapPin },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-[#121210] text-[#FAF9F5] shadow-sm'
                      : 'text-[#46443D] hover:text-[#121210]'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{tab.label}</span>
                  <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content Display */}
        <div>
          {/* Civilizations Tab */}
          {activeTab === 'civilisations' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {CIVILIZATIONS.map((civ) => (
                <div
                  key={civ.id}
                  onClick={() => onSelectEntity('civilization', civ.id)}
                  className="group rounded-3xl bg-white border border-[#121210]/10 overflow-hidden shadow-xs hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between"
                >
                  <div className="h-44 w-full relative overflow-hidden bg-stone-200">
                    <img
                      src={civ.image}
                      alt={civ.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    <span className="absolute bottom-3 left-4 text-xs font-mono font-bold text-[#F2B844] bg-black/50 px-2.5 py-0.5 rounded-full backdrop-blur-xs">
                      {civ.periodSpan}
                    </span>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-wider text-[#A65438]">
                        Capitale : {civ.capital}
                      </p>
                      <h3 className="text-lg font-bold text-[#121210] mt-1 group-hover:text-[#A65438] transition-colors font-serif">
                        {civ.name}
                      </h3>
                      <p className="text-xs text-[#46443D] mt-2 line-clamp-3 leading-relaxed">
                        {civ.overview}
                      </p>
                    </div>

                    <div className="mt-5 pt-4 border-t border-[#121210]/8 flex items-center justify-between text-xs font-semibold text-[#121210]">
                      <span className="text-[#77746A]">{civ.notableFigures[0]}</span>
                      <span className="group-hover:translate-x-1 transition-transform flex items-center gap-1">
                        Explorer →
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {/* People Tab */}
          {activeTab === 'personnes' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
            >
              {HISTORICAL_PEOPLE.map((person) => (
                <div
                  key={person.id}
                  onClick={() => onSelectEntity('person', person.id)}
                  className="group rounded-3xl bg-white border border-[#121210]/10 p-5 shadow-xs hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    <div className="w-full aspect-square rounded-2xl overflow-hidden bg-stone-200 mb-4 relative">
                      <img
                        src={person.image}
                        alt={person.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute bottom-2 left-2 text-[10px] font-bold text-white bg-black/60 px-2 py-0.5 rounded-md backdrop-blur-xs">
                        {person.birthYear} – {person.deathYear || 'Présent'}
                      </span>
                    </div>

                    <p className="text-[10px] uppercase font-bold tracking-wider text-[#A65438] line-clamp-1">
                      {person.region}
                    </p>
                    <h3 className="text-base font-bold text-[#121210] mt-0.5 group-hover:text-[#A65438] transition-colors font-sans">
                      {person.name}
                    </h3>
                    <p className="text-xs text-[#77746A] mt-1 line-clamp-2">
                      {person.title}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#121210]/8 flex items-center justify-between text-xs font-semibold text-[#121210]">
                    <span className="text-[11px] text-stone-500 font-normal">{person.era.split('(')[0]}</span>
                    <span className="group-hover:translate-x-1 transition-transform">Fiche →</span>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {/* Events Tab */}
          {activeTab === 'evenements' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {HISTORICAL_EVENTS.map((event) => (
                <div
                  key={event.id}
                  onClick={() => onSelectEntity('event', event.id)}
                  className="group rounded-3xl bg-white border border-[#121210]/10 p-6 shadow-xs hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#A65438]/15 text-[#743825]">
                        {event.date}
                      </span>
                      <span className="text-xs text-[#77746A]">{event.region}</span>
                    </div>

                    <h3 className="text-lg font-bold text-[#121210] font-serif group-hover:text-[#A65438] transition-colors mt-2">
                      {event.title}
                    </h3>

                    <p className="text-xs text-[#46443D] mt-2 leading-relaxed line-clamp-3">
                      {event.summary}
                    </p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-[#121210]/8 flex items-center justify-between text-xs font-semibold text-[#121210]">
                    <span className="text-[#77746A] line-clamp-1">{event.place}</span>
                    <span className="group-hover:translate-x-1 transition-transform">Consulter →</span>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {/* Regions Tab */}
          {activeTab === 'regions' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {regions.map((reg) => (
                <div
                  key={reg.id}
                  onClick={() => onSelectEntity('civilization', 'empire-du-mali')}
                  className="group p-6 rounded-3xl bg-white border border-[#121210]/10 shadow-xs hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 rounded-2xl bg-[#1F392E]/10 flex items-center justify-center text-[#1F392E] mb-4 group-hover:bg-[#F2B844]/30 transition-colors">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold text-[#121210] font-serif group-hover:text-[#A65438] transition-colors">
                      {reg.name}
                    </h3>
                    <p className="text-xs text-[#46443D] mt-2 leading-relaxed">
                      {reg.count}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#121210]/8 flex items-center justify-between text-xs font-semibold text-[#121210]">
                    <span className="text-[#77746A]">Cartographie</span>
                    <span className="group-hover:translate-x-1 transition-transform">Explorer le monde →</span>
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </div>

      </div>
    </section>
  );
}
