import React, { useState } from 'react';
import { Search, X, ArrowRight, Sparkles } from 'lucide-react';
import { CATEGORIES, HERO_SLIDES } from '../data/products';

export default function SearchModal({ isOpen, onClose, initialQuery = '', onSelectProduct }) {
  const [query, setQuery] = useState(initialQuery);

  if (!isOpen) return null;

  // Flatten all products across categories and hero slides
  const allItems = [
    ...HERO_SLIDES.map(s => ({
      name: s.productName + ' - ' + s.productSubtitle,
      category: 'Featured Hero',
      price: s.price,
      tag: s.productBenefit,
      details: s.description,
      raw: s
    })),
    ...CATEGORIES.flatMap(cat => cat.items.map(it => ({
      name: it.name,
      category: cat.title,
      price: it.price,
      tag: cat.subtitle,
      details: `Authentic classical Ayurvedic preparation crafted in accordance with Sharangadhara Samhita.`,
      raw: it
    })))
  ];

  const filtered = query.trim() === '' 
    ? allItems.slice(0, 6) 
    : allItems.filter(item => 
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase()) ||
        item.tag.toLowerCase().includes(query.toLowerCase())
      );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-20">
      <div onClick={onClose} className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" />

      <div className="relative max-w-2xl mx-auto bg-[#FAF7F2] rounded-3xl shadow-2xl border border-[#D5C9B3] overflow-hidden">
        
        {/* Search Input Bar */}
        <div className="p-4 sm:p-5 bg-white border-b border-[#EAE2D2] flex items-center gap-3">
          <Search className="w-5 h-5 text-[#8C682D] shrink-0" />
          <input
            type="text"
            placeholder="Search herbal teas, bhasmas, pishtis, capsules, ingredients..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full bg-transparent text-base text-[#183B2B] placeholder-[#8A9B91] focus:outline-none"
          />
          <button onClick={onClose} className="p-1 rounded-full text-[#73857B] hover:text-[#183B2B]">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Suggestion Pills */}
        <div className="px-5 py-3 bg-[#F4EDE0] border-b border-[#EAE2D2] flex items-center gap-2 overflow-x-auto text-xs">
          <span className="text-[#8C682D] font-bold flex items-center gap-1 shrink-0">
            <Sparkles className="w-3.5 h-3.5" /> Popular:
          </span>
          {['Agnisip Tea', 'Swarna Bhasma', 'Ashwagandha', 'Mukta Pishti', 'Triphala'].map((tag) => (
            <button
              key={tag}
              onClick={() => setQuery(tag)}
              className="px-2.5 py-1 rounded-full bg-white/80 hover:bg-white text-[#183B2B] border border-[#DFCFA8] shrink-0 transition-colors"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-5 space-y-3">
          {filtered.length === 0 ? (
            <div className="text-center py-10 text-[#718278]">
              <p className="font-serif text-lg text-[#183B2B]">No formulations found for "{query}"</p>
              <p className="text-xs mt-1">Try searching for Digestion, Immunity, Rasayana, or Bhasma.</p>
            </div>
          ) : (
            filtered.map((item, idx) => (
              <div
                key={idx}
                onClick={() => {
                  if (onSelectProduct) onSelectProduct(item);
                  onClose();
                }}
                className="p-3.5 rounded-xl bg-white hover:bg-[#FAF4E8] border border-[#E8DFC9] hover:border-[#8C682D] transition-all flex items-center justify-between cursor-pointer group"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C682D] bg-[#F4EDE0] px-2 py-0.5 rounded">
                      {item.category}
                    </span>
                    <span className="text-xs text-[#62756A]">{item.tag}</span>
                  </div>
                  <h4 className="font-serif font-bold text-base text-[#183B2B] mt-1 group-hover:text-[#8C682D]">
                    {item.name}
                  </h4>
                </div>

                <div className="flex items-center gap-4 shrink-0">
                  <span className="font-bold text-sm text-[#183B2B]">₹{item.price}</span>
                  <div className="w-8 h-8 rounded-full bg-[#183B2B]/10 group-hover:bg-[#183B2B] group-hover:text-white flex items-center justify-center transition-all">
                    <ArrowRight className="w-4 h-4 text-[#183B2B] group-hover:text-white" />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}
