'use client';
import { useTranslation } from '@/context/LanguageContext';

export function TableOfContents() {
  const { t } = useTranslation();

  return (
    <section id="contents" className="py-16 md:py-24 bg-cream">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-text-primary inline-block border-b-2 border-gold/30 pb-4">
            {t.contents.sectionTitle}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-4 lg:gap-6">
          {t.contents.chapters.map((chapter, i) => (
            <div 
              key={i} 
              className="group flex gap-4 p-4 md:p-6 bg-white rounded-2xl border border-border shadow-sm hover:shadow-md transition-all duration-300 hover:border-gold/30 hover:-translate-y-1"
            >
              <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-surface-dark group-hover:bg-gold-light/10 text-gold-dark font-bold text-xl font-heading transition-colors">
                {chapter.number}
              </div>
              <div className="flex flex-col justify-center">
                <h3 className="font-bold text-text-primary text-lg font-heading group-hover:text-gold-dark transition-colors">
                  {chapter.title}
                </h3>
                <p className="text-text-muted text-sm mt-1">
                  {chapter.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
