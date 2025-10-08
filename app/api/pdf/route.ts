import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    
    // Basic validation
    if (!data || !data.meta || !data.meta.code) {
      return NextResponse.json(
        { error: 'Ongeldige rapport data' },
        { status: 400 }
      );
    }

    // Generate simple HTML content for PDF
    const htmlContent = `
<!DOCTYPE html>
<html lang="nl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Schouwrapport - ${data.meta.naam}</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .header { background: #3b82f6; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; }
        .section { margin-bottom: 20px; }
        h1 { color: #1f2937; }
        h2 { color: #374151; border-bottom: 2px solid #3b82f6; padding-bottom: 5px; }
    </style>
</head>
<body>
    <div class="header">
        <h1>Schouwrapport</h1>
        <p>${data.meta.naam} - ${data.meta.code}</p>
        <p>Gegenereerd op ${new Date().toLocaleDateString('nl-NL')}</p>
    </div>
    
    <div class="content">
        <div class="section">
            <h2>Project Informatie</h2>
            <p><strong>Projectnaam:</strong> ${data.meta.naam}</p>
            <p><strong>Projectcode:</strong> ${data.meta.code}</p>
            <p><strong>Locatie:</strong> ${data.meta.locatie}</p>
        </div>

        <div class="section">
            <h2>Bevindingen</h2>
            <p>Geen specifieke bevindingen beschikbaar in deze versie.</p>
        </div>

        <div class="section">
            <h2>Actiepunten</h2>
            <p>Geen actiepunten gedefinieerd in deze versie.</p>
        </div>
    </div>
</body>
</html>`;

    return new NextResponse(htmlContent, {
      headers: {
        'Content-Type': 'text/html',
        'Content-Disposition': `attachment; filename="schouwrapport-${data.meta.code}.html"`,
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    });

  } catch (error) {
    return NextResponse.json(
      {
        error: 'PDF generatie gefaald',
        message: error instanceof Error ? error.message : 'Onbekende fout'
      },
      { status: 500 }
    );
  }
}