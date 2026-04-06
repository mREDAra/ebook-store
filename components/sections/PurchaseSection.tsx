'use client';
import { useState, useCallback } from 'react';
import { useTranslation } from '@/context/LanguageContext';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Lock, Zap, Sparkles, AlertCircle } from 'lucide-react';

// Only allows Latin letters, spaces, hyphens, apostrophes, and periods
const ENGLISH_NAME_REGEX = /^[A-Za-z\s'.\-]+$/;

export function PurchaseSection() {
  const { t } = useTranslation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [nameError, setNameError] = useState('');
  const [edition, setEdition] = useState<'golden' | 'standard'>('golden');

  const currentPrice = edition === 'golden' ? t.purchase.goldenPrice : t.purchase.standardPrice;

  const handleNameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setName(value);
    if (value && !ENGLISH_NAME_REGEX.test(value)) {
      setNameError(t.purchase.nameErrorNotEnglish);
    } else {
      setNameError('');
    }
  }, [t]);

  const isNameValid = name.length >= 2 && ENGLISH_NAME_REGEX.test(name);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isNameValid || !email.includes('@')) {
      if (!isNameValid && name.length > 0) {
        setNameError(t.purchase.nameErrorNotEnglish);
      }
      return;
    }
    setLoading(true);
    
    try {
      const res = await fetch('/api/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ buyerName: name, buyerEmail: email, language: t.lang, edition })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        window.location.href = data.redirect_url;
      } else {
        setMessage(data.error || 'Failed to complete order. Please try again.');
        setLoading(false);
      }
    } catch (err) {
      setMessage('Network error. Please try again.');
      setLoading(false);
    }
  };

  return (
    <section id="purchase" className="py-16 md:py-24 bg-[#1A1A1A] text-white">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-5xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          <div className="space-y-6 text-center lg:text-start rtl:lg:text-start ltr:lg:text-start">
            <h2 className="text-3xl md:text-5xl font-bold font-heading leading-tight">
              {t.purchase.sectionTitle}
            </h2>
            <p className="text-lg md:text-xl text-white/80 font-body">
              {edition === 'golden' 
                ? (t.lang === 'ar' ? 'احصلي على نسختك الملونة بالكامل من النسخة الذهبية' : 'Get your full color Golden Edition')
                : (t.lang === 'ar' ? 'احصلي على نسختك الخاصة بالأبيض والأسود' : 'Get your Black & White Standard Edition')}
            </p>
            
            <div className="pt-8 space-y-4 text-start">
              <div className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/10">
                <Sparkles className="text-gold w-6 h-6 flex-shrink-0" />
                <span className="font-medium text-lg">{t.purchase.personalized}</span>
              </div>
              <div className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/10">
                <Zap className="text-gold w-6 h-6 flex-shrink-0" />
                <span className="font-medium text-lg">{t.purchase.instant}</span>
              </div>
            </div>
          </div>

          <div className="bg-surface p-8 md:p-10 rounded-3xl shadow-2xl relative text-text-primary text-start transition-all duration-300 border-2 border-transparent" style={{ borderColor: edition === 'golden' ? 'rgba(212, 175, 55, 0.2)' : 'transparent' }}>
             <div className={`absolute -top-4 -end-4 text-white text-sm font-bold px-5 py-2 rounded-full shadow-lg transform rotate-12 transition-all duration-300 ${edition === 'golden' ? 'bg-gold ring-2 ring-gold/20' : 'bg-black ring-2 ring-black/20'}`}>
               {edition === 'golden' ? t.purchase.goldenEdition : t.purchase.standardEdition}
             </div>
             
             <div className="text-center mb-8">
               <span className="text-5xl font-bold text-gold-dark block mb-2 transition-all duration-300">{currentPrice}</span>
               <span className="text-sm font-medium text-text-muted bg-cream px-3 py-1 rounded-full inline-block">
                 {edition === 'golden' ? t.purchase.goldenDesc : t.purchase.standardDesc}
               </span>
             </div>

             <form onSubmit={handleSubmit} className="space-y-6">
               <div className="space-y-3 pb-2 text-sm font-medium">
                 <p className="text-text-muted px-2">{t.purchase.editionSelector}</p>
                 <div className="grid grid-cols-2 gap-3">
                    <button 
                      type="button"
                      onClick={() => setEdition('standard')}
                      className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all duration-300 ${edition === 'standard' ? 'border-gold bg-gold/5 shadow-sm scale-[1.02]' : 'border-border bg-white text-text-secondary hover:border-gold/30'}`}
                    >
                      <span className={`block font-bold mb-1 ${edition === 'standard' ? 'text-text-primary' : 'text-text-primary'}`}>{t.purchase.standardEdition}</span>
                      <span className="text-xs text-text-muted mb-2 font-arabic bg-surface-dark px-2 rounded-full">{t.purchase.standardDesc}</span>
                      <span className={`font-bold text-lg ${edition === 'standard' ? 'text-gold-dark' : 'text-text-secondary'}`}>{t.purchase.standardPrice}</span>
                    </button>
                    <button 
                      type="button"
                      onClick={() => setEdition('golden')}
                      className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all duration-300 ${edition === 'golden' ? 'border-gold bg-gold/5 shadow-sm scale-[1.02]' : 'border-border bg-white text-text-secondary hover:border-gold/30'}`}
                    >
                      <span className={`block font-bold mb-1 ${edition === 'golden' ? 'text-text-primary' : 'text-text-primary'}`}>{t.purchase.goldenEdition}</span>
                      <span className="text-xs text-gold-dark mb-2 font-arabic bg-gold/10 px-2 rounded-full">{t.purchase.goldenDesc}</span>
                      <span className={`font-bold text-lg ${edition === 'golden' ? 'text-gold-dark' : 'text-text-secondary'}`}>{t.purchase.goldenPrice}</span>
                    </button>
                 </div>
               </div>

               <div className="space-y-2">
                 <Input 
                   type="text" 
                   required minLength={2}
                   placeholder={t.purchase.namePlaceholder} 
                   value={name} onChange={handleNameChange}
                   className={`h-14 bg-white ${nameError ? 'border-red-500 ring-red-500/20 ring-2' : ''}`}
                   dir="ltr"
                   style={{ textAlign: 'left' }}
                 />
                 {nameError ? (
                   <div className="flex items-center gap-1.5 text-xs text-red-500 px-2 font-medium">
                     <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                     <span>{nameError}</span>
                   </div>
                 ) : (
                   <p className="text-xs text-text-muted px-2">{t.purchase.nameHelp}</p>
                 )}
               </div>
               
               <div className="space-y-2">
                 <Input 
                   type="email" 
                   required
                   placeholder={t.purchase.emailPlaceholder} 
                   value={email} onChange={e => setEmail(e.target.value)}
                   className="h-14 bg-white"
                 />
               </div>

               {message && (
                 <div className="p-3 rounded-lg bg-gold-light/20 border border-gold text-gold-dark text-center text-sm font-medium">
                   {message}
                 </div>
               )}

               <Button 
                 type="submit" 
                 size="lg" 
                 disabled={loading || !isNameValid}
                 className="w-full h-16 text-xl shadow-lg"
               >
                 {loading ? '...' : `${t.purchase.ctaButton} — ${currentPrice}`}
               </Button>
               
               <div className="flex justify-center items-center gap-2 text-success text-sm font-medium pt-2 text-center">
                 <Lock className="w-4 h-4" />
                 <span>{t.purchase.secure}</span>
               </div>
             </form>
          </div>

        </div>
      </div>
    </section>
  );
}
