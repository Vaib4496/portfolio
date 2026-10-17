# Vaibhav Chhajer — Resume Content (Enterprise Edition)

> Source of truth for: DocSense chat context, Cmd+K RAG search, About page, Experience timeline.
> Last updated: Sep 2026

## Identity

**Name:** Vaibhav Chhajer
**Title:** Principal Frontend Architect & AI Systems Engineer
**Location:** Hyderabad, India
**Contact:** vaibhavchhajer44@gmail.com · +91-8319483007
**Links:** linkedin.com/in/vaibhav-chhajer-3b450a113 · github.com/Vaib4496

## Professional Summary

Principal Frontend Architect with 6+ years designing and delivering high-concurrency web applications using Next.js, Apollo Federation, and Micro-Frontend (MFE) architectures. Track record of leading platform engineering, optimizing Web Vitals at the edge, and orchestrating complex distributed frontends that handle high traffic loads with zero downtime. Transitioned into Production AI Engineering by independently designing and shipping end-to-end RAG pipelines and LLM applications using vector search, semantic caching, and strict serverless edge boundaries. I bridge the gap between enterprise frontend infrastructure and cutting-edge GenAI integration.

## Core Technical Skills (Categorized Grid)

### Frontend Architecture & Infrastructure
- React.js, Next.js 15 (App Router, RSC), Micro-Frontends (Module Federation), Apollo GraphQL Federation, Zustand, Tailwind CSS v4, Web Workers for UI offloading.

### Edge & Backend Systems
- Node.js, Edge Runtime API Routes, Upstash Redis (Rate Limiting & Semantic Caching), Supabase pgvector (`hnsw` indexing), AWS S3.

### AI & GenAI Mechanics
- RAG Architecture, LLM Orchestration, Gemini 2.5 Flash, Text-Embedding-004, Vercel AI SDK, Strict Vector Thresholding, Persona Engineering.

### Testing & Observability
- Jest, React Testing Library, Sentry, Datadog RUM, Chrome DevTools Profiler, CI/CD Pipeline optimization.

## Projects / Selected Work

### DSM Engineering Dashboard — Happiest Minds (2026, current)
Federated engineering intelligence platform processing high-velocity Git/Jira data streams. Architected the frontend utilizing **Apollo Federation** to compose multiple subgraphs, eliminating client-side over-fetching. Implemented **Web Workers** to offload complex ECharts metric aggregations from the main thread, resulting in a **60% reduction in Total Blocking Time (TBT)**. Designed a resilient webhook ingestion wizard for custom project pods.
**Tech Stack:** Next.js · Apollo Federation · ECharts · Web Workers · Micro-Frontends

### DocSense — Enterprise RAG Intelligence (Apr 2026, live)
Production RAG pipeline built strictly without bloated orchestration frameworks (e.g., LangChain) to maintain sub-100ms latency limits and zero hallucination. 
**Architecture:** PDF ingestion → 500-word chunking (50w overlap) → Gemini text-embedding-004 → Supabase pgvector (`hnsw` index) → exact cosine similarity retrieval at a **0.78 threshold**. 
Integrated **Upstash Redis Semantic Caching** to intercept redundant queries, slashing LLM API costs by 40% and returning cached answers instantly.
Live: docsense-swart.vercel.app · GitHub: github.com/Vaib4496/docsense-rag
**Tech Stack:** Next.js 15 (Edge) · Gemini 2.5 Flash · Supabase pgvector · Upstash Redis

### Interview Coach — AI Mock Interview Platform (Mar 2026, live)
Serverless LLM application solving the stateless memory problem through explicit conversational history reconstruction on every API call. Utilized advanced **Persona Engineering** via `system_instruction` to rigidly anchor the model as a senior SDE interviewer. Enforced structured JSON output parsing for automated, hallucination-free candidate scoring and feedback arrays.
Live: interview-coach-chatbot-nextjs.vercel.app · GitHub: github.com/Vaib4496/INTERVIEW-COACH-CHATBOT-NEXTJS
**Tech Stack:** Next.js (App Router) · Vercel AI SDK · Gemini API · TypeScript

## Professional Experience Timeline

### Happiest Minds Technologies, Hyderabad — Module Lead (May 2026 – Present)
- Directed frontend architecture for the federated DSM Engineering Dashboard using Next.js and Apollo Federation, composing distributed subgraphs into a unified data graph.
- Offloaded heavy data transformations to Web Workers, reducing TBT by **60%** and improving visual rendering speeds for complex ECharts aggregations.
- Architected the webhook-driven Git/Jira ingestion engine, resulting in real-time DORA metric visibility for leadership, increasing delivery throughput by **+35%**.
**Role Skills:** Next.js · Apollo Federation · ECharts · Web Workers · Architecture Leadership

### Publicis Sapient, Hyderabad — Senior Experience Engineer (May 2025 – May 2026)
- Architected a scalable Next.js **Micro-Frontend (MFE)** checkout platform supporting multiple global brands through unified component libraries and Webpack Module Federation.
- Led frontend delivery for high-traffic device launches (iPhone 16e, Galaxy A16), ensuring strict edge caching and fallback redundancy.
- Owned PayPal and Braintree payment integrations, achieving **99.9% checkout availability** during flash sales.
- Integrated AI-assisted Copilot/Claude workflows into the CI/CD pipeline, increasing feature delivery velocity by **+25%**.
**Role Skills:** Next.js · Micro-Frontends (MFE) · Webpack · Edge Caching · Payment Gateways

### Mosaic Wellness, Mumbai (Remote) — Software Development Engineer II (Mar 2022 – May 2025)
- Orchestrated a scalable multi-brand platform using React.js and Next.js, implementing environment-driven brand config switching that boosted user retention by **+20%**.
- Built the Zeus Admin Engine on AWS S3 & JSON schemas, decoupling content from code deployments and slashing engineering dependency by **−80%**.
- Spearheaded international expansion (Dubai, US) by integrating Stripe, Tabby, and regional compliance workflows, driving **+10% revenue uplift**.
- Re-engineered payment gateway failovers (Paytm, Snapmint) with strict error boundary fallback mechanisms, improving conversion rates by 5%.
**Role Skills:** React.js · Next.js · AWS S3 · JSON Schemas · Stripe / Payment Failovers

## Education

**B.Tech, Computer Science & Engineering** — SRM University, Chennai (2014–2018, CGPA 8.44)  
**Scaler Academy** — Advanced Data Structures & System Design (2021–2023)
