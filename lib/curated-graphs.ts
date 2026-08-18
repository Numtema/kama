import { TopicGraphData } from './types';

export const CURATED_TOPIC_GRAPHS: Record<string, TopicGraphData> = {
  slavery: {
    query: 'slavery',
    title: 'Esclavage & Traites Négrières Transatlantiques',
    subtitle: 'Décomposition historique systémique : de la traite transsaharienne et atlantique aux révoltes et à l’abolitionnisme caribéen.',
    totalBranches: 18,
    totalConnections: 42,
    rootNode: {
      id: 'root-slavery',
      label: 'Esclavage, Traites & Résistances',
      category: 'Sujet Central',
      description: 'Système mondial d’asservissement, déportation transatlantique et insurrections antiesclavagistes des cales aux révolutions caribéennes.',
      level: 0,
      itemCounts: {
        articles: 14,
        characters: 28,
        documentaries: 9,
        archives: 42,
        conferences: 6,
        total: 99
      },
      children: [
        {
          id: 'branch-africa',
          label: 'Afrique : Royaumes, Captivité & Diplomatie',
          category: 'Origines & Continents',
          description: 'Structures politiques africaines, résistance de la reine Nzinga du Ndongo, et charte impériale de Kouroukan Fouga interdisant la servitude des hommes libres.',
          level: 1,
          itemCounts: {
            articles: 4,
            characters: 8,
            documentaries: 3,
            archives: 12,
            conferences: 2,
            total: 29
          },
          highlightedEntities: [
            { id: 'reine-nzinga', type: 'person', name: 'Reine Nzinga Mbandi', subtitle: 'Souveraine du Ndongo et du Matamba contre les négriers portugais' },
            { id: 'charte-kouroukan-fouga', type: 'event', name: 'Charte du Manden (1236)', subtitle: 'Déclaration ancestrale proscrivant les sévices et la réduction en esclavage' },
            { id: 'royaume-kongo', type: 'civilization', name: 'Royaume Kongo', subtitle: 'Lettres d’Alfonso Ier dénonçant le dépeuplement par la traite' }
          ],
          children: [
            {
              id: 'sub-kingdoms',
              label: 'Royaumes & Géopolitique Côtière',
              category: 'Gouvernance',
              description: 'Équilibres militaires côtiers face aux comptoirs européens de Ouidah, Elmina et Gorée.',
              level: 2,
              itemCounts: { articles: 2, characters: 4, documentaries: 1, archives: 6, conferences: 1, total: 14 }
            },
            {
              id: 'sub-charters',
              label: 'Chartes Morales & Refus de Servitude',
              category: 'Droit Coutumier',
              description: 'Textes juridiques précoloniaux sanctuarisant la dignité humaine.',
              level: 2,
              itemCounts: { articles: 2, characters: 4, documentaries: 2, archives: 6, conferences: 1, total: 15 }
            }
          ]
        },
        {
          id: 'branch-atlantic',
          label: 'Passage du Milieu & Archives Maritimes',
          category: 'Traite Transatlantique',
          description: 'Journaux de bord des navires négriers de Nantes, Liverpool et Bordeaux, mutineries à bord et capture de l’Amistad.',
          level: 1,
          itemCounts: {
            articles: 5,
            characters: 7,
            documentaries: 3,
            archives: 18,
            conferences: 2,
            total: 35
          },
          highlightedEntities: [
            { id: 'armateurs-nantes-liverpool', type: 'archive', name: 'Registres de la Compagnie des Indes', subtitle: 'Armement des navires négriers et cargaisons de captifs' },
            { id: 'mutinerie-amistad', type: 'event', name: 'Insurrection de La Amistad (1839)', subtitle: 'Soulèvement de Joseph Cinqué et procès retentissant' },
            { id: 'olaudah-equiano', type: 'person', name: 'Olaudah Equiano', subtitle: 'Récit autobiographique du Passage du Milieu (1789)' }
          ],
          children: [
            {
              id: 'sub-ship-logs',
              label: 'Journaux de Bord & Registres Notariés',
              category: 'Archives Maritimes',
              description: 'Statistiques portuaires de Nantes, La Rochelle, Bristol et Liverpool.',
              level: 2,
              itemCounts: { articles: 2, characters: 2, documentaries: 1, archives: 12, conferences: 1, total: 18 }
            },
            {
              id: 'sub-maritime-mutinies',
              label: 'Mutineries en Haute Mer',
              category: 'Résistance Maritime',
              description: 'Prises de contrôle de navires et suicides collectifs rituels.',
              level: 2,
              itemCounts: { articles: 3, characters: 5, documentaries: 2, archives: 6, conferences: 1, total: 17 }
            }
          ]
        },
        {
          id: 'branch-americas',
          label: 'Amériques & Caraïbes : Révolutions & Marronnage',
          category: 'Insurrections & Émancipations',
          description: 'Cérémonie du Bois-Caïman (1791), Première République Noire d’Haïti (1804), Quilombos du Brésil et chemin de fer clandestin (Underground Railroad).',
          level: 1,
          itemCounts: {
            articles: 5,
            characters: 13,
            documentaries: 3,
            archives: 12,
            conferences: 2,
            total: 35
          },
          highlightedEntities: [
            { id: 'toussaint-louverture', type: 'person', name: 'Toussaint Louverture', subtitle: 'Général en chef de Saint-Domingue et architecte de la liberté' },
            { id: 'harriet-tubman', type: 'person', name: 'Harriet Tubman', subtitle: 'Commandante de l’Underground Railroad et libératrice d’asservis' },
            { id: 'zumbi-dos-palmares', type: 'person', name: 'Zumbi dos Palmares', subtitle: 'Chef suprême de la république libre de marrons au Brésil' },
            { id: 'bois-caiman', type: 'story', name: 'Nuit de Bois-Caïman (1791)', subtitle: 'Pacte spirituel et soulèvement général à Saint-Domingue' }
          ],
          children: [
            {
              id: 'sub-haiti-1804',
              label: 'Haïti 1804 : La Première République Noire',
              category: 'Révolution Souveraine',
              description: 'Bataille de Vertières et proclamation de Jean-Jacques Dessalines.',
              level: 2,
              itemCounts: { articles: 3, characters: 6, documentaries: 2, archives: 6, conferences: 1, total: 18 }
            },
            {
              id: 'sub-quilombos',
              label: 'Quilombos & Marronnage Forestier',
              category: 'Sanctuaires Libres',
              description: 'Palmares au Brésil, marrons de la Jamaïque et de Guyane.',
              level: 2,
              itemCounts: { articles: 2, characters: 7, documentaries: 1, archives: 6, conferences: 1, total: 17 }
            }
          ]
        }
      ]
    },
    sources: [
      {
        id: 'src-unesco-traite-vol5',
        title: 'Histoire Générale de l’Afrique, Vol. V : L’Afrique du XVIe au XVIIIe siècle',
        author: 'UNESCO / B. A. Ogot',
        year: '1999',
        type: 'academic',
        publisher: 'Éditions UNESCO / Présence Africaine',
        archiveInstitution: 'UNESCO Publishing Archives',
        url: 'https://unesdoc.unesco.org/ark:/48223/pf0000184282',
        excerpt: 'La traite transatlantique a profondément restructuré les équilibres démographiques côtiers tout en suscitant des résistances armées continues le long du littoral ouest-africain.'
      },
      {
        id: 'src-equiano-1789',
        title: 'The Interesting Narrative of the Life of Olaudah Equiano, or Gustavus Vassa, the African',
        author: 'Olaudah Equiano',
        year: '1789',
        type: 'primary',
        archiveInstitution: 'British Library (Add MS 4384)',
        url: 'https://www.bl.uk/collection-items/the-interesting-narrative-of-the-life-of-olaudah-equiano',
        excerpt: 'I was immediately handled and tossed up to see if I were sound, by some of the crew; and I was now persuaded that I had gotten into a world of bad spirits...'
      },
      {
        id: 'src-bois-caiman-dossier',
        title: 'Procès-verbaux et récits de l’insurrection de Saint-Domingue d’août 1791',
        author: 'Archives Nationales d’Outre-Mer (ANOM)',
        year: '1791',
        type: 'archive',
        archiveInstitution: 'ANOM Aix-en-Provence (Fonds Colonies F/3/197)',
        url: 'http://anom.archivesnationales.culture.gouv.fr',
        excerpt: 'Les esclaves des habitations du Nord se sont assemblés sous la direction de Boukman au Bois-Caïman pour jurer de vivre libres ou mourir.'
      },
      {
        id: 'src-charte-manden-kouroukan',
        title: 'Reconstitution intégrale de la Charte de Kouroukan Fouga (1236)',
        author: 'Youssouf Tata Cissé & Wa Kamissoko',
        year: '1988',
        type: 'academic',
        publisher: 'Karthala - SCOA',
        excerpt: 'Article 20 : Ne maltraitez pas les captifs... L’homme en tant qu’individu, fait d’os et de chair, se nourrit d’aliments et de boissons; son âme cependant vit de liberté.'
      }
    ]
  },
  anticolonialisme: {
    query: 'anticolonialisme',
    title: 'Anticolonialisme & Mouvements de Libération Panafricains',
    subtitle: 'Mouvements d’indépendance, souveraineté et congrès panafricains.',
    totalBranches: 14,
    totalConnections: 32,
    rootNode: {
      id: 'root-anticolonialisme',
      label: 'Anticolonialisme & Panafricanisme',
      category: 'Sujet Central',
      description: 'Luttes d’indépendance, souveraineté économique, pensée décoloniale et congrès panafricains du XXe siècle.',
      level: 0,
      itemCounts: {
        articles: 16,
        characters: 32,
        documentaries: 11,
        archives: 38,
        conferences: 9,
        total: 106
      },
      children: [
        {
          id: 'branch-panafricanisme',
          label: 'Congrès Panafricains & Intellectuels',
          category: 'Idéologie & Réseaux',
          description: 'De Manchester (1945) à Accra (1958) : W.E.B. Du Bois, Kwame Nkrumah, Frantz Fanon et Aimé Césaire.',
          level: 1,
          itemCounts: { articles: 6, characters: 12, documentaries: 4, archives: 14, conferences: 4, total: 40 },
          highlightedEntities: [
            { id: 'kwame-nkrumah', type: 'person', name: 'Kwame Nkrumah', subtitle: 'Père de l’indépendance du Ghana et théoricien des États-Unis d’Afrique' },
            { id: 'frantz-fanon', type: 'person', name: 'Frantz Fanon', subtitle: 'Auteur des Damnés de la Terre et médecin révolutionnaire' }
          ]
        },
        {
          id: 'branch-independances',
          label: 'Guerres de Libération & Révolutionnaires',
          category: 'Fronts Militaires',
          description: 'PAIGC en Guinée-Bissau, FLN en Algérie, MPLA en Angola, et l’expérience révolutionnaire du Burkina Faso (Sankara).',
          level: 1,
          itemCounts: { articles: 6, characters: 14, documentaries: 5, archives: 16, conferences: 3, total: 44 },
          highlightedEntities: [
            { id: 'thomas-sankara', type: 'person', name: 'Thomas Sankara', subtitle: 'Président du Burkina Faso, champion de l’autosuffisance et pourfendeur de la dette' },
            { id: 'amilcar-cabral', type: 'person', name: 'Amílcar Cabral', subtitle: 'Stratège théoricien de la libération de la Guinée-Bissau et du Cap-Vert' }
          ]
        }
      ]
    },
    sources: [
      {
        id: 'src-fanon-damnes',
        title: 'Les Damnés de la Terre',
        author: 'Frantz Fanon',
        year: '1961',
        type: 'academic',
        publisher: 'François Maspero',
        excerpt: 'La décolonisation est véritablement création d’hommes nouveaux. Mais cette création ne reçoit sa légitimité d’aucune puissance surnaturelle...'
      },
      {
        id: 'src-sankara-discours-dette',
        title: 'Discours sur la dette au 24e Sommet de l’OUA à Addis-Abeba',
        author: 'Thomas Sankara',
        year: '1987',
        type: 'primary',
        archiveInstitution: 'Archives Nationales du Burkina Faso & Archives OUA',
        excerpt: 'La dette sous sa forme actuelle est une reconquête savamment organisée de l’Afrique. Si nous refusons de payer, nos bailleurs de fonds ne mourront pas. Si nous payons, nous, nous mourrons.'
      }
    ]
  }
};
