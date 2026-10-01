export const DEFAULT_SUTRA_QUIZ = {
  week: 42,
  title: 'Rasashastra & Dravyaguna Classical Challenge',
  sanskritTheme: 'द्रव्यगुणविवेकः • रसशास्त्रम्',
  duration: '5 Mins',
  totalQuestions: 1,
  liveUntil: 'Sunday 10:00 PM IST',
  questions: [
    {
      id: 'q1',
      subject: 'Charaka Samhita — Sutrasthana & Chikitsa',
      question: 'According to Acharya Charaka, which of the following is considered the supreme Rasayana among all botanical substances, revered like a mother (माता इव हितकारिणी)?',
      options: [
        { key: 'A', text: 'Ashwagandha (Withania somnifera)' },
        { key: 'B', text: 'Haritaki (Terminalia chebula)' },
        { key: 'C', text: 'Guduchi (Tinospora cordifolia)' },
        { key: 'D', text: 'Shatavari (Asparagus racemosus)' }
      ],
      correct: 'B',
      explanation: 'In Charaka Samhita Chikitsasthana 1/1, Haritaki is hailed as supreme "Pathya" and celebrated like a mother (माता इव हितकारिणी) because it contains 5 of the 6 Rasas (excluding Lavana) and restores Tridosha balance without depleting Ojas.'
    }
  ]
};

export const getStoredSutraQuiz = () => {
  try {
    const saved = localStorage.getItem('vf_sutra_quiz');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed && Array.isArray(parsed.questions) && parsed.questions.length > 0) {
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
