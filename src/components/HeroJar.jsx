import React from 'react';

export default function HeroJar({ activeSlide }) {
  const imgSrc = activeSlide?.image || '/images/hero-ayurveda-yoga.jpg';
  const isFullArtwork = imgSrc.includes('hero-') || imgSrc.endsWith('.jpg') || imgSrc.endsWith('.jpeg');

  return (
    <div className="relative w-full max-w-[560px] mx-auto flex items-center justify-center select-none px-2 py-2">
      {/* Background Soft Atmospheric Glow & Aura */}
      <div className="absolute -top-10 -right-6 w-64 sm:w-80 h-64 sm:h-80 bg-[#E2D4B9]/50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/4 -left-6 w-56 sm:w-72 h-56 sm:h-72 bg-[#749D83]/25 rounded-full blur-3xl pointer-events-none" />

      {/* Decorative Floating Herbal Badge */}
      <div className="absolute -top-2 right-1 sm:-top-3 sm:right-3 z-30 pointer-events-none scale-90 sm:scale-100 drop-shadow-xl">
        <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center rounded-full bg-[#FAF6F0]/95 backdrop-blur-md border border-[#C5A059]/50 shadow-xl p-2">
          {/* Outer dashed animated ring */}
          <div className="absolute inset-1 rounded-full border border-dashed border-[#B98A38]/50 animate-[spin_40s_linear_infinite]" />
          
          <div className="text-center flex flex-col items-center justify-center px-1">
            <span className="text-[7px] sm:text-[8px] font-bold tracking-widest text-[#183B2B] uppercase leading-tight font-serif">
              AUTHENTIC
            </span>
            <span className="text-[8px] sm:text-[10px] font-extrabold tracking-wider text-[#8C682D] uppercase leading-tight font-serif my-0.5">
              AYURVEDA
            </span>
            <span className="text-[7px] sm:text-[8px] font-bold tracking-widest text-[#183B2B] uppercase leading-tight font-serif">
              WELLNESS
            </span>
            <div className="flex items-center gap-1 mt-0.5 text-[#C59A4E]">
              <span className="text-[7px]">✦</span>
              <span className="text-[7px]">🌿</span>
              <span className="text-[7px]">✦</span>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN HERO SHOWCASE COMPOSITION */}
      <div className="relative z-10 w-full flex items-center justify-center">
        {isFullArtwork ? (
          /* High-Def Classical Ayurvedic Visual Art Frame */
          <div className="relative w-full max-w-[360px] xs:max-w-[400px] sm:max-w-[460px] aspect-square rounded-3xl overflow-hidden border-2 border-[#D5C4A1] shadow-2xl bg-white/60 backdrop-blur-md group transition-all duration-500 hover:shadow-[0_25px_60px_rgba(24,59,43,0.25)] hover:border-[#8C682D]">
            <img 
              src={imgSrc} 
              alt={activeSlide?.productName || activeSlide?.title || "Ayurvedic Heritage"} 
              className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
            />
            {/* Soft inner vignette and label */}
            <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-black/10 pointer-events-none" />
            <div className="absolute inset-x-0 bottom-0 pt-10 pb-3 px-4 bg-gradient-to-t from-[#183B2B]/85 via-[#183B2B]/40 to-transparent pointer-events-none flex items-end justify-between">
              <div className="text-left">
                <p className="text-[#E5D7BE] text-[10px] sm:text-xs font-serif font-bold uppercase tracking-widest">
                  {activeSlide?.tag || "Natural Healing & Classical Formulations"}
                </p>
                <p className="text-white text-xs sm:text-sm font-serif font-semibold drop-shadow-sm">
                  {activeSlide?.productSubtitle || "100% Pure & Lab Tested"}
                </p>
              </div>
              <span className="text-[#E0B86C] text-xs font-bold bg-white/10 px-2.5 py-1 rounded-full backdrop-blur-sm border border-white/20">
                ★ 4.98
              </span>
            </div>
          </div>
        ) : (
          /* Transparent Product Pack Box Presentation */
          <div className="relative flex flex-col items-center pt-2 pb-2 w-full">
            <div className="relative w-[190px] xs:w-[220px] sm:w-[270px] h-[250px] xs:h-[280px] sm:h-[350px] flex items-center justify-center group transition-transform duration-500 hover:scale-[1.03] drop-shadow-2xl">
              <img 
                src={imgSrc} 
                alt={activeSlide?.productName || "Veda Finder Product"} 
                className="w-full h-full object-contain filter drop-shadow-xl"
              />
            </div>

            {/* Stone / Wood Plinth Platform */}
            <div className="relative w-[280px] xs:w-[320px] sm:w-[420px] max-w-full h-[32px] sm:h-[36px] -mt-5 sm:-mt-6 z-0 flex items-center justify-center">
              <div className="absolute top-0 w-full h-[18px] sm:h-[22px] rounded-full bg-gradient-to-r from-[#8C7E6C] via-[#B8AA96] to-[#7D6F5E] shadow-md border-t border-[#D6CBBB]/70" />
              <div className="absolute top-2.5 sm:top-3 w-[96%] h-[16px] sm:h-[20px] rounded-b-2xl bg-gradient-to-b from-[#695C4C] via-[#483D31] to-[#2E251D] shadow-xl" />
              <div className="absolute top-6 sm:top-7 w-[98%] h-[14px] sm:h-[18px] bg-black/35 rounded-full blur-md" />
              <div className="absolute top-1 left-4 sm:left-8 flex items-center gap-1.5 opacity-85">
                <span className="text-[10px] sm:text-xs">🌿</span>
                <div className="w-2 sm:w-3 h-1.5 sm:h-2 bg-[#8C682D] rounded-full rotate-45 shadow-sm" />
                <div className="w-2 sm:w-2.5 h-2 sm:h-2.5 bg-[#4A2F13] rounded-sm rotate-12" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
