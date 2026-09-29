import React, { useState } from 'react';
import { Search, User, ShoppingBag, Menu, X, ShieldCheck, Lock } from 'lucide-react';
import { VedaFinderLogo } from './VedaLogoBrand';

export default function Header({ 
  cartCount, 
  onOpenCart, 
  onOpenSearch, 
  activeNav, 
  onNavigate 
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const navLinks = [
    { name: 'Home', id: 'Home' },
    { name: 'Shop', id: 'Shop' },
    { name: 'About Us', id: 'About Us' },
    { name: 'Blog', id: 'Blog' },
    { name: 'Contact', id: 'Contact' }
  ];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (onOpenSearch) onOpenSearch(searchQuery);
  };

  const handleNavClick = (pageId) => {
    onNavigate(pageId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      {/* Top Announcement Bar with Direct Admin Access */}
      <div className="w-full bg-[#122A1E] text-[#E8DFC8] py-2 px-4 text-[11px] md:text-xs tracking-wide font-medium flex items-center justify-between border-b border-[#254634]">
        <div className="flex-1 flex items-center justify-center gap-2 md:gap-4 flex-wrap text-center">
          <span className="flex items-center gap-1.5 text-[#F2ECE1]">
            <span className="text-[#C59A4E]">🌿</span> Free shipping on orders above ₹499
          </span>
          <span className="hidden sm:inline text-[#C59A4E]/60">|</span>
          <span className="text-[#E8DFC8] hidden sm:inline">Authentic Ayurvedic Formulations</span>
          <span className="hidden md:inline text-[#C59A4E]/60">|</span>
          <span className="text-[#E8DFC8] hidden md:inline">COD Available</span>
        </div>

        {/* Quick Top Admin Trigger */}
        <div className="hidden sm:flex items-center shrink-0">
          <button
            onClick={() => handleNavClick('Admin')}
            className="flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#1B3E2C] hover:bg-[#C59A4E] text-[#E6C887] hover:text-[#122A1E] text-[10px] font-bold tracking-wider uppercase border border-[#2D5A42] hover:border-[#E6C887] transition-all"
            title="Open Admin Portal"
          >
            <ShieldCheck className="w-3 h-3" />
            <span>Admin Portal</span>
          </button>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="w-full bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#EAE2D2] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Official Veda Finder Logo */}
          <button 
            onClick={() => handleNavClick('Home')}
            className="cursor-pointer text-left focus:outline-none"
            aria-label="Veda Finder Home"
          >
            <VedaFinderLogo size="md" showTagline={true} />
          </button>

          {/* Desktop Navigation Links with Animated Oval Capsule */}
          <nav className="hidden lg:flex items-center p-1.5 rounded-full bg-[#F2EADB]/70 border border-[#E2D6C0] shadow-inner space-x-1">
            {navLinks.map((link) => {
              const isActive = activeNav === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`relative px-5 py-2 rounded-full font-medium text-sm transition-all duration-300 ease-out focus:outline-none ${
                    isActive 
                      ? 'bg-[#183B2B] text-white shadow-md scale-100 font-semibold' 
                      : 'text-[#4E6155] hover:text-[#183B2B] hover:bg-white/60'
                  }`}
                >
                  {isActive && (
                    <span className="absolute inset-0 rounded-full ring-1 ring-[#C59A4E]/30 pointer-events-none" />
                  )}
                  <span className="relative z-10">{link.name}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action Items: Search Input, Distinct Admin Portal Button, Profile & Cart */}
          <div className="flex items-center space-x-2.5 sm:space-x-3">
            
            {/* Pill Search Input */}
            <div className="relative hidden xl:block">
              <form onSubmit={handleSearchSubmit} className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => onOpenSearch && onOpenSearch('')}
                  className="w-44 pl-4 pr-9 py-2 rounded-full text-sm bg-white/90 border border-[#D5C9B3] text-[#2C3E35] placeholder-[#8A9990] focus:outline-none focus:ring-2 focus:ring-[#183B2B]/20 focus:border-[#183B2B] shadow-inner transition-all duration-200"
                />
                <button
                  type="submit"
                  aria-label="Search"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#687B70] hover:text-[#183B2B] transition-colors"
                >
                  <Search className="w-4 h-4 stroke-[2.2]" />
                </button>
              </form>
            </div>

            {/* DISTINCT ADMIN PORTAL BUTTON */}
            <button
              onClick={() => handleNavClick('Admin')}
              className={`group flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold transition-all duration-300 shadow-sm border ${
                activeNav === 'Admin'
                  ? 'bg-[#174D3A] text-white border-[#174D3A] ring-2 ring-[#C59A4E]/40'
                  : 'bg-[#FAF0DC] hover:bg-[#174D3A] text-[#8C682D] hover:text-white border-[#DFCFA8] hover:border-[#174D3A]'
              }`}
              title="Open Veda Finder Admin Portal"
            >
              <ShieldCheck className="w-4 h-4 text-[#C59A4E] group-hover:text-[#E6C887] transition-colors" />
              <span>Admin Portal</span>
            </button>

            {/* User Profile / Login Button */}
            <button
              onClick={() => handleNavClick('Login')}
              aria-label="User Account"
              title="Customer Login / Sign In"
              className={`w-10 h-10 rounded-full border border-[#D5C9B3] flex items-center justify-center text-[#2C3E35] transition-all duration-200 shadow-sm ${
                activeNav === 'Login' ? 'bg-[#183B2B] text-white border-[#183B2B]' : 'bg-white/80 hover:bg-[#F2ECE1] hover:border-[#183B2B]'
              }`}
            >
              <User className={`w-5 h-5 stroke-[1.8] ${activeNav === 'Login' ? 'text-white' : 'text-[#374D41]'}`} />
            </button>

            {/* Cart Icon with badge */}
            <button
              onClick={onOpenCart}
              aria-label="Shopping Cart"
              className="relative w-10 h-10 rounded-full border border-[#D5C9B3] bg-white/80 hover:bg-[#F2ECE1] flex items-center justify-center text-[#2C3E35] transition-all duration-200 hover:border-[#183B2B] shadow-sm group"
            >
              <ShoppingBag className="w-5 h-5 text-[#374D41] group-hover:text-[#183B2B] transition-colors stroke-[1.8]" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#183B2B] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-md ring-2 ring-[#FAF7F2]">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#2C3E35] hover:text-[#183B2B]"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

          </div>

        </div>

        {/* Mobile Dropdown Menu with Oval Capsule items */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-[#EAE2D2] bg-[#FAF7F2] px-4 pt-3 pb-6 space-y-2 animate-fadeIn">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`w-full text-left py-2.5 px-4 rounded-full text-sm font-medium transition-all ${
                  activeNav === link.id 
                    ? 'bg-[#183B2B] text-white shadow' 
                    : 'text-[#3E5246] hover:bg-[#EDE5D5]'
                }`}
              >
                {link.name}
              </button>
            ))}
            
            <div className="pt-2 border-t border-[#E8DFC9] flex flex-col gap-2">
              <button
                onClick={() => handleNavClick('Admin')}
                className="w-full text-left py-2.5 px-4 rounded-full text-sm font-bold bg-[#FAF0DC] text-[#174D3A] border border-[#DFCFA8] flex items-center gap-2"
              >
                <ShieldCheck className="w-4 h-4 text-[#8C682D]" />
                <span>Admin Portal</span>
              </button>

              <button
                onClick={() => handleNavClick('Login')}
                className="w-full text-left py-2.5 px-4 rounded-full text-sm font-medium bg-white text-[#183B2B] border border-[#D5C9B3] flex items-center gap-2"
              >
                <User className="w-4 h-4" />
                <span>Customer Login</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </header>
  );
}
