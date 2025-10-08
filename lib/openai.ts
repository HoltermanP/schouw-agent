import OpenAI from 'openai';
import type { AIAnalysis } from './schema';
import { ALL_CHECKLISTS } from './checklist';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export interface ProjectData {
  naam: string;
  code: string;
  opdrachtgever: string;
  adres: string;
  postcode: string;
  plaats: string;
  kabellengte: number;
  nutsvoorzieningen: string[];
  soortAansluiting: string;
  capaciteit: number;
  soortVerharding: string;
  boringNoodzakelijk: boolean;
  traceBeschrijving?: string;
  kruisingen?: string;
  obstakels?: string;
  buurtInformeren: boolean;
  wegafzettingNodig: boolean;
  vergunningen?: string[];
  bijzondereRisicos?: string;
}

export interface PhotoMetadata {
  categorie: string;
  exifData?: any;
  ocrText?: string;
  filename: string;
}

export async function analyzeProjectWithAI(
  projectData: ProjectData,
  photoMetadata: PhotoMetadata[]
): Promise<AIAnalysis> {
  try {
    // Controleer of we een echte API key hebben
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey || apiKey === 'sk-test-key-placeholder') {
      // Using fallback AI analysis (no real API key)
      return generateFallbackAnalysis(projectData, photoMetadata);
    }

    // Bouw context van foto's
    const photoContext = photoMetadata.map(photo => {
      let context = `Categorie: ${photo.categorie}`;
      if (photo.exifData) {
        context += `\nEXIF: ${JSON.stringify(photo.exifData)}`;
      }
      if (photo.ocrText) {
        context += `\nOCR tekst: ${photo.ocrText}`;
      }
      context += `\nBestandsnaam: ${photo.filename}`;
      return context;
    }).join('\n\n');

    // Bouw checklist context
    const checklistContext = ALL_CHECKLISTS.map(item => 
      `${item.title}: ${item.norm} - ${item.description} (Bron: ${item.source})`
    ).join('\n');

    const systemPrompt = `Je bent een expert in Nederlandse nutsvoorzieningen (Liander & Vitens) en schouwrapportage. 
    
Je taak is om projectdata en foto's te analyseren tegen de actuele eisen van Liander en Vitens.

BELANGRIJKE RICHTLIJNEN:
1. Gebruik ALLEEN de gegeven checklist items als referentie
2. Wees specifiek en concreet in je bevindingen
3. Vermeld altijd de bron van je informatie
4. Geef duidelijke prioriteiten (hoog/midden/laag)
5. Wees kritisch maar eerlijk - als iets onbekend is, zeg dat dan
6. Focus op veiligheid en compliance

CHECKLIST ITEMS:
${checklistContext}

FORMAT:
- Status: conform/niet-conform/onbekend
- Toelichting: specifieke uitleg
- Bewijsfoto: welke foto's zijn nodig
- Bron: exacte bronvermelding
- Prioriteit: hoog/midden/laag

Analyseer het project en geef een gestructureerde beoordeling.`;

    const userPrompt = `PROJECTGEGEVENS:
${JSON.stringify(projectData, null, 2)}

FOTO CONTEXT:
${photoContext}

Analyseer dit project tegen de Liander en Vitens eisen. Geef voor elk relevant checklist item een beoordeling met status, toelichting, benodigde bewijsfoto's, bronvermelding en prioriteit.

Focus op:
1. Meterkast eisen (afmetingen, toegankelijkheid, hoofdschakelaar, ventilatie, aarding)
2. Sleuf eisen (diepte, breedte, zandlaag, markeringstape, mantelbuis)
3. Watermeter eisen (vorstvrij, bereikbaarheid, afsluiters)
4. Waterleiding eisen (diepte, markering)
5. Veiligheid en vergunningen

Geef je antwoord als JSON in het volgende formaat:
{
  "findings": [
    {
      "category": "meterkast",
      "status": "conform|niet-conform|onbekend",
      "description": "Specifieke toelichting",
      "evidence": "Welke foto's zijn nodig",
      "priority": "hoog|midden|laag",
      "source": "Exacte bron",
      "url": "URL indien beschikbaar"
    }
  ],
  "risks": [
    {
      "type": "Type risico",
      "severity": "hoog|midden|laag",
      "description": "Beschrijving van het risico",
      "mitigation": "Hoe te beperken"
    }
  ],
  "actions": [
    {
      "action": "Specifieke actie",
      "responsible": "Wie is verantwoordelijk",
      "deadline": "Wanneer (optioneel)",
      "priority": "hoog|midden|laag"
    }
  ],
  "citations": [
    {
      "title": "Titel van bron",
      "url": "URL",
      "date": "Datum raadpleging",
      "relevance": "Waarom relevant"
    }
  ]
}`;

    const completion = await openai.chat.completions.create({
      model: process.env.AI_MODEL || 'gpt-4',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      temperature: parseFloat(process.env.AI_TEMPERATURE || '0.3'),
      max_tokens: parseInt(process.env.AI_MAX_TOKENS || '4000'),
    });

    const response = completion.choices[0]?.message?.content;
    if (!response) {
      throw new Error('Geen response van OpenAI');
    }

    // Parse JSON response
    const analysis = JSON.parse(response);
    
    // Valideer tegen schema
    return AIAnalysis.parse(analysis);

  } catch (error) {
    // OpenAI API error occurred
    
    // Fallback response bij fout
    return generateFallbackAnalysis(projectData, photoMetadata);
  }
}

