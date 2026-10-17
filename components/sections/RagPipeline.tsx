"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";

interface PipelineStep {
  id: string;
  stepNum: string;
  icon: string;
  title: string;
  subtitle: string;
  accentColor: string;
  badge: string;
  spec: {
    label: string;
    value: string;
  }[];
  description: string;
  architectureDecision: string;
}

const PIPELINE_STEPS: PipelineStep[] = [
  {
    id: "ingest",
    stepNum: "01",
    icon: "📄",
    title: "PDF & Document Ingestion",
    subtitle: "Multimodal Edge Stream",
    accentColor: "#94A3B8",
    badge: "Edge Buffer",
    spec: [
      { label: "Format", value: "PDF / MDX / Plain Text" },
      { label: "Memory Overhead", value: "<15MB V8 Isolate" },
      { label: "Sanitization", value: "UTF-8 Normalized" },
    ],
    description:
      "Raw technical whitepapers and system specifications are streamed directly to the edge runtime without heavy server-side temporary disk writes.",
    architectureDecision:
      "Streaming raw chunks into memory buffers avoids file system cold starts and enables instant parallel chunking.",
  },
  {
    id: "chunk",
    stepNum: "02",
    icon: "✂️",
    title: "Semantic Chunking",
    subtitle: "500w / 50 Overlap",
    accentColor: "#818CF8",
    badge: "Sliding Window",
    spec: [
      { label: "Chunk Size", value: "500 Words (~650 Tokens)" },
      { label: "Overlap", value: "50 Words (10%)" },
      { label: "Boundary Rule", value: "Sentence Preservation" },
    ],
    description:
      "Splits continuous text into overlapping semantic blocks. The 10% overlap prevents context clipping across paragraph boundaries and table declarations.",
    architectureDecision:
      "Strict 500-word windows ensure high information density without diluting embedding vector specificity.",
  },
  {
    id: "embed",
    stepNum: "03",
    icon: "⚡",
    title: "Gemini Embeddings",
    subtitle: "text-embedding-004",
    accentColor: "#A855F7",
    badge: "Core AI Engine",
    spec: [
      { label: "Model", value: "text-embedding-004" },
      { label: "Dimensions", value: "768 Floats" },
      { label: "Batch Latency", value: "<85ms REST Edge" },
    ],
    description:
      "Generates dense 768-dimensional vector representations capturing semantic relationships, technical terms, and architectural intent.",
    architectureDecision:
      "Direct Google Generative AI REST endpoint usage eliminates LangChain wrapper overhead and cuts payload latency by 45ms.",
  },
  {
    id: "retrieve",
    stepNum: "04",
    icon: "🗄️",
    title: "Supabase pgvector",
    subtitle: "HNSW Index · Cosine ≥ 0.78",
    accentColor: "#10B981",
    badge: "Strict Threshold",
    spec: [
      { label: "Index Algorithm", value: "HNSW (m=16, ef=64)" },
      { label: "Similarity Cutoff", value: "Cosine ≥ 0.78" },
      { label: "Top-K", value: "Top 3 Ranked Chunks" },
    ],
    description:
      "Hierarchical Navigable Small World (HNSW) vector search in PostgreSQL. Chunks scoring below 0.78 are dropped to eliminate LLM hallucinations.",
    architectureDecision:
      "Setting a strict 0.78 cosine threshold ensures only contextually verified data reaches the generation prompt.",
  },
  {
    id: "synthesis",
    stepNum: "05",
    icon: "💬",
    title: "Cited Answer Synthesis",
    subtitle: "Gemini 2.5 Flash",
    accentColor: "#C084FC",
    badge: "Attributed Output",
    spec: [
      { label: "Generation Model", value: "Gemini 2.5 Flash" },
      { label: "Streaming Protocol", value: "Server-Sent Events (SSE)" },
      { label: "Attribution", value: "File + Similarity Footnotes" },
    ],
    description:
      "Streams concise, highly technical responses back to DocSense chat and Cmd+K palette with exact citation metadata and similarity coefficients.",
    architectureDecision:
      "Enforces Markdown citation footnotes on all output chunks for enterprise transparency and verifiable claims.",
  },
];

