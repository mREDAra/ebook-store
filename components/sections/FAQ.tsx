'use client';
import { useTranslation } from '@/context/LanguageContext';
import { Accordion } from '@/components/ui/Accordion';

export function FAQ() {
  const { t } = useTranslation();

  return (
    <section id="faq" className="py-16 md:py-24 bg-cream">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-text-primary inline-block border-b-2 border-gold/30 pb-4">
            {t.faq.sectionTitle}
          </h2>
        </div>

        <Accordion items={t.faq.items} />
      </div>
    </section>
  );
}
