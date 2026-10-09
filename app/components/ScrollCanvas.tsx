"use client";

import React, { useEffect, useRef, useCallback } from "react";
import Lenis from "lenis";

interface ScrollCanvasProps {
  totalFrames?: number;
  containerRef: React.RefObject<HTMLDivElement | null>;
  onFrameUpdate?: (frameIndex: number, progress: number) => void;
}

interface CoverDimensions {
  renderW: number;
  renderH: number;
  shiftX: number;
  shiftY: number;
}

export default function ScrollCanvas({
  totalFrames = 150,
  containerRef,
  onFrameUpdate,
}: ScrollCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const loadedFlagsRef = useRef<boolean[]>([]);
  const currentFrameRef = useRef<number>(1);
  const targetFrameRef = useRef<number>(1);
  const lastRenderedIndexRef = useRef<number>(-1);
  const animationFrameIdRef = useRef<number | null>(null);
  const isReducedMotionRef = useRef<boolean>(false);
  const coverDimensionsRef = useRef<CoverDimensions>({
    renderW: 0,
    renderH: 0,
    shiftX: 0,
    shiftY: 0,
  });
  const isVisibleRef = useRef<boolean>(true);
  const lastTimeRef = useRef<number>(performance.now());
  const lenisRef = useRef<Lenis | null>(null);

  // Helper to format frame path
  const getFrameUrl = useCallback((index: number) => {
    const padded = String(index).padStart(3, "0");
    return `/frames/frame-${padded}.png`;
  }, []);

  // Pre-calculate cover dimensions once on resize to avoid per-frame math
  const recalculateCoverDimensions = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const cw = canvas.width;
    const ch = canvas.height;
    // Known native frame dimensions (1920 x 1080)
    const iw = 1920;
    const ih = 1080;

    const hRatio = cw / iw;
    const vRatio = ch / ih;
    const ratio = Math.max(hRatio, vRatio);

    const renderW = Math.round(iw * ratio);
    const renderH = Math.round(ih * ratio);
    const shiftX = Math.round((cw - renderW) / 2);
    const shiftY = Math.round((ch - renderH) / 2);

    coverDimensionsRef.current = { renderW, renderH, shiftX, shiftY };
  }, []);

  // High-performance canvas paint with precomputed coordinates
  const drawImageToCanvas = useCallback((img: HTMLImageElement) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", {
      alpha: false,
      desynchronized: true,
    });
    if (!ctx) return;

    const { renderW, renderH, shiftX, shiftY } = coverDimensionsRef.current;
    if (renderW <= 0 || renderH <= 0) return;

    ctx.drawImage(img, shiftX, shiftY, renderW, renderH);
  }, []);

  // Render the current frame or the nearest loaded fallback frame
  const renderFrame = useCallback(
    (frameIndex: number) => {
      const roundedIndex = Math.min(
        totalFrames,
        Math.max(1, Math.round(frameIndex))
      );

      // Fast path: exact frame loaded and ready
      const exactImg = imagesRef.current[roundedIndex];
      if (exactImg && loadedFlagsRef.current[roundedIndex]) {
        if (lastRenderedIndexRef.current !== roundedIndex) {
          drawImageToCanvas(exactImg);
          lastRenderedIndexRef.current = roundedIndex;
        }
        return;
      }

      // Fallback path: find nearest loaded frame to eliminate flicker
      let bestIndex = -1;
      let minDistance = Infinity;
      for (let i = 1; i <= totalFrames; i++) {
        if (loadedFlagsRef.current[i] && imagesRef.current[i]) {
          const dist = Math.abs(i - roundedIndex);
          if (dist < minDistance) {
            minDistance = dist;
            bestIndex = i;
            if (dist <= 1) break; // Close enough to avoid full scan
          }
        }
      }

      if (bestIndex !== -1 && imagesRef.current[bestIndex]) {
        drawImageToCanvas(imagesRef.current[bestIndex]!);
        lastRenderedIndexRef.current = bestIndex;
      }
    },
    [totalFrames, drawImageToCanvas]
  );

  // Update canvas resolution for Retina / DPR screens
  const updateCanvasDimensions = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();
    const newWidth = Math.round(rect.width * dpr);
    const newHeight = Math.round(rect.height * dpr);

    if (canvas.width !== newWidth || canvas.height !== newHeight) {
      canvas.width = newWidth;
      canvas.height = newHeight;
      recalculateCoverDimensions();
      lastRenderedIndexRef.current = -1;
      renderFrame(currentFrameRef.current);
    }
  }, [recalculateCoverDimensions, renderFrame]);

  // Main continuous render / lerp loop with delta-time normalization
  useEffect(() => {
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      isReducedMotionRef.current = mediaQuery.matches;
      const handleMotionChange = (e: MediaQueryListEvent) => {
        isReducedMotionRef.current = e.matches;
      };
      mediaQuery.addEventListener("change", handleMotionChange);
    }

    let isRunning = true;
    lastTimeRef.current = performance.now();

    const tick = (now: number) => {
      if (!isRunning) return;

      const dt = Math.min((now - lastTimeRef.current) / 1000, 0.1);
      lastTimeRef.current = now;

      // Only animate if the hero is visible on screen
      if (isVisibleRef.current) {
        if (isReducedMotionRef.current) {
          currentFrameRef.current = targetFrameRef.current;
        } else {
          // Delta-time normalized exponential smoothing (Apple ProMotion 120Hz ready)
          const damping = 1 - Math.exp(-14 * dt);
          const diff = targetFrameRef.current - currentFrameRef.current;
          if (Math.abs(diff) > 0.005) {
            currentFrameRef.current += diff * damping;
          } else {
            currentFrameRef.current = targetFrameRef.current;
          }
        }

        renderFrame(currentFrameRef.current);
      }

      animationFrameIdRef.current = requestAnimationFrame(tick);
    };

    animationFrameIdRef.current = requestAnimationFrame(tick);

    return () => {
      isRunning = false;
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, [renderFrame]);

  // Progressive image preloader with asynchronous off-thread decode
  useEffect(() => {
    imagesRef.current = new Array(totalFrames + 1).fill(null);
    loadedFlagsRef.current = new Array(totalFrames + 1).fill(false);

    const loadImage = (index: number): Promise<void> => {
      return new Promise((resolve) => {
        const img = new window.Image();
        img.src = getFrameUrl(index);
        imagesRef.current[index] = img;

        img.onload = async () => {
          try {
            // Asynchronously decodes image off the main UI thread!
            if ("decode" in img) {
              await img.decode();
            }
          } catch {
            // Fallback gracefully
          }
          loadedFlagsRef.current[index] = true;
          if (index === 1) {
            updateCanvasDimensions();
            renderFrame(1);
          }
          resolve();
        };

        img.onerror = () => resolve();
      });
    };

    // Step 1: Preload Frame 1 immediately
    loadImage(1).then(() => {
      // Step 2: Preload milestone keyframes across the sequence
      const milestones = [15, 30, 45, 60, 75, 90, 105, 120, 135, 150];
      milestones.forEach((idx) => {
        if (!imagesRef.current[idx]) loadImage(idx);
      });

      // Step 3: Stream all remaining frames progressively with concurrency
      let nextIndex = 2;
      const concurrency = 6;
      let activeLoads = 0;

      const loadNext = () => {
        while (activeLoads < concurrency && nextIndex <= totalFrames) {
          const idx = nextIndex++;
          if (!imagesRef.current[idx]) {
            activeLoads++;
            loadImage(idx).then(() => {
              activeLoads--;
              loadNext();
            });
          }
        }
      };

      loadNext();
    });

    updateCanvasDimensions();
    window.addEventListener("resize", updateCanvasDimensions);

    return () => {
      window.removeEventListener("resize", updateCanvasDimensions);
    };
  }, [totalFrames, getFrameUrl, renderFrame, updateCanvasDimensions]);

  // Scroll mapping & Lenis smooth scroll engine
  useEffect(() => {
    // Initialize Lenis momentum smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });
    lenisRef.current = lenis;

    const handleScrollUpdate = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const containerHeight = rect.height;
      const viewportHeight = window.innerHeight;
      const totalScrollableDistance = containerHeight - viewportHeight;

      if (totalScrollableDistance <= 0) return;

      const rawProgress = -rect.top / totalScrollableDistance;
      const progress = Math.min(Math.max(rawProgress, 0), 1);

      const target = 1 + progress * (totalFrames - 1);
      targetFrameRef.current = target;

      if (onFrameUpdate) {
        onFrameUpdate(Math.round(target), progress);
      }
    };

    lenis.on("scroll", handleScrollUpdate);
    window.addEventListener("scroll", handleScrollUpdate, { passive: true });

    // RAF loop for Lenis
    let lenisRafId: number;
    const lenisTick = (time: number) => {
      lenis.raf(time);
      lenisRafId = requestAnimationFrame(lenisTick);
    };
    lenisRafId = requestAnimationFrame(lenisTick);

    // Initial sync
    handleScrollUpdate();

    // IntersectionObserver to suspend canvas when off-screen
    let observer: IntersectionObserver | null = null;
    if (containerRef.current && typeof IntersectionObserver !== "undefined") {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            isVisibleRef.current = entry.isIntersecting;
          });
        },
        { threshold: 0.01 }
      );
      observer.observe(containerRef.current);
    }

    return () => {
      if (lenisRef.current) {
        lenisRef.current.destroy();
      }
      cancelAnimationFrame(lenisRafId);
      window.removeEventListener("scroll", handleScrollUpdate);
      if (observer) observer.disconnect();
    };
  }, [containerRef, totalFrames, onFrameUpdate]);

  return (
    <div
      className="absolute inset-0 w-full h-full pointer-events-none select-none"
      style={{
        willChange: "transform",
        transform: "translate3d(0, 0, 0)",
        contain: "paint layout",
      }}
    >
      {/* Pinned full-screen HTML5 Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full object-cover block"
        style={{
          imageRendering: "auto",
        }}
      />

      {/* Cinematic dark luxury tone overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-transparent to-[#050508]/80 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#050508]/90 via-[#050508]/30 to-[#050508]/75 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_35%,#050508_95%)] pointer-events-none" />

      {/* Deep gold/warm luxury ambient lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_70%,rgba(217,119,6,0.06),transparent_60%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_35%,rgba(168,85,247,0.08),transparent_55%)] pointer-events-none" />
    </div>
  );
}
