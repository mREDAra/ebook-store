'use client';
import { useTranslation } from '@/context/LanguageContext';
import { Button } from '@/components/ui/Button';
import { Check } from 'lucide-react';

export default function ThankYouPage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center p-4">
      <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl max-w-lg w-full text-center border border-border">
        <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-8 border-[6px] border-success/5 shadow-inner">
          <Check className="w-10 h-10 text-success" />
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold font-heading text-text-primary mb-2">
          {t.thankYou.title}
        </h1>
        <h2 className="text-xl text-gold-dark font-medium mb-6">
          {t.thankYou.subtitle}
        </h2>
        
        <p className="text-text-secondary leading-relaxed mb-8 font-body">
          {t.thankYou.message}
        </p>
        
        <a href="/">
          <Button size="lg" className="w-full">
            {t.thankYou.backHome}
          </Button>
        </a>
      </div>
    </div>
  );
}
