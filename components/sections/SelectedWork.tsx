import Link from "next/link";
import { SELECTED_PROJECTS, type ProjectItem } from "@/content/projects";

interface SelectedWorkProps {
  projects?: ProjectItem[];
}

export function SelectedWork({ projects = SELECTED_PROJECTS }: SelectedWorkProps) {
  return (
    <section id="work" className="space-y-8 text-left my-16 sm:my-24" aria-label="Selected Work & Case Studies">
      {/* Section Header */}
      <div>
        <span className="font-mono text-xs text-purple-400 tracking-wider uppercase font-semibold">
          / Selected Work
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1 tracking-tight">
          Systems I&apos;ve architected, products I&apos;ve shipped.
        </h2>
        <p className="text-xs sm:text-sm text-neutral-400 mt-1 max-w-2xl leading-relaxed">
          Production platforms balancing sub-100ms user responsiveness, edge scalability, and robust AI integrations.
        </p>
      </div>

      {/* 3-Column Responsive Grid with Hover CSS States (Zero Client JS) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {projects.map((project) => (
          <article
            key={project.id}
            className="group rounded-2xl p-6 flex flex-col justify-between space-y-6 bg-white/[0.03] backdrop-blur-md border border-white/10 transition-all duration-300 hover:border-purple-500/50 hover:-translate-y-1 hover:shadow-2xl hover:shadow-purple-950/30 relative overflow-hidden"
          >
            {/* Ambient Corner Accent */}
            <div
              className="absolute -top-12 -right-12 w-28 h-28 bg-purple-600/10 rounded-full blur-xl pointer-events-none transition-opacity duration-300 opacity-40 group-hover:opacity-80"
              aria-hidden="true"
            />

            <div className="space-y-3.5 relative z-10">
              {/* Badges Row */}
              <div className="flex items-center justify-between flex-wrap gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-purple-950/80 border border-purple-800 text-[10px] font-mono text-purple-300 font-medium">
                  {project.badge}
                </span>

                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-medium flex items-center gap-1.5 ${
                    project.statusColor === "emerald"
                      ? "bg-emerald-950/80 border border-emerald-800 text-emerald-400"
                      : "bg-purple-900/40 border border-purple-700/50 text-purple-300"
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      project.statusColor === "emerald"
                        ? "bg-emerald-400"
                        : "bg-purple-400"
                    }`}
                  />
                  {project.status}
                </span>
              </div>

              {/* Title & Tagline */}
              <div>
                <h3 className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors">
                  {project.title}
                </h3>
                <p className="font-mono text-[11px] text-neutral-400 mt-0.5">
                  {project.tagline}
                </p>
              </div>

              {/* Description */}
              <p className="text-xs text-neutral-300 leading-relaxed">
                {project.description}
              </p>

              {/* Architecture Metric Highlight */}
              {project.metricHighlight && (
                <div className="pt-1 flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-white bg-white/[0.05] border border-white/10 px-2 py-0.5 rounded">
                    {project.metricHighlight.value}
                  </span>
                  <span className="text-[11px] font-mono text-neutral-400">
                    {project.metricHighlight.label}
                  </span>
                </div>
              )}
            </div>

            {/* Tech Stack & Action Links */}
            <div className="space-y-4 pt-2 border-t border-white/5 relative z-10">
              {/* Tech Tags */}
              <div className="flex flex-wrap gap-1.5 font-mono text-[10px] text-neutral-400">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 rounded bg-white/[0.04] border border-white/5 hover:border-purple-500/30 transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Links Row */}
              <div className="flex items-center justify-between text-xs font-mono pt-1">
                <div className="flex items-center gap-3">
                  {project.links.live && (
                    <a
                      href={project.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-400 hover:text-purple-300 transition-colors flex items-center gap-1 group/link"
                    >
                      <span>Live Demo</span>
                      <span className="transition-transform group-link-hover:translate-x-0.5 group-link-hover:-translate-y-0.5">
                        ↗
                      </span>
                    </a>
                  )}
                  {project.links.github && (
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-neutral-400 hover:text-white transition-colors flex items-center gap-1"
                    >
                      <span>GitHub</span>
                      <span>↗</span>
                    </a>
                  )}
                </div>

                {project.links.caseStudy && (
                  <Link
                    href={project.links.caseStudy}
                    className="text-neutral-400 hover:text-purple-300 transition-colors flex items-center gap-1 group/cs font-semibold"
                  >
                    <span>Read Deep Dive</span>
                    <span className="transition-transform group-cs-hover:translate-x-0.5">
                      →
                    </span>
                  </Link>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
