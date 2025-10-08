import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    
    // Basic validation
    if (!data || !data.projectId) {
      return NextResponse.json(
        { error: 'Project ID is verplicht' },
        { status: 400 }
      );
    }

    // Fetch project data
    const projectResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/projects/${data.projectId}`);
    if (!projectResponse.ok) {
      return NextResponse.json({ error: 'Project niet gevonden' }, { status: 404 });
    }
    
    const { project } = await projectResponse.json();
    
    // Parse AI analysis if available
    const latestInspection = project.inspections?.[0];
    const aiAnalysis = latestInspection ? {
      findings: JSON.parse(latestInspection.findings || '[]'),
      risks: JSON.parse(latestInspection.risks || '[]'),
      actions: JSON.parse(latestInspection.actions || '[]'),
      citations: JSON.parse(latestInspection.citations || '[]')
    } : null;

    // Generate comprehensive HTML content for PDF
    const htmlContent = `
<!DOCTYPE html>
<html lang="nl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Schouwrapport - ${project.naam}</title>
    <style>
        body { 
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
            margin: 0; 
            padding: 0; 
            color: #333; 
            background-color: #f8f9fa;
            line-height: 1.6;
        }
        .container { 
            max-width: 800px; 
            margin: 0 auto; 
            background: #fff; 
            box-shadow: 0 0 20px rgba(0,0,0,0.1);
        }
        .header { 
            background: linear-gradient(135deg, #1e40af, #3b82f6); 
            color: white; 
            padding: 30px; 
            text-align: center; 
        }
        .header h1 { 
            margin: 0 0 10px 0; 
            font-size: 28px; 
            font-weight: 700;
        }
        .header p { 
            margin: 5px 0; 
            opacity: 0.9; 
        }
        .content { 
            padding: 30px; 
        }
        .section { 
            margin-bottom: 30px; 
            page-break-inside: avoid;
        }
        h2 { 
            color: #1e40af; 
            border-bottom: 3px solid #3b82f6; 
            padding-bottom: 10px; 
            margin-bottom: 20px;
            font-size: 20px;
        }
        h3 { 
            color: #374151; 
            margin-top: 20px; 
            margin-bottom: 10px;
            font-size: 16px;
        }
        .project-info { 
            display: grid; 
            grid-template-columns: 1fr 1fr; 
            gap: 20px; 
            margin-bottom: 20px;
        }
        .info-item { 
            background: #f8f9fa; 
            padding: 15px; 
            border-radius: 8px; 
            border-left: 4px solid #3b82f6;
        }
        .info-item strong { 
            color: #1e40af; 
            display: block; 
            margin-bottom: 5px;
        }
        .status-badge {
            display: inline-block;
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 600;
            text-transform: uppercase;
            margin-right: 8px;
        }
        .status-conform { background: #dcfce7; color: #166534; }
        .status-niet-conform { background: #fee2e2; color: #dc2626; }
        .status-waarschuwing { background: #fef3c7; color: #d97706; }
        .finding-item, .risk-item, .action-item {
            background: #f8f9fa;
            border: 1px solid #e5e7eb;
            border-radius: 8px;
            padding: 15px;
            margin-bottom: 15px;
        }
        .finding-item h4, .risk-item h4, .action-item h4 {
            margin: 0 0 10px 0;
            color: #1e40af;
        }
        .priority-high { border-left: 4px solid #dc2626; }
        .priority-midden { border-left: 4px solid #d97706; }
        .priority-laag { border-left: 4px solid #16a34a; }
        .photos-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 15px;
            margin-top: 15px;
        }
        .photo-item {
            text-align: center;
            background: #f8f9fa;
            padding: 10px;
            border-radius: 8px;
        }
        .photo-item img {
            max-width: 100%;
            height: 100px;
            object-fit: cover;
            border-radius: 4px;
        }
        .footer {
            text-align: center;
            margin-top: 40px;
            padding: 20px;
            background: #f8f9fa;
            color: #6b7280;
            font-size: 12px;
        }
        .page-break { page-break-before: always; }
        @media print {
            body { background: white; }
            .container { box-shadow: none; }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Schouwrapport</h1>
            <p><strong>${project.naam}</strong></p>
            <p>Projectcode: ${project.code}</p>
            <p>Gegenereerd op ${new Date().toLocaleDateString('nl-NL')} om ${new Date().toLocaleTimeString('nl-NL')}</p>
        </div>
        
        <div class="content">
            <!-- Project Informatie -->
            <div class="section">
                <h2>📋 Project Informatie</h2>
                <div class="project-info">
                    <div class="info-item">
                        <strong>Opdrachtgever:</strong>
                        ${project.opdrachtgever}
                    </div>
                    <div class="info-item">
                        <strong>Locatie:</strong>
                        ${project.adres}, ${project.postcode} ${project.plaats}
                    </div>
                    <div class="info-item">
                        <strong>Kabellengte:</strong>
                        ${project.kabellengte} meter
                    </div>
                    <div class="info-item">
                        <strong>Capaciteit:</strong>
                        ${project.capaciteit} kW
                    </div>
                    <div class="info-item">
                        <strong>Nutsvoorzieningen:</strong>
                        ${typeof project.nutsvoorzieningen === 'string' ? JSON.parse(project.nutsvoorzieningen).join(', ') : (Array.isArray(project.nutsvoorzieningen) ? project.nutsvoorzieningen.join(', ') : 'Niet opgegeven')}
                    </div>
                    <div class="info-item">
                        <strong>Soort Aansluiting:</strong>
                        ${project.soortAansluiting}
                    </div>
                    <div class="info-item">
                        <strong>Verharding:</strong>
                        ${project.soortVerharding}
                    </div>
                    <div class="info-item">
                        <strong>Boring Nodig:</strong>
                        ${project.boringNoodzakelijk ? 'Ja' : 'Nee'}
                    </div>
                </div>
            </div>

            ${aiAnalysis ? `
            <!-- AI Analyse Bevindingen -->
            <div class="section">
                <h2>🔍 AI Analyse Bevindingen</h2>
                ${aiAnalysis.findings && aiAnalysis.findings.length > 0 ? aiAnalysis.findings.map((finding: any) => `
                    <div class="finding-item priority-${finding.priority}">
                        <h4>
                            <span class="status-badge status-${finding.status}">${finding.status.toUpperCase()}</span>
                            ${finding.category}
                        </h4>
                        <p><strong>Beschrijving:</strong> ${finding.description}</p>
                        <p><strong>Bewijs:</strong> ${finding.evidence}</p>
                        <p><strong>Prioriteit:</strong> ${finding.priority}</p>
                        <p><strong>Bron:</strong> ${finding.source} ${finding.url ? `(<a href="${finding.url}" target="_blank">${finding.url}</a>)` : ''}</p>
                    </div>
                `).join('') : '<p>Geen bevindingen van de AI analyse.</p>'}
            </div>

            <!-- Risico's -->
            <div class="section">
                <h2>⚠️ Geïdentificeerde Risico's</h2>
                ${aiAnalysis.risks && aiAnalysis.risks.length > 0 ? aiAnalysis.risks.map((risk: any) => `
                    <div class="risk-item">
                        <h4>${risk.type}</h4>
                        <p><strong>Beschrijving:</strong> ${risk.description}</p>
                        <p><strong>Severity:</strong> ${risk.severity}</p>
                        <p><strong>Mitigatie:</strong> ${risk.mitigation}</p>
                    </div>
                `).join('') : '<p>Geen risico\'s geïdentificeerd door de AI analyse.</p>'}
            </div>

            <!-- Actiepunten -->
            <div class="section">
                <h2>📝 Actiepunten</h2>
                ${aiAnalysis.actions && aiAnalysis.actions.length > 0 ? aiAnalysis.actions.map((action: any) => `
                    <div class="action-item">
                        <h4>${action.title}</h4>
                        <p><strong>Prioriteit:</strong> <span class="status-badge status-${action.priority === 'hoog' ? 'niet-conform' : action.priority === 'midden' ? 'waarschuwing' : 'conform'}">${action.priority.toUpperCase()}</span></p>
                        <p><strong>Beschrijving:</strong> ${action.description}</p>
                        <p><strong>Deadline:</strong> ${action.deadline}</p>
                    </div>
                `).join('') : '<p>Geen actiepunten gedefinieerd door de AI analyse.</p>'}
            </div>
            ` : '<div class="section"><h2>🤖 AI Analyse</h2><p>Geen AI analyse beschikbaar voor dit project.</p></div>'}

            <!-- Foto's -->
            <div class="section">
                <h2>📸 Foto's (${project.photos?.length || 0} items)</h2>
                ${project.photos && project.photos.length > 0 ? `
                    <div class="photos-grid">
                        ${project.photos.map((foto: any) => `
                            <div class="photo-item">
                                <h4>${foto.categorie}</h4>
                                <p><strong>URL:</strong> ${foto.url}</p>
                                ${foto.ocrText ? `<p><strong>OCR:</strong> ${foto.ocrText.substring(0, 50)}...</p>` : ''}
                                ${foto.exifData ? `<p><strong>Camera:</strong> ${JSON.parse(foto.exifData).camera || 'Onbekend'}</p>` : ''}
                            </div>
                        `).join('')}
                    </div>
                ` : '<p>Geen foto\'s beschikbaar voor dit project.</p>'}
            </div>

            <!-- Bronnen -->
            ${aiAnalysis && aiAnalysis.citations && aiAnalysis.citations.length > 0 ? `
            <div class="section">
                <h2>📚 Bronnen</h2>
                <ul>
                    ${aiAnalysis.citations.map((citation: any) => `
                        <li>
                            <strong>${citation.title}</strong><br>
                            <a href="${citation.url}" target="_blank">${citation.url}</a><br>
                            <em>${citation.description}</em>
                        </li>
                    `).join('')}
                </ul>
            </div>
            ` : ''}
        </div>

        <div class="footer">
            <p>Schouwrapport gegenereerd door Schouw Agent op ${new Date().toLocaleDateString('nl-NL')} ${new Date().toLocaleTimeString('nl-NL')}</p>
            <p>Dit rapport is automatisch gegenereerd op basis van AI-analyse en projectgegevens.</p>
        </div>
    </div>
</body>
</html>`;

    return new NextResponse(htmlContent, {
      headers: {
        'Content-Type': 'text/html',
        'Content-Disposition': `attachment; filename="schouwrapport-${project.code}.html"`,
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