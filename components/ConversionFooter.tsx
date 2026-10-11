"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { useSmoothScroll } from "@/components/SmoothScroll";

export default function ConversionFooter() {
  const [activeScope, setActiveScope] = useState<string>("shopify");
  const [timeStr, setTimeStr] = useState<string>("");
  const magneticBtnRef = useRef<HTMLButtonElement>(null);
  const { scrollTo } = useSmoothScroll();

  // 1. Live Timezone Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
          timeZoneName: "short",
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // 2. Magnetic Physics using GSAP quickTo
  useEffect(() => {
    const btn = magneticBtnRef.current;
    if (!btn) return;

    if (typeof window !== "undefined" && window.matchMedia && window.matchMedia("(hover: none)").matches) {
      return;
    }

    const xTo = gsap.quickTo(btn, "x", { duration: 0.45, ease: "power3.out" });
    const yTo = gsap.quickTo(btn, "y", { duration: 0.45, ease: "power3.out" });

    const handleMouseMove = (e: MouseEvent) => {
      const rect = btn.getBoundingClientRect();
      const btnCenterX = rect.left + rect.width / 2;
      const btnCenterY = rect.top + rect.height / 2;
      const distanceX = e.clientX - btnCenterX;
      const distanceY = e.clientY - btnCenterY;
      const distance = Math.hypot(distanceX, distanceY);

      const triggerRadius = rect.width / 2 + 70;
      if (distance < triggerRadius) {
        xTo(distanceX * 0.38);
        yTo(distanceY * 0.38);
      } else {
        xTo(0);
        yTo(0);
      }
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    window.addEventListener("mousemove", handleMouseMove);
    btn.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      btn.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const tickerText =
    "/// READY TO SCALE /// TECHNICAL AUDIT /// ZERO TEMPLATE JANK /// BESPOKE COMMERCE /// ".repeat(
      6
    );

  const scopeOptions = [
    { id: "shopify", label: "Shopify Plus Rebuild" },
    { id: "headless", label: "Headless / Bespoke App" },
    { id: "audit", label: "Speed & Vitals Audit" },
  ];

  return (
    <footer
      id="audit"
      className="w-full bg-[#0A0A0A] text-white pt-20 sm:pt-28 pb-10 sm:pb-12 px-4 sm:px-8 md:px-16 relative overflow-hidden flex flex-col items-center justify-between min-h-[85vh] select-none border-t border-white/10"
    >
      {/* 1. Overlapping Diagonal Hazard Tape Banners */}
      <div className="absolute top-0 left-0 right-0 w-full overflow-hidden pointer-events-none py-4 sm:py-6 z-20">
        <div className="relative w-[130vw] -ml-[15vw] bg-[#F7B928] text-black font-black uppercase text-[10px] sm:text-xs md:text-sm tracking-widest py-2.5 sm:py-3 border-y-2 border-black -rotate-3 shadow-2xl overflow-hidden flex z-10">
          <div className="animate-marquee-reverse whitespace-nowrap flex">
            <span className="inline-block px-4">{tickerText}</span>
            <span className="inline-block px-4" aria-hidden="true">
              {tickerText}
            </span>
          </div>
        </div>

        <div className="relative w-[130vw] -ml-[15vw] bg-[#F7B928] text-black font-black uppercase text-[10px] sm:text-xs md:text-sm tracking-widest py-2.5 sm:py-3 border-y-2 border-black rotate-3 shadow-2xl overflow-hidden flex -mt-6 sm:-mt-8 z-20">
          <div className="animate-marquee whitespace-nowrap flex">
            <span className="inline-block px-4">{tickerText}</span>
            <span className="inline-block px-4" aria-hidden="true">
              {tickerText}
            </span>
          </div>
        </div>
      </div>

      {/* Main Conversion Stage */}
      <div className="relative z-10 text-center max-w-5xl mx-auto my-auto pt-16 sm:pt-20 pb-8 flex flex-col items-center">
        <span className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-[#F7B928] font-bold mb-3 sm:mb-4 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-[#F7B928]/10 border border-[#F7B928]/30">
          LIMITED CAPACITY // DIRECT ENGAGEMENT
        </span>

        <h2 className="font-extrabold uppercase tracking-tight text-3xl sm:text-6xl md:text-8xl leading-none mb-4 sm:mb-6">
          Ready to scale <br />
          <span className="text-[#F7B928]">without the bloat?</span>
        </h2>

        <p className="font-mono text-xs sm:text-sm md:text-base text-white/70 max-w-2xl mx-auto leading-relaxed mb-6 sm:mb-10">
          We partner with high-growth e-commerce brands to overhaul architecture, slash page latency, and unlock millions in revenue.
        </p>

        {/* 3-Way Project Scope Selector */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-6 sm:mb-10 max-w-2xl">
          {scopeOptions.map((opt) => {
            const isActive = activeScope === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => setActiveScope(opt.id)}
                className={`px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full font-mono text-[10px] sm:text-xs uppercase tracking-wider font-bold transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "bg-[#F7B928] text-black shadow-lg shadow-[#F7B928]/25 scale-102"
                    : "bg-white/5 border border-white/20 text-white/70 hover:text-white hover:bg-white/10"
                }`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>

        {/* Magnetic Primary Action CTA Button */}
        <div className="relative p-2 sm:p-6 flex items-center justify-center">
          <button
            ref={magneticBtnRef}
            onClick={() => {
              alert(
                `Technical Audit booked for scope: [${
                  scopeOptions.find((s) => s.id === activeScope)?.label
                }]. Our principal engineer will connect within 24 hours.`
              );
            }}
            className="group relative bg-[#F7B928] text-black font-header font-black uppercase tracking-wider px-6 sm:px-12 py-4 sm:py-6 rounded-full text-xs sm:text-base md:text-lg shadow-2xl border-2 border-black hover:bg-white transition-colors duration-200 cursor-pointer flex items-center gap-2 sm:gap-3 will-change-transform"
          >
            <span>SCHEDULE TECHNICAL AUDIT</span>
            <span className="text-base sm:text-xl inline-block transition-transform duration-300 group-hover:translate-x-1">
              ↗
            </span>
          </button>
        </div>

        <p className="font-mono text-[9px] sm:text-xs text-white/40 uppercase tracking-widest mt-4">
          ZERO COMMITTED RETAINERS • FIXED SPRINT DELIVERABLES • GUARANTEED SPEED
        </p>
      </div>

      {/* Agency Dossier & Navigation Grid */}
      <div className="w-full max-w-7xl mx-auto pt-10 sm:pt-16 border-t border-white/10 z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 pb-8 sm:pb-12">
          {/* Left: Identity */}
          <div className="md:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2.5 mb-2 sm:mb-3">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping inline-block" />
                <span className="font-header font-black text-lg sm:text-xl tracking-wider text-white uppercase">
                  STUDIO<span className="text-[#F7B928] font-mono">32</span>
                </span>
              </div>
              <p className="text-white/60 text-xs font-light leading-relaxed max-w-sm mb-4">
                Digital engineering studio architecting bespoke Shopify Plus and headless commerce infrastructure with zero template bloat.
              </p>
            </div>

            <div className="p-3 sm:p-4 rounded-xl bg-white/[0.02] border border-white/10 font-mono text-xs w-fit">
              <div className="flex items-center gap-2 text-emerald-400 mb-1 font-semibold text-[10px] sm:text-xs">
                <span>⚡</span>
                <span>ACCEPTING Q1/Q2 ENTERPRISE ENGAGEMENTS</span>
              </div>
              <div className="text-white/40 text-[10px] sm:text-[11px]">
                LOCAL STUDIO TIME:{" "}
                <span className="text-[#F7B928] font-bold">{timeStr || "12:00:00 UTC"}</span>
              </div>
            </div>
          </div>

          {/* Center: Quick Jump Navigation */}
          <div className="md:col-span-4">
            <span className="font-mono text-[10px] sm:text-[11px] text-[#F7B928] uppercase tracking-widest block mb-3 sm:mb-4 font-bold">
              // ARCHITECTURAL DOSSIER
            </span>
            <ul className="space-y-2 sm:space-y-2.5 font-mono text-[11px] sm:text-xs text-white/70">
              <li>
                <button
                  onClick={() => scrollTo("#case-studies")}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  01 // Case Studies & DTC Releases
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo("#case-studies")}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  02 // Shopify Liquid Architecture
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo("#case-studies")}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  03 // Headless Next.js & React
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo("#process")}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  04 // Four-Phase Architecture Process
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo("#reviews")}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  05 // Verified Client Reviews (Filing Deck)
                </button>
              </li>
            </ul>
          </div>

          {/* Right: Protocols */}
          <div className="md:col-span-3">
            <span className="font-mono text-[10px] sm:text-[11px] text-[#F7B928] uppercase tracking-widest block mb-3 sm:mb-4 font-bold">
              // DEVELOPER PROTOCOLS
            </span>
            <ul className="space-y-1.5 sm:space-y-2 font-mono text-[11px] sm:text-xs text-white/70 mb-4 sm:mb-6">
              <li>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#F7B928] transition-colors"
                >
                  GitHub Repository ↗
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#F7B928] transition-colors"
                >
                  Twitter / X Broadcast ↗
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#F7B928] transition-colors"
                >
                  LinkedIn Architecture ↗
                </a>
              </li>
            </ul>

            <div className="font-mono text-xs">
              <span className="text-white/40 block text-[9px] sm:text-[10px] uppercase">DIRECT INQUIRIES:</span>
              <a
                href="mailto:dev@agency.com"
                className="text-[#F7B928] font-bold hover:underline text-xs"
              >
                dev@agency.com
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Edge */}
        <div className="pt-6 sm:pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 font-mono text-[10px] sm:text-xs text-white/40 text-center sm:text-left">
          <p>© 2026 STUDIO 32. EDITORIAL MOTION & PURPOSE-BUILT COMMERCE ENGINES.</p>

          <button
            onClick={() => scrollTo("#hero")}
            className="flex items-center gap-1.5 text-white/70 hover:text-[#F7B928] transition-colors cursor-pointer font-bold uppercase tracking-wider"
          >
            <span>BACK TO TOP</span>
            <span className="text-[#F7B928]">↑</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
