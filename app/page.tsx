'use client';

import { AnimatePresence, motion } from 'motion/react';
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  BrainCircuit,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleHelp,
  Dices,
  Expand,
  GitBranch,
  GraduationCap,
  Leaf,
  Lightbulb,
  Play,
  RefreshCw,
  Route,
  ShieldAlert,
  Sparkles,
  Target,
  Trophy,
  Users,
  X,
} from 'lucide-react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { Button } from '@/components/ui/button';

const lessonSections = [
  { id: 'inicio', short: 'Início', title: 'Como a IA decide?' },
  { id: 'conceito', short: 'Ideia', title: 'Decidir é dividir' },
  { id: 'exemplo', short: 'Exemplo', title: 'Siga o caminho' },
  { id: 'treino', short: 'Treino', title: 'Como a árvore aprende' },
  { id: 'laboratorio', short: 'Laboratório', title: 'Faça uma previsão' },
  { id: 'limites', short: 'Limites', title: 'Quando a árvore erra' },
  { id: 'quiz', short: 'Quiz', title: 'Desafio final' },
  { id: 'resumo', short: 'Resumo', title: 'O que fica' },
] as const;

type SectionId = (typeof lessonSections)[number]['id'];

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
          execute: (input: unknown) => unknown | Promise<unknown>;
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
  inverse = false,
}: {
  number: string;
  eyebrow: string;
  title: string;
  description?: string;
  inverse?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="max-w-4xl"
    >
      <div className={`mb-4 flex items-center gap-3 font-mono text-xs font-bold uppercase tracking-[.2em] ${inverse ? 'text-mint' : 'text-ink/45'}`}>
        <span className={`grid size-7 place-items-center rounded-full ${inverse ? 'bg-mint text-ink' : 'bg-ink text-paper'}`}>{number}</span>
        {eyebrow}
      </div>
      <h2 className={`font-display text-4xl leading-[1.02] tracking-[-.045em] sm:text-6xl ${inverse ? 'text-white' : 'text-ink'}`}>{title}</h2>
      {description && <p className={`mt-5 max-w-2xl text-lg leading-relaxed sm:text-xl ${inverse ? 'text-white/58' : 'text-ink/58'}`}>{description}</p>}
    </motion.div>
  );
}

function HeroTree() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, delay: 0.25 }}
      className="relative mx-auto h-[420px] w-full max-w-[560px] sm:h-[455px]"
      aria-label="Árvore de decisão sobre sair na chuva"
    >
      <svg viewBox="0 0 560 455" preserveAspectRatio="xMidYMid meet" className="absolute inset-0 size-full overflow-visible" aria-hidden="true">
        <motion.path d="M280 93 L104 216" className="tree-stroke" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6, delay: 0.6 }} />
        <motion.path d="M280 93 L456 216" className="tree-stroke" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6, delay: 0.75 }} />
        <motion.path d="M104 268 L30 377" className="tree-stroke" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.55, delay: 1 }} />
        <motion.path d="M104 268 L210 377" className="tree-stroke" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.55, delay: 1.1 }} />
      </svg>

      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="tree-node tree-root">
        <span className="node-tag">pergunta 1</span>
        <strong>Está chovendo?</strong>
      </motion.div>
      <span className="answer answer-left">sim</span>
      <span className="answer answer-right">não</span>
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.85 }} className="tree-node tree-child-left">
        <span className="node-tag">pergunta 2</span>
        <strong>Tem guarda-chuva?</strong>
      </motion.div>
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.95 }} className="tree-node tree-result tree-result-right">
        <span className="text-2xl">☀️</span>
        <strong>Pode sair!</strong>
      </motion.div>
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.25 }} className="tree-node tree-result tree-result-left-a">
        <span className="text-2xl">☂️</span>
        <strong>Leve o guarda-chuva</strong>
      </motion.div>
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.4 }} className="tree-node tree-result tree-result-left-b">
        <span className="text-2xl">🏠</span>
        <strong>Melhor esperar</strong>
      </motion.div>
    </motion.div>
  );
}

function ConceptSection() {
  const cards = [
    { icon: CircleHelp, name: 'Nó', label: 'uma pergunta', example: '“Tem mais de 60 min?”', color: 'bg-mint' },
    { icon: GitBranch, name: 'Galho', label: 'uma resposta', example: '“Sim” ou “Não”', color: 'bg-[#ffd765]' },
    { icon: Leaf, name: 'Folha', label: 'uma conclusão', example: '“Assista a um filme”', color: 'bg-coral' },
  ];

  return (
    <section id="conceito" data-lesson-section className="lesson-section bg-paper text-ink">
      <div className="section-wrap">
        <SectionHeading number="1" eyebrow="A ideia central" title="Decidir é dividir." description="Uma árvore transforma um problema grande em uma sequência de perguntas pequenas. Cada resposta leva a um novo caminho." />
        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {cards.map((card, index) => (
            <motion.article
              key={card.name}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ delay: index * 0.12 }}
              className="group rounded-[28px] border border-ink/10 bg-white p-6 shadow-[0_18px_50px_rgba(7,21,21,.06)] sm:p-8"
            >
              <div className={`mb-8 grid size-14 place-items-center rounded-2xl ${card.color} transition-transform duration-300 group-hover:-rotate-3 group-hover:scale-105`}>
                <card.icon className="size-7" />
              </div>
              <div className="font-mono text-xs font-bold uppercase tracking-[.18em] text-ink/40">{card.name}</div>
              <h3 className="mt-2 text-2xl font-bold">É {card.label}</h3>
              <p className="mt-4 rounded-2xl bg-ink/[.045] p-4 font-mono text-sm text-ink/70">{card.example}</p>
            </motion.article>
          ))}
        </div>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mt-8 flex items-start gap-3 rounded-2xl border border-ink/10 bg-[#fff8dc] p-5 text-sm leading-relaxed text-ink/70">
          <Lightbulb className="mt-0.5 size-5 shrink-0 text-[#ba7a00]" />
          <p><strong className="text-ink">Pense num fluxograma.</strong> A diferença é que a árvore aprende quais perguntas usar observando vários exemplos.</p>
        </motion.div>
      </div>
    </section>
  );
}

