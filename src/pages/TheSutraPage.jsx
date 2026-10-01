import React, { useState } from 'react';
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
  Check
} from 'lucide-react';
import { VedaFinderLogo } from '../components/VedaLogoBrand';

// Sample Live Weekly Quiz Data (Week 42)
const CURRENT_QUIZ = {
  week: 42,
  title: 'Rasashastra, Dravyaguna & Classical Chikitsa Mastery',
  sanskritTheme: 'रसशास्त्रं द्रव्यविवेकश्च',
  duration: '15 Mins',
  totalQuestions: 5,
  liveUntil: 'Sunday 10:00 PM IST',
  questions: [
    {
      id: 'q1',
      subject: 'Charaka Samhita — Sutrasthana',
      question: 'According to Acharya Charaka, which of the following is considered the supreme Rasayana among all botanical substances?',
      options: [
        { key: 'A', text: 'Amalaki (Phyllanthus emblica)' },
        { key: 'B', text: 'Haritaki (Terminalia chebula)' },
        { key: 'C', text: 'Guduchi (Tinospora cordifolia)' },
        { key: 'D', text: 'Ashwagandha (Withania somnifera)' }
      ],
      correct: 'B',
      explanation: 'In Charaka Samhita Chikitsasthana 1/1, Haritaki is hailed as "Pathya" and revered like a mother (माता इव हितकारिणी) for having 5 Rasas (excluding Lavana) and Tridoshahara Rasayana potency.'
    },
    {
      id: 'q2',
      subject: 'Rasashastra — Bhasma Pariksha',
      question: 'Which classical test determines that a Bhasma has attained nano-particle fineness capable of floating on water surface?',
      options: [
        { key: 'A', text: 'Rekhapurnatwa (रेखापूर्णत्व)' },
        { key: 'B', text: 'Varitaratwa (वारितरत्व)' },
        { key: 'C', text: 'Apunarbhava (अपुनर्भव)' },
        { key: 'D', text: 'Niruttha (निरुत्थ)' }
      ],
      correct: 'B',
      explanation: 'Varitaratwa is the test where incinerated micro-fine Bhasma floats without sinking on still water due to reduced specific gravity and surface tension.'
    },
    {
      id: 'q3',
      subject: 'Dravyaguna — Virya & Vipaka',
      question: 'What is the specific Vipaka (post-digestive effect) of Amalaki, despite its predominantly Amla (sour) Rasa?',
      options: [
        { key: 'A', text: 'Amla Vipaka (अम्ल विपाक)' },
        { key: 'B', text: 'Katu Vipaka (कटु विपाक)' },
        { key: 'C', text: 'Madhura Vipaka (मधुर विपाक)' },
        { key: 'D', text: 'Lavana Vipaka (लवण विपाक)' }
      ],
      correct: 'C',
      explanation: 'Amalaki is an exception (Apavada) — though sour in taste, it undergoes Madhura Vipaka and Sheet Virya, making it supreme for Pitta cooling without increasing acidity.'
    },
    {
      id: 'q4',
      subject: 'Sushruta Samhita — Shalya Tantra',
      question: 'According to Acharya Sushruta, which Srotas is considered the seat of Ojas and Prana carrying vessels?',
      options: [
        { key: 'A', text: 'Hridaya (Heart)' },
        { key: 'B', text: 'Nabhi (Umbilicus)' },
        { key: 'C', text: 'Murdha (Head / Shira)' },
        { key: 'D', text: 'Basti (Urinary Bladder)' }
      ],
      correct: 'A',
      explanation: 'Hridaya is the Mahaphala and primary seat of Para Ojas (8 drops), Sadhaka Pitta, Avalambaka Kapha, and Pranavaha Srotas Moola.'
    },
    {
      id: 'q5',
      subject: 'Agni & Dosha Siddhanta',
      question: 'Which type of Agni is characterized by alternating between intense digestion (Tikshnagni) and sluggish digestion (Mandagni)?',
      options: [
        { key: 'A', text: 'Samagni (समाग्नि)' },
        { key: 'B', text: 'Vishamagni (विषमाग्नि)' },
        { key: 'C', text: 'Atyagni (अत्याग्नि / भस्मक)' },
        { key: 'D', text: 'Mandaagni (मन्दाग्नि)' }
      ],
      correct: 'B',
      explanation: 'Vishamagni is caused by Vata dosha vitiation, resulting in unpredictable digestive capability where food is sometimes digested properly and sometimes produces Ama and bloating.'
    }
  ]
};

