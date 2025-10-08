import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const projectId = parseInt(params.id);
    
    // Return mock project data based on project ID
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

    const project = projects[projectId as keyof typeof projects] || {
      id: projectId,
      naam: `Test Project ${projectId}`,
      code: `TP${projectId.toString().padStart(3, '0')}`,
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

    return NextResponse.json({ project });

  } catch (error) {
    return NextResponse.json(
      { error: 'Project ophalen gefaald' },
      { status: 500 }
    );
  }
}