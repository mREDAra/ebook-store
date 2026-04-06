'use client';
import { useTranslation } from '@/context/LanguageContext';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { BookMockup } from '@/components/BookMockup';
import { LanguageToggle } from '@/components/LanguageToggle';
import { Check } from 'lucide-react';

export function Hero() {
  const { t } = useTranslation();

  return (
    <section id="hero" className="relative min-h-[100svh] flex flex-col justify-center overflow-hidden bg-cream pt-20 pb-16 md:pt-24 md:pb-20">
      <div className="absolute top-4 end-4 md:top-8 md:end-8 z-50">
        <LanguageToggle />
      </div>
      
      {/* Background gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold-light/20 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-6xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          <div className="text-start space-y-8 animate-fade-in-up">
            <div className="space-y-4">
              <Badge variant="outline" className="mb-4">
                ✨ {t.hero.badge}
              </Badge>
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold font-heading text-text-primary leading-tight lg:leading-tight">
                <span className="block pb-1">{t.hero.title}</span>
                <span className="bg-gradient-to-r from-gold to-gold-dark bg-clip-text text-transparent block pt-2 pb-4 pe-2">
                  {t.hero.titleHighlight}
                </span>
              </h1>
              <p className="text-lg lg:text-xl text-text-secondary leading-relaxed max-w-2xl font-body">
                {t.hero.subtitle}
              </p>
            </div>

            <div className="flex flex-wrap gap-4 items-center">
              {t.hero.features.map((feature, i) => (
                <div key={i} className="flex items-center text-sm font-medium text-text-secondary bg-surface-dark px-3 py-1.5 rounded-full">
                  <Check className="w-4 h-4 text-success me-2" />
                  {feature}
                </div>
              ))}
            </div>

            <div className="flex pt-4">
              <a href="#purchase" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto text-lg px-10">
                  {t.hero.cta}
                </Button>
              </a>
            </div>
          </div>

          <div className="flex justify-center items-center lg:justify-end animate-float">
            <BookMockup />
          </div>

        </div>
      </div>
    </section>
  );
}
