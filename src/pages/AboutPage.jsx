import React from 'react';
import { Leaf, Award, CheckCircle2, Heart, ShieldCheck, Sparkles, BookOpen } from 'lucide-react';
import { VedaFinderLogo } from '../components/VedaLogoBrand';

export default function AboutPage({ onNavigate }) {
  return (
    <div className="py-12 bg-[#FAF7F2] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Page Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EAE0CB] text-[#8C682D] text-xs font-bold uppercase tracking-widest">
            <Leaf className="w-3.5 h-3.5" />
            <span>Our Roots & Sacred Purpose</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#183B2B] leading-tight">
            Restoring Authentic Ayurveda to the World
          </h1>
          <p className="text-[#596D61] text-base sm:text-lg leading-relaxed">
            Veda Finder was established with a singular vision: to bring genuine, scripturally unadulterated Ayurvedic bhasmas, pishtis, and rasayanas to modern health-seekers.
          </p>
        </div>

        {/* Visual Showcase: 3 Authentic Ayurvedic Process Photos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-3xl p-4 border border-[#E5DBCA] shadow-md space-y-3 group">
            <div className="w-full h-64 rounded-2xl overflow-hidden relative shadow-inner">
              <img 
                src="/images/ayurvedic-mortar-herbs.jpg" 
                alt="Ayurvedic Mortar and Pestle Grinding Fresh Herbs" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <span className="absolute bottom-3 left-3 text-xs font-bold text-white bg-[#183B2B]/85 px-3 py-1 rounded-full backdrop-blur-sm">
                1. Bhavana Trituration
              </span>
            </div>
            <p className="text-xs text-[#526659] leading-relaxed p-1">
              Cold-grinding fresh botanical juices in granite mortars (Kharal) to impregnate mineral ash with organic phyto-nutrients.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-4 border border-[#E5DBCA] shadow-md space-y-3 group">
            <div className="w-full h-64 rounded-2xl overflow-hidden relative shadow-inner">
              <img 
                src="/images/ayurvedic-herbs-bowls.jpg" 
                alt="Authentic Ayurvedic Whole Herbs in Wooden Bowls" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <span className="absolute bottom-3 left-3 text-xs font-bold text-white bg-[#8C682D]/90 px-3 py-1 rounded-full backdrop-blur-sm">
                2. Wildcrafted Sourcing
              </span>
            </div>
            <p className="text-xs text-[#526659] leading-relaxed p-1">
              Over 120+ wild botanicals harvested in peak season when active alkaloids and Prana are maximum.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-4 border border-[#E5DBCA] shadow-md space-y-3 group">
            <div className="w-full h-64 rounded-2xl overflow-hidden relative shadow-inner">
              <img 
                src="/images/herbal-tea-brew.jpg" 
                alt="Pouring freshly brewed herbal tea through natural muslin" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <span className="absolute bottom-3 left-3 text-xs font-bold text-white bg-[#183B2B]/85 px-3 py-1 rounded-full backdrop-blur-sm">
                3. Pure Infusion & Kashaya
              </span>
            </div>
            <p className="text-xs text-[#526659] leading-relaxed p-1">
              Natural decoctions, floral hydrosols, and Agnisip digestive infusions filtered with unbleached muslin for pristine purity.
            </p>
          </div>
        </div>

        {/* Brand Banner Card */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#E5DBCA] shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-5">
            <VedaFinderLogo size="lg" showTagline={true} />
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#183B2B]">
              True to the Samhitas, Safe for Tomorrow
            </h2>
            <p className="text-sm sm:text-base text-[#4D6154] leading-relaxed">
              In an era of commercial shortcuts, Veda Finder honors the sacred protocols of <em>Shodhan</em> (purification), <em>Bhavana</em> (herbal trituration), and <em>Marana</em> (incineration in Puttas). We ensure that every grain of Bhasma passes the classical tests of <strong>Varitaratwa</strong> (floating on water) and <strong>Rekhapurnatwa</strong> (entering the skin micro-creases).
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#FAF6EE] border border-[#E8DFC9]">
                <CheckCircle2 className="w-5 h-5 text-[#8C682D] shrink-0 mt-0.5" />
                <div className="text-xs text-[#3E5246]">
                  <strong>100% Classical Protocols:</strong> No synthetic fillers, heavy metal tested.
                </div>
              </div>
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#FAF6EE] border border-[#E8DFC9]">
                <Award className="w-5 h-5 text-[#8C682D] shrink-0 mt-0.5" />
                <div className="text-xs text-[#3E5246]">
                  <strong>AYUSH & GMP Certified:</strong> Manufactured in sterile, licensed units.
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-gradient-to-br from-[#183B2B] to-[#0E2419] rounded-2xl p-8 text-[#FAF6F0] space-y-6 text-center">
            <span className="text-xs uppercase font-bold tracking-widest text-[#E6C887]">Pledge of Purity</span>
            <blockquote className="font-serif italic text-lg leading-relaxed text-[#F4E8D4]">
              "न हि रसशास्त्रात् परं किञ्चिद् रसायनम्"
            </blockquote>
            <p className="text-xs text-[#A8C2B3]">
              "There is no rejuvenation superior to the sacred formulations of Rasashastra when prepared with devotion and purity."
            </p>
            <div className="pt-2">
              <button
                onClick={() => onNavigate('Shop')}
                className="w-full py-3 rounded-full bg-[#C59A4E] hover:bg-[#D4AF67] text-[#122A1E] font-bold text-sm transition-all shadow-md"
              >
                Explore Formulations
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