// Fallback AI analyse voor demo doeleinden
function generateFallbackAnalysis(projectData: ProjectData, photoMetadata: PhotoMetadata[]): AIAnalysis {
  const findings = [];
  const risks = [];
  const actions = [];
  const citations = [];

  // Analyseer project data en genereer realistische bevindingen
  if (projectData.nutsvoorzieningen.includes('elektra')) {
    findings.push({
      category: 'meterkast',
      status: 'onbekend' as const,
      description: 'Meterkast moet worden gecontroleerd op afmetingen, toegankelijkheid en hoofdschakelaar',
      evidence: 'Foto van meterkast met meetlint voor afmetingen',
      priority: 'hoog' as const,
      source: 'Liander meterkast richtlijnen',
      url: 'https://www.liander.nl/meterkast/richtlijnen-en-eisen'
    });
  }

  if (projectData.nutsvoorzieningen.includes('gas')) {
    findings.push({
      category: 'sleuf',
      status: 'onbekend' as const,
      description: 'Sleufdiepte moet minimaal 0.8m zijn voor gasleiding vorstbescherming',
      evidence: 'Meetlintfoto van sleufdiepte',
      priority: 'hoog' as const,
      source: 'Liander inmeetvoorwaarden',
      url: 'https://bestekken.liander.nl/qa_faqs/waar-kan-ik-de-meest-actuele-inmeetvoorwaarden-en-aanlevereisen-voor-ondergrondse-revisie-vinden/'
    });
  }

  if (projectData.nutsvoorzieningen.includes('water')) {
    findings.push({
      category: 'watermeter',
      status: 'onbekend' as const,
      description: 'Watermeter moet vorstvrij en bereikbaar zijn geplaatst',
      evidence: 'Foto van watermeter locatie',
      priority: 'midden' as const,
      source: 'Vitens aansluitvoorwaarden',
      url: 'https://www.vitens.nl/zakelijk/waterleiding-aansluiten'
    });
  }

  // Voeg risico's toe op basis van project data
  if (projectData.bijzondereRisicos) {
    risks.push({
      type: 'Bijzondere risico\'s',
      severity: 'hoog' as const,
      description: projectData.bijzondereRisicos,
      mitigation: 'Extra voorzorgsmaatregelen nemen en specialistisch advies inwinnen'
    });
  }

  if (projectData.boringNoodzakelijk) {
    risks.push({
      type: 'Boring vereist',
      severity: 'midden' as const,
      description: 'Boring noodzakelijk voor leidingaanleg',
      mitigation: 'Gespecialiseerd boorbedrijf inschakelen'
    });
  }

  // Genereer acties op basis van bevindingen
  findings.forEach(finding => {
    if (finding.status === 'onbekend') {
      actions.push({
        action: `Controleer ${finding.category}: ${finding.description}`,
        responsible: 'Uitvoerder',
        deadline: 'Voor start werkzaamheden',
        priority: finding.priority
      });
    }
  });

  // Voeg algemene acties toe
  if (projectData.buurtInformeren) {
    actions.push({
      action: 'Buurt informeren over werkzaamheden',
      responsible: 'Projectleider',
      deadline: '2 weken voor start',
      priority: 'midden' as const
    });
  }

  if (projectData.wegafzettingNodig) {
    actions.push({
      action: 'Wegafzetting regelen',
      responsible: 'Uitvoerder',
      deadline: 'Voor start werkzaamheden',
      priority: 'hoog' as const
    });
  }

  // Voeg bronnen toe
  citations.push({
    title: 'Liander meterkast richtlijnen',
    url: 'https://www.liander.nl/meterkast/richtlijnen-en-eisen',
    date: new Date().toISOString().split('T')[0],
    relevance: 'Meterkast afmetingen en toegankelijkheid'
  });

  citations.push({
    title: 'Liander inmeetvoorwaarden',
    url: 'https://bestekken.liander.nl/qa_faqs/waar-kan-ik-de-meest-actuele-inmeetvoorwaarden-en-aanlevereisen-voor-ondergrondse-revisie-vinden/',
    date: new Date().toISOString().split('T')[0],
    relevance: 'Sleufdiepte en -breedte eisen'
  });

  if (projectData.nutsvoorzieningen.includes('water')) {
    citations.push({
      title: 'Vitens aansluitvoorwaarden',
      url: 'https://www.vitens.nl/zakelijk/waterleiding-aansluiten',
      date: new Date().toISOString().split('T')[0],
      relevance: 'Waterleiding aansluiting eisen'
    });
  }

  return {
    findings,
    risks,
    actions,
    citations
  };
}

