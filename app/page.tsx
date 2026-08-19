'use client';

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/HeroSection';
import { DiscoverBento } from '@/components/DiscoverBento';
import { ExplorePillars } from '@/components/ExplorePillars';
import { InteractiveTimeline } from '@/components/InteractiveTimeline';
import { FeatureStory } from '@/components/FeatureStory';
import { PeopleShowcase } from '@/components/PeopleShowcase';
import { DynamicTopicGraph } from '@/components/DynamicTopicGraph';
import { WatchSection } from '@/components/WatchSection';
import { KamaStoriesImmersive } from '@/components/KamaStoriesImmersive';
import { KamaPathsSection } from '@/components/KamaPathsSection';
import { VercelBlobArchiveUploader } from '@/components/VercelBlobArchiveUploader';
import { SourceDrawer } from '@/components/SourceDrawer';
import { SearchModal } from '@/components/SearchModal';
import { PersonDetailModal } from '@/components/PersonDetailModal';
import { CivilizationDetailModal } from '@/components/CivilizationDetailModal';
import { KamaAiArchivistDrawer } from '@/components/KamaAiArchivistDrawer';
import { Footer } from '@/components/Footer';

import { 
  HISTORICAL_PEOPLE, 
  CIVILIZATIONS, 
  HISTORICAL_EVENTS, 
  HISTORICAL_SOURCES 
} from '@/lib/kama-data';
import { 
  EntityType, 
  HistoricalSource, 
  HistoricalPerson, 
  Civilization 
} from '@/lib/types';

