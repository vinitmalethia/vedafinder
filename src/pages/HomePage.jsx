import React from 'react';
import Hero from '../components/Hero';
import CategoryCards from '../components/CategoryCards';
import FeaturesBanner from '../components/FeaturesBanner';
import ShopSection from '../components/ShopSection';
import AboutSection from '../components/AboutSection';

export default function HomePage({ onNavigate, onQuickView, onAddToCart }) {
  const handleCategorySelect = (category) => {
    onNavigate('Shop', category.id);
  };

  const handleHeroShopClick = () => {
    onNavigate('Shop');
  };

  return (
    <div>
      {/* Hero Section */}
      <Hero 
        onShopClick={handleHeroShopClick}
        onQuickView={(slide) => onQuickView(slide)}
      />

      {/* 4 Category Pill Cards */}
      <CategoryCards 
        onSelectCategory={handleCategorySelect}
      />

      {/* 4 Feature Pillars Banner */}
      <FeaturesBanner />

      {/* Featured Classical Ayurvedic Formulations Section (Shows only curated 4 products) */}
      <ShopSection 
        isHome={true}
        limit={4}
        onNavigate={onNavigate}
        onQuickView={onQuickView}
        onAddToCart={onAddToCart}
      />

      {/* About Section */}
      <AboutSection onLearnMore={() => onNavigate('About Us')} />
    </div>
  );
}
