'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { KamaSun } from './KamaSun';
import { 
  UploadCloud, 
  FileText, 
  Image as ImageIcon, 
  Music, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  Sparkles, 
  ShieldCheck, 
  Copy, 
  ExternalLink,
  Plus
} from 'lucide-react';
import { CommunityArchiveItem } from '@/lib/types';
import { COMMUNITY_ARCHIVES } from '@/lib/kama-data';

interface VercelBlobArchiveUploaderProps {
  onClose?: () => void;
}

export function VercelBlobArchiveUploader({ onClose }: VercelBlobArchiveUploaderProps) {
  const [archives, setArchives] = useState<CommunityArchiveItem[]>(COMMUNITY_ARCHIVES);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadSuccess, setUploadSuccess] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  // Form fields
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<'document' | 'audio' | 'photograph' | 'manuscript'>('manuscript');
  const [yearPeriod, setYearPeriod] = useState('');
  const [territory, setTerritory] = useState('');
  const [description, setDescription] = useState('');
  const [contributorName, setContributorName] = useState('');
  const [sourceAttribution, setSourceAttribution] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      if (file.type.startsWith('image/')) {
        setFilePreview(URL.createObjectURL(file));
      } else {
        setFilePreview(null);
      }
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setSelectedFile(file);
      if (file.type.startsWith('image/')) {
        setFilePreview(URL.createObjectURL(file));
      } else {
        setFilePreview(null);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !selectedFile) {
      setErrorMessage('Veuillez renseigner un titre et sélectionner un document à téléverser.');
      return;
    }

    setIsUploading(true);
    setErrorMessage(null);
    setUploadSuccess(null);

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('title', title);
      formData.append('category', category);
      formData.append('yearPeriod', yearPeriod);
      formData.append('territory', territory);
      formData.append('description', description);
      formData.append('contributorName', contributorName || 'Chercheur / Citoyen KAMA');
      formData.append('sourceAttribution', sourceAttribution);

      const res = await fetch('/api/blob/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Erreur lors du téléversement.');
      }

      // Add to local state
      const newItem: CommunityArchiveItem = {
        id: `archive-${Date.now()}`,
        title: title,
        category: category,
        description: description,
        fileUrl: data.blobUrl,
        fileType: selectedFile.type,
        yearPeriod: yearPeriod || 'Non daté',
        territory: territory || 'International',
        contributorName: contributorName || 'Contributeur KAMA',
        sourceAttribution: sourceAttribution || 'Fonds citoyen',
        uploadedAt: new Date().toISOString(),
        verified: false,
      };

      setArchives([newItem, ...archives]);
      setUploadSuccess(`Le document a été archivé avec succès sur Vercel Blob ! URL: ${data.blobUrl}`);
      
      // Reset form
      setTitle('');
      setYearPeriod('');
      setTerritory('');
      setDescription('');
      setSelectedFile(null);
      setFilePreview(null);
    } catch (err: any) {
      setErrorMessage(err.message || 'Une erreur est survenue lors de l’envoi.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <section id="archives" className="py-16 md:py-24 px-4 sm:px-6 md:px-8 bg-[#FAF9F5] border-t border-[#121210]/8">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 mb-2">
              <UploadCloud className="w-4 h-4 text-[#A65438]" />
              <p className="text-xs uppercase tracking-widest font-bold text-[#A65438]">
                Archives Communautaires & Vercel Blob
              </p>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#121210] font-sans">
              Contribuer aux Archives Vivantes
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#77746A] max-w-md">
            Déposez des photographies d’époque, manuscrits scannés, lettres ou enregistrements oraux pour enrichir le patrimoine commun vérifié.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Upload Form (5 cols) */}
          <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl bg-white border border-[#121210]/10 shadow-sm">
            <h3 className="text-lg font-bold text-[#121210] mb-2 flex items-center gap-2">
              <Plus className="w-4 h-4 text-[#A65438]" /> Déposer une archive
            </h3>
            <p className="text-xs text-[#77746A] mb-6">
              Stockage décentralisé propulsé par <strong>Vercel Blob Storage</strong>.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Title */}
              <div>
                <label className="block text-xs font-bold text-[#121210] uppercase tracking-wider mb-1">
                  Titre du document *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Manuscrit d'astronomie de Tombouctou..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#F2B844] bg-[#FAF9F5]"
                />
              </div>

              {/* Category & Period */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#121210] uppercase tracking-wider mb-1">
                    Nature
                  </label>
                  <select
                    value={category}
                    onChange={(e: any) => setCategory(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-stone-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#F2B844] bg-[#FAF9F5]"
                  >
                    <option value="manuscript">Manuscrit</option>
                    <option value="photograph">Photographie</option>
                    <option value="audio">Audio / Oral</option>
                    <option value="document">Lettre / Document</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#121210] uppercase tracking-wider mb-1">
                    Période / Année
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: ca. 1550 ou 1960"
                    value={yearPeriod}
                    onChange={(e) => setYearPeriod(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#F2B844] bg-[#FAF9F5]"
                  />
                </div>
              </div>

              {/* Territory & Source */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#121210] uppercase tracking-wider mb-1">
                    Territoire / Région
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: Gao, Mali"
                    value={territory}
                    onChange={(e) => setTerritory(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#F2B844] bg-[#FAF9F5]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#121210] uppercase tracking-wider mb-1">
                    Contributeur
                  </label>
                  <input
                    type="text"
                    placeholder="Votre nom / Institut"
                    value={contributorName}
                    onChange={(e) => setContributorName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#F2B844] bg-[#FAF9F5]"
                  />
                </div>
              </div>

              {/* Drag & Drop File Zone */}
              <div>
                <label className="block text-xs font-bold text-[#121210] uppercase tracking-wider mb-1">
                  Fichier de l’archive (PDF, Image, Audio) *
                </label>
                <div
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-stone-300 hover:border-[#F2B844] rounded-2xl p-4 text-center cursor-pointer bg-[#FAF9F5] transition-colors"
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                    accept="image/*,audio/*,application/pdf"
                  />
                  {selectedFile ? (
                    <div className="flex flex-col items-center">
                      <CheckCircle2 className="w-7 h-7 text-[#1F392E] mb-1" />
                      <p className="text-xs font-bold text-[#121210] line-clamp-1">{selectedFile.name}</p>
                      <p className="text-[10px] text-stone-500">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <UploadCloud className="w-7 h-7 text-stone-400 mb-1" />
                      <p className="text-xs font-semibold text-[#121210]">Glissez-déposez ou cliquez pour choisir</p>
                      <p className="text-[10px] text-stone-400">Max 50 Mo (JPG, PNG, PDF, MP3)</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold text-[#121210] uppercase tracking-wider mb-1">
                  Contexte & Description
                </label>
                <textarea
                  rows={2}
                  placeholder="Expliquez la provenance, le contexte ou la transcription de ce document..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-stone-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#F2B844] bg-[#FAF9F5]"
                />
              </div>

              {/* Error or Success Alert */}
              {errorMessage && (
                <div className="p-3 rounded-xl bg-red-50 text-red-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {uploadSuccess && (
                <div className="p-3 rounded-xl bg-emerald-50 text-emerald-800 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                  <span className="line-clamp-2">{uploadSuccess}</span>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isUploading}
                className="w-full py-3.5 rounded-full bg-[#121210] hover:bg-[#2B2925] text-white text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-md disabled:opacity-60"
              >
                {isUploading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-[#F2B844]" />
                    <span>Téléversement vers Vercel Blob...</span>
                  </>
                ) : (
                  <>
                    <UploadCloud className="w-4 h-4" />
                    <span>Archiver le document</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Right Live Archive Community Gallery (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-[#121210]">
                Archives récemment déposées ({archives.length})
              </h3>
              <span className="text-xs text-[#77746A]">
                Validation scientifique en cours
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {archives.map((item) => (
                <div
                  key={item.id}
                  className="p-5 rounded-2xl bg-white border border-[#121210]/8 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-[#F2B844]/20 text-[#743825]">
                        {item.category}
                      </span>
                      <span className="text-[11px] font-mono text-[#77746A]">
                        {item.yearPeriod}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-[#121210] leading-snug line-clamp-2">
                      {item.title}
                    </h4>

                    <p className="text-xs text-[#46443D] mt-2 line-clamp-3 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#121210]/8 flex items-center justify-between text-xs text-[#77746A]">
                    <span className="line-clamp-1">{item.contributorName}</span>
                    <a
                      href={item.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#A65438] font-semibold hover:underline flex items-center gap-1"
                    >
                      <span>Consulter</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
