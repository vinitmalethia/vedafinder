import React from 'react';
import Hero from '../components/Hero';
import FeaturesBanner from '../components/FeaturesBanner';
import ShopSection from '../components/ShopSection';
import AboutSection from '../components/AboutSection';
import SutraSection from '../components/SutraSection';

export default function HomePage({ onNavigate, onSelectProduct, onQuickView, onAddToCart, onBuyNow }) {
  const handleHeroShopClick = () => {
    onNavigate('Shop');
  };

  return (
    <div>
      {/* Hero Section */}
      <Hero 
        onShopClick={handleHeroShopClick}
        onQuickView={(slide) => (onSelectProduct || onQuickView)(slide)}
      />

      {/* 4 Feature Pillars Banner */}
      <FeaturesBanner />

      {/* Featured Classical Ayurvedic Formulations Section (Shows only curated 4 products) */}
      <ShopSection 
        isHome={true}
        limit={4}
        onNavigate={onNavigate}
        onSelectProduct={onSelectProduct}
        onQuickView={onQuickView}
        onAddToCart={onAddToCart}
        onBuyNow={onBuyNow}
      />

      {/* About Section (Features Sacred Raw Botanicals) */}
      <AboutSection onLearnMore={() => onNavigate('About Us')} />

      {/* THE SUTRA – The Ayurveda Knowledge Challenge (Placed after Sacred Raw Botanicals and before VEDA WISDOM CIRCLE) */}
      <SutraSection onExplore={() => onNavigate('The Sutra')} />
    </div>
  );
}
