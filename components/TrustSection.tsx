"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function TrustSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (!visualRef.current || !sectionRef.current) return;

      gsap.fromTo(
        visualRef.current,
        {
          scale: 1.05,
          opacity: 0.8,
        },
        {
          scale: 1,
          opacity: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            end: "bottom 30%",
            scrub: 1,
          },
        }
      );
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="narrative-anchor"
      className="relative w-full py-16 sm:py-24 md:py-28 px-4 sm:px-8 md:px-16 bg-[#0D0D0D] text-white border-t border-white/10 select-none overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Split Typographic Header */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-end mb-10 sm:mb-16 pb-6 sm:pb-8 border-b border-white/10">
          <div className="md:col-span-8">
            <span className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-[#F7B928] font-bold block mb-2 sm:mb-3">
              // 03.5 THE MARKET DIVIDE
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl md:text-7xl font-bold text-white tracking-tight leading-none">
              Stand out from the noise...
            </h2>
          </div>

          <div className="md:col-span-4">
            <p className="font-mono text-xs sm:text-sm text-white/60 uppercase tracking-wider leading-relaxed border-l-2 border-[#F7B928] pl-3 sm:pl-4">
              Traditional agency models: bloated retainers & non-converting templates.
              <span className="text-[#F7B928] block mt-1 font-bold">
                Our model: purpose-built commerce code.
              </span>
            </p>
          </div>
        </div>

        {/* Visual Asset */}
        <div
          ref={visualRef}
          className="relative w-full aspect-[4/3] sm:aspect-[16/10] md:aspect-[16/8] max-h-[500px] rounded-2xl sm:rounded-3xl bg-[#141414] border-2 border-white/10 shadow-2xl overflow-hidden flex items-center justify-center p-4 sm:p-8 md:p-12 will-change-transform"
        >
          {/* Background Ambient Radial Atmosphere */}
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:28px_28px] opacity-[0.04]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-transparent to-transparent pointer-events-none" />

          {/* Glowing Aura */}
          <div className="absolute w-48 sm:w-72 h-48 sm:h-72 rounded-full bg-[#F7B928]/20 blur-3xl pointer-events-none animate-pulse" />

          {/* Crowd Silhouette Graphic (SVG) */}
          <svg
            className="w-full h-full max-w-5xl"
            viewBox="0 0 1000 450"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g opacity="0.3" fill="#2A2A2A">
              <circle cx="80" cy="180" r="24" />
              <path d="M40 250 C40 220, 120 220, 120 250 Z" />
              <circle cx="160" cy="190" r="22" />
              <path d="M125 255 C125 228, 195 228, 195 255 Z" />
              <circle cx="240" cy="175" r="25" />
              <path d="M200 245 C200 215, 280 215, 280 245 Z" />
              <circle cx="320" cy="185" r="23" />
              <path d="M285 250 C285 222, 355 222, 355 250 Z" />
              <circle cx="680" cy="185" r="23" />
              <path d="M645 250 C645 222, 715 222, 715 250 Z" />
              <circle cx="760" cy="175" r="25" />
              <path d="M720 245 C720 215, 800 215, 800 245 Z" />
              <circle cx="840" cy="190" r="22" />
              <path d="M805 255 C805 228, 875 228, 875 255 Z" />
              <circle cx="920" cy="180" r="24" />
              <path d="M880 250 C880 220, 960 220, 960 250 Z" />
            </g>

            <g opacity="0.55" fill="#3D3D3D">
              <circle cx="120" cy="270" r="28" />
              <path d="M75 350 C75 315, 165 315, 165 350 Z" />
              <circle cx="220" cy="265" r="30" />
              <path d="M170 345 C170 310, 270 310, 270 345 Z" />
              <circle cx="340" cy="275" r="28" />
              <path d="M295 350 C295 318, 385 318, 385 350 Z" />
              <circle cx="660" cy="275" r="28" />
              <path d="M615 350 C615 318, 705 318, 705 350 Z" />
              <circle cx="780" cy="265" r="30" />
              <path d="M730 345 C730 310, 830 310, 830 345 Z" />
              <circle cx="880" cy="270" r="28" />
              <path d="M835 350 C835 315, 925 315, 925 350 Z" />
            </g>

            <g opacity="0.75" fill="#1F1F1F">
              <circle cx="270" cy="360" r="34" />
              <path d="M215 440 C215 395, 325 395, 325 440 Z" />
              <circle cx="390" cy="355" r="35" />
              <path d="M335 440 C335 390, 445 390, 445 440 Z" />
              <circle cx="610" cy="355" r="35" />
              <path d="M555 440 C555 390, 665 390, 665 440 Z" />
              <circle cx="730" cy="360" r="34" />
              <path d="M675 440 C675 395, 785 395, 785 440 Z" />
            </g>

            {/* Standout Figure */}
            <g id="standout-figure" className="transition-transform duration-300">
              <circle cx="500" cy="260" r="75" fill="#F7B928" fillOpacity="0.25" filter="blur(8px)" />
              <path
                d="M480 180 L490 205 L500 172 L510 205 L520 180 L520 215 L480 215 Z"
                fill="#F7B928"
                stroke="#0D0D0D"
                strokeWidth="2"
              />
              <circle cx="500" cy="240" r="38" fill="#F7B928" stroke="#0D0D0D" strokeWidth="3" />
              <path
                d="M435 365 C435 295, 565 295, 565 365 Z"
                fill="#F7B928"
                stroke="#0D0D0D"
                strokeWidth="3"
              />
              <circle cx="500" cy="330" r="12" fill="#0D0D0D" />
              <polygon
                points="500,322 503,328 509,329 505,333 506,339 500,336 494,339 495,333 491,329 497,328"
                fill="#F7B928"
              />
            </g>
          </svg>

          {/* Standout Distinction Tags */}
          <div className="absolute top-4 sm:top-6 left-4 sm:left-6 hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/50 font-mono text-[10px] uppercase">
            <span>98% OF STORES: GENERIC LIQUID THEMES</span>
          </div>

          <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-[#F7B928] text-black font-mono text-[10px] sm:text-xs font-black uppercase tracking-wider border-2 border-black shadow-2xl max-w-[90vw] truncate">
            <span>⚡ YOUR STORE: BESPOKE HIGH-VELOCITY ENGINE</span>
          </div>

          <div className="absolute top-4 sm:top-6 right-4 sm:right-6 hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/50 font-mono text-[10px] uppercase">
            <span>ZERO TEMPLATE BLOAT</span>
          </div>
        </div>
      </div>
    </section>
  );
}
