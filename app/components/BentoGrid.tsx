"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Sparkles,
  Sliders,
  Cpu,
  Layers,
  Code2,
  Copy,
  Check,
  Zap,
  ArrowUpRight,
  ShieldCheck,
  Activity,
  Maximize2,
  Terminal,
} from "lucide-react";

const PREVIEW_THEMES = [
  {
    name: "Cybernetic Portal",
    img: "/hero-bg.jpg",
    prompt: "Surreal floating violet portal ring above misty mirror lake, 8K",
    res: "7680 × 4320",
    engine: "FLUX.2 Ultra",
  },
  {
    name: "Astral Sanctuary",
    img: "/frames/frame-001.png",
    prompt: "Floating winter cedar cabin under crescent moon papercraft portal",
    res: "4096 × 2304",
    engine: "DreamFrame Core",
  },
  {
    name: "Golden Interior",
    img: "/frames/frame-025.png",
    prompt: "Cozy cedar cabin interior flooded with warm golden atmospheric embers",
    res: "4096 × 2304",
    engine: "Latent Pro 4.5",
  },
];

export default function BentoGrid() {
  const [activeThemeIdx, setActiveThemeIdx] = useState(0);
  const [copiedCode, setCopiedCode] = useState(false);
  const [sliderHaze, setSliderHaze] = useState(88);
  const [sliderLux, setSliderLux] = useState(92);
  const [sliderChroma, setSliderChroma] = useState(74);
  const [activeLang, setActiveLang] = useState<"python" | "typescript" | "curl">("python");

  const currentTheme = PREVIEW_THEMES[activeThemeIdx];

  const codeSnippets = {
    python: `import dreamframe as df

client = df.Client(api_key="df_live_sec_9934")
artwork = client.synthesize(
    prompt="${currentTheme.prompt}",
    model="${currentTheme.engine.toLowerCase().replace(/ /g, '_')}",
    resolution="16k_cinematic",
    volumetric_depth=0.94
)
artwork.save("masterplate_01.exr")`,
    typescript: `import { DreamFrame } from "@dreamframe/sdk";

const df = new DreamFrame({ apiKey: process.env.DREAMFRAME_KEY });
const render = await df.images.generate({
  prompt: "${currentTheme.prompt}",
  model: "${currentTheme.engine.toLowerCase().replace(/ /g, '_')}",
  aspectRatio: "16:9",
  steps: 50
});
console.log(render.url);`,
    curl: `curl https://api.dreamframe.ai/v1/synthesize \\
  -H "Authorization: Bearer $DREAMFRAME_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "prompt": "${currentTheme.prompt}",
    "resolution": "8k",
    "sampler": "euler_ancestral"
  }'`,
  };

  const handleCopyCode = () => {
    navigator.clipboard?.writeText(codeSnippets[activeLang]);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <section className="relative w-full py-28 sm:py-36 bg-[#050508] overflow-hidden text-white">
      {/* Cosmic background with soft purple, pink & lavender glowing gradients */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-pink-500/10 rounded-full blur-[150px]" />
        <div className="absolute top-2/3 left-10 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[130px]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        {/* SECTION HEADER */}
        <div className="flex flex-col items-start max-w-3xl mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1 rounded-full border border-purple-500/30 bg-purple-950/30 backdrop-blur-md mb-4 shadow-[0_0_20px_rgba(168,85,247,0.15)]">
            <span className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-ping" />
            <span className="text-[11px] font-mono uppercase tracking-[0.22em] text-purple-200">
              CORE ARCHITECTURE & CAPABILITIES
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.08] mb-5">
            Engineered for{" "}
            <span className="italic font-medium bg-clip-text text-transparent bg-gradient-to-r from-violet-300 via-pink-300 to-orange-400 text-glow-purple">
              Infinite Creative Fidelity
            </span>
          </h2>

          <p className="text-zinc-400 text-base sm:text-lg font-light leading-relaxed max-w-2xl">
            A generational leap in diffusion intelligence. Explore the unified
            architecture powering cinema-grade resolution, sub-millisecond latents,
            and deterministic temporal control.
          </p>
        </div>

        {/* 5-CARD ASYMMETRIC BENTO GRID */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-7 items-stretch">
          {/* CARD 1: LARGE HERO SHOWCASE CARD (Cols 1 to 8, tall & prominent) */}
          <div className="md:col-span-12 lg:col-span-8 group relative rounded-3xl glass-panel border border-white/10 hover:border-purple-500/40 p-6 sm:p-9 transition-all duration-500 flex flex-col justify-between overflow-hidden purple-lavender-glow">
            {/* Ambient card corner glow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/15 rounded-full blur-[90px] pointer-events-none" />

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-mono uppercase tracking-widest text-purple-300 flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-pink-400" />
                  Neural Synthesis Flagship
                </span>
                <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 text-zinc-300">
                  {currentTheme.res} • 16-Bit RAW
                </span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl text-white mb-2 tracking-tight">
                FLUX.2 Ultra Masterplate Synthesis
              </h3>
              <p className="text-zinc-400 text-sm max-w-xl mb-6 leading-relaxed">
                Sub-pixel surface microstructure with realistic photon dispersion.
                Synthesizes complex atmospheric density, volumetrics, and organic materials.
              </p>

              {/* Theme selector pills */}
              <div className="flex flex-wrap items-center gap-2.5 mb-5">
                {PREVIEW_THEMES.map((theme, i) => (
                  <button
                    key={theme.name}
                    onClick={() => setActiveThemeIdx(i)}
                    className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all duration-200 ${
                      activeThemeIdx === i
                        ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md shadow-purple-500/25 border border-purple-300/40"
                        : "bg-white/[0.04] text-zinc-400 hover:text-white border border-white/10 hover:bg-white/[0.08]"
                    }`}
                  >
                    {theme.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Visual Canvas Display Box */}
            <div className="relative z-10 w-full h-64 sm:h-72 rounded-2xl overflow-hidden border border-white/10 group-hover:border-purple-400/40 transition-colors bg-[#08070d]">
              <Image
                src={currentTheme.img}
                alt={currentTheme.name}
                fill
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050508]/90 via-transparent to-transparent" />
              
              {/* Bottom metadata strip inside visual */}
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs font-mono px-3.5 py-2 rounded-xl bg-black/60 backdrop-blur-md border border-white/10">
                <span className="text-zinc-300 truncate max-w-[70%] text-[11px]">
                  &ldquo;{currentTheme.prompt}&rdquo;
                </span>
                <span className="text-purple-300 text-[10px] uppercase font-semibold shrink-0">
                  {currentTheme.engine}
                </span>
              </div>
            </div>
          </div>

          {/* CARD 2: TALL VERTICAL FEATURE CARD (Cols 9 to 12, spans 2 rows on large screens) */}
          <div className="md:col-span-12 lg:col-span-4 lg:row-span-2 group relative rounded-3xl glass-panel border border-white/10 hover:border-pink-500/40 p-6 sm:p-8 transition-all duration-500 flex flex-col justify-between overflow-hidden">
            <div className="absolute top-1/3 -right-20 w-64 h-64 bg-pink-500/10 rounded-full blur-[80px] pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-mono uppercase tracking-widest text-pink-300 flex items-center gap-2">
                  <Sliders className="w-3.5 h-3.5 text-pink-400" />
                  Realtime Latents
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>

              <h3 className="font-serif text-2xl text-white mb-2">
                Dynamic Parameter Tuner
              </h3>
              <p className="text-zinc-400 text-sm mb-7 leading-relaxed">
                Deterministic attribute manipulation. Adjust lighting angles,
                atmospheric haze, and volumetric particles in real-time.
              </p>

              {/* Interactive Tuner Sliders */}
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-xs font-mono mb-2">
                    <span className="text-zinc-300">Atmospheric Haze</span>
                    <span className="text-purple-300 font-bold">{sliderHaze}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={sliderHaze}
                    onChange={(e) => setSliderHaze(Number(e.target.value))}
                    className="w-full accent-purple-500 cursor-pointer h-1.5 bg-white/10 rounded-lg"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono mb-2">
                    <span className="text-zinc-300">Volumetric Lux</span>
                    <span className="text-pink-300 font-bold">{sliderLux}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={sliderLux}
                    onChange={(e) => setSliderLux(Number(e.target.value))}
                    className="w-full accent-pink-500 cursor-pointer h-1.5 bg-white/10 rounded-lg"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono mb-2">
                    <span className="text-zinc-300">Chroma Depth</span>
                    <span className="text-orange-300 font-bold">{sliderChroma}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={sliderChroma}
                    onChange={(e) => setSliderChroma(Number(e.target.value))}
                    className="w-full accent-orange-500 cursor-pointer h-1.5 bg-white/10 rounded-lg"
                  />
                </div>
              </div>

              {/* Status Readout Box */}
              <div className="mt-8 p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2 font-mono text-[11px]">
                <div className="flex justify-between text-zinc-400">
                  <span>Sampler Mode:</span>
                  <span className="text-zinc-200">DPMSolver++ 2M</span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>Latent Dimensions:</span>
                  <span className="text-purple-300">4096-Ch Channel</span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>Seed Integrity:</span>
                  <span className="text-emerald-400">Deterministic Locked</span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-white/10 flex items-center justify-between text-xs text-zinc-400">
              <span>Dynamic Engine v4.5</span>
              <span className="text-purple-300 flex items-center gap-1 font-mono">
                Active State <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>

          {/* CARD 3: MEDIUM FEATURE CARD (Cols 1 to 4 on lg) */}
          <div className="md:col-span-6 lg:col-span-4 group relative rounded-3xl glass-panel border border-white/10 hover:border-purple-500/40 p-6 sm:p-8 transition-all duration-500 flex flex-col justify-between overflow-hidden">
            <div>
              <div className="w-10 h-10 rounded-xl bg-purple-950/40 border border-purple-500/30 flex items-center justify-center text-purple-300 mb-5 group-hover:scale-105 transition-transform">
                <Zap className="w-5 h-5 text-orange-400" />
              </div>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="font-mono text-4xl sm:text-5xl font-black text-white tracking-tight">
                  380
                </span>
                <span className="text-sm font-mono text-purple-300 uppercase tracking-wider">
                  ms / 4K
                </span>
              </div>
              <h3 className="font-serif text-xl text-white mb-2">
                Sub-Second Latency
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                Distributed tensor pipeline on clusters of H100 GPUs delivers
                near-instantaneous generation with zero waiting queues.
              </p>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-zinc-400">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                99.99% Uptime
              </span>
              <span className="text-purple-300">0.02ms Jitter</span>
            </div>
          </div>

          {/* CARD 4: MEDIUM FEATURE CARD (Cols 5 to 8 on lg) */}
          <div className="md:col-span-6 lg:col-span-4 group relative rounded-3xl glass-panel border border-white/10 hover:border-pink-500/40 p-6 sm:p-8 transition-all duration-500 flex flex-col justify-between overflow-hidden">
            <div>
              <div className="w-10 h-10 rounded-xl bg-pink-950/40 border border-pink-500/30 flex items-center justify-center text-pink-300 mb-5 group-hover:scale-105 transition-transform">
                <Layers className="w-5 h-5 text-pink-400" />
              </div>
              <span className="text-xs font-mono uppercase tracking-widest text-pink-300 mb-2 block">
                COHERENCE MATRIX
              </span>
              <h3 className="font-serif text-xl text-white mb-2">
                Multi-Pass Temporal Alignment
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed mb-5">
                Lock facial geometry, atmospheric lighting, and key objects
                across sequences for production-grade cinematic storytelling.
              </p>
            </div>

            {/* Layer Stack Badges */}
            <div className="space-y-2 font-mono text-xs">
              <div className="px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/5 flex items-center justify-between text-zinc-300">
                <span>01 Pose & Bone Mesh</span>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
              </div>
              <div className="px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/5 flex items-center justify-between text-zinc-300">
                <span>02 Volumetric Surface</span>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
              </div>
            </div>
          </div>

          {/* CARD 5: FULL-WIDTH PRODUCTION API CARD (Cols 1 to 12) */}
          <div className="md:col-span-12 group relative rounded-3xl glass-panel border border-white/10 hover:border-purple-500/40 p-6 sm:p-9 transition-all duration-500 overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Column: API copy & details */}
              <div className="lg:col-span-5 flex flex-col justify-between">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-950/30 text-[10px] font-mono uppercase tracking-wider text-purple-200 mb-3">
                    <Terminal className="w-3.5 h-3.5 text-purple-400" />
                    DEVELOPER FIRST
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl text-white mb-3">
                    Production-Grade Python & REST API
                  </h3>
                  <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                    Connect DreamFrame to Blender, Unreal Engine 5, Unity, or your web
                    backend. Stream latent buffers directly with minimal overhead.
                  </p>
                </div>

                {/* API Specs */}
                <div className="grid grid-cols-2 gap-4 font-mono text-xs">
                  <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10">
                    <span className="text-zinc-500 block text-[10px] uppercase">Throughput</span>
                    <span className="text-white font-bold text-sm">12,000 req/sec</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10">
                    <span className="text-zinc-500 block text-[10px] uppercase">SDK Support</span>
                    <span className="text-purple-300 font-bold text-sm">Python / Node / Go</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Code Editor Terminal */}
              <div className="lg:col-span-7 rounded-2xl bg-[#090810] border border-white/10 overflow-hidden shadow-2xl">
                {/* Editor Header Bar */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-white/[0.02]">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                    <span className="ml-2 text-[11px] font-mono text-zinc-400">
                      quickstart.{activeLang === "python" ? "py" : activeLang === "typescript" ? "ts" : "sh"}
                    </span>
                  </div>

                  {/* Language switchers & copy button */}
                  <div className="flex items-center gap-2">
                    {(["python", "typescript", "curl"] as const).map((lang) => (
                      <button
                        key={lang}
                        onClick={() => setActiveLang(lang)}
                        className={`px-2.5 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider transition-colors ${
                          activeLang === lang
                            ? "bg-purple-500/30 text-purple-200 border border-purple-400/40"
                            : "text-zinc-500 hover:text-zinc-300"
                        }`}
                      >
                        {lang}
                      </button>
                    ))}
                    <button
                      onClick={handleCopyCode}
                      className="ml-2 p-1.5 rounded-md hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
                      title="Copy Code"
                    >
                      {copiedCode ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Editor Body */}
                <div className="p-4 sm:p-5 font-mono text-xs overflow-x-auto leading-relaxed text-zinc-300">
                  <pre className="selection:bg-purple-500/40">
                    <code>{codeSnippets[activeLang]}</code>
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
