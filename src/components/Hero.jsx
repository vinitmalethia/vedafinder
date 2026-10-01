import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, ShieldCheck, Truck, Sparkles } from 'lucide-react';
import HeroJar from './HeroJar';
import { HERO_SLIDES } from '../data/products';
import { BotanicalBranch } from './AyurvedicIcons';

export default function Hero({ onShopClick, onQuickView }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayIndex, setDisplayIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const timerRef = useRef(null);

  const currentSlide = HERO_SLIDES[currentIndex];
  const displaySlide = HERO_SLIDES[displayIndex];

  const goToSlide = (newIndex) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    // Start image transition immediately
    setCurrentIndex(newIndex);
    // Fade out text, then swap and fade in
    setTimeout(() => {
      setDisplayIndex(newIndex);
      setIsTransitioning(false);
    }, 400);
  };

  const nextSlide = () => {
    goToSlide((currentIndex + 1) % HERO_SLIDES.length);
  };

  const prevSlide = () => {
    goToSlide((currentIndex - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  // Auto-rotation every 5s (slightly longer for smoother feel)
  useEffect(() => {
    timerRef.current = setInterval(() => {
      goToSlide((currentIndex + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(timerRef.current);
  }, [currentIndex, isTransitioning]);

  return (
    <section 
      className="relative overflow-hidden bg-gradient-to-b from-[#FAF7F2] via-[#F5EFE4] to-[#EDE5D5] pt-6 pb-12 sm:pt-8 sm:pb-16 lg:pt-14 lg:pb-24 border-b border-[#E3D9C6]"
    >
      {/* Botanical Branch in Top-Left Corner */}
      <div className="absolute top-0 left-0 -translate-x-4 -translate-y-4 pointer-events-none z-10 opacity-50 sm:opacity-70">
        <BotanicalBranch className="w-28 sm:w-44 h-28 sm:h-44 text-[#356144]" />
      </div>

      {/* Subtle Botanical texture on Right Edge */}
      <div className="absolute top-8 right-0 translate-x-12 pointer-events-none z-0 opacity-25 sm:opacity-40">
        <BotanicalBranch className="w-36 sm:w-56 h-36 sm:h-56 text-[#457857] rotate-90" />
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-6 items-center">
          
          {/* LEFT COLUMN: Typography & Value Badges */}
          <div className="lg:col-span-6 space-y-4 sm:space-y-6 text-left pr-0 lg:pr-4">
            
            {/* Tag Badge — smooth crossfade */}
            <div 
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EFE7D5]/90 border border-[#D8C7A3] text-[#8C682D] text-[10px] sm:text-xs font-bold tracking-widest uppercase"
              style={{
                opacity: isTransitioning ? 0 : 1,
                transform: isTransitioning ? 'translateY(-4px)' : 'translateY(0)',
                transition: 'opacity 0.4s ease, transform 0.4s ease',
              }}
            >
              <span>🌿</span>
              <span>{displaySlide.tag}</span>
            </div>

            {/* Main Headline — smooth crossfade */}
            <h1 
              className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[54px] leading-[1.15] sm:leading-[1.12] font-semibold text-[#183B2B] tracking-tight whitespace-pre-line drop-shadow-sm"
              style={{
                opacity: isTransitioning ? 0 : 1,
                transform: isTransitioning ? 'translateY(6px)' : 'translateY(0)',
                transition: 'opacity 0.4s ease, transform 0.4s ease',
              }}
            >
              {displaySlide.title}
            </h1>

            {/* Subtitle — smooth crossfade */}
            <p 
              className="text-[#516458] text-sm sm:text-base md:text-lg leading-relaxed max-w-xl font-normal"
              style={{
                opacity: isTransitioning ? 0 : 1,
                transform: isTransitioning ? 'translateY(6px)' : 'translateY(0)',
                transition: 'opacity 0.45s ease 0.05s, transform 0.45s ease 0.05s',
              }}
            >
              {displaySlide.subtitle}
            </p>

            {/* CTA Buttons */}
            <div 
              className="pt-1 sm:pt-2 flex flex-wrap items-center gap-2.5 sm:gap-4"
              style={{
                opacity: isTransitioning ? 0.6 : 1,
                transition: 'opacity 0.35s ease',
              }}
            >
              <button
                onClick={() => onShopClick && onShopClick(displaySlide)}
                className="group inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-3.5 rounded-full bg-[#183B2B] hover:bg-[#234F3A] text-[#FAF7F2] font-medium text-xs sm:text-base shadow-lg shadow-[#183B2B]/20 transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] border border-[#2B563F]"
              >
                <span>{displaySlide.ctaText}</span>
                <ArrowRight className="w-4 h-4 stroke-[2.2] group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => onQuickView && onQuickView(displaySlide)}
                className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-2.5 sm:py-3 rounded-full bg-white/80 hover:bg-white text-[#183B2B] font-medium text-xs sm:text-sm border border-[#D5C9B3] shadow-sm transition-all"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#8C682D]" />
                <span>View Details</span>
              </button>
            </div>

            {/* Value Badges Row */}
            <div className="pt-4 sm:pt-6 border-t border-[#DECFAf]/70 grid grid-cols-3 gap-2 sm:gap-4 max-w-lg">
              
              {/* Badge 1: 100% Ayurvedic Formulations */}
              <div className="flex items-center gap-1.5 sm:gap-2">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#EAE0CD] flex items-center justify-center text-[#8C682D] shrink-0 text-xs sm:text-base">
                  🌿
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-[10px] sm:text-xs font-bold text-[#183B2B] leading-tight truncate">100% Ayurvedic</span>
                  <span className="text-[9px] sm:text-[10px] text-[#697B70] leading-tight truncate">Classical Care</span>
                </div>
              </div>

              {/* Badge 2: Trusted Quality */}
              <div className="flex items-center gap-1.5 sm:gap-2">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#EAE0CD] flex items-center justify-center text-[#8C682D] shrink-0">
                  <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#8C682D] stroke-[2.2]" />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-[10px] sm:text-xs font-bold text-[#183B2B] leading-tight truncate">AYUSH Mark</span>
                  <span className="text-[9px] sm:text-[10px] text-[#697B70] leading-tight truncate">Lab Tested</span>
                </div>
              </div>

              {/* Badge 3: Fast & Secure Delivery */}
              <div className="flex items-center gap-1.5 sm:gap-2">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#EAE0CD] flex items-center justify-center text-[#8C682D] shrink-0">
                  <Truck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#8C682D] stroke-[2.2]" />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-[10px] sm:text-xs font-bold text-[#183B2B] leading-tight truncate">Free Express</span>
                  <span className="text-[9px] sm:text-[10px] text-[#697B70] leading-tight truncate">Instant UPI</span>
                </div>
              </div>

            </div>

          </div>

          {/* RIGHT COLUMN: Product Showcase Carousel Stage */}
          <div className="lg:col-span-6 relative flex flex-col items-center justify-center mt-2 lg:mt-0">
            
            {/* Carousel Previous Button */}
            <button
              onClick={prevSlide}
              aria-label="Previous Slide"
              className="absolute left-0 sm:left-4 top-1/2 -translate-y-1/2 z-30 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white/95 hover:bg-white text-[#183B2B] shadow-md border border-[#D5C9B3] flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.2]" />
            </button>

            {/* Hero Visual Artwork Showcase */}
            <HeroJar 
              activeSlide={currentSlide} 
              slides={HERO_SLIDES} 
              currentIndex={currentIndex} 
            />

            {/* Carousel Next Button */}
            <button
              onClick={nextSlide}
              aria-label="Next Slide"
              className="absolute right-0 sm:right-4 top-1/2 -translate-y-1/2 z-30 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white/95 hover:bg-white text-[#183B2B] shadow-md border border-[#D5C9B3] flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.2]" />
            </button>

            {/* Carousel Pagination Progress Indicators */}
            <div className="flex items-center gap-2 mt-2 z-20">
              {HERO_SLIDES.map((slide, idx) => {
                const isActive = currentIndex === idx;
                return (
                  <button
                    key={slide.id}
                    onClick={() => goToSlide(idx)}
                    aria-label={`Go to slide ${idx + 1}`}
                    className={`relative overflow-hidden transition-all duration-500 ease-out rounded-full h-2 ${
                      isActive 
                        ? 'w-8 sm:w-10 bg-[#183B2B]/20' 
                        : 'w-2 bg-[#B8A88E] hover:bg-[#8C7A60]'
                    }`}
                  >
                    {isActive && (
                      <span 
                        key={`progress-${idx}-${currentIndex}`}
                        className="absolute inset-y-0 left-0 bg-[#183B2B] rounded-full animate-progress-bar" 
                      />
                    )}
                  </button>
                );
              })}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
