import { NextRequest, NextResponse } from 'next/server';

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

    const allowedFileTypes = ['image/jpeg', 'image/png', 'image/gif'];
    const maxSize = 10 * 1024 * 1024; // 10MB

    for (const file of files) {
      if (!allowedFileTypes.includes(file.type)) {
        return NextResponse.json({
          error: `Ongeldig bestandstype: ${file.name}. Alleen JPG, PNG, GIF zijn toegestaan.`
        }, { status: 400 });
      }

      if (file.size > maxSize) {
        return NextResponse.json({
          error: `Bestand te groot: ${file.name}. Maximaal 10MB per bestand.`
        }, { status: 400 });
      }
    }

    // Return mock upload response to avoid file system operations during build
    const uploadedFiles = files.map((file, index) => ({
      filename: `mock-${Date.now()}-${index}.${file.name.split('.').pop()}`,
      url: `/uploads/mock/${projectId}/${category}/mock-${Date.now()}-${index}.${file.name.split('.').pop()}`,
      category,
      exifData: null,
      ocrText: null,
    }));

    return NextResponse.json({
      files: uploadedFiles,
      message: `${files.length} bestand(en) succesvol geüpload (mock)`
    });

  } catch (error) {
    return NextResponse.json(
      { error: 'Upload gefaald. Probeer het opnieuw.' },
      { status: 500 }
    );
  }
}