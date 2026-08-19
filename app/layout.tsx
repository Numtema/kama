import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { LanguageProvider } from '@/lib/LanguageContext';

const degular = localFont({
  src: [
    {
      path: '../fonts/fonnts.com-DegularDisplayDemo-Thin.otf',
      weight: '100',
      style: 'normal',
    },
    {
      path: '../fonts/fonnts.com-DegularDisplayDemo-ThinItalic.otf',
      weight: '100',
      style: 'italic',
    },
    {
      path: '../fonts/fonnts.com-DegularDisplayDemo-Light.otf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../fonts/fonnts.com-DegularDisplayDemo-LightItalic.otf',
      weight: '300',
      style: 'italic',
    },
    {
      path: '../fonts/fonnts.com-DegularDisplayDemo-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/fonnts.com-DegularDisplayDemo-Italic.otf',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../fonts/fonnts.com-DegularDisplayDemo-Medium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../fonts/fonnts.com-DegularDisplayDemo-MediumItalic.otf',
      weight: '500',
      style: 'italic',
    },
    {
      path: '../fonts/fonnts.com-DegularDisplayDemo-Semibold.otf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../fonts/fonnts.com-DegularDisplayDemo-SemiboldItalic.otf',
      weight: '600',
      style: 'italic',
    },
    {
      path: '../fonts/fonnts.com-DegularDisplayDemo-Bold.otf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../fonts/fonnts.com-DegularDisplayDemo-BoldItalic.otf',
      weight: '700',
      style: 'italic',
    },
    {
      path: '../fonts/fonnts.com-DegularDisplayDemo-Black.otf',
      weight: '900',
      style: 'normal',
    },
    {
      path: '../fonts/fonnts.com-DegularDisplayDemo-BlackItalic.otf',
      weight: '900',
      style: 'italic',
    },
  ],
  variable: '--font-degular',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'KAMA - The Living Archive',
  description: 'KAMA : La bibliothèque vivante de l’histoire noire et des cultures diasporiques.',
  openGraph: {
    title: 'KAMA - The Living Archive',
    description: 'KAMA : La bibliothèque vivante de l’histoire noire et des cultures diasporiques.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KAMA - The Living Archive',
    description: 'KAMA : La bibliothèque vivante de l’histoire noire et des cultures diasporiques.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${degular.variable} font-sans`} suppressHydrationWarning>
      <body className={`${degular.className} antialiased`} suppressHydrationWarning>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
