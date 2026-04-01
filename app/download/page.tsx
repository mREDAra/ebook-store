'use client';
import { useTranslation } from '@/context/LanguageContext';
import { Button } from '@/components/ui/Button';
import { Download, AlertCircle, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function DownloadPage() {
  const { t } = useTranslation();
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');

  useEffect(() => {
    // Simulate token check
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    
    setTimeout(() => {
      if (token) {
        setStatus('ready');
      } else {
        setStatus('error');
      }
    }, 2000);
  }, []);

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center p-4">
      <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl max-w-lg w-full text-center border border-border">
        
        {status === 'loading' && (
          <div className="space-y-6">
            <Loader2 className="w-16 h-16 text-gold animate-spin mx-auto" />
            <h1 className="text-2xl font-bold font-heading text-text-primary">
              {t.download.downloading}
            </h1>
          </div>
        )}

        {status === 'ready' && (
          <div className="space-y-6 animate-fade-in-up">
            <div className="w-20 h-20 bg-gold/10 rounded-full flex items-center justify-center mx-auto border-[6px] border-gold/5 shadow-inner">
              <Download className="w-10 h-10 text-gold-dark" />
            </div>
            
            <h1 className="text-3xl font-bold font-heading text-text-primary">
              {t.download.ready}
            </h1>
            
            <a 
              href="#" 
              onClick={(e) => {
                e.preventDefault();
                alert('Download endpoint integrated in Phase 2');
              }}>
              <Button size="lg" className="w-full mt-4 h-16 text-xl shadow-lg">
                {t.download.button}
              </Button>
            </a>
          </div>
        )}

        {status === 'error' && (
          <div className="space-y-6 animate-fade-in-up">
             <div className="w-20 h-20 bg-error/10 rounded-full flex items-center justify-center mx-auto border-[6px] border-error/5 shadow-inner">
              <AlertCircle className="w-10 h-10 text-error" />
            </div>
            
            <h1 className="text-3xl font-bold font-heading text-text-primary text-error">
              {t.download.expired}
            </h1>
            
            <p className="text-text-secondary leading-relaxed font-body">
              {t.download.expiredMessage}
            </p>
          </div>
        )}

      </div>
    </div>
  );
}
