"use client";

import React, { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "lenis/dist/lenis.css";

export interface SmoothScrollContextType {
  lenis: Lenis | null;
  scrollTo: (
    target: string | number | HTMLElement,
    options?: Parameters<Lenis["scrollTo"]>[1]
  ) => void;
}

const SmoothScrollContext = createContext<SmoothScrollContextType>({
  lenis: null,
  scrollTo: () => {},
});

/**
 * Hook to access the global Lenis smooth scrolling instance and utility functions.
 */
export const useSmoothScroll = () => useContext(SmoothScrollContext);
export const useLenis = useSmoothScroll;

export interface SmoothScrollProps {
  children: ReactNode;
}

/**
 * SmoothScroll client wrapper that initializes Lenis and synchronizes it
 * with GSAP ScrollTrigger via gsap.ticker for high-performance 60fps smooth scrolling.
 */
export default function SmoothScroll({ children }: SmoothScrollProps) {
  const [lenisInstance, setLenisInstance] = useState<Lenis | null>(null);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Register GSAP ScrollTrigger plugin on client
    gsap.registerPlugin(ScrollTrigger);

    // 1. Initialize Lenis with custom luxury deceleration easing
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenis;
    setLenisInstance(lenis);

    // 2. Synchronize Lenis scroll events with ScrollTrigger.update()
    const handleScroll = () => {
      ScrollTrigger.update();
    };
    lenis.on("scroll", handleScroll);

    // 3. Drive Lenis through GSAP ticker for frame-rate consistency (60+ fps)
    // Note: GSAP ticker supplies elapsed time in seconds; lenis.raf expects milliseconds
    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerCallback);

    // 4. Disable lag smoothing to prevent visual jumps during scroll
    gsap.ticker.lagSmoothing(0);

    // Initial recalculation
    ScrollTrigger.refresh();

    // 5. Clean up on unmount to prevent memory leaks and orphaned tickers
    return () => {
      gsap.ticker.remove(tickerCallback);
      lenis.off("scroll", handleScroll);
      lenis.destroy();
      lenisRef.current = null;
      setLenisInstance(null);
    };
  }, []);

  const scrollTo = (
    target: string | number | HTMLElement,
    options?: Parameters<Lenis["scrollTo"]>[1]
  ) => {
    lenisRef.current?.scrollTo(target, options);
  };

  return (
    <SmoothScrollContext.Provider value={{ lenis: lenisInstance, scrollTo }}>
      {children}
    </SmoothScrollContext.Provider>
  );
}