// Past Archives Data
const PAST_ARCHIVES = [
  {
    week: 41,
    date: 'Sunday, 24 Sept 2026',
    title: 'Sahasraputi Abhrak & Herbo-Mineral Alchemy',
    topScore: '100%',
    participants: 1240,
    questions: [
      {
        q: 'How many Putas are given to prepare classical Sahasraputi Abhrak Bhasma?',
        ans: '1,000 Puta cycles in sealed Sharava Samputa with Gomutra & botanical Bhavana juices.'
      },
      {
        q: 'Which gemstone Pishti is recommended with Rose Water for severe Pitta Raktapitta disorders?',
        ans: 'Moti Pishti (Mukta Pishti), triturated with organic Shatapatri Gulab Jal.'
      }
    ]
  },
  {
    week: 40,
    date: 'Sunday, 17 Sept 2026',
    title: 'Triphala Rasayana, Ojas & Longevity Protocols',
    topScore: '100%',
    participants: 980,
    questions: [
      {
        q: 'In Charaka Samhita Rasayana Adhyaya, what is the prime Anupana for morning Haritaki intake in Sharad Ritu?',
        ans: 'Sharkara (Sugar candy / Mishri) in Sharad Ritu to cool residual Pitta.'
      },
      {
        q: 'Which Dhatu is the direct predecessor of Shukra Dhatu in the Dhatu Parinama chain?',
        ans: 'Majja Dhatu (Bone Marrow / Nerve tissue).'
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
    prize: 'Gold Medalist • ₹5,000 Hamper + Samhita Hardcover',
    badge: '🥇 Sunday Rank 1'
  },
  {
    rank: 2,
    name: 'Dr. Sneha Kulkarni, BAMS',
    score: '5/5 (100%)',
    time: '2m 48s',
    city: 'National Institute of Ayurveda (NIA), Jaipur',
    prize: 'Silver Medalist • ₹3,000 Veda Finder Hamper',
    badge: '🥈 Sunday Rank 2'
  },
  {
    rank: 3,
    name: 'Dr. Rohit Mukherjee, BAMS Scholar',
    score: '5/5 (100%)',
    time: '3m 10s',
    city: 'Institute of Medical Sciences, BHU Varanasi',
    prize: 'Bronze Medalist • ₹2,000 Wellness Voucher',
    badge: '🥉 Sunday Rank 3'
  }
];

export default function TheSutraPage({ onNavigate }) {
  const [activeTab, setActiveTab] = useState('quiz'); // 'quiz' | 'archives' | 'winners' | 'rewards'
  const [userAnswers, setUserAnswers] = useState({});
  const [registration, setRegistration] = useState({
    name: '',
    phone: '',
    role: 'BAMS Student',
    institution: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [scoreResult, setScoreResult] = useState(null);

  const handleSelectOption = (questionId, optionKey) => {
    if (isSubmitted) return;
    setUserAnswers(prev => ({
      ...prev,
      [questionId]: optionKey
    }));
  };

  const handleQuizSubmit = (e) => {
    e.preventDefault();

    if (!registration.name.trim() || !registration.phone.trim()) {
      alert('Please fill in your Name and WhatsApp Number to record your submission.');
      return;
    }

    // Evaluate score
    let correctCount = 0;
    CURRENT_QUIZ.questions.forEach(q => {
      if (userAnswers[q.id] === q.correct) {
        correctCount++;
      }
    });

    const total = CURRENT_QUIZ.questions.length;
    const percentage = Math.round((correctCount / total) * 100);
    const tokenId = 'SUTRA-W42-' + Math.floor(1000 + Math.random() * 9000);

    const result = {
      score: correctCount,
      total: total,
      percentage: percentage,
      tokenId: tokenId,
      name: registration.name.trim(),
      phone: registration.phone.trim(),
      role: registration.role,
      institution: registration.institution.trim() || 'Ayurveda Seeker'
    };

    setScoreResult(result);
    setIsSubmitted(true);
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  const handleSendToWhatsApp = () => {
    if (!scoreResult) return;

    const message = [
      `📜 *THE SUTRA — Knowledge Challenge Submission*`,
      `*Token ID:* ${scoreResult.tokenId}`,
      `*Week:* ${CURRENT_QUIZ.week} (${CURRENT_QUIZ.title})`,
      ``,
      `👤 *Participant Details:*`,
      `• *Name:* ${scoreResult.name}`,
      `• *WhatsApp:* ${scoreResult.phone}`,
      `• *Role:* ${scoreResult.role}`,
      `• *Institution/City:* ${scoreResult.institution}`,
      ``,
      `🏆 *Score Summary:*`,
      `• *Score:* ${scoreResult.score} / ${scoreResult.total} (${scoreResult.percentage}%)`,
      `• *Status:* ${scoreResult.percentage >= 80 ? '🌟 Qualified for Certificate & Rewards' : 'Completed with Reverence'}`,
      ``,
      `Please register my score for the Sunday Hall of Fame. Namaste! 🌿`
    ].join('\n');

    const url = `https://wa.me/919888335557?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const handleResetQuiz = () => {
    setUserAnswers({});
    setIsSubmitted(false);
    setScoreResult(null);
  };

  return (
    <div className="py-12 bg-[#FAF7F2] min-h-screen selection:bg-[#183B2B] selection:text-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Page Hero Banner */}
        <div className="rounded-3xl bg-[#0E2419] text-[#FAF7F2] border border-[#C59A4E]/40 p-8 sm:p-12 lg:p-14 shadow-2xl relative overflow-hidden text-center space-y-5">
          <div className="absolute inset-0 opacity-15 pointer-events-none">
            <div className="absolute top-0 right-10 w-80 h-80 bg-[#C59A4E] rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#1F543B] rounded-full blur-3xl" />
          </div>

          <div className="relative z-10 max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C59A4E]/15 border border-[#C59A4E]/40 text-[#E6C887] text-xs font-bold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5 text-[#E6C887]" />
              <span>VEDA FINDER PRESENTS</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-white">
              THE SUTRA
            </h1>

            <p className="font-serif text-xl sm:text-2xl text-[#E6C887] font-medium">
              The Ayurveda Knowledge Challenge
            </p>

            <div className="pt-1">
              <span className="inline-block font-serif text-base sm:text-lg text-[#F4E6CB] italic font-semibold px-4 py-1 rounded-full bg-[#1A4230] border border-[#C59A4E]/30">
                ज्ञान की खोज। आयुर्वेद के साथ।
              </span>
            </div>

            <p className="text-xs sm:text-sm text-[#B4D0C2] max-w-2xl mx-auto leading-relaxed">
              A Weekly Knowledge Challenge for Ayurveda Students, Doctors & Enthusiasts. Deepen your classical understanding, win honors, certificates, and authentic botanical rewards every Sunday.
            </p>

            {/* Live Status Pill */}
            <div className="pt-3 flex items-center justify-center gap-3 text-xs flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-900/80 text-emerald-300 border border-emerald-500/40 font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>EVERY SUNDAY • LIVE NOW</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#183B2B] text-[#DFCFA8] border border-[#C59A4E]/30 font-medium">
                <Clock className="w-3.5 h-3.5 text-[#C59A4E]" />
                <span>Submission Window: 10:00 AM – 10:00 PM IST</span>
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center justify-center gap-2 p-1.5 bg-[#EFE8DA] rounded-full max-w-2xl mx-auto border border-[#D5C9B3] shadow-inner text-xs sm:text-sm font-semibold overflow-x-auto">
          <button
            onClick={() => setActiveTab('quiz')}
            className={`px-5 py-2.5 rounded-full transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'quiz' 
                ? 'bg-[#183B2B] text-white shadow-md' 
                : 'text-[#4A5D51] hover:text-[#183B2B]'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Weekly Quiz (MCQ)</span>
          </button>

          <button
            onClick={() => setActiveTab('winners')}
            className={`px-5 py-2.5 rounded-full transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'winners' 
                ? 'bg-[#183B2B] text-white shadow-md' 
                : 'text-[#4A5D51] hover:text-[#183B2B]'
            }`}
          >
            <Trophy className="w-4 h-4" />
            <span>Hall of Fame</span>
          </button>

          <button
            onClick={() => setActiveTab('archives')}
            className={`px-5 py-2.5 rounded-full transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'archives' 
                ? 'bg-[#183B2B] text-white shadow-md' 
                : 'text-[#4A5D51] hover:text-[#183B2B]'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>Previous Questions</span>
          </button>

          <button
            onClick={() => setActiveTab('rewards')}
            className={`px-5 py-2.5 rounded-full transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'rewards' 
                ? 'bg-[#183B2B] text-white shadow-md' 
                : 'text-[#4A5D51] hover:text-[#183B2B]'
            }`}
          >
            <Gift className="w-4 h-4" />
            <span>Rewards & Badges</span>
          </button>
        </div>

        {/* TAB 1: WEEKLY AYURVEDA QUIZ */}
        {activeTab === 'quiz' && (
          <div className="space-y-8 animate-fadeIn">
            
            {/* Quiz Info Header */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E3D8C3] shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#8C682D] bg-[#FAF3E6] px-3 py-1 rounded-full border border-[#E4D5B9]">
                  WEEK {CURRENT_QUIZ.week} CHALLENGE
                </span>
                <h2 className="font-serif font-bold text-2xl sm:text-3xl text-[#183B2B] pt-1">
                  {CURRENT_QUIZ.title}
                </h2>
                <p className="text-xs text-[#6B7E72]">
                  Theme: <strong className="font-serif text-[#8C682D]">{CURRENT_QUIZ.sanskritTheme}</strong> • 5 High-Yield Classical Samhita Questions
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <div className="p-3 rounded-2xl bg-[#FAF7F2] border border-[#DFCFA8] text-center">
                  <span className="text-[10px] uppercase font-bold text-[#8C682D] block">QUESTIONS</span>
                  <span className="text-base font-bold text-[#183B2B]">{CURRENT_QUIZ.totalQuestions} MCQs</span>
                </div>
                <div className="p-3 rounded-2xl bg-[#FAF7F2] border border-[#DFCFA8] text-center">
                  <span className="text-[10px] uppercase font-bold text-[#8C682D] block">PASS CRITERIA</span>
                  <span className="text-base font-bold text-emerald-800">80%+ (4/5)</span>
                </div>
              </div>
            </div>

            {/* Scorecard Modal / Banner if Submitted */}
            {isSubmitted && scoreResult && (
              <div className="p-8 rounded-3xl bg-gradient-to-br from-[#122E21] to-[#0A1A12] text-white border-2 border-[#C59A4E] shadow-2xl space-y-6 text-center animate-scaleUp">
                <div className="w-16 h-16 rounded-full bg-[#C59A4E] text-[#0E2419] flex items-center justify-center mx-auto shadow-lg">
                  <Award className="w-9 h-9 stroke-[2.2]" />
                </div>

                <div className="space-y-2">
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#C59A4E]/20 text-[#E6C887] border border-[#C59A4E]/40">
                    {scoreResult.tokenId}
                  </span>
                  <h3 className="font-serif font-bold text-3xl text-white">
                    {scoreResult.score >= 4 ? '🎉 Excellent Vedic Knowledge!' : 'Thank you for Participating!'}
                  </h3>
                  <p className="text-sm text-[#B4CDC1] max-w-md mx-auto">
                    {scoreResult.name}, you scored <strong>{scoreResult.score} out of {scoreResult.total}</strong> ({scoreResult.percentage}%).
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-lg mx-auto text-left text-xs">
                  <div className="p-3 rounded-xl bg-white/10 border border-white/10">
                    <span className="text-[10px] text-[#A6C4B4] block">Score</span>
                    <strong className="text-base text-white">{scoreResult.score} / {scoreResult.total}</strong>
                  </div>
                  <div className="p-3 rounded-xl bg-white/10 border border-white/10">
                    <span className="text-[10px] text-[#A6C4B4] block">Status</span>
                    <strong className={`text-base ${scoreResult.score >= 4 ? 'text-emerald-400' : 'text-amber-300'}`}>
                      {scoreResult.score >= 4 ? 'Honor Pass' : 'Completed'}
                    </strong>
                  </div>
                  <div className="p-3 rounded-xl bg-white/10 border border-white/10">
                    <span className="text-[10px] text-[#A6C4B4] block">Certificate</span>
                    <strong className="text-base text-[#E6C887]">
                      {scoreResult.score >= 4 ? 'Verified Gold' : 'Participation'}
                    </strong>
                  </div>
                </div>

                {/* WhatsApp Submission Button */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button
                    onClick={handleSendToWhatsApp}
                    className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] text-black font-bold text-sm shadow-xl flex items-center justify-center gap-2 transition-all transform hover:scale-105"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit & Claim via WhatsApp (+91 98883 35557)</span>
                  </button>

                  <button
                    onClick={handleResetQuiz}
                    className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-xs transition-all flex items-center justify-center gap-1.5"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Retake Challenge</span>
                  </button>
                </div>
              </div>
            )}

            {/* Questions List */}
            <div className="space-y-6">
              {CURRENT_QUIZ.questions.map((q, idx) => {
                const selectedKey = userAnswers[q.id];
                const isCorrect = isSubmitted && selectedKey === q.correct;
                const isWrong = isSubmitted && selectedKey && selectedKey !== q.correct;

                return (
                  <div 
                    key={q.id}
                    className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E3D8C3] shadow-sm space-y-4 hover:border-[#8C682D]/60 transition-all"
                  >
                    <div className="flex items-center justify-between gap-2 border-b border-[#F2ECE1] pb-3">
                      <div className="flex items-center gap-2">
                        <span className="w-7 h-7 rounded-full bg-[#183B2B] text-white flex items-center justify-center text-xs font-bold font-serif shadow-sm">
                          {idx + 1}
                        </span>
                        <span className="text-xs font-bold text-[#8C682D] uppercase tracking-wider">
                          {q.subject}
                        </span>
                      </div>
                      <span className="text-[11px] text-[#788C80]">1 Mark</span>
                    </div>

                    <h3 className="font-serif font-bold text-base sm:text-lg text-[#183B2B] leading-snug">
                      {q.question}
                    </h3>

                    {/* Options */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      {q.options.map((opt) => {
                        const isSelected = selectedKey === opt.key;
                        const isThisCorrect = isSubmitted && opt.key === q.correct;

                        return (
                          <button
                            key={opt.key}
                            type="button"
                            onClick={() => handleSelectOption(q.id, opt.key)}
                            disabled={isSubmitted}
                            className={`p-3.5 rounded-2xl border text-left text-xs sm:text-sm font-medium transition-all flex items-start gap-3 ${
                              isThisCorrect
                                ? 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold ring-2 ring-emerald-400'
                                : isWrong && isSelected
                                ? 'bg-red-50 border-red-400 text-red-900 line-through'
                                : isSelected
                                ? 'bg-[#FAF3E6] border-[#8C682D] text-[#183B2B] shadow-sm font-semibold'
                                : 'bg-[#FAF7F2] border-[#E2D5BE] text-[#3E5246] hover:bg-white hover:border-[#8C682D]'
                            }`}
                          >
                            <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                              isThisCorrect 
                                ? 'bg-emerald-600 text-white' 
                                : isSelected 
                                ? 'bg-[#183B2B] text-white' 
                                : 'bg-white border border-[#D5C9B3] text-[#718478]'
                            }`}>
                              {opt.key}
                            </span>
                            <span className="flex-1 mt-0.5">{opt.text}</span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Explanation Box (Revealed on submission) */}
                    {isSubmitted && (
                      <div className="p-4 rounded-2xl bg-[#F6F2E8] border border-[#DFCFA8] text-xs space-y-1 animate-fadeIn">
                        <span className="font-bold text-[#183B2B] flex items-center gap-1.5">
                          <BookOpen className="w-3.5 h-3.5 text-[#8C682D]" /> Samhita Reference & Explanation:
                        </span>
                        <p className="text-[#516458] leading-relaxed">
                          {q.explanation}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Participant Registration & Submit Box (only when not submitted) */}
            {!isSubmitted && (
              <form onSubmit={handleQuizSubmit} className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E3D8C3] shadow-lg space-y-6">
                <div className="space-y-1 border-b border-[#F0E8DA] pb-4">
                  <h3 className="font-serif font-bold text-xl sm:text-2xl text-[#183B2B]">
                    Participant Registration & Entry
                  </h3>
                  <p className="text-xs text-[#6E8075]">
                    Enter your credentials to record your score for the Sunday All-India Knowledge Challenge Leaderboard.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-[#183B2B] uppercase tracking-wider">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        placeholder="e.g. Dr. Rajesh Sharma"
                        value={registration.name}
                        onChange={(e) => setRegistration({...registration, name: e.target.value})}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#D5C9B3] text-xs sm:text-sm text-[#183B2B] focus:outline-none focus:border-[#183B2B]"
                      />
                      <User className="w-4 h-4 text-[#8C682D] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-[#183B2B] uppercase tracking-wider">
                      WhatsApp / Mobile Number <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        required
                        placeholder="e.g. +91 98883 35557"
                        value={registration.phone}
                        onChange={(e) => setRegistration({...registration, phone: e.target.value})}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#D5C9B3] text-xs sm:text-sm text-[#183B2B] focus:outline-none focus:border-[#183B2B]"
                      />
                      <Phone className="w-4 h-4 text-[#8C682D] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-[#183B2B] uppercase tracking-wider">
                      Participant Category
                    </label>
                    <div className="relative">
                      <select
                        value={registration.role}
                        onChange={(e) => setRegistration({...registration, role: e.target.value})}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#D5C9B3] text-xs sm:text-sm text-[#183B2B] focus:outline-none focus:border-[#183B2B]"
                      >
                        <option>BAMS Undergraduate Student</option>
                        <option>MD / MS Ayurveda Scholar</option>
                        <option>Ayurvedic Doctor / Practitioner</option>
                        <option>Ayurvedic Pharmacist / Researcher</option>
                        <option>Ayurveda Enthusiast & Seeker</option>
                      </select>
                      <GraduationCap className="w-4 h-4 text-[#8C682D] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-[#183B2B] uppercase tracking-wider">
                      College / Institution / City
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="e.g. AIIA New Delhi / Hisar, Haryana"
                        value={registration.institution}
                        onChange={(e) => setRegistration({...registration, institution: e.target.value})}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#D5C9B3] text-xs sm:text-sm text-[#183B2B] focus:outline-none focus:border-[#183B2B]"
                      />
                      <MapPin className="w-4 h-4 text-[#8C682D] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-4 rounded-full bg-[#183B2B] hover:bg-[#25553D] text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all"
                  >
                    <span>Submit The Sutra Challenge Answers</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}

          </div>
        )}

        {/* TAB 2: HALL OF FAME / WINNER ANNOUNCEMENT */}
        {activeTab === 'winners' && (
          <div className="space-y-8 animate-fadeIn">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-[#8C682D] bg-[#EAE0CB] px-3.5 py-1 rounded-full">
                SUNDAY LEADERBOARD
              </span>
              <h2 className="font-serif font-bold text-3xl text-[#183B2B]">
                The Sutra Hall of Fame
              </h2>
              <p className="text-xs sm:text-sm text-[#5C7063]">
                Honoring the brightest Ayurvedic scholars and practitioners from across India who achieved perfect accuracy in record time.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {HALL_OF_FAME.map((winner) => (
                <div 
                  key={winner.rank}
                  className={`rounded-3xl p-6 sm:p-8 border shadow-lg space-y-4 flex flex-col justify-between relative overflow-hidden ${
                    winner.rank === 1 
                      ? 'bg-gradient-to-b from-[#183B2B] to-[#0E2419] text-white border-[#C59A4E]' 
                      : 'bg-white text-[#183B2B] border-[#E3D8C3]'
                  }`}
                >
                  <div className="space-y-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold inline-block ${
                      winner.rank === 1 
                        ? 'bg-[#C59A4E] text-[#0E2419]' 
                        : 'bg-[#FAF3E6] text-[#8C682D] border border-[#DFCFA8]'
                    }`}>
                      {winner.badge}
                    </span>

                    <h3 className="font-serif font-bold text-xl leading-snug">
                      {winner.name}
                    </h3>

                    <p className={`text-xs ${winner.rank === 1 ? 'text-[#B4D0C1]' : 'text-[#6C7E73]'}`}>
                      {winner.city}
                    </p>

                    <div className="pt-2 border-t border-current/10 space-y-1 text-xs">
                      <div className="flex justify-between">
                        <span>Accuracy:</span>
                        <strong>{winner.score}</strong>
                      </div>
                      <div className="flex justify-between">
                        <span>Time Taken:</span>
                        <strong>{winner.time}</strong>
                      </div>
                    </div>
                  </div>

                  <div className={`p-3 rounded-2xl text-xs font-semibold ${
                    winner.rank === 1 
                      ? 'bg-white/10 text-[#E6C887]' 
                      : 'bg-[#FAF7F2] text-[#8C682D] border border-[#EAE0CB]'
                  }`}>
                    🎁 {winner.prize}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: PREVIOUS QUESTIONS & ARCHIVES */}
        {activeTab === 'archives' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-[#8C682D] bg-[#EAE0CB] px-3.5 py-1 rounded-full">
                KNOWLEDGE REPOSITORY
              </span>
              <h2 className="font-serif font-bold text-3xl text-[#183B2B]">
                Previous Sunday Sutra Questions
              </h2>
              <p className="text-xs sm:text-sm text-[#5C7063]">
                Review past questions, classical references, and verified Samhita answers for clinical revision.
              </p>
            </div>

            <div className="space-y-4 max-w-4xl mx-auto">
              {PAST_ARCHIVES.map((arch) => (
                <div key={arch.week} className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E3D8C3] shadow-sm space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#F0E8DA] pb-3">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-[#8C682D]">
                        Week {arch.week} • {arch.date}
                      </span>
                      <h3 className="font-serif font-bold text-xl text-[#183B2B]">
                        {arch.title}
                      </h3>
                    </div>
                    <span className="text-xs font-semibold text-[#5F7366] bg-[#FAF7F2] px-3 py-1 rounded-full border border-[#DFCFA8]">
                      👥 {arch.participants} Participants
                    </span>
                  </div>

                  <div className="space-y-3">
                    {arch.questions.map((item, qIdx) => (
                      <div key={qIdx} className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E8DFC9] space-y-1.5 text-xs sm:text-sm">
                        <p className="font-serif font-bold text-[#183B2B]">
                          Q{qIdx + 1}: {item.q}
                        </p>
                        <p className="text-[#526659] leading-relaxed">
                          <strong className="text-emerald-800 font-semibold">Answer:</strong> {item.ans}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: REWARDS & GUIDELINES */}
        {activeTab === 'rewards' && (
          <div className="space-y-8 animate-fadeIn">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-[#8C682D] bg-[#EAE0CB] px-3.5 py-1 rounded-full">
                EXCELLENCE RECOGNITION
              </span>
              <h2 className="font-serif font-bold text-3xl text-[#183B2B]">
                Rewards, Certificates & Honours
              </h2>
              <p className="text-xs sm:text-sm text-[#5C7063]">
                Empowering the next generation of Vaidyas and scholars with real accolades.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E3D8C3] shadow-md space-y-4 text-center">
                <div className="w-14 h-14 rounded-full bg-[#FAF3E6] border border-[#DFCFA8] flex items-center justify-center mx-auto text-[#8C682D]">
                  <Medal className="w-7 h-7" />
                </div>
                <h3 className="font-serif font-bold text-lg text-[#183B2B]">
                  Weekly Rank 1 Winner
                </h3>
                <p className="text-xs text-[#526659] leading-relaxed">
                  • ₹5,000 Veda Finder Classical Formulations Hamper<br/>
                  • Hardcover Classical Samhita Granth<br/>
                  • Gold Digital Certificate of Mastery
                </p>
              </div>

              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E3D8C3] shadow-md space-y-4 text-center">
                <div className="w-14 h-14 rounded-full bg-[#FAF3E6] border border-[#DFCFA8] flex items-center justify-center mx-auto text-[#8C682D]">
                  <Trophy className="w-7 h-7" />
                </div>
                <h3 className="font-serif font-bold text-lg text-[#183B2B]">
                  Ranks 2 & 3 Runners Up
                </h3>
                <p className="text-xs text-[#526659] leading-relaxed">
                  • ₹3,000 & ₹2,000 Formulation Gift Hampers<br/>
                  • Silver & Bronze Verified Certificates<br/>
                  • Exclusive Ayurvedic Wisdom Journal Access
                </p>
              </div>

              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E3D8C3] shadow-md space-y-4 text-center">
                <div className="w-14 h-14 rounded-full bg-[#FAF3E6] border border-[#DFCFA8] flex items-center justify-center mx-auto text-[#8C682D]">
                  <Award className="w-7 h-7" />
                </div>
                <h3 className="font-serif font-bold text-lg text-[#183B2B]">
                  All Scorers (80%+)
                </h3>
                <p className="text-xs text-[#526659] leading-relaxed">
                  • Official Certificate of Ayurvedic Knowledge<br/>
                  • Special 15% discount on all Veda Finder products<br/>
                  • Invitation to Veda Wisdom Masterclasses
                </p>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
