'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { KamaSun } from './KamaSun';
import { 
  Share2, 
  Layers, 
  ArrowRight, 
  Sparkles, 
  User, 
  Landmark, 
  Calendar, 
  BookOpen, 
  Video, 
  Globe2,
  Maximize2
} from 'lucide-react';
import { 
  HISTORICAL_PEOPLE, 
  CIVILIZATIONS, 
  HISTORICAL_EVENTS, 
  ARTICLE_DOSSIERS 
} from '@/lib/kama-data';
import { EntityType } from '@/lib/types';

interface GraphNode {
  id: string;
  name: string;
  type: EntityType;
  category: string;
  connections: { targetId: string; label: string }[];
  summary: string;
  x: number; // Percentage coordinate on canvas
  y: number;
}

const GRAPH_NODES: GraphNode[] = [
  {
    id: 'thomas-sankara',
    name: 'Thomas Sankara',
    type: 'person',
    category: 'Révolutionnaire & Écologiste',
    connections: [
      { targetId: 'patrice-lumumba', label: 'Inspiration politique' },
      { targetId: 'revolution-burkina-1983', label: 'Architecte' },
      { targetId: 'empire-du-mali', label: 'Héritage sahélien' }
    ],
    summary: 'Président du Burkina Faso (1983-1987), défenseur de l’autosuffisance et des droits des femmes.',
    x: 50,
    y: 45
  },
  {
    id: 'patrice-lumumba',
    name: 'Patrice Lumumba',
    type: 'person',
    category: 'Panafricanisme & Congo',
    connections: [
      { targetId: 'thomas-sankara', label: 'Filiation d’idées' },
      { targetId: 'aime-cesaire', label: 'Compagnonnage littéraire' }
    ],
    summary: 'Premier ministre du Congo, héraut de l’indépendance et de l’unité africaine.',
    x: 24,
    y: 28
  },
  {
    id: 'revolution-burkina-1983',
    name: 'Révolution de 1983',
    type: 'event',
    category: 'Événement majeur',
    connections: [
      { targetId: 'thomas-sankara', label: 'Gouvernance' }
    ],
    summary: 'Refondation démocratique et populaire du Burkina Faso.',
    x: 76,
    y: 35
  },
  {
    id: 'mansa-musa',
    name: 'Mansa Moussa',
    type: 'person',
    category: 'Souveraineté & Savoirs',
    connections: [
      { targetId: 'empire-du-mali', label: '10e Mansa' },
      { targetId: 'kouroukan-fouga-1236', label: 'Constitution' }
    ],
    summary: 'Empereur du Mali médiéval ayant fait rayonner Tombouctou dans le monde entier.',
    x: 30,
    y: 72
  },
  {
    id: 'empire-du-mali',
    name: 'Empire du Mali',
    type: 'civilization',
    category: 'Grand Empire (1235–1670)',
    connections: [
      { targetId: 'mansa-musa', label: 'Souverain' },
      { targetId: 'kouroukan-fouga-1236', label: 'Fondation' },
      { targetId: 'thomas-sankara', label: 'Territoire sahélien' }
    ],
    summary: 'Royaume mandingue des universités de Sankoré et des routes de l’or.',
    x: 52,
    y: 80
  },
  {
    id: 'toussaint-louverture',
    name: 'Toussaint Louverture',
    type: 'person',
    category: 'Révolution Haïtienne',
    connections: [
      { targetId: 'revolution-haitienne-1804', label: 'Général en chef' },
      { targetId: 'aime-cesaire', label: 'Hommage poétique' }
    ],
    summary: 'Gouverneur général et stratège brisant les fers de l’esclavage à Saint-Domingue.',
    x: 75,
    y: 68
  },
  {
    id: 'revolution-haitienne-1804',
    name: 'Haïti 1804',
    type: 'event',
    category: 'Première République Noire',
    connections: [
      { targetId: 'toussaint-louverture', label: 'Père fondateur' }
    ],
    summary: 'Proclamation de l’indépendance après la victoire de Vertières.',
    x: 88,
    y: 82
  },
  {
    id: 'aime-cesaire',
    name: 'Aimé Césaire',
    type: 'person',
    category: 'Négritude & Pensée',
    connections: [
      { targetId: 'toussaint-louverture', label: 'Étude historique' },
      { targetId: 'patrice-lumumba', label: 'Une saison au Congo' }
    ],
    summary: 'Poète et penseur anticolonial, auteur du Discours sur le colonialisme.',
    x: 18,
    y: 52
  }
];

interface KnowledgeGraphViewProps {
  onSelectEntity: (type: EntityType, id: string) => void;
}

