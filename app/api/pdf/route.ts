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

    // Get project data directly (avoid internal fetch)
    const projects = {
      1: {
        id: 1,
        naam: 'Nieuwbouw Woningen Amsterdam Noord',
        code: 'AMN-2024-001',
        opdrachtgever: 'Gemeente Amsterdam',
        adres: 'Buiksloterweg 123',
        postcode: '1031 CS',
        plaats: 'Amsterdam',
        kabellengte: 150,
        nutsvoorzieningen: '["elektra", "gas", "water"]',
        soortAansluiting: 'nieuw',
        capaciteit: 25,
        soortVerharding: 'asfalt',
        boringNoodzakelijk: true,
        traceBeschrijving: 'Ondergrondse kabel door nieuwbouwwijk',
        kruisingen: 'Kruising met gasleiding op 2 meter diepte',
        obstakels: 'Geen obstakels',
        buurtInformeren: true,
        buurtNotitie: 'Buurtavond georganiseerd op 15 maart',
        wegafzettingNodig: true,
        wegafzettingPeriode: '2 weken in april',
        vergunningen: '["KLIC", "Omgevingsvergunning"]',
        bijzondereRisicos: 'Hoogspanningsmast in de buurt',
        uitvoerder: 'Liander Netbeheer',
        toezichthouder: 'Vitens',
        bereikbaarheden: '24/7 bereikbaar',
        createdAt: new Date('2024-01-15').toISOString(),
        updatedAt: new Date('2024-03-20').toISOString(),
        photos: [
          {
            id: 1,
            url: '/uploads/1/meterkast/meterkast-001.jpg',
            categorie: 'meterkast',
            exifData: '{"camera": "iPhone 13", "location": "52.3676,4.9041"}',
            ocrText: 'Meterkast 1 - 3x25A hoofdzekering',
            createdAt: new Date('2024-01-20').toISOString()
          },
          {
            id: 2,
            url: '/uploads/1/gebouw/gebouw-001.jpg',
            categorie: 'gebouw',
            exifData: '{"camera": "iPhone 13", "location": "52.3676,4.9041"}',
            ocrText: 'Nieuwbouw project Amsterdam Noord',
            createdAt: new Date('2024-01-20').toISOString()
          }
        ],
        inspections: [
          {
            id: 1,
            findings: JSON.stringify([
              {
                status: 'conform',
                category: 'Meterkast',
                description: 'Meterkast voldoet aan alle eisen',
                evidence: 'Foto toont correcte installatie',
                priority: 'laag',
                source: 'Liander Aansluitrichtlijnen',
                url: 'https://www.liander.nl/aansluitrichtlijnen'
              },
              {
                status: 'niet-conform',
                category: 'Veiligheid',
                description: 'Ontbrekende veiligheidsmarkering',
                evidence: 'Foto toont ontbrekende markering',
                priority: 'hoog',
                source: 'NEN 1010',
                url: 'https://www.nen.nl/nen-1010'
              }
            ]),
            risks: JSON.stringify([
              {
                type: 'Veiligheid',
                description: 'Risico op elektrocutie bij werkzaamheden',
                severity: 'hoog',
                mitigation: 'Extra veiligheidsmaatregelen toepassen'
              }
            ]),
            actions: JSON.stringify([
              {
                title: 'Veiligheidsmarkering aanbrengen',
                description: 'Ontbrekende markering toevoegen',
                priority: 'hoog',
                deadline: '2024-04-01'
              }
            ]),
            citations: JSON.stringify([
              {
                title: 'Liander Aansluitrichtlijnen 2024',
                url: 'https://www.liander.nl/aansluitrichtlijnen',
                description: 'Officiële richtlijnen voor elektrische aansluitingen'
              }
            ]),
            createdAt: new Date('2024-03-20').toISOString()
          }
        ],
        reports: [
          {
            id: 1,
            content: 'Schouwrapport voor nieuwbouw project Amsterdam Noord. Alle installaties gecontroleerd volgens Liander richtlijnen.',
            pdfUrl: '/reports/AMN-2024-001.pdf',
            createdAt: new Date('2024-03-20').toISOString()
          }
        ]
      },
      2: {
        id: 2,
        naam: 'Verzwaren Aansluiting Utrecht Centrum',
        code: 'UTC-2024-002',
        opdrachtgever: 'Utrechtse Energie',
        adres: 'Oudegracht 456',
        postcode: '3511 AL',
        plaats: 'Utrecht',
        kabellengte: 75,
        nutsvoorzieningen: '["elektra"]',
        soortAansluiting: 'verzwaren',
        capaciteit: 50,
        soortVerharding: 'klinkers',
        boringNoodzakelijk: false,
        traceBeschrijving: 'Verzwaren bestaande aansluiting',
        kruisingen: 'Geen kruisingen',
        obstakels: 'Boomwortels op 1 meter diepte',
        buurtInformeren: false,
        buurtNotitie: 'Niet nodig - binnenwerk',
        wegafzettingNodig: false,
        wegafzettingPeriode: 'Niet van toepassing',
        vergunningen: '["KLIC"]',
        bijzondereRisicos: 'Historisch centrum - extra voorzichtigheid',
        uitvoerder: 'Alliander',
        toezichthouder: 'Gemeente Utrecht',
        bereikbaarheden: 'Werkdagen 8:00-17:00',
        createdAt: new Date('2024-02-01').toISOString(),
        updatedAt: new Date('2024-03-15').toISOString(),
        photos: [
          {
            id: 3,
            url: '/uploads/2/meterkast/meterkast-002.jpg',
            categorie: 'meterkast',
            exifData: '{"camera": "Samsung Galaxy S21", "location": "52.0907,5.1214"}',
            ocrText: 'Bestaande meterkast - 3x35A',
            createdAt: new Date('2024-02-05').toISOString()
          }
        ],
        inspections: [
          {
            id: 2,
            findings: JSON.stringify([
              {
                status: 'conform',
                category: 'Meterkast',
                description: 'Bestaande installatie geschikt voor verzwaren',
                evidence: 'Technische berekening uitgevoerd',
                priority: 'laag',
                source: 'NEN 1010',
                url: 'https://www.nen.nl/nen-1010'
              }
            ]),
            risks: JSON.stringify([]),
            actions: JSON.stringify([]),
            citations: JSON.stringify([]),
            createdAt: new Date('2024-03-15').toISOString()
          }
        ],
        reports: []
      }
    };

    const project = projects[data.projectId as keyof typeof projects] || {
      id: data.projectId,
      naam: `Test Project ${data.projectId}`,
      code: `TP${data.projectId.toString().padStart(3, '0')}`,
      opdrachtgever: 'Test Opdrachtgever',
      adres: 'Teststraat 1',
      postcode: '1000 AA',
      plaats: 'Amsterdam',
      kabellengte: 100,
      nutsvoorzieningen: '["elektra", "gas"]',
      soortAansluiting: 'nieuw',
      capaciteit: 10,
      soortVerharding: 'asfalt',
      boringNoodzakelijk: false,
      traceBeschrijving: 'Test trace beschrijving',
      kruisingen: 'Geen kruisingen',
      obstakels: 'Geen obstakels',
      buurtInformeren: true,
      buurtNotitie: 'Buurt geïnformeerd',
      wegafzettingNodig: false,
      wegafzettingPeriode: 'Niet van toepassing',
      vergunningen: '["KLIC"]',
      bijzondereRisicos: 'Geen bijzondere risico\'s',
      uitvoerder: 'Test Uitvoerder',
      toezichthouder: 'Test Toezichthouder',
      bereikbaarheden: '24/7 bereikbaar',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      photos: [],
      inspections: [],
      reports: []
    };
    
    // Parse AI analysis if available
    const latestInspection = project.inspections?.[0];
    const aiAnalysis = latestInspection ? {
      findings: JSON.parse(latestInspection.findings || '[]'),
      risks: JSON.parse(latestInspection.risks || '[]'),
      actions: JSON.parse(latestInspection.actions || '[]'),
      citations: JSON.parse(latestInspection.citations || '[]')
    } : null;

    // Generate professional compact HTML content for PDF
    const htmlContent = `
<!DOCTYPE html>
<html lang="nl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Schouwrapport - ${project.naam}</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            font-family: 'Arial', sans-serif; 
            font-size: 14px; 
            line-height: 1.6; 
            color: #333; 
            background: #fff;
        }
        .page { 
            width: 210mm; 
            min-height: 297mm; 
            margin: 0 auto; 
            padding: 20mm; 
            background: white;
        }
        .header { 
            border-bottom: 3px solid #2563eb; 
            padding-bottom: 8px; 
            margin-bottom: 12px;
        }
        .header h1 { 
            font-size: 24px; 
            color: #2563eb; 
            font-weight: bold;
            margin-bottom: 8px;
        }
        .header-info { 
            font-size: 14px; 
            color: #666; 
            display: flex; 
            justify-content: space-between;
        }
        .section { 
            margin-bottom: 20px; 
            page-break-inside: avoid;
        }
        .section-title { 
            font-size: 16px; 
            font-weight: bold; 
            color: #2563eb; 
            border-bottom: 2px solid #e5e7eb; 
            padding-bottom: 8px; 
            margin-bottom: 12px;
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
            gap: 12px; 
            margin-bottom: 15px;
        }
        .info-item { 
            background: #f8fafc; 
            padding: 12px; 
            border-left: 4px solid #2563eb; 
            font-size: 14px;
        }
        .info-label { 
            font-weight: bold; 
            color: #1e40af; 
            display: block; 
            margin-bottom: 4px;
        }
        .status-badge {
            display: inline-block;
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 12px;
            font-weight: bold;
            text-transform: uppercase;
            margin-right: 6px;
        }
        .status-conform { background: #dcfce7; color: #166534; }
        .status-niet-conform { background: #fee2e2; color: #dc2626; }
        .status-waarschuwing { background: #fef3c7; color: #d97706; }
        .finding-item, .risk-item, .action-item {
            background: #f8fafc;
            border: 1px solid #e5e7eb;
            padding: 12px;
            margin-bottom: 12px;
            font-size: 14px;
        }
        .finding-item h4, .risk-item h4, .action-item h4 {
            font-size: 16px;
            color: #1e40af;
            margin-bottom: 8px;
        }
        .priority-high { border-left: 3px solid #dc2626; }
        .priority-midden { border-left: 3px solid #d97706; }
        .priority-laag { border-left: 3px solid #16a34a; }
        .photos-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
            gap: 6px;
            margin-top: 6px;
        }
        .photo-item {
            text-align: center;
            background: #f8fafc;
            padding: 4px;
            border: 1px solid #e5e7eb;
            font-size: 9px;
        }
        .photo-item h4 {
            font-size: 9px;
            color: #1e40af;
            margin-bottom: 2px;
        }
        .footer {
            text-align: center;
            margin-top: 15px;
            padding-top: 8px;
            border-top: 1px solid #e5e7eb;
            font-size: 9px;
            color: #666;
        }
        .compact-table {
            width: 100%;
            border-collapse: collapse;
            font-size: 10px;
        }
        .compact-table th, .compact-table td {
            border: 1px solid #e5e7eb;
            padding: 4px;
            text-align: left;
        }
        .compact-table th {
            background: #f8fafc;
            font-weight: bold;
            color: #1e40af;
        }
        @media print {
            body { background: white; }
            .page { box-shadow: none; }
        }
    </style>
</head>
<body>
    <div class="page">
        <div class="header">
            <h1>Schouwrapport</h1>
            <div class="header-info">
                <div>
                    <strong>${project.naam}</strong> | ${project.code}
                </div>
                <div>
                    ${new Date().toLocaleDateString('nl-NL')} ${new Date().toLocaleTimeString('nl-NL')}
                </div>
            </div>
        </div>
        
        <!-- Project Informatie -->
        <div class="section">
            <div class="section-title">Project Informatie</div>
            <div class="grid-2">
                <div class="info-item">
                    <span class="info-label">Opdrachtgever:</span>
                    ${project.opdrachtgever}
                </div>
                <div class="info-item">
                    <span class="info-label">Locatie:</span>
                    ${project.adres}, ${project.postcode} ${project.plaats}
                </div>
                <div class="info-item">
                    <span class="info-label">Kabellengte:</span>
                    ${project.kabellengte} meter
                </div>
                <div class="info-item">
                    <span class="info-label">Capaciteit:</span>
                    ${project.capaciteit} kW
                </div>
                <div class="info-item">
                    <span class="info-label">Nutsvoorzieningen:</span>
                    ${typeof project.nutsvoorzieningen === 'string' ? JSON.parse(project.nutsvoorzieningen).join(', ') : (Array.isArray(project.nutsvoorzieningen) ? (project.nutsvoorzieningen as string[]).join(', ') : 'Niet opgegeven')}
                </div>
                <div class="info-item">
                    <span class="info-label">Soort Aansluiting:</span>
                    ${project.soortAansluiting}
                </div>
                <div class="info-item">
                    <span class="info-label">Verharding:</span>
                    ${project.soortVerharding}
                </div>
                <div class="info-item">
                    <span class="info-label">Boring Nodig:</span>
                    ${project.boringNoodzakelijk ? 'Ja' : 'Nee'}
                </div>
            </div>
        </div>

        ${aiAnalysis ? `
        <!-- AI Analyse Bevindingen -->
        <div class="section">
            <div class="section-title">AI Analyse Bevindingen</div>
            ${aiAnalysis.findings && aiAnalysis.findings.length > 0 ? aiAnalysis.findings.map((finding: any) => `
                <div class="finding-item priority-${finding.priority}">
                    <h4>
                        <span class="status-badge status-${finding.status}">${finding.status.toUpperCase()}</span>
                        ${finding.category}
                    </h4>
                    <p><strong>Beschrijving:</strong> ${finding.description}</p>
                    <p><strong>Bewijs:</strong> ${finding.evidence}</p>
                    <p><strong>Prioriteit:</strong> ${finding.priority} | <strong>Bron:</strong> ${finding.source}</p>
                </div>
            `).join('') : '<p>Geen bevindingen van de AI analyse.</p>'}
        </div>

        <!-- Risico's -->
        <div class="section">
            <div class="section-title">Geïdentificeerde Risico's</div>
            ${aiAnalysis.risks && aiAnalysis.risks.length > 0 ? aiAnalysis.risks.map((risk: any) => `
                <div class="risk-item">
                    <h4>${risk.type}</h4>
                    <p><strong>Beschrijving:</strong> ${risk.description}</p>
                    <p><strong>Severity:</strong> ${risk.severity} | <strong>Mitigatie:</strong> ${risk.mitigation}</p>
                </div>
            `).join('') : '<p>Geen risico\'s geïdentificeerd.</p>'}
        </div>

        <!-- Actiepunten -->
        <div class="section">
            <div class="section-title">Actiepunten</div>
            ${aiAnalysis.actions && aiAnalysis.actions.length > 0 ? aiAnalysis.actions.map((action: any) => `
                <div class="action-item">
                    <h4>${action.title}</h4>
                    <p><strong>Prioriteit:</strong> <span class="status-badge status-${action.priority === 'hoog' ? 'niet-conform' : action.priority === 'midden' ? 'waarschuwing' : 'conform'}">${action.priority.toUpperCase()}</span></p>
                    <p><strong>Beschrijving:</strong> ${action.description}</p>
                    <p><strong>Deadline:</strong> ${action.deadline}</p>
                </div>
            `).join('') : '<p>Geen actiepunten gedefinieerd.</p>'}
        </div>
        ` : '<div class="section"><div class="section-title">AI Analyse</div><p>Geen AI analyse beschikbaar voor dit project.</p></div>'}

        <!-- Foto's -->
        <div class="section">
            <div class="section-title">Foto's (${project.photos?.length || 0} items)</div>
            ${project.photos && project.photos.length > 0 ? `
                <div class="photos-grid">
                    ${project.photos.map((foto: any) => `
                        <div class="photo-item">
                            <h4>${foto.categorie}</h4>
                            <p><strong>URL:</strong> ${foto.url}</p>
                            ${foto.ocrText ? `<p><strong>OCR:</strong> ${foto.ocrText.substring(0, 30)}...</p>` : ''}
                            ${foto.exifData ? `<p><strong>Camera:</strong> ${JSON.parse(foto.exifData).camera || 'Onbekend'}</p>` : ''}
                        </div>
                    `).join('')}
                </div>
            ` : '<p>Geen foto\'s beschikbaar voor dit project.</p>'}
        </div>

        <!-- Bronnen -->
        ${aiAnalysis && aiAnalysis.citations && aiAnalysis.citations.length > 0 ? `
        <div class="section">
            <div class="section-title">Bronnen</div>
            <table class="compact-table">
                <thead>
                    <tr>
                        <th>Titel</th>
                        <th>URL</th>
                        <th>Beschrijving</th>
                    </tr>
                </thead>
                <tbody>
                    ${aiAnalysis.citations.map((citation: any) => `
                        <tr>
                            <td>${citation.title}</td>
                            <td><a href="${citation.url}">${citation.url}</a></td>
                            <td>${citation.description}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
        ` : ''}

        <div class="footer">
            <p>Schouwrapport gegenereerd door Schouw Agent op ${new Date().toLocaleDateString('nl-NL')} ${new Date().toLocaleTimeString('nl-NL')}</p>
            <p>Dit rapport is automatisch gegenereerd op basis van AI-analyse en projectgegevens.</p>
        </div>
    </div>
</body>
</html>`;

    return new NextResponse(htmlContent, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Content-Disposition': `inline; filename="schouwrapport-${project.code}.html"`,
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
        'X-Frame-Options': 'SAMEORIGIN',
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