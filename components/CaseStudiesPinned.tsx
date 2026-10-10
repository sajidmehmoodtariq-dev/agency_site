"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSmoothScroll } from "@/components/SmoothScroll";

export default function CaseStudiesPinned() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollTo } = useSmoothScroll();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (!trackRef.current || !containerRef.current) return;

      const track = trackRef.current;
      const container = containerRef.current;

      // QuickTo velocity skew setter for tactile momentum feel
      const skewTo = gsap.quickTo(".card-mockup", "skewX", {
        duration: 0.8,
        ease: "power3",
      });
      const clampSkew = gsap.utils.clamp(-6, 6);

      // Horizontal Scroll Animation via ScrollTrigger pin
      const horizontalTween = gsap.to(track, {
        x: () => -(track.scrollWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: container,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${track.scrollWidth - window.innerWidth}`,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            // Apply subtle skew velocity effect during scroll scrub
            const velocity = self.getVelocity();
            const skew = clampSkew(velocity / 280);
            skewTo(skew);
          },
          onScrubComplete: () => {
            // Return skew to neutral once user stops scrolling
            skewTo(0);
          },
        },
      });

      // Recalculate dimensions on window resize
      ScrollTrigger.refresh();
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      id="case-studies"
      className="h-screen w-full overflow-hidden relative bg-[#0D0D0D] text-white select-none"
    >
      {/* Fixed Sticky Header Overlay for Context */}
      <div className="absolute top-8 left-6 md:left-16 right-6 md:right-16 z-30 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-[#E8A317] animate-pulse" />
          <span className="font-mono text-xs uppercase tracking-widest text-white/70">
            01 // CLIENT CASE STUDIES (HORIZONTAL PINNED TRACK)
          </span>
        </div>
        <div className="font-mono text-xs text-white/40 hidden md:block uppercase tracking-wider">
          SCROLL TO NAVIGATE [300VW TRACK] →
        </div>
      </div>

      {/* Horizontal track container: w-[300vw] */}
      <div
        ref={trackRef}
        className="flex flex-nowrap h-full w-[300vw] will-change-transform"
      >
        {/* ==================== SLIDE 1: Shopify DTC Rebuild (#E8A317 Amber Accent) ==================== */}
        <section className="w-screen h-full flex items-center justify-center px-6 sm:px-12 md:px-24 flex-shrink-0 relative">
          <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-5 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8A317]/10 border border-[#E8A317]/30 text-[#E8A317] font-mono text-xs uppercase tracking-widest mb-6 w-fit">
                <span>CASE 01 // DTC COMMERCE</span>
              </div>

              <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold leading-tight text-white mb-4">
                Shopify DTC <span className="text-[#E8A317]">Rebuild.</span>
              </h2>

              <p className="text-white/70 text-sm sm:text-base font-light leading-relaxed mb-6">
                Complete architectural overhaul for high-volume lifestyle brand. Replaced monolithic theme bloat with modular Liquid components and headless asset pipelines.
              </p>

              {/* Key Metric Tag */}
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-[#E8A317]/40 mb-8 flex items-center justify-between">
                <div>
                  <span className="font-mono text-[10px] text-white/50 block uppercase">IMPACT BENCHMARK</span>
                  <span className="font-mono text-2xl sm:text-3xl font-black text-[#E8A317]">
                    +310% DTC Revenue
                  </span>
                </div>
                <div className="text-right">
                  <span className="font-mono text-[10px] text-white/50 block uppercase">PAGE SPEED</span>
                  <span className="font-mono text-base font-bold text-white">0.65s LCP</span>
                </div>
              </div>

              {/* Tech Badges */}
              <div className="flex flex-wrap gap-2.5 font-mono text-xs">
                <span className="px-3 py-1.5 rounded-lg bg-white/10 text-white border border-white/15">
                  Shopify Plus
                </span>
                <span className="px-3 py-1.5 rounded-lg bg-white/10 text-white border border-white/15">
                  Theme App Extensibility
                </span>
                <span className="px-3 py-1.5 rounded-lg bg-[#E8A317]/15 text-[#E8A317] border border-[#E8A317]/30">
                  Custom Liquid
                </span>
              </div>
            </div>

            {/* Right Mockup Column (Card Mockup with Velocity Skew) */}
            <div className="lg:col-span-7 flex justify-center">
              <div className="card-mockup w-full max-w-lg aspect-[4/3] rounded-3xl bg-gradient-to-tr from-[#161616] via-[#1c1c1c] to-[#252014] border border-[#E8A317]/30 p-6 md:p-8 shadow-2xl relative overflow-hidden flex flex-col justify-between group transition-shadow duration-500 hover:shadow-[#E8A317]/20">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#E8A317]/10 rounded-full blur-3xl pointer-events-none" />

                {/* Mockup Header Bar */}
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-500/80" />
                    <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <span className="w-3 h-3 rounded-full bg-green-500/80" />
                    <span className="font-mono text-[10px] text-white/40 ml-2">store.kinetic.app</span>
                  </div>
                  <span className="font-mono text-[10px] text-[#E8A317] px-2 py-0.5 rounded bg-[#E8A317]/10 border border-[#E8A317]/20">
                    LIVE PRODUCTION
                  </span>
                </div>

                {/* Mockup Screen Visual */}
                <div className="my-auto py-6 flex flex-col gap-4">
                  <div className="h-6 w-1/3 bg-white/10 rounded" />
                  <div className="h-28 w-full bg-gradient-to-r from-white/5 to-[#E8A317]/10 rounded-2xl border border-white/5 p-4 flex items-center justify-between">
                    <div>
                      <span className="font-mono text-xs text-[#E8A317] block">FEATURED DROP // 01</span>
                      <span className="font-serif text-xl font-bold text-white">Ultra-Aero Parka</span>
                    </div>
                    <div className="px-4 py-2 rounded-xl bg-[#E8A317] text-black font-mono font-bold text-xs">
                      $480.00
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="h-12 bg-white/5 rounded-xl border border-white/5" />
                    <div className="h-12 bg-white/5 rounded-xl border border-white/5" />
                    <div className="h-12 bg-[#E8A317]/10 rounded-xl border border-[#E8A317]/20" />
                  </div>
                </div>

                {/* Mockup Footer */}
                <div className="flex items-center justify-between font-mono text-xs text-white/40 pt-4 border-t border-white/10">
                  <span>FRAME TIME: 16.4ms</span>
                  <span className="text-[#E8A317] font-bold">100% CHECKOUT HEALTH</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==================== SLIDE 2: Headless Custom App (#FF3E1D Safety Red Accent) ==================== */}
        <section className="w-screen h-full flex items-center justify-center px-6 sm:px-12 md:px-24 flex-shrink-0 relative">
          <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-5 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF3E1D]/10 border border-[#FF3E1D]/30 text-[#FF3E1D] font-mono text-xs uppercase tracking-widest mb-6 w-fit">
                <span>CASE 02 // BESPOKE PLATFORM</span>
              </div>

              <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold leading-tight text-white mb-4">
                Headless Custom <span className="text-[#FF3E1D]">App.</span>
              </h2>

              <p className="text-white/70 text-sm sm:text-base font-light leading-relaxed mb-6">
                Engineered interactive 3D configurator with Next.js App Router and Python FastAPI microservices. Real-time geometric sizing synced directly to ERP inventory.
              </p>

              {/* Key Metric Tag */}
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-[#FF3E1D]/40 mb-8 flex items-center justify-between">
                <div>
                  <span className="font-mono text-[10px] text-white/50 block uppercase">CORE WEB VITALS</span>
                  <span className="font-mono text-2xl sm:text-3xl font-black text-[#FF3E1D]">
                    99 Lighthouse / 120ms TTI
                  </span>
                </div>
                <div className="text-right">
                  <span className="font-mono text-[10px] text-white/50 block uppercase">EDGE SPEED</span>
                  <span className="font-mono text-base font-bold text-white">&lt;35ms TTFB</span>
                </div>
              </div>

              {/* Tech Badges */}
              <div className="flex flex-wrap gap-2.5 font-mono text-xs">
                <span className="px-3 py-1.5 rounded-lg bg-white/10 text-white border border-white/15">
                  Next.js
                </span>
                <span className="px-3 py-1.5 rounded-lg bg-white/10 text-white border border-white/15">
                  FastAPI
                </span>
                <span className="px-3 py-1.5 rounded-lg bg-[#FF3E1D]/15 text-[#FF3E1D] border border-[#FF3E1D]/30">
                  GraphQL
                </span>
              </div>
            </div>

            {/* Right Mockup Column */}
            <div className="lg:col-span-7 flex justify-center">
              <div className="card-mockup w-full max-w-lg aspect-[4/3] rounded-3xl bg-gradient-to-tr from-[#161616] via-[#1c1c1c] to-[#251614] border border-[#FF3E1D]/30 p-6 md:p-8 shadow-2xl relative overflow-hidden flex flex-col justify-between group transition-shadow duration-500 hover:shadow-[#FF3E1D]/20">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF3E1D]/10 rounded-full blur-3xl pointer-events-none" />

                {/* Mockup Header Bar */}
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-500/80" />
                    <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <span className="w-3 h-3 rounded-full bg-green-500/80" />
                    <span className="font-mono text-[10px] text-white/40 ml-2">app.valo-optics.io</span>
                  </div>
                  <span className="font-mono text-[10px] text-[#FF3E1D] px-2 py-0.5 rounded bg-[#FF3E1D]/10 border border-[#FF3E1D]/20">
                    EDGE RUNTIME
                  </span>
                </div>

                {/* Mockup Screen Visual: Dashboard View */}
                <div className="my-auto py-6 flex flex-col gap-4">
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-xs text-white/80">3D CAD CONFIGURATOR</span>
                    <span className="font-mono text-xs text-[#FF3E1D]">LIVE 60FPS</span>
                  </div>

                  <div className="h-28 w-full bg-[#111] rounded-2xl border border-white/10 p-4 flex items-center justify-center relative overflow-hidden">
                    <div className="w-20 h-20 rounded-full border-2 border-dashed border-[#FF3E1D]/50 flex items-center justify-center animate-[spin_10s_linear_infinite]">
                      <span className="font-mono text-[11px] text-[#FF3E1D]">3D MESH</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 font-mono text-xs">
                    <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
                      <span className="text-white/40 block text-[9px]">VERTICES</span>
                      <span className="text-white font-bold">48,200</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-[#FF3E1D]/10 border border-[#FF3E1D]/20">
                      <span className="text-[#FF3E1D] block text-[9px]">COMPUTE LATENCY</span>
                      <span className="text-white font-bold">12ms</span>
                    </div>
                  </div>
                </div>

                {/* Mockup Footer */}
                <div className="flex items-center justify-between font-mono text-xs text-white/40 pt-4 border-t border-white/10">
                  <span>TURBOPACK COMPILED</span>
                  <span className="text-[#FF3E1D] font-bold">ZERO HYDRATION JANK</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==================== SLIDE 3: Custom E-Commerce Portal (Electric Blue Accent) ==================== */}
        <section className="w-screen h-full flex items-center justify-center px-6 sm:px-12 md:px-24 flex-shrink-0 relative">
          <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-5 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 font-mono text-xs uppercase tracking-widest mb-6 w-fit">
                <span>CASE 03 // GLOBAL SETTLEMENT</span>
              </div>

              <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold leading-tight text-white mb-4">
                Custom E-Commerce <span className="text-blue-400">Portal.</span>
              </h2>

              <p className="text-white/70 text-sm sm:text-base font-light leading-relaxed mb-6">
                Distributed multi-tenant checkout network deployed across 24 edge regions. Features asynchronous cart reconciliation and zero-downtime ledger migration.
              </p>

              {/* Key Metric Tag */}
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-blue-500/40 mb-8 flex items-center justify-between">
                <div>
                  <span className="font-mono text-[10px] text-white/50 block uppercase">TRANSACTION VOLUME</span>
                  <span className="font-mono text-2xl sm:text-3xl font-black text-blue-400">
                    $4.2M Processed
                  </span>
                </div>
                <div className="text-right">
                  <span className="font-mono text-[10px] text-white/50 block uppercase">UPTIME SLA</span>
                  <span className="font-mono text-base font-bold text-white">99.99%</span>
                </div>
              </div>

              {/* Tech Badges */}
              <div className="flex flex-wrap gap-2.5 font-mono text-xs">
                <span className="px-3 py-1.5 rounded-lg bg-white/10 text-white border border-white/15">
                  Tailwind
                </span>
                <span className="px-3 py-1.5 rounded-lg bg-white/10 text-white border border-white/15">
                  Stripe Connect
                </span>
                <span className="px-3 py-1.5 rounded-lg bg-blue-500/15 text-blue-400 border border-blue-500/30">
                  Redis
                </span>
              </div>
            </div>

            {/* Right Mockup Column */}
            <div className="lg:col-span-7 flex justify-center">
              <div className="card-mockup w-full max-w-lg aspect-[4/3] rounded-3xl bg-gradient-to-tr from-[#161616] via-[#1c1c1c] to-[#141b25] border border-blue-500/30 p-6 md:p-8 shadow-2xl relative overflow-hidden flex flex-col justify-between group transition-shadow duration-500 hover:shadow-blue-500/20">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

                {/* Mockup Header Bar */}
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-500/80" />
                    <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <span className="w-3 h-3 rounded-full bg-green-500/80" />
                    <span className="font-mono text-[10px] text-white/40 ml-2">portal.aether-pay.net</span>
                  </div>
                  <span className="font-mono text-[10px] text-blue-400 px-2 py-0.5 rounded bg-blue-500/10 border border-blue-500/20">
                    ENCRYPTED TLS 1.3
                  </span>
                </div>

                {/* Mockup Screen Visual: Payment Settlement Graph */}
                <div className="my-auto py-6 flex flex-col gap-4">
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between">
                    <div>
                      <span className="font-mono text-[10px] text-white/50 block">GROSS CHECKOUT RATE</span>
                      <span className="font-mono text-xl font-bold text-white">$142,850.00 / HR</span>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 font-mono text-xs font-bold">
                      SETTLED
                    </span>
                  </div>

                  <div className="h-16 w-full bg-blue-500/5 rounded-xl border border-blue-500/10 p-3 flex items-end gap-2">
                    <div className="flex-1 bg-blue-500/30 h-1/2 rounded" />
                    <div className="flex-1 bg-blue-500/40 h-2/3 rounded" />
                    <div className="flex-1 bg-blue-500/60 h-3/4 rounded" />
                    <div className="flex-1 bg-blue-500/80 h-full rounded" />
                    <div className="flex-1 bg-blue-400 h-5/6 rounded" />
                  </div>
                </div>

                {/* Mockup Footer */}
                <div className="flex items-center justify-between font-mono text-xs text-white/40 pt-4 border-t border-white/10">
                  <span>REDIS CACHE HIT: 98.7%</span>
                  <span className="text-blue-400 font-bold">STRIPE CONNECT READY</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
