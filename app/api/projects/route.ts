import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request: NextRequest) {
  try {
    // Return mock data to avoid database calls during build
    const projects = [
      {
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
      {
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
      },
      {
        id: 3,
        naam: 'Wateraansluiting Rotterdam Zuid',
        code: 'RZ-2024-003',
        opdrachtgever: 'Vitens',
        adres: 'Maasboulevard 789',
        postcode: '3071 AA',
        plaats: 'Rotterdam',
        kabellengte: 200,
        nutsvoorzieningen: '["water"]',
        soortAansluiting: 'nieuw',
        capaciteit: 15,
        soortVerharding: 'tegels',
        boringNoodzakelijk: true,
        traceBeschrijving: 'Nieuwe wateraansluiting voor appartementencomplex',
        kruisingen: 'Kruising met elektrakabel op 0.5 meter diepte',
        obstakels: 'Rioolbuis op 1.5 meter diepte',
        buurtInformeren: true,
        buurtNotitie: 'Informatiebrief verspreid',
        wegafzettingNodig: true,
        wegafzettingPeriode: '1 week in mei',
        vergunningen: '["KLIC", "Watervergunning"]',
        bijzondereRisicos: 'Hoogwater risico - extra maatregelen',
        uitvoerder: 'Vitens',
        toezichthouder: 'Waterschap Hollandse Delta',
        bereikbaarheden: '24/7 bereikbaar',
        createdAt: new Date('2024-01-30').toISOString(),
        updatedAt: new Date('2024-03-10').toISOString(),
        photos: [
          {
            id: 4,
            url: '/uploads/3/locatie/locatie-001.jpg',
            categorie: 'locatie',
            exifData: '{"camera": "Canon EOS R5", "location": "51.9244,4.4777"}',
            ocrText: 'Locatie wateraansluiting Rotterdam Zuid',
            createdAt: new Date('2024-02-01').toISOString()
          },
          {
            id: 5,
            url: '/uploads/3/omgevingssituatie/omgeving-001.jpg',
            categorie: 'omgevingssituatie',
            exifData: '{"camera": "Canon EOS R5", "location": "51.9244,4.4777"}',
            ocrText: 'Omgevingssituatie Maasboulevard',
            createdAt: new Date('2024-02-01').toISOString()
          }
        ],
        inspections: [
          {
            id: 3,
            findings: JSON.stringify([
              {
                status: 'waarschuwing',
                category: 'Water',
                description: 'Hoogwater risico gedetecteerd',
                evidence: 'Locatie onder zeeniveau',
                priority: 'midden',
                source: 'Vitens Richtlijnen',
                url: 'https://www.vitens.nl/richtlijnen'
              }
            ]),
            risks: JSON.stringify([
              {
                type: 'Water',
                description: 'Risico op wateroverlast bij hoogwater',
                severity: 'midden',
                mitigation: 'Extra pompen installeren'
              }
            ]),
            actions: JSON.stringify([
              {
                title: 'Hoogwater bescherming',
                description: 'Extra maatregelen tegen hoogwater',
                priority: 'midden',
                deadline: '2024-05-01'
              }
            ]),
            citations: JSON.stringify([
              {
                title: 'Vitens Waterrichtlijnen 2024',
                url: 'https://www.vitens.nl/waterrichtlijnen',
                description: 'Richtlijnen voor wateraansluitingen'
              }
            ]),
            createdAt: new Date('2024-03-10').toISOString()
          }
        ],
        reports: []
      },
      {
        id: 4,
        naam: 'Gasvervanging Den Haag',
        code: 'DH-2024-004',
        opdrachtgever: 'Stedin',
        adres: 'Lange Voorhout 12',
        postcode: '2514 EA',
        plaats: 'Den Haag',
        kabellengte: 300,
        nutsvoorzieningen: '["gas"]',
        soortAansluiting: 'vervangen',
        capaciteit: 30,
        soortVerharding: 'klinkers',
        boringNoodzakelijk: false,
        traceBeschrijving: 'Vervangen oude gasleiding',
        kruisingen: 'Kruising met elektra en water',
        obstakels: 'Boomwortels en oude fundering',
        buurtInformeren: true,
        buurtNotitie: 'Buurtbijeenkomst georganiseerd',
        wegafzettingNodig: true,
        wegafzettingPeriode: '3 weken in juni',
        vergunningen: '["KLIC", "Gasvergunning"]',
        bijzondereRisicos: 'Monumentale locatie - extra voorzichtigheid',
        uitvoerder: 'Stedin',
        toezichthouder: 'Gemeente Den Haag',
        bereikbaarheden: 'Werkdagen 7:00-19:00',
        createdAt: new Date('2024-02-15').toISOString(),
        updatedAt: new Date('2024-03-25').toISOString(),
        photos: [
          {
            id: 6,
            url: '/uploads/4/sleuf/sleuf-001.jpg',
            categorie: 'sleuf',
            exifData: '{"camera": "iPhone 14 Pro", "location": "52.0705,4.3007"}',
            ocrText: 'Sleuf voor gasvervanging Den Haag',
            createdAt: new Date('2024-02-20').toISOString()
          },
          {
            id: 7,
            url: '/uploads/4/bijzonderheden/bijzonder-001.jpg',
            categorie: 'bijzonderheden',
            exifData: '{"camera": "iPhone 14 Pro", "location": "52.0705,4.3007"}',
            ocrText: 'Monumentale locatie - extra aandacht',
            createdAt: new Date('2024-02-20').toISOString()
          }
        ],
        inspections: [
          {
            id: 4,
            findings: JSON.stringify([
              {
                status: 'conform',
                category: 'Gas',
                description: 'Nieuwe gasleiding voldoet aan eisen',
                evidence: 'Technische inspectie uitgevoerd',
                priority: 'laag',
                source: 'Stedin Gasrichtlijnen',
                url: 'https://www.stedin.nl/gasrichtlijnen'
              },
              {
                status: 'waarschuwing',
                category: 'Monument',
                description: 'Extra voorzichtigheid bij monumentale locatie',
                evidence: 'Foto toont historische waarde',
                priority: 'midden',
                source: 'Monumentenwet',
                url: 'https://www.cultureelerfgoed.nl/monumentenwet'
              }
            ]),
            risks: JSON.stringify([
              {
                type: 'Monument',
                description: 'Risico op schade aan historische waarde',
                severity: 'midden',
                mitigation: 'Extra archeologische begeleiding'
              }
            ]),
            actions: JSON.stringify([
              {
                title: 'Archeologische begeleiding',
                description: 'Extra begeleiding bij monumentale locatie',
                priority: 'midden',
                deadline: '2024-06-15'
              }
            ]),
            citations: JSON.stringify([
              {
                title: 'Stedin Gasrichtlijnen 2024',
                url: 'https://www.stedin.nl/gasrichtlijnen',
                description: 'Richtlijnen voor gasinstallaties'
              }
            ]),
            createdAt: new Date('2024-03-25').toISOString()
          }
        ],
        reports: []
      },
      {
        id: 5,
        naam: 'Tijdelijke Aansluiting Festival',
        code: 'FEST-2024-005',
        opdrachtgever: 'Festival Organisatie',
        adres: 'Park de Hoge Veluwe',
        postcode: '6731 AW',
        plaats: 'Otterlo',
        kabellengte: 500,
        nutsvoorzieningen: '["elektra"]',
        soortAansluiting: 'tijdelijk',
        capaciteit: 100,
        soortVerharding: 'onverhard',
        boringNoodzakelijk: false,
        traceBeschrijving: 'Tijdelijke elektra voor festival',
        kruisingen: 'Geen kruisingen',
        obstakels: 'Bomen en natuur',
        buurtInformeren: true,
        buurtNotitie: 'Natuurorganisaties geïnformeerd',
        wegafzettingNodig: false,
        wegafzettingPeriode: 'Niet van toepassing',
        vergunningen: '["Natuurvergunning", "Evenementenvergunning"]',
        bijzondereRisicos: 'Natuurgebied - extra milieumaatregelen',
        uitvoerder: 'Alliander',
        toezichthouder: 'Staatsbosbeheer',
        bereikbaarheden: '24/7 tijdens festival',
        createdAt: new Date('2024-03-01').toISOString(),
        updatedAt: new Date('2024-03-30').toISOString(),
        photos: [
          {
            id: 8,
            url: '/uploads/5/locatie/locatie-festival.jpg',
            categorie: 'locatie',
            exifData: '{"camera": "DJI Mavic 3", "location": "52.0333,5.8167"}',
            ocrText: 'Festival locatie Hoge Veluwe',
            createdAt: new Date('2024-03-05').toISOString()
          }
        ],
        inspections: [
          {
            id: 5,
            findings: JSON.stringify([
              {
                status: 'conform',
                category: 'Elektra',
                description: 'Tijdelijke installatie voldoet aan eisen',
                evidence: 'Technische berekening uitgevoerd',
                priority: 'laag',
                source: 'NEN 1010',
                url: 'https://www.nen.nl/nen-1010'
              },
              {
                status: 'waarschuwing',
                category: 'Milieu',
                description: 'Extra aandacht voor natuurgebied',
                evidence: 'Locatie in beschermd natuurgebied',
                priority: 'midden',
                source: 'Natuurbeschermingswet',
                url: 'https://www.rijksoverheid.nl/natuurbeschermingswet'
              }
            ]),
            risks: JSON.stringify([
              {
                type: 'Milieu',
                description: 'Risico op schade aan natuur',
                severity: 'midden',
                mitigation: 'Extra milieumaatregelen toepassen'
              }
            ]),
            actions: JSON.stringify([
              {
                title: 'Milieumaatregelen',
                description: 'Extra maatregelen voor natuurgebied',
                priority: 'midden',
                deadline: '2024-04-15'
              }
            ]),
            citations: JSON.stringify([
              {
                title: 'Natuurbeschermingswet 2024',
                url: 'https://www.rijksoverheid.nl/natuurbeschermingswet',
                description: 'Wetgeving voor natuurgebieden'
              }
            ]),
            createdAt: new Date('2024-03-30').toISOString()
          }
        ],
        reports: []
      }
    ];

    return NextResponse.json({ projects });
  } catch (error) {
    return NextResponse.json(
      { error: 'Projecten ophalen gefaald' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Return mock project creation
    const project = {
      id: Date.now(),
      ...body,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    return NextResponse.json({
      project,
      message: 'Project succesvol aangemaakt'
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Project aanmaken gefaald' },
      { status: 500 }
    );
  }
}