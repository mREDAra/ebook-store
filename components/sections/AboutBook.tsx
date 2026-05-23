'use client';
import { useState, useEffect } from 'react';
import { useTranslation } from '@/context/LanguageContext';

export function AboutBook() {
  const { t, lang } = useTranslation();
  const [activeTab, setActiveTab] = useState<'golden' | 'silver'>('golden');

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTab((prev) => (prev === 'golden' ? 'silver' : 'golden'));
    }, 4000); // Switch every 4 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="about" className="py-16 md:py-24 bg-surface overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-6xl">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Text Content (Right in RTL, Left in LTR) */}
          <div className="lg:col-span-7 space-y-6 text-lg text-text-secondary font-body leading-relaxed order-1">
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-text-primary mb-8 border-b-2 border-gold/30 pb-4 inline-block">
              {t.about.sectionTitle}
            </h2>
            
            <p>{t.about.paragraph1}</p>
            <p>{t.about.paragraph2}</p>
            <p>{t.about.paragraph3}</p>
            <p>{t.about.paragraph4}</p>
          </div>

          {/* Premium Auto-toggling Mockups Panel (Left in RTL, Right in LTR) */}
          <div className="lg:col-span-5 relative flex flex-col items-center order-2">
            <div className="relative w-full max-w-[340px] aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl bg-cream border-4 border-gold/20 group">
              
              {/* Golden Edition Image */}
              <div 
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                  activeTab === 'golden' ? 'opacity-100 z-10' : 'opacity-0 z-0'
                }`}
              >
                <img 
                  src="/golden-edition.jpg" 
                  alt="Golden Edition" 
                  className="w-full h-full object-cover select-none"
                />
                {/* Floating badge */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-gold/90 text-white font-bold px-4 py-1.5 rounded-full text-sm shadow-md backdrop-blur-sm z-20 whitespace-nowrap">
                  {lang === 'ar' ? 'النسخة الذهبية ✨' : 'Golden Edition ✨'}
                </div>
              </div>

              {/* Silver Edition Image */}
              <div 
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                  activeTab === 'silver' ? 'opacity-100 z-10' : 'opacity-0 z-0'
                }`}
              >
                <img 
                  src="/silver-edition.jpg" 
                  alt="Silver Edition" 
                  className="w-full h-full object-cover select-none"
                />
                {/* Floating badge */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-slate-700/90 text-white font-bold px-4 py-1.5 rounded-full text-sm shadow-md backdrop-blur-sm z-20 whitespace-nowrap">
                  {lang === 'ar' ? 'النسخة الفضية 💿' : 'Silver Edition 💿'}
                </div>
              </div>

            </div>

            {/* Manual Toggle Buttons / Indicators */}
            <div className="flex gap-3 mt-6 z-20">
              <button 
                onClick={() => setActiveTab('golden')}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 shadow-sm border ${
                  activeTab === 'golden' 
                    ? 'bg-gold text-white border-gold scale-105' 
                    : 'bg-white text-text-secondary border-border hover:border-gold/50'
                }`}
              >
                {lang === 'ar' ? 'النسخة الذهبية' : 'Golden Edition'}
              </button>
              <button 
                onClick={() => setActiveTab('silver')}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 shadow-sm border ${
                  activeTab === 'silver' 
                    ? 'bg-slate-700 text-white border-slate-700 scale-105' 
                    : 'bg-white text-text-secondary border-border hover:border-slate-700/50'
                }`}
              >
                {lang === 'ar' ? 'النسخة الفضية' : 'النسخة الفضية'}
              </button>
            </div>
            
            {/* Background glowing blob */}
            <div className="absolute -bottom-6 w-48 h-48 bg-gold/15 rounded-full blur-3xl -z-10"></div>
          </div>

        </div>
      </div>
    </section>
  );
}