export function RagPipeline() {
  const [activeStepId, setActiveStepId] = useState<string>("retrieve");
  const [isSimulating, setIsSimulating] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const activeStep =
    PIPELINE_STEPS.find((s) => s.id === activeStepId) ?? PIPELINE_STEPS[3];

  const handleSimulate = async () => {
    if (isSimulating) return;
    setIsSimulating(true);

    for (let i = 0; i < PIPELINE_STEPS.length; i++) {
      setActiveStepId(PIPELINE_STEPS[i].id);
      await new Promise((r) => setTimeout(r, 900));
    }

    setIsSimulating(false);
  };

  return (
    <section
      id="rag"
      className="glass-panel rounded-3xl p-6 sm:p-10 text-left space-y-8 relative overflow-hidden my-16 sm:my-24"
      aria-label="Signature RAG Pipeline Architecture"
    >
      {/* Background Ambient Glow */}
      <div
        className="absolute -top-32 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-32 left-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      {/* Header Row */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 relative z-10">
        <div className="space-y-1.5 max-w-2xl">
          <span className="font-mono text-xs text-purple-400 tracking-wider uppercase font-semibold">
            / Signature Architecture
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            The RAG pipeline, end-to-end.
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
            Built without framework abstractions to maintain deterministic vector
            thresholding, sub-100ms response targets, and zero-hallucination guarantees.
          </p>
        </div>

        {/* Action Button: Simulate Flow */}
        <button
          type="button"
          onClick={handleSimulate}
          disabled={isSimulating}
          className="self-start md:self-auto px-4 py-2 rounded-xl bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/40 text-purple-300 font-mono text-xs flex items-center gap-2 transition-all hover:scale-105 active:scale-95 disabled:opacity-50 cursor-pointer shrink-0"
        >
          <span
            className={`w-2 h-2 rounded-full bg-purple-400 ${
              isSimulating ? "animate-ping" : "animate-pulse"
            }`}
          />
          <span>{isSimulating ? "Tracing Flow..." : "Simulate Flow →"}</span>
        </button>
      </div>

      {/* Animated SVG Diagram Viewport */}
      <div className="w-full overflow-x-auto py-4 scrollbar-thin scrollbar-thumb-white/10 select-none">
        <svg
          viewBox="0 0 1020 180"
          className="w-full min-w-[780px] h-auto overflow-visible"
          role="img"
          aria-label="Interactive 5-node RAG pipeline SVG diagram"
        >
          <defs>
            {/* Arrow Marker Definitions */}
            <marker
              id="arrow-zinc"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 1 L 10 5 L 0 9 z" fill="#52525B" />
            </marker>
            <marker
              id="arrow-purple"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 1 L 10 5 L 0 9 z" fill="#7C3AED" />
            </marker>
            <marker
              id="arrow-emerald"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 1 L 10 5 L 0 9 z" fill="#10B981" />
            </marker>

            {/* Core Node Glow Filter */}
            <filter id="core-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* ------------------------------------------------------------- */}
          {/* Connecting Flow Lines (Infinite strokeDashoffset loop)        */}
          {/* ------------------------------------------------------------- */}
          {/* Line 1: Ingestion -> Chunking */}
          <path
            d="M 145 90 L 235 90"
            stroke="#52525B"
            strokeWidth="2.5"
            strokeDasharray="6 6"
            className="flow-line"
            markerEnd="url(#arrow-zinc)"
          />

          {/* Line 2: Chunking -> Embeddings */}
          <path
            d="M 375 90 L 465 90"
            stroke="#7C3AED"
            strokeWidth="2.5"
            strokeDasharray="6 6"
            className="flow-line"
            markerEnd="url(#arrow-purple)"
          />

          {/* Line 3: Embeddings -> pgvector */}
          <path
            d="M 605 90 L 695 90"
            stroke="#10B981"
            strokeWidth="2.5"
            strokeDasharray="6 6"
            className="flow-line"
            markerEnd="url(#arrow-emerald)"
          />

          {/* Line 4: pgvector -> Citation */}
          <path
            d="M 835 90 L 905 90"
            stroke="#A855F7"
            strokeWidth="2.5"
            strokeDasharray="6 6"
            className="flow-line"
            markerEnd="url(#arrow-purple)"
          />

          {/* ------------------------------------------------------------- */}
          {/* Node 1: Ingestion (01 · INGEST)                               */}
          {/* ------------------------------------------------------------- */}
          <g
            transform="translate(30, 45)"
            onClick={() => setActiveStepId("ingest")}
            className="cursor-pointer"
            tabIndex={0}
            role="button"
            aria-pressed={activeStepId === "ingest"}
            aria-label="Step 1: PDF and Document Ingestion"
          >
            <rect
              width="115"
              height="90"
              rx="14"
              fill={activeStepId === "ingest" ? "#1E1E24" : "#141417"}
              stroke={activeStepId === "ingest" ? "#94A3B8" : "#2E2E38"}
              strokeWidth={activeStepId === "ingest" ? 2.5 : 1.5}
              className="transition-colors duration-200"
            />
            <text x="57" y="32" textAnchor="middle" fill="#FAFAFA" fontFamily="var(--font-jetbrains-mono), monospace" fontSize="13" fontWeight="bold">
              📄 Ingest
            </text>
            <text x="57" y="52" textAnchor="middle" fill="#A1A1AA" fontFamily="var(--font-jetbrains-mono), monospace" fontSize="10">
              PDF / MDX
            </text>
            <rect x="22" y="62" width="70" height="18" rx="4" fill="#27272A" />
            <text x="57" y="74" textAnchor="middle" fill="#E4E4E7" fontFamily="var(--font-jetbrains-mono), monospace" fontSize="8.5" fontWeight="600">
              01 · INGEST
            </text>
          </g>

          {/* ------------------------------------------------------------- */}
          {/* Node 2: Semantic Chunking (02 · CHUNK)                        */}
          {/* ------------------------------------------------------------- */}
          <g
            transform="translate(240, 45)"
            onClick={() => setActiveStepId("chunk")}
            className="cursor-pointer"
            tabIndex={0}
            role="button"
            aria-pressed={activeStepId === "chunk"}
            aria-label="Step 2: Semantic Chunking"
          >
            <rect
              width="135"
              height="90"
              rx="14"
              fill={activeStepId === "chunk" ? "#1B1C2A" : "#141417"}
              stroke={activeStepId === "chunk" ? "#818CF8" : "#2E2E38"}
              strokeWidth={activeStepId === "chunk" ? 2.5 : 1.5}
              className="transition-colors duration-200"
            />
            <text x="67" y="32" textAnchor="middle" fill="#FAFAFA" fontFamily="var(--font-jetbrains-mono), monospace" fontSize="13" fontWeight="bold">
              ✂️ Chunking
            </text>
            <text x="67" y="52" textAnchor="middle" fill="#A1A1AA" fontFamily="var(--font-jetbrains-mono), monospace" fontSize="10">
              500w · 50 overlap
            </text>
            <rect x="27" y="62" width="80" height="18" rx="4" fill="#312E81" />
            <text x="67" y="74" textAnchor="middle" fill="#C7D2FE" fontFamily="var(--font-jetbrains-mono), monospace" fontSize="8.5" fontWeight="600">
              02 · CHUNK
            </text>
          </g>

          {/* ------------------------------------------------------------- */}
          {/* Node 3: Embeddings - Gemini Core (03 · CORE AI)              */}
          {/* ------------------------------------------------------------- */}
          <g
            transform="translate(470, 38)"
            onClick={() => setActiveStepId("embed")}
            className="cursor-pointer"
            tabIndex={0}
            role="button"
            aria-pressed={activeStepId === "embed"}
            aria-label="Step 3: Gemini Embeddings Core"
          >
            <rect
              width="135"
              height="104"
              rx="16"
              fill={activeStepId === "embed" ? "#2B1147" : "#1E0B36"}
              stroke="#A855F7"
              strokeWidth={activeStepId === "embed" ? 3 : 2}
              className="transition-colors duration-200"
            />
            <text x="67" y="30" textAnchor="middle" fill="#E9D5FF" fontFamily="var(--font-jetbrains-mono), monospace" fontSize="13" fontWeight="bold">
              ⚡ Embeddings
            </text>
            <text x="67" y="48" textAnchor="middle" fill="#FFFFFF" fontFamily="var(--font-jetbrains-mono), monospace" fontSize="11" fontWeight="bold">
              Gemini-004
            </text>
            <text x="67" y="65" textAnchor="middle" fill="#C084FC" fontFamily="var(--font-jetbrains-mono), monospace" fontSize="9.5">
              768 dimensions
            </text>
            <rect x="22" y="75" width="90" height="19" rx="5" fill="#581C87" />
            <text x="67" y="88" textAnchor="middle" fill="#F3E8FF" fontFamily="var(--font-jetbrains-mono), monospace" fontSize="9" fontWeight="bold">
              03 · CORE AI
            </text>
          </g>

          {/* ------------------------------------------------------------- */}
          {/* Node 4: pgvector Vector Search (04 · RETRIEVE)                */}
          {/* ------------------------------------------------------------- */}
          <g
            transform="translate(700, 45)"
            onClick={() => setActiveStepId("retrieve")}
            className="cursor-pointer"
            tabIndex={0}
            role="button"
            aria-pressed={activeStepId === "retrieve"}
            aria-label="Step 4: Supabase pgvector HNSW Search"
          >
            <rect
              width="135"
              height="90"
              rx="14"
              fill={activeStepId === "retrieve" ? "#062A1F" : "#041B14"}
              stroke={activeStepId === "retrieve" ? "#34D399" : "#10B981"}
              strokeWidth={activeStepId === "retrieve" ? 2.5 : 1.5}
              className="transition-colors duration-200"
            />
            <text x="67" y="32" textAnchor="middle" fill="#10B981" fontFamily="var(--font-jetbrains-mono), monospace" fontSize="13" fontWeight="bold">
              🗄️ pgvector
            </text>
            <text x="67" y="52" textAnchor="middle" fill="#D1FAE5" fontFamily="var(--font-jetbrains-mono), monospace" fontSize="10">
              Cosine ≥ 0.78
            </text>
            <rect x="22" y="62" width="90" height="18" rx="4" fill="#064E3B" />
            <text x="67" y="74" textAnchor="middle" fill="#6EE7B7" fontFamily="var(--font-jetbrains-mono), monospace" fontSize="8.5" fontWeight="600">
              04 · HNSW RETRIEVE
            </text>
          </g>

          {/* ------------------------------------------------------------- */}
          {/* Node 5: Cited Answer Synthesis (05 · SYNTHESIS)               */}
          {/* ------------------------------------------------------------- */}
          <g
            transform="translate(910, 45)"
            onClick={() => setActiveStepId("synthesis")}
            className="cursor-pointer"
            tabIndex={0}
            role="button"
            aria-pressed={activeStepId === "synthesis"}
            aria-label="Step 5: Cited Answer Synthesis"
          >
            <rect
              width="90"
              height="90"
              rx="14"
              fill={activeStepId === "synthesis" ? "#231530" : "#141417"}
              stroke={activeStepId === "synthesis" ? "#C084FC" : "#2E2E38"}
              strokeWidth={activeStepId === "synthesis" ? 2.5 : 1.5}
              className="transition-colors duration-200"
            />
            <text x="45" y="33" textAnchor="middle" fill="#FAFAFA" fontFamily="var(--font-jetbrains-mono), monospace" fontSize="12" fontWeight="bold">
              💬 Cited
            </text>
            <text x="45" y="52" textAnchor="middle" fill="#C084FC" fontFamily="var(--font-jetbrains-mono), monospace" fontSize="9.5">
              Attributed
            </text>
            <rect x="15" y="62" width="60" height="18" rx="4" fill="#3B0764" />
            <text x="45" y="74" textAnchor="middle" fill="#F3E8FF" fontFamily="var(--font-jetbrains-mono), monospace" fontSize="8" fontWeight="600">
              05 · OUTPUT
            </text>
          </g>
        </svg>
      </div>

      {/* Interactive Node Telemetry / Architecture Deep Dive */}
      <motion.div
        key={activeStep.id}
        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="rounded-2xl p-5 sm:p-6 bg-black/40 border border-white/10 relative overflow-hidden space-y-4"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{activeStep.icon}</span>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-neutral-400">
                  Step {activeStep.stepNum}:
                </span>
                <h3 className="font-mono text-sm sm:text-base font-bold text-white">
                  {activeStep.title}
                </h3>
              </div>
              <p className="font-mono text-xs text-neutral-400">
                {activeStep.subtitle}
              </p>
            </div>
          </div>

          <span
            className="px-3 py-1 rounded-full text-[11px] font-mono font-semibold border self-start sm:self-auto"
            style={{
              borderColor: `${activeStep.accentColor}60`,
              backgroundColor: `${activeStep.accentColor}18`,
              color: activeStep.accentColor,
            }}
          >
            {activeStep.badge}
          </span>
        </div>

        {/* Technical Specs Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {activeStep.spec.map((specItem, idx) => (
            <div
              key={idx}
              className="p-3 rounded-xl bg-white/[0.03] border border-white/5 space-y-1"
            >
              <div className="font-mono text-[10px] text-neutral-400 uppercase tracking-wider">
                {specItem.label}
              </div>
              <div className="font-mono text-xs font-bold text-neutral-200">
                {specItem.value}
              </div>
            </div>
          ))}
        </div>

        {/* Description & Engineering Rationale */}
        <div className="space-y-2 pt-1 text-xs text-neutral-300 leading-relaxed">
          <p>{activeStep.description}</p>
          <div className="p-3 rounded-xl bg-purple-950/20 border border-purple-800/30 font-mono text-[11px] text-purple-200 flex items-start gap-2">
            <span className="text-purple-400 font-bold shrink-0">↳ Why:</span>
            <span>{activeStep.architectureDecision}</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
