import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { query, currentEntityId, context, language = 'fr' } = await req.json();

    if (!query || typeof query !== "string") {
      return NextResponse.json(
        { error: "Veuillez formuler une question historique valide." },
        { status: 400 }
      );
    }

    const languageNames: Record<string, string> = {
      fr: 'French (Français)',
      en: 'English',
      es: 'Spanish (Español)',
      pt: 'Portuguese (Português)',
      ar: 'Arabic (العربية)',
    };
    const targetLangName = languageNames[language] || 'French';

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      // Return a rich historical fallback response if API key is not configured
      const fallbacks: Record<string, string> = {
        fr: `KAMA Archive Note : Pour explorer en profondeur « ${query} », vous pouvez parcourir nos dossiers consacrés aux grands empires africains, aux révolutions de souveraineté et aux figures majeures comme Mansa Moussa, Thomas Sankara, Toussaint Louverture ou Cheikh Anta Diop.`,
        en: `KAMA Archive Note: To explore "${query}" in depth, you can browse our records on major African empires, liberation revolutions, and key figures such as Mansa Musa, Thomas Sankara, Toussaint Louverture, or Cheikh Anta Diop.`,
        es: `Nota del Archivo KAMA: Para explorar en profundidad «${query}», puede consultar nuestros registros sobre los grandes imperios africanos, las revoluciones de soberanía y figuras clave como Mansa Musa, Thomas Sankara o Toussaint Louverture.`,
        pt: `Nota do Arquivo KAMA: Para explorar «${query}» em profundidade, consulte nossos registros sobre grandes impérios africanos, revoluções de soberania e figuras históricas como Mansa Musa, Thomas Sankara ou Toussaint Louverture.`,
        ar: `ملاحظة أرشيف كاما: لاستكشاف «${query}» بعمق، يمكنك تصفح سجلاتنا المخصصة للإمبراطوريات الأفريقية الكبرى، وثورات التحرر، والشخصيات التاريخية مثل منسا موسى وتوماس سانكارا وتوسان لوفرتور.`,
      };

      return NextResponse.json({
        answer: fallbacks[language] || fallbacks.fr,
        suggestedEntities: ["thomas-sankara", "mansa-musa", "revolution-haitienne-1804"],
        sources: ["Histoire générale de l’Afrique (UNESCO)", "Archives KAMA"]
      });
    }

    const ai = new GoogleGenAI({ apiKey });

    const systemInstruction = `You are the Archivist and Guide of KAMA — The Living Archive of Black History & Diasporic Cultures (Bibliothèque Vivante de l'Histoire Noire).
Your tone is rigorous, dignified, captivating, academic, and respectful of historical truth (grounded in research by UNESCO General History of Africa, Cheikh Anta Diop, Joseph Ki-Zerbo, and primary archives).
Language requirement: You MUST formulate your entire response in ${targetLangName}.
Rules:
1. Provide a structured, concise answer (2 to 4 impactful paragraphs).
2. Always cite 1 to 3 reliable historical sources (e.g. Ibn Battuta, Al-Umari, UNESCO Acts, original speeches, Timbuktu manuscripts, Toussaint Louverture's memoirs).
3. Explicitly mention key dates, dynasties, empires, and figures.
4. Note historiographical nuances where applicable.`;

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
