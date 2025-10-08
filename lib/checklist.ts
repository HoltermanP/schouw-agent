// Checklist items voor Liander en Vitens eisen
// Gebaseerd op actuele publieke documentatie (geraadpleegd op 7 oktober 2025)

export interface ChecklistItem {
  id: string;
  category: string;
  title: string;
  norm: string;
  description: string;
  evidence: string;
  priority: 'hoog' | 'midden' | 'laag';
  source: string;
  url: string;
  date: string;
}

export const LIANDER_CHECKLIST: ChecklistItem[] = [
  // Meterkast eisen
  {
    id: 'meterkast-afmetingen',
    category: 'meterkast',
    title: 'Meterkast afmetingen',
    norm: 'Minimaal 0.6m x 0.4m x 0.2m',
    description: 'De meterkast moet voldoen aan de minimale afmetingen voor installatie en onderhoud',
    evidence: 'Meetlintfoto van meterkast afmetingen',
    priority: 'hoog',
    source: 'Liander meterkast richtlijnen',
    url: 'https://www.liander.nl/meterkast/richtlijnen-en-eisen',
    date: '7 oktober 2025'
  },
  {
    id: 'meterkast-toegankelijkheid',
    category: 'meterkast',
    title: 'Toegankelijkheid meterkast',
    norm: '1.2m vrije ruimte voor meterkast',
    description: 'Er mogen geen obstakels voor de meterkast staan',
    evidence: 'Foto van vrije ruimte rond meterkast',
    priority: 'hoog',
    source: 'Liander meterkast voorbereiding',
    url: 'https://www.liander.nl/meterkast/meterkast-voorbereiden-voor-werkzaamheden',
    date: '7 oktober 2025'
  },
  {
    id: 'hoofdschakelaar',
    category: 'meterkast',
    title: 'Hoofdschakelaar aanwezig',
    norm: 'Verplichte hoofdschakelaar in meterkast',
    description: 'Hoofdschakelaar is noodzakelijk voor veiligheid tijdens werkzaamheden',
    evidence: 'Foto van hoofdschakelaar in meterkast',
    priority: 'hoog',
    source: 'Liander meterkast voorbereiding',
    url: 'https://www.liander.nl/meterkast/meterkast-voorbereiden-voor-werkzaamheden',
    date: '7 oktober 2025'
  },
  {
    id: 'ventilatie',
    category: 'meterkast',
    title: 'Ventilatie meterkast',
    norm: 'Voldoende ventilatieopeningen aanwezig',
    description: 'Ventilatie voorkomt oververhitting van apparatuur',
    evidence: 'Foto van ventilatieopeningen',
    priority: 'midden',
    source: 'Liander meterkast richtlijnen',
    url: 'https://www.liander.nl/meterkast/richtlijnen-en-eisen',
    date: '7 oktober 2025'
  },
  {
    id: 'aarding',
    category: 'meterkast',
    title: 'Aarding meterkast',
    norm: 'Correcte aarding aanwezig',
    description: 'Aarding is essentieel voor veiligheid van installatie',
    evidence: 'Foto van aardrail en aansluitingen',
    priority: 'hoog',
    source: 'Liander meterkast informatie',
    url: 'https://www.liander.nl/meterkast',
    date: '7 oktober 2025'
  },

  // Sleuf en tracé eisen
  {
    id: 'sleuf-diepte',
    category: 'sleuf',
    title: 'Sleufdiepte elektra',
    norm: 'Minimaal 0.6m diepte voor elektrakabels',
    description: 'Voldoende diepte voor bescherming en onderhoud',
    evidence: 'Meetlintfoto van sleufdiepte',
    priority: 'hoog',
    source: 'Liander inmeetvoorwaarden',
    url: 'https://bestekken.liander.nl/qa_faqs/waar-kan-ik-de-meest-actuele-inmeetvoorwaarden-en-aanlevereisen-voor-ondergrondse-revisie-vinden/',
    date: '7 oktober 2025'
  },
  {
    id: 'sleuf-breedte',
    category: 'sleuf',
    title: 'Sleufbreedte',
    norm: 'Minimaal 0.3m breedte',
    description: 'Voldoende ruimte voor kabels en werkzaamheden',
    evidence: 'Meetlintfoto van sleufbreedte',
    priority: 'midden',
    source: 'Liander inmeetvoorwaarden',
    url: 'https://bestekken.liander.nl/qa_faqs/waar-kan-ik-de-meest-actuele-inmeetvoorwaarden-en-aanlevereisen-voor-ondergrondse-revisie-vinden/',
    date: '7 oktober 2025'
  },
  {
    id: 'zandlaag',
    category: 'sleuf',
    title: 'Zandlaag boven kabels',
    norm: '10cm zandlaag boven kabels',
    description: 'Extra bescherming tegen beschadiging',
    evidence: 'Foto van zandlaag boven kabels',
    priority: 'hoog',
    source: 'Liander inmeetvoorwaarden',
    url: 'https://bestekken.liander.nl/qa_faqs/waar-kan-ik-de-meest-actuele-inmeetvoorwaarden-en-aanlevereisen-voor-ondergrondse-revisie-vinden/',
    date: '7 oktober 2025'
  },
  {
    id: 'markeringstape',
    category: 'sleuf',
    title: 'Markeringstape',
    norm: 'Gele markeringstape boven kabels',
    description: 'Waarschuwing voor aanwezigheid ondergrondse kabels',
    evidence: 'Foto van markeringstape',
    priority: 'hoog',
    source: 'Liander inmeetvoorwaarden',
    url: 'https://bestekken.liander.nl/qa_faqs/waar-kan-ik-de-meest-actuele-inmeetvoorwaarden-en-aanlevereisen-voor-ondergrondse-revisie-vinden/',
    date: '7 oktober 2025'
  },
  {
    id: 'mantelbuis',
    category: 'sleuf',
    title: 'Mantelbuis bij kruisingen',
    norm: 'Mantelbuis verplicht bij kruisingen',
    description: 'Bescherming tegen mechanische beschadiging',
    evidence: 'Foto van mantelbuis bij kruisingen',
    priority: 'hoog',
    source: 'Liander inmeetvoorwaarden',
    url: 'https://bestekken.liander.nl/qa_faqs/waar-kan-ik-de-meest-actuele-inmeetvoorwaarden-en-aanlevereisen-voor-ondergrondse-revisie-vinden/',
    date: '7 oktober 2025'
  }
];

