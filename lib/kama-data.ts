import { 
  HistoricalPerson, 
  HistoricalEvent, 
  Civilization, 
  VideoContent, 
  ArticleDossier, 
  KamaPath, 
  KamaStory,
  HistoricalSource,
  CommunityArchiveUpload,
  CommunityArchiveItem
} from './types';

// Verified Historical Sources Registry
export const HISTORICAL_SOURCES: Record<string, HistoricalSource> = {
  ibn_battuta: {
    id: 'ibn_battuta',
    title: 'Rihla (Voyages au Mali et au Soudan)',
    author: 'Ibn Battuta',
    year: 1355,
    type: 'primary',
    archiveInstitution: 'Bibliothèque Nationale de France (Ms. Arabe 2291)',
    excerpt: 'Les Noirs possèdent d’admirables qualités : ils sont rarement injustes et ont une plus grande horreur de l’injustice que tout autre peuple.',
    reliabilityNote: 'Témoignage oculaire primaire de première main sur le Mali médiéval.'
  },
  al_umari: {
    id: 'al_umari',
    title: 'Masalik al-Absar fi Mamalik al-Amsar',
    author: 'Shihab al-Din al-Umari',
    year: 1342,
    type: 'primary',
    archiveInstitution: 'Bibliothèque du Caire / Manuscrit de Damas',
    excerpt: 'Mansa Musa inonda Le Caire de ses bienfaits. Il ne laissa aucun dignitaire sans lui donner une somme d’or considérable.',
    reliabilityNote: 'Chroniqueur officiel mamelouk consignant les effets économiques du passage de Musa au Caire.'
  },
  sankara_discours_dette: {
    id: 'sankara_discours_dette',
    title: 'Discours sur la dette au sommet de l’OUA à Addis-Abeba',
    author: 'Thomas Sankara',
    year: 1987,
    type: 'primary',
    archiveInstitution: 'Archives de l’Union Africaine & Radio Télévision du Burkina',
    excerpt: 'La dette ne peut pas être remboursée parce que d’abord si nous ne payons pas, nos bailleurs de fonds ne mourront pas. Mais si nous payons, nous, nous allons mourir.',
    reliabilityNote: 'Enregistrement audio et transcription intégrale officielle du 29 juillet 1987.'
  },
  toussaint_memoires: {
    id: 'toussaint_memoires',
    title: 'Mémoires du Général Toussaint Louverture',
    author: 'Toussaint Louverture',
    year: 1803,
    type: 'primary',
    archiveInstitution: 'Archives Nationales de France, Fort de Joux',
    excerpt: 'En me renversant, on n’a abattu à Saint-Domingue que le tronc de l’arbre de la liberté des Noirs ; il repoussera par les racines, parce qu’elles sont profondes et nombreuses.',
    reliabilityNote: 'Manuscrit autographe rédigé lors de sa captivité au Fort de Joux.'
  },
  diop_nations_negres: {
    id: 'diop_nations_negres',
    title: 'Nations nègres et culture : De l’antiquité nègre égyptienne aux problèmes culturels de l’Afrique noire d’aujourd’hui',
    author: 'Cheikh Anta Diop',
    year: 1954,
    type: 'academic',
    publisher: 'Éditions Présence Africaine',
    reliabilityNote: 'Ouvrage séminal de l’historiographie africaine contemporaine.'
  },
  unesco_general_history: {
    id: 'unesco_general_history',
    title: 'Histoire générale de l’Afrique (8 volumes)',
    author: 'Comité scientifique international de l’UNESCO',
    year: 1981,
    type: 'academic',
    publisher: 'UNESCO / Présence Africaine',
    reliabilityNote: 'Ouvrage de référence collectif impliquant plus de 350 historiens internationaux.'
  },
  cesaire_discours_colonialisme: {
    id: 'cesaire_discours_colonialisme',
    title: 'Discours sur le colonialisme',
    author: 'Aimé Césaire',
    year: 1950,
    type: 'academic',
    publisher: 'Éditions Réclame / Présence Africaine',
    reliabilityNote: 'Texte fondamental de la critique anticoloniale et de la Négritude.'
  },
  fanon_damnes: {
    id: 'fanon_damnes',
    title: 'Les Damnés de la Terre',
    author: 'Frantz Fanon',
    year: 1961,
    type: 'academic',
    publisher: 'Éditions François Maspero',
    reliabilityNote: 'Essai fondamental sur la décolonisation psychique et politique.'
  },
  charte_kouroukan: {
    id: 'charte_kouroukan',
    title: 'Charte de Kouroukan Fouga (Constitution de l’Empire du Mali)',
    author: 'Assemblée constituante de Soundiata Keïta',
    year: 1236,
    type: 'archive',
    archiveInstitution: 'Tradition orale mandingue & UNESCO Intangible Cultural Heritage',
    excerpt: 'Toute vie humaine est une vie. Une vie ne vaut pas plus qu’une autre. Que nul ne fasse tort à autrui.',
    reliabilityNote: 'Proclamée en 1236, l’une des plus anciennes déclarations des droits humains inscrite par l’UNESCO.'
  }
};

