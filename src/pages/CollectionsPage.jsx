import React from 'react';
import { ArrowRight, Sparkles, ShieldCheck, Heart, Leaf } from 'lucide-react';
import { PRODUCTS_CATALOG } from '../data/products';

export default function CollectionsPage({ onSelectProduct, onQuickView, onAddToCart, onNavigate }) {
  const collections = [
    {
      id: 'bhasma-collection',
      title: 'The Classical Bhasma Dispensary (भस्म संग्रह)',
      subtitle: 'Ancient Nano-Medicine Calcinated in Cow Dung & Herbal Juices',
      description: 'Bhasmas are micro-fine, calcinated herbo-mineral ash formulations prepared through hundreds of Puttas (cycles) to convert minerals into biological cell-absorbable state without toxic side effects.',
      badge: 'Rasashastra Heritage',
      products: PRODUCTS_CATALOG.filter(p => p.categoryId === 'bhasma')
    },
    {
      id: 'pishti-collection',
      title: 'Moon & Rose-Processed Pishti (पिष्टी संग्रह)',
      subtitle: 'Triturated Pearls & Corals in Pure Distilled Rose Water',
      description: 'Pishtis are prepared without heat by grinding precious pearls (Mukta) and corals (Praval) in herbal juices under moon rays. Supreme remedies for cooling aggravated Pitta, acidity, and burning sensations.',
      badge: 'Pitta Shamak & Cooling',
      products: PRODUCTS_CATALOG.filter(p => p.categoryId === 'pishti')
    },
    {
      id: 'rasayana-collection',
      title: 'Vitality & Daily Rasayana (ओज एवं रसायन)',
      subtitle: 'Pure Herbal Potency for Modern Men & Women',
      description: 'Potent formulations combining high-grade Shilajit, Swarna Makshik, Ashwagandha, and Safed Musli for cellular vitality, sustained vigor, and nervous resilience.',
      badge: 'Ojas & Vigor',
      products: PRODUCTS_CATALOG.filter(p => p.categoryId === 'capsules' || p.categoryId === 'herbal-tea')
    }
  ];

  return (
    <div className="py-12 bg-[#FAF7F2] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EAE0CB] text-[#8C682D] text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Sacred Ayurvedic Vaults</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#183B2B]">
            Curated Ayurvedic Collections
          </h1>
          <p className="text-[#596C60] text-sm sm:text-base">
            Explore dedicated dispensaries classified according to classical Ayurvedic Rasashastra and Samhita principles.
          </p>
        </div>

        {/* Collections Sections */}
        {collections.map((coll, idx) => (
          <div 
            key={coll.id}
            className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E6DCBF] shadow-md space-y-8"
          >
            {/* Collection Header */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-[#EAE1CF] pb-6">
              <div className="space-y-1.5 max-w-2xl">
                <span className="text-xs font-bold uppercase tracking-widest text-[#8C682D] bg-[#FAF3E6] px-3 py-1 rounded-full border border-[#E4D4B8]">
                  {coll.badge}
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#183B2B] pt-1">
                  {coll.title}
                </h2>
                <p className="text-xs sm:text-sm text-[#8C682D] font-medium italic">
                  {coll.subtitle}
                </p>
                <p className="text-xs sm:text-sm text-[#5B6D62] pt-1 leading-relaxed">
                  {coll.description}
                </p>
              </div>

              <button
                onClick={() => onNavigate('Shop')}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#FAF5EB] hover:bg-[#183B2B] text-[#183B2B] hover:text-white border border-[#D5C9B3] text-xs font-semibold transition-all shrink-0 self-start lg:self-center"
              >
                <span>View Full Store</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Collection Product Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {coll.products.map((product) => (
                <div
                  key={product.id}
                  className="group bg-[#FAF7F2] rounded-2xl p-4 border border-[#EAE1CF] hover:border-[#8C682D] hover:bg-white shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="w-full h-48 bg-white rounded-xl flex items-center justify-center p-3 border border-[#EAE2D2] group-hover:scale-105 transition-transform duration-300">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="h-full w-full object-contain filter drop-shadow"
                      />
                    </div>

                    <h3 className="font-serif font-bold text-base text-[#183B2B] mt-3 truncate group-hover:text-[#8C682D]">
                      {product.name}
                    </h3>
                    <p className="text-xs text-[#8C682D] italic truncate">
                      {product.hindiName}
                    </p>
                    <p className="text-[11px] text-[#697B70] mt-1 line-clamp-2">
                      {product.indicates}
                    </p>
                  </div>

                  <div className="pt-3 mt-3 border-t border-[#EAE2D2] flex items-center justify-between">
                    <span className="font-serif font-bold text-lg text-[#183B2B]">₹{product.price}</span>
                    
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => onQuickView(product)}
                        className="p-2 rounded-full bg-white hover:bg-[#EAE0CB] text-[#183B2B] transition-colors border border-[#DFCFA8]"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onAddToCart({
                          id: product.id,
                          name: product.name,
                          category: product.category,
                          size: product.weight,
                          price: product.price,
                          quantity: 1,
                          image: product.image
                        })}
                        className="px-3.5 py-1.5 rounded-full bg-[#183B2B] hover:bg-[#2A5E44] text-white text-xs font-semibold flex items-center gap-1 shadow transition-all"
                      >
                        <span>Add</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

      </div>
    </div>
  );
}
