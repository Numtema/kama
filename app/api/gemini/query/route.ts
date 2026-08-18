import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { query, currentEntityId, context } = await req.json();

    if (!query || typeof query !== "string") {
      return NextResponse.json(
        { error: "Veuillez formuler une question historique valide." },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      // Return a rich historical fallback response if API key is not configured
      return NextResponse.json({
        answer: `KAMA Archive Note : Pour explorer en profondeur « ${query} », vous pouvez parcourir nos dossiers consacrés aux grands empires africains, aux révolutions de souveraineté et aux figures majeures comme Mansa Moussa, Thomas Sankara, Toussaint Louverture ou Cheikh Anta Diop.`,
        suggestedEntities: ["thomas-sankara", "mansa-musa", "revolution-haitienne-1804"],
        sources: ["Histoire générale de l’Afrique (UNESCO)", "Archives KAMA"]
      });
    }

    const ai = new GoogleGenAI({ apiKey });

    const systemInstruction = `Tu es l'Archiviste et Guide de KAMA — The Living Archive of Black History (La Bibliothèque Vivante de l'Histoire Noire et des Cultures Diasporiques).
Ton ton est rigoureux, précis, captivant, digne, scientifique et respectueux de la vérité historique (conforme aux travaux de l'UNESCO, de Cheikh Anta Diop, de Joseph Ki-Zerbo et des sources primaires).
Tu t'exprimes en français élégant et clair.
Règles :
1. Réponds de manière concise et structurée (2 à 4 paragraphes percutants).
2. Cite toujours 1 à 3 sources historiques fiables (ex: Ibn Battuta, Al-Umari, Actes de l'UNESCO, Discours originaux, Archives de Tombouctou, Mémoires de Toussaint Louverture).
3. Mentionne explicitement les personnes clés, dates et empires reliés au sujet.
4. Si une incertitude historiographique existe, mentionne-la avec nuance.`;

    const prompt = `L'utilisateur consulte KAMA ${context ? `(Contexte actuel : ${context})` : ''} et pose la question suivante :
"${query}"

Fournis une réponse enrichissante, exacte, structurée, avec les sources historiques recommandées.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.3,
      }
    });

    const responseText = response.text || "Aucune information archivée disponible pour l'instant.";

    return NextResponse.json({
      answer: responseText,
      sources: ["Histoire Générale de l'Afrique (UNESCO)", "Archives KAMA Documentaires"],
      query
    });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    return NextResponse.json(
      { 
        error: "Erreur lors de la consultation de l'archive.",
        details: error?.message || "Erreur inconnue"
      },
      { status: 500 }
    );
  }
}
