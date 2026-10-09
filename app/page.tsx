"use client";

import React, { useState, useRef } from "react";
import {
  Sparkles,
  ArrowRight,
  Play,
  ChevronDown,
  Menu,
  X,
  Wand2,
  Copy,
  Check,
  Cpu,
} from "lucide-react";
import ScrollCanvas from "./components/ScrollCanvas";
import InfiniteLogoCarousel from "./components/InfiniteLogoCarousel";
import BentoGrid from "./components/BentoGrid";

interface SlideData {
  id: string;
  label: string;
  titleWord: string;
  accentWord: string;
  tagline: string;
  promptText: string;
  model: string;
}

const SLIDES: SlideData[] = [
  {
    id: "01",
    label: "Cinematic Synthesis",
    titleWord: "Dreams",
    accentWord: "into Reality",
    tagline:
      "Synthesize hyper-realistic visuals, surreal cinematic worlds, and bespoke artistic concepts in seconds with our state-of-the-art neural diffusion engine.",
    promptText:
      "Surreal floating celestial sanctuary, winding golden road through winter dusk into a warm cabin, 8k cinematic",
    model: "FLUX.2 Ultra",
  },
  {
    id: "02",
    label: "Neural Architecture",
    titleWord: "Vision",
    accentWord: "without Limits",
    tagline:
      "Break past conventional canvas bounds. From photorealistic architecture to futuristic biomechanical wonders, engineered for visionary creators.",
    promptText:
      "Warm cedar sanctuary floating amidst starry celestial vortex, deep gold lighting, cinematic depth",
    model: "DreamFrame Core v4.5",
  },
  {
    id: "03",
    label: "Quantum Diffusion",
    titleWord: "Prompts",
    accentWord: "into Mastery",
    tagline:
      "Trained on billions of curated aesthetic dimensions. Instantaneous 16K generation with unparalleled volumetric lighting and physics accuracy.",
    promptText:
      "Moonlit celestial horizon with origami papercraft rings and glowing celestial trails",
    model: "Latent Diffusion Pro",
  },
];

