# Schouw Agent - Moderne PDF Rapportage

## Overzicht

Schouw Agent biedt een moderne, printklare PDF rapportage voor Nederlandse nutsvoorzieningen. Gebaseerd op @react-pdf/renderer voor optimale typografie en layout controle.

## Features

- **Moderne Typografie**: Archivo, Inter, JetBrains Mono fonts
- **Status Indicators**: Kleurrijke status pills voor conformiteit
- **Responsive Fotogrid**: Automatische layout voor foto's
- **Checklist Tabellen**: Professionele tabellen met zebra-striping
- **Callouts**: Opvallende informatie blokken
- **Print Optimalisatie**: A4 formaat, 24mm marges
- **Nederlandse Teksten**: Volledige lokalisatie

## Installatie

### 1. Dependencies

```bash
npm install @react-pdf/renderer
npm install zod
```

### 2. Fonts Downloaden

Download Google Fonts en plaats in `/public/fonts/`:

```bash
# Archivo
wget -O public/fonts/archivo-regular.woff2 "https://fonts.gstatic.com/s/archivo/v18/k3kCo_SYNC-svQ0i7u7dGAQ.woff2"
wget -O public/fonts/archivo-600.woff2 "https://fonts.gstatic.com/s/archivo/v18/k3kCo_SYNC-svQ0i7u7dGAQ.woff2"
wget -O public/fonts/archivo-700.woff2 "https://fonts.gstatic.com/s/archivo/v18/k3kCo_SYNC-svQ0i7u7dGAQ.woff2"

# Inter
wget -O public/fonts/inter-regular.woff2 "https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_fvQtMp.woff2"
wget -O public/fonts/inter-500.woff2 "https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_fvQtMp.woff2"
wget -O public/fonts/inter-600.woff2 "https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_fvQtMp.woff2"

# JetBrains Mono
wget -O public/fonts/jetbrains-mono-regular.woff2 "https://fonts.gstatic.com/s/jetbrainsmono/v18/tDbY2o-flEEny0FZhsfKu5WU4zr3E_BX0PnTvRD.woff2"
wget -O public/fonts/jetbrains-mono-500.woff2 "https://fonts.gstatic.com/s/jetbrainsmono/v18/tDbY2o-flEEny0FZhsfKu5WU4zr3E_BX0PnTvRD.woff2"
```

### 3. Development Server

```bash
npm run dev
```

## Gebruik

### 1. Preview Pagina

Ga naar `/report-preview` om de PDF preview te bekijken:

```bash
open http://localhost:3000/report-preview
```

### 2. API Endpoint

```bash
curl -X POST http://localhost:3000/api/pdf \
  -H "Content-Type: application/json" \
  -d @example-data.json
```

### 3. Voorbeeld Data

```typescript
import { exampleRapportData } from '@/lib/pdf/example-data';

// Gebruik voorbeeld data
const pdfData = exampleRapportData;
```

## API Documentatie

### POST /api/pdf

Genereer PDF van RapportInput JSON.

**Request Body:**
```typescript
interface RapportInput {
  meta: ProjectMeta;
  nuts: Nuts;
  civiel: Civiel;
  foto's: Foto[];
  bevindingen: Bevinding[];
  checklist: ChecklistItem[];
  vergunningen: string[];
  materiaal: string[];
  acties: Actiepunt[];
  samenvatting: string;
  bronnen: Bron[];
}
```

**Response:**
- `200`: PDF file (application/pdf)
- `400`: Validation error
- `500`: Server error

## Componenten

### Core Components

- `SchouwReportPDF`: Hoofdcomponent voor complete PDF
- `SectionTitle`: Sectietitels met accent
- `StatusPill`: Kleurrijke status indicators
- `KeyValueList`: Nette key-value uitlijning
- `PhotoGrid`: Responsive foto layout
- `ChecklistTable`: Professionele tabellen
- `Callout`: Opvallende informatie blokken

### Design Tokens

```typescript
// Kleuren
colors: {
  primary: '#0A84FF',
  success: { bg: '#E7F7EF', text: '#16A34A' },
  warning: { bg: '#FFF7E6', text: '#F59E0B' },
  danger: { bg: '#FEECEC', text: '#DC2626' },
}

// Typografie
fontSize: {
  xs: 10, sm: 12, base: 14, lg: 16, xl: 18, '2xl': 22, '3xl': 28
}
```

## Testing

### Unit Tests

```bash
npm test
```

### PDF Snapshot Test

```typescript
import { renderToStream } from '@react-pdf/renderer';
import { SchouwReportPDF } from '@/lib/pdf/SchouwReportPDF';

test('PDF snapshot', async () => {
  const stream = await renderToStream(
    <SchouwReportPDF data={exampleRapportData} />
  );
  // Test PDF generatie
});
```

## Optimalisatie

### Performance

- `StyleSheet.create` voor betere performance
- Memoization van componenten
- Pagina-break hints
- Beeldcompressie

### Print Kwaliteit

- A4 formaat (595.28 x 841.89 points)
- 24mm marges (68.03 points)
- 150-200 DPI voor afbeeldingen
- WCAG AA kleurcontrast

## Troubleshooting

### Font Issues

```bash
# Controleer font bestanden
ls -la public/fonts/
```

### PDF Generatie Fout

```typescript
// Valideer input data
const isValid = validateRapportInput(data);
if (!isValid) {
  throw new Error('Ongeldige input data');
}
```

### Memory Issues

```typescript
// Gebruik streaming voor grote PDF's
const stream = await renderToStream(<SchouwReportPDF data={data} />);
```

## Licentie

MIT License - Zie LICENSE bestand voor details.

## Support

Voor vragen of problemen:
- GitHub Issues
- Email: support@schouwagent.nl
- Documentatie: /docs
