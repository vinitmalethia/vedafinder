import React, { useState } from 'react';
import { Search, User, ShoppingBag, Menu, X, ChevronDown, ShieldCheck } from 'lucide-react';
import { VedaFinderLogo } from './VedaLogoBrand';

export default function Header({ 
  cartCount, 
  onOpenCart, 
  onOpenSearch, 
  activeNav, 
  onNavigate,
  user,
  onLogout,
  onOpenAccountModal
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

  const getCustomerDisplayName = () => {
    if (!user) return '';
    if (user.displayName) return user.displayName;
    if (user.email) {
      const namePart = user.email.split('@')[0];
      return namePart.charAt(0).toUpperCase() + namePart.slice(1);
    }
    return 'Customer';
  };

  const displayName = getCustomerDisplayName();
  const userInitial = displayName ? displayName.charAt(0).toUpperCase() : 'U';

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      {/* Top Announcement Bar with Customer Name Greeting */}
      <div className="w-full bg-[#122A1E] text-[#E8DFC8] py-2 px-4 text-[11px] md:text-xs tracking-wide font-medium flex items-center justify-between border-b border-[#254634]">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between flex-wrap gap-2 text-center">
          
          {/* Left/Greeting: Shown prominently when user is logged in */}
          <div className="flex items-center gap-2 mx-auto sm:mx-0">
            {user ? (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#1F4330] text-[#E5D7BE] border border-[#305E44] text-[11px] sm:text-xs font-semibold animate-fadeIn shadow-sm">
                <span className="text-[#E0B86C]">✨</span>
                <span>Namaste, <strong className="text-white font-bold">{displayName}</strong></span>
              </span>
            ) : (
              <span className="flex items-center gap-1.5 text-[#F2ECE1]">
                <span className="text-[#C59A4E]">🌿</span> Free shipping on orders above ₹499
              </span>
            )}
          </div>

          {/* Center / Right Announcements */}
          <div className="hidden sm:flex items-center gap-3 text-[#E8DFC8] text-[11px]">
            {user && (
              <span className="flex items-center gap-1 text-[#C59A4E]">
                <span>🌿</span> Authentic Formulations
              </span>
            )}
            <span className="text-[#C59A4E]/60 hidden md:inline">|</span>
            <span className="hidden md:inline">100% Pure & Lab Tested</span>
            <span className="text-[#C59A4E]/60 hidden lg:inline">|</span>
            <span className="hidden lg:inline">COD Available Across India</span>
          </div>

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

          {/* Right Action Items: Search Input, Profile & Cart */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            
            {/* Pill Search Input (Desktop Only) */}
            <div className="relative hidden xl:block">
              <form onSubmit={handleSearchSubmit} className="relative">
                <input
                  type="text"
                  placeholder="Search remedies..."
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

            {/* Customer Profile Button matching user reference design */}
            {user ? (
              <button
                onClick={() => onOpenAccountModal && onOpenAccountModal()}
                aria-label="User Account"
                className="flex items-center gap-2 pl-1 pr-2.5 sm:pr-3 py-1 rounded-full border border-[#D5C9B3] bg-white hover:bg-[#FAF7F2] hover:border-[#183B2B] text-[#183B2B] transition-all duration-200 shadow-sm focus:outline-none cursor-pointer group"
                title={`${displayName} - Account & Orders`}
              >
                {user.photoURL ? (
                  <img 
                    src={user.photoURL} 
                    alt={displayName} 
                    className="w-7 h-7 rounded-full object-cover ring-1 ring-[#D5C9B3]" 
                  />
                ) : (
                  <div className="w-7 h-7 rounded-full bg-[#183B2B] text-white flex items-center justify-center font-serif font-bold text-xs shadow-inner">
                    {userInitial}
                  </div>
                )}
                <span className="text-xs font-semibold text-[#2C3E35] group-hover:text-[#183B2B] max-w-[85px] sm:max-w-[110px] truncate">
                  {displayName.split(' ')[0].toLowerCase()}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-[#6B7E73] group-hover:text-[#183B2B] transition-transform" />
              </button>
            ) : (
              <button
                onClick={() => handleNavClick('Login')}
                aria-label="Account Login"
                title="Account & Login"
                className={`w-10 h-10 rounded-full border border-[#D5C9B3] flex items-center justify-center text-[#2C3E35] transition-all duration-200 shadow-sm ${
                  activeNav === 'Login' ? 'bg-[#183B2B] text-white border-[#183B2B]' : 'bg-white/80 hover:bg-[#F2ECE1] hover:border-[#183B2B]'
                }`}
              >
                <User className={`w-5 h-5 stroke-[1.8] ${activeNav === 'Login' ? 'text-white' : 'text-[#374D41]'}`} />
              </button>
            )}

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

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-[#EAE2D2] bg-[#FAF7F2] px-4 pt-3 pb-6 space-y-2 animate-fadeIn">
            
            {/* Search bar inside mobile drawer */}
            <form onSubmit={handleSearchSubmit} className="relative mb-3">
              <input
                type="text"
                placeholder="Search remedies, herbs, doshas..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-4 pr-10 py-2.5 rounded-full text-sm bg-white border border-[#D5C9B3] text-[#2C3E35] placeholder-[#8A9990] focus:outline-none focus:ring-2 focus:ring-[#183B2B]/20 shadow-sm"
              />
              <button
                type="submit"
                aria-label="Search"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#687B70] hover:text-[#183B2B]"
              >
                <Search className="w-4 h-4" />
              </button>
            </form>
            
            {/* If logged in on mobile, show customer banner that opens Account Modal */}
            {user ? (
              <div 
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onOpenAccountModal) onOpenAccountModal();
                }}
                className="p-3 bg-white border border-[#D5C9B3] rounded-2xl mb-3 flex items-center justify-between shadow-sm cursor-pointer hover:border-[#183B2B] transition-all"
              >
                <div className="flex items-center gap-2.5">
                  {user.photoURL ? (
                    <img 
                      src={user.photoURL} 
                      alt={displayName} 
                      className="w-9 h-9 rounded-full object-cover ring-1 ring-[#D5C9B3]" 
                    />
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-[#183B2B] text-white flex items-center justify-center font-bold text-sm">
                      {userInitial}
                    </div>
                  )}
                  <div>
                    <p className="text-xs font-bold text-[#183B2B]">Namaste, {displayName}</p>
                    <p className="text-[10px] text-[#73847B]">{user.email}</p>
                  </div>
                </div>
                <span className="text-xs text-[#8C682D] font-semibold">
                  Account ›
                </span>
              </div>
            ) : (
              <div className="pt-1 pb-2">
                <button
                  onClick={() => handleNavClick('Login')}
                  className="w-full text-center py-2.5 px-4 rounded-full text-sm font-semibold bg-[#183B2B] text-white shadow flex items-center justify-center gap-2"
                >
                  <User className="w-4 h-4" />
                  <span>Sign In / Register</span>
                </button>
              </div>
            )}

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
            
            {user && user.role === 'admin' && (
              <div className="pt-2 border-t border-[#E8DFC9]">
                <button
                  onClick={() => handleNavClick('Admin')}
                  className="w-full text-left py-2.5 px-4 rounded-full text-sm font-semibold bg-[#183B2B] text-white flex items-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Admin Dashboard</span>
                </button>
              </div>
            )}
          </div>
        )}

      </div>
    </header>
  );
}
