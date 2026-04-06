import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get('token');

  if (!token) {
    return NextResponse.json({ error: 'Download token is required' }, { status: 400 });
  }

  try {
    const adminSupabase = getSupabaseAdmin();

    // 1. Query Supabase for the order
    const { data: order, error } = await adminSupabase
      .from('orders')
      .select('*')
      .eq('download_token', token)
      .single();

    if (error || !order) {
      return NextResponse.json({ error: 'Invalid download token' }, { status: 404 });
    }

    // 2. Validate order status
    if (order.payment_status !== 'paid') {
      return NextResponse.json({ error: 'Payment not completed for this order' }, { status: 403 });
    }

    // 3. Check expiry
    const now = new Date();
    const expiry = new Date(order.download_expires_at);
    if (now > expiry) {
      return NextResponse.json({ error: 'Download link has expired' }, { status: 403 });
    }

    // 4. Check download count limits
    if (order.download_count >= order.max_downloads) {
      return NextResponse.json({ error: 'Maximum download limit reached' }, { status: 403 });
    }

    if (!order.personalized_pdf_path) {
      return NextResponse.json({ error: 'File is not ready yet. Please try again in a few minutes.' }, { status: 404 });
    }

    // 5. Fetch PDF from Supabase Storage
    const { data: fileData, error: downloadError } = await adminSupabase
      .storage
      .from('personalized-ebooks')
      .download(order.personalized_pdf_path);

    if (downloadError || !fileData) {
      console.error('File download error from storage:', downloadError);
      return NextResponse.json({ error: 'Failed to retrieve the file from storage' }, { status: 500 });
    }

    // 6. Increment download_count
    await adminSupabase
      .from('orders')
      .update({ download_count: order.download_count + 1 })
      .eq('id', order.id);

    // 7. Stream the PDF
    const arrayBuffer = await fileData.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    return new NextResponse(buffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="The-Golden-Edition.pdf"', // Can customize this
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    });

  } catch (err) {
    console.error('Download route error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
