import React, { useState } from 'react';
import { X, Star, ShieldCheck, Check, ShoppingBag, Sparkles } from 'lucide-react';
import { VedaFinderLogo } from './VedaLogoBrand';

export default function QuickViewModal({ product, isOpen, onClose, onAddToCart }) {
  const [quantity, setQuantity] = useState(1);
  const [addedAnimation, setAddedAnimation] = useState(false);

  if (!isOpen || !product) return null;

  const handleAdd = () => {
    onAddToCart({
      id: product.id || 'prod-' + Date.now(),
      name: product.name,
      category: product.category || 'Herbal Formulation',
      size: product.weight || product.productWeight || 'Standard Pack',
      price: product.price || 499,
      quantity: quantity,
      image: product.image || '/products/nar-ojas.png'
    });
    setAddedAnimation(true);
    setTimeout(() => {
      setAddedAnimation(false);
      onClose();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-12 flex items-center justify-center">
      <div onClick={onClose} className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" />

      <div className="relative w-full max-w-3xl bg-[#FAF7F2] rounded-3xl shadow-2xl border border-[#D5C9B3] overflow-hidden z-10 animate-scaleUp">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/80 hover:bg-white text-[#183B2B] shadow-md transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12">
          
          {/* Left Visual Column */}
          <div className="md:col-span-5 bg-gradient-to-b from-[#FAF3E6] to-[#EDE3D0] p-6 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-[#E2D4BC] relative">
            <div className="mb-2">
              <VedaFinderLogo size="sm" showTagline={false} />
            </div>

            {/* Showcase Pack Photo */}
            <div className="w-full h-64 flex items-center justify-center p-2">
              <img 
                src={product.image || '/products/nar-ojas.png'} 
                alt={product.name} 
                className="max-h-full max-w-full object-contain filter drop-shadow-xl"
              />
            </div>

            {/* Ayurvedic Dosha Balance */}
            <div className="mt-4 flex items-center gap-2 text-xs text-[#52665A] bg-white/70 px-3 py-1 rounded-full border border-[#D8CBB5]">
              <Sparkles className="w-3.5 h-3.5 text-[#8C682D]" />
              <span>Ayurvedic Standard: <strong>100% Genuine</strong></span>
            </div>
          </div>

          {/* Right Product Details Column */}
          <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-5">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#EAE0CB] text-[#8C682D]">
                  {product.tag || product.category || '100% Pure Formulation'}
                </span>
                <div className="flex items-center gap-1 text-amber-500 text-xs">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span className="font-bold text-[#183B2B]">{product.rating || 4.9}</span>
                  <span className="text-[#84958B]">({product.reviewsCount || 120} reviews)</span>
                </div>
              </div>

              <h3 className="font-serif font-bold text-2xl sm:text-3xl text-[#183B2B] mt-2">
                {product.name}
              </h3>

              {product.hindiName && (
                <p className="font-serif text-sm font-medium text-[#8C682D] mt-1">
                  {product.hindiName}
                </p>
              )}

              <div className="flex items-baseline gap-3 mt-3">
                <span className="font-serif font-bold text-2xl text-[#183B2B]">₹{product.price || 449}</span>
                {product.originalPrice && (
                  <span className="text-sm line-through text-[#8E9F94]">₹{product.originalPrice}</span>
                )}
                <span className="text-xs font-semibold text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded">
                  {product.weight || 'Standard Unit'}
                </span>
              </div>

              <p className="text-sm text-[#4E6155] leading-relaxed mt-3">
                {product.description || 'Authentic formulation manufactured per Ayurvedic scripture with highest quality standardization.'}
              </p>

              {product.indicates && (
                <div className="mt-3 p-2.5 rounded-lg bg-white border border-[#E5DCBF] text-xs text-[#2A4434]">
                  <strong>Indicated In:</strong> {product.indicates}
                </div>
              )}
            </div>

            {/* Actions: Quantity & Add to Cart */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-[#D5C9B3] rounded-full px-3 py-1.5 bg-white">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="text-[#5B6D62] hover:text-[#183B2B] font-bold px-1"
                  >
                    -
                  </button>
                  <span className="font-bold text-sm text-[#183B2B] px-3">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="text-[#5B6D62] hover:text-[#183B2B] font-bold px-1"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAdd}
                  disabled={addedAnimation}
                  className="flex-1 py-3 px-6 rounded-full bg-[#183B2B] hover:bg-[#25553D] text-white font-medium text-sm flex items-center justify-center gap-2 shadow-lg transition-all hover:scale-[1.02]"
                >
                  {addedAnimation ? (
                    <>
                      <Check className="w-4 h-4 text-[#8DE8A4]" />
                      <span>Added to Ayurvedic Cart!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Cart • ₹{(product.price || 449) * quantity}</span>
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center justify-between text-[11px] text-[#6E8075] pt-2 border-t border-[#EAE1D1]">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#8C682D]" /> AYUSH Certified
                </span>
                <span>🚚 Dispatches in 24 Hours</span>
                <span>🌿 With Best Quality</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
