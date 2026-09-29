import React from 'react';

// Tree of Life Logo SVG matching the screenshot
export function VedaLogo({ className = "w-10 h-10 text-[#183B2B]" }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Tree trunk & roots */}
      <path d="M50 88V50M50 88C43 88 35 91 30 94M50 88C57 88 65 91 70 94" stroke="#8C682D" strokeWidth="4" strokeLinecap="round"/>
      <path d="M50 65C40 58 35 48 30 45M50 58C60 52 66 44 72 40" stroke="#8C682D" strokeWidth="3.5" strokeLinecap="round"/>
      <path d="M50 48C46 38 42 32 38 28M50 45C54 36 60 30 64 26" stroke="#8C682D" strokeWidth="3" strokeLinecap="round"/>
      
      {/* Canopy leaves network */}
      <circle cx="50" cy="22" r="5" fill="#183B2B"/>
      <circle cx="38" cy="26" r="4.5" fill="#2E5A3D"/>
      <circle cx="62" cy="26" r="4.5" fill="#2E5A3D"/>
      <circle cx="28" cy="35" r="4.5" fill="#183B2B"/>
      <circle cx="72" cy="35" r="4.5" fill="#183B2B"/>
      <circle cx="20" cy="46" r="4" fill="#3D734F"/>
      <circle cx="80" cy="46" r="4" fill="#3D734F"/>
      <circle cx="34" cy="44" r="4" fill="#548C68"/>
      <circle cx="66" cy="44" r="4" fill="#548C68"/>
      <circle cx="48" cy="35" r="4.5" fill="#183B2B"/>
      <circle cx="50" cy="12" r="3.5" fill="#C59A4E"/>
      <circle cx="36" cy="18" r="3.5" fill="#C59A4E"/>
      <circle cx="64" cy="18" r="3.5" fill="#C59A4E"/>
      <circle cx="24" cy="28" r="3.5" fill="#3D734F"/>
      <circle cx="76" cy="28" r="3.5" fill="#3D734F"/>
      <circle cx="44" cy="28" r="3" fill="#C59A4E"/>
      <circle cx="56" cy="28" r="3" fill="#C59A4E"/>
    </svg>
  );
}

// Leaf Icon for Pure Ingredients
export function PureIngredientsIcon({ className = "w-9 h-9" }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M12 36C12 36 12 24 24 16C36 8 36 8 36 8C36 8 36 20 28 28C20 36 12 36 12 36Z" stroke="#E6C887" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 36L24 24" stroke="#E6C887" strokeWidth="2.2" strokeLinecap="round"/>
      <path d="M22 26C24 20 30 16 30 16" stroke="#E6C887" strokeWidth="1.8" strokeLinecap="round"/>
      <circle cx="14" cy="34" r="1.5" fill="#E6C887"/>
      <path d="M8 40C8 40 10 37 14 36" stroke="#E6C887" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

// Mortar & Pestle for Traditional Wisdom
export function MortarPestleIcon({ className = "w-9 h-9" }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Pestle */}
      <path d="M34 10L24 24L20 20L30 6C31.5 4.5 34 5.5 34.8 7.2C35.4 8.2 35 9.2 34 10Z" stroke="#E6C887" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
      {/* Mortar Bowl */}
      <path d="M10 24H38C38 24 38 34 32 38C26 42 22 42 16 38C10 34 10 24 10 24Z" stroke="#E6C887" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
      {/* Base */}
      <path d="M18 42H30" stroke="#E6C887" strokeWidth="2.5" strokeLinecap="round"/>
      {/* Subtle interior glow */}
      <ellipse cx="24" cy="24" rx="14" ry="3" stroke="#E6C887" strokeWidth="1.8" strokeDasharray="3 3"/>
    </svg>
  );
}

// Quality Assured Starburst / Seal Icon
export function QualitySealIcon({ className = "w-9 h-9" }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Scalloped rosette seal */}
      <path d="M24 6L28 9.5L33.2 8.8L35.5 13.5L40.5 14.8L40.8 20L45 23L42.5 27.5L44.2 32.5L39.8 35.5L39 40.5L34 41.5L31.5 46L26.5 44.5L22.5 47L19.5 43.5L14.2 44.2L12.5 39.5L7.5 38.2L7.2 33L3 30L5.5 25.5L3.8 20.5L8.2 17.5L9 12.5L14 11.5L16.5 7L21.5 8.5L24 6Z" stroke="#E6C887" strokeWidth="2.2" strokeLinejoin="round"/>
      {/* Inner Checkmark */}
      <path d="M18 24.5L22.5 29L30.5 19.5" stroke="#E6C887" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

// Holistic Wellness Lotus Icon
export function LotusIcon({ className = "w-9 h-9" }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Center petal */}
      <path d="M24 10C24 10 19 22 24 34C29 22 24 10 24 10Z" stroke="#E6C887" strokeWidth="2.2" strokeLinejoin="round"/>
      {/* Left petal */}
      <path d="M22 17C16 19 10 27 15 34C18 34 21 31 22 28" stroke="#E6C887" strokeWidth="2.2" strokeLinecap="round"/>
      {/* Right petal */}
      <path d="M26 17C32 19 38 27 33 34C30 34 27 31 26 28" stroke="#E6C887" strokeWidth="2.2" strokeLinecap="round"/>
      {/* Far left wing */}
      <path d="M13 26C7 28 6 35 12 37C15 37 18 35 20 34" stroke="#E6C887" strokeWidth="2" strokeLinecap="round"/>
      {/* Far right wing */}
      <path d="M35 26C41 28 42 35 36 37C33 37 30 35 28 34" stroke="#E6C887" strokeWidth="2" strokeLinecap="round"/>
      {/* Water base ripple */}
      <path d="M16 41C20 42.5 28 42.5 32 41" stroke="#E6C887" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

// Botanical Branch for Corners
export function BotanicalBranch({ className = "w-24 h-24 text-[#2C5B3E]" }) {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M10 110C40 100 70 70 90 20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
      {/* Leaves branching */}
      <path d="M35 92C32 75 48 70 54 75C55 88 45 94 35 92Z" fill="currentColor" opacity="0.85"/>
      <path d="M50 78C62 62 78 72 75 80C65 88 52 82 50 78Z" fill="currentColor" opacity="0.7"/>
      <path d="M68 54C62 38 80 35 86 42C86 54 76 58 68 54Z" fill="currentColor" opacity="0.85"/>
      <path d="M78 40C90 26 104 35 101 45C92 50 81 44 78 40Z" fill="currentColor" opacity="0.75"/>
      <path d="M88 22C86 10 98 6 104 12C106 20 98 25 88 22Z" fill="currentColor" opacity="0.9"/>
    </svg>
  );
}
