'use client';
import { useTranslation } from '@/context/LanguageContext';

import Link from 'next/link';

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-[#2D2A26] border-t border-white/10 py-12 text-center">
      <div className="container mx-auto px-4 text-white/60 space-y-6">
        <h3 className="text-xl font-heading font-medium text-gold/80 mb-6 font-arabic">
          كيف تكوني جميلة في عيون الآخرين
        </h3>
        
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm font-body">
          <Link href="/privacy" className="hover:text-gold transition-colors">{t.footer.privacy}</Link>
          <span className="w-1 h-1 rounded-full bg-white/20"></span>
          <Link href="/terms" className="hover:text-gold transition-colors">{t.footer.terms}</Link>
          <span className="w-1 h-1 rounded-full bg-white/20"></span>
          <a href={`mailto:alwaysyouarebeautiful@gmail.com`} className="hover:text-gold transition-colors">{t.footer.contact}</a>
        </div>
        
        <p className="text-sm border-t border-white/10 pt-8 mt-8 inline-block w-full max-w-md font-body">
          {t.footer.copyright}
        </p>
      </div>
    </footer>
  );
}
