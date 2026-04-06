'use client';
import { useTranslation } from '@/context/LanguageContext';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { ArrowRight, ArrowLeft } from 'lucide-react';

export default function PrivacyPage() {
  const { t, lang } = useTranslation();

  // Basic localized strings for navigation
  const isAr = lang === 'ar';
  const title = isAr ? 'سياسة الخصوصية' : 'Privacy Policy';
  const back = isAr ? 'العودة للصفحة الرئيسية' : 'Back to Home';

  return (
    <div className="min-h-screen bg-surface py-20 px-4 md:px-8 font-body">
      <div className="container mx-auto max-w-3xl bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-border">
        
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-gold-dark hover:text-gold transition-colors font-medium">
            {isAr ? <ArrowRight className="w-4 h-4 ms-2" /> : <ArrowLeft className="w-4 h-4 me-2" />}
            {back}
          </Link>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold font-heading text-text-primary mb-10 border-b-2 border-gold/30 pb-4 inline-block">
          {title}
        </h1>

        <div className="space-y-8 text-text-primary/90 leading-relaxed text-start">
          
          {isAr ? (
            <>
              <section className="space-y-4">
                <h2 className="text-xl font-bold font-heading text-text-primary">١. مقدمة</h2>
                <p>نحن نقدر خصوصيتك ونلتزم بحماية بياناتك الشخصية. توضح سياسة الخصوصية هذه كيفية جمع واستخدام وحماية المعلومات التي تقدمينها عند استخدام موقعنا وشراء النسخة الرقمية من كتاب "كيف تكوني جميلة في عيون الآخرين".</p>
              </section>
              <section className="space-y-4">
                <h2 className="text-xl font-bold font-heading text-text-primary">٢. المعلومات التي نجمعها</h2>
                <p>عند إتمام عملية الشراء، نقوم بجمع المعلومات الأساسية التالية فقط:</p>
                <ul className="list-disc list-inside space-y-2 ps-4">
                  <li><strong>الاسم الكامل:</strong> يُستخدم حصرياً لإصدار النسخة المخصصة باسمك وطباعته داخل الكتاب لحفظ حقوقك.</li>
                  <li><strong>البريد الإلكتروني:</strong> يُستخدم لإرسال نسخة الكتاب الرقمية (PDF) والتواصل معك حال وجود أي مشكلة في التحميل.</li>
                  <li><strong>بيانات الدفع:</strong> تتم معالجتها بشكل مشفر وآمن تماماً عبر بوابة الدفع المعتمدة. نحن لا نقوم بتخزين تفاصيل بطاقتك الائتمانية على خوادمنا أبداً.</li>
                </ul>
              </section>
              <section className="space-y-4">
                <h2 className="text-xl font-bold font-heading text-text-primary">٣. كيف نستخدم معلوماتك؟</h2>
                <p>نستخدم بياناتك للأغراض التالية فقط:</p>
                <ul className="list-disc list-inside space-y-2 ps-4">
                  <li>تخصيص نسختك الرقمية من الكتاب باسمك.</li>
                  <li>إرسال الكتاب وإيصال الدفع إلى بريدك الإلكتروني.</li>
                  <li>تقديم الدعم الفني اللازم لكِ.</li>
                </ul>
              </section>
              <section className="space-y-4">
                <h2 className="text-xl font-bold font-heading text-text-primary">٤. مشاركة البيانات</h2>
                <p>نحن لا نقوم ببيع أو تأجير أو مشاركة بياناتك الشخصية مع أي أطراف خارجية لأغراض تسويقية. تقتصر مشاركة البيانات المحدودة (مثل بيانات الدفع) مع بوابة الدفع الآمنة فقط لإتمام عملية الشراء.</p>
              </section>
              <section className="space-y-4">
                <h2 className="text-xl font-bold font-heading text-text-primary">٥. الاتصال بنا</h2>
                <p>إذا كان لديك أي أسئلة أو استفسارات حول سياسة الخصوصية، يسعدنا تواصلك معنا عبر البريد الإلكتروني:<br />
                  <a href="mailto:alwaysyouarebeautiful@gmail.com" className="text-gold-dark hover:underline font-medium">alwaysyouarebeautiful@gmail.com</a>
                </p>
              </section>
            </>
          ) : (
            <>
              <section className="space-y-4">
                <h2 className="text-xl font-bold font-heading text-text-primary">1. Introduction</h2>
                <p>We value your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, and protect the information you provide when using our site and purchasing the digital copy of "How to Be Beautiful in Others' Eyes".</p>
              </section>
              <section className="space-y-4">
                <h2 className="text-xl font-bold font-heading text-text-primary">2. Information We Collect</h2>
                <p>Upon completing your purchase, we only collect the following basic information:</p>
                <ul className="list-disc list-inside space-y-2 ps-4">
                  <li><strong>Full Name:</strong> Used exclusively to issue your personalized copy and printed inside the book to protect your rights.</li>
                  <li><strong>Email Address:</strong> Used to send the digital book copy (PDF) and communicate with you in case of any download issues.</li>
                  <li><strong>Payment Details:</strong> Securely and fully encrypted processed via an approved payment gateway. We never store your credit card details on our servers.</li>
                </ul>
              </section>
              <section className="space-y-4">
                <h2 className="text-xl font-bold font-heading text-text-primary">3. How We Use Your Information</h2>
                <p>We use your data only for the following purposes:</p>
                <ul className="list-disc list-inside space-y-2 ps-4">
                  <li>Personalizing your digital copy of the book with your name.</li>
                  <li>Sending the book and payment receipt to your email.</li>
                  <li>Providing necessary technical support.</li>
                </ul>
              </section>
              <section className="space-y-4">
                <h2 className="text-xl font-bold font-heading text-text-primary">4. Data Sharing</h2>
                <p>We do not sell, rent, or share your personal data with any third parties for marketing purposes. Limited data sharing (such as payment data) occurs only with the secure payment gateway to complete your purchase.</p>
              </section>
              <section className="space-y-4">
                <h2 className="text-xl font-bold font-heading text-text-primary">5. Contact Us</h2>
                <p>If you have any questions or concerns about our Privacy Policy, we would be happy to hear from you via email:<br />
                  <a href="mailto:alwaysyouarebeautiful@gmail.com" className="text-gold-dark hover:underline font-medium">alwaysyouarebeautiful@gmail.com</a>
                </p>
              </section>
            </>
          )}

        </div>
      </div>
    </div>
  );
}
