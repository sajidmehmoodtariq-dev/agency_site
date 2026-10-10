"use client";

import React from "react";

interface TapeBannerProps {
  text?: string;
  className?: string;
}

export default function TapeBanner({
  text = "// SHOPIFY PLUS // BESPOKE CODE // ZERO BLOAT // CORE WEB VITALS // HIGH-VELOCITY ENGINES // ",
  className = "",
}: TapeBannerProps) {
  // Repeat segment to guarantee continuous seamless marquee
  const segment = `${text} `;
  const fullContent = segment.repeat(8);

  return (
    <div className={`relative w-full overflow-hidden pointer-events-none py-6 select-none ${className}`}>
      {/* Top Ribbon 1: -rotate-3 Amber Caution Tape */}
      <div className="relative w-[125vw] -ml-[12vw] bg-[#F7B928] text-black font-black uppercase text-xs sm:text-sm tracking-widest py-2.5 border-y-2 border-black -rotate-3 shadow-2xl overflow-hidden flex z-10">
        <div className="animate-marquee whitespace-nowrap">
          <span className="inline-block px-4">{fullContent}</span>
          <span className="inline-block px-4">{fullContent}</span>
        </div>
      </div>

      {/* Bottom Ribbon 2: rotate-2 Overlapping Black & Amber Tape */}
      <div className="relative w-[125vw] -ml-[12vw] bg-[#0D0D0D] text-[#F7B928] font-black uppercase text-xs sm:text-sm tracking-widest py-2.5 border-y-2 border-[#F7B928] rotate-2 shadow-2xl overflow-hidden flex -mt-5 z-20">
        <div className="animate-marquee-reverse whitespace-nowrap">
          <span className="inline-block px-4">{fullContent}</span>
          <span className="inline-block px-4">{fullContent}</span>
        </div>
      </div>
    </div>
  );
}
