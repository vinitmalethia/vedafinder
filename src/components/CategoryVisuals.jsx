import React from 'react';

// Bowl with Ayurvedic Bhasma (Grey/Brown Herbo-Mineral Ash)
export function BhasmaBowlVisual({ className = "w-16 h-16" }) {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-md">
        <defs>
          <radialGradient id="woodBowl" cx="40%" cy="30%" r="60%">
            <stop offset="0%" stopColor="#A87948" />
            <stop offset="70%" stopColor="#694320" />
            <stop offset="100%" stopColor="#4A2D12" />
          </radialGradient>
          <radialGradient id="bhasmaPowder" cx="45%" cy="35%" r="55%">
            <stop offset="0%" stopColor="#BC9F7A" />
            <stop offset="40%" stopColor="#9C7F59" />
            <stop offset="80%" stopColor="#7B6140" />
            <stop offset="100%" stopColor="#5E472D" />
          </radialGradient>
          <filter id="powderTexture" x="0%" y="0%" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" result="noise" />
            <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.15 0" />
            <feComposite in2="SourceGraphic" in="gl" operator="in" />
          </filter>
        </defs>
        
        {/* Soft Shadow */}
        <ellipse cx="50" cy="85" rx="35" ry="8" fill="rgba(40, 25, 10, 0.25)" />
        
        {/* Wooden Bowl Body */}
        <path d="M16 48C16 75 30 84 50 84C70 84 84 75 84 48H16Z" fill="url(#woodBowl)" />
        <ellipse cx="50" cy="48" rx="34" ry="14" fill="#523214" />
        
        {/* Powder mound */}
        <path d="M22 47C25 36 38 28 50 28C62 28 75 36 78 47C74 54 26 54 22 47Z" fill="url(#bhasmaPowder)" />
        
        {/* Textured peaks & fine grain */}
        <ellipse cx="50" cy="38" rx="16" ry="7" fill="#CBB18E" opacity="0.6" />
        <circle cx="46" cy="34" r="2.5" fill="#DFC9AA" />
        <circle cx="54" cy="37" r="2" fill="#D3BA99" />
        <circle cx="41" cy="40" r="1.5" fill="#AE916B" />
        <circle cx="58" cy="42" r="2" fill="#8E724E" />
        
        {/* Rim highlights */}
        <path d="M16 48C24 55 76 55 84 48" stroke="#D19C65" strokeWidth="1.5" opacity="0.6" fill="none" />
      </svg>
    </div>
  );
}

// Bowl with Pishti (Pure Pearl / Moon White Mineral Powder)
export function PishtiBowlVisual({ className = "w-16 h-16" }) {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-md">
        <defs>
          <radialGradient id="woodBowl2" cx="40%" cy="30%" r="60%">
            <stop offset="0%" stopColor="#A87948" />
            <stop offset="70%" stopColor="#694320" />
            <stop offset="100%" stopColor="#4A2D12" />
          </radialGradient>
          <radialGradient id="pishtiPowder" cx="45%" cy="35%" r="55%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="50%" stopColor="#F5EFE6" />
            <stop offset="85%" stopColor="#DDD5C7" />
            <stop offset="100%" stopColor="#BDB19F" />
          </radialGradient>
        </defs>
        
        {/* Soft Shadow */}
        <ellipse cx="50" cy="85" rx="35" ry="8" fill="rgba(40, 25, 10, 0.25)" />
        
        {/* Wooden Bowl Body */}
        <path d="M16 48C16 75 30 84 50 84C70 84 84 75 84 48H16Z" fill="url(#woodBowl2)" />
        <ellipse cx="50" cy="48" rx="34" ry="14" fill="#523214" />
        
        {/* White Mineral Pearl Powder Mound */}
        <path d="M22 47C25 35 37 26 50 26C63 26 75 35 78 47C74 54 26 54 22 47Z" fill="url(#pishtiPowder)" />
        
        {/* Pearl Shimmer & fine crest */}
        <ellipse cx="48" cy="36" rx="15" ry="6" fill="#FFFFFF" opacity="0.9" />
        <circle cx="45" cy="33" r="2.5" fill="#FFFFFF" />
        <circle cx="53" cy="36" r="2" fill="#FAF7F2" />
        <path d="M38 42C44 38 56 38 62 42" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" opacity="0.7"/>
        
        {/* Rim highlights */}
        <path d="M16 48C24 55 76 55 84 48" stroke="#D19C65" strokeWidth="1.5" opacity="0.6" fill="none" />
      </svg>
    </div>
  );
}

