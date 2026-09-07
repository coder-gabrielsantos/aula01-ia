import type { Metadata } from 'next';
import { Archivo_Black, DM_Sans, Geist_Mono } from 'next/font/google';
import './globals.css';

const display = Archivo_Black({ variable: '--font-archivo', subsets: ['latin'], weight: '400' });
const body = DM_Sans({ variable: '--font-dm-sans', subsets: ['latin'] });
const mono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://ia-sem-misterio-arvores.maxcrowleyadz.chatgpt.site'),
  title: 'Árvores de Decisão: Como Estruturar o Raciocínio Lógico',
  description: 'Da intuição humana aos algoritmos de Machine Learning — uma aula interativa para o ensino médio.',
  openGraph: {
    title: 'Árvores de Decisão: Como Estruturar o Raciocínio Lógico',
    description: 'Da intuição humana aos algoritmos de Machine Learning, com exemplos interativos, laboratório e quiz.',
    type: 'website',
    locale: 'pt_BR',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'IA sem mistério — Árvores de decisão, passo a passo' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Árvores de Decisão: Como Estruturar o Raciocínio Lógico',
    description: 'Da intuição humana aos algoritmos de Machine Learning.',
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
