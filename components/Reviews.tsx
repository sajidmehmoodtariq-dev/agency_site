"use client";

import React from "react";

interface ReviewItem {
  id: string;
  tabLabel: string;
  quote: string;
  author: string;
  role: string;
  storeUrl: string;
}

const reviewsData: ReviewItem[] = [
  {
    id: "01",
    tabLabel: "TAB_01 // DTC",
    quote:
      "Studio 32 rebuilt our e-commerce platform from the ground up. Our mobile load times dropped from 4.8s to 0.7s, and sales converted 140% higher in Q1 alone.",
    author: "Marcus Vance",
    role: "CTO // Valo Eyewear",
    storeUrl: "valo-optics.com",
  },
  {
    id: "02",
    tabLabel: "TAB_02 // FASHION",
    quote:
      "The smooth scroll and kinetic typography give our store an undeniable editorial prestige. It feels more like an interactive gallery than a standard Shopify template.",
    author: "Elena Rostova",
    role: "Brand Director // Kanso Global",
    storeUrl: "kanso-studio.store",
  },
  {
    id: "03",
    tabLabel: "TAB_03 // SCALE",
    quote:
      "Flawless Next.js architecture and GSAP performance. Zero frame drops even with extensive 3D configuration models and heavy concurrent holiday traffic.",
    author: "Julian Sterling",
    role: "Head of Product // ChronoLab",
    storeUrl: "chronolab.tech",
  },
  {
    id: "04",
    tabLabel: "TAB_04 // B2B",
    quote:
      "Our checkout reconciliation speed improved by 400%. The headless GraphQL integration bypassed liquid bottlenecks completely.",
    author: "Sophia Lin",
    role: "VP Engineering // Aether Logistics",
    storeUrl: "aether-pay.net",
  },
  {
    id: "05",
    tabLabel: "TAB_05 // BEVERAGE",
    quote:
      "Sub-50ms edge rendering transformed our conversion metrics across European and Asian traffic. Truly elite full-stack engineering.",
    author: "David Moreau",
    role: "Founder // Apex Roasters",
    storeUrl: "apex-roasters.co",
  },
  {
    id: "06",
    tabLabel: "TAB_06 // LUXURY",
    quote:
      "From wireframe to deployment in six weeks. The zero-bloat philosophy shaved over 2MB off our initial payload.",
    author: "Clara Bennett",
    role: "Digital VP // Maison Orpheo",
    storeUrl: "orpheo-paris.com",
  },
];

export default function Reviews() {
  return (
    <section
      id="reviews"
      className="py-32 px-6 md:px-16 bg-[#0D0D0D] text-white border-t border-white/10 select-none relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-white/10">
          <div>
            <span className="font-mono text-xs text-[#F7B928] uppercase tracking-widest block mb-2 font-bold">
              // 04. CLIENT VALIDATION
            </span>
            <h2 className="font-header text-4xl sm:text-5xl md:text-6xl font-extrabold uppercase tracking-tight text-white">
              INDUSTRY REVIEWS
            </h2>
          </div>
          <div className="flex items-center gap-3 mt-4 md:mt-0">
            <span className="flex text-[#F7B928] text-sm">★★★★★</span>
            <span className="font-mono text-xs text-white/70 uppercase font-bold tracking-wider">
              5.0 RATING ACROSS 40+ DEPLOYMENTS
            </span>
          </div>
        </div>

        {/* Filing Folder Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {reviewsData.map((item) => (
            <div
              key={item.id}
              className="group relative flex flex-col cursor-pointer transition-all duration-300"
            >
              {/* Top Faux Browser / Filing Folder Tab */}
              <div className="w-32 h-7 bg-[#0D0D0D] border-t-2 border-l-2 border-r-2 border-black text-[#F7B928] text-[10px] uppercase font-mono font-bold px-3 py-1 rounded-t-lg flex items-center justify-between shadow-md group-hover:-translate-y-1 transition-transform duration-300">
                <span>{item.tabLabel}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#F7B928] animate-pulse" />
              </div>

              {/* Rich Amber-Yellow Folder Card Body */}
              <div className="bg-[#F7B928] text-black p-6 md:p-7 rounded-b-2xl rounded-tr-2xl border-2 border-black shadow-xl flex flex-col justify-between min-h-[240px] transition-all duration-300 group-hover:-translate-y-1.5 group-hover:shadow-[6px_6px_0px_#000]">
                {/* 5-Star Indicator & Quote */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-black text-sm tracking-wider font-bold">★★★★★</span>
                    <span className="font-mono text-[10px] text-black/60 font-semibold uppercase">
                      VERIFIED DEPLOY
                    </span>
                  </div>

                  <p className="font-serif italic text-base md:text-lg text-black/90 leading-relaxed mb-6">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                </div>

                {/* Author Info & Store URL Pill */}
                <div className="pt-4 border-t border-black/15 flex items-end justify-between gap-2">
                  <div>
                    <span className="font-header font-bold text-sm block text-black">
                      {item.author}
                    </span>
                    <span className="font-mono text-[10px] text-black/70 font-semibold block uppercase">
                      {item.role}
                    </span>
                  </div>

                  {/* Store URL Pill */}
                  <div className="px-2.5 py-1 rounded-full bg-black text-[#F7B928] font-mono text-[9px] uppercase font-bold tracking-wider flex-shrink-0 shadow-sm">
                    {item.storeUrl}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
