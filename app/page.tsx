'use client';

import { AnimatePresence, motion } from 'motion/react';
import {
  Activity,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Banknote,
  BarChart3,
  Bot,
  BrainCircuit,
  BriefcaseBusiness,
  Car,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleHelp,
  Dices,
  Database,
  Equal,
  Eye,
  Expand,
  GitBranch,
  GraduationCap,
  HeartPulse,
  Leaf,
  Lightbulb,
  Network,
  Play,
  RefreshCw,
  Route,
  Scale,
  Scissors,
  ShieldAlert,
  Sprout,
  Sparkles,
  Target,
  Trees,
  Trophy,
  Users,
  X,
} from 'lucide-react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { Button } from '@/components/ui/button';

const lessonSections = [
  { id: 'inicio', short: 'Abertura', title: 'Raciocínio lógico' },
  { id: 'problema', short: 'Problema', title: 'Decisões complexas' },
  { id: 'definicao', short: 'Definição', title: 'Um modelo matemático' },
  { id: 'anatomia', short: 'Anatomia', title: 'Nós e critérios' },
  { id: 'diagnostico', short: 'Diagnóstico', title: 'Um exemplo profundo' },
  { id: 'entropia', short: 'Entropia', title: 'Como a árvore aprende' },
  { id: 'overfitting', short: 'Overfitting', title: 'Decorar não é aprender' },
  { id: 'floresta', short: 'Floresta', title: 'Random Forest' },
  { id: 'etica', short: 'Ética', title: 'Dados também têm viés' },
  { id: 'aplicacoes', short: 'Indústria', title: 'Aplicações reais' },
  { id: 'alternativas', short: 'Comparação', title: 'Limites e alternativas' },
  { id: 'laboratorio', short: 'Laboratório', title: 'Faça uma previsão' },
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

function DecisionProblemSection() {
  const [scenario, setScenario] = useState<'credito' | 'triagem'>('credito');
  const copy = scenario === 'credito'
    ? {
        icon: Banknote,
        question: 'Como um banco decide conceder crédito em 3 segundos?',
        signals: ['Renda mensal', 'Histórico de pagamentos', 'Valor solicitado', 'Dívidas atuais'],
        callout: 'Milhares de pedidos por hora exigem uma regra consistente e auditável.',
      }
    : {
        icon: HeartPulse,
        question: 'Como um hospital prioriza pacientes na triagem?',
        signals: ['Pressão arterial', 'Sintomas relatados', 'Idade e histórico', 'Nível de consciência'],
        callout: 'Em situações críticas, um protocolo ajuda a não esquecer sinais importantes.',
      };

  return (
    <section id="problema" data-lesson-section className="lesson-section bg-[#dbe8e4] text-ink">
      <div className="section-wrap">
        <SectionHeading number="2" eyebrow="O problema" title="Intuição não escala." description="Quando há muitos fatores, pouco tempo e consequências reais, “seguir o instinto” pode produzir decisões diferentes para casos iguais." />

        <div className="mt-10 grid gap-5 lg:grid-cols-[1.08fr_.92fr]">
          <div className="rounded-[30px] border border-ink/10 bg-paper p-6 sm:p-8">
            <div className="flex w-fit rounded-full bg-ink/[.06] p-1">
              <button onClick={() => setScenario('credito')} className={`rounded-full px-4 py-2 text-sm font-bold transition ${scenario === 'credito' ? 'bg-ink text-white' : 'text-ink/45'}`}>Crédito</button>
              <button onClick={() => setScenario('triagem')} className={`rounded-full px-4 py-2 text-sm font-bold transition ${scenario === 'triagem' ? 'bg-ink text-white' : 'text-ink/45'}`}>Triagem</button>
            </div>
            <AnimatePresence mode="wait">
              <motion.div key={scenario} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="mt-8">
                <copy.icon className="size-10 text-coral" />
                <h3 className="mt-5 max-w-2xl text-2xl font-bold leading-snug sm:text-3xl">{copy.question}</h3>
                <div className="mt-6 grid grid-cols-2 gap-2">
                  {copy.signals.map((signal, index) => <div key={signal} className="flex items-center gap-2 rounded-2xl border border-ink/8 bg-white p-3 text-sm font-semibold"><span className="grid size-6 shrink-0 place-items-center rounded-lg bg-mint font-mono text-[10px]">0{index + 1}</span>{signal}</div>)}
                </div>
                <p className="mt-6 rounded-2xl bg-coral/12 p-4 text-sm font-medium leading-relaxed text-ink/65">{copy.callout}</p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="rounded-[30px] bg-ink p-6 text-white sm:p-8">
            <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[.18em] text-white/40"><BarChart3 className="size-4 text-mint" /> Comparação</div>
            <div className="mt-9 space-y-8">
              <ComparisonBar label="Decisão intuitiva" value={46} color="coral" detail="subjetiva · difícil de repetir" />
              <ComparisonBar label="Decisão estruturada" value={92} color="mint" detail="reproduzível · pode ser revisada" />
            </div>
            <div className="mt-10 rounded-2xl border border-mint/20 bg-mint/10 p-5">
              <div className="flex items-start gap-3"><CircleHelp className="mt-0.5 size-5 shrink-0 text-mint" /><div><p className="font-bold">Pergunta para a turma</p><p className="mt-1 text-sm leading-relaxed text-white/55">Você confia mais em um profissional que segue um protocolo ou apenas na própria experiência? Por quê?</p></div></div>
            </div>
            <p className="mt-4 font-mono text-[10px] uppercase tracking-[.16em] text-white/30">Nota do professor · ouça dois argumentos opostos</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ComparisonBar({ label, value, color, detail }: { label: string; value: number; color: 'mint' | 'coral'; detail: string }) {
  return (
    <div>
      <div className="mb-3 flex items-end justify-between gap-4"><div><p className="font-bold">{label}</p><p className="mt-1 text-xs text-white/38">{detail}</p></div><span className={`font-display text-3xl ${color === 'mint' ? 'text-mint' : 'text-coral'}`}>{value}</span></div>
      <div className="h-3 overflow-hidden rounded-full bg-white/8"><motion.div initial={{ width: 0 }} whileInView={{ width: `${value}%` }} viewport={{ once: true }} transition={{ duration: .8 }} className={`h-full rounded-full ${color === 'mint' ? 'bg-mint' : 'bg-coral'}`} /></div>
    </div>
  );
}

function FormalDefinitionSection() {
  const [mode, setMode] = useState<'classificacao' | 'regressao'>('classificacao');
  return (
    <section id="definicao" data-lesson-section className="lesson-section bg-paper text-ink">
      <div className="section-wrap">
        <SectionHeading number="3" eyebrow="Definição formal, sem complicar" title="É uma função de perguntas encadeadas." description="Uma árvore de decisão é um modelo preditivo que mapeia observações de entrada até uma conclusão sobre uma variável-alvo." />

        <div className="mt-10 grid gap-5 lg:grid-cols-[1.05fr_.95fr]">
          <div className="rounded-[30px] bg-ink p-6 text-white sm:p-9">
            <p className="font-mono text-xs font-bold uppercase tracking-[.18em] text-mint">IF · THEN · ELSE</p>
            <div className="mt-7 space-y-3 font-mono text-sm sm:text-base">
              <CodeLine indent={0} keyword="SE" text=" frequência ≥ 70%" tone="mint" />
              <CodeLine indent={1} keyword="E SE" text=" estudo ≥ 3h" tone="mint" />
              <CodeLine indent={2} keyword="ENTÃO" text=" prever: aprovação" tone="coral" />
              <CodeLine indent={1} keyword="SENÃO" text=" verificar horas de sono" tone="mint" />
              <CodeLine indent={0} keyword="SENÃO" text=" prever: atenção" tone="coral" />
            </div>
            <div className="mt-7 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[.055] p-4 text-sm text-white/55"><Network className="size-5 shrink-0 text-mint" /> Graficamente, cada condição vira um nó e cada resposta vira um galho.</div>
          </div>

          <div className="rounded-[30px] border border-ink/10 bg-white p-6 sm:p-9">
            <div className="flex rounded-full bg-ink/[.06] p-1">
              <button onClick={() => setMode('classificacao')} className={`flex-1 rounded-full px-3 py-2 text-sm font-bold transition ${mode === 'classificacao' ? 'bg-ink text-white' : 'text-ink/45'}`}>Classificação</button>
              <button onClick={() => setMode('regressao')} className={`flex-1 rounded-full px-3 py-2 text-sm font-bold transition ${mode === 'regressao' ? 'bg-ink text-white' : 'text-ink/45'}`}>Regressão</button>
            </div>
            <AnimatePresence mode="wait">
              <motion.div key={mode} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} className="mt-8">
                <div className="flex items-center gap-4">
                  <span className="grid size-14 place-items-center rounded-2xl bg-mint text-2xl">{mode === 'classificacao' ? '🏷️' : '📏'}</span>
                  <div><p className="font-mono text-xs font-bold uppercase tracking-[.15em] text-ink/40">variável-alvo</p><h3 className="mt-1 text-2xl font-bold">{mode === 'classificacao' ? 'Uma categoria' : 'Um número'}</h3></div>
                </div>
                <p className="mt-6 text-base leading-relaxed text-ink/58">{mode === 'classificacao' ? 'Exemplos: spam ou não spam, fraude ou compra normal, gripe ou alergia.' : 'Exemplos: preço de uma casa, tempo de entrega ou quantidade de energia consumida.'}</p>
                <div className="mt-6 flex items-center gap-2 rounded-2xl bg-[#fff8dc] p-4 text-sm font-semibold"><Equal className="size-5 text-[#a66f00]" /> Não é só um organograma: é um modelo matemático treinado com dados.</div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
          <div className="rounded-2xl border border-mint/40 bg-mint/15 p-4"><p className="font-mono text-[10px] font-bold uppercase tracking-[.18em] text-ink/40">Entrada · features</p><p className="mt-1 font-bold">idade, renda, temperatura, frequência…</p></div>
          <ArrowRight className="mx-auto hidden size-5 opacity-30 sm:block" />
          <div className="rounded-2xl border border-coral/45 bg-coral/15 p-4"><p className="font-mono text-[10px] font-bold uppercase tracking-[.18em] text-ink/40">Saída · alvo</p><p className="mt-1 font-bold">classe prevista ou valor numérico</p></div>
        </div>
      </div>
    </section>
  );
}

function CodeLine({ indent, keyword, text, tone }: { indent: number; keyword: string; text: string; tone: 'mint' | 'coral' }) {
  return <div style={{ marginLeft: `${indent * 1.25}rem` }} className="rounded-xl border border-white/8 bg-white/[.045] px-4 py-3"><span className={`font-black ${tone === 'mint' ? 'text-mint' : 'text-coral'}`}>{keyword}</span><span className="text-white/62">{text}</span></div>;
}

function ConceptSection() {
  const cards = [
    { icon: Sprout, name: 'Nó raiz', label: 'a 1ª pergunta', example: 'feature mais discriminativa', color: 'bg-mint' },
    { icon: CircleHelp, name: 'Nó interno', label: 'um novo teste', example: 'condição sobre uma feature', color: 'bg-[#b8d5ff]' },
    { icon: GitBranch, name: 'Ramo', label: 'uma resposta', example: 'valor ou faixa da feature', color: 'bg-[#ffd765]' },
    { icon: Leaf, name: 'Folha', label: 'uma previsão', example: 'classe ou valor numérico', color: 'bg-coral' },
  ];

  return (
    <section id="anatomia" data-lesson-section className="lesson-section bg-[#e6dfcc] text-ink">
      <div className="section-wrap">
        <SectionHeading number="4" eyebrow="Anatomia técnica" title="Cada parte tem uma função." description="A raiz inicia a decisão, os nós internos refinam a análise, os ramos carregam respostas e as folhas entregam previsões." />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
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
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mt-5 grid gap-5 rounded-[28px] bg-ink p-6 text-white lg:grid-cols-[1fr_1.2fr] lg:p-8">
          <div>
            <p className="font-mono text-xs font-bold uppercase tracking-[.18em] text-mint">Critério de divisão</p>
            <h3 className="mt-3 text-2xl font-bold">Qual pergunta vem primeiro?</h3>
            <p className="mt-3 text-sm leading-relaxed text-white/52">O algoritmo testa várias features e procura a pergunta que mais reduz a <strong className="text-white">impureza</strong> — isto é, a mistura e a incerteza dos grupos.</p>
          </div>
          <div className="grid gap-2 sm:grid-cols-3">
            {[
              ['Idade?', 'pouca separação', '34%'],
              ['Renda?', 'separação média', '61%'],
              ['Histórico?', 'melhor separação', '88%'],
            ].map(([question, detail, score], index) => <div key={question} className={`rounded-2xl border p-4 ${index === 2 ? 'border-mint bg-mint text-ink' : 'border-white/10 bg-white/[.05]'}`}><p className="font-bold">{question}</p><p className={`mt-1 text-xs ${index === 2 ? 'text-ink/55' : 'text-white/38'}`}>{detail}</p><p className={`mt-5 font-display text-3xl ${index === 2 ? 'text-ink' : 'text-white/60'}`}>{score}</p></div>)}
          </div>
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

function MedicalDiagnosisSection() {
  const [fever, setFever] = useState(true);
  const [temperature, setTemperature] = useState(38.5);
  const [itchyEyes, setItchyEyes] = useState(false);
  const [bodyAches, setBodyAches] = useState(true);

  const diagnosis = useMemo(() => {
    if (fever && temperature > 38 && bodyAches) return { name: 'Gripe', probability: 85, emoji: '🤒', color: 'bg-coral' };
    if (itchyEyes && !fever) return { name: 'Alergia', probability: 88, emoji: '🌼', color: 'bg-[#ffd765]' };
    if (!fever && !itchyEyes) return { name: 'Resfriado', probability: 74, emoji: '🤧', color: 'bg-[#b8d5ff]' };
    if (fever && temperature <= 38) return { name: 'Resfriado', probability: 62, emoji: '🤧', color: 'bg-[#b8d5ff]' };
    return { name: 'Alergia', probability: 57, emoji: '🌼', color: 'bg-[#ffd765]' };
  }, [bodyAches, fever, itchyEyes, temperature]);

  const levels = [
    { label: 'Nível 1 · categórica', question: 'Tem febre?', answer: fever ? 'Sim' : 'Não', control: <BinaryToggle value={fever} onChange={setFever} /> },
    { label: 'Nível 2 · numérica', question: 'Temperatura > 38°C?', answer: temperature > 38 ? 'Sim' : 'Não', control: <input aria-label="Temperatura corporal" type="range" min="36" max="40" step="0.1" value={temperature} onChange={(event) => setTemperature(Number(event.target.value))} className="range w-28" /> },
    { label: 'Nível 3 · categórica', question: 'Coceira nos olhos?', answer: itchyEyes ? 'Sim' : 'Não', control: <BinaryToggle value={itchyEyes} onChange={setItchyEyes} /> },
    { label: 'Nível 4 · intensidade', question: 'Dor no corpo intensa?', answer: bodyAches ? 'Sim' : 'Não', control: <BinaryToggle value={bodyAches} onChange={setBodyAches} /> },
  ];

  return (
    <section id="diagnostico" data-lesson-section className="lesson-section bg-paper text-ink">
      <div className="section-wrap">
        <SectionHeading number="5" eyebrow="Exemplo aprofundado" title="Diagnóstico não é adivinhação." description="Nesta árvore didática, sintomas categóricos e valores numéricos atravessam quatro níveis até chegar a uma hipótese com probabilidade." />
        <div className="mt-9 grid gap-5 lg:grid-cols-[1.12fr_.88fr]">
          <div className="rounded-[30px] border border-ink/10 bg-white p-5 sm:p-7">
            <div className="flex items-center justify-between gap-4"><div><p className="font-mono text-xs font-bold uppercase tracking-[.18em] text-ink/40">Caminho clínico fictício</p><h3 className="mt-2 text-xl font-bold">Ajuste os sintomas</h3></div><HeartPulse className="size-8 text-coral" /></div>
            <div className="mt-6 space-y-2">
              {levels.map((level, index) => (
                <div key={level.label} className="grid grid-cols-[auto_1fr] gap-3">
                  <div className="flex flex-col items-center"><span className="grid size-8 place-items-center rounded-full bg-ink font-mono text-xs font-bold text-mint">{index + 1}</span>{index < levels.length - 1 && <span className="my-1 h-full min-h-8 w-px bg-ink/15" />}</div>
                  <div className="mb-2 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-ink/8 bg-paper p-4">
                    <div><p className="font-mono text-[9px] font-bold uppercase tracking-[.16em] text-ink/35">{level.label}</p><p className="mt-1 font-bold">{level.question}</p></div>
                    <div className="flex items-center gap-3">{index === 1 && <output className="font-mono text-xs font-bold text-ink/50">{temperature.toFixed(1)}°C</output>}{level.control}<span className="min-w-11 rounded-full bg-mint px-2.5 py-1 text-center font-mono text-[10px] font-bold">{level.answer}</span></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={`flex min-h-[420px] flex-col rounded-[30px] p-6 sm:p-8 ${diagnosis.color}`}>
            <div className="flex items-center justify-between font-mono text-xs font-bold uppercase tracking-[.18em] text-ink/45"><span>Folha alcançada</span><Leaf className="size-5" /></div>
            <AnimatePresence mode="wait">
              <motion.div key={diagnosis.name + diagnosis.probability} initial={{ opacity: 0, scale: .94, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: .96 }} className="my-auto py-8 text-center">
                <div className="text-7xl">{diagnosis.emoji}</div>
                <h3 className="mt-5 font-display text-5xl tracking-[-.05em]">{diagnosis.name}</h3>
                <div className="mx-auto mt-5 h-3 max-w-xs overflow-hidden rounded-full bg-ink/12"><motion.div initial={{ width: 0 }} animate={{ width: `${diagnosis.probability}%` }} className="h-full rounded-full bg-ink" /></div>
                <p className="mt-3 font-mono text-sm font-bold">confiança do modelo: {diagnosis.probability}%</p>
              </motion.div>
            </AnimatePresence>
            <div className="rounded-2xl bg-ink p-4 text-sm leading-relaxed text-white/60"><strong className="text-white">Probabilidade, não certeza.</strong> A folha resume o padrão dos exemplos que chegaram até ela.</div>
          </div>
        </div>
        <p className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-ink/42"><ShieldAlert className="mt-0.5 size-4 shrink-0" /> Exemplo apenas educacional. Diagnósticos reais exigem avaliação profissional, exames e protocolos validados.</p>
      </div>
    </section>
  );
}

function BinaryToggle({ value, onChange }: { value: boolean; onChange: (value: boolean) => void }) {
  return <div className="flex rounded-full bg-ink/[.07] p-0.5"><button onClick={() => onChange(true)} className={`rounded-full px-2.5 py-1 text-[10px] font-bold transition ${value ? 'bg-ink text-white' : 'text-ink/40'}`}>Sim</button><button onClick={() => onChange(false)} className={`rounded-full px-2.5 py-1 text-[10px] font-bold transition ${!value ? 'bg-ink text-white' : 'text-ink/40'}`}>Não</button></div>;
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
    <section id="entropia" data-lesson-section className="lesson-section bg-[#dbe8e4] text-ink">
      <div className="section-wrap">
        <SectionHeading number="6" eyebrow="Entropia e ganho de informação" title="Aprender é organizar a bagunça." description="Entropia mede a incerteza: quando exemplos diferentes estão misturados, ela é alta. Uma boa pergunta reduz essa desordem — essa redução é o ganho de informação." />

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
              <span className="font-mono text-xs font-bold uppercase tracking-[.18em] text-white/40">Desordem dos grupos</span>
              <Target className="size-5 text-mint" />
            </div>
            <div className="my-auto py-7">
              <div className="space-y-5">
                <EntropyBar label="Antes da pergunta" value={92} color="coral" caption="alta entropia" />
                <EntropyBar label="Depois da pergunta" value={Math.max(18, 94 - accuracy)} color="mint" caption="baixa entropia" />
              </div>
              <div className="mt-7 flex items-end justify-between border-t border-white/10 pt-6"><div><p className="text-xs text-white/38">acertos com este corte</p><p className="mt-1 text-sm font-semibold">{accuracy >= 80 ? 'Bom ganho de informação' : 'Ainda há muita mistura'}</p></div><motion.div key={accuracy} initial={{ scale: .85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="font-display text-5xl tracking-[-.05em] text-mint">{accuracy}%</motion.div></div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[.055] p-4 text-sm leading-relaxed text-white/60">
              <strong className="text-white">O algoritmo maximiza o ganho.</strong> Ele repete essa busca em cada nó, escolhendo a pergunta que mais reduz a incerteza naquele grupo.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function EntropyBar({ label, value, color, caption }: { label: string; value: number; color: 'mint' | 'coral'; caption: string }) {
  return <div><div className="mb-2 flex justify-between text-xs"><span className="font-semibold">{label}</span><span className="text-white/38">{caption}</span></div><div className="h-5 overflow-hidden rounded-md bg-white/8"><motion.div animate={{ width: `${value}%` }} transition={{ duration: .45 }} className={`h-full rounded-md ${color === 'mint' ? 'bg-mint' : 'bg-coral'}`} /></div></div>;
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
        <SectionHeading number="12" eyebrow="Laboratório" title="Mude os dados. Mude a previsão." description="Ajuste o perfil abaixo e acompanhe, em tempo real, quais perguntas a árvore faz." />
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
    <section id="overfitting" data-lesson-section className="lesson-section bg-[#ffcebd] text-ink">
      <div className="section-wrap">
        <SectionHeading number="7" eyebrow="Overfitting e poda" title="Decorar não é aprender." description="Uma árvore gigante pode memorizar cada exemplo do treino e falhar no mundo real — como decorar o gabarito sem entender a matéria." />
        <div className="mt-10 grid gap-5 lg:grid-cols-[1fr_.9fr]">
          <div className="rounded-[30px] bg-paper p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div><p className="font-mono text-xs font-bold uppercase tracking-[.18em] text-ink/40">Poda · pruning</p><h3 className="mt-2 text-xl font-bold">Compare antes e depois de podar</h3></div>
              <div className="flex rounded-full bg-ink/[.06] p-1">
                <button onClick={() => setComplex(false)} className={`rounded-full px-4 py-2 text-sm font-bold transition ${!complex ? 'bg-ink text-white' : 'text-ink/45'}`}><span className="inline-flex items-center gap-1.5"><Scissors className="size-3.5" /> Podada</span></button>
                <button onClick={() => setComplex(true)} className={`rounded-full px-4 py-2 text-sm font-bold transition ${complex ? 'bg-ink text-white' : 'text-ink/45'}`}>Sem poda</button>
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
            <p className="mt-6 text-sm leading-relaxed text-white/45"><strong className="text-white">Podar é cortar ramos irrelevantes.</strong> O modelo perde detalhes do treino, mas costuma ganhar capacidade de generalizar.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ScoreCard({ label, value, tone }: { label: string; value: number; tone: 'mint' | 'coral' }) {
  return <div className="rounded-2xl bg-white/[.06] p-4"><p className="text-xs text-white/42">{label}</p><motion.p key={value} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className={`mt-2 font-display text-4xl ${tone === 'mint' ? 'text-mint' : 'text-coral'}`}>{value}%</motion.p></div>;
}

const forestVotes = [
  [true, true, false, true, true, false, true],
  [false, true, false, false, true, false, false],
  [true, true, true, false, true, true, false],
];

function RandomForestSection() {
  const [round, setRound] = useState(0);
  const votes = forestVotes[round];
  const fraudVotes = votes.filter(Boolean).length;
  const result = fraudVotes > votes.length / 2;

  return (
    <section id="floresta" data-lesson-section className="lesson-section bg-[#dbe8e4] text-ink">
      <div className="section-wrap">
        <SectionHeading number="8" eyebrow="Ensemble learning" title="Uma árvore opina. A floresta vota." description="Uma única árvore pode mudar muito com pequenas alterações nos dados. A Random Forest treina várias árvores diferentes e combina suas previsões." />
        <div className="mt-10 grid gap-5 lg:grid-cols-[1.2fr_.8fr]">
          <div className="rounded-[30px] border border-ink/10 bg-paper p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-4"><div><p className="font-mono text-xs font-bold uppercase tracking-[.18em] text-ink/40">Votação majoritária</p><h3 className="mt-2 text-xl font-bold">Esta compra parece fraude?</h3></div><Button onClick={() => setRound((value) => (value + 1) % forestVotes.length)} variant="outline" className="rounded-full border-ink/12 bg-white"><RefreshCw className="size-4" /> Novo caso</Button></div>
            <div className="mt-9 grid grid-cols-4 gap-3 sm:grid-cols-7">
              {votes.map((vote, index) => (
                <motion.div key={`${round}-${index}`} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * .06 }} className="text-center">
                  <div className={`relative mx-auto grid aspect-square w-full max-w-20 place-items-center rounded-2xl border ${vote ? 'border-coral/40 bg-coral/15' : 'border-mint/50 bg-mint/18'}`}><Trees className="size-8" /><span className={`absolute -bottom-2 rounded-full px-2 py-0.5 font-mono text-[9px] font-bold ${vote ? 'bg-coral' : 'bg-mint'}`}>{vote ? 'FRAUDE' : 'OK'}</span></div>
                  <p className="mt-4 font-mono text-[9px] text-ink/35">árvore {index + 1}</p>
                </motion.div>
              ))}
            </div>
            <div className="mt-9 flex items-center justify-center gap-3 text-sm font-bold text-ink/45"><span>{fraudVotes} fraude</span><ArrowRight className="size-4" /><span>{votes.length - fraudVotes} normal</span></div>
          </div>

          <div className={`flex flex-col rounded-[30px] p-6 transition-colors sm:p-8 ${result ? 'bg-coral' : 'bg-mint'}`}>
            <div className="flex items-center justify-between font-mono text-xs font-bold uppercase tracking-[.18em] text-ink/45"><span>Decisão coletiva</span><Users className="size-5" /></div>
            <AnimatePresence mode="wait"><motion.div key={`${round}-${result}`} initial={{ opacity: 0, scale: .9 }} animate={{ opacity: 1, scale: 1 }} className="my-auto py-10 text-center"><span className="text-6xl">{result ? '🚨' : '✅'}</span><h3 className="mt-5 font-display text-4xl tracking-[-.045em]">{result ? 'Revisar transação' : 'Transação normal'}</h3><p className="mt-3 text-sm font-semibold text-ink/55">Maioria: {Math.max(fraudVotes, votes.length - fraudVotes)} de {votes.length} árvores</p></motion.div></AnimatePresence>
            <div className="rounded-2xl bg-ink p-4 text-sm leading-relaxed text-white/58">Diversidade + votação reduzem erros individuais. Essa é a ideia central de um <strong className="text-white">ensemble</strong>.</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function EthicsSection() {
  const [audited, setAudited] = useState(false);
  return (
    <section id="etica" data-lesson-section className="lesson-section bg-ink text-white">
      <div className="section-wrap">
        <SectionHeading inverse number="9" eyebrow="Viés e ética" title="A ferramenta pode ser neutra. Os dados, não." description="Se o histórico contém discriminação, a árvore pode transformar esse passado em regra automática — com aparência de objetividade." />
        <div className="mt-10 grid gap-5 lg:grid-cols-[.95fr_1.05fr]">
          <div className="rounded-[30px] border border-white/10 bg-white/[.055] p-6 sm:p-8">
            <div className="flex items-start justify-between gap-4"><div><p className="font-mono text-xs font-bold uppercase tracking-[.18em] text-coral">Exemplo de contratação</p><h3 className="mt-2 text-2xl font-bold">Qual modelo está sendo usado?</h3></div><Scale className="size-8 text-mint" /></div>
            <div className="mt-7 flex rounded-full bg-white/[.06] p-1">
              <button onClick={() => setAudited(false)} className={`flex-1 rounded-full px-3 py-2 text-sm font-bold transition ${!audited ? 'bg-coral text-ink' : 'text-white/40'}`}>Histórico bruto</button>
              <button onClick={() => setAudited(true)} className={`flex-1 rounded-full px-3 py-2 text-sm font-bold transition ${audited ? 'bg-mint text-ink' : 'text-white/40'}`}>Dados auditados</button>
            </div>
            <div className="mt-6 space-y-2">
              {(audited ? [
                ['Desafio técnico', 'relevante', true],
                ['Experiência comprovada', 'relevante', true],
                ['Comunicação', 'revisada', true],
                ['Gênero ou raça', 'removidos', false],
              ] : [
                ['Contratações antigas', 'padrão histórico', true],
                ['Faculdade de elite', 'possível proxy social', true],
                ['Bairro de origem', 'possível proxy racial', true],
                ['Gênero ou raça', 'atributo protegido', true],
              ]).map(([feature, note, used]) => <div key={feature as string} className={`flex items-center justify-between gap-4 rounded-2xl border p-4 ${used ? 'border-white/10 bg-white/[.04]' : 'border-mint/25 bg-mint/8'}`}><div><p className="font-semibold">{feature}</p><p className="mt-1 text-xs text-white/35">{note}</p></div><span className={`rounded-full px-2.5 py-1 font-mono text-[9px] font-bold ${used ? audited ? 'bg-mint text-ink' : 'bg-coral text-ink' : 'bg-white/10 text-white/40'}`}>{used ? 'USADA' : 'REMOVIDA'}</span></div>)}
            </div>
          </div>

          <div className="rounded-[30px] bg-paper p-6 text-ink sm:p-8">
            <div className="grid grid-cols-2 gap-3"><EthicMetric label="Aderência ao histórico" value={audited ? 78 : 96} warning={!audited} /><EthicMetric label="Equidade entre grupos" value={audited ? 89 : 51} warning={!audited} /></div>
            <AnimatePresence mode="wait"><motion.div key={audited ? 'audit' : 'raw'} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className={`mt-5 rounded-2xl border p-5 ${audited ? 'border-mint/60 bg-mint/15' : 'border-coral/60 bg-coral/15'}`}><div className="flex gap-3"><ShieldAlert className="mt-0.5 size-5 shrink-0" /><div><h3 className="font-bold">{audited ? 'Auditar melhora, mas não encerra o trabalho.' : 'O modelo reproduziu a desigualdade.'}</h3><p className="mt-2 text-sm leading-relaxed text-ink/58">{audited ? 'Ainda é preciso testar resultados por grupo, ouvir pessoas afetadas e permitir contestação.' : 'Remover gênero ou raça não basta se outras variáveis funcionarem como substitutas — os chamados proxies.'}</p></div></div></motion.div></AnimatePresence>
            <div className="mt-6 rounded-2xl bg-ink p-5 text-white"><p className="font-mono text-[10px] font-bold uppercase tracking-[.18em] text-coral">Pergunta reflexiva</p><p className="mt-3 text-xl font-bold leading-snug">Quem é responsável quando o algoritmo discrimina?</p><p className="mt-3 text-sm text-white/45">Quem coleta os dados? Quem cria o modelo? Quem decide usá-lo? A responsabilidade é humana e compartilhada.</p></div>
          </div>
        </div>
      </div>
    </section>
  );
}

function EthicMetric({ label, value, warning }: { label: string; value: number; warning: boolean }) {
  return <div className="rounded-2xl border border-ink/8 bg-white p-4"><p className="text-xs text-ink/45">{label}</p><motion.p key={value} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`mt-2 font-display text-4xl ${warning ? 'text-coral' : 'text-ink'}`}>{value}%</motion.p></div>;
}

function ApplicationsSection() {
  const applications = [
    { icon: Banknote, field: 'Finanças', title: 'Fraude em tempo real', tech: 'Gradient Boosting', text: 'Centenas de sinais avaliam uma transação antes da autorização.' },
    { icon: Sparkles, field: 'Entretenimento', title: 'Recomendação', tech: 'Filtros + árvores', text: 'Preferências e contexto ajudam a ordenar filmes, músicas e produtos.' },
    { icon: Car, field: 'Mobilidade', title: 'Frenagem de emergência', tech: 'Sistema híbrido', text: 'Sensores alimentam vários modelos; regras de decisão ajudam em ações críticas.' },
    { icon: Sprout, field: 'Agricultura', title: 'Irrigação de precisão', tech: 'Sensores + árvores', text: 'Umidade, clima e tipo de solo indicam quando e quanto irrigar.' },
  ];
  return (
    <section id="aplicacoes" data-lesson-section className="lesson-section bg-[#e6dfcc] text-ink">
      <div className="section-wrap">
        <SectionHeading number="10" eyebrow="Aplicações e indústria" title="Da planilha para o mundo real." description="Árvores brilham em dados tabulares: registros organizados em linhas e colunas, com informações numéricas e categóricas." />
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {applications.map((app, index) => (
            <motion.article key={app.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * .08 }} className="group rounded-[28px] border border-ink/10 bg-paper p-6 sm:p-7">
              <div className="flex items-start justify-between gap-4"><span className={`grid size-13 place-items-center rounded-2xl ${index % 2 ? 'bg-coral' : 'bg-mint'}`}><app.icon className="size-6" /></span><span className="rounded-full border border-ink/10 bg-white px-3 py-1 font-mono text-[9px] font-bold uppercase tracking-wider text-ink/50">{app.tech}</span></div>
              <p className="mt-7 font-mono text-[10px] font-bold uppercase tracking-[.18em] text-ink/38">{app.field}</p><h3 className="mt-2 text-2xl font-bold">{app.title}</h3><p className="mt-3 max-w-xl text-sm leading-relaxed text-ink/55">{app.text}</p>
            </motion.article>
          ))}
        </div>
        <div className="mt-5 flex items-start gap-3 rounded-2xl border border-ink/10 bg-[#fff8dc] p-5 text-sm leading-relaxed text-ink/65"><Database className="mt-0.5 size-5 shrink-0 text-[#a66f00]" /><p><strong className="text-ink">Na prática, sistemas modernos combinam técnicas.</strong> Netflix, Spotify e carros autônomos não dependem de uma única árvore; usam ensembles, redes neurais, regras e contexto.</p></div>
      </div>
    </section>
  );
}

function AlternativesSection() {
  const rows = [
    ['Melhor tipo de dado', 'Tabelas e categorias', 'Imagens, áudio e texto'],
    ['Explicabilidade', 'Alta: caminho visível', 'Baixa: caixa-preta'],
    ['Relações complexas', 'Pode precisar de muitas divisões', 'Aprende padrões profundos'],
    ['Quantidade de dados', 'Funciona bem com menos dados', 'Geralmente precisa de muitos dados'],
    ['Sensibilidade', 'Pequenas mudanças alteram a árvore', 'Treino pode variar, mas escala melhor'],
  ];
  return (
    <section id="alternativas" data-lesson-section className="lesson-section bg-paper text-ink">
      <div className="section-wrap">
        <SectionHeading number="11" eyebrow="Limitações e alternativas" title="Não existe modelo campeão de tudo." description="Árvores são claras e eficientes, mas sofrem com fronteiras muito complexas, instabilidade e dados não estruturados." />
        <div className="mt-10 grid gap-5 lg:grid-cols-[.72fr_1.28fr]">
          <div className="rounded-[30px] bg-coral p-6 sm:p-8"><ShieldAlert className="size-9" /><h3 className="mt-6 text-2xl font-bold">Onde uma árvore simples tropeça</h3><ul className="mt-5 space-y-4 text-sm leading-relaxed text-ink/65"><li className="flex gap-3"><X className="mt-0.5 size-4 shrink-0" />Relações suaves ou lineares exigem várias divisões em “degraus”.</li><li className="flex gap-3"><X className="mt-0.5 size-4 shrink-0" />Pixels e ondas sonoras crus não chegam prontos em colunas úteis.</li><li className="flex gap-3"><X className="mt-0.5 size-4 shrink-0" />Uma pequena mudança nos dados pode trocar a raiz e vários ramos.</li></ul><p className="mt-7 rounded-2xl bg-ink p-4 text-sm leading-relaxed text-white/58">Random Forest e Gradient Boosting reduzem parte dessa instabilidade.</p></div>
          <div className="overflow-hidden rounded-[30px] border border-ink/10 bg-white">
            <div className="grid grid-cols-[1.05fr_1fr_1fr] bg-ink px-4 py-4 text-sm font-bold text-white sm:px-6"><span>Critério</span><span className="flex items-center gap-2 text-mint"><Trees className="size-4" /> Árvores</span><span className="flex items-center gap-2 text-coral"><BrainCircuit className="size-4" /> Redes neurais</span></div>
            <div className="divide-y divide-ink/8">{rows.map(([criterion, tree, neural]) => <div key={criterion} className="grid grid-cols-[1.05fr_1fr_1fr] px-4 py-4 text-xs leading-relaxed sm:px-6 sm:text-sm"><strong className="pr-3">{criterion}</strong><span className="pr-3 text-ink/55">{tree}</span><span className="text-ink/55">{neural}</span></div>)}</div>
            <div className="m-4 flex items-start gap-3 rounded-2xl bg-mint/18 p-4 text-sm text-ink/65 sm:m-6"><Eye className="mt-0.5 size-5 shrink-0" /><p><strong className="text-ink">Regra prática:</strong> quer explicar cada decisão em uma tabela? Comece com árvores. Quer reconhecer objetos em imagens ou fala em áudio? Redes neurais costumam ser mais adequadas.</p></div>
          </div>
        </div>
      </div>
    </section>
  );
}

const quizQuestions = [
  { question: 'Em uma árvore, o que é uma “folha”?', options: ['Uma pergunta', 'Uma conclusão', 'Um dado apagado'], correct: 1, explain: 'A folha é o final de um caminho: a previsão ou decisão.' },
  { question: 'O que significa reduzir a entropia?', options: ['Misturar mais os grupos', 'Reduzir a incerteza', 'Apagar os dados'], correct: 1, explain: 'Menor entropia significa grupos mais organizados e previsíveis.' },
  { question: 'Uma árvore com 100% no treino é sempre melhor?', options: ['Sim, sempre', 'Não, pode ter decorado', 'Só se for colorida'], correct: 1, explain: 'Resultado perfeito no treino pode indicar overfitting.' },
  { question: 'Por que uma Random Forest costuma ser mais estável?', options: ['Porque vota com várias árvores', 'Porque não usa dados', 'Porque tem apenas uma pergunta'], correct: 0, explain: 'A votação combina modelos diferentes e reduz o peso dos erros individuais.' },
  { question: 'Se os dados históricos têm preconceito, o que pode acontecer?', options: ['A árvore corrige tudo sozinha', 'Nada, algoritmos são neutros', 'O viés pode virar regra automática'], correct: 2, explain: 'Modelos aprendem padrões dos dados — inclusive padrões injustos.' },
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
        <SectionHeading inverse number="13" eyebrow="Desafio final" title="Será que a ideia criou raízes?" description="Cinco perguntas rápidas para conectar os conceitos da aula." />
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
                  <div><div className="text-7xl">{score === quizQuestions.length ? '🏆' : score >= 3 ? '🌱' : '🔁'}</div><p className="mt-5 font-mono text-xs font-bold uppercase tracking-[.2em] text-mint">Resultado</p><h3 className="mt-2 font-display text-5xl tracking-[-.05em]">{score} de {quizQuestions.length}</h3><p className="mx-auto mt-4 max-w-md text-white/55">{score === quizQuestions.length ? 'Perfeito! Você chegou à folha certa.' : score >= 3 ? 'Mandou bem! A ideia principal está clara.' : 'Mais uma volta pela árvore e você chega lá.'}</p><Button onClick={restart} variant="outline" className="mt-7 rounded-full border-white/15 bg-transparent px-5 text-white hover:bg-white/10 hover:text-white"><RefreshCw className="size-4" /> Refazer quiz</Button></div>
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
    ['01', 'Estrutura', 'Problemas grandes viram perguntas menores.'],
    ['02', 'Aprendizado', 'Ganho de informação escolhe boas divisões.'],
    ['03', 'Probabilidade', 'Folhas fazem previsões, não promessas.'],
    ['04', 'Generalização', 'Poda combate a memorização do treino.'],
    ['05', 'Ensemble', 'Florestas combinam muitas árvores.'],
    ['06', 'Responsabilidade', 'Dados e impactos precisam de auditoria.'],
  ];
  return (
    <section id="resumo" data-lesson-section className="lesson-section relative overflow-hidden bg-mint text-ink">
      <div className="absolute inset-0 summary-grid opacity-20" />
      <div className="section-wrap relative">
        <SectionHeading number="14" eyebrow="Resumo" title="Da raiz até a resposta." description="Você acabou de percorrer o mesmo raciocínio usado por uma árvore de decisão." />
        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
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
            <span className="font-mono text-[10px] font-bold uppercase tracking-[.16em] text-white/40 sm:text-xs"><span className="text-mint">{String(current + 1).padStart(2, '0')}</span> / {String(lessonSections.length).padStart(2, '0')} <span className="hidden sm:inline">· {lessonSections[current].title}</span></span>
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
        <img src="/hero-decision-network.png" alt="Rede neural abstrata transformando-se em uma árvore de decisão" className="absolute inset-0 size-full object-cover object-center opacity-75" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#071515_0%,rgba(7,21,21,.94)_38%,rgba(7,21,21,.28)_76%,rgba(7,21,21,.5)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(0deg,#071515_0%,transparent_24%)]" />
        <div className="relative mx-auto flex w-full max-w-7xl items-center pt-14">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }}>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-mint/25 bg-ink/55 px-3 py-1.5 text-sm font-medium text-mint backdrop-blur"><Sparkles className="size-4" /> Aula interativa · Machine Learning</div>
            <h1 className="max-w-4xl font-display text-5xl leading-[.96] tracking-[-.055em] sm:text-7xl xl:text-[5rem]">Árvores de Decisão:<br /><span className="text-mint">Como Estruturar o Raciocínio Lógico</span></h1>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-white/65 sm:text-2xl">Da intuição humana aos algoritmos de Machine Learning.</p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Button onClick={() => goTo('problema')} className="h-12 rounded-full bg-coral px-6 text-base font-bold text-ink shadow-[0_12px_35px_rgba(255,122,92,.2)] hover:bg-coral/90">Iniciar aula <ArrowDown className="size-4" /></Button>
              <span className="font-mono text-[10px] uppercase tracking-[.18em] text-white/40 sm:text-xs"><span className="hidden sm:inline">Use ↑ ↓ para apresentar · </span>~45 min</span>
            </div>
          </motion.div>
        </div>
        <div className="absolute inset-x-5 bottom-16 z-10 mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 border-t border-white/15 pt-4 font-mono text-[10px] font-bold uppercase tracking-[.16em] text-white/38 sm:inset-x-8"><span>Disciplina · Inteligência Artificial</span><span>Professor · Gabriel</span></div>
      </section>

      <DecisionProblemSection />
      <FormalDefinitionSection />
      <ConceptSection />
      <MedicalDiagnosisSection />
      <TrainingSection />
      <LimitsSection />
      <RandomForestSection />
      <EthicsSection />
      <ApplicationsSection />
      <AlternativesSection />
      <LaboratorySection />
      <QuizSection />
      <SummarySection onRestart={() => goTo('inicio')} />
    </main>
  );
}