export const VITENS_CHECKLIST: ChecklistItem[] = [
  // Watermeter plaatsing
  {
    id: 'watermeter-vorstvrij',
    category: 'watermeter',
    title: 'Vorstvrije plaatsing watermeter',
    norm: 'Watermeter vorstvrij geïnstalleerd',
    description: 'Voorkomt bevriezing en schade aan meter',
    evidence: 'Foto van watermeter plaatsing',
    priority: 'hoog',
    source: 'Vitens watermeter eisen',
    url: 'https://www.vitens.nl',
    date: '7 oktober 2025'
  },
  {
    id: 'watermeter-bereikbaarheid',
    category: 'watermeter',
    title: 'Bereikbaarheid watermeter',
    norm: 'Goed bereikbaar voor onderhoud',
    description: 'Vergemakkelijkt inspectie en reparaties',
    evidence: 'Foto van toegang tot watermeter',
    priority: 'hoog',
    source: 'Vitens watermeter eisen',
    url: 'https://www.vitens.nl',
    date: '7 oktober 2025'
  },
  {
    id: 'afsluiters',
    category: 'watermeter',
    title: 'Afsluiters watermeter',
    norm: 'Afsluiters aanwezig voor watermeter',
    description: 'Mogelijkheid om watertoevoer af te sluiten',
    evidence: 'Foto van afsluiters',
    priority: 'hoog',
    source: 'Vitens watermeter eisen',
    url: 'https://www.vitens.nl',
    date: '7 oktober 2025'
  },
  {
    id: 'terugstroombeveiliging',
    category: 'watermeter',
    title: 'Terugstroombeveiliging',
    norm: 'Terugslagklep waar van toepassing',
    description: 'Voorkomt terugstromen in leidingnet',
    evidence: 'Foto van terugslagklep',
    priority: 'midden',
    source: 'Vitens watermeter eisen',
    url: 'https://www.vitens.nl',
    date: '7 oktober 2025'
  },

  // Waterleiding eisen
  {
    id: 'waterleiding-diepte',
    category: 'waterleiding',
    title: 'Diepte waterleiding',
    norm: 'Minimaal 1.0m diepte voor waterleiding',
    description: 'Vorstvrije diepte voor waterleiding',
    evidence: 'Meetlintfoto van leidingdiepte',
    priority: 'hoog',
    source: 'Vitens leidingeisen',
    url: 'https://www.vitens.nl',
    date: '7 oktober 2025'
  },
  {
    id: 'waterleiding-markering',
    category: 'waterleiding',
    title: 'Markering waterleiding',
    norm: 'Blauwe markeringstape boven waterleiding',
    description: 'Identificatie van waterleiding',
    evidence: 'Foto van blauwe markeringstape',
    priority: 'hoog',
    source: 'Vitens leidingeisen',
    url: 'https://www.vitens.nl',
    date: '7 oktober 2025'
  }
];

export const ALL_CHECKLISTS = [...LIANDER_CHECKLIST, ...VITENS_CHECKLIST];

export function getChecklistByCategory(category: string): ChecklistItem[] {
  return ALL_CHECKLISTS.filter(item => item.category === category);
}

export function getChecklistByPriority(priority: 'hoog' | 'midden' | 'laag'): ChecklistItem[] {
  return ALL_CHECKLISTS.filter(item => item.priority === priority);
}
