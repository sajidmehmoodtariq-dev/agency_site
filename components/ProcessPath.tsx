"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ProcessPath() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const pathBgRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const path = pathRef.current;
      const stage = stageRef.current;
      if (!path || !stage) return;

      const length = path.getTotalLength();

      // Initialize path to completely hidden
      gsap.set(path, {
        strokeDasharray: length,
        strokeDashoffset: length,
      });

      // Initialize all 4 milestone cards to hidden state
      gsap.set([".milestone-1", ".milestone-2", ".milestone-3", ".milestone-4"], {
        opacity: 0,
        y: 40,
        scale: 0.92,
      });

      // Synchronized Scroll-Driven Timeline:
      // Box 01 appears, then the yellow line draws out of it toward Box 02,
      // Box 02 appears when the line reaches it, then line draws to Box 03, etc.
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: stage,
          start: "top 55%", // Triggers only after the user scrolls well into the stage
          end: "bottom 70%",
          scrub: 1.2,
        },
      });

      tl
        // 1. Box 01 appears first
        .to(".milestone-1", {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.2,
          ease: "power2.out",
        })
        // 2. Yellow line begins drawing out from Box 01 toward Box 02
        .to(path, {
          strokeDashoffset: length * 0.67,
          ease: "none",
          duration: 1.0,
        })
        // 3. Box 02 appears as the line reaches it
        .to(
          ".milestone-2",
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.2,
            ease: "power2.out",
          },
          "-=0.15"
        )
        // 4. Yellow line draws from Box 02 toward Box 03
        .to(path, {
          strokeDashoffset: length * 0.33,
          ease: "none",
          duration: 1.0,
        })
        // 5. Box 03 appears as the line reaches it
        .to(
          ".milestone-3",
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.2,
            ease: "power2.out",
          },
          "-=0.15"
        )
        // 6. Yellow line draws from Box 03 toward Box 04
        .to(path, {
          strokeDashoffset: 0,
          ease: "none",
          duration: 1.0,
        })
        // 7. Box 04 appears as the line completes
        .to(
          ".milestone-4",
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.2,
            ease: "power2.out",
          },
          "-=0.15"
        );
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  const pathD =
    "M 80 80 C 400 120, 850 160, 880 250 C 900 350, 150 360, 120 450 C 90 540, 800 550, 880 620";

  return (
    <section
      ref={sectionRef}
      id="process"
      className="min-h-screen w-full relative bg-[#FAF8F5] text-[#111] px-4 sm:px-10 md:px-20 pt-28 sm:pt-36 md:pt-44 pb-16 flex flex-col justify-between overflow-hidden select-none"
    >
      {/* Background Decorative Subtle Grid Accent */}
      <div className="absolute inset-0 bg-[radial-gradient(#111_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.03] pointer-events-none" />

      {/* Header with Generous Top Clearance for Floating Navbar */}
      <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-end justify-between gap-6 z-20 pb-8 border-b border-black/10">
        <div className="max-w-2xl">
          <span className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-[#E8A317] font-bold block mb-2">
            // 03. ARCHITECTURAL SPRINT
          </span>
          <h2 className="font-extrabold uppercase text-3xl sm:text-5xl md:text-6xl tracking-tight leading-none text-[#111]">
            Four Steps, Then Steady Scale.
          </h2>
        </div>

        <div className="max-w-md pb-1">
          <p className="font-mono text-xs sm:text-sm text-[#444] uppercase tracking-wider leading-relaxed">
            Our four-phase engineering framework takes enterprise commerce systems from legacy bottlenecks to zero-bloat velocity.
          </p>
        </div>
      </div>

      {/* Winding Path Stage */}
      <div
        ref={stageRef}
        className="relative w-full max-w-7xl mx-auto flex-1 mt-12 md:mt-16 min-h-[1050px] sm:min-h-[920px] md:min-h-[820px] lg:min-h-[860px]"
      >
        {/* SVG Curved Trajectory Path Canvas */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none z-10"
          viewBox="0 0 1000 700"
          preserveAspectRatio="none"
          fill="none"
        >
          {/* Faint Background Guide Track */}
          <path
            ref={pathBgRef}
            d={pathD}
            stroke="#E8A317"
            strokeWidth="8"
            strokeOpacity="0.15"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />

          {/* Animated Bold Yellow/Amber Scrub Path */}
          <path
            ref={pathRef}
            d={pathD}
            stroke="#E8A317"
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            className="drop-shadow-[0_4px_12px_rgba(232,163,23,0.35)]"
          />
        </svg>

        {/* Milestone 01: Placed with ample lead-in clearance */}
        <div className="milestone-1 absolute top-[8%] md:top-[10%] left-[2%] md:left-[5%] z-20 max-w-[86vw] sm:max-w-xs md:max-w-md opacity-0 will-change-transform">
          <div className="flex items-start gap-3 sm:gap-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-[#111] text-[#E8A317] border-2 border-[#E8A317] flex items-center justify-center font-mono font-black text-xs sm:text-sm md:text-base shadow-xl flex-shrink-0">
              01
            </div>
            <div className="bg-white/95 backdrop-blur-md p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl border border-black/10 shadow-xl shadow-black/5 hover:border-[#E8A317] transition-all">
              <span className="font-mono text-[9px] sm:text-[10px] text-[#E8A317] uppercase tracking-wider font-bold block mb-1">
                DISCOVERY & ROADMAP
              </span>
              <h3 className="font-serif text-base sm:text-lg md:text-xl font-bold text-[#111] mb-1 sm:mb-2 leading-snug">
                Systems Audit & Framework Selection
              </h3>
              <p className="text-xs sm:text-sm text-[#555] font-light leading-relaxed">
                Evaluating Shopify Liquid vs Headless Next.js based on SKU count, checkout volume, and edge caching speed goals.
              </p>
            </div>
          </div>
        </div>

        {/* Milestone 02 */}
        <div className="milestone-2 absolute top-[30%] md:top-[34%] right-[2%] md:right-[5%] z-20 max-w-[86vw] sm:max-w-xs md:max-w-md opacity-0 will-change-transform">
          <div className="flex items-start gap-3 sm:gap-4 flex-row-reverse md:flex-row">
            <div className="bg-white/95 backdrop-blur-md p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl border border-black/10 shadow-xl shadow-black/5 hover:border-[#E8A317] transition-all text-right md:text-left">
              <span className="font-mono text-[9px] sm:text-[10px] text-[#E8A317] uppercase tracking-wider font-bold block mb-1">
                PROTOTYPING & UX
              </span>
              <h3 className="font-serif text-base sm:text-lg md:text-xl font-bold text-[#111] mb-1 sm:mb-2 leading-snug">
                High-Converting UX & Wireframing
              </h3>
              <p className="text-xs sm:text-sm text-[#555] font-light leading-relaxed">
                Figma interactive components, conversion checkout flows, and frictionless cart mechanics built for rapid shopper intent.
              </p>
            </div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-[#111] text-[#E8A317] border-2 border-[#E8A317] flex items-center justify-center font-mono font-black text-xs sm:text-sm md:text-base shadow-xl flex-shrink-0">
              02
            </div>
          </div>
        </div>

        {/* Milestone 03 */}
        <div className="milestone-3 absolute top-[54%] md:top-[58%] left-[2%] md:left-[5%] z-20 max-w-[86vw] sm:max-w-xs md:max-w-md opacity-0 will-change-transform">
          <div className="flex items-start gap-3 sm:gap-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-[#111] text-[#E8A317] border-2 border-[#E8A317] flex items-center justify-center font-mono font-black text-xs sm:text-sm md:text-base shadow-xl flex-shrink-0">
              03
            </div>
            <div className="bg-white/95 backdrop-blur-md p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl border border-black/10 shadow-xl shadow-black/5 hover:border-[#E8A317] transition-all">
              <span className="font-mono text-[9px] sm:text-[10px] text-[#E8A317] uppercase tracking-wider font-bold block mb-1">
                FULL-STACK DEV
              </span>
              <h3 className="font-serif text-base sm:text-lg md:text-xl font-bold text-[#111] mb-1 sm:mb-2 leading-snug">
                Precision Engineering
              </h3>
              <p className="text-xs sm:text-sm text-[#555] font-light leading-relaxed">
                Custom Shopify theme dev, bespoke API services, asset optimization, and modular UI engineering with zero template bloat.
              </p>
            </div>
          </div>
        </div>

        {/* Milestone 04 */}
        <div className="milestone-4 absolute top-[78%] md:top-[82%] right-[2%] md:right-[5%] z-20 max-w-[86vw] sm:max-w-xs md:max-w-md opacity-0 will-change-transform">
          <div className="flex items-start gap-3 sm:gap-4 flex-row-reverse md:flex-row">
            <div className="bg-white/95 backdrop-blur-md p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl border border-black/10 shadow-xl shadow-black/5 hover:border-[#E8A317] transition-all text-right md:text-left">
              <span className="font-mono text-[9px] sm:text-[10px] text-[#E8A317] uppercase tracking-wider font-bold block mb-1">
                RELEASE & SCALE
              </span>
              <h3 className="font-serif text-base sm:text-lg md:text-xl font-bold text-[#111] mb-1 sm:mb-2 leading-snug">
                Validation & Launch
              </h3>
              <p className="text-xs sm:text-sm text-[#555] font-light leading-relaxed">
                Core Web Vitals tuning, Lighthouse 95+ score check, CI/CD automated deployment, and continuous latency monitoring.
              </p>
            </div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-[#111] text-[#E8A317] border-2 border-[#E8A317] flex items-center justify-center font-mono font-black text-xs sm:text-sm md:text-base shadow-xl flex-shrink-0">
              04
            </div>
          </div>
        </div>
      </div>

      {/* Footer Indicator */}
      <div className="w-full max-w-7xl mx-auto flex flex-col xs:flex-row items-center justify-between gap-2 pt-6 border-t border-black/10 font-mono text-[10px] sm:text-xs text-[#777] z-20 text-center xs:text-left">
        <span>CURVED TRAJECTORY TRAVERSED // 4 MILESTONES</span>
        <span className="text-[#E8A317] font-bold">100% QUALITY GATE CHECKED</span>
      </div>
    </section>
  );
}