// Historical People Directory
export const HISTORICAL_PEOPLE: HistoricalPerson[] = [
  {
    id: 'thomas-sankara',
    name: 'Thomas Sankara',
    title: 'Président du Burkina Faso & Penseur panafricain',
    birthYear: 1949,
    deathYear: 1987,
    place: 'Yako / Ouagadougou',
    region: 'Afrique de l’Ouest',
    era: 'Indépendances & Révolutions (1960–1990)',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    summary: 'Révolutionnaire intègre, féministe avant-gardiste et écologiste pionnier, il transforma la Haute-Volta en Burkina Faso (« La patrie des hommes intègres »), vaccina 2,5 millions d’enfants en une semaine et replanta 10 millions d’arbres contre la désertification.',
    keyContributions: [
      'Refus de la dette odieuse et plaidoyer à l’OUA en 1987',
      'Campagne massive de reboisement et d’auto-suffisance alimentaire',
      'Interdiction de l’excision, de la polygamie forcée et nomination record de femmes ministres',
      'Construction d’infrastructures populaires (chemins de fer, écoles) sans dette extérieure'
    ],
    quote: {
      text: 'Oser inventer l’avenir. Tout ce qui sort de l’imagination de l’homme est réalisable par l’homme.',
      context: 'Discours devant l’Assemblée Générale des Nations Unies',
      year: 1984
    },
    connectedEntities: [
      { id: 'revolution-burkina-1983', type: 'event', title: 'Révolution burkinabè de 1983', relationship: 'Leader et architecte' },
      { id: 'patrice-lumumba', type: 'person', title: 'Patrice Lumumba', relationship: 'Inspiration politique' },
      { id: 'dossier-thomas-sankara', type: 'article', title: 'Pourquoi le projet politique de Sankara fascine encore', relationship: 'Dossier complet' },
      { id: 'discours-dette-video', type: 'video', title: 'Le Discours d’Addis-Abeba sur la dette', relationship: 'Archive audiovisuelle' }
    ],
    sources: [HISTORICAL_SOURCES.sankara_discours_dette, HISTORICAL_SOURCES.unesco_general_history],
    dossierId: 'dossier-thomas-sankara'
  },
  {
    id: 'mansa-musa',
    name: 'Mansa Moussa Keïta',
    title: 'Empereur du Mali & Bâtisseur de Tombouctou',
    birthYear: 1280,
    deathYear: 1337,
    place: 'Niani / Tombouctou',
    region: 'Afrique de l’Ouest',
    era: 'Âge d’or médiéval (1200–1500)',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80',
    summary: 'Dixième Mansa de l’Empire du Mali, il régna sur un territoire immensément prospère s’étendant de l’Atlantique au fleuve Niger. Son pèlerinage à La Mecque en 1324 fit rayonner le Mali jusqu’en Europe et fit de Tombouctou la capitale intellectuelle du monde arabo-musulman.',
    keyContributions: [
      'Financement de l’Université de Sankoré et de la Grande Mosquée Djingareyber',
      'Pèlerinage historique de 1324 distribuant plusieurs tonnes d’or au Caire',
      'Protection et expansion de milliers de manuscrits scientifiques et philosophiques',
      'Intégration du Mali sur le célèbre Atlas Catalan de 1375 par Abraham Cresques'
    ],
    quote: {
      text: 'Le savoir est la seule richesse qui croît lorsqu’on la partage avec les autres.',
      context: 'Chronique royale rapportée à Tombouctou',
      year: 1328
    },
    connectedEntities: [
      { id: 'empire-du-mali', type: 'civilization', title: 'Empire du Mali', relationship: 'Souverain emblématique' },
      { id: 'pelerinage-1324', type: 'event', title: 'Pèlerinage au Caire et à La Mecque (1324)', relationship: 'Événement majeur' },
      { id: 'dossier-mansa-musa', type: 'article', title: 'Mansa Moussa : l’homme dont l’or bouleversa la Méditerranée', relationship: 'Dossier d’archive' }
    ],
    sources: [HISTORICAL_SOURCES.al_umari, HISTORICAL_SOURCES.ibn_battuta],
    dossierId: 'dossier-mansa-musa'
  },
  {
    id: 'queen-nzinga',
    name: 'Reine Nzinga Mbande',
    title: 'Souveraine des Royaumes de Ndongo et Matamba',
    birthYear: 1583,
    deathYear: 1663,
    place: 'Cabinda / Matamba',
    region: 'Afrique Centrale (Angola actuel)',
    era: 'Résistances & Traites (1500–1800)',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
    summary: 'Stratège militaire hors-pair et diplomate redoutable, elle défendit l’indépendance de son peuple contre les incursions et le commerce d’esclaves de la couronne portugaise pendant plus de quatre décennies.',
    keyContributions: [
      'Négociation historique de Luanda en 1622 où elle s’assied sur son serviteur pour traiter d’égal à égal avec le gouverneur portugais',
      'Création du sanctuaire de Matamba pour les esclaves en fuite',
      'Alliance tactique avec les Provinces-Unies (Pays-Bas) pour repousser les colonisateurs',
      'Maintien de la souveraineté territoriale de son royaume jusqu’à sa mort paisible à 80 ans'
    ],
    quote: {
      text: 'Nous ne sommes pas des sujets soumis, mais les enfants d’une terre libre qui ne courbera jamais l’échine.',
      context: 'Lettre aux capitaines généraux portugais',
      year: 1641
    },
    connectedEntities: [
      { id: 'royaume-kongo-ndongo', type: 'civilization', title: 'Royaume du Ndongo & Matamba', relationship: 'Reine et cheffe de guerre' },
      { id: 'resistances-antiesclavagistes', type: 'article', title: 'Quatre siècles de résistances marronnes et royales', relationship: 'Contextualisation' }
    ],
    sources: [HISTORICAL_SOURCES.unesco_general_history]
  },
  {
    id: 'frederick-jones',
    name: 'Frederick McKinley Jones',
    title: 'Ingénieur & Pionnier de la Réfrigération Mobile',
    birthYear: 1893,
    deathYear: 1961,
    place: 'Cincinnati / Minneapolis',
    region: 'Amérique du Nord & Diaspora',
    era: 'Inventions & Révolutions Industrielles (1900–1960)',
    image: 'https://upload.wikimedia.org/wikipedia/commons/2/25/Fred_McKinley_Jones_USDA.jpg',
    summary: 'Ingénieur et inventeur autodidacte afro-américain, il a révolutionné le transport de denrées périssables en co-fondant Thermo King et en développant le premier groupe frigorifique mobile et automatisé adapté aux camions routiers.',
    keyContributions: [
      'Co-développement et brevet du premier système de réfrigération mobile amovible pour véhicules (US 2,303,857) en 1939',
      'Invention du groupe frigorifique autonome frontal (Model C / US 2,336,735) en 1941',
      'Obtention de plus de 60 brevets industriels au cours de sa carrière',
      'Premier Afro-Américain récipiendaire de la National Medal of Technology en 1991 à titre posthume'
    ],
    quote: {
      text: 'Croyez en vous-même et ne laissez pas les autres vous dire ce que vous ne pouvez pas faire.',
      context: 'Mémoires et conseils aux jeunes inventeurs',
      year: 1954
    },
    connectedEntities: [
      { id: 'frederick-mckinley-jones-refrigeration-mobile', type: 'article', title: 'Frederick McKinley Jones et la naissance de la réfrigération mobile moderne', relationship: 'Dossier complet' }
    ],
    sources: [],
    dossierId: 'frederick-mckinley-jones-refrigeration-mobile'
  },
  {
    id: 'toussaint-louverture',
    name: 'Toussaint Louverture',
    title: 'Gouverneur Général & Stratège de la Révolution Haïtienne',
    birthYear: 1743,
    deathYear: 1803,
    place: 'Saint-Domingue (Haïti) / Fort de Joux',
    region: 'Caraïbes & Diasporas',
    era: 'Résistances & Révolutions (1750–1850)',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
    summary: 'Ancien esclave affranchi devenu général d’armée, il organisa l’insurrection générale de Saint-Domingue, battit successivement les armées britannique, espagnole et française, et rédigea la constitution autonomiste de 1801 abolissant à jamais la servitude.',
    keyContributions: [
      'Génie militaire ayant triomphé des plus grandes puissances impériales européennes',
      'Rédaction de la Constitution de Saint-Domingue de 1801 instituant l’égalité absolue',
      'Préparation politique et militaire de l’Indépendance d’Haïti proclamée en 1804'
    ],
    quote: {
      text: 'En me renversant, on n’a abattu que le tronc de l’arbre de la liberté des Noirs ; il repoussera par les racines.',
      context: 'Embarquement forcé vers la France',
      year: 1802
    },
    connectedEntities: [
      { id: 'revolution-haitienne-1804', type: 'event', title: 'Révolution Haïtienne (1791–1804)', relationship: 'Général en chef' },
      { id: 'story-haiti-1791', type: 'story', title: '1791 : La nuit du Bois-Caïman', relationship: 'Récit immersif' }
    ],
    sources: [HISTORICAL_SOURCES.toussaint_memoires]
  },
  {
    id: 'patrice-lumumba',
    name: 'Patrice Émery Lumumba',
    title: 'Premier Ministre de la République Démocratique du Congo',
    birthYear: 1925,
    deathYear: 1961,
    place: 'Onalua / Katanga',
    region: 'Afrique Centrale',
    era: 'Indépendances & Révolutions (1960–1990)',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
    summary: 'Héraut de l’émancipation congolaise et panafricaine, son discours historique du 30 juin 1960 devant le roi des Belges dénonça les humiliations coloniales et proclama la dignité inaliénable du peuple congolais.',
    keyContributions: [
      'Fondateur du Mouvement National Congolais (MNC)',
      'Discours de l’indépendance du 30 juin 1960 refusant le paternalisme colonial',
      'Défense acharnée de l’unité territoriale du Congo contre les sécessions téléguidées'
    ],
    quote: {
      text: 'L’Afrique écrira sa propre histoire et elle sera au nord et au sud du Sahara une histoire de gloire et de dignité.',
      context: 'Dernière lettre à son épouse Pauline',
      year: 1961
    },
    connectedEntities: [
      { id: 'independance-congo-1960', type: 'event', title: 'Indépendance du Congo (1960)', relationship: 'Figure centrale' },
      { id: 'thomas-sankara', type: 'person', title: 'Thomas Sankara', relationship: 'Filiation panafricaine' }
    ],
    sources: [HISTORICAL_SOURCES.unesco_general_history]
  },
  {
    id: 'cheikh-anta-diop',
    name: 'Cheikh Anta Diop',
    title: 'Historien, Anthropologue & Physicien nucléaire',
    birthYear: 1923,
    deathYear: 1986,
    place: 'Thieytou / Dakar',
    region: 'Afrique de l’Ouest (Sénégal)',
    era: 'Renaissance scientifique & Panafricanisme (1950–1990)',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=800&q=80',
    summary: 'Savant pluridisciplinaire d’envergure mondiale, il révolutionna l’égyptologie et l’historiographie en rétablissant scientifiquement l’origine africaine et noire de la civilisation pharaonique et en créant le laboratoire de datation au carbone 14 de l’IFAN à Dakar.',
    keyContributions: [
      'Publication magistrale de « Nations nègres et culture » en 1954',
      'Victoire scientifique au Colloque d’égyptologie du Caire en 1974 organisé par l’UNESCO',
      'Fondation du laboratoire de datation radiocarbone de Dakar',
      'Plaidoyer pour un État fédéral d’Afrique noire souverain et industrialisé'
    ],
    quote: {
      text: 'Armez-vous de science jusqu’aux dents et arrachez votre patrimoine culturel !',
      context: 'Conférence de Niamey aux étudiants africains',
      year: 1984
    },
    connectedEntities: [
      { id: 'kemet-egypte-nubie', type: 'civilization', title: 'Kemet & Nubie antique', relationship: 'Chercheur fondamental' },
      { id: 'colloque-caire-1974', type: 'event', title: 'Colloque du Caire de l’UNESCO (1974)', relationship: 'Intervention décisive' }
    ],
    sources: [HISTORICAL_SOURCES.diop_nations_negres, HISTORICAL_SOURCES.unesco_general_history]
  },
  {
    id: 'harriet-tubman',
    name: 'Harriet Tubman',
    title: 'Résistante abolitionniste & Guide du Chemin de Fer Clandestin',
    birthYear: 1822,
    deathYear: 1913,
    place: 'Maryland / Auburn (New York)',
    region: 'Amériques & Diasporas',
    era: 'Abolitionnisme & Guerre Civile (1800–1900)',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80',
    summary: 'Surnommée « Moïse du peuple noir », elle s’échappa de l’esclavage pour mener 13 expéditions périlleuses au Sud, guidant plus de 70 esclaves vers la liberté sans jamais perdre un seul passager.',
    keyContributions: [
      'Chef d’orchestre du réseau clandestin Underground Railroad',
      'Première femme à planifier et diriger un assaut militaire armé lors du raid de Combahee Ferry libérant 750 personnes',
      'Combattante pour les droits civiques et le droit de vote des femmes'
    ],
    quote: {
      text: 'Je n’ai jamais fait dérailler mon train et je n’ai jamais perdu un seul passager.',
      context: 'Déclaration devant la convention abolitionniste',
      year: 1896
    },
    connectedEntities: [
      { id: 'underground-railroad', type: 'event', title: 'Le Chemin de Fer Clandestin', relationship: 'Guide légendaire' }
    ],
    sources: [HISTORICAL_SOURCES.unesco_general_history]
  },
  {
    id: 'aime-cesaire',
    name: 'Aimé Césaire',
    title: 'Poète, Député & Cofondateur de la Négritude',
    birthYear: 1913,
    deathYear: 2008,
    place: 'Basse-Pointe / Fort-de-France (Martinique)',
    region: 'Caraïbes & Diasporas',
    era: 'Pensée anticoloniale & Littérature (1930–2000)',
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800&q=80',
    summary: 'Géant des lettres francophones, auteur du « Cahier d’un retour au pays natal » et du « Discours sur le colonialisme », il forgea le concept de Négritude avec Léopold Sédar Senghor et Léon-Gontran Damas.',
    keyContributions: [
      'Création et théorisation du mouvement de la Négritude dans la revue « L’Étudiant noir »',
      'Rédaction du « Discours sur le colonialisme » (1950), réquisitoire universel',
      'Député de la Martinique pendant 47 ans et maire de Fort-de-France'
    ],
    quote: {
      text: 'Ma négritude n’est pas une pierre, sa surdité ruée contre le clameur du jour ; elle plonge dans la chair rouge du sol.',
      context: 'Cahier d’un retour au pays natal',
      year: 1939
    },
    connectedEntities: [
      { id: 'frantz-fanon', type: 'person', title: 'Frantz Fanon', relationship: 'Professeur et compagnon de pensée' }
    ],
    sources: [HISTORICAL_SOURCES.cesaire_discours_colonialisme]
  }
];