export function KnowledgeGraphView({ onSelectEntity }: KnowledgeGraphViewProps) {
  const [selectedNodeId, setSelectedNodeId] = useState<string>('thomas-sankara');
  const activeNode = GRAPH_NODES.find(n => n.id === selectedNodeId) || GRAPH_NODES[0];

  const getNodeIcon = (type: EntityType) => {
    switch (type) {
      case 'person': return User;
      case 'event': return Calendar;
      case 'civilization': return Landmark;
      default: return Sparkles;
    }
  };

  return (
    <section id="graphe" className="py-16 md:py-24 px-4 sm:px-6 md:px-8 border-t border-[#121210]/8 bg-[#F5F2EA]/40">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 mb-2">
              <Layers className="w-4 h-4 text-[#A65438]" />
              <p className="text-xs uppercase tracking-widest font-bold text-[#A65438]">
                Knowledge Graph KAMA
              </p>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#121210] font-sans">
              La Toile de l’Histoire Reliée
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#77746A] max-w-md">
            Cliquez sur un nœud pour faire apparaître instantanément ses connexions historiques, intellectuelles et géopolitiques.
          </p>
        </div>

        {/* Interactive Graph Canvas Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-white rounded-3xl border border-[#121210]/10 p-4 sm:p-8 shadow-sm overflow-hidden min-h-[560px]">
          
          {/* Visual Graph Stage (8 cols) */}
          <div className="lg:col-span-8 relative rounded-2xl bg-[#FAF9F5] border border-[#121210]/8 min-h-[420px] lg:min-h-[500px] overflow-hidden p-6 select-none flex items-center justify-center">
            
            {/* SVG Relationship Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
              {GRAPH_NODES.map((node) => 
                node.connections.map((conn, idx) => {
                  const target = GRAPH_NODES.find(n => n.id === conn.targetId);
                  if (!target) return null;
                  const isHighlighted = selectedNodeId === node.id || selectedNodeId === target.id;

                  return (
                    <g key={`${node.id}-${conn.targetId}-${idx}`}>
                      <line
                        x1={`${node.x}%`}
                        y1={`${node.y}%`}
                        x2={`${target.x}%`}
                        y2={`${target.y}%`}
                        stroke={isHighlighted ? '#F2B844' : '#121210'}
                        strokeWidth={isHighlighted ? 2.5 : 1}
                        strokeOpacity={isHighlighted ? 0.9 : 0.15}
                        strokeDasharray={isHighlighted ? undefined : "4 4"}
                      />
                    </g>
                  );
                })
              )}
            </svg>

            {/* Interactive Nodes */}
            {GRAPH_NODES.map((node) => {
              const isSelected = selectedNodeId === node.id;
              const isConnected = activeNode.connections.some(c => c.targetId === node.id);
              const Icon = getNodeIcon(node.type);

              return (
                <motion.div
                  key={node.id}
                  style={{
                    position: 'absolute',
                    left: `${node.x}%`,
                    top: `${node.y}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                  whileHover={{ scale: 1.08 }}
                  onClick={() => setSelectedNodeId(node.id)}
                  className={`z-10 cursor-pointer flex flex-col items-center group`}
                >
                  <div
                    className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center transition-all duration-300 shadow-md ${
                      isSelected
                        ? 'bg-[#121210] text-[#F2B844] ring-4 ring-[#F2B844]/50 scale-110'
                        : isConnected
                        ? 'bg-[#FFF2CE] text-[#743825] border-2 border-[#F2B844]'
                        : 'bg-white text-[#121210] border border-[#121210]/15 group-hover:border-[#A65438]'
                    }`}
                  >
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>

                  <span
                    className={`text-[11px] sm:text-xs font-bold mt-1 px-2.5 py-0.5 rounded-full whitespace-nowrap transition-colors shadow-2xs ${
                      isSelected
                        ? 'bg-[#121210] text-white'
                        : isConnected
                        ? 'bg-[#F2B844] text-[#121210]'
                        : 'bg-white/90 text-[#46443D] border border-stone-200'
                    }`}
                  >
                    {node.name}
                  </span>
                </motion.div>
              );
            })}

            {/* Micro hint */}
            <div className="absolute bottom-3 left-4 text-[11px] text-[#77746A] bg-white/80 px-2.5 py-1 rounded-md border border-stone-200">
              Astuce : Cliquez sur un nœud pour explorer ses ramifications.
            </div>
          </div>

          {/* Right Entity Insight Panel (4 cols) */}
          <div className="lg:col-span-4 p-5 sm:p-6 rounded-2xl bg-[#FAF9F5] border border-[#121210]/8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase bg-[#F2B844] text-[#121210]">
                  {activeNode.type}
                </span>
                <span className="text-xs text-[#77746A]">{activeNode.category}</span>
              </div>

              <h3 className="text-2xl font-bold text-[#121210] font-serif leading-tight">
                {activeNode.name}
              </h3>

              <p className="text-xs sm:text-sm text-[#46443D] mt-3 leading-relaxed">
                {activeNode.summary}
              </p>

              {/* Connected relations list */}
              <div className="mt-6">
                <p className="text-xs uppercase font-bold tracking-wider text-[#A65438] mb-3">
                  Connexions directes ({activeNode.connections.length})
                </p>
                <div className="space-y-2">
                  {activeNode.connections.map((conn, idx) => {
                    const target = GRAPH_NODES.find(n => n.id === conn.targetId);
                    if (!target) return null;
                    return (
                      <div
                        key={idx}
                        onClick={() => setSelectedNodeId(target.id)}
                        className="p-2.5 rounded-xl bg-white hover:bg-[#FFF2CE]/60 border border-[#121210]/6 cursor-pointer flex items-center justify-between transition-colors group"
                      >
                        <div>
                          <p className="text-xs font-bold text-[#121210] group-hover:text-[#A65438]">
                            {target.name}
                          </p>
                          <p className="text-[10px] text-[#77746A]">{conn.label}</p>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-stone-400 group-hover:text-[#121210] group-hover:translate-x-0.5 transition-all" />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Action CTA */}
            <div className="mt-8 pt-4 border-t border-[#121210]/10">
              <button
                onClick={() => onSelectEntity(activeNode.type, activeNode.id)}
                className="w-full py-3 px-4 rounded-full bg-[#121210] hover:bg-[#2B2925] text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-xs transition-colors"
              >
                <span>Ouvrir la fiche complète</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
