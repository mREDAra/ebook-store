'use client';
import { useTranslation } from '@/context/LanguageContext';
import Link from 'next/link';
import { ArrowRight, ArrowLeft } from 'lucide-react';

export default function TermsPage() {
  const { lang } = useTranslation();

  const isAr = lang === 'ar';
  const title = isAr ? 'الشروط والأحكام' : 'Terms and Conditions';
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
                <p>أهلاً بكِ في موقع كتاب "كيف تكوني جميلة في عيون الآخرين". باستخدامك لهذا الموقع وشرائك للمنتج، فإنك توافقين على هذه الشروط والأحكام. يُرجى قراءتها بعناية قبل إتمام عملية الشراء.</p>
              </section>
              <section className="space-y-4">
                <h2 className="text-xl font-bold font-heading text-text-primary">٢. طبيعة المنتج</h2>
                <p>المنتج المُباع هو <strong>كتاب إلكتروني رقمي (PDF)</strong>. لا يوجد منتج مادي سيتم شحنه إلى عنوانك. بمجرد إتمام الدفع، يتم إنشاء نسخة مخصصة باسمك وإرسالها إلكترونياً إلى بريدك.</p>
              </section>
              <section className="space-y-4">
                <h2 className="text-xl font-bold font-heading text-text-primary">٣. حقوق الملكية الفكرية والاستخدام</h2>
                <p>جميع محتويات الكتاب محمية بحقوق الطبع والنشر لصالح المؤلفة نورة محمد النجار.</p>
                <ul className="list-disc list-inside space-y-2 ps-4">
                  <li>يُسمح باستخدام الكتاب المخصص باسمك للاستخدام الشخصي فقط.</li>
                  <li>يُمنع منعاً باتاً نشر، أو نسخ، أو تصوير، أو إعادة بيع، أو مشاركة الكتاب (أو أي جزء منه) عبر أي وسيلة إلكترونية أو مطبوعة.</li>
                  <li>تحمل كل نسخة علامة مائية واسماً شخصياً لضمان حفظ الحقوق. أي انتهاك لذلك يعرض صاحب النسخة للمساءلة القانونية.</li>
                </ul>
              </section>
              <section className="space-y-4">
                <h2 className="text-xl font-bold font-heading text-text-primary">٤. سياسة الاسترجاع والإلغاء</h2>
                <p>بما أن المنتج هو ملف رقمي (PDF) يتم تسليمه بشكل فوري وتخصيصه باسم المشتري، فإنه <strong>لا يمكن إرجاع المبلغ أو إلغاء الطلب بعد إتمام عملية الدفع والشراء.</strong> نرجو التأكد من بياناتك ومن رغبتك في الشراء قبل تأكيد الدفع.</p>
              </section>
              <section className="space-y-4">
                <h2 className="text-xl font-bold font-heading text-text-primary">٥. إخلاء المسؤولية</h2>
                <p>النصائح والمعلومات الواردة في هذا الكتاب هي لأغراض التوجيه وتطوير الذات وتستند إلى خبرات وتوجهات عامة للحفاظ على الجمال والأنوثة. المؤلفة غير مسؤولة عن أي تطبيق خاطئ للنصائح، ويُرجى دائماً استشارة المتخصصين في حالات العناية الطبية بالبشرة أو الشعر، خصوصاً إذا كان لديكِ حساسية معينة أو مشاكل صحية.</p>
              </section>
              <section className="space-y-4">
                <h2 className="text-xl font-bold font-heading text-text-primary">٦. تعديل الشروط</h2>
                <p>نحتفظ بالحق في تعديل هذه الشروط والأحكام في أي وقت. استمرارك في استخدام الموقع يعني موافقتك على أي تعديلات جديدة.</p>
              </section>
            </>
          ) : (
            <>
              <section className="space-y-4">
                <h2 className="text-xl font-bold font-heading text-text-primary">1. Introduction</h2>
                <p>Welcome to the "How to Be Beautiful in Others' Eyes" book website. By using this site and purchasing the product, you agree to these Terms and Conditions. Please read them carefully before completing your purchase.</p>
              </section>
              <section className="space-y-4">
                <h2 className="text-xl font-bold font-heading text-text-primary">2. Nature of the Product</h2>
                <p>The product sold is a <strong>digital electronic book (PDF)</strong>. No physical product will be shipped to your address. Upon payment completion, a personalized copy with your name is generated and sent electronically to your email.</p>
              </section>
              <section className="space-y-4">
                <h2 className="text-xl font-bold font-heading text-text-primary">3. Intellectual Property Rights and Usage</h2>
                <p>All contents of the book are protected by copyright for the author, Nora M. Al-Najjar.</p>
                <ul className="list-disc list-inside space-y-2 ps-4">
                  <li>The use of the personalized book is for personal use only.</li>
                  <li>It is strictly prohibited to publish, copy, photograph, resell, or share the book (or any part of it) through any electronic or printed means.</li>
                  <li>Each copy carries a watermark and a personal name to ensure rights protection. Any violation of this exposes the copy owner to legal accountability.</li>
                </ul>
              </section>
              <section className="space-y-4">
                <h2 className="text-xl font-bold font-heading text-text-primary">4. Refund and Cancellation Policy</h2>
                <p>Since the product is a digital file (PDF) delivered instantly and personalized with the buyer's name, <strong>no refunds can be issued or orders canceled after the payment and purchase process is completed.</strong> Please verify your details and your desire to purchase before confirming the payment.</p>
              </section>
              <section className="space-y-4">
                <h2 className="text-xl font-bold font-heading text-text-primary">5. Disclaimer</h2>
                <p>The tips and information contained in this book are for guidance and self-development purposes and are based on general experiences to maintain beauty. The author is not responsible for any misapplication of the tips, and it is always advised to consult specialists for medical skin or hair care.</p>
              </section>
              <section className="space-y-4">
                <h2 className="text-xl font-bold font-heading text-text-primary">6. Modification of Terms</h2>
                <p>We reserve the right to modify these Terms and Conditions at any time. Your continued use of the site means you agree to any new modifications.</p>
              </section>
            </>
          )}

        </div>
      </div>
    </div>
  );
}
