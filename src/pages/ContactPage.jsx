import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, ShieldCheck, CheckCircle2, Sparkles, HelpCircle, Instagram, Facebook } from 'lucide-react';
import { VedaFinderLogo } from '../components/VedaLogoBrand';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    doshaConcern: 'Digestion & Gut Agni',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Build WhatsApp message
    const lines = [
      `🌿 *New Consultation Request — Veda Finder*`,
      ``,
      `*Name:* ${formData.name}`,
      formData.phone ? `*Phone:* ${formData.phone}` : '',
      formData.email ? `*Email:* ${formData.email}` : '',
      `*Health Area:* ${formData.doshaConcern}`,
      formData.message ? `*Message/Symptoms:* ${formData.message}` : '',
    ].filter(Boolean).join('\n');

    const whatsappUrl = `https://wa.me/919888335557?text=${encodeURIComponent(lines)}`;
    window.open(whatsappUrl, '_blank');

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', phone: '', doshaConcern: 'Digestion & Gut Agni', message: '' });
    }, 5000);
  };

  const faqs = [
    {
      q: 'Are Veda Finder Bhasmas tested for heavy metals and safe for daily use?',
      a: 'Yes, absolutely. Every batch of our Bhasmas (such as Abhrak 1,000 Puti, Swarna, and Chandi Bhasma) undergoes intensive Marana in earthen crucibles and is rigorously tested using ICP-MS and AAS spectrometry to confirm zero free elemental metal toxicity in compliance with AYUSH pharmacopoeia.'
    },
    {
      q: 'How should I consume Bhasmas and Pishtis?',
      a: 'Classical formulations are recommended with suitable Anupanas (carrier substances) such as raw organic honey, warm cow milk, or pure A2 ghee, as directed by your Doctor.'
    },
    {
      q: 'How long does standard delivery take?',
      a: 'All orders are dispatched within 24 hours in moisture-sealed Ayurvedic amber glass or food-grade tins. Delivery takes 2-4 business days across India with free shipping above ₹499.'
    }
  ];

  return (
    <div className="py-12 bg-[#FAF7F2] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EAE0CB] text-[#8C682D] text-xs font-bold uppercase tracking-widest">
            <Phone className="w-3.5 h-3.5" />
            <span>Ayurvedic Support & Clinic</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#183B2B]">
            Connect with Our Doctors
          </h1>
          <p className="text-[#596D61] text-sm sm:text-base">
            Have questions about a classical formulation or need personalized dosage guidance? Our team of senior Ayurvedic physicians is here to assist you.
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Info Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-8 border border-[#E6DCC7] shadow-sm space-y-6">
              <VedaFinderLogo size="md" showTagline={true} />

              <div className="space-y-4 text-xs sm:text-sm text-[#465A4E] pt-2">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#FAF5EB] flex items-center justify-center text-[#8C682D] shrink-0 border border-[#DFCFA8]">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#183B2B]">Helpline No</h4>
                    <p className="text-[#72857A]">+91 98883 35557</p>
                    <p className="text-[11px] text-[#8C682D]">Mon - Sat: 9:00 AM - 7:00 PM IST</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#FAF5EB] flex items-center justify-center text-[#8C682D] shrink-0 border border-[#DFCFA8]">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#183B2B]">Doctor Consultations & Orders</h4>
                    <p className="text-[#72857A]">Help@vedafinder.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#FAF5EB] flex items-center justify-center text-[#8C682D] shrink-0 border border-[#DFCFA8]">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#183B2B]">Veda Finder</h4>
                    <p className="text-[#72857A]">Hisar, Haryana</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#FAF5EB] flex items-center justify-center text-[#8C682D] shrink-0 border border-[#DFCFA8]">
                    <Instagram className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#183B2B]">Follow Us on Instagram</h4>
                    <a 
                      href="https://www.instagram.com/vedafinder?stkn=YTczbDZxcG5udWh2" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-[#8C682D] hover:text-[#183B2B] font-medium underline transition-colors"
                    >
                      @vedafinder
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#FAF5EB] flex items-center justify-center text-[#8C682D] shrink-0 border border-[#DFCFA8]">
                    <Facebook className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#183B2B]">Connect on Facebook</h4>
                    <a 
                      href="https://www.facebook.com/share/1HrZ6ZNtL7/?mibextid=wwXIfr" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-[#8C682D] hover:text-[#183B2B] font-medium underline transition-colors"
                    >
                      Veda Finder Official
                    </a>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#F8F2E6] border border-[#E4D5B9] text-xs text-[#526559] space-y-1">
                <span className="font-bold text-[#183B2B] flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#8C682D]" /> Free Doctor Consultation
                </span>
                <p className="text-[11px] leading-relaxed">
                  Every order includes free telephonic guidance with an Ayurvedic doctor to customize your Anupana and dosage.
                </p>
              </div>
            </div>
          </div>

          {/* Right Consultation Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#E6DCC7] shadow-xl space-y-6">
              <div className="space-y-1">
                <h3 className="font-serif font-bold text-2xl text-[#183B2B]">
                  Request Doctor Guidance or Send an Enquiry
                </h3>
                <p className="text-xs sm:text-sm text-[#6A7C71]">
                  Fill in your health concerns below. Our senior physician will reach out within 2-4 hours.
                </p>
              </div>

              {submitted ? (
                <div className="p-8 rounded-2xl bg-[#F0F7F2] border border-[#A7D7B7] text-center space-y-3 animate-fadeIn">
                  <div className="w-12 h-12 rounded-full bg-[#183B2B] text-white flex items-center justify-center mx-auto text-xl">
                    ✓
                  </div>
                  <h4 className="font-serif font-bold text-xl text-[#183B2B]">Enquiry Received with Reverence</h4>
                  <p className="text-xs text-[#4F6C5A] max-w-md mx-auto">
                    Thank you, {formData.name || 'valued seeker'}. Our Ayurvedic physician has received your details and will connect via phone/email shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#183B2B] uppercase tracking-wider mb-1">Your Full Name <span className="text-red-500">*</span></label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Rajesh Sharma"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full px-4 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#D5C9B3] text-sm text-[#183B2B] focus:outline-none focus:border-[#183B2B]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#183B2B] uppercase tracking-wider mb-1">Email Address</label>
                      <input
                        type="email"
                        placeholder="e.g. rajesh@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full px-4 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#D5C9B3] text-sm text-[#183B2B] focus:outline-none focus:border-[#183B2B]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#183B2B] uppercase tracking-wider mb-1">Phone Number <span className="text-red-500">*</span></label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. +91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full px-4 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#D5C9B3] text-sm text-[#183B2B] focus:outline-none focus:border-[#183B2B]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#183B2B] uppercase tracking-wider mb-1">Primary Health Area</label>
                      <select
                        value={formData.doshaConcern}
                        onChange={(e) => setFormData({...formData, doshaConcern: e.target.value})}
                        className="w-full px-4 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#D5C9B3] text-sm text-[#183B2B] focus:outline-none focus:border-[#183B2B]"
                      >
                        <option>Digestion & Gut Agni (Agnisip Tea)</option>
                        <option>Constipation & Bowel Wellness</option>
                        <option>Male Vitality & Strength (Nar Ojas)</option>
                        <option>Acidity & Pitta (Praval / Moti Pishti)</option>
                        <option>Respiratory & Debility (Abhrak Bhasma)</option>
                        <option>Memory & Stress (Chandi Bhasma)</option>
                        <option>Anaemia & Liver (Loha Bhasma)</option>
                        <option>General Ayurvedic Formulation Enquiry</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#183B2B] uppercase tracking-wider mb-1">Your Message or Symptoms</label>
                    <textarea
                      rows="4"
                      placeholder="Describe your current symptoms, constitution, or questions regarding formulation dosage..."
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#D5C9B3] text-sm text-[#183B2B] focus:outline-none focus:border-[#183B2B]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-full bg-[#183B2B] hover:bg-[#25553D] text-white font-medium text-sm flex items-center justify-center gap-2 shadow-lg transition-all hover:scale-[1.01]"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Consultation Request</span>
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

        {/* FAQs Accordion Strip */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#E6DCC7] space-y-6">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#8C682D]">
            <HelpCircle className="w-4 h-4" />
            <span>Frequently Asked Questions</span>
          </div>
          <h3 className="font-serif font-bold text-2xl text-[#183B2B]">
            Classical Formulation Questions & Safety
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            {faqs.map((faq, i) => (
              <div key={i} className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#EAE0CD] space-y-2">
                <h4 className="font-serif font-bold text-sm text-[#183B2B]">
                  {faq.q}
                </h4>
                <p className="text-xs text-[#526659] leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
