import React from 'react';
import Hero from '../components/Hero';
import FeaturesBanner from '../components/FeaturesBanner';
import ShopSection from '../components/ShopSection';
import AboutSection from '../components/AboutSection';

export default function HomePage({ onNavigate, onQuickView, onAddToCart, onBuyNow }) {
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

      {/* 4 Feature Pillars Banner */}
      <FeaturesBanner />

      {/* Featured Classical Ayurvedic Formulations Section (Shows only curated 4 products) */}
      <ShopSection 
        isHome={true}
        limit={4}
        onNavigate={onNavigate}
        onQuickView={onQuickView}
        onAddToCart={onAddToCart}
        onBuyNow={onBuyNow}
      />

      {/* About Section */}
      <AboutSection onLearnMore={() => onNavigate('About Us')} />
    </div>
  );
}
