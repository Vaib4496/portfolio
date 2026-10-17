"use client";

import React, {
  Component,
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type ErrorInfo,
} from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";

/**
 * Curated knowledge base for seamless offline & rate-limited (429/500) fallbacks.
 */
interface FallbackQnA {
  query: string;
  response: string;
  source: string;
  similarity: string;
}

const FALLBACK_KNOWLEDGE: FallbackQnA[] = [
  {
    query: "What is Vaibhav architecting right now?",
    response:
      "Vaibhav is leading the frontend architecture for the **DSM Engineering Dashboard** at Happiest Minds. It centralizes Git PR metrics, Jira sprint trends, and DORA metrics using React.js, GraphQL, and ECharts.",
    source: "resume.md",
    similarity: "0.94",
  },
  {
    query: "Why no LangChain?",
    response:
      "Vaibhav avoids LangChain in production in favor of the direct Vercel AI SDK and native Gemini APIs. Direct integration eliminates opaque debugging layers, reduces cold-start bundle size by over 60%, and guarantees deterministic prompt control.",
    source: "architecture.md",
    similarity: "0.96",
  },
  {
    query: "Open to new roles?",
    response:
      "Yes, Vaibhav is actively exploring Staff / Principal Frontend Architect and AI Systems Engineering roles. He focuses on modern React/Next.js architectures, enterprise micro-frontends, and production LLM/RAG systems.",
    source: "contact.md",
    similarity: "0.99",
  },
  {
    query: "Biggest architecture win?",
    response:
      "At Mosaic Wellness, architecting the Zeus Admin Engine slashed cross-brand content update turnaround by 80%, decoupling frontend releases from marketing updates and cutting release cycles from days to minutes.",
    source: "case-studies/zeus.md",
    similarity: "0.95",
  },
];

const DEFAULT_WELCOME =
  "Hi, I'm Vaibhav's portfolio assistant. Ask me anything about his architecture leadership, production AI projects, or experience!";

interface ChatMessageDisplay {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  source?: string;
  similarity?: string;
}

const DEFAULT_MESSAGES: ChatMessageDisplay[] = [
  {
    id: "welcome",
    role: "assistant",
    content: DEFAULT_WELCOME,
  },
  {
    id: "sample-user",
    role: "user",
    content: "What is Vaibhav architecting right now?",
  },
  {
    id: "sample-ai",
    role: "assistant",
    content: FALLBACK_KNOWLEDGE[0].response,
    source: FALLBACK_KNOWLEDGE[0].source,
    similarity: FALLBACK_KNOWLEDGE[0].similarity,
  },
];

const QUICK_CHIPS = [
  "Why no LangChain?",
  "Open to new roles?",
  "Biggest architecture win?",
] as const;

/* ========================================================================= */
/* 1. Error Boundary (Class Component)                                       */
/* ========================================================================= */

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallbackRender?: (error: Error, reset: () => void) => React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ChatErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.warn("DocSenseChat caught runtime error in sub-tree:", error, errorInfo);
  }

  reset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallbackRender && this.state.error) {
        return this.props.fallbackRender(this.state.error, this.reset);
      }
      return <StaticSampleChatView isFallbackMode onReset={this.reset} />;
    }
    return this.props.children;
  }
}

/* ========================================================================= */
/* 2. Static / Fallback Chat View (Guaranteed 0 Crash)                      */
/* ========================================================================= */

interface StaticSampleChatViewProps {
  isFallbackMode?: boolean;
  onReset?: () => void;
  statusMessage?: string;
}

