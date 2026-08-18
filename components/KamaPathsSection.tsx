'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { KamaSun } from './KamaSun';
import { Compass, Clock, CheckCircle2, ArrowRight, BookOpen, Sparkles } from 'lucide-react';
import { KAMA_PATHS } from '@/lib/kama-data';
import { KamaPath, EntityType } from '@/lib/types';

interface KamaPathsSectionProps {
  onSelectEntity: (type: EntityType, id: string) => void;
}

export function KamaPathsSection({ onSelectEntity }: KamaPathsSectionProps) {
  const [selectedPath, setSelectedPath] = useState<KamaPath>(KAMA_PATHS[0]);
  const [completedSteps, setCompletedSteps] = useState<number[]>([1]);

  const toggleStep = (stepNumber: number) => {
    if (completedSteps.includes(stepNumber)) {
      setCompletedSteps(completedSteps.filter(s => s !== stepNumber));
    } else {
      setCompletedSteps([...completedSteps, stepNumber]);
    }
  };

  return (
    <section id="parcours" className="py-16 md:py-24 px-4 sm:px-6 md:px-8 border-t border-[#121210]/8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 mb-2">
              <Compass className="w-4 h-4 text-[#A65438]" />
              <p className="text-xs uppercase tracking-widest font-bold text-[#A65438]">
                Parcours Éditoriaux Guidés
              </p>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#121210] font-sans">
              KAMA Paths
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#77746A] max-w-md">
            Des parcours progressifs conçus pour comprendre les grands enjeux historiques étape par étape en moins d’une heure.
          </p>
        </div>

        {/* Path Selector Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
          {KAMA_PATHS.map((path) => {
            const isSelected = selectedPath.id === path.id;
            return (
              <div
                key={path.id}
                onClick={() => setSelectedPath(path)}
                className={`p-6 rounded-3xl cursor-pointer transition-all border ${
                  isSelected
                    ? 'bg-white border-[#121210] shadow-md ring-2 ring-[#F2B844]/40'
                    : 'bg-[#F5F2EA]/60 border-[#121210]/8 hover:bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#F2B844]/20 text-[#743825]">
                    {path.level}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-[#77746A] font-medium">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{path.estimatedMinutes} min • {path.totalSteps} étapes</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-[#121210] font-serif leading-snug">
                  {path.title}
                </h3>
                <p className="text-xs text-[#46443D] mt-2 leading-relaxed">
                  {path.tagline}
                </p>
              </div>
            );
          })}
        </div>

        {/* Active Path Steps Tracker */}
        <div className="p-6 sm:p-10 rounded-3xl bg-white border border-[#121210]/10 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#121210]/8 mb-8">
            <div>
              <p className="text-xs uppercase font-bold tracking-wider text-[#A65438]">
                Progression du parcours
              </p>
              <h3 className="text-2xl font-bold text-[#121210] font-serif">
                {selectedPath.title}
              </h3>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right">
                <span className="text-xs font-mono font-bold text-[#121210]">
                  {completedSteps.length} / {selectedPath.steps.length} complétés
                </span>
                <div className="w-32 h-2 bg-stone-200 rounded-full mt-1 overflow-hidden">
                  <div
                    className="h-full bg-[#1F392E] transition-all duration-500"
                    style={{ width: `${(completedSteps.length / selectedPath.steps.length) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Steps List */}
          <div className="space-y-4">
            {selectedPath.steps.map((step) => {
              const isCompleted = completedSteps.includes(step.stepNumber);
              return (
                <div
                  key={step.stepNumber}
                  className={`p-5 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                    isCompleted
                      ? 'bg-[#1F392E]/5 border-[#1F392E]/20'
                      : 'bg-[#FAF9F5] border-[#121210]/8 hover:bg-white'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <button
                      onClick={() => toggleStep(step.stepNumber)}
                      className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors mt-0.5 ${
                        isCompleted
                          ? 'bg-[#1F392E] text-white'
                          : 'bg-white border-2 border-[#121210]/20 text-[#77746A]'
                      }`}
                      aria-label="Valider l'étape"
                    >
                      {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : step.stepNumber}
                    </button>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] uppercase font-bold tracking-widest text-[#A65438]">
                          Étape {step.stepNumber} • {step.mediaType.toUpperCase()}
                        </span>
                      </div>
                      <h4 className="text-base font-bold text-[#121210] mt-0.5">
                        {step.title}
                      </h4>
                      <p className="text-xs text-[#46443D] mt-1 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <button
                      onClick={() => onSelectEntity(step.targetType, step.targetId)}
                      className="px-4 py-2 rounded-full bg-[#121210] hover:bg-[#2B2925] text-white text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-colors"
                    >
                      <span>Consulter l’étape</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
