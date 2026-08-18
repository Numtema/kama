'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Network, 
  Search, 
  Sparkles, 
  FileText, 
  Users, 
  Video, 
  Archive, 
  Mic2, 
  ChevronRight, 
  ChevronDown, 
  Layers, 
  ArrowRight, 
  CornerDownRight, 
  ShieldCheck, 
  RefreshCw, 
  Compass, 
  BookOpen, 
  Maximize2, 
  Globe2, 
  Info,
  SlidersHorizontal,
  Bookmark
} from 'lucide-react';
import { TopicGraphData, GraphNodeBranch, EntityType, HistoricalSource } from '@/lib/types';
import { CURATED_TOPIC_GRAPHS } from '@/lib/curated-graphs';
import { MandatorySourcesSection } from './MandatorySourcesSection';

interface DynamicTopicGraphProps {
  onSelectEntity?: (type: EntityType, id: string) => void;
  onOpenSourceModal?: (source: HistoricalSource) => void;
  initialQuery?: string;
}

export function DynamicTopicGraph({
  onSelectEntity,
  onOpenSourceModal,
  initialQuery = 'slavery'
}: DynamicTopicGraphProps) {
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [activeGraph, setActiveGraph] = useState<TopicGraphData>(CURATED_TOPIC_GRAPHS.slavery);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedNode, setSelectedNode] = useState<GraphNodeBranch | null>(null);
  const [expandedNodes, setExpandedNodes] = useState<Record<string, boolean>>({
    'branch-africa': true,
    'branch-atlantic': true,
    'branch-americas': true,
    'branch-africa-fr': true,
    'branch-atlantic-fr': true,
    'branch-americas-fr': true,
    'branch-panafricanisme': true,
    'branch-independances': true
  });
  const [mediaFilter, setMediaFilter] = useState<'all' | 'articles' | 'characters' | 'documentaries' | 'archives' | 'conferences'>('all');
  const [viewMode, setViewMode] = useState<'hierarchical' | 'radial'>('hierarchical');

  // Query exploration presets
  const popularPresets = [
    { label: 'Esclavage & Résistances (Exemple)', query: 'slavery' },
    { label: 'Anticolonialisme & Panafricanisme', query: 'anticolonialisme' },
    { label: 'Empire du Mali & Royaumes', query: 'Empire du Mali Mansa Moussa' },
    { label: 'Femmes Guerrières & Souveraines', query: 'Reine Nzinga Yaa Asantewaa' },
    { label: 'Sciences & Manuscrits de Tombouctou', query: 'Sciences astronomie Tombouctou' }
  ];

  // Perform search / graph decomposition
  const handleFetchGraph = async (topic: string) => {
    if (!topic.trim()) return;
    setIsLoading(true);
    try {
      const res = await fetch('/api/gemini/explore-graph', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: topic })
      });
      if (res.ok) {
        const data: TopicGraphData = await res.json();
        setActiveGraph(data);
        setSelectedNode(data.rootNode);
        // Expand all level 1 children by default
        const newExpanded: Record<string, boolean> = {};
        data.rootNode.children?.forEach(c => {
          newExpanded[c.id] = true;
          c.children?.forEach(sc => {
            newExpanded[sc.id] = true;
          });
        });
        setExpandedNodes(newExpanded);
      }
    } catch (err) {
      console.error('Failed to load topic graph:', err);
      // Fallback
      setActiveGraph(CURATED_TOPIC_GRAPHS.slavery);
      setSelectedNode(CURATED_TOPIC_GRAPHS.slavery.rootNode);
    } finally {
      setIsLoading(false);
    }
  };

  const effectiveSelectedNode = selectedNode || activeGraph.rootNode;

  const toggleExpand = (nodeId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setExpandedNodes(prev => ({ ...prev, [nodeId]: !prev[nodeId] }));
  };

  const selectNode = (node: GraphNodeBranch) => {
    setSelectedNode(node);
  };

  return (
    <section id="graphe" className="py-16 md:py-24 px-4 sm:px-6 md:px-8 bg-[#F5F2EA]/60 border-y border-[#121210]/10">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#A65438]/12 text-[#743825] text-xs font-semibold tracking-wide border border-[#A65438]/25 mb-3">
              <Network className="w-3.5 h-3.5 text-[#A65438]" />
              Explorer & Knowledge Graph Dynamique
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif text-[#121210] tracking-tight">
              Décomposition Vivante des Sujets
            </h2>
            <p className="text-sm sm:text-base text-[#46443D] mt-2 max-w-3xl leading-relaxed">
              Explorez l’histoire comme un réseau interconnecté. Saisissez n’importe quel concept historique (ex : <em>« slavery »</em>, <em>« indépendances »</em>, <em>« manuscrits »</em>) pour générer son arborescence documentée avec le décompte précis d’articles, personnages, documentaires, archives et conférences.
            </p>
          </div>

          {/* View Mode & Count Pill */}
          <div className="flex items-center gap-3 self-start lg:self-auto">
            <div className="px-3.5 py-1.5 rounded-2xl bg-white border border-[#121210]/10 text-xs font-mono font-bold text-[#121210] shadow-sm flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{activeGraph.totalBranches || 18} branches actives</span>
            </div>
            <div className="flex items-center bg-white p-1 rounded-2xl border border-[#121210]/10 shadow-sm">
              <button
                onClick={() => setViewMode('hierarchical')}
                className={`px-3 py-1 rounded-xl text-xs font-semibold transition-colors ${
                  viewMode === 'hierarchical' ? 'bg-[#121210] text-[#FAF9F5]' : 'text-[#77746A] hover:text-[#121210]'
                }`}
              >
                Arborescence
              </button>
              <button
                onClick={() => setViewMode('radial')}
                className={`px-3 py-1 rounded-xl text-xs font-semibold transition-colors ${
                  viewMode === 'radial' ? 'bg-[#121210] text-[#FAF9F5]' : 'text-[#77746A] hover:text-[#121210]'
                }`}
              >
                Cartographie
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic Topic Search Bar */}
        <div className="bg-white p-3 sm:p-4 rounded-3xl border border-[#121210]/10 shadow-lg mb-8">
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              handleFetchGraph(searchQuery);
            }}
            className="flex flex-col sm:flex-row items-center gap-2"
          >
            <div className="relative flex-1 w-full">
              <Search className="w-5 h-5 text-[#A65438] absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Entrez un sujet historique (ex: slavery, royaumes, anticolonialisme, Harlem Renaissance)..."
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-[#FAF9F5] border border-[#121210]/10 text-sm font-medium text-[#121210] placeholder:text-[#77746A] focus:outline-none focus:ring-2 focus:ring-[#A65438]/20 focus:border-[#A65438]"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-[#121210] hover:bg-[#A65438] text-[#FAF9F5] text-xs font-bold tracking-wide uppercase flex items-center justify-center gap-2 transition-colors shrink-0 disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-[#F2B844]" />
                  <span>Analyse ontologique...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-[#F2B844]" />
                  <span>Explorer le Graphe</span>
                </>
              )}
            </button>
          </form>

          {/* Quick Preset Tags */}
          <div className="flex items-center gap-2 mt-3 pt-3 border-t border-[#121210]/6 overflow-x-auto pb-1 text-xs">
            <span className="text-[11px] font-bold text-[#77746A] shrink-0">Suggestions :</span>
            {popularPresets.map((preset, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setSearchQuery(preset.query);
                  handleFetchGraph(preset.query);
                }}
                className={`px-3 py-1 rounded-full border text-[11px] font-medium whitespace-nowrap transition-all ${
                  searchQuery.toLowerCase() === preset.query.toLowerCase()
                    ? 'bg-[#A65438] text-white border-[#A65438]'
                    : 'bg-[#FAF9F5] text-[#46443D] border-[#121210]/8 hover:border-[#121210]/20 hover:bg-stone-100'
                }`}
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        {/* Media Counts Filter Bar */}
        <div className="flex items-center justify-between flex-wrap gap-3 mb-6 bg-white/70 p-3 rounded-2xl border border-[#121210]/8">
          <div className="flex items-center gap-2 text-xs font-bold text-[#121210]">
            <SlidersHorizontal className="w-4 h-4 text-[#A65438]" />
            <span>Filtrer par type de ressource KAMA :</span>
          </div>

          <div className="flex items-center flex-wrap gap-1.5">
            {[
              { id: 'all' as const, label: 'Tous', icon: Layers, count: activeGraph.rootNode.itemCounts.total },
              { id: 'articles' as const, label: 'Articles', icon: FileText, count: activeGraph.rootNode.itemCounts.articles },
              { id: 'characters' as const, label: 'Personnages', icon: Users, count: activeGraph.rootNode.itemCounts.characters },
              { id: 'documentaries' as const, label: 'Documentaires', icon: Video, count: activeGraph.rootNode.itemCounts.documentaries },
              { id: 'archives' as const, label: 'Archives', icon: Archive, count: activeGraph.rootNode.itemCounts.archives },
              { id: 'conferences' as const, label: 'Conférences', icon: Mic2, count: activeGraph.rootNode.itemCounts.conferences },
            ].map(tab => {
              const Icon = tab.icon;
              const isSelected = mediaFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setMediaFilter(tab.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                    isSelected
                      ? 'bg-[#121210] text-[#FAF9F5] shadow-sm'
                      : 'bg-white text-[#46443D] border border-[#121210]/8 hover:bg-stone-100'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-[#F2B844]' : 'text-[#77746A]'}`} />
                  <span>{tab.label}</span>
                  <span className={`text-[10px] font-mono font-bold px-1.5 py-0.2 rounded-md ${
                    isSelected ? 'bg-white/20 text-[#FAF9F5]' : 'bg-stone-100 text-[#77746A]'
                  }`}>
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Interactive Visual Exploration Canvas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Interactive Graph Tree (7 Cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-[#121210]/10 p-5 sm:p-6 shadow-md relative overflow-hidden">
            {/* Visual Indicator of Root Topic */}
            <div 
              onClick={() => selectNode(activeGraph.rootNode)}
              className={`p-4 rounded-2xl border-2 transition-all cursor-pointer mb-6 ${
                effectiveSelectedNode.id === activeGraph.rootNode.id
                  ? 'border-[#A65438] bg-[#FFF2CE]/40 shadow-sm'
                  : 'border-[#121210]/10 bg-[#FAF9F5] hover:border-[#121210]/20'
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#121210] text-[#FAF9F5] flex items-center justify-center font-serif text-lg font-bold">
                    K
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#A65438]">
                      Noyau Ontologique
                    </span>
                    <h3 className="text-lg font-bold font-serif text-[#121210]">
                      {activeGraph.rootNode.label}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 flex-wrap justify-end">
                  <span className="px-2 py-0.5 rounded-md bg-[#121210] text-[#FAF9F5] text-[11px] font-mono font-bold">
                    {activeGraph.rootNode.itemCounts.total} items
                  </span>
                </div>
              </div>

              <p className="text-xs text-[#46443D] mt-2 leading-relaxed">
                {activeGraph.rootNode.description}
              </p>

              {/* Counts Badge Bar for Root */}
              <div className="flex items-center flex-wrap gap-2 mt-3 pt-3 border-t border-[#121210]/8">
                <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#46443D] bg-white px-2 py-0.5 rounded border border-[#121210]/6">
                  <FileText className="w-3 h-3 text-[#A65438]" /> {activeGraph.rootNode.itemCounts.articles} Articles
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#46443D] bg-white px-2 py-0.5 rounded border border-[#121210]/6">
                  <Users className="w-3 h-3 text-[#1F392E]" /> {activeGraph.rootNode.itemCounts.characters} Personnages
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#46443D] bg-white px-2 py-0.5 rounded border border-[#121210]/6">
                  <Video className="w-3 h-3 text-[#F2B844]" /> {activeGraph.rootNode.itemCounts.documentaries} Vidéos
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#46443D] bg-white px-2 py-0.5 rounded border border-[#121210]/6">
                  <Archive className="w-3 h-3 text-[#A65438]" /> {activeGraph.rootNode.itemCounts.archives} Archives
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#46443D] bg-white px-2 py-0.5 rounded border border-[#121210]/6">
                  <Mic2 className="w-3 h-3 text-stone-600" /> {activeGraph.rootNode.itemCounts.conferences} Conférences
                </span>
              </div>
            </div>

            {/* Level 1 & Level 2 Dynamic Branches */}
            <div className="space-y-4">
              <div className="text-xs font-bold uppercase tracking-widest text-[#77746A] flex items-center justify-between">
                <span>Branches Historiques & Connexions</span>
                <span>{activeGraph.rootNode.children?.length || 0} Axes Majeurs</span>
              </div>

              {activeGraph.rootNode.children?.map((branch) => {
                const isExpanded = expandedNodes[branch.id] !== false;
                const isSelected = effectiveSelectedNode.id === branch.id;

                return (
                  <div 
                    key={branch.id} 
                    className="border border-[#121210]/10 rounded-2xl overflow-hidden transition-all bg-[#FAF9F5]/70"
                  >
                    {/* Branch Header */}
                    <div 
                      onClick={() => selectNode(branch)}
                      className={`p-3.5 sm:p-4 flex items-center justify-between gap-3 cursor-pointer transition-all ${
                        isSelected 
                          ? 'bg-[#121210] text-[#FAF9F5]' 
                          : 'hover:bg-white text-[#121210]'
                      }`}
                    >
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <button
                          onClick={(e) => toggleExpand(branch.id, e)}
                          className={`p-1 rounded-lg transition-transform ${
                            isSelected ? 'hover:bg-white/20 text-white' : 'hover:bg-stone-200 text-[#77746A]'
                          }`}
                        >
                          <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-0' : '-rotate-90'}`} />
                        </button>

                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.2 rounded ${
                              isSelected ? 'bg-white/20 text-[#F2B844]' : 'bg-[#A65438]/10 text-[#A65438]'
                            }`}>
                              {branch.category}
                            </span>
                            <span className={`text-xs font-mono font-bold ${isSelected ? 'text-[#FAF9F5]' : 'text-[#77746A]'}`}>
                              ({branch.itemCounts.total} items)
                            </span>
                          </div>
                          <h4 className="text-sm sm:text-base font-bold font-serif truncate mt-0.5">
                            {branch.label}
                          </h4>
                        </div>
                      </div>

                      {/* Associated Item Count Badges */}
                      <div className="flex items-center gap-1.5 shrink-0">
                        <span 
                          title={`${branch.itemCounts.articles} Articles`}
                          className={`px-2 py-0.5 rounded text-[11px] font-mono flex items-center gap-1 ${
                            isSelected ? 'bg-white/15 text-white' : 'bg-white text-[#121210] border border-[#121210]/6'
                          }`}
                        >
                          <FileText className="w-3 h-3 text-[#A65438]" /> {branch.itemCounts.articles}
                        </span>
                        <span 
                          title={`${branch.itemCounts.characters} Personnages`}
                          className={`px-2 py-0.5 rounded text-[11px] font-mono flex items-center gap-1 ${
                            isSelected ? 'bg-white/15 text-white' : 'bg-white text-[#121210] border border-[#121210]/6'
                          }`}
                        >
                          <Users className="w-3 h-3 text-[#1F392E]" /> {branch.itemCounts.characters}
                        </span>
                        <span 
                          title={`${branch.itemCounts.archives} Archives`}
                          className={`px-2 py-0.5 rounded text-[11px] font-mono hidden sm:flex items-center gap-1 ${
                            isSelected ? 'bg-white/15 text-white' : 'bg-white text-[#121210] border border-[#121210]/6'
                          }`}
                        >
                          <Archive className="w-3 h-3 text-[#F2B844]" /> {branch.itemCounts.archives}
                        </span>
                      </div>
                    </div>

                    {/* Sub-branches & Highlighted Entities (Collapsible) */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="px-4 pb-4 pt-2 border-t border-[#121210]/6 space-y-3"
                        >
                          <p className="text-xs text-[#46443D] leading-relaxed">
                            {branch.description}
                          </p>

                          {/* Highlighted Key Figures / Events */}
                          {branch.highlightedEntities && branch.highlightedEntities.length > 0 && (
                            <div className="pt-2">
                              <span className="text-[10px] uppercase font-bold text-[#77746A] tracking-wider block mb-1.5">
                                Entités associées majeures :
                              </span>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {branch.highlightedEntities.map((entity, eIdx) => (
                                  <div
                                    key={eIdx}
                                    onClick={() => onSelectEntity && onSelectEntity(entity.type, entity.id)}
                                    className="p-2.5 rounded-xl bg-white hover:bg-[#FFF2CE]/60 border border-[#121210]/8 transition-all cursor-pointer group flex items-start justify-between gap-2"
                                  >
                                    <div>
                                      <span className="text-[9px] uppercase font-bold text-[#A65438] block">
                                        {entity.type}
                                      </span>
                                      <span className="text-xs font-bold text-[#121210] group-hover:text-[#A65438] transition-colors leading-tight block">
                                        {entity.name}
                                      </span>
                                      {entity.subtitle && (
                                        <span className="text-[10px] text-[#77746A] line-clamp-1 block mt-0.5">
                                          {entity.subtitle}
                                        </span>
                                      )}
                                    </div>
                                    <ChevronRight className="w-3.5 h-3.5 text-[#77746A] group-hover:translate-x-0.5 transition-transform shrink-0 mt-1" />
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Sub-children nodes */}
                          {branch.children && branch.children.length > 0 && (
                            <div className="pt-2 border-t border-[#121210]/6 space-y-2">
                              <span className="text-[10px] uppercase font-bold text-[#77746A] tracking-wider block">
                                Sous-branches spécialisées :
                              </span>
                              <div className="space-y-1.5">
                                {branch.children.map((subNode) => {
                                  const isSubSelected = selectedNode?.id === subNode.id;
                                  return (
                                    <div
                                      key={subNode.id}
                                      onClick={() => selectNode(subNode)}
                                      className={`p-2.5 rounded-xl border flex items-center justify-between gap-3 cursor-pointer transition-all ${
                                        isSubSelected
                                          ? 'bg-[#121210] text-[#FAF9F5] border-[#121210]'
                                          : 'bg-white hover:bg-stone-50 border-[#121210]/6 text-[#121210]'
                                      }`}
                                    >
                                      <div className="flex items-center gap-2 min-w-0">
                                        <CornerDownRight className={`w-3.5 h-3.5 shrink-0 ${isSubSelected ? 'text-[#F2B844]' : 'text-[#77746A]'}`} />
                                        <div className="min-w-0">
                                          <span className="text-xs font-bold truncate block">
                                            {subNode.label}
                                          </span>
                                          <span className={`text-[10px] line-clamp-1 ${isSubSelected ? 'text-stone-300' : 'text-[#77746A]'}`}>
                                            {subNode.description}
                                          </span>
                                        </div>
                                      </div>

                                      <div className="flex items-center gap-1 shrink-0 font-mono text-[10px]">
                                        <span className={`px-1.5 py-0.5 rounded ${isSubSelected ? 'bg-white/20' : 'bg-[#FAF9F5] border border-[#121210]/6'}`}>
                                          {subNode.itemCounts.total} items
                                        </span>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Node Inspector & Direct Access Dossier (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl border border-[#121210]/10 p-6 shadow-md sticky top-24">
              <div className="flex items-center justify-between pb-4 border-b border-[#121210]/8">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#F2B844]" />
                  <span className="text-xs font-bold uppercase tracking-widest text-[#77746A]">
                    Inspecteur de Nœud
                  </span>
                </div>
                <span className="text-xs font-mono font-bold text-[#A65438] bg-[#A65438]/10 px-2 py-0.5 rounded-md">
                  Niveau {effectiveSelectedNode.level}
                </span>
              </div>

              <div className="mt-4 space-y-4">
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#A65438] tracking-widest">
                    {effectiveSelectedNode.category}
                  </span>
                  <h3 className="text-xl font-bold font-serif text-[#121210] mt-0.5 leading-snug">
                    {effectiveSelectedNode.label}
                  </h3>
                </div>

                <p className="text-xs text-[#46443D] leading-relaxed bg-[#FAF9F5] p-3.5 rounded-2xl border border-[#121210]/6">
                  {effectiveSelectedNode.description}
                </p>

                {/* Detailed Resource Breakdown Grid */}
                <div>
                  <span className="text-[11px] font-bold text-[#121210] uppercase tracking-wider block mb-2">
                    Ressources documentées dans KAMA :
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    <div className="p-2.5 rounded-xl bg-[#FAF9F5] border border-[#121210]/6 text-center">
                      <FileText className="w-4 h-4 text-[#A65438] mx-auto mb-1" />
                      <div className="text-base font-bold font-mono text-[#121210]">{effectiveSelectedNode.itemCounts.articles}</div>
                      <div className="text-[10px] text-[#77746A]">Articles</div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-[#FAF9F5] border border-[#121210]/6 text-center">
                      <Users className="w-4 h-4 text-[#1F392E] mx-auto mb-1" />
                      <div className="text-base font-bold font-mono text-[#121210]">{effectiveSelectedNode.itemCounts.characters}</div>
                      <div className="text-[10px] text-[#77746A]">Personnages</div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-[#FAF9F5] border border-[#121210]/6 text-center">
                      <Video className="w-4 h-4 text-[#F2B844] mx-auto mb-1" />
                      <div className="text-base font-bold font-mono text-[#121210]">{effectiveSelectedNode.itemCounts.documentaries}</div>
                      <div className="text-[10px] text-[#77746A]">Vidéos</div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-[#FAF9F5] border border-[#121210]/6 text-center">
                      <Archive className="w-4 h-4 text-[#A65438] mx-auto mb-1" />
                      <div className="text-base font-bold font-mono text-[#121210]">{effectiveSelectedNode.itemCounts.archives}</div>
                      <div className="text-[10px] text-[#77746A]">Archives</div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-[#FAF9F5] border border-[#121210]/6 text-center col-span-2 sm:col-span-2">
                      <Mic2 className="w-4 h-4 text-stone-600 mx-auto mb-1" />
                      <div className="text-base font-bold font-mono text-[#121210]">{effectiveSelectedNode.itemCounts.conferences}</div>
                      <div className="text-[10px] text-[#77746A]">Conférences & Débats</div>
                    </div>
                  </div>
                </div>

                {/* Highlighted Entities from this node */}
                {effectiveSelectedNode.highlightedEntities && effectiveSelectedNode.highlightedEntities.length > 0 && (
                  <div className="pt-2">
                    <span className="text-[11px] font-bold text-[#121210] uppercase tracking-wider block mb-2">
                      Fiches & Portails associés :
                    </span>
                    <div className="space-y-2">
                      {effectiveSelectedNode.highlightedEntities.map((ent) => (
                        <div
                          key={ent.id}
                          onClick={() => onSelectEntity && onSelectEntity(ent.type, ent.id)}
                          className="p-3 rounded-2xl bg-[#FAF9F5] hover:bg-[#FFF2CE] border border-[#121210]/8 transition-all cursor-pointer flex items-center justify-between group"
                        >
                          <div>
                            <span className="text-[9px] uppercase font-bold text-[#A65438]">
                              {ent.type}
                            </span>
                            <h5 className="text-xs font-bold text-[#121210] group-hover:text-[#A65438] transition-colors">
                              {ent.name}
                            </h5>
                          </div>
                          <button className="px-2.5 py-1 rounded-xl bg-[#121210] text-[#FAF9F5] text-[10px] font-semibold flex items-center gap-1 group-hover:bg-[#A65438] transition-colors">
                            Consulter
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Primary Source Reference for Node */}
                <div className="p-3.5 rounded-2xl bg-[#1F392E]/8 border border-[#1F392E]/20 text-xs">
                  <div className="flex items-center gap-1.5 text-[#1F392E] font-bold mb-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Validation Académique KAMA</span>
                  </div>
                  <p className="text-[11px] text-[#46443D] leading-snug">
                    Cette ontologie est vérifiée selon les corpus de l’Histoire Générale de l’Afrique (UNESCO) et les archives primaires déposées.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mandatory Sources & References Section specifically for this Explore Query */}
        <div className="mt-12">
          <MandatorySourcesSection
            sources={activeGraph.sources}
            title={`Sources & Références : ${activeGraph.title}`}
            subtitle="Inventaire des archives, traités, mémoires et recherches universitaires ayant servi à établir cette cartographie de connaissances."
            contextTitle={activeGraph.title}
            onOpenSourceModal={onOpenSourceModal}
          />
        </div>
      </div>
    </section>
  );
}
