import React, { useState, useEffect, useRef } from 'react';
import { 
  Star, 
  ChevronLeft, 
  ChevronRight, 
  LayoutGrid, 
  Truck, 
  Check, 
  Share2, 
  Heart, 
  ShoppingBag, 
  Sparkles, 
  ShieldCheck, 
  MessageCircle, 
  Calendar,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { PRODUCTS_CATALOG, getProductFullDetails } from '../data/products';

export default function ProductDetailPage({ 
  product, 
  onNavigate, 
  onSelectProduct, 
  onAddToCart, 
  onBuyNow 
}) {
  const detailedProduct = getProductFullDetails(product);

  // States
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedVariationIndex, setSelectedVariationIndex] = useState(
    detailedProduct?.variations?.findIndex(v => v.label === '100' || v.label === '10GM' || v.label === '10') !== -1 
      ? Math.max(0, detailedProduct?.variations?.findIndex(v => v.label === '100' || v.label === '10GM' || v.label === '10'))
      : 0
  );
  const [quantity, setQuantity] = useState(1);
  const [isReadMoreExpanded, setIsReadMoreExpanded] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showShareToast, setShowShareToast] = useState(false);
  const [showStickyBottom, setShowStickyBottom] = useState(false);
  const [activeTab, setActiveTab] = useState('description');
  const buySectionRef = useRef(null);

  // Scroll to top on product change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActiveImageIndex(0);
    setQuantity(1);
    setIsReadMoreExpanded(false);
    const defaultIdx = detailedProduct?.variations?.findIndex(v => v.label === '100' || v.label === '10GM' || v.label === '10');
    setSelectedVariationIndex(defaultIdx !== -1 && defaultIdx !== undefined ? Math.max(0, defaultIdx) : 0);
  }, [product?.id]);

  // Track scroll for Sticky Bottom Bar
  useEffect(() => {
    const handleScroll = () => {
      if (buySectionRef.current) {
        const rect = buySectionRef.current.getBoundingClientRect();
        // Show sticky bar when the buy button scrolls off the top of screen
        setShowStickyBottom(rect.bottom < 100);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!detailedProduct) return null;

  const currentVariation = detailedProduct.variations[selectedVariationIndex] || {
    label: detailedProduct.weight,
    weight: detailedProduct.weight,
    price: detailedProduct.price,
    originalPrice: detailedProduct.originalPrice
  };

  const activePrice = currentVariation.price;
  const activeOriginalPrice = currentVariation.originalPrice;
  const activeWeight = currentVariation.weight || detailedProduct.weight;

  // Gallery array
  const gallery = detailedProduct.gallery && detailedProduct.gallery.length > 0 
    ? detailedProduct.gallery 
    : [detailedProduct.image];

  // Prev / Next Navigation in catalog
  const currentIndex = PRODUCTS_CATALOG.findIndex(p => p.id === detailedProduct.id);
  const prevProduct = currentIndex > 0 
    ? PRODUCTS_CATALOG[currentIndex - 1] 
    : PRODUCTS_CATALOG[PRODUCTS_CATALOG.length - 1];
  const nextProduct = currentIndex < PRODUCTS_CATALOG.length - 1 
    ? PRODUCTS_CATALOG[currentIndex + 1] 
    : PRODUCTS_CATALOG[0];

  // Related products (exclude current)
  const relatedProducts = PRODUCTS_CATALOG.filter(p => p.id !== detailedProduct.id).slice(0, 4);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setShowShareToast(true);
      setTimeout(() => setShowShareToast(false), 2500);
    }
  };

  const handleAddCurrentToBag = (openDrawer = true) => {
    onAddToCart({
      id: `${detailedProduct.id}-${currentVariation.label}`,
      name: detailedProduct.name,
      category: detailedProduct.category,
      size: activeWeight,
      price: activePrice,
      quantity: quantity,
      image: gallery[0] || detailedProduct.image
    }, openDrawer);
  };

  const handleBuyCurrentNow = () => {
    const item = {
      id: `${detailedProduct.id}-${currentVariation.label}`,
      name: detailedProduct.name,
      category: detailedProduct.category,
      size: activeWeight,
      price: activePrice,
      quantity: quantity,
      image: gallery[0] || detailedProduct.image
    };
    if (onBuyNow) {
      onBuyNow(item);
    } else {
      onAddToCart(item, true);
    }
  };

  return (
    <div className="bg-[#FAF7F2] min-h-screen text-[#222E26] pb-24 relative selection:bg-[#5D7A44] selection:text-white">
      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6">
        
        {/* Breadcrumb & Navigation Bar */}
        <div className="flex items-center justify-between py-2 mb-4 border-b border-[#E6DCBF]/70 text-xs text-[#6F7F74]">
          <div className="flex items-center gap-1.5 flex-wrap">
            <button 
              onClick={() => onNavigate('Home')} 
              className="hover:text-[#183B2B] transition-colors"
            >
              Home
            </button>
            <span>/</span>
            <button 
              onClick={() => onNavigate('Shop')} 
              className="hover:text-[#183B2B] transition-colors"
            >
              Collections
            </button>
            <span>/</span>
            <span className="text-[#8C682D] font-medium">{detailedProduct.category}</span>
            <span>/</span>
            <span className="text-[#183B2B] font-semibold truncate max-w-[180px] sm:max-w-none">
              {detailedProduct.name}
            </span>
          </div>

          {/* Prev / Next & Grid Navigator (Matches Reference Top Right) */}
          <div className="flex items-center gap-1 text-[#4F6355]">
            <button 
              onClick={() => onSelectProduct(prevProduct)}
              className="p-1 rounded-full hover:bg-[#EAE0CB] transition-colors"
              title="Previous Product"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button 
              onClick={() => onNavigate('Shop')}
              className="p-1 rounded-full hover:bg-[#EAE0CB] transition-colors"
              title="View All Products"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button 
              onClick={() => onSelectProduct(nextProduct)}
              className="p-1 rounded-full hover:bg-[#EAE0CB] transition-colors"
              title="Next Product"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 2-Column Product Showcase Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pt-2">
          
          {/* LEFT: Product Photography & Thumbnails */}
          <div className="lg:col-span-6 flex flex-col space-y-4">
            {/* Main Active Image Showcase */}
            <div className="w-full bg-[#F3EBDD] rounded-2xl sm:rounded-3xl p-4 sm:p-8 flex items-center justify-center border border-[#E4D8C1] shadow-sm relative overflow-hidden group min-h-[340px] sm:min-h-[480px]">
              <img 
                src={gallery[activeImageIndex] || gallery[0]} 
                alt={detailedProduct.name} 
                className="max-h-[320px] sm:max-h-[440px] w-auto object-contain filter drop-shadow-xl transition-transform duration-500 group-hover:scale-105"
              />
              {detailedProduct.tag && (
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase text-[#557838] border border-[#DCD0B9] shadow-xs">
                  {detailedProduct.tag}
                </div>
              )}
            </div>

            {/* Thumbnails Row (Matches Screenshot 2) */}
            <div className="flex items-center gap-3 overflow-x-auto pb-2 no-scrollbar">
              {gallery.map((imgSrc, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl p-1.5 bg-white border transition-all duration-200 shrink-0 flex items-center justify-center overflow-hidden ${
                    activeImageIndex === idx 
                      ? 'border-[#557838] ring-2 ring-[#557838]/50 shadow-md' 
                      : 'border-[#E6DCBF] hover:border-[#8C682D] opacity-80 hover:opacity-100'
                  }`}
                >
                  <img 
                    src={imgSrc} 
                    alt={`${detailedProduct.name} view ${idx + 1}`} 
                    className="h-full w-full object-contain filter drop-shadow-xs"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT: Product Details & Purchase Actions (Matches Screenshot 3) */}
          <div className="lg:col-span-6 flex flex-col space-y-5">
            
            <div>
              {/* Product Title */}
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#183B2B] tracking-tight">
                {detailedProduct.name}
              </h1>

              {detailedProduct.hindiName && (
                <p className="font-serif text-base sm:text-lg text-[#8C682D] font-medium mt-1">
                  {detailedProduct.hindiName}
                </p>
              )}

              {/* Reviews Link */}
              <div className="flex items-center gap-2 mt-2 text-xs">
                <div className="flex items-center text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <button 
                  onClick={() => {
                    const el = document.getElementById('product-reviews');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="font-bold text-[11px] tracking-wider text-[#5D6F64] hover:text-[#183B2B] uppercase underline"
                >
                  VIEW ALL REVIEWS ({detailedProduct.reviewsCount})
                </button>
              </div>
            </div>

            {/* Price Row */}
            <div className="flex items-baseline gap-3 pt-1">
              <span className="font-serif text-3xl sm:text-4xl font-bold text-[#183B2B]">
                Rs. {activePrice}.00
              </span>
              {activeOriginalPrice && (
                <span className="text-base sm:text-lg line-through text-[#9AAAA0]">
                  Rs. {activeOriginalPrice}.00
                </span>
              )}
              {activeOriginalPrice && activeOriginalPrice > activePrice && (
                <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-[#EBF5EE] text-[#2E6B39] border border-[#C5DEC9]">
                  {Math.round(((activeOriginalPrice - activePrice) / activeOriginalPrice) * 100)}% OFF
                </span>
              )}
            </div>

            {/* Short Description with Read More / Read Less */}
            <div className="text-xs sm:text-sm text-[#4E6255] leading-relaxed">
              <p>
                {isReadMoreExpanded 
                  ? detailedProduct.fullDescription 
                  : `${detailedProduct.shortDescription.slice(0, 160)}... `}
                <button 
                  onClick={() => setIsReadMoreExpanded(!isReadMoreExpanded)}
                  className="font-bold text-[#557838] hover:text-[#183B2B] ml-1 underline inline-block"
                >
                  {isReadMoreExpanded ? 'Read Less' : 'Read More'}
                </button>
              </p>
            </div>

            {/* Availability & Category Metadata */}
            <div className="space-y-1.5 pt-2 text-xs border-t border-[#E8DFC9]">
              <div className="flex items-center gap-2">
                <span className="font-bold uppercase tracking-wider text-[#738478] text-[11px]">
                  AVAILABLE:
                </span>
                <span className="inline-flex items-center gap-1 font-bold text-[#4B7931]">
                  IN STOCK
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="font-bold uppercase tracking-wider text-[#738478] text-[11px]">
                  CATEGORY:
                </span>
                <span className="text-[#183B2B] font-medium">
                  {detailedProduct.category}
                </span>
              </div>
            </div>

            {/* GM / Variation Selector (Matches Screenshot 3) */}
            <div className="pt-2 space-y-2">
              <div className="text-xs font-bold text-[#183B2B] uppercase tracking-wider">
                GM: {currentVariation.label}
              </div>
              <div className="flex items-center gap-2.5">
                {detailedProduct.variations.map((v, idx) => {
                  const isSelected = selectedVariationIndex === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => setSelectedVariationIndex(idx)}
                      className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                        isSelected 
                          ? 'bg-[#5B7838] text-white shadow-sm ring-2 ring-[#5B7838]/40' 
                          : 'bg-[#F2ECE0] text-[#55695D] hover:bg-[#EAE0CB] border border-[#DDD1BA]'
                      }`}
                    >
                      {v.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quantity Stepper & Add To Bag Row (Matches Screenshot 3) */}
            <div ref={buySectionRef} className="pt-3 space-y-3">
              <div className="text-xs font-bold text-[#183B2B] uppercase tracking-wider">
                QUANTITY:
              </div>

              <div className="flex items-center gap-3">
                {/* Stepper */}
                <div className="inline-flex items-center bg-[#F2ECE0] border border-[#D7CABA] rounded-full px-3 py-2 text-sm text-[#183B2B]">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-6 h-6 flex items-center justify-center font-bold hover:text-[#557838] transition-colors"
                  >
                    -
                  </button>
                  <span className="w-8 text-center font-bold text-sm">
                    {quantity}
                  </span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-6 h-6 flex items-center justify-center font-bold hover:text-[#557838] transition-colors"
                  >
                    +
                  </button>
                </div>

                {/* Add To Bag Button */}
                <button
                  onClick={() => handleAddCurrentToBag(true)}
                  className="flex-1 py-3 px-6 rounded-full bg-[#E5DDD0] hover:bg-[#D9CFC0] text-[#183B2B] font-bold text-xs sm:text-sm tracking-wide transition-all active:scale-98 shadow-sm flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4 text-[#557838]" />
                  <span>Add To Bag</span>
                </button>

                {/* Wishlist Button */}
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`p-3 rounded-full border transition-all ${
                    isWishlisted 
                      ? 'bg-red-50 border-red-300 text-red-600' 
                      : 'bg-[#F2ECE0] border-[#D7CABA] text-[#55695D] hover:text-[#183B2B]'
                  }`}
                  title="Save to Wishlist"
                >
                  <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
                </button>
              </div>

              {/* Buy It Now Button */}
              <button
                onClick={handleBuyCurrentNow}
                className="w-full py-3.5 px-6 rounded-full bg-white hover:bg-[#183B2B] text-[#183B2B] hover:text-white border-2 border-[#183B2B] font-bold text-xs sm:text-sm tracking-wide transition-all duration-300 shadow-sm flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-[#8C682D]" />
                <span>Buy It Now</span>
              </button>
            </div>

            {/* Share and Shipping Guarantees (Matches Screenshot 2) */}
            <div className="pt-4 border-t border-[#E8DFC9] space-y-3 text-xs text-[#526558]">
              <div className="flex items-center justify-between">
                <button 
                  onClick={handleShare}
                  className="inline-flex items-center gap-1.5 font-bold uppercase tracking-wider text-[#183B2B] hover:text-[#557838] transition-colors"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>SHARE</span>
                </button>

                {showShareToast && (
                  <span className="text-[11px] font-bold text-[#557838] animate-fadeIn">
                    ✓ Link copied to clipboard!
                  </span>
                )}
              </div>

              {/* Trust & Shipping Callouts */}
              <div className="space-y-2 pt-1 text-[11px] sm:text-xs">
                <div className="flex items-center gap-2.5">
                  <Truck className="w-4 h-4 text-[#557838] shrink-0" />
                  <span>Orders ship within 5 to 10 business days.</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-[#557838] shrink-0" />
                  <span>Hoorey ! This item ships free across India on orders above ₹499</span>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* 3. Description & Detailed Specifications Section (Matches Screenshot 1 & 2) */}
        <div className="mt-12 sm:mt-16 bg-white rounded-2xl sm:rounded-3xl border border-[#E6DCC7] overflow-hidden shadow-sm">
          
          {/* Header Tab Bar */}
          <div className="bg-[#ECE4D5] border-b border-[#DFD3BE] px-4 sm:px-8 py-3 sm:py-4 flex items-center gap-6 overflow-x-auto">
            <button
              onClick={() => setActiveTab('description')}
              className={`font-serif text-sm sm:text-base font-bold uppercase tracking-wider transition-colors ${
                activeTab === 'description' ? 'text-[#183B2B] border-b-2 border-[#183B2B] pb-1' : 'text-[#6C7E72] hover:text-[#183B2B]'
              }`}
            >
              DESCRIPTION
            </button>
            <button
              onClick={() => setActiveTab('specification')}
              className={`font-serif text-sm sm:text-base font-bold uppercase tracking-wider transition-colors ${
                activeTab === 'specification' ? 'text-[#183B2B] border-b-2 border-[#183B2B] pb-1' : 'text-[#6C7E72] hover:text-[#183B2B]'
              }`}
            >
              SPECIFICATIONS &amp; USAGE
            </button>
            <button
              onClick={() => setActiveTab('safety')}
              className={`font-serif text-sm sm:text-base font-bold uppercase tracking-wider transition-colors ${
                activeTab === 'safety' ? 'text-[#183B2B] border-b-2 border-[#183B2B] pb-1' : 'text-[#6C7E72] hover:text-[#183B2B]'
              }`}
            >
              SAFETY INFORMATION
            </button>
          </div>

          {/* Tab Body Content */}
          <div className="p-6 sm:p-10 space-y-8 text-xs sm:text-sm text-[#3E5144] leading-relaxed">
            
            {/* Overview text */}
            <p className="text-sm sm:text-base text-[#183B2B] font-medium leading-relaxed">
              <strong className="text-[#183B2B] font-bold">
                {detailedProduct.specifications.brand} {detailedProduct.name}
              </strong>{' '}
              {detailedProduct.fullDescription}
            </p>

            {/* Benefits List (Matches Screenshot 2) */}
            <div className="space-y-3">
              <h3 className="font-serif text-lg sm:text-xl font-bold text-[#183B2B]">
                Benefits
              </h3>
              <ul className="space-y-2 pl-1">
                {detailedProduct.benefits.map((b, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#557838] mt-2 shrink-0" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Key Ingredients */}
            <div className="space-y-2.5">
              <h3 className="font-serif text-lg sm:text-xl font-bold text-[#183B2B]">
                Key Ingredients
              </h3>
              <ul className="space-y-1.5 pl-1">
                {detailedProduct.keyIngredients.map((ing, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#557838] mt-2 shrink-0" />
                    <span>{ing}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Why Choose This Product (Matches Screenshot 1) */}
            <div className="space-y-3">
              <h3 className="font-serif text-lg sm:text-xl font-bold text-[#183B2B]">
                Why Choose This Product
              </h3>
              <ul className="space-y-2 pl-1">
                {detailedProduct.whyChoose.map((why, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#557838] mt-2 shrink-0" />
                    <span>{why}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Product Specification & Usage (Exact 2-Column Table from Screenshot 1) */}
            <div className="space-y-3 pt-2">
              <h3 className="font-serif text-lg sm:text-xl font-bold text-[#183B2B]">
                Product Specification &amp; Usage
              </h3>

              <div className="border border-[#E4D8C1] rounded-xl overflow-hidden shadow-xs">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-[#F4ECE0] border-b border-[#E4D8C1] font-bold text-[#183B2B]">
                      <th className="py-2.5 px-4 w-1/3 sm:w-1/4">Specification</th>
                      <th className="py-2.5 px-4">Details</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#EBE1CF]">
                    <tr>
                      <td className="py-2 px-4 font-semibold text-[#183B2B]">Brand</td>
                      <td className="py-2 px-4">{detailedProduct.specifications.brand}</td>
                    </tr>
                    <tr className="bg-[#FAF7F2]">
                      <td className="py-2 px-4 font-semibold text-[#183B2B]">Product Name</td>
                      <td className="py-2 px-4">{detailedProduct.specifications.productName}</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 font-semibold text-[#183B2B]">Category</td>
                      <td className="py-2 px-4">{detailedProduct.specifications.category}</td>
                    </tr>
                    <tr className="bg-[#FAF7F2]">
                      <td className="py-2 px-4 font-semibold text-[#183B2B]">Main Ingredient</td>
                      <td className="py-2 px-4">{detailedProduct.specifications.mainIngredient}</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 font-semibold text-[#183B2B]">Form</td>
                      <td className="py-2 px-4">{detailedProduct.specifications.form}</td>
                    </tr>
                    <tr className="bg-[#FAF7F2]">
                      <td className="py-2 px-4 font-semibold text-[#183B2B]">Net Quantity</td>
                      <td className="py-2 px-4">{activeWeight || detailedProduct.specifications.netQuantity}</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 font-semibold text-[#183B2B]">Recommended Usage</td>
                      <td className="py-2 px-4">{detailedProduct.specifications.recommendedUsage}</td>
                    </tr>
                    <tr className="bg-[#FAF7F2]">
                      <td className="py-2 px-4 font-semibold text-[#183B2B]">How to Use</td>
                      <td className="py-2 px-4">{detailedProduct.specifications.howToUse}</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 font-semibold text-[#183B2B]">Suitable For</td>
                      <td className="py-2 px-4">{detailedProduct.specifications.suitableFor}</td>
                    </tr>
                    <tr className="bg-[#FAF7F2]">
                      <td className="py-2 px-4 font-semibold text-[#183B2B]">Storage</td>
                      <td className="py-2 px-4">{detailedProduct.specifications.storage}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Safety Information (Matches Screenshot 1) */}
            <div className="space-y-3 pt-2">
              <h3 className="font-serif text-lg sm:text-xl font-bold text-[#183B2B]">
                Safety Information
              </h3>
              <ul className="space-y-2 pl-1">
                {detailedProduct.safetyInfo.map((info, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#557838] mt-2 shrink-0" />
                    <span>{info}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>

        {/* 4. Related Products Section (Matches Screenshot 4) */}
        <div className="mt-16 sm:mt-20">
          <div className="text-center mb-8 space-y-1">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#183B2B]">
              Related Products
            </h2>
            <p className="text-xs sm:text-sm text-[#6C7E72]">
              Complementary classical Ayurvedic remedies carefully selected for complete wellness.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {relatedProducts.map((relProd) => (
              <div 
                key={relProd.id}
                onClick={() => onSelectProduct(relProd)}
                className="group cursor-pointer bg-white rounded-2xl p-3 sm:p-4 border border-[#E6DCC7] hover:border-[#557838] shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-full aspect-square bg-[#F7F2E8] rounded-xl overflow-hidden flex items-center justify-center p-2 mb-3">
                    <img 
                      src={relProd.image} 
                      alt={relProd.name} 
                      className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="font-serif font-bold text-sm sm:text-base text-[#183B2B] text-center group-hover:text-[#557838] transition-colors truncate">
                    {relProd.name}
                  </h3>
                  <div className="text-center mt-1">
                    <span className="font-serif font-bold text-sm sm:text-base text-[#183B2B]">
                      Rs. {relProd.price}.00
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Dots (Matches Screenshot 4) */}
          <div className="flex items-center justify-center gap-2 mt-6">
            <span className="w-2.5 h-2.5 rounded-full bg-[#183B2B]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#D8CCB5]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#D8CCB5]" />
          </div>
        </div>

      </div>

      {/* 5. Sticky Bottom Purchase Bar (Exact Match from Screenshot 1 & 4) */}
      <div 
        className={`fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#DFD3BD] shadow-2xl transition-all duration-300 py-2.5 px-4 sm:px-8 ${
          showStickyBottom ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 pointer-events-none'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Left Thumbnail + Title + Price */}
          <div className="flex items-center gap-3 min-w-0">
            <img 
              src={gallery[0] || detailedProduct.image} 
              alt={detailedProduct.name} 
              className="w-11 h-11 object-contain rounded-lg border border-[#E5DAC4] bg-[#FAF5EC] shrink-0"
            />
            <div className="min-w-0">
              <h4 className="font-serif font-bold text-xs sm:text-sm text-[#183B2B] truncate">
                {detailedProduct.name}
              </h4>
              <div className="flex items-baseline gap-1.5 font-serif font-bold text-sm sm:text-base text-[#183B2B]">
                <span>Rs. {activePrice}.00</span>
                {activeOriginalPrice && (
                  <span className="text-[11px] font-sans font-normal line-through text-[#8F9F95]">Rs. {activeOriginalPrice}.00</span>
                )}
                {activeOriginalPrice && activeOriginalPrice > activePrice && (
                  <span className="text-[10px] font-sans font-extrabold text-[#2E6B39] bg-[#EBF5EE] border border-[#C5DEC9] px-1.5 py-0.2 rounded">
                    {Math.round(((activeOriginalPrice - activePrice) / activeOriginalPrice) * 100)}% OFF
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            
            {/* GM Variation Dropdown */}
            <div className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-[#183B2B]">
              <span className="text-[#6D8073]">GM :</span>
              <select
                value={selectedVariationIndex}
                onChange={(e) => setSelectedVariationIndex(Number(e.target.value))}
                className="bg-[#FAF7F2] border border-[#D5C9B3] rounded-lg px-2.5 py-1.5 text-xs font-bold text-[#183B2B] focus:outline-none focus:ring-1 focus:ring-[#557838]"
              >
                {detailedProduct.variations.map((v, i) => (
                  <option key={i} value={i}>{v.label}</option>
                ))}
              </select>
            </div>

            {/* Stepper */}
            <div className="hidden md:inline-flex items-center bg-[#FAF7F2] border border-[#D5C9B3] rounded-full px-2 py-1 text-xs">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-5 h-5 flex items-center justify-center font-bold text-[#557838]"
              >
                -
              </button>
              <span className="w-6 text-center font-bold text-[#183B2B]">
                {quantity}
              </span>
              <button 
                onClick={() => setQuantity(quantity + 1)}
                className="w-5 h-5 flex items-center justify-center font-bold text-[#557838]"
              >
                +
              </button>
            </div>

            {/* Add To Bag */}
            <button
              onClick={() => handleAddCurrentToBag(true)}
              className="py-2 sm:py-2.5 px-4 sm:px-6 rounded-full bg-[#E5DDD0] hover:bg-[#D9CFC0] text-[#183B2B] font-bold text-xs tracking-wide transition-all shadow-xs"
            >
              Add To Bag
            </button>

            {/* Buy It Now */}
            <button
              onClick={handleBuyCurrentNow}
              className="py-2 sm:py-2.5 px-4 sm:px-6 rounded-full bg-white hover:bg-[#183B2B] text-[#183B2B] hover:text-white border border-[#183B2B] font-bold text-xs tracking-wide transition-all shadow-xs hidden xs:inline-flex items-center gap-1.5"
            >
              <span>Buy It Now</span>
            </button>
          </div>

        </div>
      </div>

      {/* 6. Floating Action Badges (Matches Reference Screenshots) */}
      
      {/* Right Edge Vertical Pill: BOOK A CONSULTATION */}
      <button 
        onClick={() => onNavigate('Contact')}
        className="fixed right-0 top-1/2 -translate-y-1/2 z-30 bg-[#58793B] hover:bg-[#47632F] text-white text-[11px] sm:text-xs font-bold tracking-widest uppercase px-2.5 py-4 rounded-l-xl shadow-lg transition-all [writing-mode:vertical-rl] flex items-center gap-2 cursor-pointer"
        style={{ textOrientation: 'mixed' }}
        title="Book Doctor Consultation"
      >
        <span>BOOK A CONSULTATION</span>
      </button>

      {/* Bottom Right WhatsApp Pill: chat with us */}
      <a
        href="https://wa.me/919888335557?text=Hello%20Veda%20Finder,%20I%20have%20an%20inquiry%20regarding%20Ayurvedic%20formulations."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 bg-[#25D366] hover:bg-[#20BD5A] text-white font-bold text-xs sm:text-sm px-4 py-2.5 rounded-full shadow-xl flex items-center gap-2 transition-all hover:scale-105"
      >
        <MessageCircle className="w-5 h-5 fill-current" />
        <span>chat with us</span>
      </a>

    </div>
  );
}
