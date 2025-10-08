/**
 * API route voor PDF generatie
 * Accepteert project data en retourneert HTML die kan worden geprint naar PDF
 */

import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const { projectId } = await request.json();

    if (!projectId) {
      return NextResponse.json({ error: 'Project ID is verplicht' }, { status: 400 });
    }

    // Haal project data op
    const project = await prisma.project.findUnique({
      where: { id: parseInt(projectId) },
      include: { 
        photos: true,
        inspections: {
          orderBy: { createdAt: 'desc' },
          take: 1
        }
      }
    });

    if (!project) {
      return NextResponse.json({ error: 'Project niet gevonden' }, { status: 404 });
    }

    // Genereer HTML rapport
    const htmlContent = generateProjectReportHTML(project);

    // Retourneer HTML response
    return new NextResponse(htmlContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/html',
        'Content-Disposition': `inline; filename="schouwrapport-${project.code}.html"`,
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    });

  } catch (error) {
    console.error('PDF generation error:', error);
    return NextResponse.json(
      {
        error: 'PDF generatie gefaald',
        message: error instanceof Error ? error.message : 'Onbekende fout'
      },
      { status: 500 }
    );
  }
}

// HTML rapport generator
function generateProjectReportHTML(project: any): string {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('nl-NL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatStatus = (status: string) => {
    switch (status) {
      case 'conform': return '✓ CONFORM';
      case 'niet-conform': return '✗ NIET-CONFORM';
      case 'onbekend': return '? ONBEKEND';
      default: return status.toUpperCase();
    }
  };

  const formatPriority = (priority: string) => {
    switch (priority) {
      case 'hoog': return '🔴 HOOG';
      case 'midden': return '🟡 MIDDEN';
      case 'laag': return '🟢 LAAG';
      default: return priority.toUpperCase();
    }
  };

  // Parse JSON fields
  const nutsvoorzieningen = typeof project.nutsvoorzieningen === 'string' 
    ? JSON.parse(project.nutsvoorzieningen) 
    : project.nutsvoorzieningen;
  
  const vergunningen = typeof project.vergunningen === 'string' 
    ? JSON.parse(project.vergunningen) 
    : project.vergunningen;

  // Parse inspection data if available
  let inspectionData = null;
  if (project.inspections && project.inspections.length > 0) {
    const inspection = project.inspections[0];
    inspectionData = {
      findings: inspection.findings ? JSON.parse(inspection.findings) : [],
      risks: inspection.risks ? JSON.parse(inspection.risks) : [],
      actions: inspection.actions ? JSON.parse(inspection.actions) : [],
      citations: inspection.citations ? JSON.parse(inspection.citations) : []
    };
  }

  const html = `
<!DOCTYPE html>
<html lang="nl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Schouw Rapport - ${project.naam}</title>
    <style>
        @media print {
            body { margin: 0; }
            .no-print { display: none; }
        }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            margin: 0;
            padding: 15px;
            line-height: 1.4;
            color: #1f2937;
            font-size: 12px;
        }
        .header {
            text-align: center;
            border-bottom: 2px solid #3b82f6;
            padding-bottom: 15px;
            margin-bottom: 20px;
        }
        .header h1 {
            color: #1e40af;
            font-size: 22px;
            margin: 0;
            font-weight: 700;
        }
        .project-info {
            background: #f8fafc;
            padding: 15px;
            border-radius: 6px;
            margin-bottom: 20px;
            border: 1px solid #e5e7eb;
        }
        .section {
            margin-bottom: 20px;
        }
        .section h2 {
            color: #1e40af;
            font-size: 14px;
            border-bottom: 1px solid #d1d5db;
            padding-bottom: 6px;
            margin-bottom: 10px;
            font-weight: 600;
        }
        .item {
            margin-bottom: 8px;
            padding: 8px;
            background: #f9fafb;
            border-left: 3px solid #3b82f6;
            border-radius: 3px;
        }
        .status-conform { color: #059669; font-weight: 600; }
        .status-niet-conform { color: #dc2626; font-weight: 600; }
        .status-onbekend { color: #d97706; font-weight: 600; }
        .priority-hoog { color: #dc2626; font-weight: 600; }
        .priority-midden { color: #d97706; font-weight: 600; }
        .priority-laag { color: #059669; font-weight: 600; }
        .summary {
            background: #eff6ff;
            padding: 12px;
            border-radius: 6px;
            border-left: 3px solid #3b82f6;
            margin: 15px 0;
        }
        .footer {
            margin-top: 25px;
            padding-top: 15px;
            border-top: 1px solid #e5e7eb;
            font-size: 10px;
            color: #6b7280;
            text-align: center;
        }
        .grid-2 {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15px;
            margin-bottom: 15px;
        }
        .grid-3 {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            gap: 10px;
            margin-bottom: 15px;
        }
        .compact-item {
            padding: 6px 8px;
            background: #f8fafc;
            border-radius: 4px;
            border: 1px solid #e5e7eb;
            font-size: 11px;
        }
        .badge {
            display: inline-block;
            padding: 2px 6px;
            border-radius: 3px;
            font-size: 10px;
            font-weight: 600;
            text-transform: uppercase;
        }
        .badge-conform { background: #dcfce7; color: #166534; }
        .badge-niet-conform { background: #fee2e2; color: #991b1b; }
        .badge-onbekend { background: #fef3c7; color: #92400e; }
        .badge-hoog { background: #fee2e2; color: #991b1b; }
        .badge-midden { background: #fef3c7; color: #92400e; }
        .badge-laag { background: #dcfce7; color: #166534; }
        .print-button {
            position: fixed;
            top: 20px;
            right: 20px;
            background: #3b82f6;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
            font-size: 14px;
        }
        .print-button:hover {
            background: #2563eb;
        }
    </style>
</head>
<body>
    <button class="print-button no-print" onclick="window.print()">📄 Print PDF</button>

    <div class="header">
        <h1>SCHOUW RAPPORT</h1>
    </div>

    <div class="project-info">
        <h2>Project Informatie</h2>
        <div class="grid-2">
            <div class="compact-item"><strong>Project:</strong> ${project.naam}</div>
            <div class="compact-item"><strong>Code:</strong> ${project.code}</div>
            <div class="compact-item"><strong>Locatie:</strong> ${project.adres}, ${project.postcode} ${project.plaats}</div>
            <div class="compact-item"><strong>Opdrachtgever:</strong> ${project.opdrachtgever}</div>
            <div class="compact-item"><strong>Datum:</strong> ${formatDate(project.createdAt)}</div>
            ${project.uitvoerder ? `<div class="compact-item"><strong>Uitvoerder:</strong> ${project.uitvoerder}</div>` : ''}
            ${project.toezichthouder ? `<div class="compact-item"><strong>Toezichthouder:</strong> ${project.toezichthouder}</div>` : ''}
        </div>
    </div>

    <div class="section">
        <h2>Nutsvoorzieningen</h2>
        <div class="grid-3">
            <div class="compact-item">${nutsvoorzieningen.includes('elektra') ? '✓' : '✗'} <strong>Elektra:</strong> ${nutsvoorzieningen.includes('elektra') ? 'Ja' : 'Nee'}</div>
            <div class="compact-item">${nutsvoorzieningen.includes('gas') ? '✓' : '✗'} <strong>Gas:</strong> ${nutsvoorzieningen.includes('gas') ? 'Ja' : 'Nee'}</div>
            <div class="compact-item">${nutsvoorzieningen.includes('water') ? '✓' : '✗'} <strong>Water:</strong> ${nutsvoorzieningen.includes('water') ? 'Ja' : 'Nee'}</div>
            ${project.capaciteit ? `<div class="compact-item"><strong>Capaciteit:</strong> ${project.capaciteit} kW</div>` : ''}
            ${project.kabellengte ? `<div class="compact-item"><strong>Kabellengte:</strong> ${project.kabellengte} meter</div>` : ''}
            ${project.soortAansluiting ? `<div class="compact-item"><strong>Soort aansluiting:</strong> ${project.soortAansluiting}</div>` : ''}
        </div>
    </div>

    <div class="section">
        <h2>Civiele Aspecten</h2>
        <div class="grid-2">
            <div class="compact-item"><strong>Verharding:</strong> ${project.soortVerharding}</div>
            <div class="compact-item">${project.boringNoodzakelijk ? '✓' : '✗'} <strong>Boring:</strong> ${project.boringNoodzakelijk ? 'Ja' : 'Nee'}</div>
            <div class="compact-item">${project.buurtInformeren ? '✓' : '✗'} <strong>Buurt informeren:</strong> ${project.buurtInformeren ? 'Ja' : 'Nee'}</div>
            <div class="compact-item">${project.wegafzettingNodig ? '✓' : '✗'} <strong>Wegafzetting:</strong> ${project.wegafzettingNodig ? 'Ja' : 'Nee'}</div>
            ${project.wegafzettingPeriode ? `<div class="compact-item"><strong>Wegafzetting periode:</strong> ${project.wegafzettingPeriode}</div>` : ''}
            ${project.traceBeschrijving ? `<div class="compact-item"><strong>Trace beschrijving:</strong> ${project.traceBeschrijving}</div>` : ''}
            ${project.kruisingen ? `<div class="compact-item"><strong>Kruisingen:</strong> ${project.kruisingen}</div>` : ''}
            ${project.obstakels ? `<div class="compact-item"><strong>Obstakels:</strong> ${project.obstakels}</div>` : ''}
        </div>
    </div>

    ${inspectionData && inspectionData.findings.length > 0 ? `
    <div class="section">
        <h2>Bevindingen (${inspectionData.findings.length} items)</h2>
        ${inspectionData.findings.map((bevinding: any, index: number) => `
            <div class="item">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                    <h3 style="margin: 0; font-size: 13px;">${index + 1}. ${bevinding.description}</h3>
                    <div>
                        <span class="badge badge-${bevinding.status}">${formatStatus(bevinding.status)}</span>
                        <span class="badge badge-${bevinding.priority}">${formatPriority(bevinding.priority)}</span>
                    </div>
                </div>
                <p style="margin: 0; font-size: 11px;"><strong>Categorie:</strong> ${bevinding.category}</p>
                <p style="margin: 0; font-size: 11px;"><strong>Bewijs:</strong> ${bevinding.evidence}</p>
                ${bevinding.source ? `<p style="margin: 4px 0 0 0; font-size: 10px; color: #6b7280;"><strong>Bron:</strong> ${bevinding.source}</p>` : ''}
            </div>
        `).join('')}
    </div>
    ` : ''}

    <div class="section">
        <h2>Foto's (${project.photos.length} items)</h2>
        <div class="grid-3">
        ${project.photos.length > 0 ? project.photos.map((foto: any, index: number) => `
            <div class="compact-item">
                <h3 style="margin: 0 0 5px 0; font-size: 12px;">${index + 1}. ${foto.categorie}</h3>
                <p style="margin: 0; font-size: 10px; color: #6b7280;"><strong>Categorie:</strong> ${foto.categorie}</p>
                <p style="margin: 0; font-size: 10px; color: #6b7280;"><strong>URL:</strong> ${foto.url}</p>
                ${foto.ocrText ? `<p style="margin: 0; font-size: 10px; color: #6b7280;"><strong>OCR:</strong> ${foto.ocrText.substring(0, 50)}...</p>` : ''}
            </div>
        `).join('') : '<p style="font-size: 11px; color: #6b7280;">(Geen foto\'s)</p>'}
        </div>
    </div>

    <div class="section">
        <h2>Vergunningen</h2>
        <div class="grid-2">
        ${vergunningen && vergunningen.length > 0 ? vergunningen.map((vergunning: string) => `<div class="compact-item"><p style="margin: 0;">- ${vergunning}</p></div>`).join('') : '<p style="font-size: 11px; color: #6b7280;">(Geen vergunningen vereist)</p>'}
        </div>
    </div>

    ${inspectionData && inspectionData.actions.length > 0 ? `
    <div class="section">
        <h2>Actiepunten (${inspectionData.actions.length} items)</h2>
        ${inspectionData.actions.map((actie: any, index: number) => `
            <div class="item">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                    <h3 style="margin: 0; font-size: 13px;">${index + 1}. ${actie.action}</h3>
                    <div>
                        <span class="badge badge-${actie.priority}">${formatPriority(actie.priority)}</span>
                    </div>
                </div>
                <p style="margin: 0; font-size: 11px;"><strong>Verantwoordelijke:</strong> ${actie.responsible}</p>
                ${actie.deadline ? `<p style="margin: 0; font-size: 11px;"><strong>Deadline:</strong> ${actie.deadline}</p>` : ''}
            </div>
        `).join('')}
    </div>
    ` : ''}

    ${project.bijzondereRisicos ? `
    <div class="section">
        <h2>Bijzondere Risico's</h2>
        <div class="item">
            <p style="margin: 0; font-size: 11px;">${project.bijzondereRisicos}</p>
        </div>
    </div>
    ` : ''}

    ${inspectionData && inspectionData.citations.length > 0 ? `
    <div class="section">
        <h2>Bronnen</h2>
        ${inspectionData.citations.map((bron: any, index: number) => `
            <div class="item">
                <p style="margin: 0; font-size: 11px;">${index + 1}. <a href="${bron.url}" target="_blank" style="color: #1e40af; text-decoration: none;">${bron.title}</a></p>
                ${bron.date ? `<p style="margin: 2px 0 0 0; font-size: 10px; color: #6b7280;">Datum: ${bron.date}</p>` : ''}
                ${bron.relevance ? `<p style="margin: 0; font-size: 10px; color: #6b7280;">Relevantie: ${bron.relevance}</p>` : ''}
            </div>
        `).join('')}
    </div>
    ` : ''}

    <div class="footer">
        <p>Rapport gegenereerd op: ${new Date().toLocaleString('nl-NL')}</p>
    </div>
</body>
</html>
`;

  return html;
}

// GET endpoint voor test doeleinden
export async function GET() {
  return NextResponse.json({
    message: 'Schouw Agent PDF API',
    version: '1.0.0',
    endpoints: {
      POST: '/api/pdf - Genereer PDF van project data',
    },
    example: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: {
        projectId: 1
      },
    },
  });
}