import { STACK_CATEGORIES, type StackCategory } from "@/content/stack";

interface StackGridProps {
  categories?: StackCategory[];
}

export function StackGrid({ categories = STACK_CATEGORIES }: StackGridProps) {
  return (
    <section id="stack" className="space-y-8 text-left my-16 sm:my-24" aria-label="Technical Skills & Architecture Toolkit">
      {/* Section Header */}
      <div>
        <span className="font-mono text-xs text-purple-400 tracking-wider uppercase font-semibold">
          / Technical Stack
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1 tracking-tight">
          The toolkit.
        </h2>
        <p className="text-xs sm:text-sm text-neutral-400 mt-1 max-w-2xl leading-relaxed">
          Technologies, frameworks, and architectural patterns proven under high concurrency and enterprise production demands.
        </p>
      </div>

      {/* 4-Column Responsive Grid with Hover CSS States (Zero Client JS) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="group rounded-2xl p-6 space-y-5 bg-white/[0.03] backdrop-blur-md border border-white/10 transition-all duration-300 hover:border-purple-500/50 hover:-translate-y-1 hover:shadow-2xl hover:shadow-purple-950/20 relative overflow-hidden"
          >
            {/* Ambient Corner Glow */}
            <div
              className="absolute -top-10 -right-10 w-24 h-24 bg-purple-600/10 rounded-full blur-xl pointer-events-none transition-opacity duration-300 opacity-30 group-hover:opacity-75"
              aria-hidden="true"
            />

            {/* Category Header */}
            <div className="space-y-1 relative z-10 border-b border-white/5 pb-3">
              <h3 className="font-mono text-xs font-bold text-purple-400 uppercase tracking-wider">
                {cat.category}
              </h3>
              <p className="font-mono text-[10px] text-neutral-400">
                {cat.tagline}
              </p>
            </div>

            {/* Skills List */}
            <ul className="text-xs text-neutral-300 space-y-2.5 font-mono relative z-10">
              {cat.skills.map((skill) => (
                <li
                  key={skill.name}
                  className="flex items-center justify-between gap-2 group/item transition-colors hover:text-white"
                >
                  <span className="flex items-center gap-2">
                    <span
                      className={`w-1.5 h-1.5 rounded-full transition-colors ${
                        skill.isPrimary
                          ? "bg-purple-400 shadow-sm shadow-purple-500/50"
                          : "bg-neutral-600 group-hover/item:bg-neutral-400"
                      }`}
                      aria-hidden="true"
                    />
                    <span className={skill.isPrimary ? "font-semibold text-neutral-100" : ""}>
                      {skill.name}
                    </span>
                  </span>

                  {skill.note && (
                    <span className="text-[9px] text-neutral-400 bg-white/[0.04] px-1.5 py-0.5 rounded border border-white/5 shrink-0">
                      {skill.note}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
