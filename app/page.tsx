"use client";

import { useRef } from "react";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import CaseStudiesPinned from "@/components/CaseStudiesPinned";
import ProcessPath from "@/components/ProcessPath";
import TrustSection from "@/components/TrustSection";
import FolderReviews from "@/components/FolderReviews";
import ConversionFooter from "@/components/ConversionFooter";
import { useSmoothScroll } from "@/components/SmoothScroll";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollTo } = useSmoothScroll();

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen bg-matte-dark text-cream selection:bg-accent-vermilion selection:text-cream overflow-x-hidden"
    >
      {/* Floating Minimalist Navigation */}
      <Navigation />

      {/* 1. HeroSection: Light #FAF8F5 with Circular Dark Mask Wipe Reveal and Scroll Pin */}
      <HeroSection />

      {/* 2. CaseStudiesPinned: Pinned Horizontal Scroll Track (300vw, 3 Distinct Slides, Velocity Skew) */}
      <CaseStudiesPinned />

      {/* Engineering Stack (#stack) */}
      <section
        id="stack"
        className="py-16 sm:py-24 md:py-32 px-4 sm:px-8 md:px-12 bg-cream text-matte-dark selection:bg-accent-vermilion selection:text-cream border-t border-cream/10"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">
            <div className="md:col-span-5">
              <span className="font-mono text-[10px] sm:text-xs text-accent-vermilion uppercase tracking-widest block mb-2 sm:mb-3">
                // 02. FULL-STACK FOUNDATION
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-normal leading-tight text-matte-dark mb-4 sm:mb-6">
                Engineered for <span className="italic">velocity</span> and zero layout jank.
              </h2>
              <p className="font-mono text-[10px] sm:text-xs text-matte-dark/60 leading-relaxed uppercase tracking-wider">
                REACT 19 • NEXT.JS 16 • TURBOPACK • LENIS • GSAP 3 • TAILWIND CSS
              </p>
            </div>

            <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="p-4 sm:p-6 bg-matte-dark text-cream border border-matte-dark">
                <span className="font-mono text-[10px] sm:text-xs text-accent-amber uppercase block mb-1.5 sm:mb-2">
                  RUNTIMES
                </span>
                <h4 className="font-header font-bold text-lg sm:text-xl mb-1.5 sm:mb-2">Next.js App Router</h4>
                <p className="text-cream/60 text-xs font-light leading-relaxed">
                  Server components, streaming SSR, and edge middleware deployed for instant global delivery.
                </p>
              </div>
              <div className="p-4 sm:p-6 bg-matte-dark text-cream border border-matte-dark">
                <span className="font-mono text-[10px] sm:text-xs text-accent-vermilion uppercase block mb-1.5 sm:mb-2">
                  CHOREOGRAPHY
                </span>
                <h4 className="font-header font-bold text-lg sm:text-xl mb-1.5 sm:mb-2">GSAP + Lenis Ticker</h4>
                <p className="text-cream/60 text-xs font-light leading-relaxed">
                  Smooth inertia unified with hardware-accelerated ScrollTrigger transforms locked at 60fps.
                </p>
              </div>
              <div className="p-4 sm:p-6 bg-matte-dark text-cream border border-matte-dark">
                <span className="font-mono text-[10px] sm:text-xs text-accent-amber uppercase block mb-1.5 sm:mb-2">
                  COMMERCE
                </span>
                <h4 className="font-header font-bold text-lg sm:text-xl mb-1.5 sm:mb-2">Shopify Storefront</h4>
                <p className="text-cream/60 text-xs font-light leading-relaxed">
                  High-throughput GraphQL pipelines bypassing default liquid bottlenecks for instantaneous checkout flows.
                </p>
              </div>
              <div className="p-4 sm:p-6 bg-matte-dark text-cream border border-matte-dark">
                <span className="font-mono text-[10px] sm:text-xs text-accent-vermilion uppercase block mb-1.5 sm:mb-2">
                  SYSTEM ARCHITECTURE
                </span>
                <h4 className="font-header font-bold text-lg sm:text-xl mb-1.5 sm:mb-2">Tailwind CSS v4</h4>
                <p className="text-cream/60 text-xs font-light leading-relaxed">
                  Strict design tokens, custom editorial typography palettes, and zero-runtime CSS bundle sizes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Interactive Process & Architecture Winding Path Section */}
      <ProcessPath />

      {/* 4. Mid-Page Narrative Anchor: Stand Out From The Noise */}
      <TrustSection />

      {/* 5. Signature Folder-Tab Review Deck (#reviews) */}
      <FolderReviews />

      {/* 6. Conversion Footer & Agency Dossier (#audit) */}
      <ConversionFooter />
    </div>
  );
}
