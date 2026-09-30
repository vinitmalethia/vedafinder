import React from 'react';

// Official Veda Finder Tree of Life with Meditating Yogi Icon
export function VedaFinderIcon({ className = "w-10 h-10", alt = "Veda Finder Logo" }) {
  return (
    <img 
      src="/veda-logo.png" 
      alt={alt}
      className={`object-contain select-none transition-transform duration-300 ${className}`}
      loading="eager"
      decoding="async"
    />
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

  const iconSizes = {
    sm: "w-8 h-8",
    md: "w-10 h-10 sm:w-11 sm:h-11",
    lg: "w-14 h-14 sm:w-16 sm:h-16",
    xl: "w-20 h-20 sm:w-24 sm:h-24"
  };

  const textSizes = {
    sm: "text-xl",
    md: "text-2xl sm:text-[26px]",
    lg: "text-3xl sm:text-4xl",
    xl: "text-4xl sm:text-5xl"
  };

  const taglineSizes = {
    sm: "text-[7px] tracking-[0.2em]",
    md: "text-[8px] sm:text-[9px] tracking-[0.22em]",
    lg: "text-[10px] sm:text-xs tracking-[0.25em]",
    xl: "text-xs sm:text-sm tracking-[0.28em]"
  };

  return (
    <div className={`flex items-center gap-2.5 sm:gap-3 group ${className}`}>
      {/* Official Meditating Tree Icon */}
      <div className="shrink-0 transition-transform duration-300 group-hover:scale-105">
        <VedaFinderIcon className={iconSizes[size] || iconSizes.md} />
      </div>

      {/* Brand Text: Veda (Brown) Finder (Green) TM */}
      <div className="flex flex-col text-left">
        <div className="flex items-baseline">
          <span className={`font-sans font-extrabold tracking-tight leading-none ${
            textSizes[size] || textSizes.md
          } ${isLight ? "text-[#E6C887]" : "text-[#5C3624]"}`}>
            Veda&nbsp;
          </span>
          <span className={`font-sans font-extrabold tracking-tight leading-none ${
            textSizes[size] || textSizes.md
          } ${isLight ? "text-white" : "text-[#005C2B]"}`}>
            Finder
          </span>
          <span className={`text-[10px] font-bold leading-none ml-0.5 self-start ${
            isLight ? "text-[#E6C887]" : "text-[#183B2B]"
          }`}>
            TM
          </span>
        </div>

        {showTagline && (
          <span className={`font-bold uppercase mt-1 leading-tight ${
            taglineSizes[size] || taglineSizes.md
          } ${isLight ? "text-[#C59A4E]" : "text-[#8C682D]"}`}>
            AYURVEDA FOR A BETTER TOMORROW
          </span>
        )}
      </div>
    </div>
  );
}
