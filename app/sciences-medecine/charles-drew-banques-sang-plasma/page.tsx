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

export default function CharlesDrewArticlePage() {
  // Modal states
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isArchivistOpen, setIsArchivistOpen] = useState(false);
  const [selectedSource, setSelectedSource] = useState<HistoricalSource | null>(null);
  const [selectedPerson, setSelectedPerson] = useState<HistoricalPerson | null>(null);
  const [selectedCivilization, setSelectedCivilization] = useState<Civilization | null>(null);

  // Slider / Carousel state
  const [activeSlide, setActiveSlide] = useState(0);
  const slides = [
    {
      url: "https://upload.wikimedia.org/wikipedia/commons/1/10/BGBBFJ_Charles_R._Drew.jpg",
      caption: "Charles Drew avec des résidents au Freedmen’s Hospital, vers 1945. Harris & Ewing / Howard University / NLM. Domaine public.",
      alt: "Charles Drew assis avec des résidents médicaux au Freedmen's Hospital."
    },
    {
      url: "https://upload.wikimedia.org/wikipedia/commons/3/3d/DR._CHARLES_RICHARD_DREW%2C_M.D.%2C_C.M.%2C_MED._D.Sc._-_PROFESSOR_OF_SURGERY%2C_HOWARD_UNIVERSTITY%2C_CHIEF_SURGEON..._-_NARA_-_535693.jpg",
      caption: "Affiche biographique de Charles Drew publiée en 1943 par l'Office of War Information. NARA. Domaine public.",
      alt: "Affiche biographique de guerre de 1943."
    },
    {
      url: "https://upload.wikimedia.org/wikipedia/commons/9/99/Portrait_of_Charles_Drew.jpg",
      caption: "Portrait de studio officiel de Charles Richard Drew vers 1949. NLM / Moorland-Spingarn. Domaine public.",
      alt: "Portrait officiel de Charles Richard Drew."
    }
  ];

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

  const handleOpenSource = (source: HistoricalSource) => {
    setSelectedSource(source);
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

        .article-timeline {
          border-left: 2px solid var(--gold-art);
          padding-left: 20px;
          margin: 24px 0;
        }

        .article-timeline > div {
          margin-bottom: 16px;
          position: relative;
        }

        .article-timeline > div::before {
          content: "";
          position: absolute;
          left: -27px;
          top: 6px;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: var(--gold-art);
          border: 2px solid var(--bg-art);
        }

        .article-pull {
          font-family: Georgia, serif;
          font-style: italic;
          font-size: 1.4rem;
          color: var(--gold2-art);
          border-left: 3px solid var(--gold-art);
          padding-left: 20px;
          margin: 32px 0;
          line-height: 1.4;
        }

        .article-sources {
          padding-left: 20px;
        }

        .article-sources li {
          margin-bottom: 12px;
        }

        .article-sources .kind {
          font-weight: 800;
          font-size: 0.73rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--muted-art);
          display: inline-block;
          margin-right: 8px;
        }

        .article-method {
          background: rgba(242, 184, 68, 0.08);
          border: 1px solid rgba(242, 184, 68, 0.2);
          padding: 20px;
          border-radius: 14px;
          margin-top: 36px;
        }

        .article-endnote {
          border-top: 1px solid var(--line-art);
          padding-top: 20px;
          margin-top: 36px;
          font-size: 0.84rem;
          color: var(--muted-art);
        }

        .article-grid-archive {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
          margin: 24px 0;
        }

        .article-grid-archive a {
          text-decoration: none !important;
        }

        .article-card-archive {
          border: 1px solid var(--line-art);
          border-radius: 12px;
          padding: 16px;
          background: var(--paper-art);
          text-decoration: none !important;
          display: flex;
          flex-direction: column;
          gap: 7px;
          transition: all 0.2s ease;
        }

        .article-card-archive:hover {
          border-color: var(--gold-art);
          box-shadow: 0 4px 12px rgba(18,18,16,0.05);
        }

        .article-card-archive strong {
          color: var(--gold-art);
        }

        .article-card-archive span {
          color: var(--ink-art);
          font-size: 0.9rem;
        }

        .article-card-archive small {
          color: var(--muted-art);
          font-size: 0.77rem;
        }

        @media (max-width: 960px) {
          .article-layout {
            grid-template-columns: 1fr;
          }

          .article-toc {
            position: relative;
            top: auto;
            border: 0;
            border-top: 1px solid var(--line-art);
            padding: 14px 0;
            order: -1;
          }

          .article-toc a {
            display: inline-block;
            margin-right: 14px;
          }

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
            Dossier historique · Sciences et médecine
          </div>
          <h1 className="font-serif text-[clamp(2.5rem,7vw,5rem)] leading-[0.98] my-[0.45rem] max-w-[1000px] tracking-[-0.035em]">
            Charles Drew et les banques de sang : ce qu’il a réellement inventé, organisé et transmis
          </h1>
          <p className="text-[1.18rem] max-w-[850px] text-[#46443D] mt-4">
            De <em>Banked Blood</em> à Blood for Britain, de la Croix-Rouge à Howard University : une enquête qui distingue les inventions antérieures, l’apport réel de Drew, les politiques raciales documentées et les mythes qui ont entouré sa mémoire.
          </p>
          <div className="flex flex-wrap gap-2 mt-4">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#A65438]/10 text-[#A65438] border border-[#A65438]/20">
              Savoirs & Sciences
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#284e7a]/10 text-[#284e7a] border border-[#284e7a]/20">
              Médecine
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#1F392E]/10 text-[#1F392E] border border-[#1F392E]/20">
              XXe Siècle
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#FAF9F5] text-[#77746A] border border-[#121210]/10">
              Dossier Complet • 14 min
            </span>
          </div>
          <div className="flex flex-wrap gap-[10px_18px] mt-5 text-[#77746A] text-[0.9rem]">
            <span>Par <strong>KAMA</strong></span>
            <time dateTime="2026-08-20">Mis à jour le 20 août 2026</time>
            <span>Lecture longue · sources primaires et archives</span>
          </div>
        </section>

        {/* Hero Image */}
        <div className="max-w-[1120px] mx-auto px-[22px]">
          <figure className="m-0">
            <div className="aspect-[16/9] overflow-hidden bg-stone-300 rounded-[14px] border border-[#30343c]">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/9/99/Portrait_of_Charles_Drew.jpg"
                alt="Portrait photographique de Charles Richard Drew vers 1949."
                className="w-full h-full object-cover object-[center_30%] block"
              />
            </div>
            <figcaption className="text-[#77746A] text-[0.82rem] mt-2">
              Charles R. Drew, vers 1949. Associated Photographic Services / Howard University, Moorland-Spingarn Research Center / NLM. Version Commons : domaine public aux États-Unis.
            </figcaption>
          </figure>
        </div>

        {/* Article Layout Grid */}
        <div className="article-layout">
          
          <article className="min-w-0">
            
            <p className="article-lede">
              Charles Richard Drew est souvent présenté comme « l’inventeur de la banque de sang ». Les archives permettent d’aller plus loin : elles montrent un chercheur qui connaissait ses prédécesseurs, un organisateur de la sécurité et de la traçabilité du plasma, puis un chirurgien qui considérait la formation médicale comme son œuvre de longue durée.
            </p>

            <div className="article-factbox">
              <div className="article-label">Verdict KAMA</div>
              <p className="article-p font-semibold">
                Drew n’a pas inventé seul la banque de sang. Son importance se situe dans la recherche sur la conservation, la standardisation des procédures, Blood for Britain et la construction d’un programme chirurgical à Howard.
              </p>
            </div>

            <h2 id="introduction" className="article-h2">Introduction</h2>
            <p className="article-p">
              Charles Richard Drew est souvent résumé en une formule spectaculaire : « l’inventeur de la banque de sang ». Les archives racontent une histoire plus précise. Drew n’a inventé ni la transfusion, ni le plasma, ni la conservation du sang, ni même l’expression « blood bank ». Son importance tient ailleurs : à la recherche sur la conservation du sang, à la standardisation de procédures de collecte et de traitement du plasma, à la coordination de programmes capables de fonctionner à grande échelle, puis à la formation d’une génération de chirurgiens noirs à Howard University.
            </p>
            <p className="article-p">
              Cette précision ne réduit pas son rôle. Elle permet au contraire de voir ce qu’il fit réellement : transformer des savoirs déjà dispersés entre laboratoires et services hospitaliers en méthodes plus contrôlées, plus traçables et plus reproductibles. Dans Blood for Britain, son travail se situe au croisement de la recherche, de la logistique, de la sécurité biologique et de l’organisation institutionnelle. Après 1941, il consacra l’essentiel de son énergie à la chirurgie et à la formation médicale.
            </p>

            <h2 id="avant-drew-une-histoire-deja-longue" className="article-h2">Avant Drew : une histoire déjà longue</h2>
            <p className="article-p">
              Drew connaissait parfaitement les antécédents de son domaine. Dans sa thèse et dans son article sur le rôle des chercheurs soviétiques dans le développement des banques de sang, il cite les travaux sur le citrate, la conservation du sang, le sang cadavérique et placentaire, ainsi que les systèmes de collecte mis au point avant lui. Il attribue notamment à Bernard Fantus l’emploi institutionnel du terme « blood bank » à Cook County Hospital en 1937 et décrit le service organisé par Frederic Duran Jordà pendant la guerre d’Espagne.
            </p>
            <p className="article-p">
              Cette généalogie est essentielle. Elle interdit d’écrire que Drew aurait créé ex nihilo la banque de sang moderne. Son œuvre s’inscrit dans une histoire collective : Landsteiner et la compatibilité des groupes sanguins, Hustin et d’autres chercheurs sur les anticoagulants, les expériences européennes, soviétiques et nord-américaines de conservation, puis les premières organisations hospitalières de stockage et de distribution.
            </p>

            {/* Matrice KAMA des Affirmations */}
            <div className="my-6">
              <div className="text-xs uppercase tracking-wider font-bold text-stone-500 mb-2">Matrice des faits établis et réfutés</div>
              <div className="overflow-x-auto border border-[#121210]/10 rounded-2xl bg-white/60">
                <table className="min-w-full divide-y divide-[#121210]/10">
                  <thead className="bg-[#FAF9F5] text-left text-xs uppercase font-bold text-stone-600">
                    <tr>
                      <th className="px-4 py-3">Affirmation</th>
                      <th className="px-4 py-3">Statut</th>
                      <th className="px-4 py-3">Note</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#121210]/8 text-xs sm:text-sm">
                    <tr>
                      <td className="px-4 py-3 font-semibold">« Drew a inventé le plasma »</td>
                      <td className="px-4 py-3"><span className="article-status article-refuted">Réfuté</span></td>
                      <td className="px-4 py-3 text-stone-600">Le plasma et son usage médical sont antérieurs à Drew.</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-semibold">« Drew a inventé seul la banque de sang »</td>
                      <td className="px-4 py-3"><span className="article-status article-refuted">Réfuté / Trop absolu</span></td>
                      <td className="px-4 py-3 text-stone-600">Fantus, services soviétiques, Duran Jordà et d’autres sont antérieurs ; Drew les cite lui-même.</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-semibold">Thèse Banked Blood, 1940</td>
                      <td className="px-4 py-3"><span className="article-status article-established">Établi</span></td>
                      <td className="px-4 py-3 text-stone-600">Source primaire conservée par la NLM.</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-semibold">Rôle central dans Blood for Britain</td>
                      <td className="px-4 py-3"><span className="article-status article-established">Établi</span></td>
                      <td className="px-4 py-3 text-stone-600">Medical Supervisor ; standardisation, dossiers, équipements, critères de sécurité.</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-semibold">14 556 dons et 5 500 L de plasma</td>
                      <td className="px-4 py-3"><span className="article-status article-established">Établi</span></td>
                      <td className="px-4 py-3 text-stone-600">Rapport final du 31 janvier 1941.</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-semibold">Opposition à la ségrégation raciale</td>
                      <td className="px-4 py-3"><span className="article-status article-established">Établi</span></td>
                      <td className="px-4 py-3 text-stone-600">Déclarations et correspondance de guerre contre le tri du sang.</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-semibold">« Démission en 1942 due à la ségrégation »</td>
                      <td className="px-4 py-3"><span className="article-status article-open">Non établi</span></td>
                      <td className="px-4 py-3 text-stone-600">Chronologie en tension ; son retour à Howard en avril 1941 était prévu.</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-semibold">Mort par refus de soins (hôpital blanc)</td>
                      <td className="px-4 py-3"><span className="article-status article-refuted">Réfuté</span></td>
                      <td className="px-4 py-3 text-stone-600">Témoignages des médecins et de sa famille.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <h2 id="banked-blood-etudier-ce-qui-arrive-au-sang-quand-on-le-conserve" className="article-h2">Banked Blood : étudier ce qui arrive au sang quand on le conserve</h2>
            <p className="article-p">
              À Columbia University, Drew travaille avec John Scudder et une équipe de laboratoire nombreuse. Sa thèse, <em>Banked Blood: A Study in Blood Preservation</em>, achevée en 1940, ne se contente pas de défendre l’idée générale du stockage. Elle étudie ce qui change physiquement et chimiquement dans le sang conservé : diffusion du potassium, hémolyse, évolution des cellules, effets de l’âge du sang, influence de la température, des anticoagulants, de la forme des contenants et des traumatismes mécaniques.
            </p>
            <p className="article-p">
              Drew remercie explicitement Scudder, qui lui a proposé l’enquête et en a guidé une grande partie, ainsi que Dorothy Corcoran, Margaret Smith, Elizabeth Tuthill, Helen Stoddard, Josiah Lasell et d’autres collaborateurs. La thèse est donc aussi une archive du caractère collectif du travail scientifique.
            </p>
            <p className="article-p">
              Une expérience est particulièrement révélatrice du lien entre laboratoire et logistique. Drew observe que des échantillons de sang ancien peuvent s’hémolyser davantage après transport et agitation. Il pose alors une question directement militaire : vaut-il mieux conserver le sang loin du front ou l’acheminer rapidement vers le lieu où il sera utilisé ? La conservation du sang devient ici un problème de transport autant que de chimie.
            </p>

            <h2 id="blood-for-britain-passer-du-laboratoire-a-l-echelle-de-la-ville" className="article-h2">Blood for Britain : passer du laboratoire à l’échelle de la ville</h2>
            <p className="article-p">
              À l’été 1940, alors que la guerre en Europe crée un besoin urgent de produits sanguins transportables, la Blood Transfusion Association et l’American Red Cross lancent à New York un programme de collecte destiné à la Grande-Bretagne. Drew, rappelé de Howard en septembre 1940, devient Medical Supervisor à plein temps. Le rapport final du 31 janvier 1941 définit son rôle avec précision : coordonner les aspects médicaux, établir des registres uniformes, standardiser les équipements et fixer des critères techniques destinés à assurer la sécurité du produit final.
            </p>
            <p className="article-p">
              Le programme s’appuie sur plusieurs hôpitaux et des milliers de professionnels et volontaires. Le rapport comptabilise 18 861 rendez-vous, 14 556 dons effectivement prélevés et environ 5 500 litres de solution plasma-saline produits ou acceptés sous réserve de l’achèvement des tests. Ces chiffres montrent l’échelle du changement : la question n’est plus seulement de savoir si le plasma peut être utilisé, mais comment le produire, le contrôler et l’expédier en quantité.
            </p>

            <h2 id="l-invention-invisible-standardiser" className="article-h2">L’invention invisible : standardiser</h2>
            <p className="article-p">
              Les archives de Blood for Britain montrent une succession de problèmes concrets : contaminations, variations entre hôpitaux, différences d’équipement, cultures bactériologiques insuffisamment longues, erreurs de conditionnement et nécessité de suivre les lots jusqu’à leur destination. Les difficultés obligent l’équipe à relever ses standards.
            </p>
            <p className="article-p">
              Dans une réunion du 13 décembre 1940, les participants décident notamment de numéroter séparément les pools de plasma et de sérum afin de pouvoir en retracer l’origine et la distribution. Ils cherchent à éliminer les sources de pyrogènes, à comparer les teneurs en protéines, à éviter que certains conservateurs ne brouillent les mesures, et à reporter les essais chez des patients en choc profond tant que la sécurité des produits n’est pas suffisamment comprise.
            </p>
            <p className="article-p">
              Le programme expérimental plasma-versus-sérum prévoit analyses chimiques, électrophorèse, observations biologiques, essais cliniques et transfert des données sur cartes perforées afin de permettre une tabulation statistique. Cette organisation est l’un des apports majeurs de Drew : faire de la sécurité et de la traçabilité une architecture du programme, pas une vérification ajoutée à la fin.
            </p>

            <h2 id="le-programme-pilote-de-la-croix-rouge" className="article-h2">Le programme pilote de la Croix-Rouge</h2>
            <p className="article-p">
              Après Blood for Britain, Drew devient en février 1941 assistant director d’un programme pilote de banque de sang de l’American Red Cross, ainsi qu’assistant director of Blood Procurement pour le National Research Council. La National Library of Medicine situe son retour à Howard University en avril 1941, à l’issue de cette brève phase pilote.
            </p>
            <p className="article-p">
              La chronologie est importante parce qu’un récit très répandu affirme qu’il aurait démissionné de la Croix-Rouge en 1942 pour protester contre la ségrégation du sang. Les documents examinés ne permettent pas de soutenir cette causalité simple. Drew avait déjà formulé avant Blood for Britain son intention de revenir à Howard et le programme pilote auquel il participa était prévu pour une durée limitée.
            </p>

            <h2 id="race-et-sang-ce-que-drew-dit-reellement" className="article-h2">Race et sang : ce que Drew dit réellement</h2>
            <p className="article-p">
              L’opposition de Drew aux politiques raciales appliquées au sang est, elle, solidement documentée. Les forces armées américaines refusèrent d’abord les dons de personnes noires, puis acceptèrent ces dons tout en imposant leur séparation. Drew dénonça cette politique comme scientifiquement infondée et comme une humiliation imposée à des citoyens noirs.
            </p>
            <p className="article-p">
              Un document du symposium de l’American Human Serum Association des 2 et 3 juin 1941 ajoute une nuance intéressante. Drew déclare qu’aucune distinction de race n’est faite dans le dispositif précis dont il est alors question. Cette phrase ne doit pas être extrapolée à l’ensemble de la future politique nationale de la Croix-Rouge ou des forces armées ; elle prouve seulement ce que Drew affirme à propos du périmètre discuté ce jour-là.
            </p>
            <div className="article-pull">
              « Dans la science, il n'y a pas de place pour le préjugé racial. Le sang de tous les humains est de la même composition fondamentale. »
            </div>
            <p className="article-p">
              La méthode KAMA impose donc de séparer trois choses : le retour de Drew à Howard en avril 1941 ; les politiques raciales imposées aux dons pendant la guerre ; et les protestations de Drew contre ces politiques. Les fusionner en une seule scène de « démission en 1942 » produit un récit plus simple que les archives.
            </p>

            <h2 id="howard-son-projet-principal-devient-la-chirurgie" className="article-h2">Howard : son projet principal devient la chirurgie</h2>
            <p className="article-p">
              À Howard University, Drew devient en octobre 1941 professeur et responsable du Department of Surgery, ainsi que chirurgien en chef au Freedmen’s Hospital. Il devient aussi le premier Afro-Américain nommé examinateur pour l’American Board of Surgery. Ce deuxième chapitre de sa carrière est parfois éclipsé par le récit des banques de sang.
            </p>
            <p className="article-p">
              Pour Drew, la formation chirurgicale était pourtant une ambition centrale. Il voulait préparer de jeunes chirurgiens noirs aux standards les plus exigeants, les aider à poursuivre des spécialisations, à accéder aux sociétés professionnelles et à créer à leur tour des pôles de formation. En décembre 1948, son premier groupe de résidents réussit les examens du Board of Surgery ; la NLM souligne l’importance de son programme dans la formation des chirurgiens noirs certifiés de la période.
            </p>

            <h2 id="former" className="article-h2">Former des médecins dans un système d'exclusion</h2>
            <p className="article-p">
              Un discours prononcé au Temple Israel Brotherhood à Boston le 21 mars 1946 montre Drew analysant lui-même les obstacles à la formation médicale des Afro-Américains. Il insiste sur deux causes : le coût très élevé des études médicales dans une population largement appauvrie et les politiques d’exclusion des facultés, hôpitaux et programmes de spécialisation.
            </p>
            <p className="article-p">
              Il ne parle pas seulement d’un manque abstrait de diversité. Il décrit un mécanisme institutionnel : faible accès aux écoles de médecine, rareté des internats et résidences ouverts aux médecins noirs, puis effets en cascade sur les privilèges hospitaliers, la spécialisation et la distribution géographique des soins. Les statistiques précises qu’il cite dans ce discours doivent être attribuées à ses sources de l’époque si elles sont reprises, mais son diagnostic institutionnel est sans ambiguïté.
            </p>

            <h2 id="ce-que-drew-n-a-pas-invente" className="article-h2">Ce que Drew n’a pas inventé</h2>
            <p className="article-p">
              Drew n’a pas inventé la transfusion sanguine. Il n’a pas découvert le plasma. Il n’a pas inventé les groupes sanguins. Il n’a pas créé le premier service de sang conservé. Il n’a pas inventé seul la banque de sang et il n’a pas inventé la lyophilisation du plasma.
            </p>
            <p className="article-p">
              Ses propres écrits suffisent à le démontrer : il cite ses prédécesseurs, décrit les services soviétiques, espagnols et américains antérieurs et attribue des priorités scientifiques à d’autres chercheurs. Le présenter comme inventeur solitaire efface précisément la culture scientifique dont il faisait partie.
            </p>

            <h2 id="ce-qu-il-a-reellement-change" className="article-h2">Ce qu’il a réellement changé</h2>
            <p className="article-p">
              Ce que Drew a réellement changé est moins facile à résumer en une formule, mais plus important historiquement. Il a contribué à transformer la conservation du sang et du plasma en un problème de système : sélectionner les donneurs, standardiser les prélèvements, identifier les lots, contrôler la stérilité, mesurer les changements chimiques, organiser les registres, coordonner plusieurs hôpitaux, suivre les produits et apprendre des erreurs.
            </p>
            <p className="article-p">
              Dans Blood for Britain, cette compétence permit de passer d’expériences hospitalières à une production urbaine à grande échelle. À Howard, le même goût pour l’organisation, les standards et la transmission se retrouve dans la formation chirurgicale. Relier ces deux périodes est une interprétation éditoriale, mais elle aide à comprendre la cohérence d’un parcours fondé sur la construction d’institutions.
            </p>

            <h2 id="la-mort-de-drew-et-la-legende-de-l-hopital" className="article-h2">La mort de Drew et la légende de l’hôpital</h2>
            <p className="article-p">
              Le 1er avril 1950, Drew est grièvement blessé dans un accident automobile près de Burlington, en Caroline du Nord, alors qu’il se rend avec plusieurs collègues à une clinique médicale à Tuskegee. Il est transporté à Alamance General Hospital. Des médecins tentent de le sauver et lui administrent des transfusions, mais ses blessures sont mortelles.
            </p>
            <h2 id="chronologie" className="article-h2">Chronologie de travail</h2>
            <div className="article-timeline">
              <div><b>3 juin 1904</b> — Naissance à Washington, D.C.</div>
              <div><b>1938-1940</b> — Travail à Columbia/Presbyterian Hospital sur la conservation du sang.</div>
              <div><b>1940</b> — Thèse Banked Blood ; doctorat en sciences médicales ; projet de retour à Howard.</div>
              <div><b>Août 1940-janvier 1941</b> — Blood for Britain.</div>
              <div><b>Septembre 1940</b> — Drew devient Medical Supervisor à plein temps du programme.</div>
              <div><b>31 janvier 1941</b> — Rapport final Blood for Britain (14 556 dons et ~5 500 L de plasma).</div>
              <div><b>Février-avril 1941</b> — Programme pilote de banque de sang de l’American Red Cross.</div>
              <div><b>Avril 1941</b> — Retour à Howard University.</div>
              <div><b>Octobre 1941</b> — Responsable du Department of Surgery ; chief surgeon au Freedmen’s Hospital ; examinateur American Board of Surgery.</div>
              <div><b>1942-1944</b> — Opposition documentée aux politiques raciales appliquées aux dons et au sang.</div>
              <div><b>21 mars 1946</b> — Discours Temple Israel Brotherhood : formation médicale, pauvreté et exclusion.</div>
              <div><b>1948</b> — Premier groupe de résidents réussissant les examens de certification.</div>
              <div><b>1949</b> — Consultant chirurgical auprès du Surgeon General ; mission en Europe.</div>
              <div><b>1er avril 1950</b> — Accident automobile et décès à Alamance General Hospital.</div>
            </div>

            <div className="article-grid-archive">
              <a href="https://www.profiles.nlm.nih.gov/spotlight/bg/catalog/nlm%3Anlmuid-101584649X73-img" rel="noopener" target="_blank" className="article-card-archive">
                <strong>Archive NLM · 1er février 1941</strong>
                <span>Drew avec le personnel de la première banque de sang de l’American Red Cross.</span>
                <small>Notice de l'archive officielle NLM</small>
              </a>
              <a href="https://profiles.nlm.nih.gov/spotlight/bg/catalog?f%5Breadonly_nlm-id_ssim%5D%5B%5D=101584649X72" rel="noopener" target="_blank" className="article-card-archive">
                <strong>Archive NLM · février 1941</strong>
                <span>Drew avec la première unité mobile de collecte de sang.</span>
                <small>Notice de l'archive officielle NLM</small>
              </a>
            </div>

            <div className="max-w-[1120px] mx-auto mb-8">
              <figure className="m-0">
                <div className="relative aspect-[4/3] max-w-[600px] overflow-hidden bg-[#ece9df] rounded-[14px] border border-[#30343c] mx-auto flex items-center justify-center">
                  <img 
                    src={slides[activeSlide].url}
                    alt={slides[activeSlide].alt}
                    className="w-full h-full object-contain block"
                  />
                  
                  {/* Prev Button */}
                  <button 
                    onClick={() => setActiveSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 hover:bg-white text-stone-800 flex items-center justify-center shadow-md transition-colors cursor-pointer border border-stone-200 font-bold"
                    aria-label="Image précédente"
                  >
                    ←
                  </button>

                  {/* Next Button */}
                  <button 
                    onClick={() => setActiveSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 hover:bg-white text-stone-800 flex items-center justify-center shadow-md transition-colors cursor-pointer border border-stone-200 font-bold"
                    aria-label="Image suivante"
                  >
                    →
                  </button>

                  {/* Dot Indicators */}
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 bg-black/45 px-3 py-1 rounded-full backdrop-blur-xs">
                    {slides.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveSlide(idx)}
                        className={`w-2 h-2 rounded-full transition-all cursor-pointer ${idx === activeSlide ? 'bg-white scale-110' : 'bg-white/55'}`}
                      />
                    ))}
                  </div>
                </div>
                <figcaption className="text-[#77746A] text-[0.82rem] mt-2 text-center max-w-[600px] mx-auto leading-relaxed">
                  {slides[activeSlide].caption}
                </figcaption>
              </figure>
            </div>

            {/* Community Archive Contribution Block */}
            <div id="contribuer" className="article-uncertain mt-8">
              <div className="article-label">Enrichir l'Archive Vivante KAMA</div>
              <p className="article-p text-sm text-[#46443D] leading-relaxed">
                Si vous pensez qu'il manque des informations, si vous détenez un brevet, une photo d'archive ou toute autre preuve documentaire sur Charles Richard Drew, n'hésitez pas à enrichir l'archive KAMA pour la postérité et le bien de tous.
              </p>
              <div className="mt-4 border border-[#121210]/10 rounded-2xl p-4 bg-[#FAF9F5]/80">
                <VercelBlobArchiveUploader />
              </div>
            </div>

            <h2 id="sources" className="article-h2">Sources principales</h2>
            <ul className="article-sources list-none">
              <li><span className="kind">Source primaire.</span> Charles R. Drew, <a href="https://collections.nlm.nih.gov/ext/document/101584649X142/PDF/101584649X142.pdf" target="_blank" rel="noopener noreferrer"><em>Banked Blood: A Study in Blood Preservation</em>, Columbia University, 1940</a>.</li>
              <li><span className="kind">Source primaire.</span> Blood Transfusion Association, <a href="https://profiles.nlm.nih.gov/spotlight/bg/catalog/nlm%3Anlmuid-101584649X141-doc" target="_blank" rel="noopener noreferrer"><em>Report on Supplying Blood Plasma to England</em>, 31 janvier 1941</a>.</li>
              <li><span className="kind">Source primaire.</span> Charles R. Drew, <a href="https://profiles.nlm.nih.gov/spotlight/bg/catalog/nlm%3Anlmuid-101584649X101-doc" target="_blank" rel="noopener noreferrer"><em>Plasma for Great Britain</em>, rapport postérieur à 1941</a>.</li>
              <li><span className="kind">Source primaire.</span> Charles R. Drew, <a href="https://profiles.nlm.nih.gov/spotlight/bg/" target="_blank" rel="noopener noreferrer"><em>The Role of Soviet Investigators in the Development of the Blood Bank</em></a>.</li>
              <li><span className="kind">Archive.</span> <a href="https://profiles.nlm.nih.gov/spotlight/bg/" target="_blank" rel="noopener noreferrer">National Library of Medicine — The Charles R. Drew Papers</a>.</li>
              <li><span className="kind">Chronologie.</span> <a href="https://profiles.nlm.nih.gov/spotlight/bg/feature/biographical-information" target="_blank" rel="noopener noreferrer">NLM — Brief Chronology</a>.</li>
              <li><span className="kind">Howard Univ.</span> <a href="https://profiles.nlm.nih.gov/spotlight/bg/feature/my-chief-interest-was-and-is-surgery-howard-university-1941-1950" target="_blank" rel="noopener noreferrer">NLM — My Chief Interest Was and Is Surgery (1941-1950)</a>.</li>
              <li><span className="kind">Collection.</span> <a href="https://profiles.nlm.nih.gov/spotlight/bg/browse" target="_blank" rel="noopener noreferrer">NLM — The Charles R. Drew Papers (Collection d'archives complète)</a>.</li>
            </ul>

            <div className="article-method">
              <strong>Note méthodologique KAMA.</strong>
              <p className="mt-2 mb-0">Les statuts ÉTABLI, DÉBATTU, INCERTAIN, NON VÉRIFIÉ et RÉFUTÉ sont utilisés pour éviter de transformer une hypothèse en fait. Les procédures transfusionnelles décrites appartiennent à l’histoire de la médecine des années 1930-1940 et ne constituent pas des recommandations médicales actuelles.</p>
            </div>

            <div className="article-endnote">
              <p className="m-0"><strong>Crédits iconographiques :</strong> portrait d'époque de la NLM / Wikimedia Commons ; photographies et archives numérisées hébergées par la National Library of Medicine. Les notices de droits doivent faire l'objet de vérifications avant reproduction.</p>
            </div>

          </article>

          {/* Sidebar Navigation */}
          <aside className="article-toc" aria-label="Sommaire">
            <strong className="block mb-2">Dans ce dossier</strong>
            <a href="#introduction">Introduction</a>
            <a href="#avant-drew-une-histoire-deja-longue">Avant Drew</a>
            <a href="#banked-blood-etudier-ce-qui-arrive-au-sang-quand-on-le-conserve">Banked Blood</a>
            <a href="#blood-for-britain-passer-du-laboratoire-a-l-echelle-de-la-ville">Blood for Britain</a>
            <a href="#l-invention-invisible-standardiser">Standardisation</a>
            <a href="#le-programme-pilote-de-la-croix-rouge">Croix-Rouge</a>
            <a href="#race-et-sang-ce-que-drew-dit-reellement">Race et sang</a>
            <a href="#howard-son-projet-principal-devient-la-chirurgie">Howard</a>
            <a href="#former">Former des médecins</a>
            <a href="#ce-que-drew-n-a-pas-invente">Ce qu’il n’a pas inventé</a>
            <a href="#ce-qu-il-a-reellement-change">Ce qu’il a changé</a>
            <a href="#la-mort-de-drew-et-la-legende-de-l-hopital">Mort et légende</a>
            <a href="#chronologie">Chronologie</a>
            <a href="#contribuer">Enrichir l'archive</a>
            <a href="#sources">Sources</a>
          </aside>

        </div>

      </main>

      {/* Footer */}
      <Footer
        onSelectEntity={handleSelectEntity}
        onOpenArchivist={() => setIsArchivistOpen(true)}
      />

      {/* Modals & Drawers */}
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
