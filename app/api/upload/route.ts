import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const revalidate = 0;
// import { extractEXIFData } from '@/lib/exif';
// import { extractTextFromImage } from '@/lib/ocr';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const files = formData.getAll('files') as File[];
    const projectId = formData.get('projectId') as string;
    const category = formData.get('category') as string;

    if (!files || files.length === 0) {
      return NextResponse.json({ error: 'Geen bestanden ontvangen' }, { status: 400 });
    }

    if (!projectId || !category) {
      return NextResponse.json({ error: 'Project ID en categorie zijn verplicht' }, { status: 400 });
    }

    // Valideer bestandstypen
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    const maxSize = 10 * 1024 * 1024; // 10MB

    for (const file of files) {
      if (!allowedTypes.includes(file.type)) {
        return NextResponse.json({ 
          error: `Ongeldig bestandstype: ${file.type}. Alleen JPG, PNG en WebP zijn toegestaan.` 
        }, { status: 400 });
      }

      if (file.size > maxSize) {
        return NextResponse.json({ 
          error: `Bestand te groot: ${file.name}. Maximaal 10MB per bestand.` 
        }, { status: 400 });
      }
    }

    // Maak upload directory (serveerbaar via Next static): public/uploads/<projectId>/<category>
    const uploadDir = join(process.cwd(), 'public', 'uploads', projectId, category);
    await mkdir(uploadDir, { recursive: true });

    const uploadedFiles = [];

    for (const file of files) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      
      // Genereer unieke bestandsnaam
      const timestamp = Date.now();
      const extension = file.name.split('.').pop();
      const filename = `${timestamp}-${Math.random().toString(36).substring(2)}.${extension}`;
      const filepath = join(uploadDir, filename);

      await writeFile(filepath, buffer);

      // Extract EXIF data (simplified)
      const exifData = null;
      
      // Extract OCR text (simplified)
      const ocrText = null;

      uploadedFiles.push({
        filename,
        url: `/uploads/${projectId}/${category}/${filename}`,
        category,
        exifData,
        ocrText,
        size: file.size,
        type: file.type
      });
    }

    return NextResponse.json({
      success: true,
      files: uploadedFiles,
      message: `${files.length} bestand(en) succesvol geüpload`
    });

  } catch (error) {
    // Upload error occurred
    return NextResponse.json(
      { error: 'Upload gefaald. Probeer het opnieuw.' },
      { status: 500 }
    );
  }
}
