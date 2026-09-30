import React, { useState } from 'react';
import { Mail, ArrowRight, Phone } from 'lucide-react';
import { VedaFinderLogo } from './VedaLogoBrand';

export default function Footer({ onNavigate }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 4000);
      setEmail('');
    }
  };

  const handleNav = (pageId, category = null) => {
    if (onNavigate) onNavigate(pageId, category);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="bg-[#0D1E16] text-[#E8DFC8] pt-16 pb-12 border-t border-[#1F3D2C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Newsletter Strip */}
        <div className="bg-[#142E22] rounded-3xl p-8 sm:p-10 border border-[#2A523D] mb-16 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1 text-center lg:text-left">
            <span className="text-[11px] font-bold tracking-widest text-[#E6C887] uppercase">VEDA WISDOM CIRCLE</span>
            <h3 className="font-serif font-bold text-2xl sm:text-3xl text-white">
              Subscribe for Classical Health Guides & 10% Off
            </h3>
            <p className="text-xs sm:text-sm text-[#A8C2B3]">
              Receive authentic seasonal Ritucharya guidance and exclusive botanical launches.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="w-full lg:w-auto flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="px-5 py-3 rounded-full bg-[#0E2218] border border-[#3A6850] text-sm text-white placeholder-[#789686] focus:outline-none focus:border-[#E6C887] min-w-[280px]"
            />
            <button
              type="submit"
              className="px-7 py-3 rounded-full bg-[#C59A4E] hover:bg-[#D4AF67] text-[#122A1E] font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2 shrink-0"
            >
              <span>{subscribed ? 'Subscribed!' : 'Join Circle'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#203D2E]">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <button onClick={() => handleNav('Home')} className="text-left focus:outline-none">
              <VedaFinderLogo variant="light" size="md" showTagline={true} />
            </button>

            <p className="text-xs text-[#9BB5A6] leading-relaxed max-w-sm">
              Discover time-tested Ayurvedic formulations crafted with revered Himalayan herbs, mineral pishtis, classical bhasmas, and nourishing wellness teas.
            </p>

            <div className="space-y-1 text-xs text-[#9BB5A6] pt-2">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#E6C887]" />
                <span>Ayurvedic Helpline: +91 98883 35557</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#E6C887]" />
                <span>Help@vedafinder.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-sm text-[#E6C887] uppercase tracking-wider">Collections</h4>
            <ul className="space-y-2 text-xs text-[#9BB5A6]">
              <li>
                <button onClick={() => handleNav('Shop', 'bhasma')} className="hover:text-white transition-colors">
                  Classical Bhasma (भस्म)
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('Shop', 'pishti')} className="hover:text-white transition-colors">
                  Mineral Pishti (पिष्टी)
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('Shop', 'capsules')} className="hover:text-white transition-colors">
                  Nar Ojas Vitality (कैप्सूल)
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('Shop', 'herbal-tea')} className="hover:text-white transition-colors">
                  Agnisip Digestive Tea
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('Collections')} className="hover:text-white transition-colors">
                  All Vault Collections
                </button>
              </li>
            </ul>
          </div>

          {/* Ayurvedic Wisdom */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-sm text-[#E6C887] uppercase tracking-wider">Ayurveda Guide</h4>
            <ul className="space-y-2 text-xs text-[#9BB5A6]">
              <li><button onClick={() => handleNav('Blog')} className="hover:text-white transition-colors">Agni & Digestion Guide</button></li>
              <li><button onClick={() => handleNav('Blog')} className="hover:text-white transition-colors">Sahasraputi Abhrak Science</button></li>
              <li><button onClick={() => handleNav('Blog')} className="hover:text-white transition-colors">Pitta Cooling with Pishti</button></li>
              <li><button onClick={() => handleNav('Contact')} className="hover:text-white transition-colors">Consult a Doctor</button></li>
              <li><button onClick={() => handleNav('About Us')} className="hover:text-white transition-colors">Our 5,000 Year Roots</button></li>
            </ul>
          </div>

          {/* Trust & Safety */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-sm text-[#E6C887] uppercase tracking-wider">Trust & Quality</h4>
            <ul className="space-y-2 text-xs text-[#9BB5A6]">
              <li><span className="flex items-center gap-1.5 text-white">✓ AYUSH Standard Mark</span></li>
              <li><span className="flex items-center gap-1.5 text-white">✓ Heavy Metal Tested</span></li>
              <li><span className="flex items-center gap-1.5 text-white">✓ 1,000 Puti Nano-Purity</span></li>
              <li><span className="flex items-center gap-1.5 text-white">✓ 100% Vegetarian</span></li>
            </ul>
          </div>

        </div>

        {/* Bottom Credits & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#7A9586] gap-4">
          <p>© {new Date().getFullYear()} Veda Finder™. All rights reserved. Ayurveda for a Better Tomorrow.</p>
          <div className="flex items-center gap-6">
            <button onClick={() => handleNav('About Us')} className="hover:text-[#E6C887]">About Us</button>
            <button onClick={() => handleNav('Contact')} className="hover:text-[#E6C887]">Contact Support</button>
            <button onClick={() => handleNav('Blog')} className="hover:text-[#E6C887]">Ayurvedic Blog</button>
          </div>
        </div>

      </div>
    </footer>
  );
}
