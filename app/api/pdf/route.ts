import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const revalidate = 0;

const prisma = new PrismaClient();
// import { validateRapportInput } from '@/lib/pdf/utils';

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

    // Fetch project data from database
    const project = await prisma.project.findUnique({
      where: { id: data.meta.projectId },
      include: { photos: true, inspections: true }
    });

    if (!project) {
      return NextResponse.json(
        { error: 'Project niet gevonden' },
        { status: 404 }
      );
    }

    // Generate HTML content for PDF
    const htmlContent = generateHTMLReport(data, project);

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
    // PDF generation error occurred
    return NextResponse.json(
      {
        error: 'PDF generatie gefaald',
        message: error instanceof Error ? error.message : 'Onbekende fout'
      },
      { status: 500 }
    );
  }
}

function generateHTMLReport(data: any, project: any): string {
  const currentDate = new Date().toLocaleDateString('nl-NL');
  
  return `
<!DOCTYPE html>
<html lang="nl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Schouwrapport - ${data.meta.naam}</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #1f2937;
            background: #f9fafb;
            padding: 20px;
        }
        
        .container {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            border-radius: 8px;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }
        
        .header {
            background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
            color: white;
            padding: 30px;
            text-align: center;
        }
        
        .header h1 {
            font-size: 28px;
            font-weight: 700;
            margin-bottom: 8px;
        }
        
        .header p {
            font-size: 16px;
            opacity: 0.9;
        }
        
        .content {
            padding: 30px;
        }
        
        .section {
            margin-bottom: 30px;
            padding-bottom: 20px;
            border-bottom: 1px solid #e5e7eb;
        }
        
        .section:last-child {
            border-bottom: none;
        }
        
        .section h2 {
            font-size: 20px;
            font-weight: 600;
            color: #1f2937;
            margin-bottom: 15px;
            padding-bottom: 8px;
            border-bottom: 2px solid #3b82f6;
        }
        
        .section h3 {
            font-size: 16px;
            font-weight: 600;
            color: #374151;
            margin-bottom: 10px;
        }
        
        .info-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
            margin-bottom: 20px;
        }
        
        .info-item {
            background: #f8fafc;
            padding: 15px;
            border-radius: 6px;
            border-left: 4px solid #3b82f6;
        }
        
        .info-item strong {
            display: block;
            font-weight: 600;
            color: #1f2937;
            margin-bottom: 5px;
        }
        
        .info-item span {
            color: #6b7280;
            font-size: 14px;
        }
        
        .status-badge {
            display: inline-block;
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        
        .status-conform {
            background: #dcfce7;
            color: #166534;
        }
        
        .status-niet-conform {
            background: #fef2f2;
            color: #dc2626;
        }
        
        .status-onbekend {
            background: #fef3c7;
            color: #d97706;
        }
        
        .grid-3 {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 15px;
        }
        
        .compact-item {
            background: #f8fafc;
            padding: 12px;
            border-radius: 6px;
            border: 1px solid #e5e7eb;
        }
        
        .compact-item h3 {
            font-size: 14px;
            font-weight: 600;
            color: #1f2937;
            margin-bottom: 8px;
        }
        
        .compact-item p {
            font-size: 12px;
            color: #6b7280;
            margin-bottom: 4px;
        }
        
        .footer {
            background: #f8fafc;
            padding: 20px 30px;
            text-align: center;
            color: #6b7280;
            font-size: 14px;
            border-top: 1px solid #e5e7eb;
        }
        
        @media print {
            body {
                background: white;
                padding: 0;
            }
            
            .container {
                box-shadow: none;
                border-radius: 0;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Schouwrapport</h1>
            <p>${data.meta.naam} - ${data.meta.code}</p>
            <p>Gegenereerd op ${currentDate}</p>
        </div>
        
        <div class="content">
            <!-- Project Informatie -->
            <div class="section">
                <h2>Project Informatie</h2>
                <div class="info-grid">
                    <div class="info-item">
                        <strong>Projectnaam</strong>
                        <span>${data.meta.naam}</span>
                    </div>
                    <div class="info-item">
                        <strong>Projectcode</strong>
                        <span>${data.meta.code}</span>
                    </div>
                    <div class="info-item">
                        <strong>Locatie</strong>
                        <span>${data.meta.locatie}</span>
                    </div>
                    <div class="info-item">
                        <strong>Opdrachtgever</strong>
                        <span>${project.opdrachtgever || 'Niet opgegeven'}</span>
                    </div>
                </div>
            </div>

            <!-- Technische Details -->
            <div class="section">
                <h2>Technische Details</h2>
                <div class="info-grid">
                    <div class="info-item">
                        <strong>Kabellengte</strong>
                        <span>${project.kabellengte || 'Niet opgegeven'} meter</span>
                    </div>
                    <div class="info-item">
                        <strong>Capaciteit</strong>
                        <span>${project.capaciteit || 'Niet opgegeven'}</span>
                    </div>
                    <div class="info-item">
                        <strong>Soort Aansluiting</strong>
                        <span>${project.soortAansluiting || 'Niet opgegeven'}</span>
                    </div>
                    <div class="info-item">
                        <strong>Soort Verharding</strong>
                        <span>${project.soortVerharding || 'Niet opgegeven'}</span>
                    </div>
                </div>
            </div>

            <!-- Nutsvoorzieningen -->
            <div class="section">
                <h2>Nutsvoorzieningen</h2>
                <div class="info-item">
                    <strong>Gewenste Nutsvoorzieningen</strong>
                    <span>${Array.isArray(project.nutsvoorzieningen) ? project.nutsvoorzieningen.join(', ') : 'Niet opgegeven'}</span>
                </div>
            </div>

            <!-- Foto's -->
            <div class="section">
                <h2>Foto's (${project.photos.length} items)</h2>
                <div class="grid-3">
                ${project.photos.length > 0 ? project.photos.map((foto: any, index: number) => `
                    <div class="compact-item">
                        <h3>${index + 1}. ${foto.categorie}</h3>
                        <p><strong>Categorie:</strong> ${foto.categorie}</p>
                        <p><strong>URL:</strong> ${foto.url}</p>
                        ${foto.ocrText ? `<p><strong>OCR:</strong> ${foto.ocrText.substring(0, 50)}...</p>` : ''}
                    </div>
                `).join('') : '<p style="font-size: 11px; color: #6b7280;">(Geen foto\'s)</p>'}
                </div>
            </div>

            <!-- Bevindingen -->
            <div class="section">
                <h2>Bevindingen</h2>
                ${data.bevindingen && data.bevindingen.length > 0 ? data.bevindingen.map((bevinding: any, index: number) => `
                    <div class="compact-item" style="margin-bottom: 15px;">
                        <h3>${index + 1}. ${bevinding.titel}</h3>
                        <p><strong>Status:</strong> 
                            <span class="status-badge status-${bevinding.status}">${bevinding.status}</span>
                        </p>
                        <p><strong>Beschrijving:</strong> ${bevinding.beschrijving}</p>
                        ${bevinding.bron ? `<p><strong>Bron:</strong> ${bevinding.bron}</p>` : ''}
                    </div>
                `).join('') : '<p style="font-size: 11px; color: #6b7280;">(Geen bevindingen)</p>'}
            </div>

            <!-- Actiepunten -->
            <div class="section">
                <h2>Actiepunten</h2>
                ${data.acties && data.acties.length > 0 ? data.acties.map((actie: any, index: number) => `
                    <div class="compact-item" style="margin-bottom: 15px;">
                        <h3>${index + 1}. ${actie.titel}</h3>
                        <p><strong>Prioriteit:</strong> 
                            <span class="status-badge status-${actie.prioriteit === 'hoog' ? 'niet-conform' : actie.prioriteit === 'midden' ? 'onbekend' : 'conform'}">${actie.prioriteit}</span>
                        </p>
                        <p><strong>Beschrijving:</strong> ${actie.beschrijving}</p>
                    </div>
                `).join('') : '<p style="font-size: 11px; color: #6b7280;">(Geen actiepunten)</p>'}
            </div>
        </div>
        
        <div class="footer">
            <p>Dit rapport is gegenereerd door Schouw Agent op ${currentDate}</p>
        </div>
    </div>
</body>
</html>`;
}