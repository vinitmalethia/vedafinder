import React, { useState } from 'react';
import { BookOpen, Clock, User, ArrowRight, X, Sparkles, Tag } from 'lucide-react';

export default function BlogPage({ onNavigate }) {
  const [selectedArticle, setSelectedArticle] = useState(null);

  const articles = [
    {
      id: 'agni-digestion',
      title: 'Rekindling Agni: Why Optimal Gut Health is the Root of All Immunity',
      snippet: 'According to Charaka Samhita, "Roga Sarvepi Mande Agno" — all diseases stem from sluggish digestive fire. Discover how spices like Sunthi and Jeeraka ignite Agni.',
      author: 'Dr. R. Sharma, BAMS',
      date: 'Sept 2026',
      readTime: '4 min read',
      category: 'Gut & Digestion',
      image: '/images/herbal-tea-brew.jpg',
      content: `In Ayurveda, Agni (digestive fire) is responsible for converting food into life energy (Prana), body tissues (Dhatus), and vitality (Ojas). When Agni is weak (Mandaagni), undigested food ferments and produces Ama (toxic buildup).

### 3 Rules for Rekindling Agni:
1. **Sip Warm Herbal Infusions:** Avoid chilled ice water during meals. Sip warm Agnisip tea infused with dry ginger, cumin, and black pepper.
2. **Follow Dinacharya:** Eat your heaviest meal when the sun is at its zenith (12 PM - 2 PM), when Pitta and digestive fire are naturally peak.
3. **Avoid Incompatible Combinations (Viruddha Ahara):** Never mix milk with sour fruits or fish.

Ayurvedic digestive formulations like Agnisip tea work by gently stimulating stomach enzymes without creating acid reflux.`
    },
    {
      id: 'sahasraputi-bhasma',
      title: 'Sahasraputi Abhrak Bhasma: Ancient Indian Nano-Medicine Unveiled',
      snippet: 'What happens when biotite mica is incinerated 1,000 times in cow-dung pits with medicinal herbs? A look into the world’s most potent cellular rejuvenator.',
      author: 'Vaidya Ananya Joshi',
      date: 'Sept 2026',
      readTime: '6 min read',
      category: 'Rasashastra',
      image: '/images/ayurvedic-mortar-herbs.jpg',
      content: `Rasashastra is the apex branch of Ayurveda dealing with alchemy and herbo-mineral preparations.

### What is Sahasraputi?
The term 'Sahasra' means one thousand, and 'Puti' denotes a cycle of high-temperature calcination in sealed earthen crucibles (Sharava Samputa). 

### How it Works:
Through 1,000 repetitions of triturating mica with juices of Gomutra, Kasamarda, and Triphala followed by intense cow-dung cake heating, the mineral particles break down to under 20-50 nanometers.

**Key Benefits:**
- Rapidly absorbed at cellular level across the blood-brain barrier.
- Rebuilds depleted lung tissues in chronic cough and asthma.
- Enhances hemoglobin synthesis without gastrointestinal irritation.`
    },
    {
      id: 'pishti-cooling',
      title: 'Moti & Praval Pishti: The Cooling Moon Nectars for Acid Reflux & Stress',
      snippet: 'How pure pearls and corals triturated in organic Rose Water eliminate excess heat, hyperacidity, bleeding disorders, and emotional irritability.',
      author: 'Dr. V. Kulkarni',
      date: 'Aug 2026',
      readTime: '5 min read',
      category: 'Mineral Medicine',
      image: '/images/ayurvedic-herbs-bowls.jpg',
      content: `Unlike Bhasmas which undergo fire (Agni Samskara), Pishtis are prepared through 'Anagni' (cold processing) under the gentle rays of the full moon.

### The Power of Pure Mukta (Pearl):
Pearl is the supreme Pitta-pacifying gem. Rich in natural bioactive calcium and trace minerals, Moti Pishti calms heart palpitations, cools gastritis, relieves chronic low-grade fevers, and balances neurotransmitters during anxiety.

### Therapeutic Combinations:
Take 125mg Moti Pishti with raw organic honey or milk in the evening for restful sleep and digestive cooling.`
    },
    {
      id: 'male-vitality-ojas',
      title: 'Restoring Ojas: The Ayurvedic Science of Strength, Stamina & Vigor',
      snippet: 'Understanding the ultimate essence of the seven Dhatus and how purified Shilajit, Swarna Makshik, and Ashwagandha restore masculine endurance.',
      author: 'Vaidya S. Bhattacharya',
      date: 'Aug 2026',
      readTime: '5 min read',
      category: 'Rasayana & Vitality',
      image: '/images/ayurvedic-mortar-herbs.jpg',
      content: `Ojas is the supreme superfine essence of all seven bodily tissues (Rasa, Rakta, Mamsa, Meda, Asthi, Majja, and Shukra). When Ojas is depleted through stress, overwork, or poor diet, one experiences chronic fatigue, lack of motivation, and low vitality.

### Restorative Herbs in Nar Ojas:
- **Shudh Shilajit:** Provides 84+ ionic minerals and fulvic acid for ATP cellular energy.
- **KSM-66 Ashwagandha:** Lowers cortisol stress hormone by up to 28%.
- **Safed Musli & Kaunch Beej:** Nourishes reproductive tissue and promotes sustained stamina.

Consistent use for 60-90 days transforms physical endurance and mental clarity.`
    }
  ];

  return (
    <div className="py-12 bg-[#FAF7F2] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EAE0CB] text-[#8C682D] text-xs font-bold uppercase tracking-widest">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Vedic Knowledge Journal</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#183B2B]">
            Ayurvedic Wisdom & Research
          </h1>
          <p className="text-[#596E61] text-sm sm:text-base">
            In-depth guides on classical Rasashastra, dosha balance, and time-tested healing protocols written by certified Vaidyas.
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {articles.map((art) => (
            <div
              key={art.id}
              className="bg-white rounded-3xl p-5 sm:p-6 border border-[#E7DECD] hover:border-[#8C682D] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group cursor-pointer"
              onClick={() => setSelectedArticle(art)}
            >
              <div className="space-y-4">
                {/* Photo Banner */}
                <div className="w-full h-48 rounded-2xl overflow-hidden relative shadow-inner">
                  <img 
                    src={art.image} 
                    alt={art.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <span className="absolute top-3 left-3 text-xs font-bold uppercase tracking-wider text-[#FAF6EE] bg-[#183B2B]/90 px-3 py-1 rounded-full backdrop-blur-sm">
                    {art.category}
                  </span>
                  <div className="absolute bottom-3 right-3 flex items-center gap-1 text-xs text-white bg-black/40 px-2.5 py-1 rounded-full backdrop-blur-sm">
                    <Clock className="w-3 h-3 text-[#E6C887]" />
                    <span>{art.readTime}</span>
                  </div>
                </div>

                <div>
                  <h2 className="font-serif font-bold text-xl text-[#183B2B] group-hover:text-[#8C682D] transition-colors leading-snug">
                    {art.title}
                  </h2>
                  <p className="text-xs text-[#7A8B80] mt-1">
                    By {art.author} • {art.date}
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-[#55695C] leading-relaxed">
                  {art.snippet}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-[#EAE2D2] flex items-center justify-between text-xs font-semibold text-[#183B2B] group-hover:text-[#8C682D]">
                <span>Read Full Classical Guide</span>
                <div className="w-7 h-7 rounded-full bg-[#FAF5EB] flex items-center justify-center group-hover:bg-[#183B2B] group-hover:text-white transition-colors">
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Article Detail Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-12 flex items-center justify-center">
          <div onClick={() => setSelectedArticle(null)} className="fixed inset-0 bg-black/60 backdrop-blur-sm" />

          <div className="relative w-full max-w-2xl bg-[#FAF7F2] rounded-3xl p-6 sm:p-10 shadow-2xl border border-[#D5C9B3] z-10 max-h-[85vh] overflow-y-auto space-y-6">
            <button
              onClick={() => setSelectedArticle(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-white text-[#183B2B] shadow-sm hover:bg-[#FAF3E6]"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-full h-52 rounded-2xl overflow-hidden shadow-inner">
              <img src={selectedArticle.image} alt={selectedArticle.title} className="w-full h-full object-cover" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#8C682D] bg-[#FAF3E6] px-3 py-1 rounded-full border border-[#E3D3B7]">
                {selectedArticle.category}
              </span>
              <h2 className="font-serif font-bold text-2xl sm:text-3xl text-[#183B2B] pt-2">
                {selectedArticle.title}
              </h2>
              <p className="text-xs text-[#7A8C81]">
                Authored by {selectedArticle.author} • Published in Veda Finder Classical Compendium
              </p>
            </div>

            <div className="prose text-xs sm:text-sm text-[#465A4E] leading-relaxed whitespace-pre-line border-t border-[#EAE2D2] pt-4">
              {selectedArticle.content}
            </div>

            <div className="pt-4 border-t border-[#EAE2D2] flex justify-between items-center">
              <button
                onClick={() => { setSelectedArticle(null); onNavigate('Shop'); }}
                className="px-6 py-2.5 rounded-full bg-[#183B2B] text-white text-xs font-semibold hover:bg-[#2B6047]"
              >
                Browse Related Formulations
              </button>
              <button
                onClick={() => setSelectedArticle(null)}
                className="text-xs text-[#75887C] hover:text-[#183B2B]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
