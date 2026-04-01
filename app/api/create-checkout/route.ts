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
