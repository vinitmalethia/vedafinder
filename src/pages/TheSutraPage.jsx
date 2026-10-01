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
  Check
} from 'lucide-react';
import { VedaFinderLogo } from '../components/VedaLogoBrand';
import { getStoredSutraQuiz } from '../data/sutraQuizData';

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

// Hall of Fame Winners with Free Product & Coupon Rewards
const HALL_OF_FAME = [
  {
    rank: 1,
    name: 'Dr. Vaibhav Shastri, MD (Ayu)',
    score: '5/5 (100%)',
    time: '2m 14s',
    city: 'All India Institute of Ayurveda, New Delhi',
    prize: '100% FREE Product Gift (Abhrak Bhasma 1000 Puti) + Gold Certificate',
    badge: '🥇 Sunday Rank 1'
  },
  {
    rank: 2,
    name: 'Dr. Sneha Kulkarni, BAMS',
    score: '5/5 (100%)',
    time: '2m 48s',
    city: 'National Institute of Ayurveda (NIA), Jaipur',
    prize: '100% FREE Product Gift (Nar Ojas Vitality) + Silver Certificate',
    badge: '🥈 Sunday Rank 2'
  },
  {
    rank: 3,
    name: 'Dr. Rohit Mukherjee, BAMS Scholar',
    score: '5/5 (100%)',
    time: '3m 10s',
    city: 'Institute of Medical Sciences, BHU Varanasi',
    prize: 'Exclusive 25% OFF Reward Coupon + Bronze Certificate',
    badge: '🥉 Sunday Rank 3'
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
  const [activeTab, setActiveTab] = useState('quiz'); // 'quiz' | 'archives' | 'winners' | 'rewards'
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
    window.scrollTo({ top: 380, behavior: 'smooth' });

    // Open WhatsApp directly with the forwarded questions and answers
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
        <div className="flex justify-center w-full px-2">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 p-1.5 bg-[#EFE8DA] rounded-full max-w-full border border-[#D5C9B3] shadow-inner text-xs sm:text-sm font-semibold overflow-x-auto no-scrollbar">
            <button
              onClick={() => setActiveTab('quiz')}
              className={`px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full transition-all flex items-center gap-1.5 sm:gap-2 whitespace-nowrap shrink-0 ${
                activeTab === 'quiz' 
                  ? 'bg-[#183B2B] text-white shadow-md' 
                  : 'text-[#4A5D51] hover:text-[#183B2B] hover:bg-[#E4DBCB]/60'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
              <span>Weekly Quiz (MCQ)</span>
            </button>

            <button
              onClick={() => setActiveTab('winners')}
              className={`px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full transition-all flex items-center gap-1.5 sm:gap-2 whitespace-nowrap shrink-0 ${
                activeTab === 'winners' 
                  ? 'bg-[#183B2B] text-white shadow-md' 
                  : 'text-[#4A5D51] hover:text-[#183B2B] hover:bg-[#E4DBCB]/60'
              }`}
            >
              <Trophy className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
              <span>Hall of Fame</span>
            </button>

            <button
              onClick={() => setActiveTab('archives')}
              className={`px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full transition-all flex items-center gap-1.5 sm:gap-2 whitespace-nowrap shrink-0 ${
                activeTab === 'archives' 
                  ? 'bg-[#183B2B] text-white shadow-md' 
                  : 'text-[#4A5D51] hover:text-[#183B2B] hover:bg-[#E4DBCB]/60'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
              <span>Previous Questions</span>
            </button>

            <button
              onClick={() => setActiveTab('rewards')}
              className={`px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full transition-all flex items-center gap-1.5 sm:gap-2 whitespace-nowrap shrink-0 ${
                activeTab === 'rewards' 
                  ? 'bg-[#183B2B] text-white shadow-md' 
                  : 'text-[#4A5D51] hover:text-[#183B2B] hover:bg-[#E4DBCB]/60'
              }`}
            >
              <Gift className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
              <span>Rewards & Badges</span>
            </button>
          </div>
        </div>

        {/* TAB 1: WEEKLY AYURVEDA QUIZ */}
        {activeTab === 'quiz' && (
          <div className="space-y-8 animate-fadeIn">
            
            {/* Quiz Info Header */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E3D8C3] shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#8C682D] bg-[#FAF3E6] px-3 py-1 rounded-full border border-[#E4D5B9]">
                  WEEK {currentQuiz.week || 42} CHALLENGE
                </span>
                <h2 className="font-serif font-bold text-2xl sm:text-3xl text-[#183B2B] pt-1">
                  {currentQuiz.title}
                </h2>
                <p className="text-xs text-[#6B7E72]">
                  Theme: <strong className="font-serif text-[#8C682D]">{currentQuiz.sanskritTheme}</strong> • {currentQuiz.questions?.length || 5} Classical Samhita Questions
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <div className="p-3 rounded-2xl bg-[#FAF7F2] border border-[#DFCFA8] text-center">
                  <span className="text-[10px] uppercase font-bold text-[#8C682D] block">QUESTIONS</span>
                  <span className="text-base font-bold text-[#183B2B]">{currentQuiz.questions?.length || 5} MCQs</span>
                </div>
                <div className="p-3 rounded-2xl bg-[#FAF7F2] border border-[#DFCFA8] text-center">
                  <span className="text-[10px] uppercase font-bold text-[#8C682D] block">PASS CRITERIA</span>
                  <span className="text-base font-bold text-emerald-800">80%+</span>
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
                    {scoreResult.score >= (currentQuiz.questions?.length || 5) * 0.8 ? '🎉 Excellent Vedic Knowledge!' : 'Thank you for Participating!'}
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
                    <strong className={`text-base ${scoreResult.percentage >= 80 ? 'text-emerald-400' : 'text-amber-300'}`}>
                      {scoreResult.percentage >= 80 ? 'Honor Pass (Winner)' : 'Completed'}
                    </strong>
                  </div>
                  <div className="p-3 rounded-xl bg-white/10 border border-white/10">
                    <span className="text-[10px] text-[#A6C4B4] block">Certificate</span>
                    <strong className="text-base text-[#E6C887]">
                      {scoreResult.percentage >= 80 ? 'Verified Gold' : 'Participation'}
                    </strong>
                  </div>
                </div>

                {/* Unlocked Reward Box */}
                <div className="p-4 rounded-2xl bg-[#FAF3E6]/10 border border-[#C59A4E]/50 max-w-lg mx-auto space-y-2 text-center">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-[#E6C887] block">
                    {scoreResult.isWinner ? '🎁 100% FREE AYURVEDIC PRODUCT UNLOCKED' : '🎟️ STORE REWARD COUPON UNLOCKED'}
                  </span>
                  {scoreResult.isWinner ? (
                    <div className="space-y-1">
                      <p className="font-serif font-bold text-lg text-white">
                        {scoreResult.randomProduct}
                      </p>
                      <p className="text-xs text-[#B2CEC0]">
                        You unlocked a complimentary product gift (or coupon <span className="font-mono text-[#E6C887] font-bold">{scoreResult.couponCode}</span>). Send your answers on WhatsApp to claim free delivery!
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-1">
                      <p className="font-mono font-bold text-lg text-[#E6C887]">
                        COUPON: {scoreResult.couponCode}
                      </p>
                      <p className="text-xs text-[#B2CEC0]">
                        Enjoy 10% instant discount on all authentic classical remedies in the Veda Finder store.
                      </p>
                    </div>
                  )}
                </div>

                {/* WhatsApp Submission Button */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button
                    onClick={handleSendToWhatsApp}
                    className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] text-black font-bold text-sm shadow-xl flex items-center justify-center gap-2 transition-all transform hover:scale-105"
                  >
                    <Send className="w-4 h-4" />
                    <span>Forward Answers to WhatsApp (+91 98883 35557)</span>
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
              {(currentQuiz.questions || []).map((q, idx) => {
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
                    <Send className="w-4 h-4 text-[#25D366]" />
                    <span>Submit & Forward Answers to WhatsApp (+91 98883 35557)</span>
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
                Rewards, Free Products & Coupons
              </h2>
              <p className="text-xs sm:text-sm text-[#5C7063]">
                Empowering the next generation of Vaidyas and scholars with authentic Ayurvedic rewards and accolades.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Card 1: 100% Free Random Product */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#C59A4E]/60 shadow-lg space-y-4 text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-[#C59A4E] text-[#0E2419] text-[9px] font-bold uppercase tracking-widest px-3 py-1 rounded-bl-xl">
                  Grand Prize
                </div>
                <div className="w-14 h-14 rounded-full bg-[#FAF3E6] border border-[#DFCFA8] flex items-center justify-center mx-auto text-[#8C682D] shadow-inner">
                  <Gift className="w-7 h-7 text-[#8C682D]" />
                </div>
                <h3 className="font-serif font-bold text-xl text-[#183B2B]">
                  100% Free Product Gift
                </h3>
                <p className="text-xs text-[#526659] leading-relaxed text-left space-y-1.5 pt-1">
                  <span className="block">• <strong>Random Formulation Gift:</strong> High scorers receive a classical remedy picked randomly from our dispensary (Abhrak Bhasma 1000 Puti, Nar Ojas Vitality, Praval Pishti, Moti Pishti, or Agnisip Tea).</span>
                  <span className="block">• <strong>Free Delivery:</strong> Shipped directly to your doorstep with zero shipping or packaging fee.</span>
                </p>
              </div>

              {/* Card 2: Guaranteed Reward Coupon */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E3D8C3] shadow-md space-y-4 text-center">
                <div className="w-14 h-14 rounded-full bg-[#FAF3E6] border border-[#DFCFA8] flex items-center justify-center mx-auto text-[#8C682D]">
                  <Sparkles className="w-7 h-7 text-[#8C682D]" />
                </div>
                <h3 className="font-serif font-bold text-xl text-[#183B2B]">
                  Reward Coupon Code
                </h3>
                <p className="text-xs text-[#526659] leading-relaxed text-left space-y-1.5 pt-1">
                  <span className="block">• <strong>Guaranteed for Participants:</strong> Receive an exclusive store discount coupon code (<code className="bg-[#FAF3E6] text-[#8C682D] font-bold px-1.5 py-0.5 rounded">SUTRA20</code> / <code className="bg-[#FAF3E6] text-[#8C682D] font-bold px-1.5 py-0.5 rounded">SUTRA10</code>).</span>
                  <span className="block">• <strong>Instant Store Discount:</strong> Save on any pure Bhasmas, Pishtis, Vitality Rasayanas, and teas.</span>
                </p>
              </div>

              {/* Card 3: Certificate of Merit & Hall of Fame */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E3D8C3] shadow-md space-y-4 text-center">
                <div className="w-14 h-14 rounded-full bg-[#FAF3E6] border border-[#DFCFA8] flex items-center justify-center mx-auto text-[#8C682D]">
                  <Award className="w-7 h-7 text-[#8C682D]" />
                </div>
                <h3 className="font-serif font-bold text-xl text-[#183B2B]">
                  Certificates & Honours
                </h3>
                <p className="text-xs text-[#526659] leading-relaxed text-left space-y-1.5 pt-1">
                  <span className="block">• <strong>Verified Digital Certificate:</strong> Official Gold/Merit Certificate recognizing your deep Samhita knowledge.</span>
                  <span className="block">• <strong>Sunday Hall of Fame:</strong> Permanent ranking on our All-India Ayurvedic Scholar Leaderboard.</span>
                </p>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
