'use client';

import { motion } from 'motion/react';
import {
  Activity,
  AlertTriangle,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  AudioWaveform,
  Bot,
  Boxes,
  BrainCircuit,
  Check,
  ChevronLeft,
  ChevronRight,
  CircleHelp,
  Cpu,
  Database,
  Eye,
  Expand,
  Gauge,
  GraduationCap,
  Lightbulb,
  PanelTop,
  Play,
  RefreshCw,
  Repeat2,
  ScanLine,
  ShieldAlert,
  SlidersHorizontal,
  Sparkles,
  Target,
  Volume2,
  X,
  Zap,
} from 'lucide-react';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { Button } from '@/components/ui/button';

const lessonSections = [
  { id: 'inicio', short: 'Abertura', title: 'Redes neurais' },
  { id: 'percepcao', short: 'Percepção', title: 'O que a máquina recebe' },
  { id: 'neuronio', short: 'Neurônio', title: 'A menor unidade' },
  { id: 'camadas', short: 'Camadas', title: 'Entrada, processamento e saída' },
  { id: 'lab-neuronio', short: 'Laboratório 1', title: 'Ative um neurônio' },
  { id: 'treinamento', short: 'Treino', title: 'Aprender com o erro' },
  { id: 'backprop', short: 'Correção', title: 'O erro volta pela rede' },
  { id: 'deep-learning', short: 'Profundidade', title: 'Por que Deep Learning?' },
  { id: 'imagens', short: 'Imagens', title: 'Do pixel ao objeto' },
  { id: 'lab-imagem', short: 'Laboratório 2', title: 'Desenhe para a rede' },
  { id: 'sons', short: 'Sons', title: 'Da onda à palavra' },
  { id: 'lab-som', short: 'Laboratório 3', title: 'Ouça e classifique' },
  { id: 'mundo-real', short: 'Mundo real', title: 'Aplicações e limites' },
  { id: 'quiz', short: 'Desafio', title: 'Cheque sua rede mental' },
  { id: 'resumo', short: 'Resumo', title: 'O que fica' },
] as const;

type SectionId = (typeof lessonSections)[number]['id'];
type SoundKey = 'assobio' | 'palma' | 'voz';

declare global {
  interface Document {
    modelContext?: {
      registerTool: (
        tool: {
          name: string;
          title?: string;
          description: string;
          inputSchema: Record<string, unknown>;
          annotations?: { readOnlyHint?: boolean; untrustedContentHint?: boolean };
          execute: (input: unknown) => unknown;
        },
        options?: { signal?: AbortSignal },
      ) => void | Promise<void>;
    };
  }
}

function SectionHeading({
  number,
  eyebrow,
  title,
  description,
  dark = true,
}: {
  number: string;
  eyebrow: string;
  title: string;
  description?: string;
  dark?: boolean;
}) {
  return (
    <div className="max-w-4xl">
      <div className={`mb-4 flex items-center gap-3 font-mono text-xs font-bold uppercase tracking-[0.2em] ${dark ? 'text-mint' : 'text-ink/60'}`}>
        <span className={`grid size-8 place-items-center rounded-full ${dark ? 'bg-mint text-ink' : 'bg-ink text-paper'}`}>{number}</span>
        {eyebrow}
      </div>
      <h2 className={`font-display text-[clamp(2.15rem,5.2vw,4.25rem)] leading-[0.98] tracking-[-0.04em] ${dark ? 'text-white' : 'text-ink'}`}>
        {title}
      </h2>
      {description ? (
        <p className={`mt-5 max-w-3xl text-[clamp(1rem,1.65vw,1.25rem)] leading-relaxed ${dark ? 'text-white/66' : 'text-ink/68'}`}>{description}</p>
      ) : null}
    </div>
  );
}

function ConceptCard({ icon: Icon, label, title, children }: { icon: typeof BrainCircuit; label: string; title: string; children: React.ReactNode }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      className="rounded-[1.6rem] border border-white/10 bg-white/[0.045] p-6"
    >
      <div className="mb-6 flex items-center justify-between">
        <span className="grid size-11 place-items-center rounded-2xl bg-mint/12 text-mint"><Icon className="size-5" /></span>
        <span className="font-mono text-[0.7rem] font-bold uppercase tracking-[0.16em] text-white/38">{label}</span>
      </div>
      <h3 className="text-xl font-bold text-white">{title}</h3>
      <div className="mt-3 text-[0.98rem] leading-relaxed text-white/62">{children}</div>
    </motion.article>
  );
}

function LayerNetwork({ activeLayer = 3 }: { activeLayer?: number }) {
  const layers = [
    { x: 80, nodes: [70, 145, 220, 295], label: 'ENTRADA' },
    { x: 300, nodes: [45, 105, 170, 235, 300], label: 'OCULTA 1' },
    { x: 515, nodes: [75, 145, 220, 290], label: 'OCULTA 2' },
    { x: 730, nodes: [120, 190, 260], label: 'SAÍDA' },
  ];

  return (
    <div className="rounded-[1.75rem] border border-white/10 bg-[#0b1d1c] p-3 sm:p-6">
      <svg viewBox="0 0 810 350" className="h-auto w-full" aria-label="Rede neural com quatro camadas conectadas">
        <title>Rede neural com quatro camadas conectadas</title>
        {layers.slice(0, -1).flatMap((layer, layerIndex) =>
          layer.nodes.flatMap((y1, nodeIndex) =>
            layers[layerIndex + 1].nodes.map((y2, nextIndex) => (
              <motion.line
                key={`${layerIndex}-${nodeIndex}-${nextIndex}`}
                x1={layer.x}
                y1={y1}
                x2={layers[layerIndex + 1].x}
                y2={y2}
                stroke={layerIndex < activeLayer ? '#6febb8' : '#ffffff'}
                strokeOpacity={layerIndex < activeLayer ? 0.22 : 0.07}
                strokeWidth={layerIndex < activeLayer ? 1.5 : 1}
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: layerIndex * 0.15 }}
              />
            )),
          ),
        )}
        {layers.map((layer, layerIndex) => (
          <g key={layer.label}>
            <text x={layer.x} y="338" textAnchor="middle" fill="#a4b5af" fontSize="12" fontFamily="monospace" fontWeight="700">{layer.label}</text>
            {layer.nodes.map((y, nodeIndex) => (
              <motion.circle
                key={y}
                cx={layer.x}
                cy={y}
                r={layerIndex <= activeLayer ? 15 : 12}
                fill={layerIndex === layers.length - 1 ? '#ff7a5c' : layerIndex <= activeLayer ? '#6febb8' : '#27413d'}
                stroke="#071515"
                strokeWidth="6"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', delay: layerIndex * 0.12 + nodeIndex * 0.03 }}
              />
            ))}
          </g>
        ))}
      </svg>
    </div>
  );
}

