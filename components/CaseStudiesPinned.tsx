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

      const skewTo = gsap.quickTo(".card-mockup", "skewX", {
        duration: 0.8,
        ease: "power3",
      });
      const clampSkew = gsap.utils.clamp(-6, 6);

      gsap.to(track, {
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
            const velocity = self.getVelocity();
            const skew = clampSkew(velocity / 280);
            skewTo(skew);
          },
          onScrubComplete: () => {
            skewTo(0);
          },
        },
      });

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
      className="h-[100dvh] w-full overflow-hidden relative bg-[#0D0D0D] text-white select-none"
    >
      {/* Sticky Header Overlay */}
      <div className="absolute top-4 sm:top-8 left-4 sm:left-12 right-4 sm:right-12 z-30 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#E8A317] animate-pulse" />
          <span className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-white/70">
            01 // CLIENT CASE STUDIES (300VW TRACK)
          </span>
        </div>
        <div className="font-mono text-xs text-white/40 hidden md:block uppercase tracking-wider">
          SCROLL TO NAVIGATE ➔
        </div>
      </div>

      {/* Horizontal track container */}
      <div
        ref={trackRef}
        className="flex flex-nowrap h-full w-[300vw] will-change-transform"
      >
        {/* ==================== SLIDE 1: Shopify DTC Rebuild ==================== */}
        <section className="w-screen h-full flex items-center justify-center px-4 sm:px-10 md:px-20 flex-shrink-0 relative pt-14 sm:pt-0">
          <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 md:gap-12 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-5 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 px-2.5 sm:px-3 py-1 rounded-full bg-[#E8A317]/10 border border-[#E8A317]/30 text-[#E8A317] font-mono text-[10px] sm:text-xs uppercase tracking-widest mb-2 sm:mb-4 w-fit">
                <span>CASE 01 // DTC COMMERCE</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold leading-tight text-white mb-2 sm:mb-4">
                Shopify DTC <span className="text-[#E8A317]">Rebuild.</span>
              </h2>

              <p className="text-white/70 text-xs sm:text-sm md:text-base font-light leading-relaxed mb-3 sm:mb-6 line-clamp-3 sm:line-clamp-none">
                Complete architectural overhaul for high-volume lifestyle brand. Replaced monolithic theme bloat with modular Liquid components and headless asset pipelines.
              </p>

              {/* Key Metric Tag */}
              <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white/[0.03] border border-[#E8A317]/40 mb-3 sm:mb-6 flex items-center justify-between">
                <div>
                  <span className="font-mono text-[9px] sm:text-[10px] text-white/50 block uppercase">IMPACT BENCHMARK</span>
                  <span className="font-mono text-xl sm:text-3xl font-black text-[#E8A317]">
                    +310% DTC Revenue
                  </span>
                </div>
                <div className="text-right">
                  <span className="font-mono text-[9px] sm:text-[10px] text-white/50 block uppercase">PAGE SPEED</span>
                  <span className="font-mono text-xs sm:text-base font-bold text-white">0.65s LCP</span>
                </div>
              </div>

              {/* Tech Badges */}
              <div className="flex flex-wrap gap-2 font-mono text-[10px] sm:text-xs">
                <span className="px-2.5 py-1 rounded-md sm:rounded-lg bg-white/10 text-white border border-white/15">
                  Shopify Plus
                </span>
                <span className="px-2.5 py-1 rounded-md sm:rounded-lg bg-white/10 text-white border border-white/15">
                  Theme App Extensibility
                </span>
                <span className="px-2.5 py-1 rounded-md sm:rounded-lg bg-[#E8A317]/15 text-[#E8A317] border border-[#E8A317]/30">
                  Custom Liquid
                </span>
              </div>
            </div>

            {/* Right Mockup Column */}
            <div className="lg:col-span-7 flex justify-center">
              <div className="card-mockup w-full max-w-sm sm:max-w-md lg:max-w-lg aspect-[16/10] sm:aspect-[4/3] rounded-2xl sm:rounded-3xl bg-gradient-to-tr from-[#161616] via-[#1c1c1c] to-[#252219] border border-[#E8A317]/30 p-4 sm:p-6 md:p-8 shadow-2xl relative overflow-hidden flex flex-col justify-between group">
                <div className="absolute top-0 right-0 w-48 sm:w-64 h-48 sm:h-64 bg-[#E8A317]/10 rounded-full blur-3xl pointer-events-none" />

                {/* Mockup Header */}
                <div className="flex items-center justify-between border-b border-white/10 pb-2 sm:pb-3">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                    <span className="font-mono text-[9px] sm:text-[10px] text-white/40 ml-1.5">store.aether-lifestyle.com</span>
                  </div>
                  <span className="font-mono text-[9px] sm:text-[10px] text-[#E8A317] px-2 py-0.5 rounded bg-[#E8A317]/10 border border-[#E8A317]/20">
                    HTTP/3 200 OK
                  </span>
                </div>

                {/* Mockup Screen Visual */}
                <div className="my-auto py-2 sm:py-4 flex flex-col gap-2 sm:gap-3">
                  <div className="h-14 sm:h-24 md:h-28 w-full bg-black/40 rounded-xl border border-white/10 p-3 sm:p-4 flex items-center justify-between relative overflow-hidden">
                    <div>
                      <span className="font-mono text-[9px] sm:text-xs text-[#E8A317] block font-bold">LIGHTHOUSE SCORE</span>
                      <span className="font-mono text-2xl sm:text-4xl font-black text-white">99 / 100</span>
                    </div>
                    <div className="w-10 h-10 sm:w-16 sm:h-16 rounded-full border-2 sm:border-4 border-[#E8A317] flex items-center justify-center font-mono text-[10px] sm:text-xs font-bold text-[#E8A317]">
                      FAST
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 font-mono text-[10px] sm:text-xs">
                    <div className="p-2 sm:p-2.5 rounded-lg bg-white/5 border border-white/5">
                      <span className="text-white/40 block text-[8px] sm:text-[9px]">TOTAL BLOCKING TIME</span>
                      <span className="text-white font-bold">0 ms</span>
                    </div>
                    <div className="p-2 sm:p-2.5 rounded-lg bg-[#E8A317]/10 border border-[#E8A317]/20">
                      <span className="text-[#E8A317] block text-[8px] sm:text-[9px]">INTERACTION TO NEXT PAINT</span>
                      <span className="text-white font-bold">42 ms</span>
                    </div>
                  </div>
                </div>

                {/* Mockup Footer */}
                <div className="flex items-center justify-between font-mono text-[9px] sm:text-xs text-white/40 pt-2 sm:pt-3 border-t border-white/10">
                  <span>LIQUID RUNTIME OPTIMIZED</span>
                  <span className="text-[#E8A317] font-bold">EDGE CACHED</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==================== SLIDE 2: Headless 3D Eyewear ==================== */}
        <section className="w-screen h-full flex items-center justify-center px-4 sm:px-10 md:px-20 flex-shrink-0 relative pt-14 sm:pt-0">
          <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 md:gap-12 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-5 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 px-2.5 sm:px-3 py-1 rounded-full bg-[#FF3E1D]/10 border border-[#FF3E1D]/30 text-[#FF3E1D] font-mono text-[10px] sm:text-xs uppercase tracking-widest mb-2 sm:mb-4 w-fit">
                <span>CASE 02 // 3D CONFIGURATOR</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold leading-tight text-white mb-2 sm:mb-4">
                Headless 3D <span className="text-[#FF3E1D]">Configurator.</span>
              </h2>

              <p className="text-white/70 text-xs sm:text-sm md:text-base font-light leading-relaxed mb-3 sm:mb-6 line-clamp-3 sm:line-clamp-none">
                Interactive real-time 3D optical frame builder for Valo Eyewear. Next.js 16 App Router streaming directly into a headless Shopify checkout engine.
              </p>

              {/* Key Metric Tag */}
              <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white/[0.03] border border-[#FF3E1D]/40 mb-3 sm:mb-6 flex items-center justify-between">
                <div>
                  <span className="font-mono text-[9px] sm:text-[10px] text-white/50 block uppercase">CONVERSION GAIN</span>
                  <span className="font-mono text-xl sm:text-3xl font-black text-[#FF3E1D]">
                    +44% Checkouts
                  </span>
                </div>
                <div className="text-right">
                  <span className="font-mono text-[9px] sm:text-[10px] text-white/50 block uppercase">FRAME RATE</span>
                  <span className="font-mono text-xs sm:text-base font-bold text-white">Locked 60 FPS</span>
                </div>
              </div>

              {/* Tech Badges */}
              <div className="flex flex-wrap gap-2 font-mono text-[10px] sm:text-xs">
                <span className="px-2.5 py-1 rounded-md sm:rounded-lg bg-white/10 text-white border border-white/15">
                  Next.js App Router
                </span>
                <span className="px-2.5 py-1 rounded-md sm:rounded-lg bg-white/10 text-white border border-white/15">
                  Three.js / WebGL
                </span>
                <span className="px-2.5 py-1 rounded-md sm:rounded-lg bg-[#FF3E1D]/15 text-[#FF3E1D] border border-[#FF3E1D]/30">
                  Shopify Storefront API
                </span>
              </div>
            </div>

            {/* Right Mockup Column */}
            <div className="lg:col-span-7 flex justify-center">
              <div className="card-mockup w-full max-w-sm sm:max-w-md lg:max-w-lg aspect-[16/10] sm:aspect-[4/3] rounded-2xl sm:rounded-3xl bg-gradient-to-tr from-[#161616] via-[#1c1c1c] to-[#251816] border border-[#FF3E1D]/30 p-4 sm:p-6 md:p-8 shadow-2xl relative overflow-hidden flex flex-col justify-between group">
                <div className="absolute top-0 right-0 w-48 sm:w-64 h-48 sm:h-64 bg-[#FF3E1D]/10 rounded-full blur-3xl pointer-events-none" />

                <div className="flex items-center justify-between border-b border-white/10 pb-2 sm:pb-3">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                    <span className="font-mono text-[9px] sm:text-[10px] text-white/40 ml-1.5">app.valo-optics.io</span>
                  </div>
                  <span className="font-mono text-[9px] sm:text-[10px] text-[#FF3E1D] px-2 py-0.5 rounded bg-[#FF3E1D]/10 border border-[#FF3E1D]/20">
                    EDGE RUNTIME
                  </span>
                </div>

                <div className="my-auto py-2 sm:py-4 flex flex-col gap-2 sm:gap-3">
                  <div className="h-14 sm:h-24 md:h-28 w-full bg-[#111] rounded-xl border border-white/10 p-3 sm:p-4 flex items-center justify-center relative overflow-hidden">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border-2 border-dashed border-[#FF3E1D]/50 flex items-center justify-center animate-[spin_10s_linear_infinite]">
                      <span className="font-mono text-[9px] sm:text-[10px] text-[#FF3E1D]">3D MESH</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 font-mono text-[10px] sm:text-xs">
                    <div className="p-2 sm:p-2.5 rounded-lg bg-white/5 border border-white/5">
                      <span className="text-white/40 block text-[8px] sm:text-[9px]">VERTICES</span>
                      <span className="text-white font-bold">48,200</span>
                    </div>
                    <div className="p-2 sm:p-2.5 rounded-lg bg-[#FF3E1D]/10 border border-[#FF3E1D]/20">
                      <span className="text-[#FF3E1D] block text-[8px] sm:text-[9px]">COMPUTE LATENCY</span>
                      <span className="text-white font-bold">12ms</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between font-mono text-[9px] sm:text-xs text-white/40 pt-2 sm:pt-3 border-t border-white/10">
                  <span>TURBOPACK COMPILED</span>
                  <span className="text-[#FF3E1D] font-bold">ZERO HYDRATION JANK</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==================== SLIDE 3: Custom E-Commerce Portal ==================== */}
        <section className="w-screen h-full flex items-center justify-center px-4 sm:px-10 md:px-20 flex-shrink-0 relative pt-14 sm:pt-0">
          <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 md:gap-12 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-5 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 px-2.5 sm:px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 font-mono text-[10px] sm:text-xs uppercase tracking-widest mb-2 sm:mb-4 w-fit">
                <span>CASE 03 // GLOBAL SETTLEMENT</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold leading-tight text-white mb-2 sm:mb-4">
                Custom E-Commerce <span className="text-blue-400">Portal.</span>
              </h2>

              <p className="text-white/70 text-xs sm:text-sm md:text-base font-light leading-relaxed mb-3 sm:mb-6 line-clamp-3 sm:line-clamp-none">
                Distributed multi-tenant checkout network deployed across 24 edge regions. Features asynchronous cart reconciliation and zero-downtime ledger migration.
              </p>

              {/* Key Metric Tag */}
              <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white/[0.03] border border-blue-500/40 mb-3 sm:mb-6 flex items-center justify-between">
                <div>
                  <span className="font-mono text-[9px] sm:text-[10px] text-white/50 block uppercase">TRANSACTION VOLUME</span>
                  <span className="font-mono text-xl sm:text-3xl font-black text-blue-400">
                    $4.2M Processed
                  </span>
                </div>
                <div className="text-right">
                  <span className="font-mono text-[9px] sm:text-[10px] text-white/50 block uppercase">UPTIME SLA</span>
                  <span className="font-mono text-xs sm:text-base font-bold text-white">99.99%</span>
                </div>
              </div>

              {/* Tech Badges */}
              <div className="flex flex-wrap gap-2 font-mono text-[10px] sm:text-xs">
                <span className="px-2.5 py-1 rounded-md sm:rounded-lg bg-white/10 text-white border border-white/15">
                  Tailwind
                </span>
                <span className="px-2.5 py-1 rounded-md sm:rounded-lg bg-white/10 text-white border border-white/15">
                  Stripe Connect
                </span>
                <span className="px-2.5 py-1 rounded-md sm:rounded-lg bg-blue-500/15 text-blue-400 border border-blue-500/30">
                  Redis
                </span>
              </div>
            </div>

            {/* Right Mockup Column */}
            <div className="lg:col-span-7 flex justify-center">
              <div className="card-mockup w-full max-w-sm sm:max-w-md lg:max-w-lg aspect-[16/10] sm:aspect-[4/3] rounded-2xl sm:rounded-3xl bg-gradient-to-tr from-[#161616] via-[#1c1c1c] to-[#141b25] border border-blue-500/30 p-4 sm:p-6 md:p-8 shadow-2xl relative overflow-hidden flex flex-col justify-between group">
                <div className="absolute top-0 right-0 w-48 sm:w-64 h-48 sm:h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

                <div className="flex items-center justify-between border-b border-white/10 pb-2 sm:pb-3">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                    <span className="font-mono text-[9px] sm:text-[10px] text-white/40 ml-1.5">portal.aether-pay.net</span>
                  </div>
                  <span className="font-mono text-[9px] sm:text-[10px] text-blue-400 px-2 py-0.5 rounded bg-blue-500/10 border border-blue-500/20">
                    ENCRYPTED TLS 1.3
                  </span>
                </div>

                <div className="my-auto py-2 sm:py-4 flex flex-col gap-2 sm:gap-3">
                  <div className="p-3 sm:p-4 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between">
                    <div>
                      <span className="font-mono text-[8px] sm:text-[10px] text-white/50 block">GROSS CHECKOUT RATE</span>
                      <span className="font-mono text-base sm:text-xl font-bold text-white">$142,850.00 / HR</span>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-400 font-mono text-[10px] sm:text-xs font-bold">
                      SETTLED
                    </span>
                  </div>

                  <div className="h-10 sm:h-16 w-full bg-blue-500/5 rounded-lg sm:rounded-xl border border-blue-500/10 p-2 sm:p-3 flex items-end gap-1.5 sm:gap-2">
                    <div className="flex-1 bg-blue-500/30 h-1/2 rounded" />
                    <div className="flex-1 bg-blue-500/40 h-2/3 rounded" />
                    <div className="flex-1 bg-blue-500/60 h-3/4 rounded" />
                    <div className="flex-1 bg-blue-500/80 h-full rounded" />
                    <div className="flex-1 bg-blue-400 h-5/6 rounded" />
                  </div>
                </div>

                <div className="flex items-center justify-between font-mono text-[9px] sm:text-xs text-white/40 pt-2 sm:pt-3 border-t border-white/10">
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
