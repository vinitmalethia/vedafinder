import React from 'react';
import { VedaFinderIcon } from './VedaLogoBrand';

export default function HeroJar({ activeSlide }) {
  const imgSrc = activeSlide?.image || '/products/nar-ojas.png';

  return (
    <div className="relative w-full max-w-[560px] mx-auto flex items-center justify-center select-none">
      {/* Background Soft Atmospheric Glow & Herb Silhouettes */}
      <div className="absolute -top-12 -right-6 w-72 h-72 bg-[#E2D4B9]/45 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 left-10 w-64 h-64 bg-[#749D83]/25 rounded-full blur-2xl pointer-events-none" />

      {/* Decorative Herbal Botanical Sprigs (Lush leaves behind product) */}
      <div className="absolute -top-4 -left-4 w-40 h-40 opacity-85 pointer-events-none leaf-float-slow z-0">
        <svg viewBox="0 0 100 100" fill="none" className="w-full h-full text-[#386B49]">
          <path d="M10 80C30 70 50 40 60 10" stroke="#254B33" strokeWidth="2.5" strokeLinecap="round"/>
          <path d="M30 65C18 55 25 35 42 35C45 48 38 62 30 65Z" fill="#3D7D54" />
          <path d="M45 50C58 35 75 42 70 55C60 62 48 58 45 50Z" fill="#4B8E64" />
          <path d="M55 28C68 12 85 20 80 32C72 38 60 34 55 28Z" fill="#2E6140" />
        </svg>
      </div>

      {/* Mortar & Pestle in background */}
      <div className="absolute bottom-16 -left-6 w-32 h-32 opacity-75 pointer-events-none z-0">
        <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
          <ellipse cx="50" cy="70" rx="35" ry="12" fill="rgba(40, 30, 20, 0.35)" />
          <path d="M20 50C20 72 32 80 50 80C68 80 80 72 80 50H20Z" fill="#755B40" stroke="#523E2A" strokeWidth="2"/>
          <ellipse cx="50" cy="50" rx="30" ry="10" fill="#423120" />
          {/* Pestle */}
          <path d="M65 25L45 55L40 50L55 20C58 17 63 19 65 25Z" fill="#8F7254" stroke="#5E4730" strokeWidth="1.5"/>
          {/* Ground green herbs in mortar */}
          <ellipse cx="50" cy="50" rx="20" ry="6" fill="#4E6D4E" />
          <circle cx="45" cy="49" r="2" fill="#88B488" />
          <circle cx="54" cy="51" r="1.5" fill="#A4CEA4" />
        </svg>
      </div>

      {/* Floating Circular Badge */}
      <div className="absolute top-2 right-2 md:-top-3 md:right-4 z-20 pointer-events-none">
        <div className="relative w-28 h-28 md:w-32 md:h-32 flex items-center justify-center rounded-full bg-[#FAF6F0]/95 backdrop-blur-md border border-[#C5A059]/40 shadow-xl p-2">
          {/* Outer dashed ring */}
          <div className="absolute inset-1 rounded-full border border-dashed border-[#B98A38]/50 animate-[spin_40s_linear_infinite]" />
          
          <div className="text-center flex flex-col items-center justify-center px-1">
            <span className="text-[9px] md:text-[10px] font-bold tracking-widest text-[#183B2B] uppercase leading-tight font-serif">
              AUTHENTIC
            </span>
            <span className="text-[10px] md:text-[11px] font-extrabold tracking-wider text-[#8C682D] uppercase leading-tight font-serif my-0.5">
              AYURVEDIC
            </span>
            <span className="text-[8px] md:text-[9px] font-bold tracking-widest text-[#183B2B] uppercase leading-tight font-serif">
              FORMULATION
            </span>
            {/* Tiny stars / leaf */}
            <div className="flex items-center gap-1 mt-1 text-[#C59A4E]">
              <span className="text-[8px]">✦</span>
              <span className="text-[8px]">🌿</span>
              <span className="text-[8px]">✦</span>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN COMPOSITION: 3D Product Box Image + Stone Plinth + Ambient Glass Teacup */}
      <div className="relative z-10 flex flex-col items-center pt-4 pb-4">
        
        {/* Product Pack Box */}
        <div className="relative w-[240px] md:w-[270px] h-[320px] md:h-[350px] flex items-center justify-center group transition-transform duration-500 hover:scale-[1.03] drop-shadow-2xl">
          <img 
            src={imgSrc} 
            alt={activeSlide?.productName || "Veda Finder Product"} 
            className="w-full h-full object-contain filter drop-shadow-xl"
          />
        </div>

        {/* Realistic Stone / Wood Plinth Platform */}
        <div className="relative w-[340px] md:w-[420px] h-[36px] -mt-6 z-0 flex items-center justify-center">
          {/* Top Surface of Stone Slab */}
          <div className="absolute top-0 w-full h-[22px] rounded-full bg-gradient-to-r from-[#8C7E6C] via-[#B8AA96] to-[#7D6F5E] shadow-md border-t border-[#D6CBBB]/70" />
          
          {/* Side / Thickness of Stone Slab */}
          <div className="absolute top-3 w-[96%] h-[20px] rounded-b-2xl bg-gradient-to-b from-[#695C4C] via-[#483D31] to-[#2E251D] shadow-xl" />
          
          {/* Ground Shadow */}
          <div className="absolute top-7 w-[98%] h-[18px] bg-black/35 rounded-full blur-md" />

          {/* Scattered Ayurvedic whole spices */}
          <div className="absolute top-1 left-8 flex items-center gap-1.5 opacity-85">
            <span className="text-xs">🌿</span>
            <div className="w-3 h-2 bg-[#8C682D] rounded-full rotate-45 shadow-sm" />
            <div className="w-2.5 h-2.5 bg-[#4A2F13] rounded-sm rotate-12" />
          </div>
        </div>

        {/* Steaming Amber Teacup on right */}
        <div className="absolute right-0 md:-right-8 bottom-4 md:bottom-6 z-20 flex flex-col items-center">
          {/* Rising Steam Animation */}
          <div className="relative w-12 h-14 mb-0 steam-anim pointer-events-none">
            <svg viewBox="0 0 50 60" fill="none" className="w-full h-full stroke-white/50" strokeWidth="2.5" strokeLinecap="round">
              <path d="M18 50C12 35 24 25 18 10" />
              <path d="M30 48C36 32 26 20 32 5" />
            </svg>
          </div>

          {/* Glass Teacup */}
          <div className="relative -mt-4">
            <svg viewBox="0 0 110 85" fill="none" className="w-28 h-20 md:w-32 md:h-24 drop-shadow-xl">
              <defs>
                <radialGradient id="amberInfusion2" cx="50%" cy="40%" r="60%">
                  <stop offset="0%" stopColor="#FFA43B" />
                  <stop offset="60%" stopColor="#DE6A10" />
                  <stop offset="100%" stopColor="#7E2D00" />
                </radialGradient>
              </defs>
              <path d="M78 30C95 30 96 56 78 60" stroke="rgba(255,255,255,0.75)" strokeWidth="4.5" strokeLinecap="round" fill="none" />
              <ellipse cx="50" cy="74" rx="42" ry="9" fill="rgba(255,255,255,0.35)" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" />
              <path d="M20 25C20 62 32 70 50 70C68 70 80 62 80 25H20Z" fill="url(#amberInfusion2)" />
              <path d="M20 25C20 62 32 70 50 70C68 70 80 62 80 25H20Z" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2" />
              <ellipse cx="50" cy="25" rx="30" ry="8" fill="#FFA945" stroke="rgba(255,255,255,0.9)" strokeWidth="2" />
              <ellipse cx="50" cy="25" rx="26" ry="6" fill="#D3630A" />
              <ellipse cx="50" cy="25" rx="18" ry="4" fill="#FFC97A" opacity="0.6" />
              <circle cx="42" cy="24" r="5" fill="#E8D558" stroke="#87751E" strokeWidth="1" />
              <path d="M52 23C56 19 62 21 60 25C56 26 53 25 52 23Z" fill="#3D7D54" />
            </svg>
          </div>
        </div>

      </div>
    </div>
  );
}
