import React from 'react';
import { Star, ShoppingBag, Eye, Sparkles, ArrowRight } from 'lucide-react';
import { PRODUCTS_CATALOG } from '../data/products';

export default function ShopSection({ onQuickView, onAddToCart, onNavigate, isHome = true, limit = 4 }) {
  // On home page, showcase only 4 top featured products
  const featuredProducts = PRODUCTS_CATALOG.slice(0, limit);

  return (
    <section id="shop" className="py-20 bg-[#FAF7F2] border-t border-[#EAE2D2] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EAE0CB] text-[#8C682D] text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Featured Formulations</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#183B2B]">
            Handpicked Classical Remedies
          </h2>
          <p className="text-[#5D6F64] text-sm sm:text-base">
            Our most revered classical Ayurvedic formulations, crafted strictly in accordance with ancient Samhitas.
          </p>
        </div>

        {/* Featured 4 Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className="group bg-white rounded-2xl p-5 border border-[#E8DFC9] hover:border-[#8C682D] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1.5"
            >
              {/* Card Top: Category Badge & Rating */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-[#FAF3E6] text-[#8C682D] border border-[#E2D2B5]">
                    {product.category}
                  </span>
                  <div className="flex items-center gap-1 text-xs text-amber-500 font-bold">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span>{product.rating}</span>
                  </div>
                </div>

                {/* 3D Product Box Pack Image */}
                <div className="w-full h-52 bg-gradient-to-b from-[#FAF6EE] to-[#F2EADC] rounded-xl flex items-center justify-center p-3 border border-[#EFE5D3] group-hover:scale-105 transition-transform duration-300 relative overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="h-full w-full object-contain filter drop-shadow-md"
                  />
                </div>

                {/* Hindi & English Title */}
                <h3 className="font-serif font-bold text-base text-[#183B2B] mt-4 line-clamp-1 group-hover:text-[#8C682D] transition-colors">
                  {product.name}
                </h3>
                <p className="text-xs font-medium text-[#8C682D] italic truncate mt-0.5">
                  {product.hindiName}
                </p>
                <p className="text-xs text-[#67796F] mt-1.5 line-clamp-2 leading-relaxed">
                  {product.indicates}
                </p>
              </div>

              {/* Price & Action Buttons */}
              <div className="pt-4 mt-4 border-t border-[#EAE2D2] flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-[#7A8B81] uppercase block">Pack: {product.weight}</span>
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-serif font-bold text-xl text-[#183B2B]">₹{product.price}</span>
                    {product.originalPrice && (
                      <span className="text-xs line-through text-[#9BA8A0]">₹{product.originalPrice}</span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => onQuickView(product)}
                    className="p-2.5 rounded-full bg-[#FAF5EC] hover:bg-[#EAE0CB] text-[#183B2B] transition-colors border border-[#DFCFA8]"
                    title="Quick Details"
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
                    className="p-2.5 rounded-full bg-[#183B2B] hover:bg-[#2A5E44] text-white transition-all shadow-md hover:scale-105"
                    title="Add to Cart"
                  >
                    <ShoppingBag className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* View All In Store CTA Button on Home */}
        {isHome && (
          <div className="mt-12 text-center">
            <button
              onClick={() => onNavigate && onNavigate('Shop')}
              className="group inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-[#183B2B] hover:bg-[#25553D] text-[#FAF7F2] font-medium text-sm shadow-lg shadow-[#183B2B]/20 transition-all duration-300 hover:scale-[1.02]"
            >
              <span>Explore All 10 Formulations in Dispensary</span>
              <ArrowRight className="w-4 h-4 stroke-[2.2] group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
