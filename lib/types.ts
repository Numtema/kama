export type EntityType = 
  | 'person'
  | 'event'
  | 'civilization'
  | 'place'
  | 'period'
  | 'article'
  | 'video'
  | 'archive'
  | 'book'
  | 'path'
  | 'story';

export type MandatorySourceTier = 'primary' | 'academic' | 'further_exploration';

export type SourceType = 'primary' | 'academic' | 'archive' | 'oral' | 'museum' | 'book' | 'institutional' | 'further_exploration';

export interface StandardizedSource {
  id: string;
  title: string;
  author: string;
  year: number | string;
  tier: MandatorySourceTier; // 'primary' | 'academic' | 'further_exploration'
  format: 'Manuscrit original' | 'Ouvrage de recherche' | 'Article scientifique' | 'Archive audiovisuelle' | 'Document officiel' | 'Collection muséale' | 'Conférence académique' | 'Base universitaire';
  institution?: string;
  archiveId?: string;
  doiOrIsbn?: string;
  url?: string;
  excerpt?: string;
  criticalAnalysis?: string;
}

export interface GraphItemCounts {
  articles: number;
  characters: number;
  documentaries: number;
  archives: number;
  conferences: number;
  total: number;
}

export interface GraphNodeBranch {
  id: string;
  label: string;
  description: string;
  category: string;
  parentId?: string;
  level: number; // 0: Root query, 1: Main branch, 2: Sub-topic, 3: Specific node/archive
  itemCounts: GraphItemCounts;
  highlightedEntities?: {
    id: string;
    name: string;
    type: EntityType;
    subtitle?: string;
    image?: string;
  }[];
  sources?: HistoricalSource[];
  children?: GraphNodeBranch[];
}

export interface TopicGraphData {
  query: string;
  title: string;
  subtitle: string;
  totalBranches: number;
  totalConnections: number;
  rootNode: GraphNodeBranch;
  sources: HistoricalSource[];
}

export interface HistoricalSource {
  id: string;
  title: string;
  author: string;
  year: number | string;
  type: SourceType;
  publisher?: string;
  archiveInstitution?: string;
  url?: string;
  excerpt?: string;
  reliabilityNote?: string;
}

export interface RelatedEntityRef {
  id: string;
  type: EntityType;
  title: string;
  subtitle?: string;
  image?: string;
  relationship: string;
}

export interface HistoricalPerson {
  id: string;
  name: string;
  title: string;
  birthYear: number | string;
  deathYear?: number | string;
  place: string;
  region: string;
  era: string;
  image: string;
  summary: string;
  keyContributions: string[];
  quote: {
    text: string;
    context: string;
    year: number | string;
  };
  connectedEntities: RelatedEntityRef[];
  sources: HistoricalSource[];
  dossierId?: string;
}

export interface HistoricalEvent {
  id: string;
  title: string;
  date: string;
  yearNumber: number;
  place: string;
  region: string;
  era: string;
  image: string;
  summary: string;
  impact: string;
  connectedEntities: RelatedEntityRef[];
  sources: HistoricalSource[];
  articleId?: string;
}

export interface Civilization {
  id: string;
  name: string;
  periodSpan: string;
  startYear: number;
  endYear: number;
  location: string;
  capital: string;
  image: string;
  overview: string;
  keyAchievements: string[];
  notableFigures: string[];
  connectedEntities: RelatedEntityRef[];
  sources: HistoricalSource[];
}

export interface VideoContent {
  id: string;
  title: string;
  category: 'documentaire' | 'archive' | 'conference' | 'interview' | 'kama_original';
  duration: string;
  year: number | string;
  thumbnail: string;
  videoUrl: string; // Embed or hosted video/audio
  speaker?: string;
  summary: string;
  chapters: { time: string; title: string }[];
  transcriptPreview: string;
  fullTranscript?: string;
  connectedEntities: RelatedEntityRef[];
  sources: HistoricalSource[];
}

export interface ArticleDossier {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  territory: string;
  readTimeMin: number;
  publishDate: string;
  author: {
    name: string;
    role: string;
    institution: string;
  };
  heroImage: string;
  imageCaption: string;
  // 2-minute essential version
  essential: {
    keyFacts: string[];
    timeline: { year: string; event: string }[];
    coreQuote: { text: string; author: string; year: string };
    summary: string;
  };
  // Longform deep dossier
  sections: {
    heading: string;
    subheading?: string;
    content: string;
    quote?: { text: string; author: string; year: string };
    image?: { url: string; caption: string };
    archiveSnippet?: { title: string; text: string; origin: string };
  }[];
  mentionedPeople: { id: string; name: string; role: string; image: string }[];
  relatedEvents: { id: string; title: string; year: string }[];
  continueExploring: RelatedEntityRef[];
  sources: HistoricalSource[];
}

export interface KamaPath {
  id: string;
  title: string;
  tagline: string;
  totalSteps: number;
  estimatedMinutes: number;
  level: 'Découverte' | 'Intermédiaire' | 'Approfondi';
  image: string;
  steps: {
    stepNumber: number;
    title: string;
    description: string;
    targetType: EntityType;
    targetId: string;
    mediaType: 'article' | 'video' | 'map' | 'archive';
  }[];
}

export interface KamaStory {
  id: string;
  year: string;
  title: string;
  tagline: string;
  location: string;
  heroImage: string;
  chapters: {
    title: string;
    text: string;
    quote?: string;
    quoteAuthor?: string;
    mediaUrl?: string;
    mediaCaption?: string;
    mapLocation?: string;
  }[];
  sources: HistoricalSource[];
}

export interface CommunityArchiveItem {
  id: string;
  title: string;
  category: 'document' | 'audio' | 'photograph' | 'manuscript';
  description: string;
  fileUrl: string;
  fileType?: string;
  yearPeriod: string;
  territory: string;
  contributorName: string;
  sourceAttribution: string;
  uploadedAt: string;
  verified?: boolean;
}

export interface CommunityArchiveUpload {
  id: string;
  title: string;
  contributorName: string;
  contributorEmail?: string;
  mediaType: 'image' | 'audio' | 'document' | 'video';
  url: string;
  historicalPeriod: string;
  region: string;
  description: string;
  sourceAttribution: string;
  uploadedAt: string;
  fileSize?: string;
}
