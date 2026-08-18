import { put } from '@vercel/blob';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const title = formData.get('title') as string || 'Document sans titre';
    const period = formData.get('period') as string || 'Époque indéterminée';
    const region = formData.get('region') as string || 'Monde noir';
    const contributor = formData.get('contributor') as string || 'Contributeur anonyme';
    const attribution = formData.get('attribution') as string || 'Archive communautaire';
    const description = formData.get('description') as string || '';

    if (!file) {
      return NextResponse.json(
        { error: 'Aucun fichier fourni pour l’archivage.' },
        { status: 400 }
      );
    }

    const token = process.env.BLOB_READ_WRITE_TOKEN;
    let url = '';

    if (token && token.trim() !== '' && !token.includes('vercel_blob_rw_token_here')) {
      // Real upload to Vercel Blob storage
      const blob = await put(`kama-archives/${Date.now()}-${file.name}`, file, {
        access: 'public',
        token: token,
      });
      url = blob.url;
    } else {
      // In development or when token is not yet provisioned, generate a safe preview URL
      // If it's an image/document, we can use an editorial placeholder or data representation
      url = `https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80`;
    }

    const newArchiveItem = {
      id: `arch-${Date.now()}`,
      title,
      contributorName: contributor,
      mediaType: file.type.startsWith('image')
        ? 'image'
        : file.type.startsWith('audio')
        ? 'audio'
        : file.type.startsWith('video')
        ? 'video'
        : 'document',
      url,
      historicalPeriod: period,
      region,
      description,
      sourceAttribution: attribution,
      uploadedAt: new Date().toISOString().split('T')[0],
      fileSize: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
      isVercelBlobStored: Boolean(token && !token.includes('vercel_blob_rw_token_here')),
    };

    return NextResponse.json({
      success: true,
      archive: newArchiveItem,
      message: token && !token.includes('vercel_blob_rw_token_here') 
        ? 'Document versé avec succès dans le stockage persistant Vercel Blob.' 
        : 'Document indexé en mode prévisualisation sécurisée (Configurez BLOB_READ_WRITE_TOKEN pour la persistance Vercel directe).'
    });
  } catch (error: any) {
    console.error('Vercel Blob upload error:', error);
    return NextResponse.json(
      { 
        error: 'Échec de l’envoi du document.', 
        details: error?.message || 'Erreur inconnue' 
      },
      { status: 500 }
    );
  }
}
