import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Trophy, 
  BookOpen, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  Award, 
  Send, 
  ArrowRight, 
  ChevronRight, 
  User, 
  Phone, 
  GraduationCap, 
  MapPin, 
  HelpCircle, 
  Gift, 
  Medal, 
  Star, 
  RotateCcw,
  Check,
  Flame,
  Scroll,
  Feather,
  Compass,
  Bookmark,
  Share2,
  Calendar,
  Layers,
  ChevronDown,
  Info,
  ExternalLink,
  Download,
  Filter
} from 'lucide-react';
import sutraLogo from '../assets/the-sutra-logo.jpg';
import { getStoredSutraQuiz } from '../data/sutraQuizData';

// Past Archives Data with Categories
const PAST_ARCHIVES = [
  {
    week: 41,
    category: 'Rasashastra',
    date: 'Sunday, 24 Sept 2026',
    title: 'Sahasraputi Abhrak & Herbo-Mineral Alchemy',
    topScore: '100%',
    participants: 1240,
    difficulty: 'Scholar',
    questions: [
      {
        q: 'How many Putas are given to prepare classical Sahasraputi Abhrak Bhasma?',
        ans: '1,000 Puta cycles in sealed Sharava Samputa with Gomutra & botanical Bhavana juices.',
        shloka: 'सहस्रपुटी अभ्रकं परमं रसायनम् — रसतरङ्गिणी'
      },
      {
        q: 'Which gemstone Pishti is recommended with Rose Water for severe Pitta Raktapitta disorders?',
        ans: 'Moti Pishti (Mukta Pishti), triturated with organic Shatapatri Gulab Jal.',
        shloka: 'मुक्ता शीतवीर्या पित्तघ्नी चक्षुष्या कान्तिवर्धिनी — भावप्रकाश'
      }
    ]
  },
  {
    week: 40,
    category: 'Dravyaguna',
    date: 'Sunday, 17 Sept 2026',
    title: 'Triphala Rasayana, Ojas & Longevity Protocols',
    topScore: '100%',
    participants: 980,
    difficulty: 'Intermediate',
    questions: [
      {
        q: 'In Charaka Samhita Rasayana Adhyaya, what is the prime Anupana for morning Haritaki intake in Sharad Ritu?',
        ans: 'Sharkara (Sugar candy / Mishri) in Sharad Ritu to cool residual Pitta.',
        shloka: 'शर्करया शरदि — चरक संहिता चिकित्सा स्थान १'
      },
      {
        q: 'Which Dhatu is the direct predecessor of Shukra Dhatu in the Dhatu Parinama chain?',
        ans: 'Majja Dhatu (Bone Marrow / Nerve tissue).',
        shloka: 'मज्जायाः शुक्रं संभवति — सुश्रुत संहिता'
      }
    ]
  },
  {
    week: 39,
    category: 'Samhita',
    date: 'Sunday, 10 Sept 2026',
    title: 'Tridosha Siddhanta & Agni Metabolism',
    topScore: '100%',
    participants: 1120,
    difficulty: 'Advanced',
    questions: [
      {
        q: 'Which sub-type of Vata is responsible for Prana expulsion and sensory perception?',
        ans: 'Prana Vata situated in Murdha (Head), circulating in Chest and Throat.',
        shloka: 'प्राणोऽत्र मूर्धगः कण्ठोरश्चरो बुद्धिहृदयेन्द्रियचित्तधृक् — अष्टांग हृदयम्'
      },
      {
        q: 'What is the characteristic symptom of Tikshnagni in Charaka Samhita?',
        ans: 'Rapid digestion leading to burning sensations and excessive appetite.',
        shloka: 'तीक्ष्णोऽतिमात्रं पचति — चरक संहिता'
      }
    ]
  }
];

// Hall of Fame Winners
const HALL_OF_FAME = [
  {
    rank: 1,
    name: 'Dr. Vaibhav Shastri, MD (Ayu)',
    score: '5/5 (100%)',
    time: '2m 14s',
    city: 'All India Institute of Ayurveda, New Delhi',
    prize: '100% FREE Product Gift (Abhrak Bhasma 1000 Puti) + Gold Certificate',
    badge: '🥇 Sunday Champion',
    week: 42
  },
  {
    rank: 2,
    name: 'Dr. Sneha Kulkarni, BAMS',
    score: '5/5 (100%)',
    time: '2m 48s',
    city: 'National Institute of Ayurveda (NIA), Jaipur',
    prize: '100% FREE Product Gift (Nar Ojas Vitality) + Silver Certificate',
    badge: '🥈 1st Runner Up',
    week: 42
  },
  {
    rank: 3,
    name: 'Dr. Rohit Mukherjee, BAMS Scholar',
    score: '5/5 (100%)',
    time: '3m 10s',
    city: 'Institute of Medical Sciences, BHU Varanasi',
    prize: 'Exclusive 25% OFF Reward Coupon + Bronze Certificate',
    badge: '🥉 2nd Runner Up',
    week: 42
  }
];

// Ayurveda Library Classical Topics
const LIBRARY_TOPICS = [
  {
    id: 'samhitas',
    title: 'Samhitas',
    subtitle: 'The Classical Foundations',
    icon: '📜',
    desc: 'Explore the Great Brihat Trayi: Charaka Samhita (Internal Medicine), Sushruta Samhita (Surgery & Anatomy), and Ashtanga Hridaya (Comprehensive Synthesis).',
    content: 'The Samhitas represent the bedrock of Ayurvedic medicine. Charaka Samhita delineates the philosophy of life, diagnosis, and herbal formulations across 120 chapters. Sushruta Samhita pioneers surgical techniques (Shalya Tantra), while Vagbhata synthesizes both traditions into timeless lyrical verses.',
    tag: 'Brihat Trayi'
  },
  {
    id: 'dravyaguna',
    title: 'Dravyaguna',
    subtitle: 'Materia Medica & Energetics',
    icon: '🌿',
    desc: 'Discover medicinal plants, Rasa (Taste), Guna (Qualities), Virya (Potency), Vipaka (Post-digestive effect), and Prabhava (Specific action).',
    content: 'Every substance in the universe is potential medicine when understood through the Panchamahabhuta theory. Dravyaguna teaches how herbs like Ashwagandha, Guduchi, and Haritaki balance Doshas through precise elemental energetics rather than mere chemical reductionism.',
    tag: 'Herbology'
  },
  {
    id: 'agni',
    title: 'Agni & Digestion',
    subtitle: 'The Sacred Digestive Fire',
    icon: '🔥',
    desc: 'Understand Jatharagni (Central digestive fire), Dhatwagni (Cellular metabolism), and Bhutagni (Elemental transformation).',
    content: 'Agni is life itself — "रोगाः सर्वेऽपि मन्दोग्नौ" (All diseases originate from sluggish Agni). When Agni is balanced (Samagni), nutrition transforms cleanly into Ojas (vital vigor). When impaired, it produces Ama (toxic metabolic residue), the root trigger of chronic ailments.',
    tag: 'Metabolism'
  },
  {
    id: 'tridosha',
    title: 'Tridosha Siddhanta',
    subtitle: 'Vata, Pitta & Kapha',
    icon: '⚖️',
    desc: 'Master the tri-energetic framework governing movement (Vata), transformation (Pitta), and structure/cohesion (Kapha).',
    content: 'The Tridosha theory bridges human physiology with macrocosmic nature. Vata embodies Ether & Air; Pitta embodies Fire & Water; Kapha embodies Water & Earth. Health (Swasthya) is defined as a dynamic state of Dosha balance, optimal Agni, balanced tissues, and serene mind.',
    tag: 'Bio-energetics'
  }
];

// Random Classical Products for Free Reward Gifts
const RANDOM_FREE_PRODUCTS = [
  'Abhrak Bhasma (1,000 Puti) 10GM',
  'Nar Ojas Vitality Rasayana (90 Caps)',
  'Praval Pishti Shuddha 10GM',
  'Moti Pishti Authentic Bhasma 10GM',
  'Agnisip Digestive Herbal Tea (20 Pyramid Bags)',
  'Godanti Bhasma 10GM',
  'Loha Bhasma Shuddha 10GM'
];

