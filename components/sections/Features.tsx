'use client';
import { useTranslation } from '@/context/LanguageContext';
import { BookOpen, Mail, Smartphone, Sparkles } from 'lucide-react';

const iconMap = {
  book: <BookOpen className="w-8 h-8 text-gold" />,
  mail: <Mail className="w-8 h-8 text-gold" />,
  phone: <Smartphone className="w-8 h-8 text-gold" />,
  sparkles: <Sparkles className="w-8 h-8 text-gold" />,
};

export function Features() {
  const { t } = useTranslation();

  return (
    <section id="features" className="py-16 md:py-24 bg-surface-dark">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-text-primary inline-block border-b-2 border-gold/30 pb-4">
            {t.features.sectionTitle}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {t.features.items.map((feature, i) => (
            <div key={i} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-border hover:border-gold/30 text-center flex flex-col items-center group">
              <div className="w-16 h-16 rounded-full bg-cream flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                {iconMap[feature.icon as keyof typeof iconMap]}
              </div>
              <h3 className="text-lg font-bold text-text-primary font-heading mb-3">
                {feature.title}
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
