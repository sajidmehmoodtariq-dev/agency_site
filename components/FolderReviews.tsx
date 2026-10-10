"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface ReviewCard {
  id: string;
  tabLabel: string;
  quote: string;
  author: string;
  role: string;
  storeName: string;
  storeUrl: string;
}

const reviewsList: ReviewCard[] = [
  {
    id: "01",
    tabLabel: "SHOPIFY PLUS // 01",
    quote:
      "Our load times dropped from 4.2s to 0.7s, and conversion jumped 38% in the first 30 days after re-architecting our storefront.",
    author: "Marcus Vance",
    role: "Founder & CTO",
    storeName: "Valo Eyewear",
    storeUrl: "https://valo-optics.com",
  },
  {
    id: "02",
    tabLabel: "CUSTOM HEADLESS // 02",
    quote:
      "The custom 3D configurator operates at a locked 60fps with zero layout jank. It transformed our high-ticket luxury checkout flow.",
    author: "Elena Rostova",
    role: "Brand Director",
    storeName: "Kanso Studio",
    storeUrl: "https://kanso-studio.store",
  },
  {
    id: "03",
    tabLabel: "ENTERPRISE B2B // 03",
    quote:
      "Sub-50ms edge rendering and instant cart reconciliation handled over $4.2M in peak holiday volume with 99.99% uptime.",
    author: "Julian Sterling",
    role: "Head of Product",
    storeName: "ChronoLab Global",
    storeUrl: "https://chronolab.tech",
  },
  {
    id: "04",
    tabLabel: "DTC LIQUID // 04",
    quote:
      "Zero template bloat. The bespoke theme slashed 2.4MB off our bundle size, driving mobile checkout speed to the top 1% of Shopify stores.",
    author: "Sophia Lin",
    role: "VP Engineering",
    storeName: "Aether Apparel",
    storeUrl: "https://aether-apparel.co",
  },
  {
    id: "05",
    tabLabel: "GRAPHQL API // 05",
    quote:
      "Bypassing liquid limits through custom storefront microservices unlocked global multi-currency transactions without third-party app lags.",
    author: "David Moreau",
    role: "E-Commerce Director",
    storeName: "Apex Goods",
    storeUrl: "https://apex-goods.io",
  },
  {
    id: "06",
    tabLabel: "FULL-STACK // 06",
    quote:
      "Working with Studio 32 felt like pairing with elite software engineers, not a traditional agency. Flawless execution and zero fluff.",
    author: "Clara Bennett",
    role: "Operations VP",
    storeName: "Maison Orpheo",
    storeUrl: "https://orpheo-paris.com",
  },
];