export default function TheSutraPage({ onNavigate }) {
  const [activeTab, setActiveTab] = useState('quiz'); // 'quiz' | 'journey' | 'library' | 'winners' | 'rewards' | 'archives' | 'certificate'
  const [currentQuiz, setCurrentQuiz] = useState(getStoredSutraQuiz);
  const [userAnswers, setUserAnswers] = useState({});
  const [registration, setRegistration] = useState({
    name: '',
    phone: '',
    role: 'BAMS Student',
    institution: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [scoreResult, setScoreResult] = useState(null);
  const [activeLibraryModal, setActiveLibraryModal] = useState(null);
  const [archiveFilter, setArchiveFilter] = useState('All');
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

  // Live Countdown Timer (Simulated Sunday Window: Closes in hours/mins/secs)
  const [timeLeft, setTimeLeft] = useState({
    hours: 4,
    minutes: 17,
    seconds: 32
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 0, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Sync dynamically with quiz updates from Admin Panel
  useEffect(() => {
    const handleQuizUpdate = (e) => {
      if (e.detail) {
        setCurrentQuiz(e.detail);
      } else {
        setCurrentQuiz(getStoredSutraQuiz());
      }
    };
    window.addEventListener('vf_sutra_quiz_updated', handleQuizUpdate);
    window.addEventListener('storage', handleQuizUpdate);
    return () => {
      window.removeEventListener('vf_sutra_quiz_updated', handleQuizUpdate);
      window.removeEventListener('storage', handleQuizUpdate);
    };
  }, []);

  const handleSelectOption = (questionId, optionKey) => {
    if (isSubmitted) return;
    setUserAnswers(prev => ({
      ...prev,
      [questionId]: optionKey
    }));
  };

  const formatWhatsAppMessage = (result, answers) => {
    const questionLines = (currentQuiz.questions || []).map((q, idx) => {
      const chosenKey = answers[q.id];
      const chosenOption = q.options?.find(o => o.key === chosenKey);
      const correctOption = q.options?.find(o => o.key === q.correct);
      const isRight = chosenKey === q.correct;
      const statusMark = isRight ? '✅ Correct' : chosenKey ? '❌ Incorrect' : '⚠️ Unanswered';

      return [
        `*Q${idx + 1}: ${q.question}*`,
        `👉 *Participant Answer:* ${chosenKey ? `${chosenKey}) ${chosenOption?.text || ''}` : 'Not Answered'}`,
        `🎯 *Correct Classical Answer:* ${q.correct}) ${correctOption?.text || ''}`,
        `📌 *Result:* ${statusMark}`
      ].join('\n');
    }).join('\n\n');

    return [
      `📜 *THE SUTRA — Ayurveda Knowledge Challenge Submission*`,
      `*Token ID:* ${result.tokenId}`,
      `*Week:* ${currentQuiz.week} (${currentQuiz.title})`,
      ``,
      `👤 *Participant Details:*`,
      `• *Name:* ${result.name}`,
      `• *WhatsApp:* ${result.phone}`,
      `• *Category:* ${result.role}`,
      `• *Institution/City:* ${result.institution}`,
      ``,
      `🏆 *Score Summary:*`,
      `• *Total Score:* ${result.score} / ${result.total} (${result.percentage}%)`,
      `• *Result Status:* ${result.percentage >= 80 ? '🌟 Qualified for Free Product Gift & Gold Honors' : 'Completed Participation'}`,
      ``,
      `🎁 *REWARD UNLOCKED:*`,
      result.percentage >= 80 
        ? `• *Free Product Gift:* 100% Free ${result.randomProduct} (or Coupon: ${result.couponCode})`
        : `• *Reward Coupon Code:* ${result.couponCode} (10% OFF on all remedies)`,
      ``,
      `📝 *QUESTIONS & ANSWERS SUBMISSION:*`,
      `───────────────────────────────`,
      questionLines,
      `───────────────────────────────`,
      ``,
      `🌿 *Submitted via Veda Finder — The Sutra Platform*`,
      `Please record my answers, rank for the Sunday Hall of Fame, and process my reward claim. Dhanyavaad!`
    ].join('\n');
  };

  const handleQuizSubmit = (e) => {
    e.preventDefault();

    if (!registration.name.trim() || !registration.phone.trim()) {
      alert('Please fill in your Name and WhatsApp Number to record your submission.');
      return;
    }

    // Evaluate score
    let correctCount = 0;
    (currentQuiz.questions || []).forEach(q => {
      if (userAnswers[q.id] === q.correct) {
        correctCount++;
      }
    });

    const total = currentQuiz.questions?.length || 5;
    const percentage = Math.round((correctCount / total) * 100);
    const tokenId = `SUTRA-W${currentQuiz.week || 42}-` + Math.floor(1000 + Math.random() * 9000);
    const isWinner = percentage >= 80;
    const randomProduct = RANDOM_FREE_PRODUCTS[Math.floor(Math.random() * RANDOM_FREE_PRODUCTS.length)];
    const couponCode = isWinner ? 'SUTRA20' : 'SUTRA10';

    const result = {
      score: correctCount,
      total: total,
      percentage: percentage,
      tokenId: tokenId,
      name: registration.name.trim(),
      phone: registration.phone.trim(),
      role: registration.role,
      institution: registration.institution.trim() || 'Ayurveda Seeker',
      isWinner: isWinner,
      randomProduct: randomProduct,
      couponCode: couponCode
    };

    setScoreResult(result);
    setIsSubmitted(true);
    
    // Smooth scroll to results
    const quizElement = document.getElementById('sutra-main-content');
    if (quizElement) {
      quizElement.scrollIntoView({ behavior: 'smooth' });
    }

    // Auto forward to WhatsApp
    const msg = formatWhatsAppMessage(result, userAnswers);
    const url = `https://wa.me/919888335557?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  };

  const handleSendToWhatsApp = () => {
    if (!scoreResult) return;
    const msg = formatWhatsAppMessage(scoreResult, userAnswers);
    const url = `https://wa.me/919888335557?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  };

  const handleResetQuiz = () => {
    setUserAnswers({});
    setIsSubmitted(false);
    setScoreResult(null);
  };

  const scrollToQuiz = () => {
    setActiveTab('quiz');
    const el = document.getElementById('sutra-main-content');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const filteredArchives = archiveFilter === 'All' 
    ? PAST_ARCHIVES 
    : PAST_ARCHIVES.filter(a => a.category.toLowerCase() === archiveFilter.toLowerCase());

  return (
    <div className="py-8 sm:py-12 bg-[#FAF7F2] min-h-screen selection:bg-[#183B2B] selection:text-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        
        {/* ==================================================================== */}
        {/* 1. HERO SECTION WITH OFFICIAL LOGO EMBLEM */}
        {/* ==================================================================== */}
        <div className="rounded-3xl bg-gradient-to-b from-[#0B1E15] via-[#0E2419] to-[#0A1A12] text-[#FAF7F2] border-2 border-[#C59A4E]/50 p-6 sm:p-12 lg:p-16 shadow-2xl relative overflow-hidden text-center space-y-6">
          
          {/* Subtle Background Vedic Glow */}
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div className="absolute top-0 right-10 w-96 h-96 bg-[#C59A4E] rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-0 left-10 w-96 h-96 bg-[#1F543B] rounded-full blur-3xl" />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto space-y-6">
            
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C59A4E]/20 border border-[#C59A4E]/50 text-[#E6C887] text-xs font-bold uppercase tracking-widest shadow-inner">
              <Sparkles className="w-3.5 h-3.5 text-[#E6C887]" />
              <span>VEDA FINDER PRESENTS</span>
            </div>

            {/* Prominent Logo & Title Branding */}
            <div className="flex flex-col items-center justify-center gap-4">
              <div className="relative group">
                <div className="absolute -inset-1.5 bg-gradient-to-r from-[#C59A4E] via-[#F3E5C8] to-[#9E742C] rounded-full blur-md opacity-75 group-hover:opacity-100 transition duration-500 animate-pulse" />
                <img 
                  src={sutraLogo} 
                  alt="THE SUTRA - Think • Learn • Solve • Win" 
                  className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full object-cover shadow-2xl border-2 border-[#E6C887] transform transition duration-500 group-hover:scale-105"
                />
              </div>

              <div className="space-y-2">
                <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-tight">
                  THE SUTRA
                </h1>
                <p className="font-serif text-xl sm:text-2xl lg:text-3xl text-[#E6C887] font-medium tracking-wide">
                  The Ayurveda Knowledge Challenge
                </p>
              </div>
            </div>

            {/* Sacred Hindi Motto */}
            <div className="pt-1">
              <span className="inline-block font-serif text-base sm:text-xl text-[#F4E6CB] italic font-semibold px-6 py-1.5 rounded-full bg-[#183B2B] border border-[#C59A4E]/40 shadow-inner">
                ज्ञान की खोज। आयुर्वेद के साथ।
              </span>
            </div>

            {/* Poetic Tagline */}
            <p className="text-sm sm:text-base lg:text-lg text-[#C7DFD3] max-w-2xl mx-auto leading-relaxed font-light italic">
              "A weekly journey through the wisdom of Ayurveda — one question, one discovery at a time."
            </p>

            {/* 3 Live-Looking Badges */}
            <div className="pt-2 flex items-center justify-center gap-2.5 sm:gap-4 text-xs sm:text-sm flex-wrap">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-900/90 text-emerald-300 border border-emerald-500/50 font-bold shadow-md">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>● LIVE EVERY SUNDAY</span>
              </span>
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#143325] text-[#DFCFA8] border border-[#C59A4E]/40 font-semibold shadow-md">
                <Clock className="w-3.5 h-3.5 text-[#C59A4E]" />
                <span>⏱ 10:00 AM – 10:00 PM IST</span>
              </span>
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1F4533] text-[#F3E5C8] border border-[#C59A4E]/50 font-bold shadow-md">
                <Trophy className="w-3.5 h-3.5 text-[#E6C887]" />
                <span>🏆 WIN • LEARN • EARN</span>
              </span>
            </div>

            {/* Main Action Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={scrollToQuiz}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-[#C59A4E] via-[#E6C887] to-[#B88836] text-[#0E2419] font-bold text-base shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all group"
              >
                <span>ENTER THIS WEEK'S SUTRA</span>
                <ArrowRight className="w-5 h-5 stroke-[2.5] group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => {
                  setActiveTab('archives');
                  const el = document.getElementById('sutra-main-content');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#183B2B]/80 hover:bg-[#183B2B] text-[#FAF7F2] border border-[#C59A4E]/40 font-semibold text-sm transition-all shadow-md"
              >
                <BookOpen className="w-4 h-4 text-[#E6C887]" />
                <span>Explore Previous Challenges</span>
              </button>
            </div>

          </div>
        </div>

        {/* ==================================================================== */}
        {/* 2. ANCIENT WISDOM → MODERN CHALLENGE STORYTELLING */}
        {/* ==================================================================== */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#E3D8C3] shadow-sm text-center space-y-6 relative overflow-hidden">
          <div className="max-w-3xl mx-auto space-y-3">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#8C682D] bg-[#FAF3E6] px-4 py-1.5 rounded-full border border-[#E4D5B9]">
              FROM THE CLASSICS TO YOU
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#183B2B]">
              Where Ancient Wisdom Meets Curiosity
            </h2>
            <p className="text-sm sm:text-base text-[#4A5D51] leading-relaxed">
              Ayurveda carries thousands of years of knowledge — preserved through classical Samhitas, oral traditions, and generations of revered Acharyas. <strong>THE SUTRA</strong> distills that profound wisdom into engaging, high-yield weekly explorations for modern seekers, practitioners, and scholars.
            </p>
          </div>

          {/* 5 Classical Ayurveda Pillars */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 pt-2">
            {[
              { name: 'Samhitas', icon: '📜', desc: 'Charaka & Sushruta' },
              { name: 'Dravyaguna', icon: '🌿', desc: 'Materia Medica' },
              { name: 'Tridosha', icon: '⚖️', desc: 'Vata, Pitta, Kapha' },
              { name: 'Rasashastra', icon: '🔥', desc: 'Herbo-Mineral Alchemy' },
              { name: 'Swasthavritta', icon: '🌱', desc: 'Daily Regimen & Dinacharya' }
            ].map((pillar) => (
              <div 
                key={pillar.name}
                className="px-4 py-2 rounded-2xl bg-[#FAF7F2] border border-[#DFCFA8] flex items-center gap-2 text-xs sm:text-sm font-bold text-[#183B2B] shadow-sm hover:border-[#8C682D] transition-colors"
              >
                <span>{pillar.icon}</span>
                <span>{pillar.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ==================================================================== */}
        {/* 3. STICKY / FLOATING NAVIGATION BAR */}
        {/* ==================================================================== */}
        <div id="sutra-main-content" className="sticky top-4 z-40 flex justify-center w-full px-2">
          <div className="inline-flex items-center gap-1 sm:gap-1.5 p-1.5 bg-[#122E21]/95 backdrop-blur-md rounded-full max-w-full border border-[#C59A4E]/50 shadow-2xl text-xs sm:text-sm font-semibold overflow-x-auto no-scrollbar">
            
            <button
              onClick={() => setActiveTab('quiz')}
              className={`px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full transition-all flex items-center gap-1.5 sm:gap-2 whitespace-nowrap shrink-0 ${
                activeTab === 'quiz' 
                  ? 'bg-gradient-to-r from-[#C59A4E] to-[#E6C887] text-[#0E2419] font-bold shadow-md' 
                  : 'text-[#DFE8E2] hover:text-white hover:bg-white/10'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
              <span>QUIZ</span>
            </button>

            <button
              onClick={() => setActiveTab('journey')}
              className={`px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full transition-all flex items-center gap-1.5 sm:gap-2 whitespace-nowrap shrink-0 ${
                activeTab === 'journey' 
                  ? 'bg-gradient-to-r from-[#C59A4E] to-[#E6C887] text-[#0E2419] font-bold shadow-md' 
                  : 'text-[#DFE8E2] hover:text-white hover:bg-white/10'
              }`}
            >
              <Flame className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
              <span>JOURNEY</span>
            </button>

            <button
              onClick={() => setActiveTab('library')}
              className={`px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full transition-all flex items-center gap-1.5 sm:gap-2 whitespace-nowrap shrink-0 ${
                activeTab === 'library' 
                  ? 'bg-gradient-to-r from-[#C59A4E] to-[#E6C887] text-[#0E2419] font-bold shadow-md' 
                  : 'text-[#DFE8E2] hover:text-white hover:bg-white/10'
              }`}
            >
              <Scroll className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
              <span>LIBRARY</span>
            </button>

            <button
              onClick={() => setActiveTab('winners')}
              className={`px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full transition-all flex items-center gap-1.5 sm:gap-2 whitespace-nowrap shrink-0 ${
                activeTab === 'winners' 
                  ? 'bg-gradient-to-r from-[#C59A4E] to-[#E6C887] text-[#0E2419] font-bold shadow-md' 
                  : 'text-[#DFE8E2] hover:text-white hover:bg-white/10'
              }`}
            >
              <Trophy className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
              <span>HALL OF FAME</span>
            </button>

            <button
              onClick={() => setActiveTab('rewards')}
              className={`px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full transition-all flex items-center gap-1.5 sm:gap-2 whitespace-nowrap shrink-0 ${
                activeTab === 'rewards' 
                  ? 'bg-gradient-to-r from-[#C59A4E] to-[#E6C887] text-[#0E2419] font-bold shadow-md' 
                  : 'text-[#DFE8E2] hover:text-white hover:bg-white/10'
              }`}
            >
              <Gift className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
              <span>REWARD VAULT</span>
            </button>

            <button
              onClick={() => setActiveTab('archives')}
              className={`px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full transition-all flex items-center gap-1.5 sm:gap-2 whitespace-nowrap shrink-0 ${
                activeTab === 'archives' 
                  ? 'bg-gradient-to-r from-[#C59A4E] to-[#E6C887] text-[#0E2419] font-bold shadow-md' 
                  : 'text-[#DFE8E2] hover:text-white hover:bg-white/10'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
              <span>ARCHIVE</span>
            </button>

            <button
              onClick={() => setActiveTab('certificate')}
              className={`px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full transition-all flex items-center gap-1.5 sm:gap-2 whitespace-nowrap shrink-0 ${
                activeTab === 'certificate' 
                  ? 'bg-gradient-to-r from-[#C59A4E] to-[#E6C887] text-[#0E2419] font-bold shadow-md' 
                  : 'text-[#DFE8E2] hover:text-white hover:bg-white/10'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
              <span>CERTIFICATE</span>
            </button>

          </div>
        </div>

        {/* ==================================================================== */}
        {/* TAB 1: WEEKLY QUIZ — THE STAR CHALLENGE */}
        {/* ==================================================================== */}
        {activeTab === 'quiz' && (
          <div className="space-y-8 animate-fadeIn">
            
            {/* Top Challenge Metadata & Live Timer Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E3D8C3] shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#8C682D] bg-[#FAF3E6] px-3 py-1 rounded-full border border-[#E4D5B9]">
                    WEEK {currentQuiz.week || 42} CHALLENGE
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 flex items-center gap-1">
                    <span>🌿</span>
                    <span>DIFFICULTY: INTERMEDIATE</span>
                  </span>
                </div>
                <h2 className="font-serif font-bold text-2xl sm:text-3xl text-[#183B2B]">
                  {currentQuiz.title}
                </h2>
                <p className="text-xs sm:text-sm text-[#6B7E72]">
                  Theme: <strong className="font-serif text-[#8C682D]">{currentQuiz.sanskritTheme}</strong> • {currentQuiz.questions?.length || 5} Classical Questions
                </p>
              </div>

              {/* Dynamic Live Countdown Box */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-[#122E21] to-[#0A1A12] text-white border border-[#C59A4E]/40 text-center shrink-0 w-full md:w-auto shadow-lg">
                <span className="text-[10px] uppercase font-bold text-[#E6C887] tracking-wider block mb-1 flex items-center justify-center gap-1">
                  <Clock className="w-3 h-3 text-[#E6C887]" />
                  CHALLENGE CLOSES IN
                </span>
                <div className="font-mono text-xl sm:text-2xl font-bold tracking-wider text-white flex items-center justify-center gap-1.5">
                  <span className="px-2 py-1 bg-white/10 rounded-lg">{String(timeLeft.hours).padStart(2, '0')}h</span>
                  <span>:</span>
                  <span className="px-2 py-1 bg-white/10 rounded-lg">{String(timeLeft.minutes).padStart(2, '0')}m</span>
                  <span>:</span>
                  <span className="px-2 py-1 bg-white/10 rounded-lg text-emerald-400">{String(timeLeft.seconds).padStart(2, '0')}s</span>
                </div>
              </div>
            </div>

            {/* Scorecard Modal / Banner if Submitted */}
            {isSubmitted && scoreResult && (
              <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#122E21] via-[#173D2C] to-[#0A1A12] text-white border-2 border-[#C59A4E] shadow-2xl space-y-6 text-center animate-scaleUp">
                <div className="w-16 h-16 rounded-full bg-[#C59A4E] text-[#0E2419] flex items-center justify-center mx-auto shadow-lg">
                  <Award className="w-9 h-9 stroke-[2.2]" />
                </div>

                <div className="space-y-2">
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#C59A4E]/20 text-[#E6C887] border border-[#C59A4E]/40">
                    {scoreResult.tokenId}
                  </span>
                  <h3 className="font-serif text-3xl sm:text-4xl font-bold text-white">
                    {scoreResult.isWinner ? '🎉 Magnificent Mastery!' : 'Challenge Completed!'}
                  </h3>
                  <p className="text-sm text-[#B4D0C2] max-w-lg mx-auto">
                    {scoreResult.isWinner
                      ? `Congratulations ${scoreResult.name}! You scored ${scoreResult.percentage}% in Week ${currentQuiz.week} and qualified for the Sunday Hall of Fame!`
                      : `Well attempted, ${scoreResult.name}! You scored ${scoreResult.score} out of ${scoreResult.total} (${scoreResult.percentage}%). Keep deepening your classical Samhita study!`}
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-lg mx-auto text-left">
                  <div className="p-3 bg-[#0E2419]/80 rounded-xl border border-[#234E39]">
                    <span className="text-[10px] text-[#8FAFA0] block">SCORE</span>
                    <span className="text-lg font-bold text-white">{scoreResult.score} / {scoreResult.total}</span>
                  </div>
                  <div className="p-3 bg-[#0E2419]/80 rounded-xl border border-[#234E39]">
                    <span className="text-[10px] text-[#8FAFA0] block">ACCURACY</span>
                    <span className="text-lg font-bold text-emerald-400">{scoreResult.percentage}%</span>
                  </div>
                  <div className="p-3 bg-[#0E2419]/80 rounded-xl border border-[#234E39] col-span-2 sm:col-span-1">
                    <span className="text-[10px] text-[#8FAFA0] block">STATUS</span>
                    <span className="text-sm font-bold text-[#E6C887]">
                      {scoreResult.isWinner ? '🌟 Qualified' : 'Completed'}
                    </span>
                  </div>
                </div>

                {/* Unlocked Reward Box */}
                <div className="p-5 rounded-2xl bg-[#09150F] border border-[#C59A4E]/50 max-w-xl mx-auto text-left space-y-2">
                  <div className="flex items-center gap-2 text-[#E6C887] text-xs font-bold uppercase tracking-wider">
                    <Gift className="w-4 h-4" />
                    <span>UNLOCKED REWARD</span>
                  </div>
                  {scoreResult.isWinner ? (
                    <div className="space-y-1">
                      <p className="text-sm text-white font-semibold">
                        🎁 100% Free Botanical Product: <span className="text-[#E6C887] font-bold">{scoreResult.randomProduct}</span>
                      </p>
                      <p className="text-xs text-[#8FAFA0]">
                        Or use coupon <span className="font-mono text-white bg-[#183B2B] px-2 py-0.5 rounded border border-[#C59A4E]">{scoreResult.couponCode}</span> for 20% OFF on all dispensary remedies.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-1">
                      <p className="text-sm text-white font-semibold">
                        🎟️ Guaranteed Coupon Code: <span className="font-mono text-[#E6C887] font-bold">{scoreResult.couponCode}</span> (10% OFF Storewide)
                      </p>
                      <p className="text-xs text-[#8FAFA0]">
                        Use this code at checkout on any sacred single-herb powder or classical bhasma.
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                  <button
                    onClick={handleSendToWhatsApp}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg transition-all"
                  >
                    <Send className="w-4 h-4" />
                    <span>Re-send Answers to WhatsApp</span>
                  </button>

                  <button
                    onClick={handleResetQuiz}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-[#FAF7F2] font-semibold text-sm border border-white/20 transition-all"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Attempt Again</span>
                  </button>
                </div>
              </div>
            )}

            {/* Questions List with "THE SUTRA EXPLAINS" (Why?) Cards */}
            <div className="space-y-6">
              {(currentQuiz.questions || []).map((q, idx) => {
                const selectedKey = userAnswers[q.id];
                const isSelected = !!selectedKey;

                return (
                  <div 
                    key={q.id || idx}
                    className={`bg-white rounded-3xl p-6 sm:p-8 border transition-all duration-300 shadow-sm ${
                      isSubmitted 
                        ? (selectedKey === q.correct ? 'border-emerald-500 bg-emerald-50/20' : 'border-rose-300 bg-rose-50/20')
                        : (isSelected ? 'border-[#8C682D] bg-[#FCFAF6]' : 'border-[#E3D8C3]')
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-full bg-[#FAF7F2] border border-[#DFCFA8] text-[#183B2B] font-serif font-bold text-sm flex items-center justify-center">
                          {idx + 1}
                        </span>
                        <span className="text-xs font-bold uppercase tracking-wider text-[#8C682D]">
                          QUESTION {idx + 1} OF {currentQuiz.questions.length}
                        </span>
                      </div>

                      {isSubmitted && (
                        <div>
                          {selectedKey === q.correct ? (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                              <CheckCircle2 className="w-3.5 h-3.5" /> Correct
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-bold">
                              <XCircle className="w-3.5 h-3.5" /> Incorrect
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    <h3 className="font-serif text-lg sm:text-xl font-bold text-[#183B2B] mb-6 leading-snug">
                      {q.question}
                    </h3>

                    {/* MCQ Options Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      {q.options?.map((opt) => {
                        const isChosen = selectedKey === opt.key;
                        const isCorrectAnswer = q.correct === opt.key;

                        let buttonStyle = 'border-[#E3D8C3] bg-[#FAF7F2] text-[#2D3D34] hover:border-[#8C682D] hover:bg-[#F5EEDB]';
                        
                        if (isSubmitted) {
                          if (isCorrectAnswer) {
                            buttonStyle = 'border-emerald-500 bg-emerald-100/90 text-emerald-950 font-bold ring-2 ring-emerald-500';
                          } else if (isChosen && !isCorrectAnswer) {
                            buttonStyle = 'border-rose-400 bg-rose-100/80 text-rose-950 line-through opacity-75';
                          } else {
                            buttonStyle = 'border-gray-200 bg-gray-50 text-gray-400 opacity-60';
                          }
                        } else if (isChosen) {
                          buttonStyle = 'border-[#183B2B] bg-[#183B2B] text-white font-bold shadow-md';
                        }

                        return (
                          <button
                            key={opt.key}
                            type="button"
                            disabled={isSubmitted}
                            onClick={() => handleSelectOption(q.id, opt.key)}
                            className={`p-4 rounded-2xl border text-left flex items-start gap-3 transition-all duration-200 ${buttonStyle}`}
                          >
                            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                              isChosen && !isSubmitted
                                ? 'bg-[#E6C887] text-[#0E2419]'
                                : isSubmitted && isCorrectAnswer
                                ? 'bg-emerald-600 text-white'
                                : 'bg-[#E8DFC9] text-[#183B2B]'
                            }`}>
                              {opt.key}
                            </span>
                            <span className="text-sm leading-relaxed pt-0.5">{opt.text}</span>
                          </button>
                        );
                      })}
                    </div>

                    {/* "THE SUTRA EXPLAINS" (Classical Why? Card) */}
                    {(isSubmitted || isSelected) && q.explanation && (
                      <div className="mt-6 p-4 sm:p-5 rounded-2xl bg-[#F5EEDB]/70 border border-[#DFCFA8] space-y-1.5 animate-fadeIn">
                        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8C682D]">
                          <Scroll className="w-3.5 h-3.5" />
                          <span>THE SUTRA EXPLAINS • CLASSICAL REFERENCE</span>
                        </div>
                        <p className="text-xs sm:text-sm text-[#2D3D34] leading-relaxed font-medium">
                          {q.explanation}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Submission Form / WhatsApp Forwarding Box */}
            {!isSubmitted && (
              <div className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-[#C59A4E]/60 shadow-xl space-y-6">
                <div className="border-b border-[#E3D8C3] pb-4 space-y-1 text-center sm:text-left">
                  <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#8C682D]">
                    <Sparkles className="w-4 h-4" />
                    <span>RECORD YOUR ENTRY</span>
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#183B2B]">
                    Submit Answers & Claim Your Sunday Reward
                  </h3>
                  <p className="text-xs sm:text-sm text-[#6B7E72]">
                    Your answers, score, and unlocked reward will be forwarded directly to the Veda Finder WhatsApp desk (<strong>+91 9888335557</strong>) to verify your rank in the Sunday Hall of Fame.
                  </p>
                </div>

                <form onSubmit={handleQuizSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-[#183B2B] flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-[#8C682D]" />
                        <span>Full Name *</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Dr. Vaibhav Shastri / Ananya Sharma"
                        value={registration.name}
                        onChange={(e) => setRegistration({ ...registration, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-2xl bg-[#FAF7F2] border border-[#DFCFA8] text-sm text-[#183B2B] focus:outline-none focus:border-[#183B2B] focus:ring-1 focus:ring-[#183B2B]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-[#183B2B] flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-[#8C682D]" />
                        <span>WhatsApp Number *</span>
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. +91 98765 43210"
                        value={registration.phone}
                        onChange={(e) => setRegistration({ ...registration, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-2xl bg-[#FAF7F2] border border-[#DFCFA8] text-sm text-[#183B2B] focus:outline-none focus:border-[#183B2B] focus:ring-1 focus:ring-[#183B2B]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-[#183B2B] flex items-center gap-1.5">
                        <GraduationCap className="w-3.5 h-3.5 text-[#8C682D]" />
                        <span>Category / Role</span>
                      </label>
                      <select
                        value={registration.role}
                        onChange={(e) => setRegistration({ ...registration, role: e.target.value })}
                        className="w-full px-4 py-3 rounded-2xl bg-[#FAF7F2] border border-[#DFCFA8] text-sm text-[#183B2B] focus:outline-none focus:border-[#183B2B] focus:ring-1 focus:ring-[#183B2B]"
                      >
                        <option value="BAMS Student">BAMS Student / Intern</option>
                        <option value="Ayurveda MD/MS Scholar">Ayurveda MD/MS Scholar</option>
                        <option value="Practicing Vaidya / Doctor">Practicing Vaidya / Doctor</option>
                        <option value="Ayurveda Enthusiast">Ayurveda Enthusiast / Seeker</option>
                        <option value="Botanist / Researcher">Botanist / Researcher</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-[#183B2B] flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-[#8C682D]" />
                        <span>College / Institution / City</span>
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. NIA Jaipur / AIIA New Delhi / Mumbai"
                        value={registration.institution}
                        onChange={(e) => setRegistration({ ...registration, institution: e.target.value })}
                        className="w-full px-4 py-3 rounded-2xl bg-[#FAF7F2] border border-[#DFCFA8] text-sm text-[#183B2B] focus:outline-none focus:border-[#183B2B] focus:ring-1 focus:ring-[#183B2B]"
                      />
                    </div>
                  </div>

                  <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#E3D8C3]">
                    <div className="text-xs text-[#6B7E72] flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span>{Object.keys(userAnswers).length} of {currentQuiz.questions?.length || 5} questions answered</span>
                    </div>

                    <button
                      type="submit"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-[#183B2B] to-[#122E21] hover:from-[#1F4D38] hover:to-[#183B2B] text-[#FAF7F2] font-bold text-sm sm:text-base border border-[#C59A4E]/40 shadow-xl hover:shadow-2xl transition-all"
                    >
                      <Send className="w-4 h-4 text-[#E6C887]" />
                      <span>SUBMIT YOUR ANSWERS →</span>
                    </button>
                  </div>
                </form>
              </div>
            )}

          </div>
        )}

        {/* ==================================================================== */}
        {/* TAB 2: YOUR SUTRA JOURNEY & KNOWLEDGE STREAK */}
        {/* ==================================================================== */}
        {activeTab === 'journey' && (
          <div className="space-y-10 animate-fadeIn">
            
            {/* Journey Header */}
            <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#E3D8C3] shadow-sm text-center space-y-4">
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#8C682D] bg-[#FAF3E6] px-4 py-1.5 rounded-full border border-[#E4D5B9]">
                PROGRESSION & MASTERY
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#183B2B]">
                Your Sutra Journey
              </h2>
              <p className="text-sm sm:text-base text-[#4A5D51] max-w-2xl mx-auto leading-relaxed">
                Knowledge isn't collected in a day. It is built one question, one shloka, and one classical discovery at a time.
              </p>
            </div>

            {/* Horizontal Milestone Path */}
            <div className="bg-[#0E2419] rounded-3xl p-8 sm:p-12 border border-[#C59A4E]/40 text-white space-y-8 shadow-xl">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#224A34] pb-6">
                <div>
                  <span className="text-xs text-[#E6C887] uppercase font-bold tracking-widest block">SEASON PROGRESS</span>
                  <h3 className="font-serif text-2xl font-bold text-white">3 / 5 Challenges Completed</h3>
                </div>
                <div className="px-4 py-1.5 rounded-full bg-[#1A4230] border border-[#C59A4E]/40 text-xs font-bold text-[#E6C887]">
                  LEVEL: SCHOLAR IN TRAINING
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="w-full bg-[#183B2B] h-3.5 rounded-full overflow-hidden border border-[#2B5E43] p-0.5">
                  <div className="bg-gradient-to-r from-[#C59A4E] to-[#E6C887] h-full rounded-full w-[60%] transition-all duration-1000" />
                </div>
                <div className="flex justify-between text-[11px] text-[#8FAFA0] font-mono">
                  <span>Week 40 Completed</span>
                  <span>Week 41 Completed</span>
                  <span className="text-emerald-400 font-bold">Week 42 Live Now</span>
                  <span>Week 43 Locked</span>
                  <span>Week 44 Locked</span>
                </div>
              </div>

              {/* Milestone Step Nodes */}
              <div className="grid grid-cols-5 gap-2 sm:gap-4 pt-4 text-center">
                {[
                  { num: '01', title: 'First Step', state: 'done' },
                  { num: '02', title: 'Rasayana', state: 'done' },
                  { num: '03', title: 'Abhrak', state: 'done' },
                  { num: '04', title: 'Samhita', state: 'current' },
                  { num: '05', title: 'Mastery', state: 'locked' }
                ].map((step) => (
                  <div key={step.num} className="space-y-2">
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full mx-auto flex items-center justify-center font-mono font-bold text-sm sm:text-base border-2 transition-all ${
                      step.state === 'done'
                        ? 'bg-emerald-600 border-emerald-400 text-white'
                        : step.state === 'current'
                        ? 'bg-[#C59A4E] border-[#E6C887] text-[#0E2419] shadow-lg animate-pulse'
                        : 'bg-[#183B2B]/60 border-[#2B5E43] text-gray-400'
                    }`}>
                      {step.state === 'done' ? '✓' : step.num}
                    </div>
                    <span className="text-[10px] sm:text-xs text-[#C7DFD3] block font-medium">
                      {step.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Knowledge Streak & Badges Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Streak Card */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E3D8C3] shadow-sm space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center">
                    <Flame className="w-6 h-6 fill-amber-500 stroke-amber-600" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-bold text-[#183B2B]">
                      Keep Your Sutra Streak Alive
                    </h3>
                    <p className="text-xs text-[#6B7E72]">
                      Complete every Sunday to unlock the Annual Acharya Badge.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#DFCFA8] flex items-center justify-between">
                  <div className="text-center">
                    <span className="text-2xl sm:text-3xl font-serif font-bold text-[#183B2B] block">3</span>
                    <span className="text-[10px] uppercase font-bold text-[#8C682D]">WEEK STREAK</span>
                  </div>

                  {/* 7-Day Week Indicator */}
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, dIdx) => (
                      <div 
                        key={dIdx}
                        className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                          dIdx === 0 
                            ? 'bg-emerald-600 text-white ring-2 ring-emerald-400 font-extrabold' 
                            : 'bg-[#EFE8DA] text-[#6B7E72]'
                        }`}
                      >
                        {day}
                      </div>
                    ))}
                  </div>
                </div>

                <p className="text-xs text-[#4A5D51] italic text-center">
                  "Consistency in Swadhyaya (self-study) is the prime pillar of Ayurvedic insight."
                </p>
              </div>

              {/* Earned Badges Card */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E3D8C3] shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-xl font-bold text-[#183B2B]">
                    Earned Badges & Honors
                  </h3>
                  <span className="text-xs font-bold text-[#8C682D]">4 Badges</span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {[
                    { icon: '🌿', title: 'First Step', desc: 'Completed 1st Challenge', unlocked: true },
                    { icon: '🏆', title: '3 Challenges', desc: 'Active Sunday Scholar', unlocked: true },
                    { icon: '📜', title: 'Sutra Scholar', desc: 'Scored 80%+ Twice', unlocked: true },
                    { icon: '✨', title: 'Ayurveda Explorer', desc: 'All 5 Samhita Pillars', unlocked: false }
                  ].map((b, bIdx) => (
                    <div 
                      key={bIdx}
                      className={`p-3.5 rounded-2xl border text-left transition-all ${
                        b.unlocked 
                          ? 'bg-[#FAF7F2] border-[#DFCFA8]' 
                          : 'bg-gray-50 border-gray-200 opacity-50'
                      }`}
                    >
                      <span className="text-2xl block mb-1">{b.icon}</span>
                      <h4 className="text-xs font-bold text-[#183B2B]">{b.title}</h4>
                      <p className="text-[10px] text-[#6B7E72]">{b.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        )}

        {/* ==================================================================== */}
        {/* TAB 3: THE SUTRA LIBRARY — CLASSICAL AYURVEDA KNOWLEDGE */}
        {/* ==================================================================== */}
        {activeTab === 'library' && (
          <div className="space-y-8 animate-fadeIn">
            
            {/* Library Header */}
            <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#E3D8C3] shadow-sm text-center space-y-3">
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#8C682D] bg-[#FAF3E6] px-4 py-1.5 rounded-full border border-[#E4D5B9]">
                THE SUTRA LIBRARY
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#183B2B]">
                Explore. Discover. Understand.
              </h2>
              <p className="text-sm sm:text-base text-[#4A5D51] max-w-2xl mx-auto leading-relaxed">
                Deepen your understanding with structured classical modules crafted from the foundational treatises of Ayurveda.
              </p>
            </div>

            {/* Library Topics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {LIBRARY_TOPICS.map((topic) => (
                <div 
                  key={topic.id}
                  className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E3D8C3] hover:border-[#8C682D] transition-all shadow-sm flex flex-col justify-between space-y-4 group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-3xl p-3 rounded-2xl bg-[#FAF7F2] border border-[#DFCFA8] inline-block">
                        {topic.icon}
                      </span>
                      <span className="text-[10px] uppercase font-bold tracking-wider text-[#8C682D] bg-[#FAF3E6] px-3 py-1 rounded-full border border-[#E4D5B9]">
                        {topic.tag}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#183B2B] group-hover:text-[#8C682D] transition-colors">
                        {topic.title}
                      </h3>
                      <p className="text-xs font-semibold text-[#8C682D]">{topic.subtitle}</p>
                    </div>

                    <p className="text-xs sm:text-sm text-[#4A5D51] leading-relaxed">
                      {topic.desc}
                    </p>
                  </div>

                  <button
                    onClick={() => setActiveLibraryModal(topic)}
                    className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-2xl bg-[#FAF7F2] hover:bg-[#183B2B] text-[#183B2B] hover:text-white font-bold text-xs uppercase tracking-wider border border-[#DFCFA8] hover:border-[#183B2B] transition-all"
                  >
                    <span>EXPLORE TOPIC</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            {/* Did You Know? Spotlight Insight */}
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#183B2B] to-[#0E2419] text-[#FAF7F2] border border-[#C59A4E]/40 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#E6C887]">
                  <Sparkles className="w-4 h-4" />
                  <span>SUTRA INSIGHT • DID YOU KNOW?</span>
                </div>
                <h4 className="font-serif text-xl sm:text-2xl font-bold text-white">
                  "Haritaki is revered as the Mother of all Herbs"
                </h4>
                <p className="text-xs sm:text-sm text-[#B4D0C2] max-w-2xl leading-relaxed">
                  Classical texts state that just as a mother never harms her child, Haritaki consumed with season-specific Anupana (Ritu Haritaki) purifies all seven Dhatus without causing dehydration or depletion.
                </p>
              </div>

              <button
                onClick={() => {
                  setActiveTab('quiz');
                  const el = document.getElementById('sutra-main-content');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#C59A4E] hover:bg-[#D4AF67] text-[#0E2419] font-bold text-xs shrink-0 shadow-lg transition-all uppercase tracking-wider"
              >
                <span>TEST YOUR KNOWLEDGE</span>
                <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
              </button>
            </div>

          </div>
        )}

        {/* Modal for Library Topic Reading View */}
        {activeLibraryModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
            <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 border border-[#C59A4E] shadow-2xl space-y-6 relative max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between border-b border-[#E3D8C3] pb-4">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{activeLibraryModal.icon}</span>
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-[#183B2B]">{activeLibraryModal.title}</h3>
                    <p className="text-xs text-[#8C682D]">{activeLibraryModal.subtitle}</p>
                  </div>
                </div>
                <button
                  onClick={() => setActiveLibraryModal(null)}
                  className="w-8 h-8 rounded-full bg-[#FAF7F2] text-[#183B2B] font-bold flex items-center justify-center hover:bg-[#EFE8DA]"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4 text-sm text-[#2D3D34] leading-relaxed">
                <p className="font-medium text-[#183B2B] text-base">{activeLibraryModal.desc}</p>
                <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#DFCFA8] italic font-serif text-[#183B2B]">
                  {activeLibraryModal.content}
                </div>
                <p className="text-xs text-[#6B7E72]">
                  This classical summary is compiled by the Veda Finder Academic Council from primary Samhita sources for educational study.
                </p>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => setActiveLibraryModal(null)}
                  className="px-6 py-2.5 rounded-full bg-[#183B2B] text-white font-bold text-xs uppercase tracking-wider"
                >
                  Close Topic
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ==================================================================== */}
        {/* TAB 4: HALL OF FAME — CELEBRATING CHAMPIONS */}
        {/* ==================================================================== */}
        {activeTab === 'winners' && (
          <div className="space-y-8 animate-fadeIn">
            
            {/* Header */}
            <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#E3D8C3] shadow-sm text-center space-y-3">
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#8C682D] bg-[#FAF3E6] px-4 py-1.5 rounded-full border border-[#E4D5B9]">
                SUNDAY CHAMPIONS
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#183B2B]">
                ✦ Sutra Hall of Fame
              </h2>
              <p className="text-sm sm:text-base text-[#4A5D51] max-w-2xl mx-auto leading-relaxed">
                Honoring the top scholars, doctors, and students who demonstrated exceptional mastery of classical Ayurvedic principles.
              </p>
            </div>

            {/* Top 3 Champions Podium Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {HALL_OF_FAME.map((winner) => (
                <div
                  key={winner.rank}
                  className={`rounded-3xl p-6 sm:p-8 border transition-all duration-300 shadow-md relative overflow-hidden flex flex-col justify-between space-y-6 ${
                    winner.rank === 1
                      ? 'bg-gradient-to-b from-[#122E21] to-[#0A1A12] text-white border-[#C59A4E] ring-2 ring-[#C59A4E]/40'
                      : 'bg-white border-[#E3D8C3] text-[#2D3D34]'
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold tracking-wider ${
                        winner.rank === 1
                          ? 'bg-[#C59A4E] text-[#0E2419]'
                          : 'bg-[#FAF3E6] text-[#8C682D] border border-[#E4D5B9]'
                      }`}>
                        {winner.badge}
                      </span>
                      <span className={`text-xs font-mono font-bold ${winner.rank === 1 ? 'text-[#E6C887]' : 'text-[#8C682D]'}`}>
                        ⚡ {winner.time}
                      </span>
                    </div>

                    <div>
                      <h3 className={`font-serif text-xl sm:text-2xl font-bold ${winner.rank === 1 ? 'text-white' : 'text-[#183B2B]'}`}>
                        {winner.name}
                      </h3>
                      <p className={`text-xs mt-1 ${winner.rank === 1 ? 'text-[#B4D0C2]' : 'text-[#6B7E72]'}`}>
                        {winner.city}
                      </p>
                    </div>

                    <div className={`p-3.5 rounded-2xl text-xs space-y-1 ${
                      winner.rank === 1
                        ? 'bg-[#09150F] border border-[#C59A4E]/30 text-[#FAF7F2]'
                        : 'bg-[#FAF7F2] border border-[#DFCFA8] text-[#183B2B]'
                    }`}>
                      <span className="text-[10px] uppercase font-bold text-[#8C682D] block">REWARD AWARDED</span>
                      <p className="font-semibold">{winner.prize}</p>
                    </div>
                  </div>

                  <div className={`pt-4 border-t text-xs font-bold flex items-center justify-between ${
                    winner.rank === 1 ? 'border-[#224A34] text-[#E6C887]' : 'border-[#E3D8C3] text-[#183B2B]'
                  }`}>
                    <span>PERFECT SCORE</span>
                    <span>{winner.score}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Previous Champions History */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E3D8C3] shadow-sm space-y-4">
              <h3 className="font-serif text-xl font-bold text-[#183B2B]">
                Previous Sunday Champions Archive
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {['Week 41: Dr. Ananya Sen (IMS BHU)', 'Week 40: Dr. Harish Joshi (NIA)', 'Week 39: Vaidya M. Pillai (Kerala)', 'Week 38: Dr. K. Deshmukh (Pune)'].map((champ, idx) => (
                  <span key={idx} className="px-4 py-2 rounded-full bg-[#FAF7F2] border border-[#DFCFA8] text-xs font-medium text-[#183B2B]">
                    🏆 {champ}
                  </span>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* ==================================================================== */}
        {/* TAB 5: REWARD VAULT — PRODUCTS & PRIZES */}
        {/* ==================================================================== */}
        {activeTab === 'rewards' && (
          <div className="space-y-8 animate-fadeIn">
            
            {/* Vault Header */}
            <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#E3D8C3] shadow-sm text-center space-y-3">
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#8C682D] bg-[#FAF3E6] px-4 py-1.5 rounded-full border border-[#E4D5B9]">
                KNOWLEDGE UNLOCKS REWARDS
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#183B2B]">
                🏆 The Sutra Reward Vault
              </h2>
              <p className="text-sm sm:text-base text-[#4A5D51] max-w-2xl mx-auto leading-relaxed">
                Your knowledge can unlock more than answers. Every participant earns verifiable credentials, coupons, or free botanical specimens.
              </p>
            </div>

            {/* Reward Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Reward 1: Free Product */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#C59A4E]/60 shadow-lg space-y-4 relative overflow-hidden">
                <div className="w-12 h-12 rounded-2xl bg-[#FAF3E6] text-[#8C682D] flex items-center justify-center text-2xl">
                  🎁
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-800 bg-emerald-100 px-3 py-0.5 rounded-full">
                    80%+ SCORE REWARD
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#183B2B] pt-2">
                    Free Ayurvedic Product Gift
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-[#4A5D51] leading-relaxed">
                  Participants scoring 80% or higher unlock 100% free authentic remedies (like Sahasraputi Abhrak Bhasma, Nar Ojas, or Organic Single Herbs) dispatched to their address.
                </p>
              </div>

              {/* Reward 2: Store Discount Coupons */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E3D8C3] shadow-sm space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center text-2xl">
                  🎟️
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#8C682D] bg-[#FAF3E6] px-3 py-0.5 rounded-full">
                    ALL PARTICIPANTS
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#183B2B] pt-2">
                    Guaranteed Store Coupons
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-[#4A5D51] leading-relaxed">
                  Every participant receives an instant 10% to 20% coupon code (e.g. <code>SUTRA20</code>) valid across the entire Veda Finder pure apothecary collection.
                </p>
              </div>

              {/* Reward 3: Verifiable Certificates */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E3D8C3] shadow-sm space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center text-2xl">
                  📜
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#8C682D] bg-[#FAF3E6] px-3 py-0.5 rounded-full">
                    ACADEMIC HONORS
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#183B2B] pt-2">
                    Certificates of Completion
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-[#4A5D51] leading-relaxed">
                  Download verifiable digital certificates with unique token IDs signed by the Veda Finder Academic Council to showcase on CVs and LinkedIn.
                </p>
              </div>

            </div>

          </div>
        )}

        {/* ==================================================================== */}
        {/* TAB 6: THE SUTRA ARCHIVE — SEARCHABLE PAST QUESTIONS */}
        {/* ==================================================================== */}
        {activeTab === 'archives' && (
          <div className="space-y-8 animate-fadeIn">
            
            {/* Archive Header */}
            <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#E3D8C3] shadow-sm text-center space-y-4">
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#8C682D] bg-[#FAF3E6] px-4 py-1.5 rounded-full border border-[#E4D5B9]">
                KNOWLEDGE REPOSITORY
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#183B2B]">
                The Sutra Archive
              </h2>
              <p className="text-sm sm:text-base text-[#4A5D51] max-w-2xl mx-auto leading-relaxed">
                Explore classical questions, authentic shlokas, and explanatory breakdowns from previous Sunday challenges.
              </p>

              {/* Category Filter Pills */}
              <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                {['All', 'Samhita', 'Dravyaguna', 'Rasashastra'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setArchiveFilter(cat)}
                    className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                      archiveFilter === cat
                        ? 'bg-[#183B2B] text-white shadow-sm'
                        : 'bg-[#FAF7F2] text-[#4A5D51] hover:text-[#183B2B] border border-[#DFCFA8]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Archive Cards */}
            <div className="space-y-6">
              {filteredArchives.map((archive) => (
                <div key={archive.week} className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E3D8C3] shadow-sm space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E3D8C3] pb-4">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[#8C682D] bg-[#FAF3E6] px-3 py-1 rounded-full border border-[#E4D5B9]">
                        WEEK {archive.week} CHALLENGE
                      </span>
                      <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#183B2B] mt-2">
                        {archive.title}
                      </h3>
                    </div>
                    <div className="text-xs text-[#6B7E72] sm:text-right">
                      <span>{archive.date}</span>
                      <span className="block font-bold text-emerald-800">{archive.participants} Participants</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {archive.questions.map((item, qIdx) => (
                      <div key={qIdx} className="p-4 sm:p-5 rounded-2xl bg-[#FAF7F2] border border-[#DFCFA8] space-y-2">
                        <h4 className="font-serif text-sm sm:text-base font-bold text-[#183B2B]">
                          Q{qIdx + 1}: {item.q}
                        </h4>
                        <p className="text-xs sm:text-sm text-emerald-900 font-medium">
                          🎯 <strong>Classical Answer:</strong> {item.ans}
                        </p>
                        {item.shloka && (
                          <div className="pt-1 text-xs text-[#8C682D] font-serif italic border-t border-[#DFCFA8]/60">
                            {item.shloka}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* ==================================================================== */}
        {/* TAB 7: CHALLENGE CERTIFICATE GENERATOR & PREVIEW */}
        {/* ==================================================================== */}
        {activeTab === 'certificate' && (
          <div className="space-y-8 animate-fadeIn">
            
            {/* Header */}
            <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#E3D8C3] shadow-sm text-center space-y-3">
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#8C682D] bg-[#FAF3E6] px-4 py-1.5 rounded-full border border-[#E4D5B9]">
                ACADEMIC CREDENTIAL
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#183B2B]">
                Challenge Certificate of Completion
              </h2>
              <p className="text-sm sm:text-base text-[#4A5D51] max-w-2xl mx-auto leading-relaxed">
                Preview your official, verifiable certificate awarded for dedication to classical Ayurvedic knowledge.
              </p>
            </div>

            {/* Certificate Preview Card */}
            <div className="max-w-3xl mx-auto bg-gradient-to-br from-[#FFFDF9] via-[#FAF6EE] to-[#F5EEDB] p-8 sm:p-12 rounded-3xl border-4 border-[#C59A4E] shadow-2xl space-y-8 text-center relative overflow-hidden">
              
              {/* Corner Ornaments */}
              <div className="absolute top-2 left-2 w-12 h-12 border-t-2 border-l-2 border-[#8C682D] pointer-events-none" />
              <div className="absolute top-2 right-2 w-12 h-12 border-t-2 border-r-2 border-[#8C682D] pointer-events-none" />
              <div className="absolute bottom-2 left-2 w-12 h-12 border-b-2 border-l-2 border-[#8C682D] pointer-events-none" />
              <div className="absolute bottom-2 right-2 w-12 h-12 border-b-2 border-r-2 border-[#8C682D] pointer-events-none" />

              <div className="space-y-2">
                <img 
                  src={sutraLogo} 
                  alt="The Sutra" 
                  className="w-20 h-20 mx-auto rounded-full shadow-md border border-[#C59A4E]"
                />
                <span className="text-xs uppercase tracking-widest font-bold text-[#8C682D] block">
                  VEDA FINDER ACADEMIC COUNCIL
                </span>
                <h3 className="font-serif text-3xl sm:text-4xl font-bold text-[#183B2B]">
                  Certificate of Ayurvedic Scholarship
                </h3>
                <p className="text-xs text-[#6B7E72] uppercase tracking-wider font-semibold">
                  THIS IS PROUDLY PRESENTED TO
                </p>
              </div>

              <div className="border-b-2 border-[#C59A4E] max-w-md mx-auto py-2">
                <span className="font-serif text-2xl sm:text-3xl font-bold text-[#183B2B] italic">
                  {registration.name.trim() || 'Dr. Vaibhav Shastri'}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-[#4A5D51] max-w-lg mx-auto leading-relaxed">
                for demonstrating commendable dedication and classical proficiency in <strong>THE SUTRA — The Ayurveda Knowledge Challenge (Week {currentQuiz.week || 42})</strong>.
              </p>

              <div className="pt-4 flex items-center justify-between border-t border-[#DFCFA8] max-w-lg mx-auto text-left text-xs text-[#6B7E72]">
                <div>
                  <span className="block font-bold text-[#183B2B]">Token ID: VS-2026-8842</span>
                  <span>Date: Sunday, 2026</span>
                </div>
                <div className="text-right">
                  <span className="font-serif font-bold text-[#183B2B] block">Veda Finder Council</span>
                  <span className="text-[10px]">Ayurveda Foundation</span>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* ==================================================================== */}
        {/* 4. GRAND FINAL CALL-TO-ACTION BANNER */}
        {/* ==================================================================== */}
        <div className="rounded-3xl bg-gradient-to-r from-[#0B1E15] via-[#122E21] to-[#0B1E15] text-[#FAF7F2] border-2 border-[#C59A4E]/50 p-8 sm:p-12 lg:p-16 shadow-2xl relative overflow-hidden text-center space-y-6">
          <div className="max-w-3xl mx-auto space-y-4 relative z-10">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#E6C887] bg-[#1A4230] px-4 py-1.5 rounded-full border border-[#C59A4E]/40">
              THE JOURNEY CONTINUES
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white leading-tight">
              One Question. One Discovery. One Step Deeper Into Ayurveda.
            </h2>
            <p className="text-sm sm:text-base text-[#C7DFD3] max-w-xl mx-auto">
              Are you ready for the next SUTRA? Join hundreds of fellow Vaidyas, students, and seekers every Sunday.
            </p>
            <div className="pt-4">
              <button
                onClick={scrollToQuiz}
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-[#C59A4E] to-[#E6C887] text-[#0E2419] font-bold text-base shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all group"
              >
                <span>JOIN THE NEXT CHALLENGE</span>
                <ArrowRight className="w-5 h-5 stroke-[2.5] group-hover:translate-x-1.5 transition-transform" />
              </button>
            </div>
            <p className="text-xs text-[#8FAFA0] pt-2">
              Every Sunday • 10:00 AM to 10:00 PM IST • Veda Finder
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