// Historical Events
export const HISTORICAL_EVENTS: HistoricalEvent[] = [
  {
    id: 'kouroukan-fouga-1236',
    title: 'Proclamation de la Charte de Kouroukan Fouga',
    date: '1236',
    yearNumber: 1236,
    place: 'Plaine de Kouroukan Fouga (Kangaba)',
    region: 'Afrique de l’Ouest',
    era: 'Moyen Âge mandingue',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
    summary: 'Fondation constitutionnelle de l’Empire du Mali par Soundiata Keïta et les sages mandingues. Elle codifie les libertés individuelles, la protection des femmes, le droit d’asile et la paix sociale.',
    impact: 'L’un des plus anciens textes constitutionnels et déclarations des droits de l’homme connus au monde.',
    connectedEntities: [
      { id: 'empire-du-mali', type: 'civilization', title: 'Empire du Mali', relationship: 'Texte fondateur' },
      { id: 'mansa-musa', type: 'person', title: 'Mansa Moussa', relationship: 'Héritier institutionnel' }
    ],
    sources: [HISTORICAL_SOURCES.charte_kouroukan]
  },
  {
    id: 'pelerinage-musa-1324',
    title: 'Le Pèlerinage de Mansa Moussa au Caire et à La Mecque',
    date: '1324–1325',
    yearNumber: 1324,
    place: 'Tombouctou → Le Caire → Médine → La Mecque',
    region: 'Afrique de l’Ouest / Moyen-Orient',
    era: 'Âge d’or commercial',
    image: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=800&q=80',
    summary: 'Accompagné d’une caravane de 60 000 personnes et de milliers de lingots d’or, Mansa Moussa dépense et offre tellement d’or en Égypte que le cours du précieux métal est dévalué pendant plus de 12 ans.',
    impact: 'Consécration mondiale du Mali comme empire le plus riche du globe sur l’Atlas Catalan de 1375.',
    connectedEntities: [
      { id: 'mansa-musa', type: 'person', title: 'Mansa Moussa', relationship: 'Organisateur du pèlerinage' },
      { id: 'empire-du-mali', type: 'civilization', title: 'Empire du Mali', relationship: 'Rayonnement mondial' }
    ],
    sources: [HISTORICAL_SOURCES.al_umari, HISTORICAL_SOURCES.ibn_battuta]
  },
  {
    id: 'bois-caiman-1791',
    title: 'La Cérémonie du Bois-Caïman & Insurrection de Saint-Domingue',
    date: 'Nuit du 14 au 22 août 1791',
    yearNumber: 1791,
    place: 'Morne-Rouge, Plaine du Nord (Haïti)',
    region: 'Caraïbes',
    era: 'Révolution Haïtienne',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
    summary: 'Rassemblement solennel guidé par Dutty Boukman et Cécile Fatiman unissant les esclaves marrons sous le serment de vivre libres ou mourir. Le soulèvement général détruit le système esclavagiste de la colonie la plus prospère du globe.',
    impact: 'Déclencheur direct de la première République noire indépendante au monde.',
    connectedEntities: [
      { id: 'toussaint-louverture', type: 'person', title: 'Toussaint Louverture', relationship: 'Commandant issu de la révolte' },
      { id: 'revolution-haitienne-1804', type: 'event', title: 'Indépendance d’Haïti (1804)', relationship: 'Aboutissement' }
    ],
    sources: [HISTORICAL_SOURCES.toussaint_memoires]
  },
  {
    id: 'revolution-haitienne-1804',
    title: 'Proclamation de l’Indépendance d’Haïti',
    date: '1er janvier 1804',
    yearNumber: 1804,
    place: 'Gonaïves (Haïti)',
    region: 'Caraïbes',
    era: 'Lumières & Indépendances',
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80',
    summary: 'Après la victoire éclatante de l’armée indigène à la Bataille de Vertières sur le corps expéditionnaire de Napoléon Bonaparte, Jean-Jacques Dessalines proclame l’indépendance et restitue le nom taïno originel : Haïti.',
    impact: 'Seule révolution d’esclaves victorieuse de l’histoire humaine instaurant une nation souveraine.',
    connectedEntities: [
      { id: 'toussaint-louverture', type: 'person', title: 'Toussaint Louverture', relationship: 'Précurseur' },
      { id: 'story-haiti-1791', type: 'story', title: '1791 : La nuit du Bois-Caïman', relationship: 'Récit lié' }
    ],
    sources: [HISTORICAL_SOURCES.unesco_general_history]
  },
  {
    id: 'bataille-adoua-1896',
    title: 'La Bataille d’Adoua (Éthiopie)',
    date: '1er mars 1896',
    yearNumber: 1896,
    place: 'Adoua, Région du Tigré (Éthiopie)',
    region: 'Corne de l’Afrique',
    era: 'Résistance anticoloniale',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    summary: 'L’empereur Menelik II et l’impératrice Taytu Betul écrasent l’armée coloniale italienne d’invasion, forçant l’Italie à reconnaître la souveraineté inconditionnelle de l’Éthiopie.',
    impact: 'Symbole mondial de la souveraineté africaine indomptée et inspiration pour les mouvements panafricains.',
    connectedEntities: [
      { id: 'civilisation-aksum', type: 'civilization', title: 'Royaume d’Aksoum & Éthiopie', relationship: 'Continuité impériale' }
    ],
    sources: [HISTORICAL_SOURCES.unesco_general_history]
  },
  {
    id: 'revolution-burkina-1983',
    title: 'La Révolution Démocratique et Populaire du Burkina Faso',
    date: '4 août 1983',
    yearNumber: 1983,
    place: 'Ouagadougou',
    region: 'Afrique de l’Ouest',
    era: 'Révolutions & Panafricanisme',
    image: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=800&q=80',
    summary: 'Prise de responsabilité par le Conseil National de la Révolution dirigé par Thomas Sankara. Le pays est rebaptisé Burkina Faso et engage 4 années de réformes radicales.',
    impact: 'Modèle inédit d’autonomie écologique, féministe et économique en Afrique subsaharienne.',
    connectedEntities: [
      { id: 'thomas-sankara', type: 'person', title: 'Thomas Sankara', relationship: 'Chef d’État' },
      { id: 'dossier-thomas-sankara', type: 'article', title: 'Pourquoi le projet politique de Sankara fascine encore', relationship: 'Dossier d’analyse' }
    ],
    sources: [HISTORICAL_SOURCES.sankara_discours_dette]
  }
];