// Individual Interactive Folder Card with 3D Tilt & Tab Unclip
function FolderCardItem({ item, index }: { item: ReviewCard; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const tabRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLParagraphElement>(null);
  const badgeRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    // QuickTo physics setters
    const rotXTo = gsap.quickTo(card, "rotateX", { duration: 0.35, ease: "power2.out" });
    const rotYTo = gsap.quickTo(card, "rotateY", { duration: 0.35, ease: "power2.out" });

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const mouseX = e.clientX - (rect.left + rect.width / 2);
      const mouseY = e.clientY - (rect.top + rect.height / 2);

      // Max rotational tilt ±6deg
      const rotX = (-mouseY / (rect.height / 2)) * 6;
      const rotY = (mouseX / (rect.width / 2)) * 6;

      rotXTo(rotX);
      rotYTo(rotY);

      // Counter-shift dynamic drop shadow based on mouse angle
      const shadowX = Math.round(6 + (mouseX / rect.width) * 8);
      const shadowY = Math.round(6 + (mouseY / rect.height) * 10);
      card.style.boxShadow = `${shadowX}px ${shadowY}px 0px #000`;
    };

    const handleMouseEnter = () => {
      // Kinetic folder tab unclip: tab translates -8px, scales 1.03
      if (tabRef.current) {
        gsap.to(tabRef.current, {
          y: -8,
          scale: 1.03,
          duration: 0.25,
          ease: "power2.out",
        });
      }
      // Inner quote lifts subtly
      if (quoteRef.current) {
        gsap.to(quoteRef.current, {
          y: -2,
          duration: 0.25,
          ease: "power2.out",
        });
      }
      // Status pill switches border to pure black
      if (badgeRef.current) {
        badgeRef.current.style.borderColor = "#000";
        badgeRef.current.style.backgroundColor = "rgba(0, 0, 0, 0.18)";
      }
    };

    const handleMouseLeave = () => {
      rotXTo(0);
      rotYTo(0);
      card.style.boxShadow = "6px 6px 0px #000";

      if (tabRef.current) {
        gsap.to(tabRef.current, {
          y: 0,
          scale: 1,
          duration: 0.2,
          ease: "power2.out",
        });
      }
      if (quoteRef.current) {
        gsap.to(quoteRef.current, {
          y: 0,
          duration: 0.2,
          ease: "power2.out",
        });
      }
      if (badgeRef.current) {
        badgeRef.current.style.borderColor = "rgba(0, 0, 0, 0.15)";
        badgeRef.current.style.backgroundColor = "rgba(0, 0, 0, 0.1)";
      }
    };

    card.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseenter", handleMouseEnter);
    card.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      card.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("mouseenter", handleMouseEnter);
      card.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div
      className="folder-card-wrapper relative flex flex-col cursor-pointer will-change-transform"
      style={{ perspective: "1000px" }}
    >
      {/* 3. The Tab: Authentic folder tab positioned at top left */}
      <div
        ref={tabRef}
        className="w-36 h-7 bg-[#111] text-[#FAF8F5] text-[11px] font-mono font-bold tracking-wider uppercase px-3 py-1.5 rounded-t-lg flex items-center justify-between border-t border-x border-black will-change-transform select-none"
      >
        <span>{item.tabLabel}</span>
        <span className="w-1.5 h-1.5 rounded-full bg-[#F7B928] animate-pulse" />
      </div>

      {/* 2. The Body: Rich amber-yellow file folder surface with dynamic brutalist shadow */}
      <div
        ref={cardRef}
        className="bg-[#F7B928] text-black p-6 rounded-tr-xl rounded-b-xl border-2 border-black shadow-[6px_6px_0px_#000] flex flex-col justify-between min-h-[230px] will-change-transform"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Rating Row & Verified Badge */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <span className="text-black text-sm tracking-wider font-black">★★★★★</span>
            <span
              ref={badgeRef}
              className="px-2.5 py-0.5 rounded-md bg-black/10 border border-black/15 font-mono text-[9px] font-bold text-black uppercase transition-colors duration-200"
            >
              VERIFIED DEPLOYMENT
            </span>
          </div>

          {/* High-Impact Bold Quote */}
          <p
            ref={quoteRef}
            className="font-serif italic text-base md:text-lg font-bold text-black/95 leading-relaxed mb-6 will-change-transform"
          >
            &ldquo;{item.quote}&rdquo;
          </p>
        </div>

        {/* Bottom Attribution Row */}
        <div className="pt-4 border-t border-black/20 flex items-end justify-between gap-2">
          <div>
            <span className="font-header font-black text-sm block text-black">{item.author}</span>
            <span className="font-mono text-[10px] text-black/75 font-semibold block uppercase">
              {item.role} • {item.storeName}
            </span>
          </div>

          {/* External Store Link Pill */}
          <a
            href={item.storeUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="px-3 py-1.5 rounded-full bg-black text-[#F7B928] font-mono text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 hover:bg-white hover:text-black transition-colors shadow-sm"
          >
            <span>Visit Store</span>
            <span className="text-xs">↗</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default function FolderReviews() {
  const sectionRef = useRef<HTMLElement>(null);
  const reviewsContainerRef = useRef<HTMLDivElement>(null);
  const topTapeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Scroll-Driven Stagger & Fan-Out Entrance
      const cards = gsap.utils.toArray<HTMLElement>(".folder-card-wrapper");

      // Initial Fan-Out Deal States
      cards.forEach((card, i) => {
        const altRotate = i % 2 === 0 ? -3 : 3;
        gsap.set(card, {
          opacity: 0,
          y: 80,
          scale: 0.92,
          rotation: altRotate,
        });
      });

      // Animate cards onto grid like physical dossiers
      gsap.to(cards, {
        opacity: 1,
        y: 0,
        scale: 1,
        rotation: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: reviewsContainerRef.current,
          start: "top 75%",
          once: true,
        },
      });

      // Top Ribbon: Angled at -2deg, sliding left at a calm, readable pace
      gsap.to(".top-tape-track", {
        xPercent: -50,
        duration: 55,
        ease: "none",
        repeat: -1,
      });
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  const marqueeText =
    "/// ZERO BLOAT /// SUB-SECOND TTI /// CUSTOM SHOPIFY APPS /// HEADLESS NEXT.JS /// 99+ LIGHTHOUSE /// ".repeat(
      6
    );

  return (
    <section
      ref={sectionRef}
      id="reviews"
      className="relative w-full bg-[#FAF8F5] text-[#0D0D0D] select-none overflow-hidden"
    >
      {/* 4. Top Ribbon Marquee: Angled at -2deg */}
      <div
        ref={topTapeRef}
        className="relative w-[130vw] -ml-[15vw] overflow-hidden pointer-events-none select-none z-30 -rotate-2 -mb-6"
      >
        <div className="bg-[#F7B928] text-black font-black uppercase tracking-widest text-xs sm:text-sm py-2.5 border-y-2 border-black shadow-xl flex">
          <div className="top-tape-track whitespace-nowrap flex will-change-transform">
            <span className="inline-block px-3">{marqueeText}</span>
            <span className="inline-block px-3" aria-hidden="true">
              {marqueeText}
            </span>
          </div>
        </div>
      </div>

      {/* Main Review Section Body */}
      <div className="max-w-7xl mx-auto px-6 md:px-16 pt-24 pb-20">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-black/10">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-[#E8A317] font-bold block mb-2">
              // 04. SOCIAL PROOF & VALIDATION
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#0D0D0D] leading-none">
              See what our clients say about us.
            </h2>
          </div>

          <div className="flex items-center gap-3 mt-4 md:mt-0">
            <span className="flex text-[#F7B928] text-base drop-shadow-sm">★★★★★</span>
            <span className="font-mono text-xs text-[#555] uppercase font-bold tracking-wider">
              5.0 RATING ACROSS 40+ DEPLOYMENTS
            </span>
          </div>
        </div>

        {/* 1. Staggered Fan-Out Grid Container */}
        <div
          ref={reviewsContainerRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
        >
          {reviewsList.map((item, index) => (
            <FolderCardItem key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
