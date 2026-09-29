import React from 'react';

// Official Veda Finder Tree of Life with Meditating Yogi SVG
export function VedaFinderIcon({ className = "w-10 h-10" }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Outer base leaves / support ring */}
      <path d="M22 72C15 62 16 48 24 38" stroke="#005C2B" strokeWidth="3" strokeLinecap="round"/>
      <path d="M78 72C85 62 84 48 76 38" stroke="#005C2B" strokeWidth="3" strokeLinecap="round"/>
      <path d="M20 78C30 92 70 92 80 78" stroke="#005C2B" strokeWidth="3.5" strokeLinecap="round"/>
      <path d="M30 88C42 96 58 96 70 88" stroke="#005C2B" strokeWidth="2.5" strokeLinecap="round"/>

      {/* Brown Tree Branches */}
      <path d="M50 48V32M50 38C42 32 35 24 30 18M50 38C58 32 65 24 70 18M50 44C38 38 28 32 22 25M50 44C62 38 72 32 78 25" stroke="#5C3624" strokeWidth="3" strokeLinecap="round"/>

      {/* Canopy of Leaves (Dark Green & Chartreuse/Lime Green) */}
      {/* Top peak */}
      <circle cx="50" cy="10" r="3.5" fill="#005C2B" />
      <circle cx="43" cy="12" r="3" fill="#9CB32B" />
      <circle cx="57" cy="12" r="3" fill="#9CB32B" />
      
      {/* Upper tier */}
      <circle cx="34" cy="16" r="3.5" fill="#005C2B" />
      <circle cx="66" cy="16" r="3.5" fill="#005C2B" />
      <circle cx="28" cy="22" r="3" fill="#9CB32B" />
      <circle cx="72" cy="22" r="3" fill="#9CB32B" />
      <circle cx="48" cy="18" r="3" fill="#005C2B" />
      <circle cx="52" cy="22" r="2.5" fill="#9CB32B" />

      {/* Mid tier */}
      <circle cx="22" cy="28" r="3.5" fill="#005C2B" />
      <circle cx="78" cy="28" r="3.5" fill="#005C2B" />
      <circle cx="18" cy="36" r="3" fill="#9CB32B" />
      <circle cx="82" cy="36" r="3" fill="#9CB32B" />
      <circle cx="38" cy="24" r="3" fill="#9CB32B" />
      <circle cx="62" cy="24" r="3" fill="#9CB32B" />
      <circle cx="30" cy="32" r="3.5" fill="#005C2B" />
      <circle cx="70" cy="32" r="3.5" fill="#005C2B" />

      {/* Meditating Yogi Silhouette (Padmasana) in Dark Green */}
      <g fill="#005C2B">
        {/* Head */}
        <circle cx="50" cy="42" r="4.5" />
        {/* Neck & Shoulders */}
        <path d="M48 46H52V50H48V46Z" />
        {/* Torso & Arms */}
        <path d="M50 50C44 50 40 56 36 64C38 67 43 67 46 64C48 62 48 58 50 58C52 58 52 62 54 64C57 67 62 67 64 64C60 56 56 50 50 50Z" />
        {/* Hands resting on knees in Dhyana/Gyan Mudra */}
        <circle cx="34" cy="65" r="2" />
        <circle cx="66" cy="65" r="2" />
        {/* Crossed Legs & Lotus Base */}
        <path d="M30 67C30 67 36 78 50 78C64 78 70 67 70 67C65 72 57 74 50 74C43 74 35 72 30 67Z" />
        {/* Chest & center body */}
        <path d="M46 52C44 58 45 68 50 72C55 68 56 58 54 52H46Z" />
      </g>
    </svg>
  );
}

// Complete Brand Lockup with exact typography matching the uploaded image
export function VedaFinderLogo({ 
  showTagline = true, 
  variant = "standard", 
  size = "md",
  className = "" 
}) {
  const isLight = variant === "light";

  return (
    <div className={`flex items-center gap-2.5 sm:gap-3 group ${className}`}>
      {/* Official Meditating Tree Icon */}
      <div className="shrink-0 transition-transform duration-300 group-hover:scale-105">
        <VedaFinderIcon className={size === "lg" ? "w-12 h-12" : size === "sm" ? "w-8 h-8" : "w-10 h-10"} />
      </div>

      {/* Brand Text: Veda (Brown) Finder (Green) TM */}
      <div className="flex flex-col text-left">
        <div className="flex items-start">
          <span className={`font-sans font-extrabold tracking-tight leading-none ${
            size === "lg" ? "text-3xl" : size === "sm" ? "text-xl" : "text-2xl"
          } ${isLight ? "text-[#E6C887]" : "text-[#5C3624]"}`}>
            Veda&nbsp;
          </span>
          <span className={`font-sans font-extrabold tracking-tight leading-none ${
            size === "lg" ? "text-3xl" : size === "sm" ? "text-xl" : "text-2xl"
          } ${isLight ? "text-white" : "text-[#005C2B]"}`}>
            Finder
          </span>
          <span className={`text-[10px] font-bold leading-none ml-0.5 mt-0.5 ${
            isLight ? "text-[#E6C887]" : "text-[#183B2B]"
          }`}>
            TM
          </span>
        </div>

        {showTagline && (
          <span className={`text-[8px] tracking-[0.22em] font-bold uppercase mt-1 ${
            isLight ? "text-[#C59A4E]" : "text-[#8C682D]"
          }`}>
            AYURVEDA FOR A BETTER TOMORROW
          </span>
        )}
      </div>
    </div>
  );
}