// Great Civilizations
export const CIVILIZATIONS: Civilization[] = [
  {
    id: 'empire-du-mali',
    name: 'Empire du Mali (Manden Kurufaba)',
    periodSpan: '1235 – 1670',
    startYear: 1235,
    endYear: 1670,
    location: 'Afrique de l’Ouest (Mali, Guinée, Sénégal, Gambie, Mauritanie, Niger)',
    capital: 'Niani / Kangaba',
    image: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=800&q=80',
    overview: 'Fondé par Soundiata Keïta après la victoire de Kirina, l’Empire du Mali devint l’un des plus vastes et riches ensembles politiques du monde médiéval, contrôlant les routes transsahariennes de l’or, du sel et du savoir.',
    keyAchievements: [
      'Proclamation de la Charte de Kouroukan Fouga (1236)',
      'Développement de l’Université de Sankoré à Tombouctou et de la bibliothèque de Djenné',
      'Monopole commercial et monétaire équilibrant les échanges transsahariens',
      'Diplomatie internationale avec le Maroc mérinide et l’Égypte mamelouke'
    ],
    notableFigures: ['Soundiata Keïta', 'Mansa Moussa', 'Mansa Souleymane', 'Kankou Moussa'],
    connectedEntities: [
      { id: 'mansa-musa', type: 'person', title: 'Mansa Moussa', relationship: 'Empereur illustre' },
      { id: 'kouroukan-fouga-1236', type: 'event', title: 'Charte de Kouroukan Fouga', relationship: 'Constitution impériale' }
    ],
    sources: [HISTORICAL_SOURCES.ibn_battuta, HISTORICAL_SOURCES.al_umari]
  },
  {
    id: 'empire-songhai',
    name: 'Empire Songhaï',
    periodSpan: '1464 – 1591',
    startYear: 1464,
    endYear: 1591,
    location: 'Boucle du Niger (Mali, Niger, Nigeria, Bénin actuels)',
    capital: 'Gao',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80',
    overview: 'Sous Sonni Ali Ber puis Askia Mohammed, le Songhaï surpassa le Mali en superficie, établissant une administration hautement centralisée, une flotte fluviale permanente et un rayonnement académique exceptionnel à Tombouctou.',
    keyAchievements: [
      'Administration étatique avec ministères spécialisés (Finances, Flotte fluviale, Eaux et Forêts)',
      'Âge d’or des savants de Tombouctou (Ahmed Baba et ses milliers de traités de mathématiques et jurisprudence)',
      'Codification des poids et mesures standardisés sur l’ensemble du territoire'
    ],
    notableFigures: ['Sonni Ali Ber', 'Askia Mohammed Ier', 'Ahmed Baba de Tombouctou'],
    connectedEntities: [
      { id: 'empire-du-mali', type: 'civilization', title: 'Empire du Mali', relationship: 'Empire prédécesseur' }
    ],
    sources: [HISTORICAL_SOURCES.unesco_general_history]
  },
  {
    id: 'royaume-du-kongo',
    name: 'Royaume du Kongo (Kongo dya Ntotila)',
    periodSpan: '1390 – 1914',
    startYear: 1390,
    endYear: 1914,
    location: 'Afrique Centrale (Angola, RDC, République du Congo, Gabon)',
    capital: 'Mbanza Kongo (Sao Salvador)',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
    overview: 'État puissant et structuré avec un système monétaire basé sur le coquillage nzimbu, une métallurgie du cuivre et du fer avancée et des ambassades permanentes envoyées au Vatican et aux Pays-Bas au XVIIe siècle.',
    keyAchievements: [
      'Urbanisme remarquable de la capitale Mbanza Kongo (classée au patrimoine mondial UNESCO)',
      'Relations diplomatiques directes avec Rome et Lisbonne (Lettres du roi Afonso Ier)',
      'Résistances armées héroïques menées notamment par Kimpa Vita (Dona Beatriz)'
    ],
    notableFigures: ['Lukeni lua Nimi', 'Afonso Ier', 'Reine Nzinga', 'Kimpa Vita'],
    connectedEntities: [
      { id: 'queen-nzinga', type: 'person', title: 'Reine Nzinga', relationship: 'Souveraine voisine et alliée' }
    ],
    sources: [HISTORICAL_SOURCES.unesco_general_history]
  },
  {
    id: 'royaume-ashanti',
    name: 'Empire Ashanti (Asanteman)',
    periodSpan: '1701 – 1957',
    startYear: 1701,
    endYear: 1957,
    location: 'Golfe de Guinée (Ghana actuel)',
    capital: 'Kumasi',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
    overview: 'Fédération d’États unie autour du Trône d’Or (Sika Dwa Kofi) sous Osei Tutu Ier et Okomfo Anokye. Célèbre pour son art orfèvre kente, son armée disciplinée et sa résistance tenace contre l’Empire britannique menée par la reine Yaa Asantewaa.',
    keyAchievements: [
      'Système constitutionnel fédéral élaboré et symbolisme du Sika Dwa',
      'Maîtrise inégalée du travail de l’or et des tissus cérémoniels Kente',
      'Guerre du Trône d’Or (1900) menée par la reine-mère Yaa Asantewaa'
    ],
    notableFigures: ['Osei Tutu Ier', 'Okomfo Anokye', 'Reine Yaa Asantewaa'],
    connectedEntities: [],
    sources: [HISTORICAL_SOURCES.unesco_general_history]
  },
  {
    id: 'kemet-egypte-nubie',
    name: 'Kemet & Nubie Antique (Koush / Ta-Seti)',
    periodSpan: '-3100 – 350',
    startYear: -3100,
    endYear: 350,
    location: 'Vallée du Nil (Égypte, Soudan)',
    capital: 'Memphis / Thèbes / Méroé / Napata',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    overview: 'Le berceau civilisationnel de la Vallée du Nil, de la Nubie aux pyramides de Gizeh et de Méroé. La XXVème dynastie des pharaons noirs (Piankhi, Taharqa) unifia le Nil et restaura les arts monumentaux.',
    keyAchievements: [
      'Invention de l’écriture hiéroglyphique et méroïtique',
      'Construction des nécropoles pyramidales de Méroé et du Gebel Barkal',
      'Règne des Candaces (reines guerrières Amanirenas ayant repoussé l’Empire Romain)'
    ],
    notableFigures: ['Pharaon Taharqa', 'Candace Amanirenas', 'Piankhi'],
    connectedEntities: [
      { id: 'cheikh-anta-diop', type: 'person', title: 'Cheikh Anta Diop', relationship: 'Historiographie' }
    ],
    sources: [HISTORICAL_SOURCES.diop_nations_negres]
  }
];

