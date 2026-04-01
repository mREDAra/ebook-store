# PROJECT INFO — Ebook Store: كيف تكوني جميلة في عيون الآخرين

You are building a **one-page product website** to sell a digital Arabic ebook. The site must be production-ready, beautifully designed, fully responsive, and bilingual (Arabic RTL + English LTR).

---

## PROJECT CONTEXT

**Product:** An Arabic ebook called "كيف تكوني جميلة في عيون الآخرين — النسخة الذهبية" (How to Be Beautiful in Others' Eyes — The Golden Edition) by نورة محمد النجار (Nora M. Al-Najjar). It's a 46-page beauty, self-care, and confidence guide for women covering skincare, hair care, body care, perfumes, elegance, body language, relationships, and self-confidence. 16 chapters.

**Business flow:** Customer visits site → fills name + email → pays via ClickPay → receives personalized PDF (with their name stamped on the copyright page) via email automatically.

**Build scope:** The complete frontend (landing page + thank you page + download page) with language toggle, plus the full project scaffold including API route stubs, database schema, Supabase clients, and all configurations. Everything needed so that Phase 2 (PDF generation + email) and Phase 3 (ClickPay integration) can be plugged in without restructuring.

---

## TECH STACK

| Layer | Technology | Why |
|-------|-----------|-----|
| Framework | **Next.js 14+ (App Router, TypeScript)** | SSR/SSG for SEO, API routes, React |
| Styling | **Tailwind CSS v3+** | Fast, RTL-friendly with logical properties |
| Database | **Supabase (PostgreSQL)** | Orders + settings tables |
| File Storage | **Supabase Storage** | Private buckets for original + personalized PDFs |
| PDF Processing | **Next.js API Route** (pdf-lib or pdfkit) | Server-side PDF personalization (Phase 2) |
| Email | **Resend API** | Simple, good deliverability, free 100/day (Phase 2) |
| Payment | **ClickPay** (formerly PayTabs) | MENA-focused, hosted payment page + callback webhook (Phase 3) |
| Hosting | **Vercel** | Native Next.js, edge network, free tier |
| Fonts | Self-hosted via `next/font/google` | Tajawal (Arabic) + Inter (EN body) + Playfair Display (EN headings) |

---

## DESIGN SYSTEM

### Colors
```
Primary Gold:       #D4A843
Primary Gold Dark:  #B8922E
Primary Gold Light: #E8C96A
Accent Rose:        #8B2252
Accent Rose Light:  #C4466E
Background:         #FFFBF5 (warm cream)
Surface:            #FFF8F0
Surface Dark:       #F5EDE0
Text Primary:       #1A1A1A
Text Secondary:     #6B5E50
Text Muted:         #9B8E7E
Border:             #E8DDD0
White:              #FFFFFF
Success:            #2D8B4E
Error:              #C0392B
```

### Typography
- Arabic: Tajawal (weights: 400, 500, 700)
- English headings: Playfair Display (weights: 600, 700)
- English body: Inter (weights: 400, 500, 600)
- Base size: 16px
- Use Tailwind scale: `text-sm`, `text-base`, `text-lg`, `text-xl`, `text-2xl`, `text-3xl`, `text-4xl`, `text-5xl`

### Spacing & Layout
- Max content width: 1200px (`max-w-6xl`)
- Section padding: `py-16 md:py-24`
- Container padding: `px-4 md:px-6 lg:px-8`
- Card border radius: `rounded-2xl`
- Button border radius: `rounded-xl`
- Card shadows: `shadow-[0_4px_20px_rgba(180,150,100,0.12)]`
- Hover transitions: `transition-all duration-300`

### Design Vibe
Elegant, feminine, warm, luxurious. Gold accents on warm cream backgrounds. Subtle gradients. Soft shadows. The design should feel like opening a luxury beauty product — refined and premium without being over the top. NO generic SaaS look. This is an Arabic beauty book for women — the design must reflect that cultural context.

---

## FILE STRUCTURE

Create this exact structure:

```
├── app/
│   ├── layout.tsx                    # Root layout: fonts, metadata, SEO, JSON-LD, LanguageProvider
│   ├── page.tsx                      # Main landing page (imports all sections in order)
│   ├── globals.css                   # Tailwind imports + custom CSS + smooth scroll
│   ├── thank-you/
│   │   └── page.tsx                  # Post-purchase confirmation page
│   ├── download/
│   │   └── page.tsx                  # Download page (validates token from URL)
│   └── api/
│       ├── create-checkout/
│       │   └── route.ts              # Creates ClickPay payment session (STUB)
│       ├── webhook/
│       │   └── clickpay/
│       │       └── route.ts          # ClickPay callback/IPN handler (STUB)
│       └── download/
│           └── route.ts              # Secure PDF download endpoint (STUB)
├── components/
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── AboutBook.tsx
│   │   ├── TableOfContents.tsx
│   │   ├── Author.tsx
│   │   ├── Features.tsx
│   │   ├── PurchaseSection.tsx
│   │   ├── FAQ.tsx
│   │   └── Footer.tsx
│   ├── ui/
│   │   ├── Button.tsx                # Reusable button (variants: primary, secondary, outline)
│   │   ├── Input.tsx                 # Reusable input with RTL support
│   │   ├── Badge.tsx                 # Small badge/pill component
│   │   └── Accordion.tsx             # Expandable/collapsible FAQ item
│   ├── LanguageToggle.tsx            # AR/EN switch button
│   └── BookMockup.tsx                # CSS-styled book cover placeholder
├── context/
│   └── LanguageContext.tsx            # Language provider + useTranslation hook
├── locales/
│   ├── ar.ts                         # All Arabic content
│   └── en.ts                         # All English content
├── lib/
│   ├── supabase.ts                   # Supabase clients (browser + server/admin)
│   ├── pdf.ts                        # PDF personalization logic (STUB for Phase 2)
│   ├── email.ts                      # Email sending via Resend (STUB for Phase 2)
│   └── utils.ts                      # cn() helper using clsx + tailwind-merge
├── public/
│   └── (placeholder — images added later by client)
├── .env.example
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## SEO & METADATA

### Root Layout Metadata (app/layout.tsx)
```typescript
export const metadata: Metadata = {
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
```

### JSON-LD Structured Data (embed in layout.tsx)
```json
{
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
}
```

---

## LOCALES — FULL CONTENT

### Arabic (locales/ar.ts)
```typescript
export const ar = {
  dir: 'rtl' as const,
  lang: 'ar',
  languageToggle: 'English',

  nav: {
    about: 'عن الكتاب',
    contents: 'المحتويات',
    author: 'المؤلفة',
    buy: 'اشتري الآن',
  },

  hero: {
    badge: 'النسخة الذهبية',
    title: 'كيف تكوني جميلة',
    titleHighlight: 'في عيون الآخرين',
    subtitle: 'مرجع متكامل لكل امرأة — من العناية بالبشرة والشعر إلى الثقة بالنفس والأناقة. ١٦ فصلاً من الأسرار والنصائح العملية.',
    cta: 'اشتري نسختك الآن',
    price: '$9.99',
    priceBadge: 'كتاب إلكتروني PDF',
    features: ['٤٦ صفحة', 'نسخة مخصصة باسمك', 'توصيل فوري'],
  },

  about: {
    sectionTitle: 'عن الكتاب',
    paragraph1: 'في عالم يتغير كل يوم، تواجه المرأة تحديات جمّة. تتقاطع ضغوط المجتمع ووسائل الإعلام وتوقعات الأهل لتكوّن صورة مشوّشة عن الجمال.',
    paragraph2: 'هذا الكتاب ليس مجرد نصائح، بل هو مرجع متكامل لكل امرأة — في عمر الزهور أو في نضج الخبرة. متزوجة، مطلقة، أرملة، عزباء، أو أم.',
    paragraph3: 'هنا ستجدين خطوات عملية، حقيقية، صادقة، واقعية... من أصابع القدم إلى شعرك، ومن صوتك إلى قلبك.',
    highlight: 'الجمال لا يُمنح، بل يُكتسب، ويُبنى، ويُرعى.',
  },

  contents: {
    sectionTitle: 'ماذا ستجدين في الكتاب؟',
    chapters: [
      { number: '١', title: 'الجمال يبدأ من الداخل', desc: 'الصحة النفسية والعاطفية' },
      { number: '٢', title: 'أسرار العناية بالبشرة', desc: 'من الألف إلى الياء' },
      { number: '٣', title: 'أسرار الشعر الأنثوي', desc: 'من العناية إلى الجاذبية' },
      { number: '٤', title: 'جسمكِ مرآتك', desc: 'أسرار العناية الجسدية والجاذبية' },
      { number: '٥', title: 'الجمال النفسي والعاطفي', desc: 'كيف تكونين جذابة من الداخل؟' },
      { number: '٦', title: 'جمالكِ في كل عمر', desc: 'أسرار كل مرحلة من ١٨ إلى ٦٠+' },
      { number: '٧', title: 'دليل شامل للعناية', desc: 'من رأسك حتى قدميك' },
      { number: '٨', title: 'جمال الروح', desc: 'كيف تكونين جميلة من الداخل؟' },
      { number: '٩', title: 'جمال العلاقات', desc: 'كيف تكونين جميلة في عيون من تحبين؟' },
      { number: '١٠', title: 'أسرار العطور', desc: 'والجاذبية الخفية' },
      { number: '١١', title: 'حقيبة المرأة الذكية', desc: 'ماذا تحمل الجميلة معها دائماً؟' },
      { number: '١٢', title: 'أسرار الأناقة', desc: 'كيف تكونين أنيقة دون عناء؟' },
      { number: '١٣', title: 'لغة الجسد', desc: 'كيف تعكسين أنوثتك من خلال تصرفاتك؟' },
      { number: '١٤', title: 'أسرار الجمال الطبيعي', desc: 'كيف تُبرزين جمالك دون مكياج؟' },
      { number: '١٥', title: 'الثقة بالنفس', desc: 'سر الجمال الحقيقي' },
      { number: '١٦', title: 'الخاتمة', desc: 'رسالة أخيرة من القلب' },
    ],
  },

  author: {
    sectionTitle: 'عن المؤلفة',
    name: 'نورة محمد النجار',
    bio: 'كاتبة ومؤلفة عربية متخصصة في تطوير الذات والجمال الشامل للمرأة. تؤمن بأن الجمال الحقيقي ينبع من الداخل ويتجلى في الثقة بالنفس والعناية بالذات.',
    email: 'alwaysyouarebeautiful@gmail.com',
  },

  features: {
    sectionTitle: 'ماذا ستحصلين عليه؟',
    items: [
      { icon: 'book', title: 'نسخة مخصصة باسمك', desc: 'كل نسخة تحمل اسمك الشخصي — كتاب خاص بكِ وحدك' },
      { icon: 'mail', title: 'توصيل فوري على إيميلك', desc: 'بمجرد الدفع، يصل كتابك إلى بريدك الإلكتروني خلال دقائق' },
      { icon: 'phone', title: 'اقرئي على أي جهاز', desc: 'PDF متوافق مع الهاتف، التابلت، والكمبيوتر' },
      { icon: 'sparkles', title: '٤٦ صفحة من الأسرار', desc: '١٦ فصلاً شاملاً يغطي كل جوانب الجمال والأناقة والثقة' },
    ],
  },

  purchase: {
    sectionTitle: 'اشتري نسختك الآن',
    subtitle: 'احصلي على نسختك الشخصية من النسخة الذهبية',
    namePlaceholder: 'اسمك الكامل (سيُطبع على الكتاب)',
    emailPlaceholder: 'بريدك الإلكتروني',
    ctaButton: 'اشتري الآن',
    price: '$9.99',
    secure: 'دفع آمن ومشفّر',
    instant: 'توصيل فوري',
    personalized: 'نسخة باسمك',
    nameHelp: 'سيظهر اسمك على صفحة حقوق الملكية داخل الكتاب',
  },

  faq: {
    sectionTitle: 'أسئلة شائعة',
    items: [
      {
        q: 'كيف سأستلم الكتاب؟',
        a: 'بمجرد إتمام الدفع، ستصلك رسالة على بريدك الإلكتروني تحتوي على رابط تحميل كتابك الشخصي. الرابط صالح لمدة ٧٢ ساعة و٣ تحميلات.',
      },
      {
        q: 'هل يمكنني قراءة الكتاب على الهاتف؟',
        a: 'نعم! الكتاب بصيغة PDF ويمكن قراءته على أي جهاز — هاتف، تابلت، أو كمبيوتر.',
      },
      {
        q: 'ما معنى "نسخة مخصصة باسمي"؟',
        a: 'كل نسخة يتم إنشاؤها خصيصاً لكِ، حيث يُضاف اسمك على صفحة حقوق الملكية داخل الكتاب. هذا يجعل نسختك فريدة ومميزة.',
      },
      {
        q: 'ماذا لو لم تصلني الرسالة؟',
        a: 'تحققي من مجلد الرسائل غير المرغوب فيها (Spam). إذا لم تجديها، تواصلي معنا على alwaysyouarebeautiful@gmail.com وسنساعدك فوراً.',
      },
      {
        q: 'ما هي طرق الدفع المتاحة؟',
        a: 'نقبل بطاقات الائتمان (Visa, Mastercard, mada) وApple Pay عبر بوابة ClickPay الآمنة والمشفّرة.',
      },
      {
        q: 'هل يمكنني استرجاع المبلغ؟',
        a: 'بما أن المنتج رقمي ويتم تسليمه فوراً، لا يمكن الاسترجاع بعد التحميل. لكننا نضمن لكِ جودة المحتوى.',
      },
    ],
  },

  footer: {
    copyright: '© 2025 نورة محمد النجار. جميع الحقوق محفوظة.',
    contact: 'تواصلي معنا',
    privacy: 'سياسة الخصوصية',
    terms: 'الشروط والأحكام',
  },

  thankYou: {
    title: 'شكراً لكِ! 🌹',
    subtitle: 'تم الدفع بنجاح',
    message: 'سيصل كتابك الشخصي إلى بريدك الإلكتروني خلال دقائق قليلة. تحققي من صندوق الوارد (وأيضاً مجلد الرسائل غير المرغوبة).',
    checkEmail: 'تحققي من بريدك الإلكتروني',
    backHome: 'العودة للصفحة الرئيسية',
  },

  download: {
    title: 'تحميل كتابك',
    downloading: 'جارٍ تحضير كتابك...',
    ready: 'كتابك جاهز للتحميل!',
    button: 'حمّلي الآن',
    expired: 'انتهت صلاحية رابط التحميل',
    expiredMessage: 'يُرجى التواصل معنا على alwaysyouarebeautiful@gmail.com للحصول على رابط جديد.',
    error: 'حدث خطأ',
  },
};
```

### English (locales/en.ts)
```typescript
export const en = {
  dir: 'ltr' as const,
  lang: 'en',
  languageToggle: 'العربية',

  nav: {
    about: 'About',
    contents: 'Contents',
    author: 'Author',
    buy: 'Buy Now',
  },

  hero: {
    badge: 'The Golden Edition',
    title: 'How to Be Beautiful',
    titleHighlight: "in Others' Eyes",
    subtitle: 'A complete guide for every woman — from skincare and haircare to self-confidence and elegance. 16 chapters of practical secrets and tips.',
    cta: 'Buy Your Copy Now',
    price: '$9.99',
    priceBadge: 'Digital PDF Ebook',
    features: ['46 Pages', 'Personalized with Your Name', 'Instant Delivery'],
  },

  about: {
    sectionTitle: 'About the Book',
    paragraph1: "In a world that changes every day, women face tremendous challenges. Society's pressures, media expectations, and family standards create a distorted image of beauty.",
    paragraph2: "This book is not just tips — it's a complete reference for every woman. Whether you're in the bloom of youth or the richness of experience. Married, divorced, widowed, single, or a mother.",
    paragraph3: "Here you'll find practical, honest, and realistic steps... from your toes to your hair, and from your voice to your heart.",
    highlight: 'Beauty is not given — it is earned, built, and nurtured.',
  },

  contents: {
    sectionTitle: "What's Inside the Book?",
    chapters: [
      { number: '1', title: 'Beauty Starts from Within', desc: 'Mental and emotional health' },
      { number: '2', title: 'Skincare Secrets', desc: 'From A to Z' },
      { number: '3', title: 'Feminine Hair Secrets', desc: 'From care to attractiveness' },
      { number: '4', title: 'Your Body, Your Mirror', desc: 'Body care and attractiveness secrets' },
      { number: '5', title: 'Psychological Beauty', desc: 'How to be attractive from within' },
      { number: '6', title: 'Beauty at Every Age', desc: 'Secrets for every stage from 18 to 60+' },
      { number: '7', title: 'Complete Care Guide', desc: 'From head to toe' },
      { number: '8', title: 'Beauty of the Soul', desc: 'How to be beautiful from the inside' },
      { number: '9', title: 'Beauty in Relationships', desc: 'How to be beautiful in the eyes of loved ones' },
      { number: '10', title: 'Perfume Secrets', desc: 'And hidden attractiveness' },
      { number: '11', title: "The Smart Woman's Bag", desc: 'What does a beautiful woman always carry?' },
      { number: '12', title: 'Elegance Secrets', desc: 'How to be elegant effortlessly' },
      { number: '13', title: 'Body Language', desc: 'How to reflect your femininity through your behavior' },
      { number: '14', title: 'Natural Beauty Secrets', desc: 'How to highlight your beauty without makeup' },
      { number: '15', title: 'Self-Confidence', desc: 'The secret of true beauty' },
      { number: '16', title: 'Conclusion', desc: 'A final message from the heart' },
    ],
  },

  author: {
    sectionTitle: 'About the Author',
    name: 'Nora M. Al-Najjar',
    bio: 'An Arab writer and author specializing in self-development and holistic beauty for women. She believes that true beauty comes from within and is reflected in self-confidence and self-care.',
    email: 'alwaysyouarebeautiful@gmail.com',
  },

  features: {
    sectionTitle: "What You'll Get",
    items: [
      { icon: 'book', title: 'Personalized Copy', desc: 'Each copy bears your personal name — a book uniquely yours' },
      { icon: 'mail', title: 'Instant Email Delivery', desc: 'Right after payment, your book arrives in your inbox within minutes' },
      { icon: 'phone', title: 'Read on Any Device', desc: 'PDF compatible with phones, tablets, and computers' },
      { icon: 'sparkles', title: '46 Pages of Secrets', desc: '16 comprehensive chapters covering all aspects of beauty, elegance, and confidence' },
    ],
  },

  purchase: {
    sectionTitle: 'Buy Your Copy Now',
    subtitle: 'Get your personalized copy of The Golden Edition',
    namePlaceholder: 'Your full name (will be printed on the book)',
    emailPlaceholder: 'Your email address',
    ctaButton: 'Buy Now',
    price: '$9.99',
    secure: 'Secure & encrypted payment',
    instant: 'Instant delivery',
    personalized: 'Named copy',
    nameHelp: 'Your name will appear on the copyright page inside the book',
  },

  faq: {
    sectionTitle: 'Frequently Asked Questions',
    items: [
      {
        q: 'How will I receive the book?',
        a: "After completing payment, you'll receive an email with a download link for your personalized book. The link is valid for 72 hours and 3 downloads.",
      },
      {
        q: 'Can I read the book on my phone?',
        a: 'Yes! The book is in PDF format and can be read on any device — phone, tablet, or computer.',
      },
      {
        q: 'What does "personalized copy" mean?',
        a: 'Each copy is created specifically for you, with your name added to the copyright page inside the book. This makes your copy unique and special.',
      },
      {
        q: "What if I don't receive the email?",
        a: "Check your spam/junk folder. If you still can't find it, contact us at alwaysyouarebeautiful@gmail.com and we'll help you right away.",
      },
      {
        q: 'What payment methods are accepted?',
        a: 'We accept credit cards (Visa, Mastercard, mada) and Apple Pay through ClickPay, a secure and encrypted payment gateway.',
      },
      {
        q: 'Can I get a refund?',
        a: 'Since this is a digital product delivered instantly, refunds are not available after download. However, we guarantee the quality of the content.',
      },
    ],
  },

  footer: {
    copyright: '© 2025 Nora M. Al-Najjar. All rights reserved.',
    contact: 'Contact Us',
    privacy: 'Privacy Policy',
    terms: 'Terms & Conditions',
  },

  thankYou: {
    title: 'Thank You! 🌹',
    subtitle: 'Payment Successful',
    message: 'Your personalized book will arrive in your email within a few minutes. Check your inbox (and also your spam folder, just in case).',
    checkEmail: 'Check Your Email',
    backHome: 'Back to Home',
  },

  download: {
    title: 'Download Your Book',
    downloading: 'Preparing your book...',
    ready: 'Your book is ready to download!',
    button: 'Download Now',
    expired: 'Download link has expired',
    expiredMessage: 'Please contact us at alwaysyouarebeautiful@gmail.com for a new link.',
    error: 'An error occurred',
  },
};
```

---

## DATABASE SCHEMA (Supabase)

### Table: `orders`
```sql
CREATE TABLE orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  buyer_name TEXT NOT NULL,
  buyer_email TEXT NOT NULL,
  language TEXT DEFAULT 'ar' CHECK (language IN ('ar', 'en')),
  amount DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'USD',
  payment_provider TEXT DEFAULT 'clickpay',
  payment_id TEXT,
  payment_status TEXT DEFAULT 'pending'
    CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded')),
  delivery_status TEXT DEFAULT 'pending'
    CHECK (delivery_status IN ('pending', 'generating', 'sent', 'failed')),
  download_token TEXT UNIQUE DEFAULT gen_random_uuid()::text,
  download_expires_at TIMESTAMPTZ DEFAULT (now() + interval '72 hours'),
  download_count INT DEFAULT 0,
  max_downloads INT DEFAULT 3,
  personalized_pdf_path TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_orders_download_token ON orders(download_token);
CREATE INDEX idx_orders_payment_id ON orders(payment_id);
```

### Table: `site_settings`
```sql
CREATE TABLE site_settings (
  id INT PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  book_price DECIMAL(10,2) DEFAULT 9.99,
  currency TEXT DEFAULT 'USD',
  max_downloads INT DEFAULT 3,
  download_link_hours INT DEFAULT 72,
  is_active BOOLEAN DEFAULT true,
  updated_at TIMESTAMPTZ DEFAULT now()
);

INSERT INTO site_settings DEFAULT VALUES;
```

### RLS Policies
```sql
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
-- No policies = no public access (service_role bypasses RLS)

ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read settings" ON site_settings
  FOR SELECT USING (true);
```

---

## COMPONENT DESIGN SPECIFICATIONS

### Language Context (context/LanguageContext.tsx)
- React Context storing current language ('ar' | 'en')
- `useTranslation()` hook returns `{ t, lang, dir, toggleLanguage }`
- `t` returns current locale object
- Store preference in localStorage
- Default to 'ar'
- The `<html>` element must update `dir` and `lang` attributes dynamically

### Root Layout (app/layout.tsx)
- Import Tajawal, Inter, Playfair Display via `next/font/google`
- Wrap children with `LanguageProvider`
- Full SEO metadata (see SEO section above)
- JSON-LD structured data embedded as `<script type="application/ld+json">`
- Set Tajawal as default font, conditionally apply Inter/Playfair for English

### Main Page (app/page.tsx)
- Renders all sections in order: Hero → AboutBook → TableOfContents → Features → Author → PurchaseSection → FAQ → Footer
- Each section has an `id` attribute for smooth scroll navigation
- Sections are client components (they use language context)

### Hero Section
- Full viewport height on mobile (`min-h-screen`), auto on desktop
- Background: warm gradient from `#FFFBF5` to `#FFF0E0` with subtle gold radial gradient behind book
- **Book cover placeholder:** Since we don't have the actual image yet, create a beautiful **CSS-styled book mockup** — a rectangular card with gold border, book title in Arabic, rose emoji 🌹 decorations, and "النسخة الذهبية" badge. Style it to look like a physical book with shadow and slight 3D perspective via CSS transform.
- Title: large, bold. First line + second line with gold gradient text on the highlight
- Badge: "النسخة الذهبية" in a gold pill above the title
- Subtitle: 1-2 lines
- Three mini feature pills in a row
- Large CTA button: gold gradient (`#D4A843` → `#B8922E`), white text, shadow, hover scale effect
- Price displayed near CTA
- Language toggle: fixed top corner, small, clean toggle button

### About the Book Section
- 2 columns on desktop (text + decorative element), stacked on mobile
- 3 paragraphs from locale content
- Highlight quote: "الجمال لا يُمنح..." — styled with gold left/right border accent and italic
- Warm tinted background

### Table of Contents Section
- All 16 chapters displayed
- Grid: 2 columns desktop, 1 column mobile
- Each chapter: gold number (large), title (bold), description (muted text)
- Cards with subtle border, hover lift effect
- Alternating subtle background tints or consistent card styling

### Features Section (What You Get)
- 4 cards in 2x2 grid (desktop), stacked mobile
- Each: icon area (use Lucide React icons: `BookOpen`, `Mail`, `Smartphone`, `Sparkles`), title, description
- Surface background, subtle border, shadow on hover
- Gold icon color

### Author Section
- Centered layout
- Placeholder avatar: circle with gold border, showing initials "ن.ن" (or "N.N" in English)
- Author name large and elegant
- Bio paragraph centered
- Email link styled subtly

### Purchase Section — MOST IMPORTANT, MUST SELL
- Distinct background (light gold wash or Surface Dark)
- Section title + subtitle
- White form card with prominent shadow, rounded-2xl
- Name input with label + helper text
- Email input with label + validation styling
- Large price display: bold, gold colored
- CTA button: full width, large, gold gradient, text: "اشتري الآن — $9.99"
- Trust signals row below button: 🔒 + ⚡ + ✨ with labels
- **Current behavior:** On form submit, show a toast/alert: "سيتم تفعيل الدفع قريباً" / "Payment integration coming soon" — form validates name + email before showing message
- The form should have proper HTML validation (required, email type)

### FAQ Section
- Accordion: click question to expand/collapse answer
- Only one item open at a time
- Gold accent on active item (left/right border or background tint)
- Smooth CSS height transition on expand/collapse
- Clean, minimal styling

### Footer
- Dark-ish warm background (could be `#2D2A26` with warm tone)
- Light text
- Copyright, contact email (linked), Privacy + Terms links (href="#" for now)
- Simple, elegant

### Thank You Page (/thank-you)
- Centered layout, vertically centered on viewport
- Gold checkmark icon or success illustration (CSS-only)
- Title + message from locale
- CTA: link back to home page
- Optional: subtle confetti or gold sparkle CSS animation

### Download Page (/download)
- Reads `?token=xxx` from URL search params
- Three states: loading, ready, expired/error
- Loading: spinner + "جارٍ تحضير كتابك..."
- Ready: success icon + download button (gold, large)
- Expired: warning icon + message + contact email
- For now: mock the "ready" state with a non-functional download button

---

## API ROUTE STUBS

### /api/create-checkout/route.ts
```typescript
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { buyerName, buyerEmail, language } = await req.json();

    if (!buyerName || !buyerEmail) {
      return NextResponse.json({ error: 'Name and email are required' }, { status: 400 });
    }

    // PHASE 3: ClickPay Integration
    // 1. Create order in Supabase
    // 2. Call ClickPay API: POST https://secure.clickpay.com.sa/payment/request
    //    Headers: { Authorization: SERVER_KEY, Content-Type: application/json }
    //    Body: {
    //      profile_id, tran_type: 'sale', tran_class: 'ecom',
    //      cart_id: order.id, cart_description: 'كيف تكوني جميلة — النسخة الذهبية',
    //      cart_currency: 'SAR', cart_amount: price,
    //      customer_details: { name: buyerName, email: buyerEmail },
    //      callback: '{APP_URL}/api/webhook/clickpay',
    //      return: '{APP_URL}/thank-you',
    //    }
    // 3. Return ClickPay redirect URL

    return NextResponse.json({
      message: 'Payment integration coming soon — ClickPay',
      checkout_url: null,
    }, { status: 501 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
```

### /api/webhook/clickpay/route.ts
```typescript
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // PHASE 3: ClickPay Callback Handler
    // 1. Verify the callback authenticity (check server key / signature)
    // 2. Extract: tran_ref, cart_id, payment_result, customer_details
    // 3. If payment_result.response_status === 'A' (Authorized):
    //    a. Update order payment_status = 'paid' in Supabase
    //    b. Generate personalized PDF (Phase 2: lib/pdf.ts)
    //    c. Upload PDF to Supabase Storage
    //    d. Send email with download link (Phase 2: lib/email.ts)
    //    e. Update order delivery_status = 'sent'
    // 4. If failed: Update order payment_status = 'failed'

    console.log('ClickPay webhook received:', body);
    return NextResponse.json({ received: true });
  } catch (error) {
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}
```

### /api/download/route.ts
```typescript
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get('token');

  if (!token) {
    return NextResponse.json({ error: 'Download token is required' }, { status: 400 });
  }

  // PHASE 2: Secure Download
  // 1. Query Supabase: SELECT * FROM orders WHERE download_token = token
  // 2. Validate: order exists? payment_status = 'paid'?
  // 3. Check: download_expires_at > now()? download_count < max_downloads?
  // 4. Fetch personalized PDF from Supabase Storage (personalized_pdf_path)
  // 5. Increment download_count
  // 6. Return PDF:
  //    Content-Type: application/pdf
  //    Content-Disposition: attachment; filename="كيف-تكوني-جميلة.pdf"

  return NextResponse.json({
    message: 'Download endpoint ready — integration pending',
    token,
  }, { status: 501 });
}
```

---

## LIB FILES

### lib/supabase.ts
```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Browser client (limited by RLS)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Server/Admin client (full access — use ONLY in API routes, never in client components)
export function getSupabaseAdmin() {
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  return createClient(supabaseUrl, supabaseServiceKey);
}
```

### lib/pdf.ts (STUB)
```typescript
// PHASE 2: PDF Personalization
// Uses pdf-lib (or pdfkit) to add buyer's name to the copyright page

export async function generatePersonalizedPDF(
  originalPdfBytes: Buffer,
  buyerName: string,
): Promise<Buffer> {
  // TODO:
  // 1. Load PDF with pdf-lib
  // 2. Register fontkit for Arabic font support
  // 3. Embed Arabic font (Tajawal or Amiri .ttf)
  // 4. Get page index 1 (copyright page)
  // 5. Draw text: "نسخة خاصة بـ: {buyerName}"
  //    - Position: below copyright notice, centered
  //    - Color: gold (#D4A843) or deep red to match book design
  //    - Size: 16-18pt
  // 6. Return modified PDF bytes

  throw new Error('PDF generation not yet implemented');
}
```

### lib/email.ts (STUB)
```typescript
// PHASE 2: Email Delivery via Resend

export async function sendBookEmail(params: {
  buyerName: string;
  buyerEmail: string;
  downloadUrl: string;
  language: 'ar' | 'en';
}): Promise<void> {
  // TODO:
  // 1. Import Resend SDK
  // 2. Compose HTML email template (bilingual based on language param)
  // 3. Subject AR: "✨ كتابك جاهز — كيف تكوني جميلة في عيون الآخرين"
  //    Subject EN: "✨ Your Book is Ready — How to Be Beautiful in Others' Eyes"
  // 4. Body: greeting + download button/link + expiry notice + footer
  // 5. Send via Resend API
  // 6. From: configured sender email (verified domain)

  throw new Error('Email sending not yet implemented');
}
```

### lib/utils.ts
```typescript
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

---

## CONFIGURATION FILES

### .env.example
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# ClickPay (Phase 3)
CLICKPAY_PROFILE_ID=
CLICKPAY_SERVER_KEY=
CLICKPAY_CLIENT_KEY=

# Resend (Phase 2)
RESEND_API_KEY=

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
BOOK_PRICE=9.99
BOOK_CURRENCY=USD
```

### tailwind.config.ts
```typescript
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#D4A843',
          dark: '#B8922E',
          light: '#E8C96A',
        },
        rose: {
          accent: '#8B2252',
          light: '#C4466E',
        },
        cream: {
          DEFAULT: '#FFFBF5',
          dark: '#F5EDE0',
        },
        surface: {
          DEFAULT: '#FFF8F0',
          dark: '#F5EDE0',
        },
      },
      fontFamily: {
        arabic: ['var(--font-tajawal)', 'sans-serif'],
        heading: ['var(--font-playfair)', 'serif'],
        body: ['var(--font-inter)', 'sans-serif'],
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        shimmer: 'shimmer 2s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
```

### next.config.js
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [], // Add domains if loading external images later
  },
};

