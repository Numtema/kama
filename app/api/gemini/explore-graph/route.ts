import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import { TopicGraphData, GraphNodeBranch } from '@/lib/types';
import { CURATED_TOPIC_GRAPHS } from '@/lib/curated-graphs';

export async function POST(req: NextRequest) {
  try {
    const { query } = await req.json();
    const cleanQuery = (query || 'slavery').trim().toLowerCase();

    // Check pre-curated high quality fallback graphs
    if (cleanQuery.includes('slavery') || cleanQuery.includes('esclav') || cleanQuery.includes('traite')) {
      return NextResponse.json(CURATED_TOPIC_GRAPHS.slavery);
    }
    if (cleanQuery.includes('anticolonial') || cleanQuery.includes('panafric') || cleanQuery.includes('libérat')) {
      return NextResponse.json(CURATED_TOPIC_GRAPHS.anticolonialisme);
    }

    // If Gemini API Key exists, generate a structured dynamic knowledge tree
    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey) {
      const ai = new GoogleGenAI({ apiKey });
      const prompt = `Tu es l'Archiviste et Ontologiste Historique en Chef de KAMA (la bibliothèque vivante de l'histoire et des civilisations noires et diasporiques).
L'utilisateur souhaite explorer en graphe de connaissances le sujet : "${cleanQuery}".

Génère une décomposition hiérarchique rigoureuse, académique et vérifiée du sujet sous forme de JSON strict selon l'interface suivante :
{
  "query": "${cleanQuery}",
  "title": "Titre éditorial fort en français",
  "subtitle": "Sous-titre descriptif contextualisant les liens historiques",
  "totalBranches": 12,
  "totalConnections": 28,
  "sources": [
    {
      "id": "source-1",
      "title": "Titre de l'ouvrage ou archive de référence",
      "author": "Nom de l'historien ou institution",
      "year": 1974,
      "type": "academic",
      "archiveInstitution": "Nom d'institution d'archive ou université",
      "excerpt": "Courte citation ou résumé de la valeur scientifique de la source",
      "reliabilityNote": "Explication de la rigueur méthodologique"
    }
  ],
  "rootNode": {
    "id": "root-node",
    "label": "Nom du sujet central",
    "category": "Sujet Central",
    "description": "Description concise du champ historique",
    "level": 0,
    "itemCounts": {
      "articles": 15,
      "characters": 22,
      "documentaries": 8,
      "archives": 30,
      "conferences": 5,
      "total": 80
    },
    "children": [
      {
        "id": "branch-1",
        "label": "Nom de la Branche Principale 1 (ex: Territoire, Période, Dynamique)",
        "category": "Sous-catégorie",
        "description": "Explication historique",
        "level": 1,
        "itemCounts": { "articles": 5, "characters": 8, "documentaries": 2, "archives": 10, "conferences": 2, "total": 27 },
        "highlightedEntities": [
          { "id": "entity-1", "name": "Personnage ou événement clé", "type": "person", "subtitle": "Rôle historique clé" }
        ],
        "children": [
          {
            "id": "sub-1-1",
            "label": "Sous-thème spécifique",
            "category": "Détail",
            "description": "Précision documentaire",
            "level": 2,
            "itemCounts": { "articles": 2, "characters": 3, "documentaries": 1, "archives": 5, "conferences": 1, "total": 12 }
          }
        ]
      }
    ]
  }
}

Retourne UNIQUEMENT le JSON valide, sans texte additionnel ni markdown backticks.`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json'
        }
      });

      if (response.text) {
        try {
          const parsed = JSON.parse(response.text);
          return NextResponse.json(parsed);
        } catch {
          return NextResponse.json(CURATED_TOPIC_GRAPHS.slavery);
        }
      }
    }

    // Default fallback
    return NextResponse.json(CURATED_TOPIC_GRAPHS.slavery);
  } catch (error) {
    console.error('Error generating explore graph:', error);
    return NextResponse.json(CURATED_TOPIC_GRAPHS.slavery);
  }
}
