import React from 'react';
import { Sparkles, Trophy, BookOpen, Clock, ArrowRight, Award, CheckCircle2, Flame } from 'lucide-react';

export default function SutraSection({ onExplore }) {
  return (
    <section className="py-20 bg-[#0B1E15] text-[#FAF7F2] relative overflow-hidden border-t border-[#224A34]">
      {/* Subtle Background Vedic Geometry & Golden Aura */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-[#C59A4E] blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 rounded-full bg-[#1F543B] blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Banner Card */}
        <div className="rounded-3xl bg-gradient-to-br from-[#122E21] via-[#163828] to-[#0D2218] border border-[#C59A4E]/40 p-8 sm:p-12 lg:p-16 shadow-2xl relative overflow-hidden">
          
          {/* Subtle Corner Ornament */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-[#C59A4E]/15 to-transparent rounded-bl-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-[#C59A4E]/10 to-transparent rounded-tr-full pointer-events-none" />

          <div className="max-w-3xl mx-auto text-center space-y-6">
            
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C59A4E]/15 border border-[#C59A4E]/40 text-[#E6C887] text-xs sm:text-sm font-bold uppercase tracking-widest shadow-inner">
              <Sparkles className="w-4 h-4 text-[#E6C887]" />
              <span>VEDA FINDER PRESENTS</span>
            </div>

            {/* Main Title & Subtitles */}
            <div className="space-y-3">
              <h2 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-none">
                THE SUTRA
              </h2>
              <p className="font-serif text-lg sm:text-2xl text-[#E6C887] font-medium tracking-wide">
                The Ayurveda Knowledge Challenge
              </p>
              
              {/* Hindi Sacred Tagline */}
              <div className="pt-1">
                <span className="inline-block font-serif text-base sm:text-xl text-[#F3E5C8] italic font-semibold px-4 py-1 rounded-full bg-[#1B4331]/60 border border-[#C59A4E]/30">
                  ज्ञान की खोज। आयुर्वेद के साथ।
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm sm:text-base text-[#B2CEC0] leading-relaxed max-w-2xl mx-auto">
              A Weekly Knowledge Challenge for Ayurveda Students, Doctors & Enthusiasts. Test your understanding of Charaka, Sushruta, Rasashastra, and Dravyaguna.
            </p>

            {/* Schedule & Feature Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-4 text-left">
              
              <div className="p-3.5 rounded-2xl bg-[#0F261B]/80 border border-[#2B5E43] flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#C59A4E]/20 text-[#E6C887] flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#8FAFA0] block">SCHEDULE</span>
                  <span className="text-xs sm:text-sm font-bold text-white">EVERY SUNDAY</span>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#0F261B]/80 border border-[#2B5E43] flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#C59A4E]/20 text-[#E6C887] flex items-center justify-center shrink-0">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#8FAFA0] block">FORMAT</span>
                  <span className="text-xs sm:text-sm font-bold text-white">5 Samhita MCQs</span>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#0F261B]/80 border border-[#2B5E43] flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#C59A4E]/20 text-[#E6C887] flex items-center justify-center shrink-0">
                  <Trophy className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#8FAFA0] block">REWARDS</span>
                  <span className="text-xs sm:text-sm font-bold text-white">Free Products & Coupons</span>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#0F261B]/80 border border-[#2B5E43] flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#C59A4E]/20 text-[#E6C887] flex items-center justify-center shrink-0">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#8FAFA0] block">RECOGNITION</span>
                  <span className="text-xs sm:text-sm font-bold text-white">Hall of Fame</span>
                </div>
              </div>

            </div>

            {/* CTA Button */}
            <div className="pt-6">
              <button
                onClick={onExplore}
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-[#C59A4E] to-[#E6C887] hover:from-[#D4AF67] hover:to-[#F3DEAA] text-[#0E2419] font-bold text-sm sm:text-base shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 group"
              >
                <span>EXPLORE THE SUTRA</span>
                <ArrowRight className="w-5 h-5 stroke-[2.5] group-hover:translate-x-1.5 transition-transform" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
