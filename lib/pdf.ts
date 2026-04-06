import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import path from 'path';
import fs from 'fs/promises';
import { getSupabaseAdmin } from './supabase';

export async function generatePersonalizedPDF(
  buyerName: string,
  buyerEmail: string,
  isGolden: boolean = true
): Promise<{ pdfBytes: Uint8Array; fileName: string; storagePath: string }> {
  
  console.log('[PDF] Starting PDF generation for:', buyerName, buyerEmail);
  
  // 1. Determine which template to use
  const templateName = isGolden ? 'golden-book.pdf' : 'original-book.pdf';
  const templatePath = path.join(process.cwd(), 'private', 'pdf-templates', templateName);
  
  console.log('[PDF] Template path:', templatePath);
  
  // 2. Read the PDF template
  const existingPdfBytes = await fs.readFile(templatePath);
  console.log('[PDF] Template loaded, size:', existingPdfBytes.length);

  // 3. Load a PDFDocument
  const pdfDoc = await PDFDocument.load(existingPdfBytes);
  console.log('[PDF] PDF loaded successfully, pages:', pdfDoc.getPageCount());

  // 4. Use standard Helvetica Bold font (English only — clean and reliable)
  const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);

  // 5. Get the second page (copyright page) or first page as fallback
  const pages = pdfDoc.getPages();
  const targetPage = pages.length > 1 ? pages[1] : pages[0];
  const { width } = targetPage.getSize();
  console.log('[PDF] Target page size:', width);

  // 6. Draw the personalization text (English only)
  const personalText = `Licensed to: ${buyerName}`;
  const emailText = `Email: ${buyerEmail}`;

  try {
    // Draw name
    const textWidth = font.widthOfTextAtSize(personalText, 14);
    targetPage.drawText(personalText, {
      x: (width - textWidth) / 2,
      y: 50,
      size: 14,
      font: font,
      color: rgb(0.83, 0.66, 0.26), // Gold color
    });

    // Draw email
    const emailWidth = fontRegular.widthOfTextAtSize(emailText, 11);
    targetPage.drawText(emailText, {
      x: (width - emailWidth) / 2,
      y: 33,
      size: 11,
      font: fontRegular,
      color: rgb(0.5, 0.5, 0.5),
    });
    console.log('[PDF] Text drawn successfully');
  } catch (drawError) {
    console.error('[PDF] Error drawing text:', drawError);
  }

  // 7. Serialize the PDFDocument to bytes
  const pdfBytes = await pdfDoc.save();
  console.log('[PDF] PDF saved, size:', pdfBytes.length);

  // 8. Upload to Supabase Storage
  const adminSupabase = getSupabaseAdmin();
  const safeEmail = buyerEmail.replace(/[^a-zA-Z0-9]/g, '_');
  const fileName = `${Date.now()}_${safeEmail}_book.pdf`;
  
  console.log('[PDF] Uploading to Supabase Storage:', fileName);

  const { data: uploadData, error: uploadError } = await adminSupabase
    .storage
    .from('personalized-ebooks')
    .upload(fileName, Buffer.from(pdfBytes) as Buffer, {
      contentType: 'application/pdf',
      cacheControl: '3600',
      upsert: false
    });

  if (uploadError) {
    console.error('[PDF] Upload error:', JSON.stringify(uploadError));
    throw new Error(`Failed to upload personalized PDF: ${uploadError.message}`);
  }

  console.log('[PDF] Upload success:', uploadData.path);

  return {
    pdfBytes,
    fileName,
    storagePath: uploadData.path
  };
}
