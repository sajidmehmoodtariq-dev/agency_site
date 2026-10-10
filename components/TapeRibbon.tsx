"use client";

import React from "react";

interface TapeRibbonProps {
  text?: string;
  className?: string;
  rotate?: string;
  reverse?: boolean;
}

export default function TapeRibbon({
  text = "/// ZERO BLOAT /// SUB-SECOND TTI /// CUSTOM SHOPIFY APPS /// HEADLESS NEXT.JS /// 99+ LIGHTHOUSE /// ",
  className = "",
  rotate = "-rotate-2",
  reverse = false,
}: TapeRibbonProps) {
  const repeatedText = `${text} `.repeat(6);

  return (
    <div
      className={`relative w-[125vw] -ml-[12vw] overflow-hidden pointer-events-none select-none z-20 ${rotate} ${className}`}
    >
      <div className="bg-[#F7B928] text-black font-black uppercase tracking-widest text-xs sm:text-sm py-2.5 border-y-2 border-black shadow-xl flex">
        <div
          className={`${
            reverse ? "animate-marquee-reverse" : "animate-marquee"
          } whitespace-nowrap flex`}
        >
          <span className="inline-block px-3">{repeatedText}</span>
          <span className="inline-block px-3" aria-hidden="true">
            {repeatedText}
          </span>
        </div>
      </div>
    </div>
  );
}
