import { z } from 'zod';

// Photo categories enum
export const PhotoCategory = {
  METERKAST: 'meterkast',
  GEBOUW: 'gebouw',
  LOCATIE: 'locatie',
  OMGEVINGSSITUATIE: 'omgevingssituatie',
  SLEUF: 'sleuf',
  BIJZONDERHEDEN: 'bijzonderheden'
} as const;

export type PhotoCategoryType = typeof PhotoCategory[keyof typeof PhotoCategory];

// Project schema
export const projectSchema = z.object({
  naam: z.string().min(1, 'Projectnaam is verplicht'),
  code: z.string().min(1, 'Projectcode is verplicht'),
  opdrachtgever: z.string().min(1, 'Opdrachtgever is verplicht'),
  adres: z.string().min(1, 'Adres is verplicht'),
  postcode: z.string().regex(/^[1-9][0-9]{3}\s?[A-Z]{2}$/, 'Ongeldige postcode (formaat: 1234 AB)'),
  plaats: z.string().min(1, 'Plaats is verplicht'),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  kabellengte: z.number().positive('Kabellengte moet een positief getal zijn'),
  nutsvoorzieningen: z.array(z.enum(['elektra', 'gas', 'water'])).min(1, 'Selecteer minimaal één nutsvoorziening'),
  soortAansluiting: z.enum(['nieuw', 'verzwaren', 'vervangen', 'tijdelijk']),
  capaciteit: z.number().positive('Capaciteit moet een positief getal zijn'),
  soortVerharding: z.enum(['klinkers', 'asfalt', 'tegels', 'onverhard']),
  boringNoodzakelijk: z.boolean(),
  traceBeschrijving: z.string().optional(),
  kruisingen: z.string().optional(),
  obstakels: z.string().optional(),
  buurtInformeren: z.boolean(),
  buurtNotitie: z.string().optional(),
  wegafzettingNodig: z.boolean(),
  wegafzettingPeriode: z.string().optional(),
  vergunningen: z.array(z.string()).optional(),
  bijzondereRisicos: z.string().optional(),
  uitvoerder: z.string().min(1, 'Uitvoerder is verplicht'),
  toezichthouder: z.string().min(1, 'Toezichthouder is verplicht'),
  bereikbaarheden: z.string().min(1, 'Bereikbaarheden zijn verplicht'),
});

export type Project = z.infer<typeof projectSchema>;

// Photo upload schema
export const photoUploadSchema = z.object({
  projectId: z.number().int().positive(),
  categorie: z.enum(['meterkast', 'gebouw', 'locatie', 'omgevingssituatie', 'sleuf', 'bijzonderheden']),
  files: z.array(z.any()).min(1, 'Selecteer minimaal één foto'),
});

export type PhotoUpload = z.infer<typeof photoUploadSchema>;

// AI Analysis result schema
export const aiAnalysisSchema = z.object({
  findings: z.array(z.object({
    category: z.string(),
    status: z.enum(['conform', 'niet-conform', 'onbekend']),
    description: z.string(),
    evidence: z.string(),
    priority: z.enum(['hoog', 'midden', 'laag']),
    source: z.string(),
    url: z.string().url().optional(),
  })),
  risks: z.array(z.object({
    type: z.string(),
    severity: z.enum(['hoog', 'midden', 'laag']),
    description: z.string(),
    mitigation: z.string(),
  })),
  actions: z.array(z.object({
    action: z.string(),
    responsible: z.string(),
    deadline: z.string().optional(),
    priority: z.enum(['hoog', 'midden', 'laag']),
  })),
  citations: z.array(z.object({
    title: z.string(),
    url: z.string().url(),
    date: z.string(),
    relevance: z.string(),
  })),
});

export type AIAnalysis = z.infer<typeof aiAnalysisSchema>;

// Report schema
export const reportSchema = z.object({
  projectId: z.number().int().positive(),
  content: z.string().min(1, 'Rapportinhoud is verplicht'),
});

export type Report = z.infer<typeof reportSchema>;
