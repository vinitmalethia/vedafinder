import React, { useState, useEffect } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, ShieldCheck, Truck, Sparkles } from 'lucide-react';
import HeroJar from './HeroJar';
import { HERO_SLIDES } from '../data/products';
import { BotanicalBranch } from './AyurvedicIcons';

export default function Hero({ onShopClick, onQuickView }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentSlide = HERO_SLIDES[currentIndex];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  // Optional subtle auto-rotation (can be paused on hover)
  const [isPaused, setIsPaused] = useState(false);
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      // auto advance smoothly every 8 seconds
      nextSlide();
    }, 8000);
    return () => clearInterval(timer);
  }, [currentIndex, isPaused]);

  return (
    <section 
      className="relative overflow-hidden bg-gradient-to-b from-[#FAF7F2] via-[#F5EFE4] to-[#EDE5D5] pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-[#E3D9C6]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Botanical Branch in Top-Left Corner (matches screenshot) */}
      <div className="absolute top-0 left-0 -translate-x-4 -translate-y-4 pointer-events-none z-10 opacity-70">
        <BotanicalBranch className="w-44 h-44 text-[#356144]" />
      </div>

      {/* Subtle Botanical texture on Right Edge */}
      <div className="absolute top-8 right-0 translate-x-12 pointer-events-none z-0 opacity-40">
        <BotanicalBranch className="w-56 h-56 text-[#457857] rotate-90" />
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
          
          {/* LEFT COLUMN: Typography & Value Badges (5 cols on lg) */}
          <div className="lg:col-span-6 space-y-6 text-left pr-0 lg:pr-4">
            
            {/* Tag Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EFE7D5]/80 border border-[#D8C7A3] text-[#8C682D] text-[11px] sm:text-xs font-bold tracking-widest uppercase">
              <span>🌿</span>
              <span>{currentSlide.tag}</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-[56px] leading-[1.12] font-semibold text-[#183B2B] tracking-tight whitespace-pre-line drop-shadow-sm">
              {currentSlide.title}
            </h1>

            {/* Subtitle */}
            <p className="text-[#516458] text-base sm:text-lg leading-relaxed max-w-xl font-normal">
              {currentSlide.subtitle}
            </p>

            {/* CTA Button & Quick Info */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={() => onShopClick && onShopClick(currentSlide)}
                className="group inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-[#183B2B] hover:bg-[#234F3A] text-[#FAF7F2] font-medium text-base shadow-lg shadow-[#183B2B]/20 transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] border border-[#2B563F]"
              >
                <span>{currentSlide.ctaText}</span>
                <ArrowRight className="w-4 h-4 stroke-[2.2] group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => onQuickView && onQuickView(currentSlide)}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white/70 hover:bg-white text-[#183B2B] font-medium text-sm border border-[#D5C9B3] shadow-sm transition-all"
              >
                <Sparkles className="w-4 h-4 text-[#8C682D]" />
                <span>View Formulation</span>
              </button>
            </div>

            {/* Value Badges Row */}
            <div className="pt-6 border-t border-[#DECFAf]/70 grid grid-cols-3 gap-3 sm:gap-4 max-w-lg">
              
              {/* Badge 1: 100% Ayurvedic Formulations */}
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#EAE0CD] flex items-center justify-center text-[#8C682D] shrink-0">
                  <span className="text-base">🌿</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] sm:text-xs font-bold text-[#183B2B] leading-tight">100% Ayurvedic</span>
                  <span className="text-[10px] text-[#697B70] leading-tight">Formulations</span>
                </div>
              </div>

              {/* Badge 2: Trusted Quality */}
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#EAE0CD] flex items-center justify-center text-[#8C682D] shrink-0">
                  <ShieldCheck className="w-4 h-4 text-[#8C682D] stroke-[2.2]" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] sm:text-xs font-bold text-[#183B2B] leading-tight">Trusted</span>
                  <span className="text-[10px] text-[#697B70] leading-tight">Quality</span>
                </div>
              </div>

              {/* Badge 3: Fast & Secure Delivery */}
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#EAE0CD] flex items-center justify-center text-[#8C682D] shrink-0">
                  <Truck className="w-4 h-4 text-[#8C682D] stroke-[2.2]" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] sm:text-xs font-bold text-[#183B2B] leading-tight">Fast & Secure</span>
                  <span className="text-[10px] text-[#697B70] leading-tight">Delivery</span>
                </div>
              </div>

            </div>

          </div>

          {/* RIGHT COLUMN: Product Showcase Carousel Stage (6 cols on lg) */}
          <div className="lg:col-span-6 relative flex flex-col items-center justify-center mt-6 lg:mt-0">
            
            {/* Carousel Previous Button */}
            <button
              onClick={prevSlide}
              aria-label="Previous Slide"
              className="absolute -left-2 sm:left-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-white/95 hover:bg-white text-[#183B2B] shadow-lg border border-[#D5C9B3] flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95"
            >
              <ChevronLeft className="w-6 h-6 stroke-[2.2]" />
            </button>

            {/* Realistic Agnisip Jar & Table Setting */}
            <HeroJar activeSlide={currentSlide} />

            {/* Carousel Next Button */}
            <button
              onClick={nextSlide}
              aria-label="Next Slide"
              className="absolute -right-2 sm:right-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-white/95 hover:bg-white text-[#183B2B] shadow-lg border border-[#D5C9B3] flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95"
            >
              <ChevronRight className="w-6 h-6 stroke-[2.2]" />
            </button>

            {/* Carousel Pagination Dots */}
            <div className="flex items-center gap-2 mt-2 z-20">
              {HERO_SLIDES.map((slide, idx) => (
                <button
                  key={slide.id}
                  onClick={() => setCurrentIndex(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`transition-all duration-300 rounded-full ${
                    currentIndex === idx 
                      ? 'w-7 h-2 bg-[#183B2B]' 
                      : 'w-2 h-2 bg-[#B8A88E] hover:bg-[#8C7A60]'
                  }`}
                />
              ))}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