export async function generateReportContent(
  projectData: ProjectData,
  analysis: AIAnalysis,
  photoMetadata: PhotoMetadata[]
): Promise<string> {
  const systemPrompt = `Je bent een expert in het schrijven van professionele schouwrapporten voor Nederlandse nutsvoorzieningen.

Schrijf een gestructureerd schouwrapport in het Nederlands met de volgende secties:

1. PROJECTGEGEVENS
2. BESTAANDE SITUATIE (met foto-overzicht per categorie)
3. TECHNISCHE BEOORDELING (tegen Liander & Vitens eisen)
4. CIVIEL & VEILIGHEID
5. VERGUNNINGEN & MELDINGEN
6. MATERIAAL & MIDDELEN
7. ACTIEPUNTEN & OPEN VRAGEN
8. SAMENVATTING/ADVIES
9. BRONNEN
10. BIJLAGEN

Gebruik professionele taal, wees specifiek en concreet, en verwijs naar foto's en bronnen.`;

  const userPrompt = `Genereer een schouwrapport voor:

PROJECT: ${projectData.naam} (${projectData.code})
LOCATIE: ${projectData.adres}, ${projectData.postcode} ${projectData.plaats}
OPDRACHTGEVER: ${projectData.opdrachtgever}

ANALYSE RESULTATEN:
${JSON.stringify(analysis, null, 2)}

FOTO'S:
${photoMetadata.map(p => `- ${p.categorie}: ${p.filename}`).join('\n')}

Schrijf een compleet, professioneel schouwrapport.`;

  try {
    const completion = await openai.chat.completions.create({
      model: process.env.AI_MODEL || 'gpt-4',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.3,
      max_tokens: 4000,
    });

    return completion.choices[0]?.message?.content || 'Rapport kon niet worden gegenereerd.';
  } catch (error) {
    // Report generation error occurred
    return 'Rapportgeneratie gefaald. Handmatige invoer vereist.';
  }
}