export default function Home() {
  const heroContainerRef = useRef<HTMLDivElement | null>(null);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showPromptCopied, setShowPromptCopied] = useState(false);
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [customPrompt, setCustomPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedSuccess, setGeneratedSuccess] = useState(false);

  // Performance Optimization: Direct DOM refs to eliminate React re-renders during 120Hz scrolling
  const frameBadgeRef = useRef<HTMLSpanElement | null>(null);
  const scrollPctRef = useRef<HTMLSpanElement | null>(null);

  const handleFrameUpdate = React.useCallback((frame: number, progress: number) => {
    if (frameBadgeRef.current) {
      frameBadgeRef.current.textContent = `Frame ${String(frame).padStart(3, "0")} / 150`;
    }
    if (scrollPctRef.current) {
      scrollPctRef.current.textContent = `${Math.round(progress * 100)}%`;
    }
  }, []);

  const activeSlide = SLIDES[activeSlideIndex];

  const handleCopyPrompt = () => {
    navigator.clipboard?.writeText(activeSlide.promptText);
    setShowPromptCopied(true);
    setTimeout(() => setShowPromptCopied(false), 2000);
  };

  const handleSimulatedGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (isGenerating) return;
    setIsGenerating(true);
    setGeneratedSuccess(false);
    setTimeout(() => {
      setIsGenerating(false);
      setGeneratedSuccess(true);
    }, 1800);
  };

  return (
    <div className="relative w-full bg-[#050508] text-white selection:bg-purple-500/30 selection:text-white">
      {/* TALL SCROLL AREA FOR HERO (450vh) PINNING STICKY CANVAS */}
      <div ref={heroContainerRef} className="relative w-full h-[450vh]">
        {/* FULL-SCREEN PINNED STICKY VIEWPORT */}
        <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between">
          {/* CINEMATIC SCROLL-LINKED HTML5 CANVAS BACKGROUND */}
          <ScrollCanvas
            totalFrames={150}
            containerRef={heroContainerRef}
            onFrameUpdate={handleFrameUpdate}
          />

          {/* OVERSIZED BRAND TEXT (Watermark exactly as specified) */}
          <div className="absolute top-[14%] sm:top-[12%] lg:top-[10%] left-1/2 -translate-x-1/2 w-full text-center pointer-events-none select-none z-[2] overflow-hidden">
            <h2 className="text-[14vw] font-black tracking-[0.22em] text-white/[0.045] uppercase leading-none font-sans whitespace-nowrap drop-shadow-sm blur-[0.4px]">
              DREAMFRAME
            </h2>
          </div>

          {/* TOP NAVIGATION BAR */}
          <header className="relative z-20 w-full px-6 sm:px-10 lg:px-16 pt-7 pb-4">
            <nav className="max-w-7xl mx-auto flex items-center justify-between">
              {/* Brand Logo & Monogram */}
              <a
                href="#"
                className="flex items-center gap-3 group focus:outline-none"
                aria-label="Dreamframe Home"
              >
                <div className="relative w-9 h-9 rounded-lg bg-gradient-to-br from-purple-500/30 to-orange-500/20 border border-white/15 flex items-center justify-center backdrop-blur-md group-hover:border-purple-400/50 transition-colors">
                  <span className="font-serif font-black text-lg bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-orange-300">
                    D
                  </span>
                  <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-gradient-to-r from-orange-500 to-purple-500 animate-pulse" />
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold tracking-[0.26em] text-sm text-white/95 uppercase font-sans">
                    DREAMFRAME
                  </span>
                  <span className="text-[9px] tracking-[0.3em] text-purple-300/70 uppercase">
                    NEURAL IMAGERY
                  </span>
                </div>
              </a>

              {/* Desktop Navigation Links */}
              <div className="hidden md:flex items-center gap-8 lg:gap-10">
                {["Home", "Models", "Showcase", "Architecture", "API"].map(
                  (item, idx) => (
                    <a
                      key={item}
                      href={`#${item.toLowerCase()}`}
                      className={`relative text-xs uppercase tracking-[0.22em] transition-all duration-200 ${
                        idx === 0
                          ? "text-white font-medium after:content-[''] after:absolute after:-bottom-1.5 after:left-0 after:w-full after:h-[1.5px] after:bg-gradient-to-r after:from-orange-400 after:to-purple-500"
                          : "text-zinc-400 hover:text-white"
                      }`}
                    >
                      {item}
                    </a>
                  )
                )}
              </div>

              {/* Right Action: Availability Badge & Menu Icon */}
              <div className="flex items-center gap-4">
                {/* Availability Pill Badge */}
                <button
                  onClick={() => setShowDemoModal(true)}
                  className="hidden sm:inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/15 bg-white/[0.04] hover:bg-white/[0.08] backdrop-blur-md transition-all group"
                >
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
                  </span>
                  <span className="text-xs tracking-wider text-zinc-300 group-hover:text-white font-medium">
                    Try Studio
                  </span>
                </button>

                {/* Hamburger Button for Mobile / Extra Drawer */}
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="w-10 h-10 rounded-full border border-white/15 bg-white/[0.04] hover:bg-white/[0.1] backdrop-blur-md flex items-center justify-center text-zinc-300 hover:text-white transition-all"
                  aria-label="Toggle Navigation Menu"
                >
                  {mobileMenuOpen ? (
                    <X className="w-5 h-5 text-white" />
                  ) : (
                    <Menu className="w-5 h-5 text-white" />
                  )}
                </button>
              </div>
            </nav>

            {/* Mobile Slide-down Drawer */}
            {mobileMenuOpen && (
              <div className="md:hidden mt-4 p-5 rounded-2xl border border-white/10 bg-[#0d0c15]/95 backdrop-blur-xl animate-in fade-in slide-in-from-top-4 duration-300">
                <div className="flex flex-col gap-4">
                  {["Home", "Models", "Showcase", "Architecture", "API"].map(
                    (item) => (
                      <a
                        key={item}
                        href={`#${item.toLowerCase()}`}
                        onClick={() => setMobileMenuOpen(false)}
                        className="text-sm uppercase tracking-[0.2em] text-zinc-300 hover:text-white py-1.5 border-b border-white/5"
                      >
                        {item}
                      </a>
                    )
                  )}
                  <div className="pt-2 flex flex-col gap-3">
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        setShowDemoModal(true);
                      }}
                      className="w-full py-2.5 rounded-full text-center text-xs font-semibold uppercase tracking-wider bg-gradient-to-r from-orange-500 via-rose-500 to-purple-600 text-white"
                    >
                      Launch Generator Studio
                    </button>
                  </div>
                </div>
              </div>
            )}
          </header>

          {/* TOP-RIGHT EDITORIAL VERTICAL CAPTION */}
          <div className="hidden lg:flex fixed top-28 right-12 z-20 flex-row items-start gap-3 pointer-events-none select-none">
            <div className="flex flex-col items-end text-[10px] tracking-[0.3em] font-mono uppercase text-zinc-400/80 leading-relaxed text-right">
              <span>NEURAL</span>
              <span>SYNTHESIS</span>
              <span>DIFFUSION</span>
              <span>HARMONY</span>
            </div>
            <div className="w-[1px] h-16 bg-gradient-to-b from-purple-400/40 via-white/20 to-transparent" />
          </div>

          {/* MAIN HERO CONTENT */}
          <main className="relative z-20 w-full px-6 sm:px-10 lg:px-16 my-auto py-8 lg:py-12">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Column: Typography, Badges & CTAs */}
              <div className="lg:col-span-8 flex flex-col items-start max-w-3xl">
                {/* Availability-Style Badge / Kicker */}
                <div className="flex items-center gap-3.5 mb-5 sm:mb-7">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-purple-500/30 bg-purple-950/30 backdrop-blur-md shadow-[0_0_15px_rgba(168,85,247,0.15)]">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-400"></span>
                    </span>
                    <span className="text-[11px] sm:text-xs font-semibold tracking-[0.22em] text-purple-200 uppercase font-mono">
                      AI IMAGE GENERATOR
                    </span>
                  </div>
                  {/* Fine hairline divider extending right */}
                  <div className="h-[1px] w-12 sm:w-20 bg-gradient-to-r from-purple-400/40 to-transparent" />
                </div>

                {/* Oversized Editorial Headline */}
                <h1 className="font-serif text-5xl sm:text-7xl lg:text-[5.4rem] tracking-tight text-white leading-[1.04] mb-6">
                  <span className="block drop-shadow-md">
                    {activeSlide.titleWord}
                  </span>
                  <span className="block">
                    into{" "}
                    <span className="font-serif italic font-medium bg-clip-text text-transparent bg-gradient-to-r from-violet-300 via-fuchsia-300 to-orange-400 text-glow-purple drop-shadow-[0_0_35px_rgba(168,85,247,0.35)]">
                      {activeSlide.accentWord.replace("into ", "")}
                    </span>
                  </span>
                </h1>

                {/* Concise Supporting Description */}
                <p className="text-zinc-300/90 text-base sm:text-lg lg:text-xl font-light leading-relaxed max-w-xl mb-7">
                  {activeSlide.tagline}
                </p>

                {/* Interactive Prompt Chip */}
                <div className="w-full max-w-xl mb-8 p-3 rounded-2xl glass-panel border border-white/10 hover:border-purple-500/30 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 group">
                  <div className="flex items-center gap-2.5 overflow-hidden text-xs text-zinc-300 font-mono">
                    <Sparkles className="w-4 h-4 text-orange-400 shrink-0 animate-pulse" />
                    <span className="text-purple-300/80 font-semibold uppercase tracking-wider text-[10px]">
                      Prompt:
                    </span>
                    <span className="truncate italic text-zinc-300">
                      &ldquo;{activeSlide.promptText}&rdquo;
                    </span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
                    <button
                      onClick={handleCopyPrompt}
                      className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-[11px] font-mono text-zinc-300 hover:text-white flex items-center gap-1.5 transition-colors"
                      title="Copy Prompt"
                    >
                      {showPromptCopied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400 font-medium">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* CTA BUTTON GROUP */}
                <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                  {/* Primary Orange/Purple CTA */}
                  <button
                    onClick={() => setShowDemoModal(true)}
                    className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-orange-500 via-rose-500 to-purple-600 hover:from-orange-400 hover:via-rose-400 hover:to-purple-500 text-white font-medium text-sm sm:text-base tracking-wide orange-purple-glow transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <span>Start Creating</span>
                    <span className="w-7 h-7 rounded-full bg-black/25 flex items-center justify-center group-hover:translate-x-1 group-hover:bg-black/35 transition-all">
                      <ArrowRight className="w-4 h-4 text-white" />
                    </span>
                  </button>

                  {/* Secondary Circular Play Button */}
                  <button
                    onClick={() => setShowDemoModal(true)}
                    className="inline-flex items-center gap-3.5 px-6 py-4 rounded-full border border-white/15 bg-white/[0.04] hover:bg-white/[0.1] backdrop-blur-md text-zinc-200 hover:text-white transition-all duration-300 group hover:border-purple-400/40"
                  >
                    <span className="w-7 h-7 rounded-full border border-white/30 flex items-center justify-center bg-white/10 group-hover:bg-purple-500/30 group-hover:border-purple-400 transition-colors">
                      <Play className="w-3.5 h-3.5 fill-current ml-0.5 text-white" />
                    </span>
                    <span className="text-sm font-medium tracking-wide">
                      Watch Showcase
                    </span>
                  </button>
                </div>
              </div>

              {/* Right Column: Floating Engine Specs & Active Frame Counter */}
              <div className="hidden lg:flex lg:col-span-4 flex-col items-end justify-center">
                <div className="glass-panel p-5 rounded-2xl border border-white/10 max-w-xs w-full animate-float">
                  <div className="flex items-center justify-between pb-3 border-b border-white/10">
                    <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-400 flex items-center gap-2">
                      <Cpu className="w-3.5 h-3.5 text-purple-400" />
                      Sequence Engine
                    </span>
                    <span
                      ref={frameBadgeRef}
                      className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-300 border border-orange-500/30"
                    >
                      Frame 001 / 150
                    </span>
                  </div>
                  <div className="pt-3 space-y-2.5 font-mono text-xs">
                    <div className="flex justify-between text-zinc-300">
                      <span className="text-zinc-500">Scroll Depth:</span>
                      <span ref={scrollPctRef} className="text-purple-300">
                        0%
                      </span>
                    </div>
                    <div className="flex justify-between text-zinc-300">
                      <span className="text-zinc-500">Architecture:</span>
                      <span className="text-orange-300">{activeSlide.model}</span>
                    </div>
                    <div className="flex justify-between text-zinc-300">
                      <span className="text-zinc-500">Interpolation:</span>
                      <span className="text-emerald-400">Apple RAF Lerp</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>

          {/* FOOTER CONTROLS: PAGINATION (LEFT) & SCROLL INDICATOR (RIGHT) */}
          <footer className="relative z-20 w-full px-6 sm:px-10 lg:px-16 py-6 border-t border-white/5">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              {/* Bottom Left Slide / Pagination Indicators (01  02  03) */}
              <div className="flex items-center gap-6">
                {SLIDES.map((slide, index) => {
                  const isActive = index === activeSlideIndex;
                  return (
                    <button
                      key={slide.id}
                      onClick={() => setActiveSlideIndex(index)}
                      className="group flex flex-col items-start focus:outline-none"
                      aria-label={`Go to slide ${slide.id}`}
                    >
                      <span
                        className={`font-mono text-xs sm:text-sm tracking-widest transition-colors ${
                          isActive
                            ? "text-white font-bold"
                            : "text-zinc-500 group-hover:text-zinc-300"
                        }`}
                      >
                        {slide.id}
                      </span>
                      {/* Underline bar indicator */}
                      <span
                        className={`mt-1 h-[2px] transition-all duration-300 ${
                          isActive
                            ? "w-7 bg-gradient-to-r from-orange-400 to-purple-500"
                            : "w-0 group-hover:w-3 bg-zinc-600"
                        }`}
                      />
                    </button>
                  );
                })}
              </div>

              {/* Bottom Right: SCROLL TO EXPLORE with Circular Arrow */}
              <a
                href="#partners"
                className="flex items-center gap-3 text-zinc-400 hover:text-white transition-colors group cursor-pointer"
              >
                <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.25em]">
                  Scroll to explore
                </span>
                <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:border-purple-400 group-hover:bg-purple-500/10 transition-all duration-300">
                  <ChevronDown className="w-4 h-4 text-zinc-300 group-hover:text-purple-300 group-hover:translate-y-0.5 transition-transform" />
                </div>
              </a>
            </div>
          </footer>
        </div>
      </div>

      {/* SECTION 1: INFINITE DUAL-ROW LOGO CAROUSEL */}
      <div id="partners">
        <InfiniteLogoCarousel />
      </div>

      {/* SECTION 2: ASYMMETRIC BENTO GRID */}
      <div id="architecture">
        <BentoGrid />
      </div>

      {/* INTERACTIVE PROMPT PLAYGROUND MODAL */}
      {showDemoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-xl rounded-2xl glass-panel border border-white/15 p-6 sm:p-8 bg-[#0d0c15] shadow-2xl">
            <button
              onClick={() => setShowDemoModal(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full border border-white/15 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-purple-300">
                Studio Generator Playground
              </span>
            </div>
            <h3 className="font-serif text-2xl text-white mb-2">
              Generate with DREAMFRAME
            </h3>
            <p className="text-xs text-zinc-400 mb-6">
              Test the neural engine right here. Enter an imaginative prompt or
              use one of our curated styles.
            </p>

            <form onSubmit={handleSimulatedGenerate} className="space-y-4">
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-2">
                  Prompt Input:
                </label>
                <textarea
                  value={customPrompt}
                  onChange={(e) => setCustomPrompt(e.target.value)}
                  placeholder={activeSlide.promptText}
                  rows={3}
                  className="w-full rounded-xl bg-black/40 border border-white/15 p-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-purple-400 transition-colors font-mono"
                />
              </div>

              {/* Quick Preset Tags */}
              <div className="flex flex-wrap gap-2">
                {[
                  "Neon Cyberpunk Lake",
                  "Ethereal Astral Spires",
                  "8K Volumetric Fog",
                  "Cinematic Monolith",
                ].map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => setCustomPrompt(tag)}
                    className="px-2.5 py-1 rounded-md text-[11px] font-mono border border-white/10 bg-white/5 hover:bg-purple-900/30 hover:border-purple-500/40 text-zinc-300 hover:text-white transition-all"
                  >
                    +{tag}
                  </button>
                ))}
              </div>

              {/* Generate CTA Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isGenerating}
                  className="w-full py-3.5 rounded-full bg-gradient-to-r from-orange-500 via-rose-500 to-purple-600 text-white font-medium text-sm tracking-wide orange-purple-glow hover:opacity-95 transition-all flex items-center justify-center gap-2"
                >
                  {isGenerating ? (
                    <>
                      <Sparkles className="w-4 h-4 animate-spin text-white" />
                      <span>Synthesizing Latents...</span>
                    </>
                  ) : (
                    <>
                      <Wand2 className="w-4 h-4 text-white" />
                      <span>Generate 4K Artwork</span>
                    </>
                  )}
                </button>
              </div>

              {generatedSuccess && (
                <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-950/20 text-emerald-300 text-xs font-mono flex items-center justify-between">
                  <span>✓ 4K Masterplate synthesized in 340ms!</span>
                  <span className="text-[10px] text-zinc-400">FLUX.2 Ultra</span>
                </div>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
