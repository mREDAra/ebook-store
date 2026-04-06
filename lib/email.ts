import { Resend } from 'resend';

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendBookEmail(params: {
  buyerName: string;
  buyerEmail: string;
  downloadUrl: string;
  language: 'ar' | 'en';
}): Promise<void> {
  const { buyerName, buyerEmail, downloadUrl, language } = params;

  // Since we haven't set up a verified domain with Resend yet for the client,
  // we might need to use the default 'onboarding@resend.dev' or ask the user to verify a domain.
  // For production, this should be something like `noreply@yourdomain.com`
  const fromEmail = 'onboarding@resend.dev'; 

  const isArabic = language === 'ar';
  
  const subject = isArabic 
    ? "✨ كتابك جاهز — كيف تكوني جميلة في عيون الآخرين"
    : "✨ Your Book is Ready — How to Be Beautiful in Others' Eyes";

  // Create simple HTML email template
  const html = isArabic
    ? `
      <div dir="rtl" style="font-family: Arial, sans-serif; color: #1A1A1A; line-height: 1.6; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #D4A843; text-align: center;">مرحباً ${buyerName} 🌹</h2>
        <p>شكراً لشرائك كتاب <strong>"كيف تكوني جميلة في عيون الآخرين — النسخة الذهبية"</strong>.</p>
        <p>لقد قمنا بتجهيز نسختك المخصصة والتي تحمل اسمك على صفحة الحقوق. يمكنك تحميلها الآن من خلال الزر أدناه:</p>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="${downloadUrl}" style="background: linear-gradient(135deg, #D4A843, #B8922E); color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">
            تحميل الكتاب الآن
          </a>
        </div>
        
        <p style="font-size: 14px; color: #6B5E50;">
          * رابط التحميل صالح لمدة 72 ساعة، ويسمح بحد أقصى 3 تحميلات. الرجاء الاحتفاظ بنسختك في مكان آمن.
        </p>
        
        <hr style="border: none; border-top: 1px solid #E8DDD0; margin: 30px 0;">
        <p style="font-size: 12px; color: #9B8E7E; text-align: center;">
          © 2025 نورة محمد النجار. جميع الحقوق محفوظة.<br>
          في حال واجهتك أي مشكلة، لا تترددي في الرد على هذا الإيميل للتوصل معنا.
        </p>
      </div>
    `
    : `
      <div dir="ltr" style="font-family: Arial, sans-serif; color: #1A1A1A; line-height: 1.6; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #D4A843; text-align: center;">Hello ${buyerName} 🌹</h2>
        <p>Thank you for purchasing <strong>"How to Be Beautiful in Others' Eyes — The Golden Edition"</strong>.</p>
        <p>Your personalized copy, beautifully stamped with your name, is now ready. You can download it by clicking the button below:</p>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="${downloadUrl}" style="background: linear-gradient(135deg, #D4A843, #B8922E); color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">
            Download Your Book
          </a>
        </div>
        
        <p style="font-size: 14px; color: #6B5E50;">
          * This download link is valid for 72 hours, with a maximum of 3 downloads. Please keep your copy safe.
        </p>
        
        <hr style="border: none; border-top: 1px solid #E8DDD0; margin: 30px 0;">
        <p style="font-size: 12px; color: #9B8E7E; text-align: center;">
          © 2025 Nora M. Al-Najjar. All rights reserved.<br>
          If you have any issues, feel free to reply to this email for support.
        </p>
      </div>
    `;

  try {
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: [buyerEmail],
      subject: subject,
      html: html,
    });

    if (error) {
      console.error('Resend error:', error);
      throw new Error(`Failed to send email: ${error.message}`);
    }

    console.log(`Email sent successfully to ${buyerEmail}. ID:`, data?.id);
  } catch (error) {
    console.error('Detailed Email Error:', error);
    throw error;
  }
}
