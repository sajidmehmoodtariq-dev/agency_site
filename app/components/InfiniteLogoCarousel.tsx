"use client";

import React from "react";
import {
  Sparkles,
  Layers,
  Cpu,
  Boxes,
  Film,
  Camera,
  Compass,
  Zap,
  Globe,
  Radio,
  Eye,
  Hexagon,
} from "lucide-react";

interface BrandLogo {
  name: string;
  tag: string;
  icon: React.ComponentType<{ className?: string }>;
}

const ROW_1_LOGOS: BrandLogo[] = [
  { name: "A24 FILMS", tag: "STUDIO PARTNER", icon: Film },
  { name: "UNREAL ENGINE 5", tag: "REALTIME ENGINE", icon: Boxes },
  { name: "WĒTĀ FX", tag: "VFX LABS", icon: Eye },
  { name: "MIDJOURNEY CORE", tag: "LATENT RESEARCH", icon: Sparkles },
  { name: "SONY PICTURES", tag: "CINEMATIC ENTERPRISE", icon: Camera },
  { name: "PRADA DIGITAL", tag: "COUTURE CO-CREATION", icon: Hexagon },
  { name: "NVIDIA OMNIVERSE", tag: "RTX TENSOR PIPELINE", icon: Cpu },
  { name: "FRAMESTORE AI", tag: "VOLUMETRIC SYNTHESIS", icon: Layers },
];

const ROW_2_LOGOS: BrandLogo[] = [
  { name: "CYBERPUNK VISIONS", tag: "WORLD BUILDING", icon: Radio },
  { name: "PIXAR ADVANCED", tag: "LIGHTING COHERENCE", icon: Sparkles },
  { name: "ADOBE NEURAL", tag: "CREATIVE CLOUD", icon: Layers },
  { name: "VOGUE METAVERSE", tag: "EDITORIAL VISUALS", icon: Compass },
  { name: "TESLA AI LABS", tag: "SPATIAL DIFFUSION", icon: Zap },
  { name: "METACRAFT STUDIOS", tag: "VIRTUAL PRODUCTION", icon: Globe },
  { name: "ILM IMMERSIVE", tag: "PHOTOREAL ENVIRONMENTS", icon: Film },
  { name: "ELECTRONIC ARTS", tag: "ASSET GENERATION", icon: Boxes },
];

export default function InfiniteLogoCarousel() {
  return (
    <section className="relative w-full py-20 overflow-hidden bg-[#050508] border-t border-white/5">
      {/* Cosmic ambient glow background */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-pink-500/10 rounded-full blur-[130px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-48 bg-violet-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 mb-10 text-center">
        {/* Subtle pill tag */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-purple-500/25 bg-purple-950/20 backdrop-blur-md mb-3.5">
          <Sparkles className="w-3.5 h-3.5 text-purple-300 animate-pulse" />
          <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.25em] text-purple-200">
            INDUSTRY ADOPTION
          </span>
        </div>
        <h3 className="font-serif text-xl sm:text-2xl text-zinc-300 font-light tracking-wide">
          Trusted by pioneering studios & visual effects leaders
        </h3>
      </div>

      {/* MARQUEE WRAPPER WITH EDGE MASKING */}
      <div className="marquee-container relative w-full flex flex-col gap-5 sm:gap-6 marquee-mask py-3">
        {/* ROW 1: RIGHT → LEFT */}
        <div className="flex w-max animate-marquee-left items-center gap-6 sm:gap-8">
          {[...ROW_1_LOGOS, ...ROW_1_LOGOS, ...ROW_1_LOGOS].map((brand, idx) => {
            const Icon = brand.icon;
            return (
              <div
                key={`row1-${brand.name}-${idx}`}
                className="group relative flex items-center gap-3.5 px-6 py-3.5 rounded-2xl glass-panel border border-white/[0.07] hover:border-purple-500/40 hover:bg-white/[0.06] transition-all duration-300 select-none cursor-pointer"
              >
                <div className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/10 flex items-center justify-center text-zinc-400 group-hover:text-purple-300 group-hover:scale-105 group-hover:border-purple-500/30 transition-all">
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="font-mono text-xs sm:text-sm font-semibold tracking-wider text-zinc-200 group-hover:text-white transition-colors whitespace-nowrap">
                    {brand.name}
                  </span>
                  <span className="text-[9px] font-mono tracking-widest text-zinc-500 group-hover:text-purple-300/80 uppercase transition-colors whitespace-nowrap">
                    {brand.tag}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* ROW 2: LEFT → RIGHT */}
        <div className="flex w-max animate-marquee-right items-center gap-6 sm:gap-8">
          {[...ROW_2_LOGOS, ...ROW_2_LOGOS, ...ROW_2_LOGOS].map((brand, idx) => {
            const Icon = brand.icon;
            return (
              <div
                key={`row2-${brand.name}-${idx}`}
                className="group relative flex items-center gap-3.5 px-6 py-3.5 rounded-2xl glass-panel border border-white/[0.07] hover:border-pink-500/40 hover:bg-white/[0.06] transition-all duration-300 select-none cursor-pointer"
              >
                <div className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/10 flex items-center justify-center text-zinc-400 group-hover:text-pink-300 group-hover:scale-105 group-hover:border-pink-500/30 transition-all">
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="font-mono text-xs sm:text-sm font-semibold tracking-wider text-zinc-200 group-hover:text-white transition-colors whitespace-nowrap">
                    {brand.name}
                  </span>
                  <span className="text-[9px] font-mono tracking-widest text-zinc-500 group-hover:text-pink-300/80 uppercase transition-colors whitespace-nowrap">
                    {brand.tag}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
