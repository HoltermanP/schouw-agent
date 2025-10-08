/**
 * TypeScript types voor Schouw Agent rapportage
 * Definieert de complete datastructuur voor PDF generatie
 */

export interface ProjectMeta {
  naam: string;
  code: string;
  locatie: {
    straat: string;
    postcode: string;
    plaats: string;
  };
  opdrachtgever: string;
  datum: string; // ISO string
  uitvoerder?: string;
  toezichthouder?: string;
}

export interface Nuts {
  elektra: boolean;
  gas: boolean;
  water: boolean;
  capaciteit?: number;
  kabellengte?: number;
  soortAansluiting?: string;
}

export interface Civiel {
  verharding: 'asfalt' | 'klinkers' | 'tegels' | 'onverhard';
  boring: boolean;
  buurtInformeren: boolean;
  wegafzetting: boolean;
  wegafzettingPeriode?: string;
  traceBeschrijving?: string;
  kruisingen?: string;
  obstakels?: string;
}

export interface Foto {
  id: string;
  categorie: 'meterkast' | 'gebouw' | 'locatie' | 'omgevingssituatie' | 'sleuf' | 'bijzonderheden';
  titel: string;
  bestandsnaam: string;
  datumISO: string;
  uri: string;
  exifData?: {
    gps?: {
      latitude: number;
      longitude: number;
    };
    dateTime?: string;
  };
  ocrText?: string;
}

export interface Bevinding {
  status: 'conform' | 'niet-conform' | 'onbekend';
  titel: string;
  toelichting: string;
  bewijs?: string[]; // foto ids
  prioriteit: 'hoog' | 'midden' | 'laag';
  bron?: {
    titel: string;
    url: string;
  };
}

export interface ChecklistItem {
  sectie: string;
  norm: string;
  status: 'conform' | 'niet-conform' | 'onbekend';
  opmerking?: string;
  bron: {
    titel: string;
    url: string;
  };
}

export interface Actiepunt {
  titel: string;
  beschrijving: string;
  verantwoordelijke: string;
  deadline: string;
  prioriteit: 'hoog' | 'midden' | 'laag';
  status: 'open' | 'in-uitvoering' | 'voltooid';
}

export interface Bron {
  titel: string;
  url: string;
  datum?: string;
  relevantie?: string;
}

export interface RapportInput {
  meta: ProjectMeta;
  nuts: Nuts;
  civiel: Civiel;
  fotos: Foto[];
  bevindingen: Bevinding[];
  checklist: ChecklistItem[];
  vergunningen: string[];
  materiaal: string[];
  acties: Actiepunt[];
  samenvatting: string;
  bronnen: Bron[];
  bijzondereRisicos?: string;
}

// Status types voor componenten
export type StatusType = 'conform' | 'niet-conform' | 'onbekend' | 'waarschuwing' | 'info';
export type PrioriteitType = 'hoog' | 'midden' | 'laag';

// Component props
export interface StatusPillProps {
  status: StatusType;
  label?: string;
}

export interface CalloutProps {
  tone: 'info' | 'success' | 'warning' | 'danger';
  title?: string;
  children: React.ReactNode;
}

export interface PhotoGridProps {
  fotos: Foto[];
  columns?: number;
}

export interface ChecklistTableProps {
  items: ChecklistItem[];
}

export interface KeyValueListProps {
  items: Array<{
    label: string;
    value: string | number | boolean;
    status?: StatusType;
  }>;
  columns?: number;
}