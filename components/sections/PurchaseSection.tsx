'use client';
import { useState } from 'react';
import { useTranslation } from '@/context/LanguageContext';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Lock, Zap, Sparkles } from 'lucide-react';

export function PurchaseSection() {
  const { t } = useTranslation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.length < 2 || !email.includes('@')) return;
    setLoading(true);
    
    // Simulate API call for now
    setTimeout(() => {
      setLoading(false);
      setMessage(t.lang === 'ar' ? 'سيتم تفعيل الدفع قريباً' : 'Payment integration coming soon');
    }, 1000);
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
              {t.purchase.subtitle}
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

          <div className="bg-surface p-8 md:p-10 rounded-3xl shadow-2xl relative text-text-primary text-start">
             <div className="absolute -top-4 -end-4 bg-error text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg transform rotate-12">
               {t.hero.badge}
             </div>
             
             <div className="text-center mb-8">
               <span className="text-5xl font-bold text-gold-dark block mb-2">{t.purchase.price}</span>
             </div>

             <form onSubmit={handleSubmit} className="space-y-6">
               <div className="space-y-2">
                 <Input 
                   type="text" 
                   required minLength={2}
                   placeholder={t.purchase.namePlaceholder} 
                   value={name} onChange={e => setName(e.target.value)}
                   className="h-14 bg-white"
                 />
                 <p className="text-xs text-text-muted px-2">{t.purchase.nameHelp}</p>
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
                 disabled={loading}
                 className="w-full h-16 text-xl shadow-lg"
               >
                 {loading ? '...' : `${t.purchase.ctaButton} — ${t.purchase.price}`}
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