module.exports = nextConfig;
```

---

## DEPENDENCIES

```json
{
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "@supabase/supabase-js": "^2.0.0",
    "clsx": "^2.0.0",
    "tailwind-merge": "^2.0.0",
    "lucide-react": "^0.383.0"
  },
  "devDependencies": {
    "typescript": "^5.0.0",
    "@types/node": "^20.0.0",
    "@types/react": "^18.0.0",
    "@types/react-dom": "^18.0.0",
    "tailwindcss": "^3.4.0",
    "postcss": "^8.0.0",
    "autoprefixer": "^10.0.0"
  }
}
```

---

## CRITICAL IMPLEMENTATION NOTES

1. **RTL first:** Primary audience is Arabic. Design RTL first, then ensure LTR works. Use Tailwind logical properties (`ms-`, `me-`, `ps-`, `pe-`, `text-start`, `text-end`, `start-0`, `end-0`) instead of directional (`ml-`, `mr-`, `left-`, `right-`).

2. **Book cover placeholder:** Create a stunning CSS-only book mockup since we don't have the image yet. Gold border, Arabic title, decorative elements. Make it look premium.

3. **Smooth scroll:** Add `scroll-behavior: smooth` in globals.css on `html`. Use `id` attributes on sections for anchor navigation.

4. **Mobile first:** Design for 375px width first. Most of the Arabic audience browses on phones. All touch targets minimum 48px.

5. **Performance:** Use `next/font/google` for fonts (automatic self-hosting). Minimize client JS. No heavy animation libraries — CSS only.

6. **Accessibility:** Proper heading hierarchy (single h1 in Hero, h2 for sections). Focus states on all interactive elements. Color contrast AA minimum.

7. **Form validation:** Purchase form must validate name (required, min 2 chars) and email (required, valid format) before allowing submission. Show inline validation errors in the current language.

8. **No heavy dependencies:** Do NOT install shadcn/ui, Framer Motion, or any large UI library. Tailwind + custom components + Lucide icons only.

9. **The landing page must work fully static** on first load. No API calls needed to render the page. Only the purchase form submission makes an API call.

10. **Language toggle must feel instant.** No page reload. React state swap with localStorage persistence. The `dir` and `lang` attributes on `<html>` must update dynamically.

---

Now build the complete project. Create every file listed in the structure. Make every component beautiful and production-ready. The design should feel luxurious, warm, and elegant — worthy of a "Golden Edition" beauty book for women.
