"use client";

import React, { useState, useEffect } from "react";
import { useSmoothScroll } from "@/components/SmoothScroll";

export default function Navigation() {
  const { scrollTo } = useSmoothScroll();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-3 sm:top-5 left-0 right-0 z-50 flex justify-center px-3 sm:px-4 pointer-events-none">
      <nav
        aria-label="Main Navigation"
        className={`pointer-events-auto flex items-center justify-between gap-3 sm:gap-6 md:gap-10 px-3.5 sm:px-6 md:px-8 py-2.5 sm:py-3.5 rounded-full transition-all duration-500 border max-w-[calc(100vw-1.5rem)] sm:max-w-none ${
          scrolled
            ? "bg-matte-dark/95 backdrop-blur-xl border-cream/15 shadow-2xl shadow-black/80"
            : "bg-matte-dark/80 backdrop-blur-lg border-cream/10"
        }`}
      >
        {/* Editorial Logo */}
        <button
          onClick={() => scrollTo("#hero")}
          className="flex items-center gap-2 group cursor-pointer text-left flex-shrink-0"
        >
          <div className="relative w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-cream/10 border border-cream/20 flex items-center justify-center overflow-hidden">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-accent-vermilion group-hover:scale-125 transition-transform duration-300" />
            <div className="absolute inset-0 bg-accent-amber/20 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <span className="font-header font-extrabold text-xs sm:text-sm tracking-wider text-cream uppercase">
            STUDIO<span className="text-accent-amber font-mono font-light ml-0.5">32</span>
          </span>
        </button>

        {/* Minimalist Navigation Links (Desktop) */}
        <div className="hidden lg:flex items-center gap-7 font-mono text-[11px] uppercase tracking-widest text-cream/70">
          <button
            onClick={() => scrollTo("#case-studies")}
            className="hover:text-cream transition-colors cursor-pointer relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-accent-amber hover:after:w-full after:transition-all"
          >
            Case Studies
          </button>
          <button
            onClick={() => scrollTo("#stack")}
            className="hover:text-cream transition-colors cursor-pointer relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-accent-amber hover:after:w-full after:transition-all"
          >
            Stack
          </button>
          <button
            onClick={() => scrollTo("#process")}
            className="hover:text-cream transition-colors cursor-pointer relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-accent-amber hover:after:w-full after:transition-all"
          >
            Process
          </button>
          <button
            onClick={() => scrollTo("#reviews")}
            className="hover:text-cream transition-colors cursor-pointer relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-accent-amber hover:after:w-full after:transition-all"
          >
            Reviews
          </button>
        </div>

        {/* High-Contrast CTA Button */}
        <button
          onClick={() => scrollTo("#audit")}
          className="relative group overflow-hidden px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full bg-accent-vermilion text-cream font-mono text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider transition-all duration-300 hover:shadow-lg hover:shadow-accent-vermilion/30 active:scale-95 cursor-pointer flex-shrink-0"
        >
          <span className="relative z-10 flex items-center gap-1 sm:gap-1.5 text-cream group-hover:text-matte-dark transition-colors duration-300">
            <span>Book Audit</span>
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-0.5">
              →
            </span>
          </span>
          <span className="absolute inset-0 bg-accent-amber transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
        </button>
      </nav>
    </header>
  );
}