function StaticSampleChatView({
  isFallbackMode,
  onReset,
  statusMessage = "Offline / Rate-limited fallback mode active.",
}: StaticSampleChatViewProps) {
  const [localMessages, setLocalMessages] =
    useState<ChatMessageDisplay[]>(DEFAULT_MESSAGES);
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [localMessages]);

  const handleSendQuery = (query: string) => {
    const trimmed = query.trim();
    if (!trimmed) return;

    const userMsg: ChatMessageDisplay = {
      id: `usr-${Date.now()}`,
      role: "user",
      content: trimmed,
    };

    // Find match or provide comprehensive fallback
    const matched = FALLBACK_KNOWLEDGE.find(
      (item) =>
        item.query.toLowerCase().includes(trimmed.toLowerCase()) ||
        trimmed.toLowerCase().includes(item.query.toLowerCase().slice(0, 15))
    );

    const aiMsg: ChatMessageDisplay = matched
      ? {
          id: `ai-${Date.now() + 1}`,
          role: "assistant",
          content: matched.response,
          source: matched.source,
          similarity: matched.similarity,
        }
      : {
          id: `ai-${Date.now() + 1}`,
          role: "assistant",
          content:
            "Vaibhav is a Tech Lead with 6+ years specializing in Next.js 15, React Server Components, micro-frontends, and production RAG pipelines (Supabase pgvector + Gemini 2.5 Flash). Feel free to explore his selected work below or reach out directly at vaibhavchhajer44@gmail.com!",
          source: "portfolio-overview.md",
          similarity: "0.92",
        };

    setLocalMessages((prev) => [...prev, userMsg, aiMsg]);
    setInputText("");
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleSendQuery(inputText);
  };

  return (
    <div className="rounded-2xl p-5 shadow-2xl relative overflow-hidden bg-white/[0.03] backdrop-blur-md border border-white/10 flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-white/10">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-purple-600/30 border border-purple-500/40 flex items-center justify-center text-purple-400 text-sm">
            🧠
          </div>
          <div>
            <h3 className="text-xs font-bold text-white font-mono">
              DocSense — Ask My Portfolio
            </h3>
            <p className="text-[10px] text-neutral-400 font-mono">
              Sample Mode · Gemini 2.5 Flash
            </p>
          </div>
        </div>

        <span className="px-2 py-0.5 rounded-full bg-amber-950/80 border border-amber-800/80 text-[10px] font-mono text-amber-400 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
          fallback
        </span>
      </div>

      {/* Fallback Banner */}
      {isFallbackMode && (
        <div className="my-2 px-2.5 py-1.5 rounded-lg bg-amber-950/30 border border-amber-800/40 flex items-center justify-between text-[10px] font-mono text-amber-300">
          <span className="truncate pr-2">⚡ {statusMessage}</span>
          {onReset && (
            <button
              onClick={onReset}
              className="text-amber-200 underline hover:text-white shrink-0 font-semibold"
            >
              Retry Live
            </button>
          )}
        </div>
      )}

      {/* Chat Messages */}
      <div className="py-3 space-y-3.5 h-64 overflow-y-auto text-xs font-sans pr-1 scrollbar-thin scrollbar-thumb-white/10">
        {localMessages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.role === "user" ? "justify-end" : "justify-start gap-2.5"
            }`}
          >
            {msg.role === "assistant" && (
              <div className="w-6 h-6 rounded bg-purple-900/50 border border-purple-700 text-[10px] flex items-center justify-center text-purple-300 font-mono shrink-0">
                AI
              </div>
            )}
            <div
              className={`${
                msg.role === "user"
                  ? "bg-purple-600/30 border border-purple-500/40 text-purple-100 rounded-xl p-3 max-w-[85%]"
                  : "bg-white/[0.04] border border-white/10 rounded-xl p-3 text-neutral-200 leading-relaxed max-w-[88%] space-y-1.5"
              }`}
            >
              <p>{msg.content}</p>
              {msg.source && (
                <p className="font-mono text-[10px] text-neutral-400 pt-1 border-t border-white/5">
                  ↳ source: {msg.source} · similarity {msg.similarity}
                </p>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Starter Quick Chips */}
      <div className="pt-2 pb-3 flex flex-wrap gap-1.5 border-t border-white/10">
        {QUICK_CHIPS.map((chip) => (
          <button
            key={chip}
            type="button"
            onClick={() => handleSendQuery(chip)}
            className="px-2.5 py-1 rounded-full bg-white/[0.04] hover:bg-purple-950/60 border border-white/10 hover:border-purple-500/40 text-[10px] font-mono text-neutral-300 hover:text-purple-200 transition-colors cursor-pointer"
          >
            {chip}
          </button>
        ))}
      </div>

      {/* Input Bar */}
      <form onSubmit={onSubmit} className="flex gap-2">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Ask about architecture, RAG, or experience..."
          className="flex-1 bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-purple-500/70 transition-colors font-mono"
        />
        <button
          type="submit"
          className="px-3.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-mono text-xs shadow-md shadow-purple-900/40 transition-colors font-semibold cursor-pointer"
        >
          Send
        </button>
      </form>
    </div>
  );
}

/* ========================================================================= */
/* 3. Live DocSense Chat Implementation using Vercel AI SDK useChat          */
/* ========================================================================= */

interface DocSenseChatInnerProps {
  initialMessages?: UIMessage[];
}

function DocSenseChatInner({ initialMessages }: DocSenseChatInnerProps) {
  const [inputValue, setInputValue] = useState("");
  const [fallbackActive, setFallbackActive] = useState(false);
  const [fallbackReason, setFallbackReason] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize transport targeting /api/chat
  const transport = useRef(
    new DefaultChatTransport({
      api: "/api/chat",
    })
  ).current;

  const {
    messages,
    sendMessage,
    status,
    error,
    clearError,
  } = useChat({
    transport,
    messages: initialMessages,
    onError: (err) => {
      console.warn("DocSenseChat: API returned error, activating fallback", err);
      const is429 =
        err.message?.includes("429") ||
        err.message?.toLowerCase().includes("rate limit") ||
        err.message?.toLowerCase().includes("too many requests");
      const is500 =
        err.message?.includes("500") ||
        err.message?.toLowerCase().includes("internal server error");

      setFallbackReason(
        is429
          ? "Rate limited (5 req/min). Switched to curated sample conversation."
          : is500
          ? "API temporary error. Switched to curated sample conversation."
          : "API unavailable. Switched to interactive sample mode."
      );
      setFallbackActive(true);
    },
  });

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, status]);

  // If an error is caught by useChat, switch seamlessly to static sample conversation
  if (fallbackActive || error) {
    return (
      <StaticSampleChatView
        isFallbackMode
        statusMessage={fallbackReason || "Switched to sample conversation mode."}
        onReset={() => {
          clearError();
          setFallbackActive(false);
          setFallbackReason("");
        }}
      />
    );
  }

  const handleSend = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || status === "submitted" || status === "streaming") return;

    setInputValue("");
    try {
      await sendMessage({ text: trimmed });
    } catch (err: unknown) {
      console.warn("Failed to send message live, falling back:", err);
      setFallbackReason("Network error. Switched to sample mode.");
      setFallbackActive(true);
    }
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleSend(inputValue);
  };

  // Helper to extract text parts safely from UIMessage
  const extractText = (msg: UIMessage): string => {
    if (Array.isArray(msg.parts)) {
      const texts = msg.parts
        .filter((part): part is { type: "text"; text: string } => part.type === "text")
        .map((p) => p.text);
      if (texts.length > 0) return texts.join("\n");
    }
    // Fallback if content exists directly
    if ("content" in msg && typeof (msg as { content?: unknown }).content === "string") {
      return (msg as { content: string }).content;
    }
    return "";
  };

  const hasMessages = messages && messages.length > 0;

  return (
    <div className="rounded-2xl p-5 shadow-2xl relative overflow-hidden bg-white/[0.03] backdrop-blur-md border border-white/10 flex flex-col justify-between">
      {/* Widget Header */}
      <div className="flex items-center justify-between pb-3 border-b border-white/10">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-purple-600/30 border border-purple-500/40 flex items-center justify-center text-purple-400 text-sm">
            🧠
          </div>
          <div>
            <h3 className="text-xs font-bold text-white font-mono">
              DocSense — Ask My Portfolio
            </h3>
            <p className="text-[10px] text-neutral-400 font-mono">
              Powered by Gemini 2.5 Flash
            </p>
          </div>
        </div>

        <span className="px-2 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-800 text-[10px] font-mono text-emerald-400 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          live
        </span>
      </div>

      {/* Chat Message Log */}
      <div className="py-4 space-y-3.5 h-64 overflow-y-auto text-xs font-sans pr-1 scrollbar-thin scrollbar-thumb-white/10">
        {/* Default Welcome if empty */}
        {!hasMessages && (
          <div className="flex gap-2.5">
            <div className="w-6 h-6 rounded bg-purple-900/50 border border-purple-700 text-[10px] flex items-center justify-center text-purple-300 font-mono shrink-0">
              AI
            </div>
            <div className="bg-white/[0.04] border border-white/10 rounded-xl p-3 text-neutral-200 leading-relaxed max-w-[88%]">
              {DEFAULT_WELCOME}
            </div>
          </div>
        )}

        {messages.map((msg) => {
          const text = extractText(msg);
          const isUser = msg.role === "user";

          return (
            <div
              key={msg.id}
              className={`flex ${isUser ? "justify-end" : "justify-start gap-2.5"}`}
            >
              {!isUser && (
                <div className="w-6 h-6 rounded bg-purple-900/50 border border-purple-700 text-[10px] flex items-center justify-center text-purple-300 font-mono shrink-0">
                  AI
                </div>
              )}
              <div
                className={`${
                  isUser
                    ? "bg-purple-600/30 border border-purple-500/40 text-purple-100 rounded-xl p-3 max-w-[85%]"
                    : "bg-white/[0.04] border border-white/10 rounded-xl p-3 text-neutral-200 leading-relaxed max-w-[88%] space-y-1.5"
                }`}
              >
                <p className="whitespace-pre-wrap">{text}</p>
                {!isUser && (
                  <p className="font-mono text-[10px] text-neutral-400 pt-1 border-t border-white/5">
                    ↳ source: pgvector · Gemini 2.5 Flash
                  </p>
                )}
              </div>
            </div>
          );
        })}

        {/* Streaming/Loading Indicator */}
        {(status === "submitted" || status === "streaming") && (
          <div className="flex gap-2.5 items-center">
            <div className="w-6 h-6 rounded bg-purple-900/50 border border-purple-700 text-[10px] flex items-center justify-center text-purple-300 font-mono shrink-0">
              AI
            </div>
            <div className="bg-white/[0.04] border border-white/10 rounded-xl px-3 py-2 text-neutral-400 text-xs flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce" />
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce [animation-delay:0.2s]" />
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce [animation-delay:0.4s]" />
              <span className="font-mono text-[10px] text-neutral-500 ml-1">
                generating answer...
              </span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Starter Quick Chips */}
      <div className="pt-2 pb-3 flex flex-wrap gap-1.5 border-t border-white/10">
        {QUICK_CHIPS.map((chip) => (
          <button
            key={chip}
            type="button"
            disabled={status === "submitted" || status === "streaming"}
            onClick={() => handleSend(chip)}
            className="px-2.5 py-1 rounded-full bg-white/[0.04] hover:bg-purple-950/60 border border-white/10 hover:border-purple-500/40 text-[10px] font-mono text-neutral-300 hover:text-purple-200 transition-colors disabled:opacity-50 cursor-pointer"
          >
            {chip}
          </button>
        ))}
      </div>

      {/* Input Bar */}
      <form onSubmit={onSubmit} className="flex gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          disabled={status === "submitted" || status === "streaming"}
          placeholder="Ask about architecture, RAG, or experience..."
          className="flex-1 bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-purple-500 transition-colors font-mono disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={
            !inputValue.trim() ||
            status === "submitted" ||
            status === "streaming"
          }
          className="px-3.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:bg-purple-900/50 disabled:text-neutral-500 disabled:cursor-not-allowed text-white font-mono text-xs shadow-md shadow-purple-900/40 transition-colors font-semibold cursor-pointer"
        >
          Send
        </button>
      </form>
    </div>
  );
}

/* ========================================================================= */
/* 4. Main Export Wrapped with Error Boundary                                */
/* ========================================================================= */

export interface DocSenseChatProps {
  initialMessages?: UIMessage[];
}

export function DocSenseChat(props: DocSenseChatProps) {
  return (
    <ChatErrorBoundary
      fallbackRender={(_error, reset) => (
        <StaticSampleChatView
          isFallbackMode
          statusMessage="Rendering error caught safely. Restored to sample mode."
          onReset={reset}
        />
      )}
    >
      <DocSenseChatInner {...props} />
    </ChatErrorBoundary>
  );
}
