'use client';

import React from 'react';
import { KamaSun } from './KamaSun';
import { ShieldCheck, ArrowUp } from 'lucide-react';
import { EntityType } from '@/lib/types';
import { useLanguage } from '@/lib/LanguageContext';

interface FooterProps {
  onSelectEntity: (type: EntityType, id: string) => void;
  onOpenArchivist: () => void;
}

export function Footer({ onSelectEntity, onOpenArchivist }: FooterProps) {
  const { t } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#121210] text-[#FAF9F5] pt-16 pb-12 px-4 sm:px-6 md:px-8 border-t border-stone-800">
      <div className="max-w-7xl mx-auto">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-stone-800">
          
          {/* Col 1: Brand & Manifesto (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <KamaSun size={32} animate={false} color="#F2B844" />
              <div>
                <span className="text-2xl font-bold tracking-tight font-sans text-white">
                  KAMA
                </span>
                <span className="block text-[10px] uppercase font-bold tracking-widest text-[#F2B844]">
                  The Living Archive
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed max-w-md font-light">
              {t('footer.manifesto', 'KAMA est la bibliothèque vivante de l’histoire noire et des cultures diasporiques. Un carrefour où les millénaires de savoirs, de révolutions et de créations se rencontrent dans un graphe de connaissances rigoureusement sourcé.')}
            </p>

            <div className="pt-2 flex items-center gap-3 text-xs text-stone-400">
              <ShieldCheck className="w-4 h-4 text-[#F2B844]" />
              <span>{t('footer.unescoValidation', 'Corpus validé selon les critères méthodologiques de l’UNESCO')}</span>
            </div>
          </div>

          {/* Col 2: Navigation Repères (2 cols) */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#F2B844]">
              {t('nav.explore', 'Explorer')}
            </h4>
            <ul className="space-y-2 text-xs text-stone-300">
              <li><a href="#decouvrir" className="hover:text-white transition-colors">{t('nav.discover', 'À découvrir')}</a></li>
              <li><a href="#explorer" className="hover:text-white transition-colors">{t('nav.explore', 'Piliers thématiques')}</a></li>
              <li><a href="#chronologie" className="hover:text-white transition-colors">{t('nav.timeline', 'Chronologie')}</a></li>
              <li><a href="#graphe" className="hover:text-white transition-colors">{t('nav.graphLink', 'Knowledge Graph')}</a></li>
              <li><a href="#regarder" className="hover:text-white transition-colors">{t('nav.watch', 'Médiathèque')}</a></li>
              <li><a href="#parcours" className="hover:text-white transition-colors">{t('nav.paths', 'KAMA Paths')}</a></li>
            </ul>
          </div>

          {/* Col 3: Grandes Figures (2 cols) */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#F2B844]">
              {t('nav.people', 'Figures Majeures')}
            </h4>
            <ul className="space-y-2 text-xs text-stone-300">
              <li>
                <button onClick={() => onSelectEntity('person', 'thomas-sankara')} className="hover:text-white transition-colors text-left">
                  Thomas Sankara
                </button>
              </li>
              <li>
                <button onClick={() => onSelectEntity('person', 'mansa-musa')} className="hover:text-white transition-colors text-left">
                  Mansa Moussa
                </button>
              </li>
              <li>
                <button onClick={() => onSelectEntity('person', 'queen-nzinga')} className="hover:text-white transition-colors text-left">
                  Reine Nzinga Mbande
                </button>
              </li>
              <li>
                <button onClick={() => onSelectEntity('person', 'cheikh-anta-diop')} className="hover:text-white transition-colors text-left">
                  Cheikh Anta Diop
                </button>
              </li>
              <li>
                <button onClick={() => onSelectEntity('person', 'patrice-lumumba')} className="hover:text-white transition-colors text-left">
                  Patrice Lumumba
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Newsletter & Participation (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#F2B844]">
              {t('footer.newsletterTitle', 'La Lettre des Archives')}
            </h4>
            <p className="text-xs text-stone-400">
              {t('footer.newsletterDesc', 'Recevez chaque dimanche un document d’archive rare et son analyse critique.')}
            </p>
            <div className="flex items-center gap-2">
              <input
                type="email"
                placeholder={t('footer.emailPlaceholder', 'Votre adresse email')}
                className="w-full px-3.5 py-2 rounded-xl bg-stone-900 border border-stone-700 text-xs text-white placeholder-stone-500 focus:outline-none focus:ring-1 focus:ring-[#F2B844]"
              />
              <button className="px-3.5 py-2 rounded-xl bg-[#F2B844] text-[#121210] font-bold text-xs hover:bg-[#F8D889] transition-colors flex-shrink-0">
                {t('footer.subscribe', 'S’inscrire')}
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <div className="flex items-center gap-4">
            <span>© {new Date().getFullYear()} KAMA Living Archive. {t('footer.allRightsReserved', 'Tous droits réservés.')}</span>
            <span>•</span>
            <span className="text-stone-400">{t('footer.tagline', 'Pour la transmission ininterrompue des mémoires.')}</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onOpenArchivist}
              className="text-stone-300 hover:text-[#F2B844] transition-colors"
            >
              {t('nav.launchArchivist', 'Consulter l’Archiviste IA')}
            </button>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-full bg-stone-900 hover:bg-stone-800 text-stone-300 transition-colors"
              aria-label="Retour en haut"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