// Documentaries & Watch Section
export const WATCH_MEDIA: VideoContent[] = [
  {
    id: 'doc-sankara-addis',
    title: 'Thomas Sankara : Le Discours d’Addis-Abeba sur la Dette (1987)',
    category: 'archive',
    duration: '07:24',
    year: 1987,
    thumbnail: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    speaker: 'Thomas Sankara',
    summary: 'Archive sonore et visuelle remasterisée du discours prononcé au 23e sommet de l’OUA. Sankara invite les chefs d’État africains à former un front uni de refus de la dette coloniale.',
    chapters: [
      { time: '00:00', title: 'Introduction & Salutations aux pères de l’Afrique' },
      { time: '01:45', title: 'L’origine coloniale de la dette' },
      { time: '03:30', title: 'La proposition du front uni africain' },
      { time: '05:50', title: 'Conclusion : Vivre libre ou mourir pour son peuple' }
    ],
    transcriptPreview: '« Monsieur le Président, nous voulons simplement dire que la dette sous sa forme actuelle est une reconquête savamment organisée de l’Afrique... »',
    fullTranscript: `Monsieur le Président,
Nous voulons simplement dire ici que nous ne pouvons pas payer la dette.
Ceux qui nous ont prêté de l'argent sont ceux-là mêmes qui nous ont colonisés. Ce sont les mêmes qui géraient nos États et nos économies. Ce sont les colonisateurs qui endettaient l'Afrique auprès des bailleurs de fonds, leurs frères et cousins.
Nous étions étrangers à cette dette. Nous ne pouvons donc pas la payer.
La dette, c'est encore le néocolonialisme où les colonialistes se sont transformés en « assistants techniques ». En fait, ce sont des assassins techniques.
Si le Burkina Faso tout seul refuse de payer la dette, je ne serai pas au prochain sommet. Mais avec le soutien de tous, nous pourrons consacrer nos maigres ressources à notre développement.`,
    connectedEntities: [
      { id: 'thomas-sankara', type: 'person', title: 'Thomas Sankara', relationship: 'Orateur' },
      { id: 'dossier-thomas-sankara', type: 'article', title: 'Pourquoi le projet politique de Sankara fascine encore', relationship: 'Dossier d’analyse' }
    ],
    sources: [HISTORICAL_SOURCES.sankara_discours_dette]
  },
  {
    id: 'doc-mansa-musa-or',
    title: 'Mansa Moussa & L’Économie d’Or du Mali Médiéval',
    category: 'documentaire',
    duration: '14:50',
    year: 2024,
    thumbnail: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    speaker: 'Pr. Mamadou Fall & Chercheurs de Tombouctou',
    summary: 'Documentaire immersif explorant les routes de l’or entre les mines de Bouré et Bambouk, la traversée du Sahara jusqu’aux universités de Tombouctou.',
    chapters: [
      { time: '00:00', title: 'L’essor du Manden après Kirina' },
      { time: '04:10', title: 'L’organisation des caravanes de 1324' },
      { time: '09:15', title: 'Tombouctou : capitale des manuscrits' }
    ],
    transcriptPreview: '« Au XIVe siècle, la moitié de l’or circulant dans le bassin méditerranéen et en Europe provenait directement de l’Empire du Mali... »',
    connectedEntities: [
      { id: 'mansa-musa', type: 'person', title: 'Mansa Moussa', relationship: 'Figure principale' },
      { id: 'empire-du-mali', type: 'civilization', title: 'Empire du Mali', relationship: 'Civilisation' }
    ],
    sources: [HISTORICAL_SOURCES.al_umari, HISTORICAL_SOURCES.unesco_general_history]
  },
  {
    id: 'doc-lumumba-juin-1960',
    title: 'Patrice Lumumba : Le Discours du 30 Juin 1960',
    category: 'archive',
    duration: '06:12',
    year: 1960,
    thumbnail: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    speaker: 'Patrice Émery Lumumba',
    summary: 'Enregistrement sonore d’époque restauré du discours d’indépendance du Congo, répliquant au roi Baudouin et affirmant la lutte sanglante pour la liberté.',
    chapters: [
      { time: '00:00', title: 'Combattants de l’indépendance aujourd’hui victorieux' },
      { time: '02:30', title: 'La mémoire des souffrances coloniales' },
      { time: '04:50', title: 'Bâtir un Congo libre, prospère et uni' }
    ],
    transcriptPreview: '« Nous avons connu le travail harassant exigé en échange de salaires qui ne nous permettaient ni de manger à notre faim, ni de nous vêtir... »',
    connectedEntities: [
      { id: 'patrice-lumumba', type: 'person', title: 'Patrice Lumumba', relationship: 'Orateur' }
    ],
    sources: [HISTORICAL_SOURCES.unesco_general_history]
  },
  {
    id: 'doc-cheikh-anta-colloque',
    title: 'Cheikh Anta Diop : La Démonstration du Colloque du Caire (1974)',
    category: 'conference',
    duration: '18:35',
    year: 1974,
    thumbnail: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    speaker: 'Cheikh Anta Diop & Théophile Obenga',
    summary: 'Analyse des actes du colloque de l’UNESCO au Caire où Diop et Obenga présentèrent les preuves linguistiques, anthropologiques et physiques de l’africanité de l’Égypte antique.',
    chapters: [
      { time: '00:00', title: 'Le contexte du projet d’Histoire Générale de l’Afrique' },
      { time: '06:20', title: 'Les tests de mélanine et la linguistique comparée' },
      { time: '14:00', title: 'Le rapport final officiel de l’UNESCO' }
    ],
    transcriptPreview: '« Pour nous, le retour à l’Égypte dans tous les domaines est la condition nécessaire pour réconcilier les civilisations africaines avec l’Histoire... »',
    connectedEntities: [
      { id: 'cheikh-anta-diop', type: 'person', title: 'Cheikh Anta Diop', relationship: 'Savant' },
      { id: 'kemet-egypte-nubie', type: 'civilization', title: 'Kemet & Nubie antique', relationship: 'Sujet d’étude' }
    ],
    sources: [HISTORICAL_SOURCES.diop_nations_negres]
  }
];

