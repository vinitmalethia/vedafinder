import React from 'react';
import { PureIngredientsIcon, MortarPestleIcon, QualitySealIcon, LotusIcon, BotanicalBranch } from './AyurvedicIcons';

export default function FeaturesBanner() {
  const features = [
    {
      id: 'pure',
      title: 'Pure Ingredients',
      subtitle: 'Made from authentic herbs and minerals',
      icon: <PureIngredientsIcon className="w-8 h-8 sm:w-10 sm:h-10 text-[#E6C887]" />
    },
    {
      id: 'wisdom',
      title: 'Traditional Wisdom',
      subtitle: 'Backed by centuries of Ayurveda',
      icon: <MortarPestleIcon className="w-8 h-8 sm:w-10 sm:h-10 text-[#E6C887]" />
    },
    {
      id: 'quality',
      title: 'Quality Assured',
      subtitle: 'Safe, effective and trusted',
      icon: <QualitySealIcon className="w-8 h-8 sm:w-10 sm:h-10 text-[#E6C887]" />
    },
    {
      id: 'holistic',
      title: 'Holistic Wellness',
      subtitle: 'For a healthier and balanced life',
      icon: <LotusIcon className="w-8 h-8 sm:w-10 sm:h-10 text-[#E6C887]" />
    }
  ];

  return (
    <section className="relative bg-[#11261B] text-[#FAF6F0] pt-10 pb-10 sm:pt-14 sm:pb-14 mt-8 sm:mt-12 overflow-hidden border-t-2 border-[#D4AF67]/30">
      
      {/* Decorative Golden/Green Botanical Branch - Left Side */}
      <div className="absolute -left-6 bottom-0 w-28 sm:w-36 h-28 sm:h-36 pointer-events-none opacity-30 sm:opacity-40">
        <BotanicalBranch className="w-full h-full text-[#4E8260]" />
      </div>

      {/* Decorative Golden/Green Botanical Branch - Right Side */}
      <div className="absolute -right-6 bottom-0 w-28 sm:w-36 h-28 sm:h-36 pointer-events-none opacity-30 sm:opacity-40 rotate-180">
        <BotanicalBranch className="w-full h-full text-[#4E8260]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {features.map((item) => (
            <div 
              key={item.id}
              className="flex flex-col items-center text-center px-1 sm:px-4 group transition-transform duration-300 hover:-translate-y-1"
            >
              {/* Gold Line Icon */}
              <div className="mb-2 sm:mb-3.5 p-2 rounded-2xl bg-white/5 border border-[#C59A4E]/20 group-hover:border-[#E6C887] group-hover:bg-white/10 transition-all duration-300">
                {item.icon}
              </div>

              {/* Title */}
              <h4 className="font-serif font-bold text-sm sm:text-lg text-[#F7EBD6] tracking-wide mb-0.5 sm:mb-1 group-hover:text-[#E6C887] transition-colors">
                {item.title}
              </h4>

              {/* Subtitle */}
              <p className="text-[11px] sm:text-xs text-[#9BB5A6] font-normal leading-relaxed">
                {item.subtitle}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
