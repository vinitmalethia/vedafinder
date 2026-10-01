export const DEFAULT_SUTRA_QUIZ = {
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

export const getStoredSutraQuiz = () => {
  try {
    const saved = localStorage.getItem('vf_sutra_quiz');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed && Array.isArray(parsed.questions)) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Error reading sutra quiz from storage:', e);
  }
  return DEFAULT_SUTRA_QUIZ;
};

export const saveStoredSutraQuiz = (quizData) => {
  try {
    localStorage.setItem('vf_sutra_quiz', JSON.stringify(quizData));
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('vf_sutra_quiz_updated', { detail: quizData }));
    }
  } catch (e) {
    console.error('Error saving sutra quiz:', e);
  }
};
