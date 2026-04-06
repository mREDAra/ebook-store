import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';
import { generatePersonalizedPDF } from '@/lib/pdf';
import { sendBookEmail } from '@/lib/email';

export async function POST(req: NextRequest) {
  try {
    const { buyerName, buyerEmail, language, edition } = await req.json();
    const isGolden = edition !== 'standard';

    if (!buyerName || !buyerEmail) {
      return NextResponse.json({ error: 'Name and email are required' }, { status: 400 });
    }

    const adminSupabase = getSupabaseAdmin();
    
    // We are simulating an immediate PAYMENT SUCCESS for now.
    // 1. Create order as "paid"
    const { data: order, error: orderError } = await adminSupabase
      .from('orders')
      .insert({
        buyer_name: buyerName,
        buyer_email: buyerEmail,
        language: language || 'ar',
        amount: isGolden ? 9.99 : 4.99,
        currency: 'USD',
        payment_status: 'paid', // Simulating successful payment
        delivery_status: 'generating'
      })
      .select()
      .single();

    if (orderError || !order) {
      console.error('Order creation error:', orderError);
      return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
    }

    // 2. Generate and upload personalized PDF in the background
    // (A real system might queue this, but doing it inline for now for instant delivery)
    try {
      const { storagePath } = await generatePersonalizedPDF(buyerName, buyerEmail, isGolden);
      
      // Update order with path and delivery_status
      await adminSupabase
        .from('orders')
        .update({
          personalized_pdf_path: storagePath,
          delivery_status: 'sent' // since we are about to send it
        })
        .eq('id', order.id);

      // 3. Send Email (non-blocking — if it fails, order still completes)
      const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
      const downloadUrl = `${baseUrl}/download?token=${order.download_token}`;
      
      try {
        await sendBookEmail({
          buyerName: buyerName,
          buyerEmail: buyerEmail,
          downloadUrl: downloadUrl,
          language: language || 'ar'
        });
        console.log('[Checkout] Email sent successfully');
      } catch (emailErr) {
        // Email failed but the PDF is ready — don't block the order
        console.warn('[Checkout] Email failed (non-critical):', emailErr);
      }

      // 4. Return success -> The frontend will redirect to /thank-you
      return NextResponse.json({
        success: true,
        redirect_url: `/thank-you?token=${order.download_token}`,
        message: 'Order complete!'
      });

    } catch (deliveryErr) {
      console.error('Delivery failure:', deliveryErr);
      // Mark as failed delivery but still charge
      await adminSupabase
        .from('orders')
        .update({ delivery_status: 'failed' })
        .eq('id', order.id);
        
      return NextResponse.json({ error: 'Order created but failed to deliver file. Please contact support.' }, { status: 500 });
    }

  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
