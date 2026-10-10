"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ProcessPath() {
  const sectionRef = useRef<HTMLElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const pathBgRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (!pathRef.current || !sectionRef.current) return;

      const path = pathRef.current;
      const pathLength = path.getTotalLength();

      // Configure SVG stroke dash properties for line drawing
      gsap.set(path, {
        strokeDasharray: pathLength,
        strokeDashoffset: pathLength,
      });

      // Pinned scrub timeline: draws path and punches in milestone cards at each coordinate
      const processTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=140%",
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // 1. Draw SVG curved trajectory down the screen
      processTl.to(path, {
        strokeDashoffset: 0,
        ease: "none",
        duration: 4,
      });

      // 2. Punchy scale-in and opacity reveals as line touches each milestone coordinate
      // Milestone 01
      processTl.fromTo(
        ".milestone-1",
        { scale: 0.7, opacity: 0 },
        { scale: 1, opacity: 1, ease: "power2.out", duration: 0.4 },
        0.1
      );

      // Milestone 02
      processTl.fromTo(
        ".milestone-2",
        { scale: 0.7, opacity: 0 },
        { scale: 1, opacity: 1, ease: "power2.out", duration: 0.4 },
        1.1
      );

      // Milestone 03
      processTl.fromTo(
        ".milestone-3",
        { scale: 0.7, opacity: 0 },
        { scale: 1, opacity: 1, ease: "power2.out", duration: 0.4 },
        2.1
      );

      // Milestone 04
      processTl.fromTo(
        ".milestone-4",
        { scale: 0.7, opacity: 0 },
        { scale: 1, opacity: 1, ease: "power2.out", duration: 0.4 },
        3.1
      );

      ScrollTrigger.refresh();
    }, sectionRef);

    return () => {
      ctx.revert(); // Complete cleanup prevents memory leaks on unmount
    };
  }, []);

  // Upward-shifted curved trajectory coordinates starting directly below header & navbar
  const pathD =
    "M 140 25 C 460 25, 780 70, 820 190 C 860 320, 180 310, 160 440 C 140 570, 480 620, 820 650";

  return (
    <section
      ref={sectionRef}
      id="process"
      className="min-h-screen w-full relative bg-[#FAF8F5] text-[#111] px-6 md:px-20 pt-16 md:pt-20 pb-10 flex flex-col justify-between overflow-hidden select-none"
    >
      {/* Background Decorative Grid Accent */}
      <div className="absolute inset-0 bg-[radial-gradient(#111_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.03] pointer-events-none" />

      {/* Header: Compact Typography Lockup positioned right below the floating navbar */}
      <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-end justify-between gap-6 z-20 pb-4 border-b border-black/10">
        <div className="max-w-2xl">
          <span className="font-mono text-xs uppercase tracking-widest text-[#E8A317] font-bold block mb-2">
            // 03. ARCHITECTURAL SPRINT
          </span>
          <h2 className="font-extrabold uppercase text-4xl sm:text-5xl md:text-6xl tracking-tight leading-none text-[#111]">
            Four Steps, Then Steady Scale.
          </h2>
        </div>

        <div className="max-w-md pb-1">
          <p className="font-mono text-xs sm:text-sm text-[#444] uppercase tracking-wider leading-relaxed">
            Our four-phase engineering framework takes enterprise commerce systems from legacy bottlenecks to zero-bloat velocity. Engineered for predictability, tested under real customer load.
          </p>
        </div>
      </div>

      {/* The Winding Path Canvas / SVG + 4 Milestones Stage */}
      <div className="relative w-full max-w-7xl mx-auto flex-1 mt-2 min-h-[580px] md:min-h-[640px]">
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

        {/* Milestone 01: Top-Left (Starts immediately under the header line) */}
        <div className="milestone-1 absolute top-[1%] left-[2%] md:left-[5%] z-20 max-w-sm md:max-w-md">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#111] text-[#E8A317] border-2 border-[#E8A317] flex items-center justify-center font-mono font-black text-sm md:text-base shadow-xl flex-shrink-0">
              01
            </div>
            <div className="bg-white/95 backdrop-blur-md p-5 md:p-6 rounded-2xl border border-black/10 shadow-xl shadow-black/5 hover:border-[#E8A317] transition-all">
              <span className="font-mono text-[10px] text-[#E8A317] uppercase tracking-wider font-bold block mb-1">
                DISCOVERY & ROADMAP
              </span>
              <h3 className="font-serif text-lg md:text-xl font-bold text-[#111] mb-2 leading-snug">
                Systems Audit & Framework Selection
              </h3>
              <p className="text-xs sm:text-sm text-[#555] font-light leading-relaxed">
                Evaluating Shopify Liquid vs Headless Next.js based on SKU count, checkout volume, and edge caching speed goals.
              </p>
            </div>
          </div>
        </div>

        {/* Milestone 02: Mid-Right */}
        <div className="milestone-2 absolute top-[24%] right-[2%] md:right-[5%] z-20 max-w-sm md:max-w-md">
          <div className="flex items-start gap-4 flex-row-reverse md:flex-row">
            <div className="bg-white/95 backdrop-blur-md p-5 md:p-6 rounded-2xl border border-black/10 shadow-xl shadow-black/5 hover:border-[#E8A317] transition-all text-right md:text-left">
              <span className="font-mono text-[10px] text-[#E8A317] uppercase tracking-wider font-bold block mb-1">
                PROTOTYPING & UX
              </span>
              <h3 className="font-serif text-lg md:text-xl font-bold text-[#111] mb-2 leading-snug">
                High-Converting UX & Wireframing
              </h3>
              <p className="text-xs sm:text-sm text-[#555] font-light leading-relaxed">
                Figma interactive components, conversion checkout flows, and frictionless cart mechanics built for rapid shopper intent.
              </p>
            </div>
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#111] text-[#E8A317] border-2 border-[#E8A317] flex items-center justify-center font-mono font-black text-sm md:text-base shadow-xl flex-shrink-0">
              02
            </div>
          </div>
        </div>

        {/* Milestone 03: Mid-Left */}
        <div className="milestone-3 absolute top-[48%] left-[2%] md:left-[5%] z-20 max-w-sm md:max-w-md">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#111] text-[#E8A317] border-2 border-[#E8A317] flex items-center justify-center font-mono font-black text-sm md:text-base shadow-xl flex-shrink-0">
              03
            </div>
            <div className="bg-white/95 backdrop-blur-md p-5 md:p-6 rounded-2xl border border-black/10 shadow-xl shadow-black/5 hover:border-[#E8A317] transition-all">
              <span className="font-mono text-[10px] text-[#E8A317] uppercase tracking-wider font-bold block mb-1">
                FULL-STACK DEV
              </span>
              <h3 className="font-serif text-lg md:text-xl font-bold text-[#111] mb-2 leading-snug">
                Precision Engineering
              </h3>
              <p className="text-xs sm:text-sm text-[#555] font-light leading-relaxed">
                Custom Shopify theme dev, bespoke API services, asset optimization, and modular UI engineering with zero template bloat.
              </p>
            </div>
          </div>
        </div>

        {/* Milestone 04: Bottom-Right */}
        <div className="milestone-4 absolute top-[72%] right-[2%] md:right-[5%] z-20 max-w-sm md:max-w-md">
          <div className="flex items-start gap-4 flex-row-reverse md:flex-row">
            <div className="bg-white/95 backdrop-blur-md p-5 md:p-6 rounded-2xl border border-black/10 shadow-xl shadow-black/5 hover:border-[#E8A317] transition-all text-right md:text-left">
              <span className="font-mono text-[10px] text-[#E8A317] uppercase tracking-wider font-bold block mb-1">
                RELEASE & SCALE
              </span>
              <h3 className="font-serif text-lg md:text-xl font-bold text-[#111] mb-2 leading-snug">
                Validation & Launch
              </h3>
              <p className="text-xs sm:text-sm text-[#555] font-light leading-relaxed">
                Core Web Vitals tuning, Lighthouse 95+ score check, CI/CD automated deployment, and continuous latency monitoring.
              </p>
            </div>
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#111] text-[#E8A317] border-2 border-[#E8A317] flex items-center justify-center font-mono font-black text-sm md:text-base shadow-xl flex-shrink-0">
              04
            </div>
          </div>
        </div>
      </div>

      {/* Footer Indicator */}
      <div className="w-full max-w-7xl mx-auto flex items-center justify-between pt-4 border-t border-black/10 font-mono text-xs text-[#777] z-20">
        <span>CURVED TRAJECTORY TRAVERSED // 4 MILESTONES</span>
        <span className="text-[#E8A317] font-bold">100% QUALITY GATE CHECKED</span>
      </div>
    </section>
  );
}
