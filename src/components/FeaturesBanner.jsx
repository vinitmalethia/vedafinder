import React from 'react';
import { PureIngredientsIcon, MortarPestleIcon, QualitySealIcon, LotusIcon, BotanicalBranch } from './AyurvedicIcons';

export default function FeaturesBanner() {
  const features = [
    {
      id: 'pure',
      title: 'Pure Ingredients',
      subtitle: 'Made from authentic herbs and minerals',
      icon: <PureIngredientsIcon className="w-10 h-10 text-[#E6C887]" />
    },
    {
      id: 'wisdom',
      title: 'Traditional Wisdom',
      subtitle: 'Backed by centuries of Ayurveda',
      icon: <MortarPestleIcon className="w-10 h-10 text-[#E6C887]" />
    },
    {
      id: 'quality',
      title: 'Quality Assured',
      subtitle: 'Safe, effective and trusted',
      icon: <QualitySealIcon className="w-10 h-10 text-[#E6C887]" />
    },
    {
      id: 'holistic',
      title: 'Holistic Wellness',
      subtitle: 'For a healthier and balanced life',
      icon: <LotusIcon className="w-10 h-10 text-[#E6C887]" />
    }
  ];

  return (
    <section className="relative bg-[#11261B] text-[#FAF6F0] pt-14 pb-14 mt-12 overflow-hidden border-t-2 border-[#D4AF67]/30">
      
      {/* Decorative Golden/Green Botanical Branch - Left Side */}
      <div className="absolute -left-6 bottom-0 w-36 h-36 pointer-events-none opacity-40">
        <BotanicalBranch className="w-full h-full text-[#4E8260]" />
      </div>

      {/* Decorative Golden/Green Botanical Branch - Right Side */}
      <div className="absolute -right-6 bottom-0 w-36 h-36 pointer-events-none opacity-40 rotate-180">
        <BotanicalBranch className="w-full h-full text-[#4E8260]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {features.map((item, index) => (
            <div 
              key={item.id}
              className="flex flex-col items-center text-center px-4 group transition-transform duration-300 hover:-translate-y-1"
            >
              {/* Gold Line Icon with subtle glow */}
              <div className="mb-3.5 p-2 rounded-2xl bg-white/5 border border-[#C59A4E]/20 group-hover:border-[#E6C887] group-hover:bg-white/10 transition-all duration-300">
                {item.icon}
              </div>

              {/* Title */}
              <h4 className="font-serif font-bold text-lg text-[#F7EBD6] tracking-wide mb-1 group-hover:text-[#E6C887] transition-colors">
                {item.title}
              </h4>

              {/* Subtitle */}
              <p className="text-xs text-[#A8C4B4] leading-relaxed max-w-[220px]">
                {item.subtitle}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
