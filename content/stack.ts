export interface StackCategory {
  id: string;
  category: string;
  tagline: string;
  skills: {
    name: string;
    note?: string;
    isPrimary?: boolean;
  }[];
}

export const STACK_CATEGORIES: StackCategory[] = [
  {
    id: "foundations",
    category: "Foundations",
    tagline: "Core Web & Design Systems",
    skills: [
      { name: "JavaScript (ES6+)", isPrimary: true },
      { name: "TypeScript (Strict)", isPrimary: true },
      { name: "HTML5 Semantic Web" },
      { name: "Modern CSS / PostCSS" },
      { name: "Design Tokens & Tokens Studio" },
      { name: "Web Vitals Optimization", note: "LCP/INP/CLS" },
    ],
  },
  {
    id: "frontend-architecture",
    category: "Frontend Architecture",
    tagline: "Platforms, State & Micro-Frontends",
    skills: [
      { name: "React.js 19 / Next.js 15", isPrimary: true },
      { name: "React Server Components (RSC)", isPrimary: true },
      { name: "Micro-Frontends (Module Federation)" },
      { name: "Apollo GraphQL Federation" },
      { name: "Zustand & Redux Toolkit" },
      { name: "Tailwind CSS v4" },
      { name: "ECharts Data Visualizations" },
      { name: "Web Workers (UI Offloading)" },
    ],
  },
  {
    id: "backend-edge",
    category: "Backend & Cloud",
    tagline: "Edge Runtimes & Distributed Data",
    skills: [
      { name: "Node.js / Express Services" },
      { name: "Next.js Edge Runtime API Routes", isPrimary: true },
      { name: "SQL Server & Supabase pgvector (HNSW)", isPrimary: true },
      { name: "Upstash Redis (Cache & Rate Limiting)" },
      { name: "AWS & CloudFront", isPrimary: true },
      { name: "JSON Schema Architecture" },
      { name: "Payment Gateway Failovers", note: "Stripe/PayPal" },
    ],
  },
  {
    id: "ai-systems",
    category: "AI & GenAI Systems",
    tagline: "Production RAG & Model Orchestration",
    skills: [
      { name: "RAG Pipeline Architecture", isPrimary: true },
      { name: "Gemini 2.5 Flash & 1.5 Pro", isPrimary: true },
      { name: "Vercel AI SDK (Streaming)" },
      { name: "Text-Embedding-004 (768d)" },
      { name: "Vector Thresholding (Cosine ≥ 0.78)" },
      { name: "Prompt & Persona Engineering" },
      { name: "Upstash Semantic Caching" },
    ],
  },
];
