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
        y: "+=12",
        rotation: "+=1.5",
        duration: 2.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(badge2Ref.current, {
        y: "-=14",
        rotation: "-=1.8",
        duration: 3.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 0.2,
      });

      gsap.to(badge3Ref.current, {
        y: "+=10",
        rotation: "-=1.2",
        duration: 2.6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 0.4,
      });

      gsap.to(badge4Ref.current, {
        y: "-=12",
        rotation: "+=2",
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
            x: -120,
            y: -80,
            opacity: 0,
            ease: "power1.inOut",
          },
          0
        )
        .to(
          badge2Ref.current,
          {
            x: 120,
            y: -80,
            opacity: 0,
            ease: "power1.inOut",
          },
          0
        )
        .to(
          badge3Ref.current,
          {
            x: -120,
            y: 80,
            opacity: 0,
            ease: "power1.inOut",
          },
          0
        )
        .to(
          badge4Ref.current,
          {
            x: 120,
            y: 80,
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

      {/* Hero Section Container (Editorial Cream #FAF8F5 with Ink-Black Typography) */}
      <section
        ref={heroContentRef}
        id="hero"
        className="h-screen w-full relative overflow-hidden bg-[#FAF8F5] text-[#0D0D0D] flex flex-col justify-between pt-28 pb-12 px-6 md:px-12 select-none"
      >
        {/* Top Headline Row */}
        <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-end justify-between gap-6 z-10">
          <div className="max-w-3xl">
            <span className="font-mono text-xs uppercase tracking-widest text-[#E8A317] font-bold block mb-2">
              // STUDIO 32 ARCHITECTURE
            </span>
            <h1 className="font-serif text-5xl sm:text-6xl md:text-8xl tracking-tight text-[#0D0D0D] leading-[0.95]">
              Turn stores into high-velocity engines.
            </h1>
          </div>

          <div className="max-w-md md:text-right pb-1">
            <p className="font-mono text-xs sm:text-sm text-[#444] uppercase tracking-wider leading-relaxed">
              Custom-engineered full-stack platforms with zero template bloat.
            </p>
          </div>
        </div>

        {/* Center Stage: w-full max-w-5xl mx-auto h-[480px] */}
        <div className="w-full max-w-5xl mx-auto h-[480px] flex items-center justify-center relative my-auto z-20">
          {/* Badge 1: Top-Left (⚡ Sub-800ms LCP) */}
          <div
            ref={badge1Ref}
            className="absolute top-4 sm:top-10 left-2 sm:left-6 md:left-12 z-30 bg-white text-black border border-black/10 shadow-xl px-4 py-3 rounded-xl text-xs font-mono font-bold flex items-center gap-2 hover:border-[#F7B928] transition-colors"
          >
            <span className="text-[#E8A317] text-sm">⚡</span>
            <span>Sub-800ms LCP</span>
          </div>

          {/* Badge 2: Top-Right (📦 Custom Liquid & Headless) */}
          <div
            ref={badge2Ref}
            className="absolute top-4 sm:top-10 right-2 sm:right-6 md:right-12 z-30 bg-white text-black border border-black/10 shadow-xl px-4 py-3 rounded-xl text-xs font-mono font-bold flex items-center gap-2 hover:border-[#F7B928] transition-colors"
          >
            <span>📦</span>
            <span>Custom Liquid & Headless</span>
          </div>

          {/* Badge 3: Bottom-Left (📈 +180% Avg Conversion Lift) */}
          <div
            ref={badge3Ref}
            className="absolute bottom-4 sm:bottom-10 left-2 sm:left-6 md:left-12 z-30 bg-white text-black border border-black/10 shadow-xl px-4 py-3 rounded-xl text-xs font-mono font-bold flex items-center gap-2 hover:border-[#FF3E1D] transition-colors"
          >
            <span>📈</span>
            <span className="text-[#FF3E1D] font-extrabold">+180% Avg Conversion Lift</span>
          </div>

          {/* Badge 4: Bottom-Right (🛡️ Enterprise CI/CD) */}
          <div
            ref={badge4Ref}
            className="absolute bottom-4 sm:bottom-10 right-2 sm:right-6 md:right-12 z-30 bg-white text-black border border-black/10 shadow-xl px-4 py-3 rounded-xl text-xs font-mono font-bold flex items-center gap-2 hover:border-black/30 transition-colors"
          >
            <span>🛡️</span>
            <span>Enterprise CI/CD</span>
          </div>

          {/* Center Stage Element: w-72 h-80 bg-[#F7B928] rounded-3xl with High Contrast */}
          <div
            ref={centerVisualRef}
            className="relative w-72 h-80 bg-[#F7B928] rounded-3xl flex flex-col items-center justify-center text-black font-black text-2xl uppercase tracking-widest shadow-2xl shadow-[#F7B928]/35 transition-transform duration-300 p-6 overflow-hidden group border border-black/10"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-black/15 pointer-events-none" />

            <div className="w-full flex justify-between items-center font-mono text-[10px] text-black/70 tracking-normal pb-4 border-b border-black/15">
              <span>AG_ENGINE</span>
              <span className="flex items-center gap-1 font-bold text-black">
                <span className="w-2 h-2 rounded-full bg-black animate-ping" />
                ACTIVE
              </span>
            </div>

            {/* Central 3D Canvas / Element Placeholder */}
            <div className="my-auto flex flex-col items-center justify-center">
              <div className="w-20 h-20 rounded-2xl bg-black text-[#F7B928] flex items-center justify-center text-3xl font-black mb-3 shadow-xl">
                32
              </div>
              <span className="text-xl font-extrabold tracking-widest text-black text-center">
                ANTI-GRAVITY
              </span>
              <span className="font-mono text-[10px] text-black/80 mt-1 tracking-normal font-semibold">
                3D CANVAS ENGINE
              </span>
            </div>

            <div className="w-full flex justify-between items-center font-mono text-[10px] text-black/70 pt-4 border-t border-black/15">
              <span>FPS: 60.0</span>
              <span>ZERO_BLOAT</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Dual CTA Buttons */}
        <div className="w-full max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 z-10 pt-4 border-t border-black/10">
          <div className="font-mono text-xs text-[#666] uppercase tracking-wider hidden sm:block">
            SCROLL TO ENGAGE HORIZONTAL TRACK ↓
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => scrollTo("#case-studies")}
              className="px-6 py-3 rounded-full bg-[#0D0D0D] text-white font-mono text-xs uppercase tracking-wider font-bold hover:bg-[#F7B928] hover:text-black transition-all duration-300 shadow-lg active:scale-95 cursor-pointer"
            >
              View Client Case Studies ↓
            </button>
            <button
              onClick={() => scrollTo("#audit")}
              className="px-6 py-3 rounded-full border border-black/20 text-[#0D0D0D] font-mono text-xs uppercase tracking-wider font-semibold hover:border-black hover:bg-black/5 transition-all duration-300 active:scale-95 cursor-pointer"
            >
              Schedule Store Audit →
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
