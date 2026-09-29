import React, { useState, useEffect } from 'react';
import { Star, ShoppingBag, Eye, Sparkles, Search, ArrowUpDown, X } from 'lucide-react';
import { PRODUCTS_CATALOG } from '../data/products';

export default function ShopPage({ initialCategory = 'all', onQuickView, onAddToCart }) {
  const [activeCategory, setActiveCategory] = useState(initialCategory || 'all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');

  useEffect(() => {
    if (initialCategory) {
      setActiveCategory(initialCategory);
    }
  }, [initialCategory]);

  const categories = [
    { id: 'all', name: 'All Formulations', count: PRODUCTS_CATALOG.length },
    { id: 'bhasma', name: 'Bhasma (भस्म)', count: PRODUCTS_CATALOG.filter(p => p.categoryId === 'bhasma').length },
    { id: 'pishti', name: 'Pishti (पिष्टी)', count: PRODUCTS_CATALOG.filter(p => p.categoryId === 'pishti').length },
    { id: 'capsules', name: 'Capsules (कैप्सूल)', count: PRODUCTS_CATALOG.filter(p => p.categoryId === 'capsules').length },
    { id: 'herbal-tea', name: 'Herbal Tea (हर्बल टी)', count: PRODUCTS_CATALOG.filter(p => p.categoryId === 'herbal-tea').length },
  ];

  // Filtering
  let filtered = PRODUCTS_CATALOG.filter(product => {
    const matchesCat = activeCategory === 'all' || product.categoryId === activeCategory;
    const matchesSearch = searchQuery === '' || 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (product.hindiName && product.hindiName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (product.indicates && product.indicates.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  // Sorting
  if (sortBy === 'price-low') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-high') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (sortBy === 'rating') {
    filtered.sort((a, b) => b.rating - a.rating);
  }

  return (
    <div className="py-12 bg-[#FAF7F2] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Breadcrumb & Header */}
        <div className="mb-10 text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EAE0CB] text-[#8C682D] text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ayurvedic Dispensary & Store</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#183B2B]">
            All Classical Formulations
          </h1>
          <p className="text-[#5B6D62] text-sm sm:text-base leading-relaxed">
            Directly from classical Ayurvedic scriptures. Tested for heavy metal safety, nano-bioavailability, and prepared in GMP-certified pharmacies.
          </p>
        </div>

        {/* Clean Two-Level Filter & Category Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E6DCC7] shadow-md mb-12 space-y-6">
          
          {/* LEVEL 1: Search & Sort Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-[#EFE5D3]">
            
            {/* Search Input */}
            <div className="relative w-full sm:max-w-md">
              <input
                type="text"
                placeholder="Search by name, Hindi title, or health indication..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-10 py-3 rounded-full text-sm bg-[#FAF7F2] border border-[#D5C9B3] text-[#183B2B] placeholder-[#87998D] focus:outline-none focus:ring-2 focus:ring-[#183B2B]/20 focus:border-[#183B2B] transition-all shadow-inner"
              />
              <Search className="w-4 h-4 text-[#8C682D] absolute left-3.5 top-1/2 -translate-y-1/2" />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#889B90] hover:text-[#183B2B]"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Total Results & Sort Options */}
            <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
              <span className="text-xs font-semibold text-[#66786D] hidden md:inline">
                Showing <strong className="text-[#183B2B]">{filtered.length}</strong> formulation{filtered.length !== 1 ? 's' : ''}
              </span>

              <div className="flex items-center gap-2 bg-[#FAF7F2] border border-[#D5C9B3] rounded-full px-4 py-2.5 shadow-sm">
                <ArrowUpDown className="w-3.5 h-3.5 text-[#8C682D]" />
                <span className="text-xs font-bold text-[#8C682D] uppercase tracking-wider">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent text-xs sm:text-sm text-[#183B2B] font-semibold focus:outline-none cursor-pointer"
                >
                  <option value="featured">Featured Picks</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Top Customer Rated</option>
                </select>
              </div>
            </div>

          </div>

          {/* LEVEL 2: Distinct Categories Row (Down below the search/sort bar) */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#8C682D]">
                Select Formulation Category:
              </span>
              {activeCategory !== 'all' && (
                <button
                  onClick={() => setActiveCategory('all')}
                  className="text-xs font-medium text-[#687C70] hover:text-[#183B2B] underline"
                >
                  Clear filter
                </button>
              )}
            </div>

            <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap pt-1">
              {categories.map((cat) => {
                const isSelected = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 ease-out flex items-center gap-2 ${
                      isSelected
                        ? 'bg-[#183B2B] text-white shadow-md scale-105 ring-2 ring-[#C59A4E]/40'
                        : 'bg-[#FAF6EE] text-[#4A5E51] hover:bg-[#EFE5D3] hover:text-[#183B2B] border border-[#E0D3BC]'
                    }`}
                  >
                    <span>{cat.name}</span>
                    <span className={`text-[11px] px-2 py-0.5 rounded-full font-bold ${
                      isSelected 
                        ? 'bg-white/20 text-white' 
                        : 'bg-[#E5D8BF] text-[#695843]'
                    }`}>
                      {cat.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* Products Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-[#E8DFC9] p-8 space-y-4 shadow-sm">
            <ShoppingBag className="w-16 h-16 text-[#B8A890] mx-auto" />
            <h3 className="font-serif text-2xl text-[#183B2B]">No formulations found</h3>
            <p className="text-sm text-[#6C7E73]">Try resetting your filter or search query to see all remedies.</p>
            <button
              onClick={() => { setActiveCategory('all'); setSearchQuery(''); }}
              className="px-6 py-2.5 rounded-full bg-[#183B2B] text-white text-sm font-medium hover:bg-[#27583F]"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((product) => (
              <div
                key={product.id}
                className="group bg-white rounded-2xl p-5 border border-[#E8DFC9] hover:border-[#8C682D] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1.5"
              >
                {/* Top Badge & Rating */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-[#FAF3E6] text-[#8C682D] border border-[#E2D2B5]">
                      {product.category}
                    </span>
                    <div className="flex items-center gap-1 text-xs text-amber-500 font-bold">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span>{product.rating}</span>
                      <span className="text-[#96A79C] text-[10px]">({product.reviewsCount})</span>
                    </div>
                  </div>

                  {/* 3D Pack Photo */}
                  <div className="w-full h-56 bg-gradient-to-b from-[#FAF6EE] to-[#F2EADC] rounded-xl flex items-center justify-center p-3 border border-[#EFE5D3] group-hover:scale-105 transition-transform duration-300 relative overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="h-full w-full object-contain filter drop-shadow-md"
                    />
                  </div>

                  {/* Title & Hindi Subtitle */}
                  <h3 className="font-serif font-bold text-lg text-[#183B2B] mt-4 line-clamp-1 group-hover:text-[#8C682D] transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-xs font-medium text-[#8C682D] italic truncate mt-0.5">
                    {product.hindiName}
                  </p>
                  
                  {/* Indication Banner */}
                  <div className="mt-2.5 p-2.5 rounded-lg bg-[#FAF7F2] border border-[#EBE2D2] text-[11px] text-[#4F6457] line-clamp-2 leading-relaxed">
                    <strong className="text-[#183B2B]">Indications:</strong> {product.indicates}
                  </div>
                </div>

                {/* Price & Action Buttons */}
                <div className="pt-4 mt-4 border-t border-[#EAE2D2] flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-[#7A8B81] uppercase block">Pack: {product.weight}</span>
                    <div className="flex items-baseline gap-2">
                      <span className="font-serif font-bold text-xl text-[#183B2B]">₹{product.price}</span>
                      {product.originalPrice && (
                        <span className="text-xs line-through text-[#9BA8A0]">₹{product.originalPrice}</span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
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
        )}

      </div>
    </div>
  );
}
