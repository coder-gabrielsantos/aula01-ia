import type { Metadata } from 'next';
import { Archivo_Black, DM_Sans, Geist_Mono } from 'next/font/google';
import './globals.css';

const display = Archivo_Black({ variable: '--font-archivo', subsets: ['latin'], weight: '400' });
const body = DM_Sans({ variable: '--font-dm-sans', subsets: ['latin'] });
const mono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://ia-sem-misterio-arvores.maxcrowleyadz.chatgpt.site'),
  title: 'IA sem mistério — Árvores de decisão',
  description: 'Uma aula interativa sobre árvores de decisão para o ensino médio.',
  openGraph: {
    title: 'IA sem mistério — Árvores de decisão',
    description: 'Aprenda como uma IA decide com exemplos interativos, laboratório e quiz.',
    type: 'website',
    locale: 'pt_BR',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'IA sem mistério — Árvores de decisão, passo a passo' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IA sem mistério — Árvores de decisão',
    description: 'Uma aula interativa e visual para o ensino médio.',
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
