'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { KamaSun } from './KamaSun';
import { useLanguage } from '@/lib/LanguageContext';
import { 
  X, 
  Sparkles, 
  Send, 
  Loader2, 
  ShieldCheck, 
  BookOpen, 
  ArrowRight,
  MessageSquare,
  Compass
} from 'lucide-react';
import { EntityType } from '@/lib/types';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  sources?: string[];
  suggestedTopics?: string[];
}

interface KamaAiArchivistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectEntity: (type: EntityType, id: string) => void;
}

export function KamaAiArchivistDrawer({
  isOpen,
  onClose,
  onSelectEntity
}: KamaAiArchivistDrawerProps) {
  const { language, t } = useLanguage();

  const getInitialMessage = (): Message => {
    switch (language) {
      case 'en':
        return {
          role: 'assistant',
          content: "Greetings. I am the KAMA Archivist, your research guide. I can illuminate African civilizations, major diaspora figures, historical treaties, and primary manuscripts. Which era or personality would you like to explore?",
          suggestedTopics: [
            "Economic impact of Mansa Musa's pilgrimage",
            "The Manden Charter of 1236",
            "Thomas Sankara's revolutionary reforms",
            "Queen Nzinga's resistance strategy"
          ]
        };
      case 'es':
        return {
          role: 'assistant',
          content: "Saludos. Soy el Archivero KAMA, su guía documental. Puedo orientarle sobre civilizaciones africanas, figuras históricas de la diáspora, tratados y fuentes primarias. ¿Qué período o personalidad desea explorar?",
          suggestedTopics: [
            "Impacto económico del viaje de Mansa Musa",
            "La Carta de Kouroukan Fouga de 1236",
            "Las reformas de Thomas Sankara",
            "La estrategia de la Reina Nzinga"
          ]
        };
      case 'pt':
        return {
          role: 'assistant',
          content: "Saudações. Sou o Arquivista KAMA, seu guia documental. Posso esclarecer sobre civilizações africanas, figuras da diáspora, tratados e fontes primárias. Qual período ou líder gostaria de explorar?",
          suggestedTopics: [
            "Impacto econômico da viagem de Mansa Musa",
            "A Carta de Manden de 1236",
            "As reformas de Thomas Sankara",
            "A resistência da Rainha Nzinga"
          ]
        };
      case 'ar':
        return {
          role: 'assistant',
          content: "تحياتي. أنا الأرشيفي كاما، مرشدك التاريخي. يمكنني إرشادك حول الحضارات الأفريقية، شخصيات الدياسبورا البارزة، المعاهدات والمخطوطات الأصلية. ما هي الحقبة أو الشخصية التي تود استكشافها؟",
          suggestedTopics: [
            "الأثر الاقتصادي لرحلة منسا موسى عام 1324",
            "ميثاق كوروكان فوغا لعام 1236",
            "إصلاحات توماس سانكارا",
            "استراتيجية الملكة نزينغا في المقاومة"
          ]
        };
      default:
        return {
          role: 'assistant',
          content: "Salutations. Je suis l'Archiviste KAMA, votre guide documentaire. Je peux vous éclairer sur les civilisations africaines, les figures majeures de la diaspora, les traités historiques ou les sources primaires. Quelle période ou personnalité souhaitez-vous explorer ?",
          suggestedTopics: [
            "L'impact économique du voyage de Mansa Moussa",
            "La Charte de Kouroukan Fouga de 1236",
            "Les réformes de Thomas Sankara",
            "La stratégie de résistance de la Reine Nzinga"
          ]
        };
    }
  };

  const [messages, setMessages] = useState<Message[]>([getInitialMessage()]);
  const [inputQuery, setInputQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async (queryText?: string) => {
    const textToSend = queryText || inputQuery;
    if (!textToSend.trim() || isLoading) return;

    const userMsg: Message = { role: 'user', content: textToSend };
    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/gemini/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: textToSend,
          language: language,
        })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Erreur lors de la réponse de l’Archiviste.');
      }

      const assistantMsg: Message = {
        role: 'assistant',
        content: data.answer || "Document en cours de consultation.",
        sources: data.sources || ['Histoire Générale de l’Afrique UNESCO'],
        suggestedTopics: data.suggestedQueries || []
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: language === 'en'
            ? "Pardon this interruption. Access to archives encountered momentary latency. Please rephrase your historical query."
            : "Pardonnez cette interruption. L'accès aux archives a rencontré une latence momentanée. Veuillez reformuler votre requête historique."
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 z-50 w-full max-w-xl flex pl-4 pointer-events-none">
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 28, stiffness: 280 }}
          className="w-full h-full bg-[#FAF9F5] border-l border-[#121210]/15 shadow-2xl flex flex-col pointer-events-auto"
        >
          {/* Drawer Header */}
          <div className="p-5 sm:p-6 bg-white border-b border-[#121210]/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#FFF2CE] border border-[#F2B844] flex items-center justify-center text-[#743825]">
                <KamaSun size={22} animate={true} />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#121210] flex items-center gap-2">
                  {t('archivist.title', 'L’Archiviste KAMA')}
                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-[#1F392E]/10 text-[#1F392E]">
                    {t('archivist.badge', 'IA Historienne')}
                  </span>
                </h3>
                <p className="text-xs text-[#77746A]">
                  {t('archivist.desc', 'Réponses fondées sur les sources académiques vérifiées')}
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Conversation Messages */}
          <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[90%] rounded-2xl p-4 sm:p-5 text-xs sm:text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-[#121210] text-white'
                      : 'bg-white border border-[#121210]/10 text-[#121210] shadow-2xs font-serif'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.content}</p>

                  {/* Sources attached by Archivist */}
                  {msg.sources && msg.sources.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-stone-200/80 font-sans text-xs text-[#77746A]">
                      <p className="font-bold text-[#1F392E] flex items-center gap-1.5 mb-1">
                        <ShieldCheck className="w-3.5 h-3.5" /> {t('archivist.sourcesCited', 'Sources académiques citées :')}
                      </p>
                      <ul className="list-disc list-inside space-y-0.5">
                        {msg.sources.map((src, sIdx) => (
                          <li key={sIdx} className="text-[11px] italic">{src}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Suggested follow-up queries */}
                {msg.suggestedTopics && msg.suggestedTopics.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1.5 max-w-[90%]">
                    {msg.suggestedTopics.map((topic, tIdx) => (
                      <button
                        key={tIdx}
                        onClick={() => handleSend(topic)}
                        className="text-[11px] px-3 py-1 rounded-full bg-white hover:bg-[#FFF2CE] text-[#121210] border border-[#121210]/10 transition-colors flex items-center gap-1"
                      >
                        <span>{topic}</span>
                        <ArrowRight className="w-3 h-3 text-[#A65438]" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex items-center gap-2 text-xs text-[#77746A] p-4 bg-white rounded-2xl border border-stone-200">
                <Loader2 className="w-4 h-4 animate-spin text-[#F2B844]" />
                <span>{t('archivist.consulting', 'L’Archiviste consulte les manuscrits et corpus UNESCO...')}</span>
              </div>
            )}
          </div>

          {/* Drawer Query Input */}
          <div className="p-4 bg-white border-t border-[#121210]/10">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                placeholder={t('archivist.inputPlaceholder', 'Posez une question sur une date, un royaume, un texte...')}
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                className="flex-1 px-4 py-3 rounded-full border border-stone-200 text-xs sm:text-sm bg-[#FAF9F5] focus:outline-none focus:ring-2 focus:ring-[#F2B844]"
              />
              <button
                type="submit"
                disabled={!inputQuery.trim() || isLoading}
                className="w-11 h-11 rounded-full bg-[#121210] hover:bg-[#2B2925] disabled:opacity-40 text-white flex items-center justify-center transition-colors flex-shrink-0"
                aria-label="Envoyer la question"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