const digitTemplates = {
  '0': ['011110', '110011', '110011', '110011', '110011', '011110'].join(''),
  '1': ['001100', '011100', '001100', '001100', '001100', '011110'].join(''),
  '2': ['011110', '110011', '000110', '001100', '011000', '111111'].join(''),
} as const;

const quizQuestions = [
  {
    question: 'Em uma rede que reconhece gatos, o que entra na camada de entrada?',
    options: ['A resposta “gato” pronta', 'Valores numéricos dos pixels', 'Somente regras escritas por humanos'],
    correct: 1,
  },
  {
    question: 'O que muda quando a rede aprende com um erro?',
    options: ['Os pesos das conexões', 'A câmera do computador', 'O nome das camadas'],
    correct: 0,
  },
  {
    question: 'Por que chamamos de Deep Learning?',
    options: ['Porque sempre usa dados do oceano', 'Porque tem várias camadas de processamento', 'Porque nunca podemos entender a saída'],
    correct: 1,
  },
  {
    question: 'Uma confiança de 87% significa que…',
    options: ['a resposta é uma certeza', 'o modelo está proibido de errar', 'é a opção mais provável, mas ainda pode haver erro'],
    correct: 2,
  },
] as const;

export default function Home() {
  const [activeSection, setActiveSection] = useState<SectionId>('inicio');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [neuronInputs, setNeuronInputs] = useState({ borda: 72, curva: 64, textura: 34 });
  const [epoch, setEpoch] = useState(8);
  const [backward, setBackward] = useState(false);
  const [pixels, setPixels] = useState<boolean[]>(() => digitTemplates['2'].split('').map((value) => value === '1'));
  const [sound, setSound] = useState<SoundKey>('assobio');
  const [isPlaying, setIsPlaying] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});

  const activeIndex = lessonSections.findIndex((section) => section.id === activeSection);

  const goTo = useCallback((id: SectionId) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  const goRelative = useCallback((direction: -1 | 1) => {
    const current = lessonSections.findIndex((section) => section.id === activeSection);
    const next = Math.min(lessonSections.length - 1, Math.max(0, current + direction));
    goTo(lessonSections[next].id);
  }, [activeSection, goTo]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(visible.target.id as SectionId);
      },
      { rootMargin: '-35% 0px -45% 0px', threshold: [0, 0.2, 0.5, 0.8] },
    );
    lessonSections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLButtonElement) return;
      if (['ArrowDown', 'ArrowRight', 'PageDown'].includes(event.key)) {
        event.preventDefault();
        goRelative(1);
      }
      if (['ArrowUp', 'ArrowLeft', 'PageUp'].includes(event.key)) {
        event.preventDefault();
        goRelative(-1);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [goRelative]);

  useEffect(() => {
    const onFullscreen = () => setIsFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener('fullscreenchange', onFullscreen);
    return () => document.removeEventListener('fullscreenchange', onFullscreen);
  }, []);

  useEffect(() => {
    if (!document.modelContext) return;
    const controller = new AbortController();
    void document.modelContext.registerTool(
      {
        name: 'navigate_neural_lesson',
        title: 'Navegar na aula de redes neurais',
        description: 'Leva a apresentação para uma seção específica da aula.',
        inputSchema: { type: 'object', properties: { section: { type: 'string', enum: lessonSections.map(({ id }) => id) } }, required: ['section'] },
        annotations: { readOnlyHint: true },
        execute: (input) => {
          const section = (input as { section?: SectionId }).section;
          if (!section || !lessonSections.some((item) => item.id === section)) return { ok: false };
          goTo(section);
          return { ok: true, section };
        },
      },
      { signal: controller.signal },
    );
    return () => controller.abort();
  }, [goTo]);

  const neuronScore = useMemo(() => {
    const weighted = neuronInputs.borda * 0.5 + neuronInputs.curva * 0.38 - neuronInputs.textura * 0.18;
    return Math.round(100 / (1 + Math.exp(-(weighted - 32) / 11)));
  }, [neuronInputs]);

  const imageScores = useMemo(() => {
    const values = Object.entries(digitTemplates).map(([digit, template]) => {
      const mismatch = template.split('').reduce((sum, value, index) => sum + ((value === '1') !== pixels[index] ? 1 : 0), 0);
      return { digit, raw: Math.exp(4.2 * (1 - mismatch / 36)) };
    });
    const total = values.reduce((sum, item) => sum + item.raw, 0);
    return values.map((item) => ({ digit: item.digit, probability: Math.round((item.raw / total) * 100) })).sort((a, b) => b.probability - a.probability);
  }, [pixels]);

  const training = useMemo(() => {
    const loss = 0.06 + 0.84 * Math.exp(-epoch / 10);
    const accuracy = 48 + 48 * (1 - Math.exp(-epoch / 11));
    return { loss, accuracy };
  }, [epoch]);

  const sounds = {
    assobio: { label: 'Assobio', frequency: 'Alta', duration: 'Longa', texture: 'Suave', probabilities: [91, 5, 4] },
    palma: { label: 'Palma', frequency: 'Espalhada', duration: 'Curta', texture: 'Ruidosa', probabilities: [4, 93, 3] },
    voz: { label: 'Voz', frequency: 'Média', duration: 'Variável', texture: 'Com padrões', probabilities: [7, 8, 85] },
  } as const;

  const waveform = useMemo(() => Array.from({ length: 96 }, (_, i) => {
    if (sound === 'assobio') return Math.sin(i * 0.72) * 42;
    if (sound === 'palma') return Math.sin(i * 2.45) * (1 - i / 96) * 62 + Math.sin(i * 0.47) * (1 - i / 96) * 20;
    return Math.sin(i * 0.34) * 26 + Math.sin(i * 0.91) * 15 + Math.sin(i * 0.08) * 9;
  }), [sound]);

  const playSound = useCallback(() => {
    const AudioContextClass = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass || isPlaying) return;
    const context = new AudioContextClass();
    const gain = context.createGain();
    gain.connect(context.destination);
    setIsPlaying(true);

    if (sound === 'palma') {
      const buffer = context.createBuffer(1, context.sampleRate * 0.45, context.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < data.length; i += 1) data[i] = (Math.random() * 2 - 1) * (1 - i / data.length);
      const source = context.createBufferSource();
      source.buffer = buffer;
      gain.gain.setValueAtTime(0.48, context.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 0.42);
      source.connect(gain);
      source.start();
    } else {
      const oscillator = context.createOscillator();
      oscillator.type = sound === 'assobio' ? 'sine' : 'sawtooth';
      oscillator.frequency.setValueAtTime(sound === 'assobio' ? 1050 : 180, context.currentTime);
      if (sound === 'voz') oscillator.frequency.linearRampToValueAtTime(245, context.currentTime + 0.75);
      gain.gain.setValueAtTime(0.001, context.currentTime);
      gain.gain.exponentialRampToValueAtTime(sound === 'assobio' ? 0.17 : 0.1, context.currentTime + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 0.85);
      oscillator.connect(gain);
      oscillator.start();
      oscillator.stop(context.currentTime + 0.86);
    }
    window.setTimeout(() => {
      setIsPlaying(false);
      void context.close();
    }, 950);
  }, [isPlaying, sound]);

  const quizScore = quizQuestions.reduce((score, question, index) => score + (quizAnswers[index] === question.correct ? 1 : 0), 0);
  const quizComplete = Object.keys(quizAnswers).length === quizQuestions.length;

  return (
    <main className="overflow-x-hidden bg-ink text-paper selection:bg-mint selection:text-ink">
      <Button
        variant="outline"
        size="icon"
        className="fixed right-4 top-4 z-50 rounded-full border-white/15 bg-ink/75 text-white shadow-xl backdrop-blur-xl hover:bg-ink hover:text-white"
        onClick={() => (document.fullscreenElement ? document.exitFullscreen() : document.documentElement.requestFullscreen())}
        aria-label={isFullscreen ? 'Sair da tela cheia' : 'Abrir em tela cheia'}
      >
        {isFullscreen ? <X className="size-4" /> : <Expand className="size-4" />}
      </Button>

      <section id="inicio" className="lesson-section relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-20 bg-[url('/hero-neural-network.png')] bg-cover bg-center opacity-55" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/90 to-ink/28" />
        <div className="hero-grid absolute inset-0 -z-10" />
        <div className="absolute -right-32 top-1/3 -z-10 size-[30rem] rounded-full bg-mint/10 blur-[100px]" />
        <div className="section-wrap">
          <motion.div initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.65 }}>
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-mint/25 bg-mint/10 px-4 py-2 font-mono text-xs font-bold uppercase tracking-[0.16em] text-mint">
              <BrainCircuit className="size-4" /> Aula interativa · IA sem mistério
            </div>
            <h1 className="max-w-[13ch] font-display text-[clamp(3.15rem,7.5vw,6.1rem)] leading-[0.88] tracking-[-0.055em] text-white">
              Redes neurais <span className="text-mint">&amp;</span> Deep Learning
            </h1>
            <p className="mt-7 max-w-2xl text-[clamp(1.08rem,2vw,1.35rem)] leading-relaxed text-white/70">
              Como máquinas transformam números em reconhecimento de <span className="font-bold text-white">imagens</span>, <span className="font-bold text-white">sons</span> e padrões.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button size="lg" className="h-12 rounded-full bg-mint px-7 font-bold text-ink hover:bg-mint/90" onClick={() => goTo('percepcao')}>
                Começar a aula <ArrowDown className="ml-2 size-4" />
              </Button>
              <span className="inline-flex h-12 items-center gap-2 rounded-full border border-white/12 bg-white/5 px-5 text-sm text-white/58">
                <Activity className="size-4 text-coral" /> 3 laboratórios ao vivo
              </span>
            </div>
            <p className="mt-10 font-mono text-xs uppercase tracking-[0.15em] text-white/38">Inteligência Artificial · Professor João Gabriel de Carvalho Santos</p>
          </motion.div>
        </div>
      </section>

      <section id="percepcao" className="lesson-section bg-paper text-ink">
        <div className="section-wrap">
          <SectionHeading number="01" eyebrow="Antes da rede" title="Você vê um cachorro. A máquina vê números." description="Reconhecer parece instantâneo para nós. Para o computador, primeiro é preciso transformar o mundo em dados que possam ser calculados." dark={false} />
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {[
              { icon: Eye, name: 'Imagem', human: '“É um cachorro!”', machine: 'Pixels: brilho e cor em cada posição', visual: '▦' },
              { icon: AudioWaveform, name: 'Som', human: '“Alguém bateu palmas!”', machine: 'Amostras: pressão do ar ao longo do tempo', visual: '∿' },
              { icon: Database, name: 'Dados', human: '“Este perfil parece suspeito.”', machine: 'Valores: horário, local, valor e frequência', visual: '01' },
            ].map(({ icon: Icon, name, human, machine, visual }) => (
              <motion.article key={name} whileHover={{ y: -5 }} className="rounded-[1.75rem] border border-ink/10 bg-white p-6 shadow-[0_18px_60px_rgba(7,21,21,.08)]">
                <div className="flex items-center justify-between">
                  <span className="grid size-12 place-items-center rounded-2xl bg-ink text-mint"><Icon className="size-5" /></span>
                  <span className="font-display text-4xl text-ink/10">{visual}</span>
                </div>
                <h3 className="mt-6 text-xl font-bold">{name}</h3>
                <div className="mt-5 grid gap-3 text-sm">
                  <div className="rounded-xl bg-mint/16 p-4"><span className="font-mono text-[0.7rem] font-bold uppercase tracking-wider text-ink/55">Humano</span><p className="mt-1 font-bold">{human}</p></div>
                  <div className="rounded-xl bg-ink/6 p-4"><span className="font-mono text-[0.7rem] font-bold uppercase tracking-wider text-ink/55">Máquina</span><p className="mt-1 leading-relaxed">{machine}</p></div>
                </div>
              </motion.article>
            ))}
          </div>
          <div className="mt-8 flex items-start gap-4 rounded-2xl border border-coral/25 bg-coral/10 p-5">
            <Lightbulb className="mt-0.5 size-5 shrink-0 text-coral" />
            <p className="leading-relaxed"><strong>Ideia-chave:</strong> uma rede neural não recebe “cachorro” ou “palma”. Ela recebe muitos números e aprende quais combinações costumam representar cada categoria.</p>
          </div>
        </div>
      </section>

      <section id="neuronio" className="lesson-section">
        <div className="section-wrap grid items-center gap-12 lg:grid-cols-[.9fr_1.1fr]">
          <div>
            <SectionHeading number="02" eyebrow="Peça fundamental" title="Um neurônio é uma pequena decisão matemática." description="Ele recebe sinais, dá importância diferente a cada um, soma tudo e decide quanto deve se ativar." />
            <div className="mt-9 space-y-3">
              {[
                ['1. Entradas', 'Os números que chegam: pixels, frequências, medidas…'],
                ['2. Pesos', 'Quanto cada entrada importa para esta decisão.'],
                ['3. Soma + viés', 'A combinação dos sinais ganha um pequeno ajuste.'],
                ['4. Ativação', 'A saída fica forte, fraca ou zerada.'],
              ].map(([title, text], index) => (
                <motion.div key={title} initial={{ opacity: 0, x: -18 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }} className="flex gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                  <span className="font-mono text-sm font-bold text-mint">0{index + 1}</span><div><h3 className="font-bold text-white">{title}</h3><p className="mt-1 text-sm leading-relaxed text-white/58">{text}</p></div>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 sm:p-9">
            <div className="flex flex-col items-center gap-5 sm:flex-row">
              <div className="grid gap-3">
                {['borda × 0,5', 'curva × 0,3', 'textura × −0,2'].map((input) => <div key={input} className="rounded-xl border border-white/10 bg-ink px-4 py-3 font-mono text-xs text-white/65">{input}</div>)}
              </div>
              <ArrowRight className="size-6 rotate-90 text-white/30 sm:rotate-0" />
              <motion.div animate={{ boxShadow: ['0 0 0 rgba(111,235,184,0)', '0 0 45px rgba(111,235,184,.28)', '0 0 0 rgba(111,235,184,0)'] }} transition={{ duration: 2.4, repeat: Infinity }} className="grid size-40 shrink-0 place-items-center rounded-full border-[10px] border-ink bg-mint text-center text-ink">
                <div><BrainCircuit className="mx-auto size-7" /><strong className="mt-2 block">Σ → ativação</strong></div>
              </motion.div>
              <ArrowRight className="size-6 rotate-90 text-white/30 sm:rotate-0" />
              <div className="rounded-2xl bg-coral px-5 py-4 text-center text-ink"><span className="font-mono text-[0.7rem] font-bold uppercase">saída</span><strong className="block text-2xl">0,87</strong></div>
            </div>
            <p className="mt-7 text-center text-sm leading-relaxed text-white/48">O nome vem de uma inspiração no cérebro, mas esta é uma <strong className="text-white/75">simplificação matemática</strong>, não uma cópia de um neurônio biológico.</p>
          </div>
        </div>
      </section>

      <section id="camadas" className="lesson-section bg-[#0a1c1b]">
        <div className="section-wrap">
          <SectionHeading number="03" eyebrow="Arquitetura" title="Milhares de pequenas decisões, organizadas em camadas." description="Cada camada transforma os dados um pouco mais. A saída de uma vira a entrada da próxima." />
          <div className="mt-10 grid gap-8 lg:grid-cols-[1.2fr_.8fr]">
            <LayerNetwork />
            <div className="grid gap-4">
              {[
                { icon: PanelTop, tag: 'Entrada', title: 'Recebe os dados', text: 'Um neurônio para cada valor relevante. Em uma imagem, podem ser milhares de pixels.' },
                { icon: Cpu, tag: 'Ocultas', title: 'Processam padrões', text: 'Combinam sinais e constroem representações cada vez mais úteis.' },
                { icon: Target, tag: 'Saída', title: 'Produz a previsão', text: 'Cada saída representa uma possibilidade: gato, cão, pássaro…' },
              ].map(({ icon: Icon, tag, title, text }) => (
                <div key={tag} className="flex gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-mint/12 text-mint"><Icon className="size-5" /></span>
                  <div><span className="font-mono text-[0.7rem] font-bold uppercase tracking-widest text-coral">{tag}</span><h3 className="mt-1 font-bold text-white">{title}</h3><p className="mt-1 text-sm leading-relaxed text-white/55">{text}</p></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="lab-neuronio" className="lesson-section bg-paper text-ink">
        <div className="section-wrap">
          <SectionHeading number="04" eyebrow="Laboratório virtual 1" title="Faça um neurônio “acender”." description="Imagine que este neurônio procura uma bola em uma imagem. Ajuste o quanto ele percebe cada característica e observe a confiança mudar." dark={false} />
          <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_.85fr]">
            <div className="rounded-[1.75rem] border border-ink/10 bg-white p-6 sm:p-8">
              <div className="mb-7 flex items-center gap-3"><SlidersHorizontal className="size-5" /><h3 className="text-lg font-bold">Sinais recebidos</h3></div>
              {(Object.entries(neuronInputs) as [keyof typeof neuronInputs, number][]).map(([key, value]) => {
                const labels = { borda: 'Bordas bem definidas', curva: 'Formato arredondado', textura: 'Textura irregular' };
                const weights = { borda: 'peso +0,50', curva: 'peso +0,38', textura: 'peso −0,18' };
                return (
                  <div key={key} className="mb-7 block">
                    <span className="mb-3 flex items-center justify-between gap-3 text-sm"><strong>{labels[key]}</strong><span className="font-mono text-xs text-ink/55">{value}% · {weights[key]}</span></span>
                    <input aria-label={labels[key]} className="range w-full" type="range" min="0" max="100" value={value} onChange={(event) => setNeuronInputs((current) => ({ ...current, [key]: Number(event.target.value) }))} />
                  </div>
                );
              })}
              <Button variant="outline" className="rounded-full border-ink/15 bg-transparent text-ink hover:bg-ink/5" onClick={() => setNeuronInputs({ borda: 50, curva: 50, textura: 50 })}><RefreshCw className="mr-2 size-4" />Reiniciar sinais</Button>
            </div>
            <div className="relative overflow-hidden rounded-[1.75rem] bg-ink p-7 text-paper">
              <div className="absolute inset-0 opacity-30 summary-grid" />
              <div className="relative">
                <span className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-mint">Ativação calculada</span>
                <div className="mt-7 flex items-end justify-between gap-4">
                  <div><strong className="font-display text-7xl leading-none text-white">{neuronScore}%</strong><p className="mt-3 text-white/55">de confiança: “há uma bola”</p></div>
                  <motion.div animate={{ scale: 0.78 + neuronScore / 450, opacity: 0.45 + neuronScore / 200 }} className="grid size-24 place-items-center rounded-full bg-mint text-ink"><Zap className="size-9" /></motion.div>
                </div>
                <div className="mt-8 h-3 overflow-hidden rounded-full bg-white/10"><motion.div className="h-full rounded-full bg-mint" animate={{ width: `${neuronScore}%` }} /></div>
                <div className="mt-7 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm leading-relaxed text-white/66">
                  {neuronScore >= 75 ? 'Ativação forte: as pistas positivas superaram a textura irregular.' : neuronScore >= 45 ? 'Ativação média: há pistas, mas o neurônio ainda está em dúvida.' : 'Ativação fraca: os sinais atuais não combinam muito com o padrão aprendido.'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="treinamento" className="lesson-section">
        <div className="section-wrap grid items-center gap-12 lg:grid-cols-[.82fr_1.18fr]">
          <div>
            <SectionHeading number="05" eyebrow="Aprendizado" title="A rede aprende comparando tentativa e resposta." description="No início, os pesos são quase aleatórios. Ao ver exemplos rotulados, a rede prevê, mede o erro e ajusta suas conexões." />
            <div className="mt-8 flex flex-wrap items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider">
              {['1. Dados', '2. Previsão', '3. Erro', '4. Ajuste'].map((item, index) => <span key={item} className={`rounded-full px-4 py-2 ${index === 2 ? 'bg-coral text-ink' : 'bg-white/7 text-white/65'}`}>{item}</span>)}
            </div>
          </div>
          <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-6 sm:p-8">
            <div className="flex flex-wrap items-end justify-between gap-5">
              <div><span className="font-mono text-xs uppercase tracking-widest text-mint">Época de treino</span><strong className="mt-1 block font-display text-5xl text-white">{epoch}</strong></div>
              <div className="grid grid-cols-2 gap-3 text-right">
                <div className="rounded-xl bg-white/5 px-4 py-3"><span className="text-xs text-white/45">erro</span><strong className="block text-xl text-coral">{training.loss.toFixed(2)}</strong></div>
                <div className="rounded-xl bg-white/5 px-4 py-3"><span className="text-xs text-white/45">acerto</span><strong className="block text-xl text-mint">{training.accuracy.toFixed(0)}%</strong></div>
              </div>
            </div>
            <input aria-label="Número de épocas de treinamento" className="range range-dark mt-7 w-full" type="range" min="0" max="40" value={epoch} onChange={(event) => setEpoch(Number(event.target.value))} />
            <div className="mt-7 h-56 rounded-2xl bg-ink/60 p-4">
              <svg viewBox="0 0 600 190" className="h-full w-full" aria-label="Gráfico: erro diminui e acerto aumenta durante o treinamento">
                <title>Erro diminui e acerto aumenta durante o treinamento</title>
                {[40, 90, 140].map((y) => <line key={y} x1="28" x2="580" y1={y} y2={y} stroke="white" strokeOpacity=".08" />)}
                <motion.path d="M28 28 C150 42 220 110 580 154" fill="none" stroke="#ff7a5c" strokeWidth="5" strokeLinecap="round" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} />
                <motion.path d="M28 158 C150 145 240 63 580 34" fill="none" stroke="#6febb8" strokeWidth="5" strokeLinecap="round" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} />
                <line x1={28 + (552 * epoch) / 40} x2={28 + (552 * epoch) / 40} y1="18" y2="172" stroke="white" strokeOpacity=".55" strokeDasharray="5 6" />
                <text x="38" y="24" fill="#ff7a5c" fontSize="12">erro</text><text x="520" y="28" fill="#6febb8" fontSize="12">acerto</text>
              </svg>
            </div>
            <p className="mt-5 text-sm leading-relaxed text-white/55"><strong className="text-white">Uma época</strong> é uma passagem pelos exemplos de treino. Mais épocas ajudam até certo ponto; depois, a rede pode começar a decorar.</p>
          </div>
        </div>
      </section>

      <section id="backprop" className="lesson-section bg-paper text-ink">
        <div className="section-wrap">
          <SectionHeading number="06" eyebrow="Retropropagação" title="O acerto vai para frente. A correção volta." description="Backpropagation é o processo que descobre quanto cada conexão contribuiu para o erro e ajusta os pesos na direção certa." dark={false} />
          <div className="mt-10 grid gap-8 lg:grid-cols-[1.15fr_.85fr]">
            <div className="rounded-[1.75rem] border border-ink/10 bg-white p-6 sm:p-8">
              <div className="mb-6 flex flex-wrap gap-3">
                <Button className={`rounded-full ${!backward ? 'bg-ink text-white hover:bg-ink/90' : 'bg-ink/8 text-ink hover:bg-ink/12'}`} onClick={() => setBackward(false)}><Play className="mr-2 size-4" />Ida: prever</Button>
                <Button className={`rounded-full ${backward ? 'bg-coral text-ink hover:bg-coral/90' : 'bg-ink/8 text-ink hover:bg-ink/12'}`} onClick={() => setBackward(true)}><Repeat2 className="mr-2 size-4" />Volta: corrigir</Button>
              </div>
              <div className="flex min-h-64 items-center justify-between gap-2 overflow-hidden rounded-2xl bg-ink px-5 sm:px-9">
                {['DADOS', 'CAMADA 1', 'CAMADA 2', 'RESPOSTA'].map((label, index) => (
                  <div key={label} className="relative flex items-center">
                    <motion.div animate={{ backgroundColor: backward ? (index === 3 ? '#ff7a5c' : '#24403a') : index === 0 ? '#6febb8' : '#24403a' }} className="grid size-14 place-items-center rounded-full border-4 border-ink text-center font-mono text-[0.55rem] font-bold text-white sm:size-20 sm:text-[0.65rem]">{label}</motion.div>
                    {index < 3 ? <motion.div animate={{ x: backward ? [-4, 4, -4] : [4, -4, 4] }} transition={{ repeat: Infinity, duration: 1.2 }} className="mx-1 text-mint sm:mx-4">{backward ? <ArrowLeft className="size-5 sm:size-7" /> : <ArrowRight className="size-5 sm:size-7" />}</motion.div> : null}
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-[1.75rem] bg-ink p-7 text-paper">
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-coral">{backward ? 'Passo de correção' : 'Passo de previsão'}</span>
              <h3 className="mt-4 text-2xl font-bold">{backward ? '“Quem contribuiu para o erro?”' : '“Qual é a resposta da rede?”'}</h3>
              <p className="mt-4 leading-relaxed text-white/62">{backward ? 'O erro é distribuído de trás para frente. Cada peso recebe um pequeno ajuste proporcional à sua responsabilidade.' : 'Os dados atravessam as camadas. Cada neurônio transforma os sinais até a camada final produzir probabilidades.'}</p>
              <div className="mt-7 rounded-2xl bg-white/6 p-5 text-sm leading-relaxed text-white/66"><strong className="text-mint">Analogia:</strong> corrigir uma conta de matemática começando pelo resultado e revisando cada etapa que levou até ele.</div>
            </div>
          </div>
        </div>
      </section>

      <section id="deep-learning" className="lesson-section">
        <div className="section-wrap">
          <SectionHeading number="07" eyebrow="Profundidade" title="“Deep” significa muitas camadas de representação." description="A profundidade permite construir ideias complexas a partir de pistas simples. Nenhuma camada faz tudo sozinha." />
          <div className="mt-12 grid gap-5 md:grid-cols-4">
            {[
              { n: '01', title: 'Pixels', text: 'valores claros e escuros', glyph: '▦' },
              { n: '02', title: 'Bordas', text: 'linhas e mudanças de contraste', glyph: '╱' },
              { n: '03', title: 'Partes', text: 'olhos, orelhas, texturas', glyph: '◉' },
              { n: '04', title: 'Objeto', text: '“provavelmente é um gato”', glyph: 'CAT' },
            ].map((item, index) => (
              <motion.div key={item.title} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.12 }} className="relative rounded-[1.5rem] border border-white/10 bg-white/[0.045] p-6">
                <span className="font-mono text-xs text-mint">{item.n}</span><div className="my-8 font-display text-4xl text-white/25">{item.glyph}</div><h3 className="text-xl font-bold text-white">{item.title}</h3><p className="mt-2 text-sm leading-relaxed text-white/52">{item.text}</p>
                {index < 3 ? <ArrowRight className="absolute -right-4 top-1/2 z-10 hidden size-7 rounded-full bg-mint p-1 text-ink md:block" /> : null}
              </motion.div>
            ))}
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-mint/20 bg-mint/8 p-5"><strong className="text-mint">Aprendizado de características</strong><p className="mt-2 text-sm leading-relaxed text-white/58">A rede descobre sozinha quais pistas intermediárias são úteis; não precisamos programar “procure uma orelha”.</p></div>
            <div className="rounded-2xl border border-coral/20 bg-coral/8 p-5"><strong className="text-coral">Custo dessa profundidade</strong><p className="mt-2 text-sm leading-relaxed text-white/58">Treinar exige muitos exemplos, processamento e energia. “Mais profunda” não significa automaticamente “melhor”.</p></div>
          </div>
        </div>
      </section>

      <section id="imagens" className="lesson-section bg-paper text-ink">
        <div className="section-wrap grid items-center gap-12 lg:grid-cols-[.88fr_1.12fr]">
          <div>
            <SectionHeading number="08" eyebrow="Reconhecimento de imagens" title="Filtros procuram padrões onde quer que apareçam." description="Redes convolucionais, ou CNNs, usam pequenos filtros que deslizam pela imagem. Eles detectam bordas, texturas e formas sem depender de uma posição exata." dark={false} />
            <div className="mt-8 rounded-2xl border border-ink/10 bg-white p-5">
              <div className="flex items-start gap-3"><ScanLine className="mt-0.5 size-5 text-coral" /><p className="text-sm leading-relaxed"><strong>Convolução:</strong> comparar uma pequena janela com cada região da imagem e criar um novo mapa que destaca onde aquele padrão apareceu.</p></div>
            </div>
          </div>
          <div className="rounded-[1.75rem] bg-ink p-6 sm:p-8">
            <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4">
              <div className="grid aspect-square grid-cols-6 gap-1 rounded-2xl bg-white/5 p-4">
                {Array.from({ length: 36 }, (_, index) => <span key={index} className={`rounded-sm ${[7, 8, 13, 14, 15, 19, 20, 26, 27, 28].includes(index) ? 'bg-mint' : 'bg-white/8'}`} />)}
              </div>
              <motion.div animate={{ x: [-6, 6, -6] }} transition={{ repeat: Infinity, duration: 2.2 }} className="text-coral"><ArrowRight className="size-7" /></motion.div>
              <div className="space-y-3">
                {['Bordas curvas', 'Duas regiões fechadas', 'Traço contínuo'].map((feature, index) => <div key={feature} className="rounded-xl border border-white/10 bg-white/5 p-3 text-xs text-white/65"><span className="mr-2 text-mint">{index + 1}.</span>{feature}</div>)}
                <div className="rounded-xl bg-coral p-3 text-center font-mono text-xs font-bold text-ink">SAÍDA: “8”</div>
              </div>
            </div>
            <p className="mt-6 text-center text-sm text-white/45">O filtro é reutilizado em toda a imagem — por isso funciona mesmo se o desenho estiver um pouco deslocado.</p>
          </div>
        </div>
      </section>

      <section id="lab-imagem" className="lesson-section">
        <div className="section-wrap">
          <SectionHeading number="09" eyebrow="Laboratório virtual 2" title="Desenhe um número para a mini-rede." description="Clique nos pixels para modificar a imagem. Este simulador compara seu desenho com padrões aprendidos e distribui a confiança entre 0, 1 e 2." />
          <div className="mt-10 grid gap-8 lg:grid-cols-[.8fr_1.2fr]">
            <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-6">
              <div className="mb-5 flex flex-wrap items-center justify-between gap-3"><h3 className="font-bold text-white">Tela 6 × 6</h3><div className="flex gap-2">{(['0', '1', '2'] as const).map((digit) => <button key={digit} onClick={() => setPixels(digitTemplates[digit].split('').map((value) => value === '1'))} className="grid size-9 place-items-center rounded-full bg-white/8 font-mono text-sm font-bold text-white hover:bg-mint hover:text-ink" aria-label={`Carregar exemplo do número ${digit}`}>{digit}</button>)}</div></div>
              <div className="mx-auto grid max-w-sm grid-cols-6 gap-2 rounded-2xl bg-black/20 p-4">
                {pixels.map((active, index) => (
                  <button key={index} type="button" onClick={() => setPixels((current) => current.map((value, pixelIndex) => pixelIndex === index ? !value : value))} className={`pixel-button aspect-square rounded-md ${active ? 'is-on' : ''}`} aria-label={`Pixel linha ${Math.floor(index / 6) + 1}, coluna ${(index % 6) + 1}`} aria-pressed={active} />
                ))}
              </div>
              <Button variant="outline" className="mt-5 w-full rounded-full border-white/15 bg-transparent text-white hover:bg-white/8 hover:text-white" onClick={() => setPixels(Array(36).fill(false))}><RefreshCw className="mr-2 size-4" />Limpar desenho</Button>
            </div>
            <div className="rounded-[1.75rem] bg-paper p-7 text-ink sm:p-9">
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-ink/50">Previsão em tempo real</span>
              <div className="mt-5 flex items-center justify-between gap-6 rounded-2xl bg-ink p-6 text-white">
                <div><p className="text-sm text-white/48">A rede acredita que é</p><strong className="font-display text-7xl text-mint">{imageScores[0].digit}</strong></div>
                <div className="text-right"><strong className="text-3xl">{imageScores[0].probability}%</strong><p className="text-sm text-white/48">confiança</p></div>
              </div>
              <div className="mt-7 space-y-5">
                {[...imageScores].sort((a, b) => Number(a.digit) - Number(b.digit)).map(({ digit, probability }) => (
                  <div key={digit}><div className="mb-2 flex justify-between text-sm"><strong>Número {digit}</strong><span className="font-mono">{probability}%</span></div><div className="h-3 overflow-hidden rounded-full bg-ink/10"><motion.div animate={{ width: `${probability}%` }} className={`h-full rounded-full ${digit === imageScores[0].digit ? 'bg-coral' : 'bg-ink/25'}`} /></div></div>
                ))}
              </div>
              <p className="mt-8 rounded-2xl bg-ink/6 p-4 text-sm leading-relaxed text-ink/65"><strong>Importante:</strong> esta mini-rede usa comparação simplificada. Redes reais aprendem milhões de pesos e lidam com imagens muito maiores.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="sons" className="lesson-section bg-[#0a1c1b]">
        <div className="section-wrap">
          <SectionHeading number="10" eyebrow="Reconhecimento de sons" title="Para a rede, áudio é uma onda que muda no tempo." description="O microfone converte vibrações do ar em números. A rede procura padrões de frequência, duração, ritmo e intensidade." />
          <div className="mt-10 grid gap-5 lg:grid-cols-4">
            {[
              { icon: Volume2, title: 'Onda', text: 'O som vira milhares de amostras por segundo.' },
              { icon: Activity, title: 'Espectro', text: 'Separamos frequências graves e agudas.' },
              { icon: Boxes, title: 'Padrões', text: 'Camadas encontram fonemas, timbres e ritmos.' },
              { icon: Bot, title: 'Saída', text: 'A rede prevê palavra, instrumento ou evento.' },
            ].map(({ icon: Icon, title, text }, index) => (
              <ConceptCard key={title} icon={Icon} label={`passo ${index + 1}`} title={title}>{text}</ConceptCard>
            ))}
          </div>
          <div className="mt-8 rounded-[1.75rem] border border-white/10 bg-ink p-6">
            <svg viewBox="0 0 900 150" className="h-40 w-full" aria-label="Forma de onda se transformando em faixas de frequência">
              <title>Forma de onda se transformando em faixas de frequência</title>
              <path d="M10 75 C35 15 55 135 80 75 S125 15 150 75 S195 135 220 75 S265 25 290 75" fill="none" stroke="#6febb8" strokeWidth="5" />
              <path d="M325 75 H400" stroke="white" strokeOpacity=".3" strokeWidth="2" markerEnd="url(#arrow)" />
              {[0, 1, 2, 3, 4, 5, 6].map((bar) => <motion.rect key={bar} x={445 + bar * 55} y={75 - [22, 48, 34, 58, 27, 44, 18][bar]} width="32" height={[44, 96, 68, 116, 54, 88, 36][bar]} rx="7" fill={bar === 3 ? '#ff7a5c' : '#6febb8'} initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true }} style={{ transformOrigin: 'center' }} />)}
            </svg>
          </div>
        </div>
      </section>

      <section id="lab-som" className="lesson-section bg-paper text-ink">
        <div className="section-wrap">
          <SectionHeading number="11" eyebrow="Laboratório virtual 3" title="Ouça o padrão. Veja o que a rede percebe." description="Escolha uma amostra sintética. A visualização mostra a forma de onda, as características extraídas e a classificação final." dark={false} />
          <div className="mt-10 grid gap-7 lg:grid-cols-[1.15fr_.85fr]">
            <div className="rounded-[1.75rem] border border-ink/10 bg-white p-6 sm:p-8">
              <div className="flex flex-wrap gap-2">
                {(Object.keys(sounds) as SoundKey[]).map((key) => <Button key={key} onClick={() => setSound(key)} className={`rounded-full ${sound === key ? 'bg-ink text-white hover:bg-ink/90' : 'bg-ink/7 text-ink hover:bg-ink/12'}`}>{sounds[key].label}</Button>)}
              </div>
              <div className="mt-6 overflow-hidden rounded-2xl bg-ink p-4">
                <svg viewBox="0 0 600 140" className="h-44 w-full" aria-label={`Forma de onda de ${sounds[sound].label}`}>
                  <title>{`Forma de onda de ${sounds[sound].label}`}</title>
                  <line x1="0" x2="600" y1="70" y2="70" stroke="white" strokeOpacity=".1" />
                  <motion.polyline key={sound} points={waveform.map((value, index) => `${(index / 95) * 600},${70 - value}`).join(' ')} fill="none" stroke="#6febb8" strokeWidth="3.5" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8 }} />
                </svg>
              </div>
              <Button className="mt-5 w-full rounded-full bg-coral font-bold text-ink hover:bg-coral/90" onClick={playSound} disabled={isPlaying}><Play className="mr-2 size-4" />{isPlaying ? 'Reproduzindo…' : 'Ouvir amostra sintética'}</Button>
              <div className="mt-5 grid grid-cols-3 gap-3 text-center text-sm">
                {[['Frequência', sounds[sound].frequency], ['Duração', sounds[sound].duration], ['Textura', sounds[sound].texture]].map(([label, value]) => <div key={label} className="rounded-xl bg-ink/5 p-3"><span className="block text-xs text-ink/48">{label}</span><strong className="mt-1 block">{value}</strong></div>)}
              </div>
            </div>
            <div className="rounded-[1.75rem] bg-ink p-7 text-white">
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-mint">Camada de saída</span>
              <h3 className="mt-3 text-2xl font-bold">Classificação do som</h3>
              <div className="mt-8 space-y-6">
                {(['Assobio', 'Palma', 'Voz'] as const).map((label, index) => {
                  const probability = sounds[sound].probabilities[index];
                  return <div key={label}><div className="mb-2 flex justify-between text-sm"><span>{label}</span><strong>{probability}%</strong></div><div className="h-3 overflow-hidden rounded-full bg-white/10"><motion.div animate={{ width: `${probability}%` }} className={`h-full rounded-full ${probability > 80 ? 'bg-coral' : 'bg-mint/45'}`} /></div></div>;
                })}
              </div>
              <p className="mt-8 text-sm leading-relaxed text-white/52">Em reconhecimento de fala real, a rede analisa sequências maiores para montar fonemas, palavras e contexto.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="mundo-real" className="lesson-section">
        <div className="section-wrap">
          <SectionHeading number="12" eyebrow="Aplicações e responsabilidade" title="Poderosas, mas não mágicas." description="Redes profundas já percebem padrões em escala enorme. Ainda assim, a qualidade depende dos dados, do objetivo e das decisões humanas ao redor do sistema." />
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Eye, title: 'Visão', text: 'Controle de qualidade, leitura de exames e auxílio à acessibilidade.' },
              { icon: Volume2, title: 'Áudio', text: 'Legendas automáticas, comandos de voz e identificação de músicas.' },
              { icon: Sparkles, title: 'Criação', text: 'Geração de texto, imagens, áudio e apoio à programação.' },
              { icon: Gauge, title: 'Previsão', text: 'Manutenção de máquinas, clima, demanda e detecção de fraude.' },
            ].map(({ icon, title, text }) => <ConceptCard key={title} icon={icon} label="uso real" title={title}>{text}</ConceptCard>)}
          </div>
          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {[
              { icon: Database, title: 'Viés nos dados', text: 'Se poucos grupos aparecem no treino, os erros podem atingir justamente quem foi pouco representado.' },
              { icon: ShieldAlert, title: 'Confiança não é certeza', text: 'Uma previsão de 99% ainda pode falhar. Decisões críticas precisam de revisão humana.' },
              { icon: AlertTriangle, title: 'Explicação difícil', text: 'Milhões de pesos tornam a decisão menos transparente do que uma regra simples.' },
            ].map(({ icon: Icon, title, text }) => <div key={title} className="rounded-2xl border border-coral/20 bg-coral/7 p-5"><Icon className="size-5 text-coral" /><h3 className="mt-4 font-bold text-white">{title}</h3><p className="mt-2 text-sm leading-relaxed text-white/55">{text}</p></div>)}
          </div>
          <div className="mt-8 rounded-2xl border border-mint/22 bg-mint/8 p-6 text-center"><CircleHelp className="mx-auto size-6 text-mint" /><p className="mt-3 text-lg font-bold text-white">Se uma rede erra uma decisão importante, quem deve responder: o modelo, os dados ou quem decidiu usá-lo?</p></div>
        </div>
      </section>

      <section id="quiz" className="lesson-section bg-paper text-ink">
        <div className="section-wrap">
          <SectionHeading number="13" eyebrow="Desafio final" title="Cheque sua rede mental." description="Responda às quatro perguntas. O feedback aparece imediatamente — exatamente como no ciclo de treino." dark={false} />
          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            {quizQuestions.map((question, questionIndex) => (
              <article key={question.question} className="rounded-[1.5rem] border border-ink/10 bg-white p-6">
                <div className="flex gap-3"><span className="grid size-8 shrink-0 place-items-center rounded-full bg-ink font-mono text-xs font-bold text-white">{questionIndex + 1}</span><h3 className="font-bold leading-snug">{question.question}</h3></div>
                <div className="mt-5 grid gap-2">
                  {question.options.map((option, optionIndex) => {
                    const selected = quizAnswers[questionIndex] === optionIndex;
                    const answered = quizAnswers[questionIndex] !== undefined;
                    const correct = question.correct === optionIndex;
                    return <button key={option} type="button" onClick={() => setQuizAnswers((current) => ({ ...current, [questionIndex]: optionIndex }))} className={`flex items-center justify-between rounded-xl border px-4 py-3 text-left text-sm transition ${selected && correct ? 'border-mint bg-mint/22' : selected ? 'border-coral bg-coral/14' : answered && correct ? 'border-mint/45 bg-mint/8' : 'border-ink/10 hover:border-ink/25'}`}><span>{option}</span>{selected ? (correct ? <Check className="size-4 text-ink" /> : <X className="size-4 text-coral" />) : null}</button>;
                  })}
                </div>
              </article>
            ))}
          </div>
          <motion.div animate={{ scale: quizComplete ? [1, 1.015, 1] : 1 }} className="mt-7 flex flex-wrap items-center justify-between gap-5 rounded-[1.5rem] bg-ink p-6 text-white">
            <div><span className="font-mono text-xs uppercase tracking-widest text-mint">Resultado</span><p className="mt-1 text-lg">{quizComplete ? `Você acertou ${quizScore} de ${quizQuestions.length}.` : `Respondidas: ${Object.keys(quizAnswers).length} de ${quizQuestions.length}.`}</p></div>
            {quizComplete ? <Button className="rounded-full bg-mint font-bold text-ink hover:bg-mint/90" onClick={() => setQuizAnswers({})}><RefreshCw className="mr-2 size-4" />Tentar novamente</Button> : <span className="text-sm text-white/45">Complete todas para ver sua pontuação.</span>}
          </motion.div>
        </div>
      </section>

      <section id="resumo" className="lesson-section relative overflow-hidden">
        <div className="summary-grid absolute inset-0 opacity-20" />
        <div className="section-wrap relative">
          <SectionHeading number="14" eyebrow="Fechamento" title="Do dado bruto à decisão: a rede aprende o caminho." description="Você não precisa imaginar uma mente dentro da máquina. Pense em transformações numéricas organizadas, treinadas por exemplos e ajustadas pelo erro." />
          <div className="mt-11 grid gap-4 md:grid-cols-5">
            {[
              ['01', 'Entrada', 'pixels, ondas, números'],
              ['02', 'Pesos', 'importância de cada sinal'],
              ['03', 'Camadas', 'padrões simples → complexos'],
              ['04', 'Treino', 'prever, errar e ajustar'],
              ['05', 'Saída', 'probabilidades, não certezas'],
            ].map(([number, title, text], index) => <motion.div key={title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }} className="rounded-2xl border border-white/10 bg-white/[0.045] p-5"><span className="font-mono text-xs text-mint">{number}</span><h3 className="mt-8 font-bold text-white">{title}</h3><p className="mt-2 text-sm leading-relaxed text-white/48">{text}</p></motion.div>)}
          </div>
          <div className="mt-8 grid gap-5 lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="rounded-[1.5rem] border border-mint/20 bg-mint/8 p-6"><div className="flex gap-4"><Lightbulb className="mt-1 size-6 shrink-0 text-mint" /><div><span className="font-mono text-xs font-bold uppercase tracking-widest text-mint">Frase para guardar</span><p className="mt-2 text-xl font-bold text-white">Deep Learning é aprender representações em várias camadas, ajustando conexões com exemplos.</p></div></div></div>
            <Button size="lg" className="rounded-full bg-coral px-7 font-bold text-ink hover:bg-coral/90" onClick={() => goTo('inicio')}><RefreshCw className="mr-2 size-4" />Recomeçar aula</Button>
          </div>
          <footer className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-white/35"><span>Redes Neurais &amp; Deep Learning</span><span className="flex items-center gap-2"><GraduationCap className="size-4" /> IA sem mistério</span></footer>
        </div>
      </section>

      <nav aria-label="Navegação entre conteúdos" className="fixed bottom-4 left-1/2 z-40 flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/12 bg-ink/88 p-2 shadow-2xl backdrop-blur-xl">
        <Button variant="ghost" size="icon" className="rounded-full text-white hover:bg-white/10 hover:text-white disabled:opacity-25" disabled={activeIndex === 0} onClick={() => goRelative(-1)} aria-label="Conteúdo anterior"><ChevronLeft className="size-5" /></Button>
        <span className="min-w-24 text-center font-mono text-xs font-bold text-white/62">{String(activeIndex + 1).padStart(2, '0')} / {lessonSections.length}</span>
        <Button variant="ghost" size="icon" className="rounded-full text-white hover:bg-white/10 hover:text-white disabled:opacity-25" disabled={activeIndex === lessonSections.length - 1} onClick={() => goRelative(1)} aria-label="Próximo conteúdo"><ChevronRight className="size-5" /></Button>
      </nav>

    </main>
  );
}
