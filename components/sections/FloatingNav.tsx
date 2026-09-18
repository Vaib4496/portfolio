"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Command, FileText, Menu, X, Sparkles } from "lucide-react";

interface NavItem {
  name: string;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { name: "Work", href: "#work" },
  { name: "Stack", href: "#stack" },
  { name: "Architecture", href: "#architecture" },
  { name: "AI & RAG", href: "#rag" },
  { name: "Contact", href: "#contact" },
];

export function FloatingNav() {
  const [activeSection, setActiveSection] = useState<string>("");
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = NAV_ITEMS.map((item) => item.href.substring(1));
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section) {
          const top = section.offsetTop;
          const height = section.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sections[i]);
            return;
          }
        }
      }
      if (window.scrollY < 200) {
        setActiveSection("");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const triggerCmdK = () => {
    // Dispatch custom event for Command Palette modal trigger
    window.dispatchEvent(new CustomEvent("toggle-command-palette"));
    // Also simulate Cmd+K KeyboardEvent for cmdk listeners
    const event = new KeyboardEvent("keydown", {
      key: "k",
      metaKey: true,
      bubbles: true,
    });
    document.dispatchEvent(event);
  };

  return (
    <header className="fixed top-4 inset-x-0 z-50 flex items-center justify-center px-4 transition-all duration-300">
      <nav
        className={`w-full max-w-4xl glass-panel backdrop-blur-md bg-black/60 border border-glass-border rounded-full px-3 py-2 sm:px-5 sm:py-2.5 shadow-2xl flex items-center justify-between transition-all duration-300 ${
          scrolled ? "bg-black/80 shadow-accent/5 border-glass-border/90" : ""
        }`}
      >
        {/* Brand Logo & Active Availability Indicator */}
        <Link
          href="/"
          className="flex items-center gap-2.5 font-mono text-sm font-semibold tracking-tight text-text hover:opacity-80 transition-opacity pl-1"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green"></span>
          </span>
          <span className="text-white font-bold">VC</span>
          <span className="text-muted hidden md:inline text-xs font-normal">
            / Tech Lead
          </span>
        </Link>

        {/* Desktop Nav Links (Scroll Spy Highlight) */}
        <div className="hidden md:flex items-center gap-1 sm:gap-1.5 bg-white/[0.03] border border-white/[0.06] rounded-full px-2 py-1">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.href.substring(1);
            return (
              <a
                key={item.name}
                href={item.href}
                className={`relative px-3 py-1 text-xs font-medium rounded-full transition-all duration-200 ${
                  isActive
                    ? "text-white bg-white/10 shadow-sm"
                    : "text-muted hover:text-white hover:bg-white/5"
                }`}
              >
                {item.name}
              </a>
            );
          })}
        </div>

        {/* Action Controls: Cmd+K & Resume CTA */}
        <div className="flex items-center gap-2">
          {/* Cmd+K Quick Search Trigger */}
          <button
            onClick={triggerCmdK}
            type="button"
            className="flex items-center gap-1.5 px-2.5 py-1.2 text-xs text-muted hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-all"
            aria-label="Open Command Palette"
            title="Open AI Command Search (⌘K)"
          >
            <Command className="w-3.5 h-3.5 text-accent" />
            <kbd className="hidden sm:inline-block font-mono text-[10px] bg-white/10 px-1.5 py-0.5 rounded border border-white/10 text-white">
              ⌘K
            </kbd>
          </button>

          {/* Résumé CTA */}
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-white bg-accent hover:bg-accent/90 rounded-full shadow-lg shadow-accent/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Résumé →</span>
          </a>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 text-muted hover:text-white rounded-full bg-white/5 border border-white/10"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed top-20 inset-x-4 glass-panel backdrop-blur-xl bg-black/90 border border-glass-border rounded-2xl p-4 shadow-2xl flex flex-col gap-2 z-50">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`px-4 py-2.5 text-sm font-medium rounded-xl transition-all ${
                activeSection === item.href.substring(1)
                  ? "bg-white/10 text-white"
                  : "text-muted hover:text-white hover:bg-white/5"
              }`}
            >
              {item.name}
            </a>
          ))}
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-center gap-2 mt-2 px-4 py-2.5 text-sm font-medium text-white bg-accent rounded-xl"
          >
            <FileText className="w-4 h-4" />
            <span>Résumé →</span>
          </a>
        </div>
      )}
    </header>
  );
}