export default function HomePage() {
  // Modal states
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isArchivistOpen, setIsArchivistOpen] = useState(false);
  const [selectedSource, setSelectedSource] = useState<HistoricalSource | null>(null);
  const [selectedPerson, setSelectedPerson] = useState<HistoricalPerson | null>(null);
  const [selectedCivilization, setSelectedCivilization] = useState<Civilization | null>(null);
  const [savedArticles, setSavedArticles] = useState<string[]>([]);

  // Keyboard shortcut for Search (⌘K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Universal Entity Navigator
  const handleSelectEntity = (type: EntityType, id: string) => {
    if (type === 'person') {
      const person = HISTORICAL_PEOPLE.find((p) => p.id === id);
      if (person) {
        setSelectedPerson(person);
        return;
      }
    } else if (type === 'civilization') {
      const civ = CIVILIZATIONS.find((c) => c.id === id);
      if (civ) {
        setSelectedCivilization(civ);
        return;
      }
    } else if (type === 'article' || type === 'story') {
      if (id === 'frederick-mckinley-jones-refrigeration-mobile') {
        window.location.href = '/sciences-techniques/frederick-mckinley-jones-refrigeration-mobile';
        return;
      }
      if (id === 'charles-drew-banques-sang-plasma') {
        window.location.href = '/sciences-medecine/charles-drew-banques-sang-plasma';
        return;
      }
      const el = document.getElementById('grande-histoire') || document.getElementById('stories');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      return;
    } else if (type === 'event') {
      const el = document.getElementById('chronologie');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      return;
    } else if (type === 'video') {
      const el = document.getElementById('regarder');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      return;
    }
  };

  const handleOpenSource = (source: HistoricalSource) => {
    setSelectedSource(source);
  };

  const handleToggleSaveDossier = (dossierId: string) => {
    if (savedArticles.includes(dossierId)) {
      setSavedArticles(savedArticles.filter((id) => id !== dossierId));
    } else {
      setSavedArticles([...savedArticles, dossierId]);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-[#121210] selection:bg-[#F2B844] selection:text-[#121210] flex flex-col font-sans">
      
      {/* Top Fixed Sticky Navbar */}
      <Navbar
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenArchivist={() => setIsArchivistOpen(true)}
        onSelectEntity={handleSelectEntity}
      />

      {/* Main Content Area */}
      <main className="flex-1 pb-16 md:pb-0">
        {/* 1. Monumental Hero Section */}
        <HeroSection
          onExploreClick={() => {
            const el = document.getElementById('decouvrir');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          onOpenSearch={() => setIsSearchOpen(true)}
          onSelectEntity={handleSelectEntity}
        />

        {/* 2. Asymmetric Editorial Bento Grid (À Découvrir Aujourd'hui) */}
        <DiscoverBento onSelectEntity={handleSelectEntity} />

        {/* 3. The 4 Pillars of Knowledge (Civilisations, Personnes, Événements, Territoires) */}
        <ExplorePillars onSelectEntity={handleSelectEntity} />

        {/* 4. Interactive Living Timeline (-3000 to 2026) */}
        <InteractiveTimeline onSelectEntity={handleSelectEntity} />

        {/* 5. Spotlight Feature Story with Dual Reading Mode (2 min vs 12 min) */}
        <FeatureStory
          onSelectEntity={handleSelectEntity}
          onOpenSource={handleOpenSource}
          isSaved={savedArticles.includes('dossier-sankara-1983')}
          onToggleSave={() => handleToggleSaveDossier('dossier-sankara-1983')}
        />

        {/* 6. People to Know (Contemporary African Editorial Portraits) */}
        <PeopleShowcase
          onSelectPerson={(id) => handleSelectEntity('person', id)}
        />

        {/* 7. The Living Dynamic Knowledge Graph (Topic Decomposition, Branch Counts & Sources) */}
        <DynamicTopicGraph
          onSelectEntity={handleSelectEntity}
          onOpenSourceModal={handleOpenSource}
          initialQuery="slavery"
        />

        {/* 8. Media Library: Watch & Listen (Synchronized transcripts & video player) */}
        <WatchSection onSelectEntity={handleSelectEntity} />

        {/* 9. KAMA Stories: Cinematic Narrative (1791 - Haïti) */}
        <KamaStoriesImmersive onSelectEntity={handleSelectEntity} />

        {/* 10. KAMA Paths: Guided Educational Learning Tracks */}
        <KamaPathsSection onSelectEntity={handleSelectEntity} />

        {/* 11. Community Archive Upload & Vercel Blob Repository */}
        <VercelBlobArchiveUploader />
      </main>

      {/* Editorial Footer */}
      <Footer
        onSelectEntity={handleSelectEntity}
        onOpenArchivist={() => setIsArchivistOpen(true)}
      />

      {/* Floating AI Archivist Quick Trigger (Desktop only, mobile has dock) */}
      <button
        onClick={() => setIsArchivistOpen(true)}
        className="hidden md:flex fixed bottom-6 right-6 z-40 px-5 py-3 rounded-full bg-[#121210] hover:bg-[#2B2925] text-white shadow-xl hover:shadow-2xl border border-stone-700 items-center gap-2.5 transition-all group scale-100 hover:scale-105"
        aria-label="Ouvrir l'Archiviste KAMA"
      >
        <span className="w-2.5 h-2.5 rounded-full bg-[#F2B844] animate-pulse" />
        <span className="text-xs font-bold tracking-wide">Archiviste KAMA</span>
      </button>

      {/* Global Modals and Drawers */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectEntity={handleSelectEntity}
      />

      <KamaAiArchivistDrawer
        isOpen={isArchivistOpen}
        onClose={() => setIsArchivistOpen(false)}
        onSelectEntity={handleSelectEntity}
      />

      <SourceDrawer
        source={selectedSource}
        onClose={() => setSelectedSource(null)}
      />

      <PersonDetailModal
        person={selectedPerson}
        onClose={() => setSelectedPerson(null)}
        onSelectEntity={handleSelectEntity}
        onOpenSource={handleOpenSource}
      />

      <CivilizationDetailModal
        civilization={selectedCivilization}
        onClose={() => setSelectedCivilization(null)}
        onSelectEntity={handleSelectEntity}
        onOpenSource={handleOpenSource}
      />

    </div>
  );
}
