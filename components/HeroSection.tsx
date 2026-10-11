"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSmoothScroll } from "@/components/SmoothScroll";

export default function HeroSection() {
  const heroWrapperRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);
  const centerVisualRef = useRef<HTMLDivElement>(null);
  const badge1Ref = useRef<HTMLDivElement>(null);
  const badge2Ref = useRef<HTMLDivElement>(null);
  const badge3Ref = useRef<HTMLDivElement>(null);
  const badge4Ref = useRef<HTMLDivElement>(null);

  const { scrollTo } = useSmoothScroll();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Entry Mask Wipe: Wipes away dark mask to reveal crisp light stage
      if (maskRef.current) {
        gsap.fromTo(
          maskRef.current,
          {
            clipPath: "circle(150% at 50% 0%)",
          },
          {
            clipPath: "circle(0% at 50% 0%)",
            duration: 1.2,
            ease: "power3.inOut",
            onComplete: () => {
              if (maskRef.current) {
                maskRef.current.style.display = "none";
              }
            },
          }
        );
      }

      // 2. Subtle organic floating oscillation for the badges
      gsap.to(badge1Ref.current, {
        y: "+=8",
        rotation: "+=1.2",
        duration: 2.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(badge2Ref.current, {
        y: "-=10",
        rotation: "-=1.4",
        duration: 3.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 0.2,
      });

      gsap.to(badge3Ref.current, {
        y: "+=8",
        rotation: "-=1",
        duration: 2.6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 0.4,
      });

      gsap.to(badge4Ref.current, {
        y: "-=8",
        rotation: "+=1.5",
        duration: 3.0,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 0.1,
      });

      // 3. Pinning & Scroll Departure scrub animation
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: heroWrapperRef.current,
          start: "top top",
          end: "+=100%",
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      scrollTl
        // Center visual scales down slightly (scale: 0.88)
        .to(
          centerVisualRef.current,
          {
            scale: 0.88,
            ease: "power1.inOut",
          },
          0
        )
        // Floating badges drift outward in opposite diagonal directions
        .to(
          badge1Ref.current,
          {
            x: -80,
            y: -60,
            opacity: 0,
            ease: "power1.inOut",
          },
          0
        )
        .to(
          badge2Ref.current,
          {
            x: 80,
            y: -60,
            opacity: 0,
            ease: "power1.inOut",
          },
          0
        )
        .to(
          badge3Ref.current,
          {
            x: -80,
            y: 60,
            opacity: 0,
            ease: "power1.inOut",
          },
          0
        )
        .to(
          badge4Ref.current,
          {
            x: 80,
            y: 60,
            opacity: 0,
            ease: "power1.inOut",
          },
          0
        )
        // Hero fades smoothly before unpinning into next section
        .to(
          heroContentRef.current,
          {
            opacity: 0,
            ease: "power1.inOut",
          },
          0.3
        );
    }, heroWrapperRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div ref={heroWrapperRef} className="relative w-full overflow-hidden bg-[#FAF8F5]">
      {/* Full-screen dark mask overlay for circular wipe opening reveal */}
      <div
        ref={maskRef}
        className="absolute inset-0 bg-[#0D0D0D] z-40 pointer-events-none"
        style={{
          clipPath: "circle(150% at 50% 0%)",
        }}
      />

      {/* Hero Section Container */}
      <section
        ref={heroContentRef}
        id="hero"
        className="min-h-[100dvh] h-auto lg:h-screen w-full relative overflow-hidden bg-[#FAF8F5] text-[#0D0D0D] flex flex-col justify-between pt-20 sm:pt-24 lg:pt-28 pb-8 sm:pb-12 px-4 sm:px-8 md:px-12 select-none"
      >
        {/* Top Headline Row */}
        <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-end justify-between gap-4 sm:gap-6 z-10">
          <div className="max-w-3xl">
            <span className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-[#E8A317] font-bold block mb-2">
              // STUDIO 32 ARCHITECTURE
            </span>
            <h1 className="font-serif text-4xl sm:text-6xl md:text-8xl tracking-tight text-[#0D0D0D] leading-[0.98] sm:leading-[0.95]">
              Turn stores into high-velocity engines.
            </h1>
          </div>

          <div className="max-w-md md:text-right pb-1">
            <p className="font-mono text-xs sm:text-sm text-[#444] uppercase tracking-wider leading-relaxed">
              Custom-engineered full-stack platforms with zero template bloat.
            </p>
          </div>
        </div>

        {/* Center Stage */}
        <div className="w-full max-w-5xl mx-auto h-[340px] sm:h-[420px] md:h-[480px] flex items-center justify-center relative my-auto z-20">
          {/* Badge 1: Top-Left */}
          <div
            ref={badge1Ref}
            className="absolute top-1 sm:top-6 md:top-10 left-1 sm:left-6 md:left-12 z-30 bg-white/95 backdrop-blur-sm text-black border border-black/10 shadow-lg sm:shadow-xl px-2.5 sm:px-4 py-1.5 sm:py-3 rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-mono font-bold flex items-center gap-1.5 sm:gap-2 hover:border-[#F7B928] transition-colors"
          >
            <span className="text-[#E8A317] text-xs sm:text-sm">⚡</span>
            <span>Sub-800ms LCP</span>
          </div>

          {/* Badge 2: Top-Right */}
          <div
            ref={badge2Ref}
            className="absolute top-1 sm:top-6 md:top-10 right-1 sm:right-6 md:right-12 z-30 bg-white/95 backdrop-blur-sm text-black border border-black/10 shadow-lg sm:shadow-xl px-2.5 sm:px-4 py-1.5 sm:py-3 rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-mono font-bold flex items-center gap-1.5 sm:gap-2 hover:border-[#F7B928] transition-colors"
          >
            <span>💎</span>
            <span className="hidden xs:inline">Custom Liquid & Headless</span>
            <span className="xs:hidden">Headless Ready</span>
          </div>

          {/* Badge 3: Bottom-Left */}
          <div
            ref={badge3Ref}
            className="absolute bottom-1 sm:bottom-6 md:bottom-10 left-1 sm:left-6 md:left-12 z-30 bg-white/95 backdrop-blur-sm text-black border border-black/10 shadow-lg sm:shadow-xl px-2.5 sm:px-4 py-1.5 sm:py-3 rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-mono font-bold flex items-center gap-1.5 sm:gap-2 hover:border-[#FF3E1D] transition-colors"
          >
            <span>📈</span>
            <span className="text-[#FF3E1D] font-extrabold">+180% Lift</span>
          </div>

          {/* Badge 4: Bottom-Right */}
          <div
            ref={badge4Ref}
            className="absolute bottom-1 sm:bottom-6 md:bottom-10 right-1 sm:right-6 md:right-12 z-30 bg-white/95 backdrop-blur-sm text-black border border-black/10 shadow-lg sm:shadow-xl px-2.5 sm:px-4 py-1.5 sm:py-3 rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-mono font-bold flex items-center gap-1.5 sm:gap-2 hover:border-black/30 transition-colors"
          >
            <span>🛡️</span>
            <span>Enterprise CI/CD</span>
          </div>

          {/* Center Stage Element */}
          <div
            ref={centerVisualRef}
            className="relative w-56 h-64 sm:w-72 sm:h-80 bg-[#F7B928] rounded-2xl sm:rounded-3xl flex flex-col items-center justify-between text-black font-black uppercase tracking-widest shadow-2xl shadow-[#F7B928]/35 transition-transform duration-300 p-4 sm:p-6 overflow-hidden group border border-black/10"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-black/15 pointer-events-none" />

            <div className="w-full flex justify-between items-center font-mono text-[9px] sm:text-[10px] text-black/70 tracking-normal pb-3 border-b border-black/15">
              <span>AG_ENGINE</span>
              <span className="flex items-center gap-1 font-bold text-black">
                <span className="w-1.5 h-1.5 rounded-full bg-black animate-ping" />
                ACTIVE
              </span>
            </div>

            {/* Central 3D Canvas Placeholder */}
            <div className="my-auto flex flex-col items-center justify-center">
              <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl bg-black text-[#F7B928] flex items-center justify-center text-2xl sm:text-3xl font-black mb-2 sm:mb-3 shadow-xl">
                32
              </div>
              <span className="text-base sm:text-xl font-extrabold tracking-widest text-black text-center">
                ANTI-GRAVITY
              </span>
              <span className="font-mono text-[9px] sm:text-[10px] text-black/80 mt-0.5 sm:mt-1 tracking-normal font-semibold">
                3D CANVAS ENGINE
              </span>
            </div>

            <div className="w-full flex justify-between items-center font-mono text-[9px] sm:text-[10px] text-black/70 pt-3 border-t border-black/15">
              <span>FPS: 60.0</span>
              <span>ZERO_BLOAT</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Dual CTA Buttons */}
        <div className="w-full max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 z-10 pt-3 sm:pt-4 border-t border-black/10">
          <div className="font-mono text-[10px] sm:text-xs text-[#666] uppercase tracking-wider hidden sm:block">
            SCROLL TO ENGAGE HORIZONTAL TRACK ➔
          </div>

          <div className="flex flex-col xs:flex-row items-center gap-2 sm:gap-4 w-full sm:w-auto">
            <button
              onClick={() => scrollTo("#case-studies")}
              className="w-full xs:w-auto px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-[#0D0D0D] text-white font-mono text-[11px] sm:text-xs uppercase tracking-wider font-bold hover:bg-[#F7B928] hover:text-black transition-all duration-300 shadow-lg active:scale-95 cursor-pointer text-center"
            >
              Client Case Studies ➔
            </button>
            <button
              onClick={() => scrollTo("#audit")}
              className="w-full xs:w-auto px-5 sm:px-6 py-2.5 sm:py-3 rounded-full border border-black/20 text-[#0D0D0D] font-mono text-[11px] sm:text-xs uppercase tracking-wider font-semibold hover:border-black hover:bg-black/5 transition-all duration-300 active:scale-95 cursor-pointer text-center"
            >
              Schedule Store Audit ↗
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
