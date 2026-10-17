export interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  badge: string;
  status: "Current" | "Live" | "Shipped";
  statusColor: "purple" | "emerald";
  techStack: string[];
  metricHighlight?: {
    value: string;
    label: string;
  };
  links: {
    live?: string;
    github?: string;
    caseStudy?: string;
  };
}

export const SELECTED_PROJECTS: ProjectItem[] = [
  {
    id: "dsm-dashboard",
    slug: "dsm-dashboard",
    title: "DSM Engineering Dashboard",
    tagline: "Happiest Minds · Architecture Leadership",
    description:
      "Centralized engineering intelligence platform for leadership. Architected GraphQL data ingestion wizard & ECharts visualizations for Git PR metrics, sprint velocity, and DORA metrics.",
    badge: "Architecture Leadership",
    status: "Current",
    statusColor: "purple",
    techStack: ["Next.js 15", "Apollo Federation", "ECharts", "Web Workers", "Micro-Frontends"],
    metricHighlight: {
      value: "−60% TBT",
      label: "Web Worker Offloading",
    },
    links: {
      caseStudy: "/work/dsm-dashboard",
    },
  },
  {
    id: "docsense-rag",
    slug: "docsense-rag",
    title: "DocSense — RAG Intelligence",
    tagline: "Framework-Free Vector Retrieval Pipeline",
    description:
      "Framework-free RAG pipeline: PDF ingestion → 500w chunking → Gemini text-embedding-004 → Supabase pgvector cosine search (0.78 threshold) → cited answer streaming via Gemini 2.5 Flash.",
    badge: "Production AI / RAG",
    status: "Live",
    statusColor: "emerald",
    techStack: ["Next.js 15 (Edge)", "Supabase pgvector", "Gemini 2.5 Flash", "Upstash Redis"],
    metricHighlight: {
      value: "<85ms",
      label: "Direct REST Retrieval",
    },
    links: {
      live: "https://docsense-swart.vercel.app",
      github: "https://github.com/Vaib4496/docsense-rag",
      caseStudy: "/work/docsense-rag",
    },
  },
  {
    id: "interview-coach",
    slug: "interview-coach",
    title: "Interview Coach AI",
    tagline: "Serverless LLM Mock Technical Interviewer",
    description:
      "Solves serverless memory via explicit history reconstruction per call. Persona engineering anchors SDE interviewer identity. Forced JSON output for automated candidate scoring and feedback arrays.",
    badge: "Production LLM",
    status: "Live",
    statusColor: "emerald",
    techStack: ["Next.js 15", "Vercel AI SDK", "Gemini API", "TypeScript", "Tailwind CSS"],
    metricHighlight: {
      value: "100%",
      label: "Deterministic JSON Scoring",
    },
    links: {
      live: "https://interview-coach-chatbot-nextjs.vercel.app",
      github: "https://github.com/Vaib4496/INTERVIEW-COACH-CHATBOT-NEXTJS",
      caseStudy: "/work/interview-coach",
    },
  },
];
