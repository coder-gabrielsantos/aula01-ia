import type { Metadata } from 'next';
import { Archivo_Black, DM_Sans, Geist_Mono } from 'next/font/google';
import './globals.css';

const display = Archivo_Black({ variable: '--font-archivo', subsets: ['latin'], weight: '400' });
const body = DM_Sans({ variable: '--font-dm-sans', subsets: ['latin'] });
const mono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('http://localhost:3000'),
  title: 'Redes Neurais & Deep Learning — Aula Interativa',
  description: 'Como máquinas aprendem a reconhecer imagens e sons — uma aula interativa sobre inteligência artificial.',
  openGraph: {
    title: 'Redes Neurais & Deep Learning',
    description: 'Como máquinas aprendem a reconhecer imagens e sons, com explicações intuitivas e três laboratórios virtuais.',
    type: 'website',
    locale: 'pt_BR',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Redes Neurais e Deep Learning — aula interativa' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Redes Neurais & Deep Learning',
    description: 'Como máquinas aprendem a reconhecer imagens e sons.',
    images: ['/og.png'],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body className={`${display.variable} ${body.variable} ${mono.variable}`}>{children}</body>
    </html>
  );
}