function ExampleSection() {
  const [longTime, setLongTime] = useState<boolean | null>(null);
  const [withFriends, setWithFriends] = useState<boolean | null>(null);

  const result = longTime === false ? { emoji: '📺', title: 'Episódio curto', text: 'Pouco tempo pede uma história rápida.' } : longTime === true && withFriends === true ? { emoji: '😂', title: 'Comédia', text: 'Boa para todo mundo rir junto.' } : longTime === true && withFriends === false ? { emoji: '🚀', title: 'Ficção científica', text: 'Tempo para mergulhar em outro universo.' } : null;

  const reset = () => {
    setLongTime(null);
    setWithFriends(null);
  };

  return (
    <section id="exemplo" data-lesson-section className="lesson-section overflow-hidden bg-ink text-white">
      <div className="section-wrap">
        <SectionHeading inverse number="2" eyebrow="Exemplo interativo" title="Você é a árvore agora." description="Responda às perguntas e veja como cada escolha acende um caminho diferente." />

        <div className="mt-10 grid items-stretch gap-5 lg:grid-cols-[.9fr_1.1fr]">
          <div className="rounded-[30px] border border-white/10 bg-white/[.055] p-6 sm:p-8">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold uppercase tracking-[.18em] text-white/40">O que assistir hoje?</span>
              <Button onClick={reset} variant="ghost" size="sm" className="rounded-full text-white/55 hover:bg-white/10 hover:text-white" aria-label="Recomeçar exemplo">
                <RefreshCw className="size-3.5" /> Recomeçar
              </Button>
            </div>

            <div className="mt-8 space-y-6">
              <div className={`question-card ${longTime !== null ? 'is-answered' : 'is-active'}`}>
                <span className="question-index">1</span>
                <div>
                  <h3>Você tem mais de 60 minutos?</h3>
                  <div className="mt-4 flex gap-2">
                    <ChoiceButton active={longTime === true} onClick={() => { setLongTime(true); setWithFriends(null); }}>Sim</ChoiceButton>
                    <ChoiceButton active={longTime === false} onClick={() => { setLongTime(false); setWithFriends(null); }}>Não</ChoiceButton>
                  </div>
                </div>
              </div>

              <AnimatePresence mode="wait">
                {longTime === true && (
                  <motion.div key="q2" initial={{ opacity: 0, height: 0, y: -8 }} animate={{ opacity: 1, height: 'auto', y: 0 }} exit={{ opacity: 0, height: 0 }} className={`question-card overflow-hidden ${withFriends !== null ? 'is-answered' : 'is-active'}`}>
                    <span className="question-index">2</span>
                    <div>
                      <h3>Você está com amigos?</h3>
                      <div className="mt-4 flex gap-2">
                        <ChoiceButton active={withFriends === true} onClick={() => setWithFriends(true)}>Sim</ChoiceButton>
                        <ChoiceButton active={withFriends === false} onClick={() => setWithFriends(false)}>Não</ChoiceButton>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="relative min-h-[390px] overflow-hidden rounded-[30px] bg-mint p-6 text-ink sm:p-8">
            <div className="absolute -right-20 -top-20 size-64 rounded-full border-[42px] border-ink/[.06]" />
            <div className="relative flex h-full flex-col">
              <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[.18em] text-ink/48"><Route className="size-4" /> Caminho percorrido</div>
              <div className="mt-7 flex flex-wrap items-center gap-2 text-sm font-bold">
                <PathPill active>Início</PathPill>
                <ArrowRight className="size-4 opacity-30" />
                <PathPill active={longTime !== null}>{longTime === null ? '60+ min?' : longTime ? '60+ min ✓' : '60+ min ✕'}</PathPill>
                {longTime === true && <><ArrowRight className="size-4 opacity-30" /><PathPill active={withFriends !== null}>{withFriends === null ? 'Amigos?' : withFriends ? 'Amigos ✓' : 'Amigos ✕'}</PathPill></>}
              </div>

              <div className="grid flex-1 place-items-center py-8 text-center">
                <AnimatePresence mode="wait">
                  {result ? (
                    <motion.div key={result.title} initial={{ opacity: 0, scale: 0.88, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9 }}>
                      <div className="text-7xl drop-shadow-sm">{result.emoji}</div>
                      <p className="mt-5 font-mono text-xs font-bold uppercase tracking-[.2em] text-ink/45">a folha da árvore diz</p>
                      <h3 className="mt-2 font-display text-4xl tracking-[-.04em]">{result.title}</h3>
                      <p className="mx-auto mt-3 max-w-sm text-ink/60">{result.text}</p>
                    </motion.div>
                  ) : (
                    <motion.div key="waiting" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-sm">
                      <Dices className="mx-auto size-14 opacity-25" />
                      <p className="mt-4 text-lg font-semibold text-ink/55">Responda à pergunta para revelar a recomendação.</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ChoiceButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <Button onClick={onClick} variant="outline" aria-pressed={active} className={`h-10 min-w-20 rounded-full border-white/15 ${active ? 'border-mint bg-mint font-bold text-ink hover:bg-mint/90' : 'bg-transparent text-white hover:bg-white/10 hover:text-white'}`}>
      {active && <Check className="size-3.5" />}{children}
    </Button>
  );
}

function PathPill({ active, children }: { active: boolean; children: React.ReactNode }) {
  return <span className={`rounded-full border px-3 py-1.5 transition-all ${active ? 'border-ink bg-ink text-mint' : 'border-ink/15 text-ink/35'}`}>{children}</span>;
}

const studentData = [
  { name: 'Ana', hours: 1, passed: false },
  { name: 'Bia', hours: 2, passed: false },
  { name: 'Caio', hours: 2, passed: true },
  { name: 'Davi', hours: 3, passed: false },
  { name: 'Eli', hours: 3, passed: true },
  { name: 'Fê', hours: 4, passed: true },
  { name: 'Gabi', hours: 5, passed: true },
  { name: 'Hugo', hours: 6, passed: true },
];

function TrainingSection() {
  const [threshold, setThreshold] = useState(3);
  const hits = studentData.filter((item) => (item.hours >= threshold) === item.passed).length;
  const accuracy = Math.round((hits / studentData.length) * 100);

  return (
    <section id="treino" data-lesson-section className="lesson-section bg-[#e6dfcc] text-ink">
      <div className="section-wrap">
        <SectionHeading number="3" eyebrow="Aprendizado" title="A árvore procura a melhor pergunta." description="Durante o treino, ela testa vários cortes nos dados e escolhe aquele que separa melhor os exemplos." />

        <div className="mt-10 grid gap-5 lg:grid-cols-[1.12fr_.88fr]">
          <div className="rounded-[30px] border border-ink/10 bg-paper p-6 sm:p-8">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="font-mono text-xs font-bold uppercase tracking-[.18em] text-ink/40">Dados de treino</p>
                <h3 className="mt-2 text-xl font-bold">Horas de estudo × Resultado</h3>
              </div>
              <div className="flex gap-4 text-xs font-semibold text-ink/55"><span>🟢 Aprovou</span><span>🔴 Não aprovou</span></div>
            </div>

            <div className="mt-8 grid grid-cols-4 gap-2 sm:grid-cols-8">
              {studentData.map((student) => {
                const predicted = student.hours >= threshold;
                const hit = predicted === student.passed;
                return (
                  <motion.div layout key={student.name} className={`relative rounded-2xl border p-3 text-center transition-colors ${hit ? 'border-ink/8 bg-white' : 'border-coral bg-coral/10'}`}>
                    {!hit && <span className="absolute right-1.5 top-1.5 grid size-4 place-items-center rounded-full bg-coral text-[9px] font-black"><X className="size-2.5" /></span>}
                    <div className="text-2xl">{student.passed ? '🟢' : '🔴'}</div>
                    <div className="mt-2 text-sm font-bold">{student.name}</div>
                    <div className="text-xs text-ink/45">{student.hours}h</div>
                  </motion.div>
                );
              })}
            </div>

            <div className="mt-8 rounded-2xl bg-ink/[.045] p-5">
              <div className="flex items-center justify-between gap-4">
                <label htmlFor="threshold" className="font-semibold">Aprovar se estudou pelo menos…</label>
                <output className="rounded-full bg-ink px-3 py-1 font-mono text-sm font-bold text-mint">{threshold}h</output>
              </div>
              <input id="threshold" type="range" min="1" max="6" step="1" value={threshold} onChange={(event) => setThreshold(Number(event.target.value))} className="range mt-5 w-full" />
              <div className="mt-2 flex justify-between font-mono text-[10px] text-ink/35"><span>1h</span><span>2h</span><span>3h</span><span>4h</span><span>5h</span><span>6h</span></div>
            </div>
          </div>

          <div className="flex flex-col rounded-[30px] bg-ink p-6 text-white sm:p-8">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold uppercase tracking-[.18em] text-white/40">Qualidade do corte</span>
              <Target className="size-5 text-mint" />
            </div>
            <div className="my-auto py-8 text-center">
              <motion.div key={accuracy} initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="font-display text-7xl tracking-[-.06em] text-mint sm:text-8xl">{accuracy}%</motion.div>
              <p className="mt-3 text-lg font-semibold">de acertos no treino</p>
              <p className="mx-auto mt-3 max-w-xs text-sm leading-relaxed text-white/45">{accuracy >= 80 ? 'Bom corte! Os grupos ficaram mais organizados.' : 'Ainda há muita mistura. Tente mover o corte.'}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[.055] p-4 text-sm leading-relaxed text-white/60">
              <strong className="text-white">A melhor divisão é 3h.</strong> Mas note: Caio e Davi fogem da regra. Dados reais quase nunca são perfeitos.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function LaboratorySection() {
  const [hours, setHours] = useState(2);
  const [attendance, setAttendance] = useState(82);
  const [sleep, setSleep] = useState(7);

  const prediction = useMemo(() => {
    if (attendance < 70) return { passed: false, result: 'Risco de reprovação', emoji: '⚠️', path: [`Frequência ${attendance}%`, 'abaixo de 70%'], reason: 'A baixa frequência encerrou o caminho cedo.' };
    if (hours >= 3) return { passed: true, result: 'Provável aprovação', emoji: '🎓', path: [`Frequência ${attendance}%`, `${hours}h de estudo`, '3h ou mais'], reason: 'Boa frequência + estudo suficiente.' };
    if (sleep >= 7) return { passed: true, result: 'Provável aprovação', emoji: '✨', path: [`Frequência ${attendance}%`, `${hours}h de estudo`, `${sleep}h de sono`], reason: 'O descanso ajudou neste caminho.' };
    return { passed: false, result: 'Precisa de atenção', emoji: '📚', path: [`Frequência ${attendance}%`, `${hours}h de estudo`, `${sleep}h de sono`], reason: 'Pouco estudo e pouco sono aumentaram o risco.' };
  }, [attendance, hours, sleep]);

  return (
    <section id="laboratorio" data-lesson-section className="lesson-section bg-paper text-ink">
      <div className="section-wrap">
        <SectionHeading number="4" eyebrow="Laboratório" title="Mude os dados. Mude a previsão." description="Ajuste o perfil abaixo e acompanhe, em tempo real, quais perguntas a árvore faz." />
        <div className="mt-10 grid overflow-hidden rounded-[32px] border border-ink/10 bg-white shadow-[0_24px_70px_rgba(7,21,21,.08)] lg:grid-cols-2">
          <div className="p-6 sm:p-9">
            <div className="mb-8 flex items-center gap-3">
              <div className="grid size-11 place-items-center rounded-2xl bg-[#dce8ff]"><GraduationCap className="size-6" /></div>
              <div><p className="font-bold">Perfil do estudante</p><p className="text-sm text-ink/45">Arraste os controles</p></div>
            </div>
            <div className="space-y-8">
              <RangeControl label="Horas de estudo por dia" value={hours} min={0} max={6} suffix="h" onChange={setHours} />
              <RangeControl label="Frequência nas aulas" value={attendance} min={40} max={100} step={5} suffix="%" onChange={setAttendance} />
              <RangeControl label="Horas de sono" value={sleep} min={3} max={10} suffix="h" onChange={setSleep} />
            </div>
            <p className="mt-9 flex items-start gap-2 text-xs leading-relaxed text-ink/42"><ShieldAlert className="mt-0.5 size-4 shrink-0" /> Este exemplo é didático. Na vida real, decisões sobre pessoas exigem muito mais cuidado e dados.</p>
          </div>

          <div className={`relative flex min-h-[430px] flex-col p-6 transition-colors duration-500 sm:p-9 ${prediction.passed ? 'bg-mint' : 'bg-coral'}`}>
            <div className="flex items-center justify-between font-mono text-xs font-bold uppercase tracking-[.18em] text-ink/45"><span>Previsão da árvore</span><BrainCircuit className="size-5" /></div>
            <div className="my-auto py-8 text-center">
              <AnimatePresence mode="wait">
                <motion.div key={`${prediction.result}-${prediction.path.join('-')}`} initial={{ opacity: 0, y: 12, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }}>
                  <div className="text-7xl">{prediction.emoji}</div>
                  <h3 className="mx-auto mt-5 max-w-md font-display text-4xl tracking-[-.045em] sm:text-5xl">{prediction.result}</h3>
                  <p className="mt-3 font-medium text-ink/58">{prediction.reason}</p>
                </motion.div>
              </AnimatePresence>
            </div>
            <div>
              <p className="mb-3 font-mono text-[10px] font-bold uppercase tracking-[.2em] text-ink/40">caminho usado</p>
              <div className="flex flex-wrap items-center gap-1.5">
                {prediction.path.map((item, index) => <span key={`${item}-${index}`} className="contents"><span className="rounded-full bg-ink px-3 py-1.5 text-xs font-bold text-white">{item}</span>{index < prediction.path.length - 1 && <ChevronRight className="size-3.5 opacity-35" />}</span>)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function RangeControl({ label, value, min, max, step = 1, suffix, onChange }: { label: string; value: number; min: number; max: number; step?: number; suffix: string; onChange: (value: number) => void }) {
  return (
    <div>
      <div className="mb-3 flex items-center justify-between gap-4"><label className="font-semibold">{label}</label><output className="min-w-14 rounded-full bg-ink px-3 py-1 text-center font-mono text-sm font-bold text-mint">{value}{suffix}</output></div>
      <input aria-label={label} className="range w-full" type="range" min={min} max={max} step={step} value={value} onChange={(event) => onChange(Number(event.target.value))} />
      <div className="mt-1 flex justify-between text-[10px] text-ink/35"><span>{min}{suffix}</span><span>{max}{suffix}</span></div>
    </div>
  );
}

function LimitsSection() {
  const [complex, setComplex] = useState(false);
  const points = [12, 32, 54, 74, 92, 22, 44, 64, 84, 96, 16, 38, 58, 79];

  return (
    <section id="limites" data-lesson-section className="lesson-section bg-[#ffcebd] text-ink">
      <div className="section-wrap">
        <SectionHeading number="5" eyebrow="Limites" title="Acertar tudo pode ser um problema." description="Uma árvore enorme pode decorar os exemplos do treino em vez de aprender uma regra útil. Isso se chama overfitting." />
        <div className="mt-10 grid gap-5 lg:grid-cols-[1fr_.9fr]">
          <div className="rounded-[30px] bg-paper p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div><p className="font-mono text-xs font-bold uppercase tracking-[.18em] text-ink/40">Complexidade</p><h3 className="mt-2 text-xl font-bold">Escolha o tipo de árvore</h3></div>
              <div className="flex rounded-full bg-ink/[.06] p-1">
                <button onClick={() => setComplex(false)} className={`rounded-full px-4 py-2 text-sm font-bold transition ${!complex ? 'bg-ink text-white' : 'text-ink/45'}`}>Simples</button>
                <button onClick={() => setComplex(true)} className={`rounded-full px-4 py-2 text-sm font-bold transition ${complex ? 'bg-ink text-white' : 'text-ink/45'}`}>Enorme</button>
              </div>
            </div>

            <div className="relative mt-8 h-64 overflow-hidden rounded-2xl border border-ink/10 bg-white">
              <div className="absolute inset-0 bg-[linear-gradient(rgba(7,21,21,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(7,21,21,.05)_1px,transparent_1px)] bg-[size:28px_28px]" />
              {points.map((x, index) => <motion.span layout key={index} className={`absolute size-4 rounded-full border-2 border-white shadow-sm ${index % 3 === 0 ? 'bg-coral' : 'bg-mint'}`} animate={{ left: `${x}%`, top: `${18 + ((index * 37) % 68)}%` }} />)}
              <AnimatePresence mode="wait">
                {complex ? (
                  <motion.div key="complex" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0">
                    {[18, 31, 45, 57, 68, 78, 88].map((left, i) => <span key={left} className="absolute bottom-0 top-0 w-px bg-ink/45" style={{ left: `${left}%`, transform: `rotate(${i % 2 ? 7 : -5}deg)` }} />)}
                  </motion.div>
                ) : (
                  <motion.div key="simple" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute bottom-0 top-0 left-[52%] w-1 rounded-full bg-ink" />
                )}
              </AnimatePresence>
              <span className="absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider">dados de treino</span>
            </div>
          </div>

          <div className="rounded-[30px] bg-ink p-6 text-white sm:p-8">
            <p className="font-mono text-xs font-bold uppercase tracking-[.18em] text-white/40">Placar</p>
            <div className="mt-7 grid grid-cols-2 gap-3">
              <ScoreCard label="No treino" value={complex ? 100 : 88} tone="mint" />
              <ScoreCard label="Em casos novos" value={complex ? 54 : 82} tone={complex ? 'coral' : 'mint'} />
            </div>
            <AnimatePresence mode="wait">
              <motion.div key={complex ? 'warning' : 'good'} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className={`mt-6 rounded-2xl border p-5 ${complex ? 'border-coral/30 bg-coral/10' : 'border-mint/30 bg-mint/10'}`}>
                <div className="flex gap-3"><span className={`grid size-9 shrink-0 place-items-center rounded-xl ${complex ? 'bg-coral text-ink' : 'bg-mint text-ink'}`}>{complex ? <ShieldAlert className="size-5" /> : <Check className="size-5" />}</span><div><h3 className="font-bold">{complex ? 'Ela decorou, não aprendeu.' : 'Simples e generalizável.'}</h3><p className="mt-1 text-sm leading-relaxed text-white/52">{complex ? 'Muitas regras específicas falham quando chegam exemplos diferentes.' : 'Poucas perguntas capturam o padrão principal e funcionam melhor fora do treino.'}</p></div></div>
              </motion.div>
            </AnimatePresence>
            <p className="mt-6 text-sm leading-relaxed text-white/45"><strong className="text-white">E tem mais:</strong> se os dados de treino tiverem preconceitos ou erros, a árvore também poderá repeti-los.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ScoreCard({ label, value, tone }: { label: string; value: number; tone: 'mint' | 'coral' }) {
  return <div className="rounded-2xl bg-white/[.06] p-4"><p className="text-xs text-white/42">{label}</p><motion.p key={value} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className={`mt-2 font-display text-4xl ${tone === 'mint' ? 'text-mint' : 'text-coral'}`}>{value}%</motion.p></div>;
}

const quizQuestions = [
  { question: 'Em uma árvore, o que é uma “folha”?', options: ['Uma pergunta', 'Uma conclusão', 'Um dado apagado'], correct: 1, explain: 'A folha é o final de um caminho: a previsão ou decisão.' },
  { question: 'Como a árvore aprende?', options: ['Chutando ao acaso', 'Decorando sempre', 'Testando divisões nos dados'], correct: 2, explain: 'Ela compara perguntas e escolhe as que melhor separam os exemplos.' },
  { question: 'Uma árvore com 100% no treino é sempre melhor?', options: ['Sim, sempre', 'Não, pode ter decorado', 'Só se for colorida'], correct: 1, explain: 'Resultado perfeito no treino pode indicar overfitting.' },
];

function QuizSection() {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const question = quizQuestions[index];

  const choose = (option: number) => {
    if (selected !== null) return;
    setSelected(option);
    if (option === question.correct) setScore((value) => value + 1);
  };

  const next = () => {
    if (index === quizQuestions.length - 1) setFinished(true);
    else { setIndex((value) => value + 1); setSelected(null); }
  };

  const restart = () => { setIndex(0); setSelected(null); setScore(0); setFinished(false); };

  return (
    <section id="quiz" data-lesson-section className="lesson-section bg-ink text-white">
      <div className="section-wrap">
        <SectionHeading inverse number="6" eyebrow="Desafio final" title="Será que a ideia criou raízes?" description="Três perguntas rápidas para fechar o raciocínio." />
        <div className="mt-10 grid gap-5 lg:grid-cols-[.72fr_1.28fr]">
          <div className="hidden rounded-[30px] bg-mint p-8 text-ink lg:flex lg:flex-col">
            <Trophy className="size-10" />
            <div className="my-auto"><p className="font-mono text-xs font-bold uppercase tracking-[.2em] text-ink/45">Seu placar</p><p className="mt-2 font-display text-8xl tracking-[-.07em]">{score}<span className="text-4xl text-ink/30">/{quizQuestions.length}</span></p></div>
            <p className="text-sm font-medium text-ink/55">Errar também faz parte do treino — para humanos e máquinas.</p>
          </div>

          <div className="min-h-[450px] rounded-[30px] border border-white/10 bg-white/[.055] p-6 sm:p-9">
            <AnimatePresence mode="wait">
              {!finished ? (
                <motion.div key={index} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <div className="flex items-center justify-between"><span className="font-mono text-xs font-bold uppercase tracking-[.18em] text-mint">Pergunta {index + 1} de {quizQuestions.length}</span><span className="font-display text-2xl text-white/20">0{index + 1}</span></div>
                  <h3 className="mt-8 max-w-2xl text-2xl font-bold leading-snug sm:text-3xl">{question.question}</h3>
                  <div className="mt-7 space-y-3">
                    {question.options.map((option, optionIndex) => {
                      const isCorrect = selected !== null && optionIndex === question.correct;
                      const isWrong = selected === optionIndex && optionIndex !== question.correct;
                      return (
                        <button key={option} onClick={() => choose(optionIndex)} disabled={selected !== null} className={`flex w-full items-center gap-4 rounded-2xl border p-4 text-left font-semibold transition sm:p-5 ${isCorrect ? 'border-mint bg-mint text-ink' : isWrong ? 'border-coral bg-coral text-ink' : 'border-white/10 bg-white/[.035] text-white hover:border-white/25 hover:bg-white/[.07]'}`}>
                          <span className={`grid size-8 shrink-0 place-items-center rounded-full border font-mono text-xs ${isCorrect || isWrong ? 'border-ink/20' : 'border-white/20 text-white/45'}`}>{isCorrect ? <Check className="size-4" /> : isWrong ? <X className="size-4" /> : String.fromCharCode(65 + optionIndex)}</span>{option}
                        </button>
                      );
                    })}
                  </div>
                  {selected !== null && (
                    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-5 flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-white/[.06] p-4">
                      <p className="max-w-xl text-sm leading-relaxed text-white/58">{question.explain}</p>
                      <Button onClick={next} className="rounded-full bg-mint px-5 font-bold text-ink hover:bg-mint/90">{index === quizQuestions.length - 1 ? 'Ver resultado' : 'Próxima'} <ArrowRight className="size-4" /></Button>
                    </motion.div>
                  )}
                </motion.div>
              ) : (
                <motion.div key="result" initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} className="grid min-h-[380px] place-items-center text-center">
                  <div><div className="text-7xl">{score === 3 ? '🏆' : score >= 2 ? '🌱' : '🔁'}</div><p className="mt-5 font-mono text-xs font-bold uppercase tracking-[.2em] text-mint">Resultado</p><h3 className="mt-2 font-display text-5xl tracking-[-.05em]">{score} de 3</h3><p className="mx-auto mt-4 max-w-md text-white/55">{score === 3 ? 'Perfeito! Você chegou à folha certa.' : score >= 2 ? 'Mandou bem! A ideia principal está clara.' : 'Mais uma volta pela árvore e você chega lá.'}</p><Button onClick={restart} variant="outline" className="mt-7 rounded-full border-white/15 bg-transparent px-5 text-white hover:bg-white/10 hover:text-white"><RefreshCw className="size-4" /> Refazer quiz</Button></div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

function SummarySection({ onRestart }: { onRestart: () => void }) {
  const takeaways = [
    ['01', 'Perguntas', 'Nós testam características dos dados.'],
    ['02', 'Caminhos', 'Cada resposta escolhe um galho.'],
    ['03', 'Previsões', 'Folhas entregam o resultado final.'],
    ['04', 'Cuidado', 'Dados ruins criam decisões ruins.'],
  ];
  return (
    <section id="resumo" data-lesson-section className="lesson-section relative overflow-hidden bg-mint text-ink">
      <div className="absolute inset-0 summary-grid opacity-20" />
      <div className="section-wrap relative">
        <SectionHeading number="7" eyebrow="Resumo" title="Da raiz até a resposta." description="Você acabou de percorrer o mesmo raciocínio usado por uma árvore de decisão." />
        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {takeaways.map(([number, title, description], index) => (
            <motion.div key={number} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * .08 }} className="rounded-[24px] border border-ink/10 bg-paper/90 p-5 backdrop-blur">
              <span className="font-mono text-xs font-bold text-ink/35">{number}</span><h3 className="mt-6 text-lg font-bold">{title}</h3><p className="mt-2 text-sm leading-relaxed text-ink/55">{description}</p>
            </motion.div>
          ))}
        </div>
        <div className="mt-12 flex flex-col items-start justify-between gap-6 rounded-[28px] bg-ink p-6 text-white sm:flex-row sm:items-center sm:p-8">
          <div><p className="font-mono text-xs font-bold uppercase tracking-[.2em] text-coral">Fim da aula · começo das perguntas</p><h3 className="mt-2 text-2xl font-bold">Onde você usaria uma árvore de decisão?</h3></div>
          <Button onClick={onRestart} className="h-11 rounded-full bg-coral px-5 font-bold text-ink hover:bg-coral/90"><RefreshCw className="size-4" /> Voltar ao início</Button>
        </div>
      </div>
    </section>
  );
}

function LessonNavigation({ current, goTo, goPrevious, goNext }: { current: number; goTo: (id: SectionId) => void; goPrevious: () => void; goNext: () => void }) {
  const progress = ((current + 1) / lessonSections.length) * 100;
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) void document.documentElement.requestFullscreen?.();
    else void document.exitFullscreen?.();
  };

  return (
    <>
      <div className="fixed inset-x-0 top-0 z-[60] h-1 bg-white/10"><motion.div className="h-full bg-coral" animate={{ width: `${progress}%` }} /></div>
      <header className="fixed inset-x-0 top-1 z-50 border-b border-white/10 bg-ink/82 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-[1480px] items-center justify-between px-4 sm:px-7">
          <button onClick={() => goTo('inicio')} className="flex items-center gap-2.5 text-left" aria-label="Ir ao início">
            <span className="grid size-9 place-items-center rounded-xl bg-mint text-ink shadow-[0_0_24px_rgba(111,235,184,.18)]"><BrainCircuit className="size-5" /></span>
            <span className="hidden font-display text-base tracking-tight text-white sm:block">IA sem mistério</span>
          </button>
          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] font-bold uppercase tracking-[.16em] text-white/40 sm:text-xs"><span className="text-mint">0{current + 1}</span> / 0{lessonSections.length} <span className="hidden sm:inline">· {lessonSections[current].title}</span></span>
            <Button onClick={toggleFullscreen} variant="ghost" size="icon" className="rounded-full text-white/50 hover:bg-white/10 hover:text-white" aria-label="Alternar tela cheia"><Expand className="size-4" /></Button>
          </div>
        </div>
      </header>

      <nav aria-label="Capítulos da aula" className="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 xl:block">
        <div className="flex flex-col items-end gap-2 rounded-2xl border border-white/10 bg-ink/70 p-2 backdrop-blur-xl">
          {lessonSections.map((section, index) => (
            <button key={section.id} onClick={() => goTo(section.id)} aria-label={`Ir para ${section.title}`} aria-current={current === index ? 'step' : undefined} className="group flex h-8 items-center gap-2 rounded-xl px-2 text-right">
              <span className={`max-w-0 overflow-hidden whitespace-nowrap text-xs font-semibold transition-all duration-300 group-hover:max-w-28 ${current === index ? 'max-w-28 text-white' : 'text-white/45'}`}>{section.short}</span>
              <span className={`block rounded-full transition-all ${current === index ? 'h-5 w-1.5 bg-mint' : 'size-1.5 bg-white/25 group-hover:bg-white/60'}`} />
            </button>
          ))}
        </div>
      </nav>

      <div className="fixed bottom-4 left-1/2 z-50 flex -translate-x-1/2 items-center gap-1 rounded-full border border-white/10 bg-ink/88 p-1.5 shadow-2xl backdrop-blur-xl">
        <Button onClick={goPrevious} disabled={current === 0} variant="ghost" size="icon" className="rounded-full text-white/55 hover:bg-white/10 hover:text-white" aria-label="Seção anterior"><ChevronLeft className="size-4" /></Button>
        <span className="min-w-[112px] px-2 text-center text-xs font-bold text-white">{lessonSections[current].short}</span>
        <Button onClick={goNext} disabled={current === lessonSections.length - 1} className="rounded-full bg-mint text-ink hover:bg-mint/90" size="icon" aria-label="Próxima seção"><ChevronRight className="size-4" /></Button>
      </div>
    </>
  );
}

export default function Home() {
  const [current, setCurrent] = useState(0);
  const currentRef = useRef(0);

  useEffect(() => { currentRef.current = current; }, [current]);

  const goTo = useCallback((id: SectionId) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  const goPrevious = useCallback(() => {
    const nextIndex = Math.max(0, currentRef.current - 1);
    goTo(lessonSections[nextIndex].id);
  }, [goTo]);

  const goNext = useCallback(() => {
    const nextIndex = Math.min(lessonSections.length - 1, currentRef.current + 1);
    goTo(lessonSections[nextIndex].id);
  }, [goTo]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      const index = lessonSections.findIndex((section) => section.id === visible.target.id);
      if (index >= 0) setCurrent(index);
    }, { threshold: [0.35, 0.55, 0.75] });
    lessonSections.forEach((section) => { const element = document.getElementById(section.id); if (element) observer.observe(element); });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement;
      if (['INPUT', 'BUTTON', 'TEXTAREA', 'SELECT'].includes(target.tagName)) return;
      if (event.key === 'ArrowDown' || event.key === 'PageDown') { event.preventDefault(); goNext(); }
      if (event.key === 'ArrowUp' || event.key === 'PageUp') { event.preventDefault(); goPrevious(); }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [goNext, goPrevious]);

  useEffect(() => {
    const context = document.modelContext;
    if (!context?.registerTool) return;
    const lifecycle = new AbortController();
    try {
      void Promise.resolve(context.registerTool({
        name: 'navigate_lesson',
        title: 'Navegar pela aula',
        description: 'Abre um capítulo específico da aula interativa sobre árvores de decisão.',
        inputSchema: { type: 'object', properties: { section: { type: 'string', enum: lessonSections.map((item) => item.id) } }, required: ['section'], additionalProperties: false },
        annotations: { readOnlyHint: false, untrustedContentHint: false },
        execute(input) {
          const section = (input as { section?: string })?.section;
          const match = lessonSections.find((item) => item.id === section);
          if (!match) throw new Error('Capítulo inválido.');
          goTo(match.id);
          return { section: match.id, title: match.title };
        },
      }, { signal: lifecycle.signal })).catch(() => undefined);
    } catch { /* WebMCP é progressivo e pode não existir no navegador. */ }
    return () => lifecycle.abort();
  }, [goTo]);

  return (
    <main className="min-h-screen overflow-x-hidden">
      <LessonNavigation current={current} goTo={goTo} goPrevious={goPrevious} goNext={goNext} />

      <section id="inicio" data-lesson-section className="lesson-section relative overflow-hidden bg-ink px-5 text-white sm:px-8">
        <div className="hero-grid absolute inset-0 opacity-35" />
        <div className="glow-orb absolute left-[8%] top-[20%] size-64 rounded-full bg-mint/15 blur-3xl" />
        <div className="glow-orb animation-delay absolute bottom-[10%] right-[8%] size-80 rounded-full bg-coral/12 blur-3xl" />
        <div className="relative mx-auto grid w-full max-w-7xl items-center gap-10 pt-14 lg:grid-cols-[1.05fr_.95fr]">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }}>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-mint/25 bg-mint/8 px-3 py-1.5 text-sm font-medium text-mint"><Sparkles className="size-4" /> Uma aula para aprender fazendo</div>
            <h1 className="max-w-3xl font-display text-5xl leading-[.95] tracking-[-.055em] sm:text-7xl xl:text-[5.35rem]">Como uma IA<br /><span className="text-mint">toma decisões?</span></h1>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-white/62 sm:text-xl">Descubra as <strong className="font-semibold text-white">árvores de decisão</strong>: um jeito visual de ensinar uma máquina a escolher, passo a passo.</p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Button onClick={() => goTo('conceito')} className="h-12 rounded-full bg-coral px-6 text-base font-bold text-ink shadow-[0_12px_35px_rgba(255,122,92,.2)] hover:bg-coral/90">Explorar a aula <ArrowDown className="size-4" /></Button>
              <span className="font-mono text-[10px] uppercase tracking-[.18em] text-white/35 sm:text-xs"><span className="hidden sm:inline">Use ↑ ↓ para apresentar · </span>~20 min</span>
            </div>
          </motion.div>
          <HeroTree />
        </div>
      </section>

      <ConceptSection />
      <ExampleSection />
      <TrainingSection />
      <LaboratorySection />
      <LimitsSection />
      <QuizSection />
      <SummarySection onRestart={() => goTo('inicio')} />
    </main>
  );
}