// Deep Dossiers & Articles
export const ARTICLE_DOSSIERS: ArticleDossier[] = [
  {
    id: 'dossier-thomas-sankara',
    slug: 'pourquoi-thomas-sankara-fascine-encore',
    title: 'Thomas Sankara : Pourquoi son projet politique continue de fasciner',
    subtitle: 'En quatre années de présidence (1983-1987), le capitaine révolutionnaire a posé les bases d’une gouvernance écologique, féministe et autonome qui résonne avec une acuité brûlante dans le monde contemporain.',
    category: 'Histoire & Pensée politique',
    territory: 'Burkina Faso • Afrique de l’Ouest',
    readTimeMin: 12,
    publishDate: '15 Octobre 2024 (Révision vérifiée)',
    author: {
      name: 'Dr. Amadou Kaboré',
      role: 'Historien & Chercheur associé',
      institution: 'Institut Panafricain des Études Historiques'
    },
    heroImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'Thomas Sankara en 1985, arborant le Faso Dan Fani, tissu traditionnel tissé à la main devenu symbole patriotique.',
    essential: {
      keyFacts: [
        'Vaccination de 2,5 millions d’enfants contre la rougeole et la méningite en seulement une semaine (Campagne commando de 1984 félicitée par l’OMS).',
        'Plantation de plus de 10 millions d’arbres pour stopper l’avancée du désert dans le cadre de la lutte pour l’écologie populaire.',
        'Renoncement total aux privilèges : vente des Mercedes ministérielles au profit de simples Renault 5 et publication publique de son patrimoine modeste.',
        'Plaidoyer pour l’émancipation féminine avec interdiction des mariages forcés et instauration d’une Journée des hommes au marché.',
        'Refus du remboursement de la dette odieuse formulé solennellement à la tribune de l’OUA en juillet 1987.'
      ],
      timeline: [
        { year: '4 Août 1983', event: 'Prise de pouvoir du Conseil National de la Révolution.' },
        { year: '4 Août 1984', event: 'La Haute-Volta est officiellement rebaptisée Burkina Faso.' },
        { year: 'Octobre 1984', event: 'Discours marquant à la 39e session de l’ONU à New York.' },
        { year: '29 Juillet 1987', event: 'Discours historique sur la dette à Addis-Abeba.' },
        { year: '15 Octobre 1987', event: 'Assassinat tragique de Thomas Sankara lors du coup d’État.' }
      ],
      coreQuote: {
        text: 'L’émancipation des femmes n’est pas un acte de charité, c’est une exigence fondamentale pour le triomphe de la Révolution.',
        author: 'Thomas Sankara',
        year: '8 Mars 1987'
      },
      summary: 'Au-delà du mythe, Thomas Sankara a démontré en acte qu’une nation appauvrie par des décennies d’exploitation pouvait atteindre l’autosuffisance alimentaire et la dignité citoyenne sans recourir aux tutelles financières extérieures.'
    },
    sections: [
      {
        heading: '1. Du pays des colonisés à la patrie des hommes intègres',
        subheading: 'La refondation symbolique et matérielle',
        content: `Le 4 août 1984, exactement un an après son accession au pouvoir, Thomas Sankara opère un geste fondateur : il efface des cartes le nom colonial de « Haute-Volta » pour lui substituer le **Burkina Faso**, mariage linguistique du moré (*Burkina*, homme intègre) et du dioula (*Faso*, patrie républicaine), tandis que ses habitants sont désignés en foulfouldé (*Burkinabè*).

Cette transformation n’était pas un simple jeu linguistique. Elle s'accompagnait de la mise en place des Comités de Défense de la Révolution (CDR) et d'un mot d’ordre clair : **« Consommons ce que nous produisons et produisons ce que nous consommons »**. 

Les fonctionnaires d’État avaient l'obligation de porter le *Faso Dan Fani*, le cotonnade locale tissée par les femmes des terroirs burkinabè. Du jour au lendemain, des milliers de tisseuses retrouvèrent une dignité économique et une autonomie financière sans précédent.`,
        quote: {
          text: 'Où est l’impérialisme ? Regardez dans vos assiettes : quand vous mangez le riz importé, vous mangez l’impérialisme.',
          author: 'Thomas Sankara',
          year: '1986'
        }
      },
      {
        heading: '2. L’écologie populaire et la bataille de l’eau',
        subheading: 'Quand reboiser devient un devoir civique',
        content: `Bien avant que les questions environnementales ne deviennent prédominantes dans les chancelleries internationales, Sankara comprit que la survie du Sahel dépendait d'une alliance vitale avec la nature.

Face à la désertification galopante, chaque village burkinabè fut chargé de créer son bosquet villageois. La règle était simple : pour chaque mariage, chaque baptême, chaque cérémonie civique, planter des arbres était un passage obligé. Plus de 10 millions de jeunes plants furent enracinés dans les sols arides.

Dans le même temps, les paysans burkinabè, appuyés par des agronomes patriotes, mirent au point des diguettes filtrantes et des cordons pierreux (techniques traditionnelles améliorées) retenant les eaux de pluie. En moins de trois ans, le pays atteignit le seuil historique de **deux repas garantis par jour et dix litres d'eau potable par habitant**.`,
        archiveSnippet: {
          title: 'Extrait du Plan Quinquennal Populaire (1986)',
          text: 'Le développement ne saurait être octroyé d’en haut par une élite bureaucratique. Il est la somme des efforts conscients et concertés des masses populaires devenues maîtres de leur destin.',
          origin: 'Journal Officiel du Burkina Faso, Archives Nationales de Ouagadougou'
        }
      },
      {
        heading: '3. Le combat féministe au cœur de la révolution',
        subheading: 'Une rupture anthropologique inédite',
        content: `Sankara fut l’un des très rares chefs d’État du XXe siècle à avoir théorisé et appliqué le féminisme d’État comme préalable indispensable au socialisme.

Le 8 mars 1987, devant des milliers de femmes rassemblées au stade de Ouagadougou, il prononce l'un de ses discours les plus marquants : *« La libération de la femme : une exigence du futur »*.

Il y dénonce l’oppression patriarcale avec une franchise rare, condamne sans détour la polygamie forcée, l’excision et le lévirat, et confie des ministères régaliens à des femmes compétentes. Pour sensibiliser les hommes aux charges domestiques invisibles, il instaure une journée où les maris doivent se rendre au marché et préparer le repas familial.`,
        image: {
          url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
          caption: 'Délégation de femmes artisanes burkinabè portant le tissu national lors de la foire artisanale de 1986.'
        }
      },
      {
        heading: '4. La dette odieuse et le testament d’Addis-Abeba',
        subheading: 'Le courage de défier le système financier mondial',
        content: `Le 29 juillet 1987, lors du sommet de l’Organisation de l’Unité Africaine (OUA) à Addis-Abeba, Sankara monte à la tribune sans notes écrites.

Il y prononce un réquisitoire implacable contre le mécanisme de la dette extérieure. Il explique avec une rigueur économique imparable que les prêts accordés à l'Afrique ne servaient qu'à maintenir les pays débiteurs dans un état de vassalité perpétuelle.

*« Si le Burkina Faso tout seul refuse de payer la dette, je ne serai pas au prochain sommet »*, prophétisait-il avec une lucidité tragique. Moins de trois mois plus tard, le 15 octobre 1987, il tombait sous les balles d’un commando putschiste commandité par des intérêts locaux et néocoloniaux.

Mais comme il l'avait lui-même proclamé : **« On peut tuer un homme, mais on ne peut pas tuer des idées. »**`
      }
    ],
    mentionedPeople: [
      { id: 'thomas-sankara', name: 'Thomas Sankara', role: 'Président du CNR (1983-1987)', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80' },
      { id: 'patrice-lumumba', name: 'Patrice Lumumba', role: 'Inspiration anticoloniale', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80' }
    ],
    relatedEvents: [
      { id: 'revolution-burkina-1983', title: 'Révolution burkinabè du 4 août 1983', year: '1983' }
    ],
    continueExploring: [
      { id: 'patrice-lumumba', type: 'person', title: 'Patrice Lumumba', relationship: 'Panafricanisme des origines' },
      { id: 'doc-sankara-addis', type: 'video', title: 'Le Discours d’Addis-Abeba (Archive intégrale)', relationship: 'Vidéo historique' },
      { id: 'path-decolonisation', type: 'path', title: 'Comprendre la décolonisation en 45 minutes', relationship: 'Parcours KAMA' }
    ],
    sources: [
      HISTORICAL_SOURCES.sankara_discours_dette,
      HISTORICAL_SOURCES.unesco_general_history
    ]
  },
  {
    id: 'dossier-mansa-musa',
    slug: 'mansa-moussa-richesse-mali-medieval',
    title: 'Mansa Moussa : L’or, le savoir et l’épopée du Mali médiéval',
    subtitle: 'Comment le souverain du Manden a placé l’Afrique subsaharienne au centre de la géopolitique mondiale du XIVe siècle et bâti la cité du savoir à Tombouctou.',
    category: 'Civilisations & Économie médiévale',
    territory: 'Empire du Mali • Sahel',
    readTimeMin: 14,
    publishDate: '20 Novembre 2024 (Révision vérifiée)',
    author: {
      name: 'Pr. Sekou Traoré',
      role: 'Directeur d’Études Médiévales Africaines',
      institution: 'Centre des Manuscrits Ahmed Baba de Tombouctou'
    },
    heroImage: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'Représentation de Mansa Moussa tenant un lingot d’or sur l’Atlas Catalan d’Abraham Cresques (1375, BNF).',
    essential: {
      keyFacts: [
        'Souverain de l’Empire du Mali de 1312 à 1337, contrôlant un territoire de plus de 1,2 million de kilomètres carrés.',
        'Production et contrôle de plus de la moitié de l’or consommé dans l’Ancien Monde au XIVe siècle.',
        'Pèlerinage à La Mecque en 1324 avec une escorte de 60 000 dignitaires et soldats distribuant des milliers de pièces d’or.',
        'Construction de la prestigieuse Mosquée Djingareyber et mécénat de l’Université de Sankoré attirant 25 000 étudiants.',
        'Constitution d’une des plus vastes collections de manuscrits scientifiques et philosophiques d’Afrique.'
      ],
      timeline: [
        { year: '1312', event: 'Couronnement de Mansa Moussa après le départ d’Abubakari II en expédition atlantique.' },
        { year: '1324', event: 'Arrivée triomphale au Caire et distribution massive d’or.' },
        { year: '1325', event: 'Retour au Mali accompagné de l’architecte andalou Abou Ishaq es-Sahéli.' },
        { year: '1327', event: 'Inauguration de la Grande Mosquée de Djingareyber à Tombouctou.' },
        { year: '1375', event: 'Immortalisation sur l’Atlas Catalan conservé à la cour de France.' }
      ],
      coreQuote: {
        text: 'Cet homme a répandu sur Le Caire un flot de générosité tel qu’il a fait chuter la valeur de l’or pendant douze années consécutives.',
        author: 'Shihab al-Din al-Umari, chroniqueur égyptien',
        year: '1342'
      },
      summary: 'Mansa Moussa n’était pas seulement un roi riche : il utilisa sa fortune pour transformer Tombouctou et Gao en phares mondiaux des mathématiques, de la médecine, de l’astronomie et du droit.'
    },
    sections: [
      {
        heading: '1. La géographie de l’abondance mandingue',
        subheading: 'L’axe d’or entre le fleuve Niger et la Méditerranée',
        content: `À son apogée sous Mansa Moussa, l’Empire du Mali s’étendait sur plus de 3 000 kilomètres, de la côte atlantique du Sénégal actuel jusqu’aux confins du fleuve Niger à Gao, englobant les riches gisements aurifères du Bouré et du Bambouk.

Contrairement aux mythes occidentaux présentant le Moyen Âge africain comme isolé, le Mali était une plaque tournante interconnectée. Des caravanes de milliers de dromadaires reliaient quotidiennement Walata, Niani et Tombouctou à Marrakech, Tunis, Tripoli et Le Caire.`,
        quote: {
          text: 'Il y a une sécurité absolue dans tout le pays. Ni voyageur ni résident n’y craint les voleurs ni les pillards.',
          author: 'Ibn Battuta',
          year: '1352'
        }
      },
      {
        heading: '2. L’expédition de 1324 qui fit vaciller l’économie égyptienne',
        subheading: 'Un pèlerinage diplomatique hors-norme',
        content: `En 1324, Mansa Moussa quitte Niani à la tête d’un cortège sans précédent dans les annales médiévales : près de 60 000 personnes, des centaines de hérauts vêtus de soies précieuses et 80 dromadaires transportant chacun plus de 130 kg de poussière d’or pur.

Lors de son séjour au Caire auprès du sultan mamelouk An-Nâsir Muhammad, Moussa distribue des aumônes si astronomiques à tous les officiers, émirs et pauvres de la ville que le cours du dinar d’or s’effondre durablement. L’historien Al-Umari, visitant Le Caire douze ans plus tard, constatera que les prix ne s’étaient toujours pas totalement remis de ce choc de liquidités.`,
        archiveSnippet: {
          title: 'Extrait de la Masalik al-Absar',
          text: 'L’or avait une valeur très élevée en Égypte jusqu’à leur arrivée cette année-là. Le mithqal d’or ne descendait jamais au-dessous de vingt-cinq dirhams. Mais depuis lors, sa valeur tomba et le cours baissa.',
          origin: 'Manuscrit arabe de Shihab al-Din al-Umari, 1342'
        }
      },
      {
        heading: '3. Tombouctou : la cité des 25 000 étudiants',
        subheading: 'L’architecture de terre et l’université de Sankoré',
        content: `Au retour de La Mecque, Mansa Moussa recrute le célèbre poète et architecte andalou Abou Ishaq es-Sahéli. Ensemble, ils conçoivent la Grande Mosquée Djingareyber et le palais impérial de Madougou, introduisant la technique raffinée de la brique de terre crue renforcée de charpentes en bois de palmier (*banco*).

Autour de la Mosquée de Sankoré s’épanouit une université autonome organisée en facultés. On y venait de tout le monde islamique pour étudier la théologie, mais aussi l’astronomie, l’algèbre, la chirurgie ophtalmique et la philosophie juridique. Tombouctou devint le centre d’un marché florissant du livre : posséder des manuscrits y était plus prisé que posséder de l’or.`
      }
    ],
    mentionedPeople: [
      { id: 'mansa-musa', name: 'Mansa Moussa', role: '10e Mansa du Mali', image: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=300&q=80' }
    ],
    relatedEvents: [
      { id: 'pelerinage-musa-1324', title: 'Pèlerinage au Caire de 1324', year: '1324' },
      { id: 'kouroukan-fouga-1236', title: 'Charte de Kouroukan Fouga', year: '1236' }
    ],
    continueExploring: [
      { id: 'empire-songhai', type: 'civilization', title: 'Empire Songhaï', relationship: 'Civilisation successeure' },
      { id: 'doc-mansa-musa-or', type: 'video', title: 'Mansa Moussa & L’Économie d’Or', relationship: 'Documentaire vidéo' }
    ],
    sources: [
      HISTORICAL_SOURCES.al_umari,
      HISTORICAL_SOURCES.ibn_battuta,
      HISTORICAL_SOURCES.unesco_general_history
    ]
  }
];

// Guided KAMA Paths
export const KAMA_PATHS: KamaPath[] = [
  {
    id: 'path-decolonisation',
    title: 'Comprendre la décolonisation et le panafricanisme en 45 minutes',
    tagline: 'Des pères fondateurs aux révolutions populaires : un voyage en 6 étapes clés à travers les luttes de souveraineté.',
    totalSteps: 6,
    estimatedMinutes: 45,
    level: 'Découverte',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    steps: [
      {
        stepNumber: 1,
        title: 'Le réveil des consciences : Césaire et la Négritude',
        description: 'Découvrez comment la poésie et la philosophie ont forgé les armes de l’émancipation psychique.',
        targetType: 'person',
        targetId: 'aime-cesaire',
        mediaType: 'article'
      },
      {
        stepNumber: 2,
        title: '1960 : L’année des indépendances et le cri de Lumumba',
        description: 'Écoutez l’archive sonore du discours du 30 juin 1960 qui marqua la rupture avec le paternalisme colonial.',
        targetType: 'video',
        targetId: 'doc-lumumba-juin-1960',
        mediaType: 'video'
      },
      {
        stepNumber: 3,
        title: 'La réhabilitation historique : Cheikh Anta Diop',
        description: 'Comprenez pourquoi la science et l’égyptologie ont été au cœur de la renaissance africaine.',
        targetType: 'person',
        targetId: 'cheikh-anta-diop',
        mediaType: 'archive'
      },
      {
        stepNumber: 4,
        title: 'La Révolution du Burkina Faso : Thomas Sankara',
        description: 'Analysez l’expérience inédite d’auto-suffisance alimentaire, d’écologie et d’intégrité républicaine.',
        targetType: 'article',
        targetId: 'dossier-thomas-sankara',
        mediaType: 'article'
      },
      {
        stepNumber: 5,
        title: 'Le refus de la dette odieuse à Addis-Abeba',
        description: 'Visionnez le discours historique du 29 juillet 1987 devant les chefs d’État de l’OUA.',
        targetType: 'video',
        targetId: 'doc-sankara-addis',
        mediaType: 'video'
      },
      {
        stepNumber: 6,
        title: 'Le Panafricanisme au XXIe siècle',
        description: 'Synthèse des héritages et perspectives contemporaines pour la jeunesse et les diasporas.',
        targetType: 'article',
        targetId: 'dossier-thomas-sankara',
        mediaType: 'article'
      }
    ]
  },
  {
    id: 'path-grands-empires',
    title: 'Les Grands Empires Africains : Du Nil au fleuve Niger',
    tagline: 'Explorez 3 000 ans d’innovations politiques, de chefs-d’œuvre architecturaux et de commerce mondial.',
    totalSteps: 5,
    estimatedMinutes: 50,
    level: 'Intermédiaire',
    image: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=800&q=80',
    steps: [
      {
        stepNumber: 1,
        title: 'Kemet et les Pharaons noirs de Nubie',
        description: 'La civilisation millénaire de la Vallée du Nil et la 25e dynastie méroïtique.',
        targetType: 'civilization',
        targetId: 'kemet-egypte-nubie',
        mediaType: 'map'
      },
      {
        stepNumber: 2,
        title: 'La Charte de Kouroukan Fouga (1236)',
        description: 'L’une des plus anciennes constitutions humaines instituant les libertés fondamentales.',
        targetType: 'event',
        targetId: 'kouroukan-fouga-1236',
        mediaType: 'archive'
      },
      {
        stepNumber: 3,
        title: 'L’Âge d’Or du Mali et Mansa Moussa',
        description: 'Le pèlerinage de 1324 et l’effervescence intellectuelle de Tombouctou.',
        targetType: 'person',
        targetId: 'mansa-musa',
        mediaType: 'article'
      },
      {
        stepNumber: 4,
        title: 'L’Empire Songhaï et l’administration moderne',
        description: 'La cité académique de Gao et les traités scientifiques d’Ahmed Baba.',
        targetType: 'civilization',
        targetId: 'empire-songhai',
        mediaType: 'article'
      },
      {
        stepNumber: 5,
        title: 'Le Royaume du Kongo et la reine Nzinga',
        description: 'Diplomatie atlantique et résistance militaire face aux convoitises coloniales.',
        targetType: 'person',
        targetId: 'queen-nzinga',
        mediaType: 'article'
      }
    ]
  }
];

// Immersive KAMA Stories
export const KAMA_STORIES: KamaStory[] = [
  {
    id: 'story-haiti-1791',
    year: '1791',
    title: 'La Nuit où Saint-Domingue bascula',
    tagline: 'Du serment sacré du Bois-Caïman à la première république noire libre du monde (1804).',
    location: 'Plaine du Nord, Saint-Domingue (Haïti)',
    heroImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
    chapters: [
      {
        title: 'I. L’Enfer de la perle des Antilles',
        text: 'En 1791, la colonie française de Saint-Domingue est le territoire le plus rentable de la planète. Elle produit à elle seule la moitié du café et du sucre consommés en Europe, au prix du sang et du supplice de près de 500 000 esclaves noirs soumis au Code Noir le plus féroce.',
        mapLocation: 'Cap-Français (Cap-Haïtien)'
      },
      {
        title: 'II. Le Serment sous l’orage du Bois-Caïman',
        text: 'Dans la nuit du 14 au 22 août 1791, au cœur d’une clairière secrète balayée par les éclairs, des délégués de dizaines de plantations se rassemblent. Dutty Boukman, prêtre vaudou et chef marron, et Cécile Fatiman président la cérémonie. Un serment solennel est prononcé : « Vivre libre ou mourir ».',
        quote: '« Le Bon Dieu qui a créé le soleil qui nous éclaire d’en haut, qui soulève la mer et qui fait gronder l’orage... nous ordonne d’écouter la voix de la liberté qui chante dans nos cœurs ! »',
        quoteAuthor: 'Prière de Dutty Boukman (1791)'
      },
      {
        title: 'III. L’Embrasement de la Plaine du Nord',
        text: 'En quelques heures, les flammes illuminent l’horizon. Plus de mille plantations de canne à sucre sont incendiées. Les esclaves brisent leurs fers et constituent l’Armée Indigène. Parmi eux émerge un génie tactique hors du commun : Toussaint Louverture.',
        mediaUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80',
        mediaCaption: 'Tableau historique évoquant les troupes de la liberté marchant vers Vertières.'
      },
      {
        title: 'IV. Vertières et l’Aurore de 1804',
        text: 'Le 18 novembre 1803, à la Bataille de Vertières, les généraux indigènes commandés par Jean-Jacques Dessalines terrassent les vétérans de l’armée napoléonienne du général Rochambeau. Le 1er janvier 1804, aux Gonaïves, l’indépendance est solennellement proclamée. Haïti devient la première nation noire libre au monde.',
        quote: '« Pour le drapeau, pour la patrie, mourir est beau ! »',
        quoteAuthor: 'Serment des officiers haïtiens à l’Arcahaie'
      }
    ],
    sources: [
      HISTORICAL_SOURCES.toussaint_memoires,
      HISTORICAL_SOURCES.unesco_general_history
    ]
  }
];

// Pre-seeded community archives for Vercel Blob exploration
export const COMMUNITY_ARCHIVES: CommunityArchiveItem[] = [
  {
    id: 'arch-timbuktu-astronomy',
    title: 'Manuscrit d’astronomie et de trigonométrie de Tombouctou (Fonds Ahmed Baba)',
    category: 'manuscript',
    fileUrl: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=800&q=80',
    yearPeriod: 'XVIe siècle (1580)',
    territory: 'Tombouctou, Mali',
    description: 'Traité rédigé en graphie maghribi détaillant les trajectoires planétaires et les méthodes de calcul des éclipses solaires par les savants du Songhaï.',
    contributorName: 'Dr. Mariam Cissé',
    sourceAttribution: 'Institut des Hautes Études Islamiques Ahmed Baba / Numérisation SAVAMA-DCI',
    uploadedAt: '2026-08-10',
    verified: true
  },
  {
    id: 'arch-sankara-radio-audio',
    title: 'Enregistrement radio original : Proclamation du Conseil National de la Révolution',
    category: 'audio',
    fileUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    yearPeriod: '1983',
    territory: 'Burkina Faso',
    description: 'Bande magnétique 1/4 pouce restaurée de la première allocution radiodiffusée le 4 août 1983 à 22h00.',
    contributorName: 'Archives Révolutionnaires Ouaga',
    sourceAttribution: 'Radio Télévision du Burkina (RTB) / Don associatif',
    uploadedAt: '2026-08-14',
    verified: true
  },
  {
    id: 'arch-haiti-constitution-1801',
    title: 'Fac-similé de la Constitution autonomiste de Saint-Domingue promulguée par Toussaint Louverture',
    category: 'document',
    fileUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80',
    yearPeriod: '1801',
    territory: 'Caraïbes / Haïti',
    description: 'Document officiel gravé au Cap-Français établissant pour la première fois que « tous les hommes y naissent, vivent et meurent libres et français ».',
    contributorName: 'Société d’Histoire d’Haïti',
    sourceAttribution: 'Archives Départementales de Port-au-Prince',
    uploadedAt: '2026-08-16',
    verified: true
  }
];

export const INITIAL_COMMUNITY_ARCHIVES: CommunityArchiveUpload[] = [
  {
    id: 'arch-timbuktu-astronomy',
    title: 'Manuscrit d’astronomie et de trigonométrie de Tombouctou (Fonds Ahmed Baba)',
    contributorName: 'Dr. Mariam Cissé',
    mediaType: 'document',
    url: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=800&q=80',
    historicalPeriod: 'XVIe siècle (1580)',
    region: 'Tombouctou, Mali',
    description: 'Traité rédigé en graphie maghribi détaillant les trajectoires planétaires et les méthodes de calcul des éclipses solaires par les savants du Songhaï.',
    sourceAttribution: 'Institut des Hautes Études Islamiques Ahmed Baba / Numérisation SAVAMA-DCI',
    uploadedAt: '2026-08-10',
    fileSize: '4.8 MB'
  },
  {
    id: 'arch-sankara-radio-audio',
    title: 'Enregistrement radio original : Proclamation du Conseil National de la Révolution',
    contributorName: 'Archives Révolutionnaires Ouaga',
    mediaType: 'audio',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    historicalPeriod: '1983',
    region: 'Burkina Faso',
    description: 'Bande magnétique 1/4 pouce restaurée de la première allocution radiodiffusée le 4 août 1983 à 22h00.',
    sourceAttribution: 'Radio Télévision du Burkina (RTB) / Don associatif',
    uploadedAt: '2026-08-14',
    fileSize: '18.2 MB'
  },
  {
    id: 'arch-haiti-constitution-1801',
    title: 'Fac-similé de la Constitution autonomiste de Saint-Domingue promulguée par Toussaint Louverture',
    contributorName: 'Société d’Histoire d’Haïti',
    mediaType: 'document',
    url: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80',
    historicalPeriod: '1801',
    region: 'Caraïbes / Haïti',
    description: 'Document officiel gravé au Cap-Français établissant pour la première fois que « tous les hommes y naissent, vivent et meurent libres et français ».',
    sourceAttribution: 'Archives Départementales de Port-au-Prince',
    uploadedAt: '2026-08-16',
    fileSize: '7.1 MB'
  }
];
