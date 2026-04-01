'use client';
import { useTranslation } from '@/context/LanguageContext';

export function Author() {
  const { t, lang } = useTranslation();

  const initials = lang === 'ar' ? 'ن.ن' : 'N.N';

  return (
    <section id="author" className="py-16 md:py-24 bg-surface">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-4xl text-center">
        
        <div className="mb-12 inline-block">
          <div className="w-32 h-32 mx-auto rounded-full border-4 border-gold-light/30 p-1 mb-6 relative">
             <div className="w-full h-full rounded-full bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center text-white text-3xl font-heading shadow-inner pointer-events-none">
               {initials}
             </div>
             {/* Decorative small circle */}
             <div className="absolute -bottom-2 -end-2 w-8 h-8 rounded-full bg-surface-dark border-2 border-gold flex items-center justify-center text-sm">
                ✍️
             </div>
          </div>
          
          <h2 className="text-3xl font-bold font-heading text-text-primary mb-2">
            {t.author.name}
          </h2>
          <div className="w-16 h-1 bg-gold mx-auto rounded-full"></div>
        </div>

        <p className="text-lg text-text-secondary leading-relaxed max-w-2xl mx-auto font-body italic mb-8">
          "{t.author.bio}"
        </p>

        <a 
          href={`mailto:${t.author.email}`} 
          className="text-gold-dark hover:text-gold transition-colors inline-flex items-center gap-2 font-medium"
        >
          {t.author.email}
        </a>

      </div>
    </section>
  );
}
