"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSmoothScroll } from "@/components/SmoothScroll";

export default function Hero() {
  const pinWrapperRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollTo } = useSmoothScroll();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Reveal Wipe Animation: Downward circle-clip expansion on load
      // Expands circle(0% at 50% 0%) down to full screen circle(150% at 50% 50%) over 1.4s using power3.inOut
      if (heroRef.current) {
        gsap.fromTo(
          heroRef.current,
          {
            clipPath: "circle(0% at 50% 0%)",
            opacity: 1,
          },
          {
            clipPath: "circle(150% at 50% 50%)",
            duration: 1.4,
            ease: "power3.inOut",
            onComplete: () => {
              if (heroRef.current) {
                gsap.set(heroRef.current, { clearProps: "clipPath" });
              }
            },
          }
        );
      }

      // 2. Parallax Float: Continuous subtle sine-wave floating bounce
      gsap.to(".badge-tl", {
        y: "+=12",
        rotation: "+=2",
        duration: 2.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(".badge-tr", {
        y: "-=14",
        rotation: "-=2",
        duration: 3.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 0.3,
      });

      gsap.to(".badge-bl", {
        y: "+=10",
        rotation: "-=1.5",
        duration: 2.6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 0.5,
      });

      gsap.to(".badge-br", {
        y: "-=12",
        rotation: "+=2",
        duration: 3.0,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 0.2,
      });

      // Subtle levitation for the anti-gravity centerpiece element
      gsap.to(".antigravity-element", {
        y: "-=14",
        rotationY: "+=6",
        duration: 3.4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // 3. Scroll Departure: Pin hero container briefly, scale down centerpiece & drift badges
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: pinWrapperRef.current,
          start: "top top",
          end: "+=80%",
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      scrollTl
        // Scale down center visual slightly & drift back
        .to(
          ".hero-center-stage",
          {
            scale: 0.85,
            opacity: 0.25,
            filter: "blur(6px)",
            ease: "power1.inOut",
          },
          0
        )
        // Drift floating badges outward (x/y offsets)
        .to(
          ".badge-tl",
          {
            x: -90,
            y: -60,
            opacity: 0,
            scale: 0.8,
            ease: "power1.inOut",
          },
          0
        )
        .to(
          ".badge-tr",
          {
            x: 90,
            y: -60,
            opacity: 0,
            scale: 0.8,
            ease: "power1.inOut",
          },
          0
        )
        .to(
          ".badge-bl",
          {
            x: -90,
            y: 60,
            opacity: 0,
            scale: 0.8,
            ease: "power1.inOut",
          },
          0
        )
        .to(
          ".badge-br",
          {
            x: 90,
            y: 60,
            opacity: 0,
            scale: 0.8,
            ease: "power1.inOut",
          },
          0
        )
        // Fade and lift headline smoothly before unlocking
        .to(
          ".hero-headline-wrap",
          {
            y: -60,
            opacity: 0,
            ease: "power1.inOut",
          },
          0
        )
        .to(
          ".hero-sub-wrap",
          {
            y: -40,
            opacity: 0,
            ease: "power1.inOut",
          },
          0
        );
    }, pinWrapperRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    // Outer Pinning Wrapper
    <div ref={pinWrapperRef} className="relative w-full overflow-hidden bg-[#0D0D0D]">
      {/* Container: Full screen with circular reveal animation */}
      <section
        ref={heroRef}
        id="hero"
        className="min-h-screen w-full relative overflow-hidden flex flex-col justify-between items-center text-center px-6 pt-32 pb-16 bg-[#0D0D0D]"
      >
        {/* Background Atmospheric Glow */}
        <div className="absolute inset-0 pointer-events-none -z-10 flex items-center justify-center">
          <div className="w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-accent-vermilion/15 via-accent-amber/10 to-transparent blur-[120px]" />
          <div className="absolute top-1/3 w-[300px] h-[300px] rounded-full bg-accent-amber/10 blur-[90px]" />
        </div>

        {/* 1. Center Headline Lockup */}
        <div className="hero-headline-wrap w-full max-w-5xl mx-auto z-10 flex flex-col items-center">
          {/* Engineering Monospace Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cream/[0.04] border border-cream/15 mb-6 font-mono text-[11px] text-accent-amber uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-amber animate-pulse" />
            BESPOKE COMMERCE ARCHITECTURE
          </div>

          <h1 className="font-extrabold tracking-tighter uppercase text-white text-5xl md:text-8xl leading-none">
            <span className="block font-header">COMMERCE ENGINES.</span>
            <span className="block font-serif italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-accent-amber via-cream to-accent-vermilion text-4xl sm:text-6xl md:text-7xl lg:text-8xl mt-2 md:mt-3">
              CUSTOM PRECISION.
            </span>
          </h1>
        </div>

        {/* 2. Center Visual Stage: w-[320px] md:w-[480px] h-[320px] md:h-[480px] */}
        <div className="hero-center-stage w-[320px] md:w-[480px] h-[320px] md:h-[480px] relative mx-auto my-6 flex items-center justify-center z-10">
          {/* Floating Metric Tag 1: Top-left -> ⚡ 0.8s LCP / 99 Lighthouse */}
          <div className="badge-tl absolute -top-2 md:top-4 -left-4 md:-left-16 z-20 pointer-events-auto">
            <div className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-matte-dark/90 backdrop-blur-md border border-cream/15 shadow-xl shadow-black/80 hover:border-accent-amber/50 transition-colors">
              <span className="text-accent-amber text-xs">⚡</span>
              <span className="font-mono text-xs font-semibold text-cream tracking-tight whitespace-nowrap">
                0.8s LCP <span className="text-cream/40">/</span> 99 Lighthouse
              </span>
            </div>
          </div>

          {/* Floating Metric Tag 2: Top-right -> 🛍️ Shopify Plus & Hydrogen */}
          <div className="badge-tr absolute -top-2 md:top-4 -right-4 md:-right-16 z-20 pointer-events-auto">
            <div className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-matte-dark/90 backdrop-blur-md border border-cream/15 shadow-xl shadow-black/80 hover:border-accent-amber/50 transition-colors">
              <span className="text-xs">🛍️</span>
              <span className="font-header text-xs font-bold text-cream tracking-wide whitespace-nowrap">
                Shopify Plus & Hydrogen
              </span>
            </div>
          </div>

          {/* Floating Metric Tag 3: Bottom-left -> ⚙️ Full-Stack APIs & React */}
          <div className="badge-bl absolute -bottom-2 md:bottom-4 -left-4 md:-left-16 z-20 pointer-events-auto">
            <div className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-matte-dark/90 backdrop-blur-md border border-cream/15 shadow-xl shadow-black/80 hover:border-accent-vermilion/50 transition-colors">
              <span className="text-xs">⚙️</span>
              <span className="font-mono text-xs font-semibold text-cream tracking-tight whitespace-nowrap">
                Full-Stack APIs & React
              </span>
            </div>
          </div>

          {/* Floating Metric Tag 4: Bottom-right -> 📈 +240% Conv Rate */}
          <div className="badge-br absolute -bottom-2 md:bottom-4 -right-4 md:-right-16 z-20 pointer-events-auto">
            <div className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-matte-dark/90 backdrop-blur-md border border-cream/15 shadow-xl shadow-black/80 hover:border-accent-vermilion/50 transition-colors">
              <span className="text-xs">📈</span>
              <span className="font-mono text-xs font-bold text-accent-vermilion tracking-tight whitespace-nowrap">
                +240% Conv Rate
              </span>
            </div>
          </div>

          {/* Dedicated 3D Canvas / Anti-Gravity Stage */}
          <div className="antigravity-element relative w-full h-full flex items-center justify-center">
            {/* Concentric Orbital Rings */}
            <div
              className="absolute w-64 h-64 md:w-96 md:h-96 rounded-full border border-cream/15 animate-[spin_28s_linear_infinite]"
              style={{ transform: "rotateX(70deg) rotateZ(30deg)" }}
            />
            <div
              className="absolute w-72 h-72 md:w-[420px] md:h-[420px] rounded-full border border-dashed border-accent-amber/25 animate-[spin_36s_linear_infinite_reverse]"
              style={{ transform: "rotateX(62deg) rotateY(25deg)" }}
            />

            {/* Radiant Core Glow */}
            <div className="absolute w-40 h-40 md:w-56 md:h-56 rounded-full bg-gradient-to-tr from-accent-vermilion/30 via-accent-amber/25 to-transparent blur-3xl pointer-events-none" />

            {/* Anti-Gravity Kinetic Core Polyhedron */}
            <div className="relative w-36 h-36 md:w-48 md:h-48 rounded-3xl bg-gradient-to-b from-cream/[0.1] to-matte-dark/90 backdrop-blur-xl border border-cream/20 shadow-2xl flex flex-col items-center justify-between p-4 group">
              <div className="w-full flex justify-between items-center font-mono text-[9px] text-cream/40 border-b border-cream/10 pb-1.5">
                <span>3D_ENGINE</span>
                <span className="text-accent-amber flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-amber animate-ping inline-block" />
                  ONLINE
                </span>
              </div>

              {/* Floating Center Insignia */}
              <div className="relative w-16 h-16 md:w-20 md:h-20 flex items-center justify-center">
                <div className="absolute inset-0 rounded-2xl border border-accent-vermilion/40 rotate-12 animate-[spin_12s_linear_infinite]" />
                <div className="absolute inset-1 rounded-2xl border border-accent-amber/40 -rotate-6 animate-[spin_16s_linear_infinite_reverse]" />
                <div className="w-9 h-9 md:w-11 md:h-11 rounded-xl bg-gradient-to-br from-accent-vermilion to-accent-amber flex items-center justify-center shadow-lg shadow-accent-vermilion/50">
                  <span className="font-header font-black text-sm md:text-base text-matte-dark">32</span>
                </div>
              </div>

              <div className="w-full flex justify-between items-center font-mono text-[9px] text-cream/50 pt-1.5 border-t border-cream/10">
                <span>GRAVITY: 0.0G</span>
                <span className="text-accent-vermilion">60 FPS</span>
              </div>
            </div>

            {/* Levitating Shadow */}
            <div className="absolute -bottom-10 w-44 h-6 rounded-full bg-black/70 blur-md -z-10" />
          </div>
        </div>

        {/* 3. Subheadline & Distinct Action CTAs */}
        <div className="hero-sub-wrap w-full max-w-2xl mx-auto z-10 flex flex-col items-center gap-6">
          <p className="font-mono text-xs md:text-sm text-cream/70 leading-relaxed uppercase tracking-wider max-w-xl">
            We architect Shopify Plus stores and bespoke web systems for high-growth brands.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <button
              onClick={() => scrollTo("#case-studies")}
              className="px-6 py-3.5 rounded-full bg-cream text-matte-dark font-mono text-xs uppercase tracking-wider font-bold hover:bg-accent-amber hover:text-matte-dark transition-all duration-300 shadow-lg shadow-cream/10 active:scale-95 cursor-pointer"
            >
              Explore Case Studies ↓
            </button>
            <button
              onClick={() => scrollTo("#audit")}
              className="px-6 py-3.5 rounded-full border border-cream/25 text-cream font-mono text-xs uppercase tracking-wider hover:border-accent-vermilion hover:text-accent-vermilion hover:bg-accent-vermilion/5 transition-all duration-300 active:scale-95 cursor-pointer"
            >
              Book Dev Sprint →
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
