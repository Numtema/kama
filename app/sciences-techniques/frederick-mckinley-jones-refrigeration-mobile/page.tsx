'use client';

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { SearchModal } from '@/components/SearchModal';
import { KamaAiArchivistDrawer } from '@/components/KamaAiArchivistDrawer';
import { SourceDrawer } from '@/components/SourceDrawer';
import { PersonDetailModal } from '@/components/PersonDetailModal';
import { CivilizationDetailModal } from '@/components/CivilizationDetailModal';
import { VercelBlobArchiveUploader } from '@/components/VercelBlobArchiveUploader';

import { 
  EntityType, 
  HistoricalSource, 
  HistoricalPerson, 
  Civilization 
} from '@/lib/types';
import { 
  HISTORICAL_PEOPLE, 
  CIVILIZATIONS 
} from '@/lib/kama-data';

export default function ArticlePage() {
  // Modal states
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isArchivistOpen, setIsArchivistOpen] = useState(false);
  const [selectedSource, setSelectedSource] = useState<HistoricalSource | null>(null);
  const [selectedPerson, setSelectedPerson] = useState<HistoricalPerson | null>(null);
  const [selectedCivilization, setSelectedCivilization] = useState<Civilization | null>(null);

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

  const handleSelectEntity = (type: EntityType, id: string) => {
    if (type === 'person') {
      const person = HISTORICAL_PEOPLE.find((p) => p.id === id);
      if (person) {
        setSelectedPerson(person);
      }
    } else if (type === 'civilization') {
      const civ = CIVILIZATIONS.find((c) => c.id === id);
      if (civ) {
        setSelectedCivilization(civ);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-[#121210] selection:bg-[#F2B844] selection:text-[#121210] flex flex-col font-sans">
      
      {/* Custom styles specific to the article, scoped to this page */}
      <style jsx global>{`
        :root {
          --bg-art: #FAF9F5;
          --paper-art: #FFFFFF;
          --paper2-art: rgba(255, 242, 206, 0.4);
          --ink-art: #121210;
          --muted-art: #77746A;
          --line-art: rgba(18, 18, 16, 0.1);
          --gold-art: #A65438;
          --gold2-art: #743825;
          --green-art: #1F392E;
          --red-art: #A65438;
          --amber-art: #F2B844;
          --blue-art: #284e7a;
        }
        
        .article-content {
          background-color: var(--bg-art);
          color: var(--ink-art);
          line-height: 1.72;
        }

        .article-content a {
          color: var(--gold2-art);
          text-underline-offset: 3px;
          text-decoration: underline;
        }

        .article-content a:hover {
          text-decoration-thickness: 2px;
        }

        .article-layout {
          max-width: 1120px;
          margin: auto;
          padding: 22px;
          display: grid;
          grid-template-columns: minmax(0, 880px) 1fr;
          gap: 38px;
        }

        .article-toc {
          position: sticky;
          top: 100px;
          align-self: start;
          border-left: 1px solid var(--line-art);
          padding-left: 16px;
          font-size: 0.84rem;
        }

        .article-toc strong {
          color: var(--gold-art);
        }

        .article-toc a {
          display: block;
          color: #77746A;
          text-decoration: none;
          margin: 8px 0;
        }

        .article-toc a:hover {
          color: #121210;
          text-decoration: underline;
        }

        .article-h2 {
          font-family: Georgia, "Times New Roman", serif;
          font-size: 2rem;
          line-height: 1.15;
          margin: 3.1rem 0 1rem;
          color: var(--gold-art);
          scroll-margin-top: 110px;
        }

        .article-h3 {
          font-size: 1.18rem;
          margin: 2rem 0 .6rem;
          color: #121210;
          scroll-margin-top: 110px;
        }

        .article-p {
          margin: 0 0 1.2rem;
        }

        .article-lede {
          font-size: 1.18rem;
          line-height: 1.7;
          color: #46443D;
        }

        .article-sourcebox, .article-factbox, .article-science, .article-uncertain {
          background: rgba(255, 255, 255, 0.45);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border: 1px solid rgba(18, 18, 16, 0.08);
          box-shadow: 0 4px 24px rgba(18, 18, 16, 0.02);
          border-radius: 16px;
          padding: 20px;
          margin: 24px 0;
        }

        .article-sourcebox {
          border-left: 4px solid var(--blue-art);
        }

        .article-factbox {
          border-left: 4px solid var(--green-art);
        }

        .article-uncertain {
          border-left: 4px solid var(--amber-art);
        }

        .article-science {
          border-left: 4px solid var(--gold-art);
        }

        .article-label {
          font-size: .73rem;
          letter-spacing: .1em;
          text-transform: uppercase;
          font-weight: 900;
          color: var(--muted-art);
          margin-bottom: 6px;
        }

        .article-status {
          display: inline-block;
          padding: 4px 8px;
          border-radius: 999px;
          font-size: .72rem;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: .06em;
        }

        .article-established {
          background: #123f32;
          color: #9af0ce;
        }

        .article-open {
          background: #4e3e0f;
          color: #ffe191;
        }

        .article-refuted {
          background: #531827;
          color: #ff9fb0;
        }

        .article-layout figure {
          margin: 28px 0;
        }

        .article-layout figure .frame {
          background: #ece9df;
          border-radius: 10px;
          overflow: hidden;
          border: 1px solid var(--line-art);
        }

        .article-layout figure img {
          display: block;
          width: 100%;
          height: auto;
        }

        .article-compare {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
        }

        .article-compare figure {
          margin: 0;
        }

        .article-pull {
          font-family: Georgia, "Times New Roman", serif;
          font-size: 1.45rem;
          line-height: 1.5;
          border-left: 3px solid var(--gold-art);
          padding: 2px 0 2px 18px;
          color: var(--gold2-art);
          margin: 30px 0;
        }

        .article-timeline {
          border-left: 2px solid var(--line-art);
          padding-left: 20px;
          margin: 24px 0;
        }

        .article-timeline div {
          margin: 0 0 14px;
        }

        .article-timeline b {
          color: var(--gold-art);
        }

        .article-sources {
          font-size: 0.92rem;
          padding-left: 0px;
        }

        .article-sources li {
          margin: .75rem 0;
        }

        .article-sources .kind {
          color: var(--gold-art);
          font-weight: 850;
        }

        .article-method {
          background: var(--paper2-art);
          border: 1px solid rgba(242, 184, 68, 0.3);
          border-radius: 14px;
          padding: 22px;
          margin-top: 30px;
        }

        .article-method strong {
          color: var(--gold-art);
        }

        .article-endnote {
          margin-top: 42px;
          padding-top: 26px;
          border-top: 1px solid var(--line-art);
          color: var(--muted-art);
        }

        @media(max-width: 980px) {
          .article-layout {
            grid-template-columns: 1fr;
          }
          .article-toc {
            position: relative;
            top: auto;
            border-left: 0;
            border-top: 1px solid var(--line-art);
            padding: 16px 0;
            order: -1;
          }
          .article-toc a {
            display: inline-block;
            margin: 6px 14px 6px 0;
          }
        }

        @media(max-width: 680px) {
          .article-compare {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      {/* Top Fixed Sticky Navbar */}
      <Navbar
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenArchivist={() => setIsArchivistOpen(true)}
        onSelectEntity={handleSelectEntity}
      />

      {/* Main Content Area */}
      <main className="flex-1 pt-24 article-content">
        
        {/* Hero Section */}
        <section className="max-w-[1120px] mx-auto px-[22px] py-[54px]">
          <div className="text-[#A65438] tracking-[0.12em] uppercase font-[850] text-[0.77rem]">
            Dossier historique · Sciences et techniques
          </div>
          <h1 className="font-serif text-[clamp(2.5rem,7vw,5rem)] leading-[0.98] my-[0.45rem] max-w-[1000px] tracking-[-0.035em]">
            Frederick McKinley Jones et la naissance de la réfrigération mobile moderne
          </h1>
          <p className="text-[1.18rem] max-w-[850px] text-[#46443D] mt-4">
            Comment un mécanicien et inventeur américain contribua à rendre le froid mobile, automatisé et adapté au transport routier — et ce que les brevets permettent réellement de lui attribuer.
          </p>
          <div className="flex flex-wrap gap-2 mt-4">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#A65438]/10 text-[#A65438] border border-[#A65438]/20">
              Savoirs & Sciences
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#F2B844]/15 text-[#743825] border border-[#F2B844]/30">
              Inventions
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#1F392E]/10 text-[#1F392E] border border-[#1F392E]/20">
              XXe Siècle
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#FAF9F5] text-[#77746A] border border-[#121210]/10">
              Dossier Complet • 12 min
            </span>
          </div>
          <div className="flex flex-wrap gap-[10px_18px] mt-5 text-[#77746A] text-[0.9rem]">
            <span>Par <strong>KAMA</strong></span>
            <time dateTime="2026-08-19">Mis à jour le 19 août 2026</time>
            <span>Lecture longue · sources primaires et archives</span>
          </div>
        </section>

        {/* Hero Image */}
        <div className="max-w-[1120px] mx-auto px-[22px]">
          <figure className="m-0">
            <div className="aspect-[16/9] overflow-hidden bg-stone-300 rounded-[14px] border border-[#30343c]">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/2/25/Fred_McKinley_Jones_USDA.jpg"
                alt="Frederick McKinley Jones assis à une table de travail technique."
                className="w-full h-full object-cover object-[center_35%] block"
              />
            </div>
            <figcaption className="text-[#77746A] text-[0.82rem] mt-2 leading-[1.45]">
              Frederick McKinley Jones à une table de travail. Source : USDAgov / Wikimedia Commons.
            </figcaption>
          </figure>
        </div>

        {/* Article Layout */}
        <div className="article-layout">
          
          <article className="min-w-0">
            <p className="article-lede">
              Transporter des aliments sur plusieurs centaines ou milliers de kilomètres sans qu’ils se détériorent constitue aujourd’hui une opération si ordinaire que la technologie nécessaire devient presque invisible. Fruits, légumes, viande, produits laitiers, médicaments et autres marchandises sensibles circulent dans des véhicules capables de maintenir leur cargaison dans une plage de température déterminée.
            </p>

            <p className="article-p">
              Cette infrastructure appartient à ce que l’on appelle aujourd’hui la <strong>chaîne du froid</strong>. Frederick McKinley Jones occupe une place importante dans cette histoire. Mais son rôle est souvent résumé par une formule trop simple : « l’homme qui inventa le camion frigorifique » ou « l’inventeur du réfrigérateur mobile ».
            </p>

            <p className="article-p">
              Les documents disponibles racontent une histoire plus précise — et plus intéressante. Jones n’inventa ni la réfrigération, ni le principe du cycle frigorifique, ni les premiers wagons réfrigérés. Son apport majeur se situe dans le développement et le perfectionnement de systèmes mécaniques de réfrigération <strong>compacts, autonomes, automatisés et adaptés aux contraintes du transport routier</strong>.
            </p>

            <div className="article-factbox">
              <div className="article-label">Conclusion de départ</div>
              <span className="article-status article-established">Établi</span>
              <p className="mt-2.5">L’importance de Jones ne repose pas sur l’invention du principe du froid, mais sur l’ingénierie de systèmes mobiles, régulés et utilisables en transport.</p>
            </div>

            <h2 id="avant" className="article-h2">Un problème beaucoup plus ancien que Jones</h2>
            <p className="article-p">
              Bien avant le XXe siècle, différentes techniques servaient à ralentir la détérioration des aliments : séchage, salaison, fumage, stockage au frais, neige ou glace. Au XIXe siècle, l’industrialisation des transports accrut les besoins de conservation à distance. Des wagons frigorifiques et des systèmes mécaniques de réfrigération existaient déjà avant les travaux de Jones.
            </p>

            <p className="article-p">
              À la fin des années 1930, le problème n’est donc pas « comment inventer le froid ? », mais plutôt : <strong>comment maintenir de façon fiable une température contrôlée dans un véhicule routier soumis aux vibrations, aux variations climatiques, aux longs trajets et aux contraintes d’espace ?</strong>
            </p>

            <h2 id="parcours" className="article-h2">De Cincinnati au Minnesota</h2>
            <p className="article-p">
              Frederick McKinley Jones naît à Cincinnati, dans l’Ohio, le <strong>17 mai 1893</strong>. Son parcours scolaire est relativement court et une grande partie de ses compétences techniques est acquise par la pratique et l’apprentissage autodidacte.
            </p>

            <p className="article-p">
              Pendant la Première Guerre mondiale, il sert dans l’armée américaine et utilise ses compétences mécaniques et électriques. Des biographies institutionnelles documentent notamment son travail de réparation d’équipements, y compris d’appareils à rayons X. En revanche, l’affirmation selon laquelle il aurait inventé une « machine portable à rayons X » reste à ce stade insuffisamment vérifiée pour être présentée comme un fait.
            </p>

            <p className="article-p">
              Après la guerre, Jones travaille à Hallock, dans le Minnesota, et développe des compétences dans la mécanique automobile, la radio, l’électricité et les technologies liées au cinéma. Son travail technique attire l’attention de l’entrepreneur <strong>Joseph A. Numero</strong>.
            </p>

            <h2 id="numero" className="article-h2">Numero, Werner et le problème du transport frigorifique</h2>
            <p className="article-p">
              À la fin des années 1930, un problème de transport de denrées périssables est associé dans plusieurs récits historiques à <strong>Harry Werner</strong>, entrepreneur du transport routier. Des versions ultérieures racontent un chargement perdu, parfois décrit comme des poulets, ainsi qu’une conversation survenue après une partie de golf.
            </p>

            <div className="article-uncertain">
              <div className="article-label">Prudence documentaire</div>
              <span className="article-status article-open">Récit à confirmer</span>
              <p className="mt-2.5">La relation industrielle Jones–Werner est documentée. Les détails populaires — poulets, glace fondue, pari de six dollars — ne sont pas encore verrouillés par une source contemporaine de 1938.</p>
            </div>

            <h2 id="brevet1939" className="article-h2">16 novembre 1939 : le document qui permet de voir l’invention</h2>
            <p className="article-p">
              Le <strong>16 novembre 1939</strong>, Joseph A. Numero et Frederick M. Jones déposent une demande de brevet aux États-Unis. Elle porte le titre <em>Air Conditioner for Vehicles</em>. Le brevet reçoit le numéro <strong>US 2,303,857</strong> et est délivré le <strong>1er décembre 1942</strong>.
            </p>

            <p className="article-p">
              Le terme <em>air conditioner</em> ne doit pas être lu uniquement au sens moderne de « climatisation ». Le document décrit un système destiné aux compartiments de camions, wagons et autres véhicules transportant notamment légumes, fruits, œufs et volailles préparées. Son objectif est d’agir sur la <strong>température, la circulation et l’humidité de l’air</strong>.
            </p>

            <div className="article-sourcebox">
              <div className="article-label">Source primaire</div>
              <strong>US 2,303,857 — Numero & Jones</strong>
              <p className="mt-2">Le texte du brevet décrit notamment un moteur, un compresseur, un condenseur, un évaporateur, des ventilateurs, un thermostat, un humidostat, des dispositifs de sécurité et un dégivrage automatique.</p>
              <a href="https://patents.google.com/patent/US2303857A/en" target="_blank" rel="noopener noreferrer">Consulter le brevet complet</a>
            </div>

            <figure className="doc">
              <div className="frame">
                <img src="https://patentimages.storage.googleapis.com/1d/b0/90/6928e887639ff3/US2303857-drawings-page-1.png"
                     alt="Dessin du brevet US 2,303,857 montrant une unité frigorifique installée sous le plancher d’un véhicule." />
              </div>
              <figcaption className="text-[#b6b3aa] text-[0.82rem] mt-2 leading-[1.45]">Brevet US 2,303,857 : l’unité est représentée sous le plancher du véhicule et communique avec le compartiment par des conduits d’air. Source : United States Patent Office.</figcaption>
            </figure>

            <h2 id="fonctionnement" className="article-h2">Comment la machine produisait-elle du froid ?</h2>
            <div className="article-science">
              <div className="article-label">Science</div>
              <p className="m-0"><strong>Le système ne « crée » pas du froid : il déplace de la chaleur.</strong> La chaleur est absorbée dans le compartiment puis rejetée vers l’extérieur.</p>
            </div>

            <h3 className="article-h3">1. Compression</h3>
            <p className="article-p">Le moteur entraîne un <strong>compresseur</strong>. Celui-ci reçoit le fluide frigorigène provenant de l’évaporateur et le comprime, ce qui augmente sa pression et sa température.</p>

            <h3 className="article-h3">2. Condensation</h3>
            <p className="article-p">Le fluide chaud passe dans le <strong>condenseur</strong>. Un courant d’air extérieur aide à évacuer la chaleur. Le fluide cède donc de l’énergie thermique à l’environnement.</p>

            <h3 className="article-h3">3. Détente</h3>
            <p className="article-p">Le fluide passe ensuite par une restriction qui provoque une chute de pression et prépare son évaporation à basse température.</p>

            <h3 className="article-h3">4. Évaporation</h3>
            <p className="article-p">Dans l’<strong>évaporateur</strong>, le fluide absorbe la chaleur de l’air. Un ventilateur fait circuler l’air du compartiment à travers cet échangeur puis le renvoie refroidi vers les marchandises.</p>

            <div className="article-pull">Compresseur → condenseur → détente → évaporateur → compresseur.</div>

            <h2 id="automatisation" className="article-h2">Une machine qui se régule elle-même</h2>
            <p className="article-p">Le brevet prévoit un thermostat placé dans le compartiment. Lorsque la température recherchée est atteinte, le fonctionnement du moteur et du compresseur peut être interrompu ; lorsque la température remonte, le système peut repartir.</p>

            <p className="article-p">Le document prévoit aussi plusieurs sécurités : arrêt en cas de surchauffe du moteur ou de pressions anormales dans le circuit frigorifique.</p>

            <figure className="doc">
              <div className="frame">
                <img src="https://patentimages.storage.googleapis.com/a8/d2/7e/8bb99fe3eaf989/US2303857-drawings-page-8.png"
                     alt="Schéma électrique du brevet US 2,303,857 montrant les dispositifs de contrôle automatique." />
              </div>
              <figcaption className="text-[#b6b3aa] text-[0.82rem] mt-2 leading-[1.45]">Schéma de commande du brevet : thermostat, protections et logique de fonctionnement automatique. Source : United States Patent Office.</figcaption>
            </figure>

            <h2 id="givre" className="article-h2">Le problème invisible : le givre</h2>
            <p className="article-p">Un évaporateur froid placé dans un courant d’air humide finit par accumuler de la glace. Cette couche peut réduire le passage de l’air et dégrader les performances frigorifiques.</p>

            <p className="article-p">Numero et Jones prévoient un mécanisme qui détecte indirectement cette obstruction par une modification de la pression de l’air. Le système inverse alors la circulation du fluide afin d’envoyer du fluide chaud vers l’évaporateur et de provoquer son dégivrage. Lorsque le passage d’air redevient suffisant, la machine retourne au mode frigorifique.</p>

            <div className="article-pull">Refroidissement → accumulation de givre → détection → dégivrage → retour au refroidissement.</div>

            <h2 id="humidite" className="article-h2">Préserver les aliments signifie aussi préserver leur humidité</h2>
            <p className="article-p">Le brevet ne cherche pas uniquement à maintenir une température basse. Il prévoit aussi la récupération de l’eau issue du dégivrage et un dispositif permettant de restituer de l’humidité à l’air. Un <strong>humidostat</strong> contrôle ce processus.</p>

            <p className="article-p">L’objectif est d’éviter qu’un air trop sec retire inutilement de l’eau aux produits transportés. Cette fonction montre que le problème d’ingénierie porte sur l’<strong>environnement de conservation</strong>, et pas uniquement sur une valeur de température.</p>

            <h2 id="evolution" className="article-h2">De l’unité sous le camion à l’unité frontale</h2>
            <p className="article-p">Le <strong>10 avril 1941</strong>, Jones dépose un brevet de dessin industriel pour une nouvelle unité. Puis, le <strong>30 juillet 1941</strong>, il dépose le brevet <strong>US 2,336,735</strong>, <em>Removable Cooling Unit for Compartments</em>.</p>

            <p className="article-p">La nouvelle architecture devient plus compacte et se place en hauteur, dans ou contre la paroi avant du compartiment. Cette configuration annonce l’aspect familier des groupes frigorifiques visibles à l’avant des semi-remorques modernes.</p>

            <div className="article-compare">
              <figure>
                <div className="frame">
                  <img src="https://patentimages.storage.googleapis.com/1d/b0/90/6928e887639ff3/US2303857-drawings-page-1.png"
                       alt="Architecture de 1939 avec unité frigorifique sous le véhicule." />
                </div>
                <figcaption className="text-[#b6b3aa] text-[0.82rem] mt-2 leading-[1.45]"><strong>1939 :</strong> unité sous le véhicule — US 2,303,857.</figcaption>
              </figure>
              <figure>
                <div className="frame">
                  <img src="https://patentimages.storage.googleapis.com/e3/85/b9/60003a9a34793f/US2336735-drawings-page-1.png"
                       alt="Architecture de 1941 avec unité de refroidissement compacte placée à l’avant du compartiment." />
                </div>
                <figcaption className="text-[#b6b3aa] text-[0.82rem] mt-2 leading-[1.45]"><strong>1941 :</strong> unité compacte frontale — US 2,336,735.</figcaption>
              </figure>
            </div>

            <h2 id="modelc" className="article-h2">Le Model C : une date qui reste à résoudre</h2>
            <p className="article-p">Cette nouvelle architecture est généralement associée au <strong>Thermo King Model C</strong>. Mais les sources sérieuses divergent sur la date exacte.</p>

            <p className="article-p">La Minnesota Historical Society situe son dévoilement en <strong>1941</strong>. L’American Society of Mechanical Engineers associe au contraire un exemplaire historique, numéro de série 198, à un achat effectué en <strong>1940</strong> par L. B. Hartz Wholesaler.</p>

            <div className="article-uncertain">
              <div className="article-label">État de l’enquête</div>
              <span className="article-status article-open">Incertain : 1940 / 1941</span>
              <p className="mt-2.5">KAMA ne tranche pas tant qu’une facture, un registre de production, une publicité datée ou une autre pièce contemporaine ne permet pas de résoudre la contradiction.</p>
            </div>

            <h2 id="guerre" className="article-h2">Thermo King et la Seconde Guerre mondiale</h2>
            <p className="article-p">La documentation militaire permet ici de dépasser le récit biographique. En 1943, l’armée américaine dispose d’un manuel technique consacré à un <strong>semi-remorque frigorifique U.S. Thermo Control Company, modèle Q.M.C.-1043</strong>, référencé sous <strong>TM 10-1417</strong>.</p>

            <div className="article-factbox">
              <div className="article-label">État du fait</div>
              <span className="article-status article-established">Établi</span>
              <p className="mt-2.5">Du matériel frigorifique U.S. Thermo Control / Thermo King était intégré à la documentation et à la logistique de l’armée américaine pendant la Seconde Guerre mondiale.</p>
            </div>

            <p className="article-p">Des sources institutionnelles ultérieures associent également ces équipements au transport de médicaments et de plasma sanguin. La nécessité de réfrigération dans la logistique médicale militaire est, elle, bien documentée. En revanche, notre enquête n’a pas encore retrouvé le document militaire contemporain reliant explicitement un modèle précis de Thermo King à un chargement de plasma.</p>

            <h2 id="chaine" className="article-h2">Une technologie aux conséquences beaucoup plus larges</h2>
            <p className="article-p">Après la guerre, le transport frigorifique routier prend une importance croissante. Maintenir une température contrôlée sur de longues distances étend les possibilités de circulation de produits périssables entre zones de production, entrepôts, centres de distribution et marchés.</p>

            <p className="article-p">Mais il serait incorrect d’attribuer à Jones seul la création du commerce international des produits frais, du marché des aliments surgelés, de la restauration rapide ou de la chaîne du froid mondiale. Ces transformations résultent d’un système beaucoup plus vaste : agriculture, chemins de fer, routes, entrepôts frigorifiques, production d’énergie, emballage, réglementation sanitaire, logistique et distribution.</p>

            <p className="article-p">La place de Jones est celle d’un acteur majeur d’une <strong>transformation collective de la logistique du froid</strong>.</p>

            <h2 id="contexte" className="article-h2">Un inventeur noir dans les États-Unis du XXe siècle</h2>
            <p className="article-p">Frederick McKinley Jones était un homme noir travaillant dans les États-Unis de la ségrégation. Ce contexte historique doit être présent, mais il ne doit pas être transformé automatiquement en épisodes biographiques non documentés.</p>

            <p className="article-p">Le Minnesota du premier XXe siècle connaissait des discriminations dans le logement et dans différents domaines de la vie sociale. Cela constitue le cadre historique dans lequel Jones évolue. Lorsqu’une discrimination précise lui est personnellement attribuée, elle doit cependant être sourcée.</p>

            <p className="article-p">Les témoignages de Jones lui-même doivent également être conservés lorsqu’ils nuancent ce cadre général. L’histoire d’un individu ne se déduit pas mécaniquement de l’histoire générale de la société dans laquelle il vit.</p>

            <h2 id="brevets" className="article-h2">Un inventeur, mais aussi un ingénieur de perfectionnement</h2>
            <p className="article-p">Jones ne dépose pas un unique brevet puis quitte le domaine. Pendant plusieurs décennies, il travaille sur des commandes automatiques, systèmes thermostatiques, compresseurs, dispositifs de dégivrage, moteurs et techniques de contrôle de température.</p>

            <p className="article-p">Les institutions qui lui sont consacrées lui attribuent <strong>plus de soixante brevets</strong>. Ce chiffre global est solidement attesté institutionnellement ; une liste exhaustive et vérifiée brevet par brevet constituerait néanmoins une enquête distincte.</p>

            <h2 id="pas-invente" className="article-h2">Ce que Frederick McKinley Jones n’a pas inventé</h2>
            <ul className="list-disc pl-6 mb-4">
              <li>Il n’a pas inventé la réfrigération.</li>
              <li>Il n’a pas inventé le cycle frigorifique à compression.</li>
              <li>Il n’a pas inventé le wagon frigorifique.</li>
              <li>Il n’a pas inventé le premier transport sous froid de l’histoire.</li>
            </ul>

            <p className="article-p">Cette liste ne réduit pas son importance. Elle permet au contraire de préciser son apport : <strong>transformer des principes frigorifiques existants en solutions de transport plus autonomes, contrôlées, compactes et industriellement utilisables.</strong></p>

            <h2 id="heritage" className="article-h2">Reconnaissance et héritage</h2>
            <p className="article-p">Frederick McKinley Jones meurt le <strong>21 février 1961</strong>. En <strong>1991</strong>, Frederick M. Jones et Joseph A. Numero reçoivent à titre posthume la <strong>National Medal of Technology</strong> pour leur contribution au développement des technologies de réfrigération appliquées aux moyens de transport. Jones devient le premier Afro-Américain à recevoir cette distinction.</p>

            <p className="article-p">Il est ensuite admis au National Inventors Hall of Fame.</p>

            <h2 id="ouvert" className="article-h2">Ce qui demeure à établir</h2>
            <div className="article-timeline">
              <div><b>Model C</b> — première commercialisation en 1940 ou 1941 ? Une pièce commerciale contemporaine reste nécessaire.</div>
              <div><b>Plasma</b> — plusieurs sources institutionnelles l’affirment ; une preuve militaire primaire reliant explicitement Thermo King au plasma reste recherchée.</div>
              <div><b>« Born Handy »</b> — l’article de Steven M. Spencer du 7 mai 1949 est identifié ; ses pages doivent encore être examinées intégralement.</div>
              <div><b>Les « fameux poulets »</b> — le récit d’origine doit encore être remonté à sa source contemporaine la plus ancienne.</div>
            </div>

            <h2 id="conclusion" className="article-h2">Pourquoi Jones compte</h2>
            <p className="article-p">Le brevet de 1939 permet finalement de répondre à la question essentielle. Frederick Jones n’a pas découvert un nouveau principe physique. Avec Joseph Numero puis au fil de ses propres perfectionnements, il a travaillé sur un problème d’ingénierie : <strong>comment faire fonctionner la réfrigération de manière suffisamment autonome, contrôlée et fiable sur un véhicule en mouvement ?</strong></p>

            <p className="article-p">Leur système réunit dans une même architecture production du froid, circulation forcée de l’air, thermostat, contrôle de l’humidité, dégivrage automatique, protections mécaniques et possibilité d’entretien et de démontage.</p>

            <div className="article-pull">Le froid devait devenir mobile. Puis il devait devenir fiable.</div>

            <p className="article-p">C’est à cette transformation que Frederick McKinley Jones contribua. Et c’est précisément ce que les documents permettent aujourd’hui de voir.</p>

            <h2 id="sources" className="article-h2">Sources principales</h2>
            <ul className="article-sources list-none">
              <li><span className="kind">Source primaire.</span> Joseph A. Numero & Frederick M. Jones, <a href="https://patents.google.com/patent/US2303857A/en" target="_blank" rel="noopener noreferrer"><em>Air Conditioner for Vehicles</em>, US 2,303,857</a>, dépôt 16 novembre 1939, délivrance 1er décembre 1942.</li>
              <li><span className="kind">Source primaire.</span> Frederick M. Jones, <a href="https://patents.google.com/patent/USD132182S/" target="_blank" rel="noopener noreferrer"><em>Design for an Air Conditioning Unit</em>, USD132182S</a>, dépôt 10 avril 1941.</li>
              <li><span className="kind">Source primaire.</span> Frederick M. Jones, <a href="https://patents.google.com/patent/US2336735A/en" target="_blank" rel="noopener noreferrer"><em>Removable Cooling Unit for Compartments</em>, US 2,336,735</a>, dépôt 30 juillet 1941.</li>
              <li><span className="kind">Archive.</span> <a href="https://www.mnhs.org/mnopedia/search/index/thing/thermo-king-model-c" target="_blank" rel="noopener noreferrer">Minnesota Historical Society — Thermo King Model C / Frederick Jones Papers</a>.</li>
              <li><span className="kind">Histoire de l’ingénierie.</span> <a href="https://www.asme.org/about-asme/engineering-history/landmarks/192-thermo-king-c-refrigeration-unit" target="_blank" rel="noopener noreferrer">ASME — Thermo King C Refrigeration Unit</a>.</li>
              <li><span className="kind">Source gouvernementale.</span> <a href="https://guides.loc.gov/us-army-technical-manuals/series-10-quartermaster" target="_blank" rel="noopener noreferrer">Library of Congress — U.S. Army Technical Manuals</a>.</li>
              <li><span className="kind">Reconnaissance officielle.</span> <a href="https://www.uspto.gov/learning-and-resources/ip-programs-and-awards/national-medal-technology-and-innovation/recipients/1991" target="_blank" rel="noopener noreferrer">USPTO — National Medal of Technology, 1991</a>.</li>
              <li><span className="kind">Biographie institutionnelle.</span> <a href="https://www.invent.org/inductees/frederick-mckinley-jones" target="_blank" rel="noopener noreferrer">National Inventors Hall of Fame — Frederick McKinley Jones</a>.</li>
              <li><span className="kind">À consulter directement.</span> Steven M. Spencer, « Born Handy », <em>The Saturday Evening Post</em>, 7 mai 1949.</li>
            </ul>

            {/* Community Archive Contribution Block */}
            <div id="contribuer" className="article-uncertain mt-8">
              <div className="article-label">Enrichir l'Archive Vivante KAMA</div>
              <p className="article-p text-sm text-[#46443D] leading-relaxed">
                Si vous pensez qu'il manque des informations, si vous détenez un brevet, une facture d'époque, une photo d'archive ou toute autre preuve documentaire sur Frederick McKinley Jones, n'hésitez pas à enrichir l'archive KAMA pour la postérité et le bien de tous.
              </p>
              <div className="mt-4 border border-[#121210]/10 rounded-2xl p-4 bg-[#FAF9F5]/80">
                <VercelBlobArchiveUploader />
              </div>
            </div>

            <div className="article-method">
              <strong>Note méthodologique KAMA.</strong>
              <p className="mt-2 mb-0">Les statuts employés dans cette enquête distinguent les faits <strong>établis</strong>, les éléments <strong>incertains ou débattus</strong>, les affirmations <strong>non vérifiées</strong> et celles <strong>réfutées</strong>. Une photographie ne prouve pas automatiquement sa légende ; un brevet prouve ce qui est décrit et revendiqué, pas nécessairement l’ampleur de l’usage commercial ou militaire d’une invention.</p>
            </div>

            <div className="article-endnote">
              <p className="m-0"><strong>Crédits iconographiques :</strong> portrait USDA/Wikimedia Commons ; dessins techniques issus des brevets des États-Unis. Les photographies de la Minnesota Historical Society prévues pour la version définitive doivent faire l’objet d’une vérification ou d’une demande de permission selon les conditions de l’institution.</p>
            </div>
          </article>

          <aside className="article-toc" aria-label="Sommaire">
            <strong className="block mb-2">Dans ce dossier</strong>
            <a href="#avant">Avant Jones</a>
            <a href="#parcours">Son parcours</a>
            <a href="#brevet1939">Brevet de 1939</a>
            <a href="#fonctionnement">Fonctionnement</a>
            <a href="#automatisation">Automatisation</a>
            <a href="#evolution">Évolution technique</a>
            <a href="#modelc">Model C</a>
            <a href="#guerre">Seconde Guerre mondiale</a>
            <a href="#chaine">Chaîne du froid</a>
            <a href="#pas-invente">Ce qu’il n’a pas inventé</a>
            <a href="#heritage">Héritage</a>
            <a href="#ouvert">Questions ouvertes</a>
            <a href="#contribuer">Enrichir l'archive</a>
            <a href="#sources">Sources</a>
          </aside>

        </div>

      </main>

      {/* Editorial Footer */}
      <Footer
        onSelectEntity={handleSelectEntity}
        onOpenArchivist={() => setIsArchivistOpen(true)}
      />

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
        onOpenSource={() => {}}
      />

      <CivilizationDetailModal
        civilization={selectedCivilization}
        onClose={() => setSelectedCivilization(null)}
        onSelectEntity={handleSelectEntity}
        onOpenSource={() => {}}
      />

    </div>
  );
}
