'use client';
import { useTranslation } from '@/context/LanguageContext';

export function AboutBook() {
  const { t } = useTranslation();

  return (
    <section id="about" className="py-16 md:py-24 bg-surface">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-6xl">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5 relative">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl relative">
               <div className="absolute inset-0 bg-gradient-to-tr from-[#2D2A26] to-[#1A1A1A]"></div>
               <div className="absolute inset-0 border-[8px] border-surface/10 rounded-2xl pointer-events-none"></div>
               <div className="absolute inset-0 flex flex-col p-8 justify-center items-center text-center text-white/60 font-arabic italic text-xl md:text-2xl leading-relaxed mix-blend-overlay">
                  <div className="text-4xl mb-6">🌿</div>
                  <p className="mb-8">"الجمال يبدأ من اللحظة التي تقررين فيها أن تكوني نفسك."</p>
                  <p>"الأنوثة قوة خفية، وأناقة بلا تكلف."</p>
               </div>
            </div>
            {/* Decorative blob */}
            <div className="absolute -bottom-6 -start-6 w-24 h-24 bg-gold/20 rounded-full blur-xl"></div>
          </div>

          <div className="lg:col-span-7 space-y-6 text-lg text-text-secondary font-body leading-relaxed lg:ps-8">
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-text-primary mb-8 border-b-2 border-gold/30 pb-4 inline-block">
              {t.about.sectionTitle}
            </h2>
            
            <p>{t.about.paragraph1}</p>
            <p>{t.about.paragraph2}</p>
            <p>{t.about.paragraph3}</p>
            
            <div className="mt-8 p-6 bg-cream border-s-4 border-gold rounded-e-2xl shadow-sm">
              <p className="text-xl font-bold text-text-primary italic font-heading">
                "{t.about.highlight}"
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
