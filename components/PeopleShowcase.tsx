'use client';

import React from 'react';
import { motion } from 'motion/react';
import { KamaSun } from './KamaSun';
import { User, Quote, ArrowRight, Sparkles } from 'lucide-react';
import { HISTORICAL_PEOPLE } from '@/lib/kama-data';
import { EntityType } from '@/lib/types';

interface PeopleShowcaseProps {
  onSelectPerson: (id: string) => void;
}

export function PeopleShowcase({ onSelectPerson }: PeopleShowcaseProps) {
  return (
    <section id="personnes" className="py-16 md:py-24 px-4 sm:px-6 md:px-8 border-t border-[#121210]/8">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <User className="w-4 h-4 text-[#A65438]" />
              <p className="text-xs uppercase tracking-widest font-bold text-[#A65438]">
                Grandes Figures Historiques
              </p>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#121210] font-sans">
              Personnes à connaître
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#77746A] max-w-md">
            Penseurs, stratèges, savants, résistantes et bâtisseurs ayant façonné l’Afrique et le monde noir.
          </p>
        </div>

        {/* Portraits Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {HISTORICAL_PEOPLE.map((person) => (
            <motion.div
              key={person.id}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.2 }}
              onClick={() => onSelectPerson(person.id)}
              className="group rounded-3xl bg-white border border-[#121210]/10 overflow-hidden shadow-xs hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between"
            >
              {/* Image with subtle duotone & hover color reveal */}
              <div className="w-full aspect-[4/4.5] overflow-hidden relative bg-stone-900">
                <img
                  src={person.image}
                  alt={person.name}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                
                {/* Year tag */}
                <span className="absolute top-3 right-3 text-[10px] font-mono font-bold text-white/90 bg-black/50 px-2.5 py-0.5 rounded-full backdrop-blur-xs">
                  {person.birthYear} – {person.deathYear || 'Présent'}
                </span>

                {/* Bottom Overlay Title */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <p className="text-[10px] uppercase font-bold tracking-wider text-[#F2B844]">
                    {person.region}
                  </p>
                  <h3 className="text-xl font-bold font-serif leading-tight text-white group-hover:text-[#F8D889] transition-colors">
                    {person.name}
                  </h3>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <p className="text-xs text-[#46443D] leading-relaxed line-clamp-3">
                  {person.summary}
                </p>

                {/* Quote highlight */}
                <div className="mt-4 pt-3 border-t border-[#121210]/8">
                  <p className="text-[11px] italic font-serif text-[#77746A] line-clamp-2">
                    « {person.quote.text} »
                  </p>

                  <div className="mt-3 flex items-center justify-between text-xs font-bold text-[#121210]">
                    <span className="text-[10px] text-[#A65438] uppercase font-sans tracking-wider">
                      Voir la biographie
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