// Capsules with Herbal Leaf Sprig
export function CapsulesVisual({ className = "w-16 h-16" }) {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-md">
        <defs>
          <linearGradient id="capHerb" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#DFD2BD" />
            <stop offset="100%" stopColor="#B39E7C" />
          </linearGradient>
          <linearGradient id="leafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6BA67E" />
            <stop offset="100%" stopColor="#2A633F" />
          </linearGradient>
        </defs>
        
        {/* Shadow */}
        <ellipse cx="55" cy="80" rx="30" ry="8" fill="rgba(25, 45, 30, 0.2)" />
        
        {/* Herbal leaves behind capsules */}
        <path d="M22 65C12 45 20 20 40 18C44 32 36 55 22 65Z" fill="url(#leafGrad)" />
        <path d="M22 65C30 50 36 40 39 20" stroke="#89C49A" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M15 50C5 38 12 25 24 24C27 34 22 45 15 50Z" fill="#3D7D54" opacity="0.9" />

        {/* Capsule 1 (angled) */}
        <g transform="rotate(-25 45 55)">
          <rect x="30" y="42" width="34" height="17" rx="8.5" fill="url(#capHerb)" stroke="#8C734D" strokeWidth="1" />
          <path d="M47 42V59" stroke="#7A6038" strokeWidth="1.5" />
          {/* Highlight */}
          <rect x="33" y="44" width="28" height="3" rx="1.5" fill="#FFF" opacity="0.4" />
        </g>
        
        {/* Capsule 2 (resting in front) */}
        <g transform="rotate(15 62 65)">
          <rect x="42" y="52" width="36" height="18" rx="9" fill="#D2C3AA" stroke="#7A6038" strokeWidth="1" />
          <path d="M60 52V70" stroke="#684F2B" strokeWidth="1.5" />
          {/* Transparent / Herbal filling dots */}
          <circle cx="50" cy="61" r="1.5" fill="#88704A" />
          <circle cx="54" cy="58" r="1.2" fill="#725B36" />
          <circle cx="68" cy="61" r="1.5" fill="#88704A" />
          <rect x="45" y="54" width="30" height="3" rx="1.5" fill="#FFF" opacity="0.5" />
        </g>
      </svg>
    </div>
  );
}

// Glass Cup of Amber Herbal Tea with Mint
export function HerbalTeaCupVisual({ className = "w-16 h-16" }) {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-md">
        <defs>
          <radialGradient id="teaLiquid" cx="50%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#F5A038" />
            <stop offset="60%" stopColor="#C86314" />
            <stop offset="100%" stopColor="#873504" />
          </radialGradient>
          <linearGradient id="glassReflection" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.7)" />
            <stop offset="30%" stopColor="rgba(255,255,255,0.1)" />
            <stop offset="80%" stopColor="rgba(255,255,255,0.1)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.5)" />
          </linearGradient>
        </defs>
        
        {/* Soft Shadow */}
        <ellipse cx="48" cy="85" rx="30" ry="7" fill="rgba(60, 30, 10, 0.25)" />
        
        {/* Glass Saucer */}
        <ellipse cx="48" cy="80" rx="36" ry="8" fill="rgba(230, 240, 245, 0.5)" stroke="rgba(255, 255, 255, 0.8)" strokeWidth="1.5" />
        <ellipse cx="48" cy="80" rx="28" ry="5" fill="rgba(200, 150, 100, 0.2)" />
        
        {/* Glass Cup Handle */}
        <path d="M72 45C85 45 86 65 72 68" stroke="rgba(255, 255, 255, 0.85)" strokeWidth="4" strokeLinecap="round" fill="none" />
        
        {/* Glass Cup Body */}
        <path d="M24 38C24 68 34 78 48 78C62 78 72 68 72 38H24Z" fill="url(#teaLiquid)" />
        <path d="M24 38C24 68 34 78 48 78C62 78 72 68 72 38H24Z" fill="url(#glassReflection)" />
        
        {/* Glass Rim */}
        <ellipse cx="48" cy="38" rx="24" ry="7" fill="#F8B155" stroke="rgba(255, 255, 255, 0.9)" strokeWidth="2" />
        <ellipse cx="48" cy="38" rx="21" ry="5.5" fill="#D36D18" />
        
        {/* Tea surface shimmer & reflection */}
        <ellipse cx="48" cy="38" rx="14" ry="3.5" fill="#FFC978" opacity="0.6" />
        
        {/* Fresh Mint Sprig */}
        <path d="M30 40C20 30 18 18 30 16C36 24 35 34 30 40Z" fill="#3D854F" />
        <path d="M30 40C38 32 46 28 50 32C48 40 40 42 30 40Z" fill="#58A86C" />
        <path d="M28 35C24 28 22 22 28 18" stroke="#8DE8A4" strokeWidth="1" strokeLinecap="round" />
        
        {/* Light Steam */}
        <path d="M42 26C40 20 44 14 42 8" stroke="rgba(255, 255, 255, 0.45)" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M52 24C55 18 50 12 53 6" stroke="rgba(255, 255, 255, 0.45)" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </div>
  );
}
