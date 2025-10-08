import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { projectId } = await request.json();

    if (!projectId) {
      return NextResponse.json({ error: 'Project ID is verplicht' }, { status: 400 });
    }

    // Get project data
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
        photos: [
          {
            id: 3,
            url: '/uploads/2/meterkast/meterkast-002.jpg',
            categorie: 'meterkast',
            exifData: '{"camera": "Samsung Galaxy S21", "location": "52.0907,5.1214"}',
            ocrText: 'Bestaande meterkast - 3x35A',
            createdAt: new Date('2024-02-05').toISOString()
          }
        ]
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
      photos: []
    };

    // Prepare project data for AI analysis
    const projectData = {
      naam: project.naam,
      code: project.code,
      opdrachtgever: project.opdrachtgever,
      locatie: `${project.adres}, ${project.postcode} ${project.plaats}`,
      kabellengte: project.kabellengte,
      capaciteit: project.capaciteit,
      nutsvoorzieningen: typeof project.nutsvoorzieningen === 'string' ? JSON.parse(project.nutsvoorzieningen) : project.nutsvoorzieningen,
      soortAansluiting: project.soortAansluiting,
      soortVerharding: project.soortVerharding,
      boringNoodzakelijk: project.boringNoodzakelijk,
      traceBeschrijving: project.traceBeschrijving,
      kruisingen: project.kruisingen,
      obstakels: project.obstakels,
      buurtInformeren: project.buurtInformeren,
      wegafzettingNodig: project.wegafzettingNodig,
      vergunningen: typeof project.vergunningen === 'string' ? JSON.parse(project.vergunningen) : project.vergunningen,
      bijzondereRisicos: project.bijzondereRisicos,
      uitvoerder: project.uitvoerder,
      toezichthouder: project.toezichthouder,
      bereikbaarheden: project.bereikbaarheden,
      photos: project.photos || []
    };

    // Create AI analysis prompt
    const prompt = `Je bent een expert in Nederlandse nutsnetwerken (elektra, gas, water) en schouwrapporten. Analyseer het volgende project en geef een professionele beoordeling volgens Liander, Vitens en Stedin richtlijnen.

PROJECT GEGEVENS:
- Project: ${projectData.naam} (${projectData.code})
- Opdrachtgever: ${projectData.opdrachtgever}
- Locatie: ${projectData.locatie}
- Kabellengte: ${projectData.kabellengte} meter
- Capaciteit: ${projectData.capaciteit} kW
- Nutsvoorzieningen: ${projectData.nutsvoorzieningen.join(', ')}
- Soort aansluiting: ${projectData.soortAansluiting}
- Verharding: ${projectData.soortVerharding}
- Boring nodig: ${projectData.boringNoodzakelijk ? 'Ja' : 'Nee'}
- Trace beschrijving: ${projectData.traceBeschrijving}
- Kruisingen: ${projectData.kruisingen}
- Obstakels: ${projectData.obstakels}
- Buurt informeren: ${projectData.buurtInformeren ? 'Ja' : 'Nee'}
- Wegafzetting nodig: ${projectData.wegafzettingNodig ? 'Ja' : 'Nee'}
- Vergunningen: ${projectData.vergunningen.join(', ')}
- Bijzondere risico's: ${projectData.bijzondereRisicos}
- Uitvoerder: ${projectData.uitvoerder}
- Toezichthouder: ${projectData.toezichthouder}
- Bereikbaarheden: ${projectData.bereikbaarheden}

FOTO'S:
${projectData.photos.map(photo => `- ${photo.categorie}: ${photo.ocrText || 'Geen OCR tekst'}`).join('\n')}

Geef een JSON response met de volgende structuur:
{
  "findings": [
    {
      "status": "conform|niet-conform|waarschuwing",
      "category": "Meterkast|Veiligheid|Civiel|Vergunningen|etc",
      "description": "Duidelijke beschrijving van de bevinding",
      "evidence": "Bewijs of foto referentie",
      "priority": "hoog|midden|laag",
      "source": "Liander Aansluitrichtlijnen|NEN 1010|etc",
      "url": "https://www.liander.nl/aansluitrichtlijnen"
    }
  ],
  "risks": [
    {
      "type": "Veiligheid|Civiel|Juridisch|etc",
      "description": "Beschrijving van het risico",
      "severity": "hoog|midden|laag",
      "mitigation": "Voorgestelde mitigatie"
    }
  ],
  "actions": [
    {
      "title": "Titel van actiepunt",
      "description": "Beschrijving van wat er moet gebeuren",
      "priority": "hoog|midden|laag",
      "deadline": "2024-XX-XX"
    }
  ],
  "citations": [
    {
      "title": "Naam van richtlijn",
      "url": "https://www.liander.nl/richtlijnen",
      "description": "Beschrijving van de richtlijn"
    }
  ]
}

Focus op:
1. Meterkast eisen (afmetingen, toegankelijkheid, ventilatie, IP-klasse, aardrail)
2. Sleuf/route eisen (diepte, breedte, zandlaag, beschermplaat, markering)
3. Water eisen (watermeter positie, vorstvrij, toegankelijkheid, terugslagklep)
4. Omgeving/veiligheid (wegafzetting, vergunningen, buurtcommunicatie)
5. NEN 1010, Liander richtlijnen, Vitens richtlijnen

Geef realistische, professionele bevindingen gebaseerd op de projectgegevens.`;

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "Je bent een expert in Nederlandse nutsnetwerken en schouwrapporten. Geef altijd een geldige JSON response volgens het gevraagde format."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.3,
      max_tokens: 2000
    });

    const aiResponse = completion.choices[0]?.message?.content;
    
    if (!aiResponse) {
      throw new Error('Geen response van OpenAI API');
    }

    // Parse AI response
    let analysis;
    try {
      analysis = JSON.parse(aiResponse);
    } catch (parseError) {
      // Fallback if JSON parsing fails
      analysis = {
        findings: [
          {
            status: 'waarschuwing',
            category: 'AI Analyse',
            description: 'AI analyse uitgevoerd maar response kon niet worden geparsed',
            evidence: 'OpenAI API response',
            priority: 'midden',
            source: 'OpenAI GPT-4',
            url: ''
          }
        ],
        risks: [],
        actions: [],
        citations: []
      };
    }

    return NextResponse.json({
      success: true,
      analysis,
      inspectionId: 'ai-' + Date.now(),
      message: 'AI-analyse succesvol voltooid met OpenAI GPT-4'
    });

  } catch (error) {
    // AI Analysis Error occurred
    return NextResponse.json(
      { 
        error: 'AI-analyse gefaald. Probeer het opnieuw.',
        details: error instanceof Error ? error.message : 'Onbekende fout'
      },
      { status: 500 }
    );
  }
}