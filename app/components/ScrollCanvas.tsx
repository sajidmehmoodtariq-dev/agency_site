"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";

interface ScrollCanvasProps {
  totalFrames?: number;
  containerRef: React.RefObject<HTMLDivElement | null>;
  onFrameUpdate?: (frameIndex: number, progress: number) => void;
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

  // Helper to format frame path
  const getFrameUrl = useCallback((index: number) => {
    const padded = String(index).padStart(3, "0");
    return `/frames/frame-${padded}.png`;
  }, []);

  // Draw a specific frame onto the canvas using object-fit: cover math
  const drawImageToCanvas = useCallback(
    (img: HTMLImageElement) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d", { alpha: false });
      if (!ctx) return;

      const cw = canvas.width;
      const ch = canvas.height;
      const iw = img.naturalWidth || img.width;
      const ih = img.naturalHeight || img.height;

      if (!iw || !ih) return;

      // Cover aspect ratio
      const hRatio = cw / iw;
      const vRatio = ch / ih;
      const ratio = Math.max(hRatio, vRatio);

      const renderW = iw * ratio;
      const renderH = ih * ratio;
      const shiftX = (cw - renderW) / 2;
      const shiftY = (ch - renderH) / 2;

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(img, 0, 0, iw, ih, shiftX, shiftY, renderW, renderH);
    },
    []
  );

  // Render the current frame or the nearest loaded fallback frame
  const renderFrame = useCallback(
    (frameIndex: number) => {
      const roundedIndex = Math.min(
        totalFrames,
        Math.max(1, Math.round(frameIndex))
      );

      // Try exact frame
      const exactImg = imagesRef.current[roundedIndex];
      if (exactImg && loadedFlagsRef.current[roundedIndex]) {
        if (lastRenderedIndexRef.current !== roundedIndex) {
          drawImageToCanvas(exactImg);
          lastRenderedIndexRef.current = roundedIndex;
        }
        return;
      }

      // If exact frame not loaded yet, find nearest loaded frame to eliminate flicker
      let bestIndex = -1;
      let minDistance = Infinity;
      for (let i = 1; i <= totalFrames; i++) {
        if (loadedFlagsRef.current[i] && imagesRef.current[i]) {
          const dist = Math.abs(i - roundedIndex);
          if (dist < minDistance) {
            minDistance = dist;
            bestIndex = i;
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
      // Force repaint
      lastRenderedIndexRef.current = -1;
      renderFrame(currentFrameRef.current);
    }
  }, [renderFrame]);

  // Main continuous render / lerp loop
  useEffect(() => {
    // Check prefers-reduced-motion
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      isReducedMotionRef.current = mediaQuery.matches;
      const handleMotionChange = (e: MediaQueryListEvent) => {
        isReducedMotionRef.current = e.matches;
      };
      mediaQuery.addEventListener("change", handleMotionChange);
    }

    let isRunning = true;

    const tick = () => {
      if (!isRunning) return;

      if (isReducedMotionRef.current) {
        currentFrameRef.current = targetFrameRef.current;
      } else {
        // Silky smooth Apple-style lerp interpolation
        const diff = targetFrameRef.current - currentFrameRef.current;
        if (Math.abs(diff) > 0.005) {
          currentFrameRef.current += diff * 0.12;
        } else {
          currentFrameRef.current = targetFrameRef.current;
        }
      }

      renderFrame(currentFrameRef.current);
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

  // Progressive image preloader
  useEffect(() => {
    imagesRef.current = new Array(totalFrames + 1).fill(null);
    loadedFlagsRef.current = new Array(totalFrames + 1).fill(false);

    // 1. Immediately preload Frame 1 for zero-wait initial render
    const frame1 = new window.Image();
    frame1.src = getFrameUrl(1);
    imagesRef.current[1] = frame1;
    frame1.onload = () => {
      loadedFlagsRef.current[1] = true;
      updateCanvasDimensions();
      renderFrame(1);
    };

    // 2. Preload remaining frames progressively in batches
    const loadRemainingFrames = () => {
      // Step A: Preload key milestones first (every 5th frame)
      const keyframes: number[] = [];
      for (let i = 5; i <= totalFrames; i += 5) {
        keyframes.push(i);
      }

      keyframes.forEach((index) => {
        if (!imagesRef.current[index]) {
          const img = new window.Image();
          img.src = getFrameUrl(index);
          imagesRef.current[index] = img;
          img.onload = () => {
            loadedFlagsRef.current[index] = true;
          };
        }
      });

      // Step B: Progressively fill in the rest
      let currentIndex = 2;
      const loadNextBatch = () => {
        const batchSize = 6;
        let loadedInBatch = 0;

        while (currentIndex <= totalFrames && loadedInBatch < batchSize) {
          const idx = currentIndex;
          currentIndex++;
          if (!imagesRef.current[idx]) {
            const img = new window.Image();
            img.src = getFrameUrl(idx);
            imagesRef.current[idx] = img;
            img.onload = () => {
              loadedFlagsRef.current[idx] = true;
            };
            loadedInBatch++;
          }
        }

        if (currentIndex <= totalFrames) {
          if ("requestIdleCallback" in window) {
            (window as any).requestIdleCallback(loadNextBatch, { timeout: 200 });
          } else {
            setTimeout(loadNextBatch, 30);
          }
        }
      };

      setTimeout(loadNextBatch, 50);
    };

    // Start loading subsequent frames
    loadRemainingFrames();

    // Initial resize
    updateCanvasDimensions();
    window.addEventListener("resize", updateCanvasDimensions);

    return () => {
      window.removeEventListener("resize", updateCanvasDimensions);
    };
  }, [totalFrames, getFrameUrl, renderFrame, updateCanvasDimensions]);

  // Scroll listener mapped directly to container progress
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const containerHeight = rect.height;
      const viewportHeight = window.innerHeight;
      const totalScrollableDistance = containerHeight - viewportHeight;

      if (totalScrollableDistance <= 0) return;

      // Scroll progress strictly from 0 to 1
      const rawProgress = -rect.top / totalScrollableDistance;
      const progress = Math.min(Math.max(rawProgress, 0), 1);

      // Map progress to frame index: 0% -> 1, 100% -> totalFrames
      const target = 1 + progress * (totalFrames - 1);
      targetFrameRef.current = target;

      if (onFrameUpdate) {
        onFrameUpdate(Math.round(target), progress);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Run once on mount to establish position
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [containerRef, totalFrames, onFrameUpdate]);

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none select-none">
      {/* Pinned full-screen HTML5 Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full object-cover block"
      />

      {/* Cinematic dark luxury tone overlays to eliminate visible edges */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-transparent to-[#050508]/80 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#050508]/90 via-[#050508]/30 to-[#050508]/75 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_35%,#050508_95%)] pointer-events-none" />
      
      {/* Subtle deep gold/warm luxury ambient lighting matching visual direction */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_70%,rgba(217,119,6,0.06),transparent_60%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_35%,rgba(168,85,247,0.08),transparent_55%)] pointer-events-none" />
    </div>
  );
}
