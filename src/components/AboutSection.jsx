import React from 'react';
import { Leaf, CheckCircle2, Award, ArrowRight } from 'lucide-react';
import { VedaFinderLogo } from './VedaLogoBrand';

export default function AboutSection({ onLearnMore }) {
  return (
    <section id="about" className="py-20 bg-gradient-to-b from-[#FAF7F2] to-[#F3ECE0] border-t border-[#EAE2D2] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EAE0CB] text-[#8C682D] text-xs font-bold uppercase tracking-widest">
              <Leaf className="w-3.5 h-3.5" />
              <span>5,000 Years of Vedic Science</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#183B2B] leading-tight">
              Rooted in Antiquity, Refined for Modern Life
            </h2>

            <p className="text-[#516458] text-base leading-relaxed">
              At <strong>Veda Finder</strong>, our mission is to restore the purest wisdom of Ayurvedic medicine. Every formulation is prepared strictly adhering to classical texts like <em>Charaka Samhita</em>, <em>Sushruta Samhita</em>, and <em>Bhavaprakasha</em>.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white/90 border border-[#E3D7C1] shadow-sm">
                <CheckCircle2 className="w-5 h-5 text-[#8C682D] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-serif font-bold text-sm text-[#183B2B]">Wildcrafted Botanicals</h4>
                  <p className="text-xs text-[#6A7C71] mt-0.5">Ethically harvested from pristine Himalayan valleys.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white/90 border border-[#E3D7C1] shadow-sm">
                <Award className="w-5 h-5 text-[#8C682D] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-serif font-bold text-sm text-[#183B2B]">GMP & AYUSH Certified</h4>
                  <p className="text-xs text-[#6A7C71] mt-0.5">Third-party lab tested for heavy metals and purity.</p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onLearnMore}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#183B2B] hover:bg-[#27583F] text-white text-xs font-semibold shadow-md transition-all group"
              >
                <span>Discover Our Ancient Heritage</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Right Dual Visual Cards with Real Ayurvedic Photos */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-5 relative">
            
            {/* Card 1: Traditional Stone Mortar Preparation */}
            <div className="bg-white rounded-3xl p-3 border border-[#DFD3BE] shadow-xl space-y-3 group hover:-translate-y-1 transition-transform">
              <div className="w-full h-56 rounded-2xl overflow-hidden shadow-inner relative">
                <img 
                  src="/images/ayurvedic-mortar-herbs.jpg" 
                  alt="Traditional Ayurvedic Mortar and Pestle Grinding" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <span className="absolute bottom-3 left-3 text-[11px] font-bold tracking-wide text-white uppercase bg-[#183B2B]/80 backdrop-blur-sm px-2.5 py-1 rounded-md">
                  Kharal Rasashastra
                </span>
              </div>
              <div className="p-2 space-y-1">
                <h4 className="font-serif font-bold text-sm text-[#183B2B]">Ancient Bhavana Trituration</h4>
                <p className="text-[11px] text-[#697B70] leading-snug">
                  Herbs ground with cold-pressed juices to achieve microscopic cellular potency.
                </p>
              </div>
            </div>

            {/* Card 2: Ayurvedic Botanicals & Whole Herbs */}
            <div className="bg-white rounded-3xl p-3 border border-[#DFD3BE] shadow-xl space-y-3 group hover:-translate-y-1 transition-transform sm:translate-y-6">
              <div className="w-full h-56 rounded-2xl overflow-hidden shadow-inner relative">
                <img 
                  src="/images/ayurvedic-herbs-bowls.jpg" 
                  alt="Authentic Ayurvedic Whole Herbs in Wooden Bowls" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <span className="absolute bottom-3 left-3 text-[11px] font-bold tracking-wide text-white uppercase bg-[#8C682D]/90 backdrop-blur-sm px-2.5 py-1 rounded-md">
                  100% Wildcrafted
                </span>
              </div>
              <div className="p-2 space-y-1">
                <h4 className="font-serif font-bold text-sm text-[#183B2B]">Sacred Raw Botanicals</h4>
                <p className="text-[11px] text-[#697B70] leading-snug">
                  Hand-selected roots, barks, flowers, and mineral resins from certified native habitats.
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
