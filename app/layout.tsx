import type { Metadata } from 'next';
import { Tajawal, Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import { LanguageProvider } from '@/context/LanguageContext';

const tajawal = Tajawal({ 
  subsets: ['arabic'], 
  weight: ['400', '500', '700'],
  variable: '--font-tajawal'
});

const inter = Inter({ 
  subsets: ['latin'], 
  weight: ['400', '500', '600'],
  variable: '--font-inter'
});

const playfair = Playfair_Display({ 
  subsets: ['latin'], 
  weight: ['600', '700'],
  variable: '--font-playfair'
});

export const metadata: Metadata = {
  metadataBase: new URL('https://alwaysyouarebeautiful.com'), // Replace with actual domain later
  title: 'كيف تكوني جميلة في عيون الآخرين — النسخة الذهبية',
  description: 'كتاب إلكتروني شامل للمرأة العربية: أسرار الجمال، العناية بالبشرة والشعر، الثقة بالنفس، والأناقة. ١٦ فصلاً من النصائح العملية. تأليف نورة محمد النجار.',
  keywords: ['كتاب جمال', 'عناية بالبشرة', 'ثقة بالنفس', 'أناقة المرأة', 'كتاب إلكتروني عربي', 'نورة النجار'],
  openGraph: {
    title: 'كيف تكوني جميلة في عيون الآخرين — النسخة الذهبية',
    description: 'مرجع متكامل لكل امرأة — ١٦ فصلاً من أسرار الجمال والأناقة والثقة بالنفس',
    images: ['/og-image.jpg'],
    type: 'website',
    locale: 'ar_SA',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'كيف تكوني جميلة في عيون الآخرين',
    images: ['/og-image.jpg'],
  },
  alternates: {
    languages: {
      'ar': '/',
      'en': '/?lang=en',
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Book",
    "name": "كيف تكوني جميلة في عيون الآخرين — النسخة الذهبية",
    "author": {
      "@type": "Person",
      "name": "نورة محمد النجار"
    },
    "bookFormat": "EBook",
    "numberOfPages": 46,
    "inLanguage": "ar",
    "offers": {
      "@type": "Offer",
      "price": "9.99",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    }
  };

  return (
    <html lang="ar" dir="rtl" className={`${tajawal.variable} ${inter.variable} ${playfair.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-arabic selection:bg-gold-light/30 selection:text-gold-dark">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
