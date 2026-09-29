import React from 'react';
import { ArrowRight } from 'lucide-react';
import { CATEGORIES } from '../data/products';

export default function CategoryCards({ onSelectCategory }) {
  return (
    <section id="categories" className="relative -mt-6 sm:-mt-10 lg:-mt-12 z-20 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-5">
        {CATEGORIES.map((cat) => (
          <div
            key={cat.id}
            onClick={() => onSelectCategory && onSelectCategory(cat)}
            className="group relative bg-[#FAF7F2]/95 backdrop-blur-md rounded-2xl p-2.5 sm:p-4 border border-[#EAE1D1] hover:border-[#C5A059] shadow-sm hover:shadow-xl transition-all duration-300 flex items-center justify-between cursor-pointer hover:-translate-y-1 active:scale-[0.98]"
          >
            {/* Product Pack Thumbnail */}
            <div className="shrink-0 w-11 h-11 sm:w-16 sm:h-16 flex items-center justify-center p-0.5 sm:p-1 rounded-xl bg-white/90 border border-[#E6DCBF]/60 group-hover:scale-105 transition-transform duration-300 shadow-sm overflow-hidden">
              <img 
                src={cat.image} 
                alt={cat.title} 
                className="w-full h-full object-contain filter drop-shadow" 
              />
            </div>

            {/* Title & Subtitle */}
            <div className="flex-1 px-2 sm:px-3.5 min-w-0">
              <h3 className="font-serif font-bold text-sm sm:text-xl text-[#183B2B] truncate group-hover:text-[#8C682D] transition-colors">
                {cat.title}
              </h3>
              <p className="text-[10px] sm:text-xs text-[#6B7B70] leading-snug truncate mt-0.5 font-normal">
                {cat.subtitle}
              </p>
            </div>

            {/* Circular Arrow Button */}
            <div className="shrink-0 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-[#C59A4E]/20 text-[#8C682D] group-hover:bg-[#183B2B] group-hover:text-white flex items-center justify-center transition-all duration-300 shadow-sm">
              <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 stroke-[2.2] group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
