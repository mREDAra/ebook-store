'use client';

import { useTranslation } from '@/context/LanguageContext';
import { Button } from './ui/Button';

export function LanguageToggle() {
  const { toggleLanguage, t } = useTranslation();

  return (
    <Button variant="outline" size="sm" onClick={toggleLanguage} className="rounded-full px-4">
      {t.languageToggle}
    </Button>
  );
}
