import React from 'react';

export default function HeroJar({ activeSlide, slides = [], currentIndex = 0 }) {
  const currentImage = activeSlide?.image || '/images/hero-ayurveda-yoga.jpg';

  return (
    <div className="relative w-full max-w-[520px] mx-auto flex items-center justify-center select-none px-2 py-2">
      {/* Background Soft Atmospheric Glow & Aura */}
      <div className="absolute -top-10 -right-6 w-64 sm:w-80 h-64 sm:h-80 bg-[#E2D4B9]/50 rounded-full blur-3xl pointer-events-none transition-all duration-[2000ms]" />
      <div className="absolute top-1/4 -left-6 w-56 sm:w-72 h-56 sm:h-72 bg-[#749D83]/25 rounded-full blur-3xl pointer-events-none transition-all duration-[2000ms]" />

      {/* Decorative Floating Herbal Badge */}
      <div className="absolute -top-2 right-1 sm:-top-3 sm:right-3 z-30 pointer-events-none scale-90 sm:scale-100 drop-shadow-xl transition-transform duration-500">
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
              HERITAGE
            </span>
            <div className="flex items-center gap-1 mt-0.5 text-[#C59A4E]">
              <span className="text-[7px]">✦</span>
              <span className="text-[7px]">🌿</span>
              <span className="text-[7px]">✦</span>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN HERO SHOWCASE: Ultra-Smooth Multi-Image Carousel Frame */}
      <div className="relative z-10 w-full flex items-center justify-center">
        <div className="relative w-full max-w-[360px] xs:max-w-[400px] sm:max-w-[460px] aspect-square rounded-3xl overflow-hidden border-2 border-[#D5C4A1] shadow-2xl bg-[#FAF6F0] group transition-all duration-700 hover:shadow-[0_25px_60px_rgba(24,59,43,0.25)] hover:border-[#8C682D]">
          
          {slides.length > 0 ? (
            slides.map((slide, idx) => {
              const isActive = idx === currentIndex;
              return (
                <div 
                  key={slide.id || idx}
                  className="absolute inset-0 hero-slide-layer"
                  style={{
                    opacity: isActive ? 1 : 0,
                    zIndex: isActive ? 10 : 0,
                    transition: 'opacity 1.2s cubic-bezier(0.4, 0, 0.2, 1)',
                    pointerEvents: isActive ? 'auto' : 'none',
                  }}
                >
                  <img 
                    src={slide.image} 
                    alt={slide.title || "Ayurvedic Heritage"} 
                    className="w-full h-full object-cover object-center hero-slide-img"
                    style={{
                      transform: isActive ? 'scale(1)' : 'scale(1.04)',
                      transition: 'transform 1.4s cubic-bezier(0.4, 0, 0.2, 1)',
                      animation: isActive ? 'heroKenBurns 8s ease-in-out forwards' : 'none',
                    }}
                    loading="eager"
                  />
                  
                  {/* Soft Bottom Vignette & Tag Label */}
                  <div 
                    className="absolute inset-x-0 bottom-0 pt-14 pb-4 px-5 bg-gradient-to-t from-[#183B2B]/95 via-[#183B2B]/40 to-transparent pointer-events-none flex items-end justify-between"
                    style={{
                      opacity: isActive ? 1 : 0,
                      transform: isActive ? 'translateY(0)' : 'translateY(8px)',
                      transition: 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.3s, transform 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.3s',
                    }}
                  >
                    <div className="text-left">
                      <p className="text-[#E5D7BE] text-[10px] sm:text-xs font-serif font-bold uppercase tracking-widest">
                        {slide.tag || "Natural Healing & Classical Formulations"}
                      </p>
                      <p className="text-white text-xs sm:text-sm font-serif font-semibold drop-shadow-sm mt-0.5">
                        {slide.productSubtitle || "100% Pure & Lab Tested"}
                      </p>
                    </div>
                    <span className="text-[#E0B86C] text-xs font-bold bg-white/15 px-2.5 py-1 rounded-full backdrop-blur-sm border border-white/20 shadow-sm">
                      ★ 4.98
                    </span>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="relative w-full h-full">
              <img 
                src={currentImage} 
                alt="Ayurvedic Heritage" 
                className="w-full h-full object-cover object-center"
              />
            </div>
          )}

          {/* Inner subtle frame border */}
          <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-black/10 pointer-events-none z-20" />
        </div>
      </div>
    </div>
  );
}
