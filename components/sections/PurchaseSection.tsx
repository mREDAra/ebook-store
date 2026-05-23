'use client';
import { useState, useCallback } from 'react';
import { useTranslation } from '@/context/LanguageContext';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Lock, AlertCircle } from 'lucide-react';

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
        
        <div className="text-center mb-12 md:mb-16 animate-fade-in-up">
          <h2 className="text-3xl md:text-5xl font-bold font-heading leading-tight mb-4">
            {t.purchase.sectionTitle}
          </h2>
          <p className="text-lg md:text-xl text-white/80 font-body">
            {t.purchase.subtitle}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          
          <div className="space-y-6 animate-fade-in-up w-full max-w-xl mx-auto lg:mx-0">
            
            <div className="grid grid-cols-2 gap-4">
              
              {/* Golden Edition Image Option */}
              <div 
                onClick={() => setEdition('golden')}
                className={`cursor-pointer bg-white/5 p-4 rounded-2xl border-2 transition-all duration-300 flex flex-col items-center text-center group select-none ${
                  edition === 'golden' 
                    ? 'border-gold bg-gold/10 shadow-lg scale-105' 
                    : 'border-white/10 hover:border-white/20 hover:bg-white/5'
                }`}
              >
                <div className="relative w-full aspect-[3/4] rounded-lg overflow-hidden mb-4 shadow-md bg-cream/10">
                  <img 
                    src="/golden-edition.jpg" 
                    alt="Golden Edition" 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Selected indicator checkmark */}
                  {edition === 'golden' && (
                    <div className="absolute top-2 right-2 bg-gold text-white p-1.5 rounded-full shadow z-10">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-3.5 h-3.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    </div>
                  )}
                </div>
                <h3 className="font-bold text-base mb-1 text-white">{t.purchase.goldenEdition}</h3>
                <span className="font-bold text-gold text-lg mb-2 block">{t.purchase.goldenPrice}</span>
                <p className="text-xs text-white/60 leading-normal max-w-[150px] font-body">
                  {t.purchase.goldenFeatures}
                </p>
              </div>

              {/* Silver Edition Image Option */}
              <div 
                onClick={() => setEdition('standard')}
                className={`cursor-pointer bg-white/5 p-4 rounded-2xl border-2 transition-all duration-300 flex flex-col items-center text-center group select-none ${
                  edition === 'standard' 
                    ? 'border-slate-400 bg-slate-400/10 shadow-lg scale-105' 
                    : 'border-white/10 hover:border-white/20 hover:bg-white/5'
                }`}
              >
                <div className="relative w-full aspect-[3/4] rounded-lg overflow-hidden mb-4 shadow-md bg-cream/10">
                  <img 
                    src="/silver-edition.jpg" 
                    alt="Silver Edition" 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Selected indicator checkmark */}
                  {edition === 'standard' && (
                    <div className="absolute top-2 right-2 bg-slate-400 text-white p-1.5 rounded-full shadow z-10">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-3.5 h-3.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    </div>
                  )}
                </div>
                <h3 className="font-bold text-base mb-1 text-white">{t.purchase.standardEdition}</h3>
                <span className="font-bold text-slate-300 text-lg mb-2 block">{t.purchase.standardPrice}</span>
                <p className="text-xs text-white/60 leading-normal max-w-[150px] font-body">
                  {t.purchase.standardFeatures}
                </p>
              </div>

            </div>
          </div>

          <div 
            className="bg-surface p-8 md:p-10 rounded-3xl shadow-2xl relative text-text-primary text-start transition-all duration-300 border-2" 
            style={{ 
              borderColor: edition === 'golden' ? 'rgba(212, 175, 55, 0.2)' : 'rgba(148, 163, 184, 0.2)' 
            }}
          >
             {/* Floating badge for active edition */}
             <div className={`absolute -top-4 -end-4 text-white text-sm font-bold px-5 py-2 rounded-full shadow-lg transform rotate-12 transition-all duration-300 ${edition === 'golden' ? 'bg-gold ring-2 ring-gold/20' : 'bg-slate-700 ring-2 ring-slate-700/20'}`}>
               {edition === 'golden' ? t.purchase.goldenEdition : t.purchase.standardEdition}
             </div>

             <div className="text-center mb-6">
               <h3 className="text-xl md:text-2xl font-bold font-heading text-text-primary">
                 {t.purchase.formTitle}
               </h3>
             </div>

             <form onSubmit={handleSubmit} className="space-y-6 pt-2">
               
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
                 className={`w-full h-16 text-xl shadow-lg transition-all duration-300 ${
                   edition === 'golden' ? 'bg-gold hover:bg-gold-dark text-white' : 'bg-slate-700 hover:bg-slate-800 text-white'
                 }`}
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
