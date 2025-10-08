import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const projectId = formData.get('projectId') as string;
    const category = formData.get('category') as string;
    const files = formData.getAll('files') as File[];

    if (!projectId || !category || !files || files.length === 0) {
      return NextResponse.json({ error: 'Missing form data' }, { status: 400 });
    }

    const allowedFileTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    const maxSize = 10 * 1024 * 1024; // 10MB

    for (const file of files) {
      if (!allowedFileTypes.includes(file.type)) {
        return NextResponse.json({
          error: `Ongeldig bestandstype: ${file.name}. Alleen JPG, PNG, GIF, WEBP zijn toegestaan.`
        }, { status: 400 });
      }

      if (file.size > maxSize) {
        return NextResponse.json({
          error: `Bestand te groot: ${file.name}. Maximaal 10MB per bestand.`
        }, { status: 400 });
      }
    }

    // Create upload directory
    const uploadDir = join(process.cwd(), 'public', 'uploads', projectId, category);
    await mkdir(uploadDir, { recursive: true });

    const uploadedFiles = [];

    for (const file of files) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Generate unique filename
      const timestamp = Date.now();
      const extension = file.name.split('.').pop();
      const filename = `${timestamp}-${Math.random().toString(36).substring(2)}.${extension}`;
      const filepath = join(uploadDir, filename);

      // Write file to disk
      await writeFile(filepath, buffer);

      // Extract basic file info
      const exifData = {
        filename: file.name,
        size: file.size,
        type: file.type,
        lastModified: file.lastModified,
        uploadedAt: new Date().toISOString()
      };

      // Mock OCR text (in real implementation, use Tesseract.js)
      const ocrText = `OCR tekst voor ${file.name} - ${category}`;

      uploadedFiles.push({
        filename,
        url: `/uploads/${projectId}/${category}/${filename}`,
        category,
        exifData: JSON.stringify(exifData),
        ocrText: ocrText,
        originalName: file.name,
        size: file.size,
        type: file.type
      });
    }

    return NextResponse.json({
      files: uploadedFiles,
      message: `${files.length} bestand(en) succesvol geüpload`
    });

  } catch (error) {
    return NextResponse.json(
      { 
        error: 'Upload gefaald. Probeer het opnieuw.',
        details: error instanceof Error ? error.message : 'Onbekende fout'
      },
      { status: 500 }
    );
  }
}