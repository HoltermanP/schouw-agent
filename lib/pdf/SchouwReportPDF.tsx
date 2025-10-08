/**
 * Hoofdcomponent voor Schouw Agent PDF rapportage
 * Complete document structuur met alle secties
 */

import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { tokens } from './tokens';
import { fontFamilies } from './fonts';
import { RapportInput } from '../types/report';
import { SectionTitle } from './components/SectionTitle';
import { KeyValueList } from './components/KeyValueList';
import { PhotoGrid } from './components/PhotoGrid';
import { ChecklistTable } from './components/ChecklistTable';
import { Callout } from './components/Callout';
import { StatusPill } from './components/StatusPill';
import { formatDate, formatAddress, getPhotoGridColumns } from './utils';

// Global styles
const styles = StyleSheet.create({
  page: {
    fontFamily: fontFamilies.body,
    fontSize: tokens.fontSize.sm,
    lineHeight: tokens.lineHeight.normal,
    color: tokens.colors.ink,
    padding: tokens.layout.margin,
  },
  header: {
    marginBottom: tokens.spacing[8],
  },
  title: {
    fontSize: tokens.fontSize['3xl'],
    fontWeight: 700,
    fontFamily: fontFamilies.heading,
    color: tokens.colors.ink,
    marginBottom: tokens.spacing[2],
  },
  subtitle: {
    fontSize: tokens.fontSize.lg,
    fontWeight: 500,
    color: tokens.colors.subtle,
    marginBottom: tokens.spacing[6],
  },
  metaBand: {
    backgroundColor: tokens.colors.surface,
    padding: tokens.spacing[4],
    borderRadius: 8,
    borderWidth: 1,
    borderColor: tokens.colors.border,
    marginBottom: tokens.spacing[6],
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: tokens.spacing[2],
  },
  metaLabel: {
    fontSize: tokens.fontSize.sm,
    fontWeight: 600,
    color: tokens.colors.ink,
  },
  metaValue: {
    fontSize: tokens.fontSize.sm,
    color: tokens.colors.subtle,
  },
  section: {
    marginBottom: tokens.spacing[8],
  },
  footer: {
    position: 'absolute',
    bottom: tokens.layout.margin,
    left: tokens.layout.margin,
    right: tokens.layout.margin,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: tokens.spacing[4],
    borderTopWidth: 1,
    borderTopColor: tokens.colors.border,
  },
  pageNumber: {
    fontSize: tokens.fontSize.xs,
    color: tokens.colors.subtle,
    fontFamily: fontFamilies.body,
  },
  brand: {
    fontSize: tokens.fontSize.xs,
    color: tokens.colors.primary,
    fontFamily: fontFamilies.body,
  },
});

interface SchouwReportPDFProps {
  data: RapportInput;
}

export const SchouwReportPDF: React.FC<SchouwReportPDFProps> = ({ data }) => {
  const { meta, nuts, civiel, fotos, bevindingen, checklist, vergunningen, materiaal, acties, samenvatting, bronnen } = data;

  // Groepeer foto's per categorie
  const fotosPerCategorie = fotos.reduce((acc, foto) => {
    if (!acc[foto.categorie]) {
      acc[foto.categorie] = [];
    }
    acc[foto.categorie].push(foto);
    return acc;
  }, {} as Record<string, typeof fotos>);

  // Bepaal fotogrid kolommen
  const photoColumns = getPhotoGridColumns(fotos.length);

  return (
    <Document
      title={`Schouwrapport - ${meta.naam}`}
      author="Schouw Agent"
      subject="AI-gestuurde schouwrapportage"
      keywords="schouw, rapport, Liander, Vitens, nutsvoorzieningen"
    >
      {/* Voorblad */}
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>SCHOUWRAPPORT</Text>
          <Text style={styles.subtitle}>AI-gestuurde schouwrapportage voor Nederlandse nutsvoorzieningen</Text>
        </View>

        <View style={styles.metaBand}>
          <View style={styles.metaRow}>
            <Text style={styles.metaLabel}>Project:</Text>
            <Text style={styles.metaValue}>{meta.naam}</Text>
          </View>
          <View style={styles.metaRow}>
            <Text style={styles.metaLabel}>Code:</Text>
            <Text style={styles.metaValue}>{meta.code}</Text>
          </View>
          <View style={styles.metaRow}>
            <Text style={styles.metaLabel}>Locatie:</Text>
            <Text style={styles.metaValue}>{formatAddress(meta.locatie)}</Text>
          </View>
          <View style={styles.metaRow}>
            <Text style={styles.metaLabel}>Opdrachtgever:</Text>
            <Text style={styles.metaValue}>{meta.opdrachtgever}</Text>
          </View>
          <View style={styles.metaRow}>
            <Text style={styles.metaLabel}>Datum:</Text>
            <Text style={styles.metaValue}>{formatDate(meta.datum)}</Text>
          </View>
          {meta.uitvoerder && (
            <View style={styles.metaRow}>
              <Text style={styles.metaLabel}>Uitvoerder:</Text>
              <Text style={styles.metaValue}>{meta.uitvoerder}</Text>
            </View>
          )}
        </View>

        {/* Status badges */}
        <View style={{ flexDirection: 'row', marginBottom: tokens.spacing[6] }}>
          <StatusPill status="info" label="INITIATIE" />
          <StatusPill status="warning" label="IN ANALYSE" />
        </View>
      </Page>

      {/* Inhoudsopgave */}
      <Page size="A4" style={styles.page}>
        <SectionTitle title="Inhoud" level={1} />
        
        <View style={{ marginTop: tokens.spacing[6] }}>
          <Text style={{ fontSize: tokens.fontSize.base, marginBottom: tokens.spacing[4] }}>
            1. Projectgegevens ................. 3
          </Text>
          <Text style={{ fontSize: tokens.fontSize.base, marginBottom: tokens.spacing[4] }}>
            2. Bestaande situatie ............. 4
          </Text>
          <Text style={{ fontSize: tokens.fontSize.base, marginBottom: tokens.spacing[4] }}>
            3. Technische beoordeling .......... 5
          </Text>
          <Text style={{ fontSize: tokens.fontSize.base, marginBottom: tokens.spacing[4] }}>
            4. Civiel & veiligheid ............ 6
          </Text>
          <Text style={{ fontSize: tokens.fontSize.base, marginBottom: tokens.spacing[4] }}>
            5. Vergunningen & meldingen ........ 7
          </Text>
          <Text style={{ fontSize: tokens.fontSize.base, marginBottom: tokens.spacing[4] }}>
            6. Actiepunten ...................... 8
          </Text>
          <Text style={{ fontSize: tokens.fontSize.base, marginBottom: tokens.spacing[4] }}>
            7. Samenvatting ..................... 9
          </Text>
        </View>
      </Page>

      {/* Projectgegevens */}
      <Page size="A4" style={styles.page}>
        <SectionTitle title="1. Projectgegevens" level={1} />
        
        <KeyValueList
          items={[
            { label: 'Projectnaam', value: meta.naam },
            { label: 'Projectcode', value: meta.code },
            { label: 'Locatie', value: formatAddress(meta.locatie) },
            { label: 'Opdrachtgever', value: meta.opdrachtgever },
            { label: 'Datum schouw', value: formatDate(meta.datum) },
            { label: 'Uitvoerder', value: meta.uitvoerder || 'Niet gespecificeerd' },
            { label: 'Toezichthouder', value: meta.toezichthouder || 'Niet gespecificeerd' },
          ]}
          columns={2}
        />

        <SectionTitle title="Nutsvoorzieningen" level={2} />
        <KeyValueList
          items={[
            { label: 'Elektra', value: nuts.elektra, status: nuts.elektra ? 'conform' : 'niet-conform' },
            { label: 'Gas', value: nuts.gas, status: nuts.gas ? 'conform' : 'niet-conform' },
            { label: 'Water', value: nuts.water, status: nuts.water ? 'conform' : 'niet-conform' },
            { label: 'Capaciteit', value: nuts.capaciteit || 'Niet gespecificeerd' },
            { label: 'Kabellengte', value: nuts.kabellengte ? `${nuts.kabellengte} meter` : 'Niet gespecificeerd' },
            { label: 'Soort aansluiting', value: nuts.soortAansluiting || 'Niet gespecificeerd' },
          ]}
          columns={2}
        />
      </Page>

      {/* Bestaande situatie */}
      <Page size="A4" style={styles.page}>
        <SectionTitle title="2. Bestaande situatie" level={1} />
        
        {Object.entries(fotosPerCategorie).map(([categorie, categorieFotos]) => (
          <View key={categorie} style={styles.section}>
            <SectionTitle 
              title={categorie.charAt(0).toUpperCase() + categorie.slice(1)} 
              level={2} 
            />
            <PhotoGrid fotos={categorieFotos} columns={photoColumns} />
          </View>
        ))}
      </Page>

      {/* Technische beoordeling */}
      <Page size="A4" style={styles.page}>
        <SectionTitle title="3. Technische beoordeling" level={1} />
        
        {bevindingen.length > 0 && (
          <View style={styles.section}>
            <SectionTitle title="Bevindingen" level={2} />
            {bevindingen.map((bevinding, index) => (
              <View key={index} style={{ marginBottom: tokens.spacing[4] }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: tokens.spacing[2] }}>
                  <StatusPill status={bevinding.status} />
                  <Text style={{ fontSize: tokens.fontSize.sm, fontWeight: 600, marginLeft: tokens.spacing[2] }}>
                    {bevinding.titel}
                  </Text>
                </View>
                <Text style={{ fontSize: tokens.fontSize.sm, marginBottom: tokens.spacing[2] }}>
                  {bevinding.toelichting}
                </Text>
                {bevinding.bron && (
                  <Text style={{ fontSize: tokens.fontSize.xs, color: tokens.colors.subtle }}>
                    Bron: {bevinding.bron.titel}
                  </Text>
                )}
              </View>
            ))}
          </View>
        )}

        {checklist.length > 0 && (
          <View style={styles.section}>
            <SectionTitle title="Checklist" level={2} />
            <ChecklistTable items={checklist} />
          </View>
        )}
      </Page>

      {/* Civiel & veiligheid */}
      <Page size="A4" style={styles.page}>
        <SectionTitle title="4. Civiel & veiligheid" level={1} />
        
        <KeyValueList
          items={[
            { label: 'Soort verharding', value: civiel.verharding },
            { label: 'Boring noodzakelijk', value: civiel.boring },
            { label: 'Buurt informeren', value: civiel.buurtInformeren },
            { label: 'Wegafzetting', value: civiel.wegafzetting },
            { label: 'Wegafzetting periode', value: civiel.wegafzettingPeriode || 'Niet gespecificeerd' },
          ]}
        />

        {civiel.traceBeschrijving && (
          <View style={styles.section}>
            <SectionTitle title="Tracé beschrijving" level={2} />
            <Text style={{ fontSize: tokens.fontSize.sm, lineHeight: tokens.lineHeight.normal }}>
              {civiel.traceBeschrijving}
            </Text>
          </View>
        )}

        {civiel.kruisingen && (
          <View style={styles.section}>
            <SectionTitle title="Kruisingen" level={2} />
            <Text style={{ fontSize: tokens.fontSize.sm, lineHeight: tokens.lineHeight.normal }}>
              {civiel.kruisingen}
            </Text>
          </View>
        )}

        {civiel.obstakels && (
          <View style={styles.section}>
            <SectionTitle title="Obstakels" level={2} />
            <Text style={{ fontSize: tokens.fontSize.sm, lineHeight: tokens.lineHeight.normal }}>
              {civiel.obstakels}
            </Text>
          </View>
        )}
      </Page>

      {/* Vergunningen & meldingen */}
      <Page size="A4" style={styles.page}>
        <SectionTitle title="5. Vergunningen & meldingen" level={1} />
        
        {vergunningen.length > 0 ? (
          <View style={{ marginBottom: tokens.spacing[4] }}>
            {vergunningen.map((vergunning, index) => (
              <View key={index} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: tokens.spacing[2] }}>
                <Text style={{ fontSize: tokens.fontSize.lg, marginRight: tokens.spacing[2] }}>📋</Text>
                <Text style={{ fontSize: tokens.fontSize.sm }}>{vergunning}</Text>
              </View>
            ))}
          </View>
        ) : (
          <Callout tone="warning" title="Vergunningen">
            Nog geen vergunningen gespecificeerd. Controleer welke vergunningen nodig zijn voor dit project.
          </Callout>
        )}

        {materiaal.length > 0 && (
          <View style={styles.section}>
            <SectionTitle title="Materiaal & middelen" level={2} />
            {materiaal.map((item, index) => (
              <View key={index} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: tokens.spacing[2] }}>
                <Text style={{ fontSize: tokens.fontSize.lg, marginRight: tokens.spacing[2] }}>🔧</Text>
                <Text style={{ fontSize: tokens.fontSize.sm }}>{item}</Text>
              </View>
            ))}
          </View>
        )}
      </Page>

      {/* Actiepunten */}
      <Page size="A4" style={styles.page}>
        <SectionTitle title="6. Actiepunten & open vragen" level={1} />
        
        {acties.length > 0 ? (
          <View>
            {acties.map((actie, index) => (
              <View key={index} style={{ marginBottom: tokens.spacing[4], padding: tokens.spacing[3], backgroundColor: tokens.colors.surface, borderRadius: 4 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: tokens.spacing[2] }}>
                  <StatusPill status={actie.prioriteit === 'hoog' ? 'danger' : actie.prioriteit === 'midden' ? 'warning' : 'info'} />
                  <Text style={{ fontSize: tokens.fontSize.sm, fontWeight: 600, marginLeft: tokens.spacing[2] }}>
                    {actie.titel}
                  </Text>
                </View>
                <Text style={{ fontSize: tokens.fontSize.sm, marginBottom: tokens.spacing[2] }}>
                  {actie.beschrijving}
                </Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={{ fontSize: tokens.fontSize.xs, color: tokens.colors.subtle }}>
                    Verantwoordelijke: {actie.verantwoordelijke}
                  </Text>
                  <Text style={{ fontSize: tokens.fontSize.xs, color: tokens.colors.subtle }}>
                    Deadline: {actie.deadline}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        ) : (
          <Callout tone="info" title="Geen actiepunten">
            Er zijn momenteel geen openstaande actiepunten voor dit project.
          </Callout>
        )}
      </Page>

      {/* Samenvatting */}
      <Page size="A4" style={styles.page}>
        <SectionTitle title="7. Samenvatting & advies" level={1} />
        
        <Callout tone="info" title="Conclusie">
          {samenvatting || 'Geen samenvatting beschikbaar. Voeg een samenvatting toe aan het rapport.'}
        </Callout>

        {bronnen.length > 0 && (
          <View style={styles.section}>
            <SectionTitle title="Bronnen" level={2} />
            {bronnen.map((bron, index) => (
              <View key={index} style={{ marginBottom: tokens.spacing[2] }}>
                <Text style={{ fontSize: tokens.fontSize.sm, fontWeight: 500 }}>
                  {index + 1}. {bron.titel}
                </Text>
                <Text style={{ fontSize: tokens.fontSize.xs, color: tokens.colors.subtle, marginLeft: tokens.spacing[4] }}>
                  {bron.url}
                </Text>
                {bron.relevantie && (
                  <Text style={{ fontSize: tokens.fontSize.xs, color: tokens.colors.subtle, marginLeft: tokens.spacing[4] }}>
                    {bron.relevantie}
                  </Text>
                )}
              </View>
            ))}
          </View>
        )}
      </Page>
    </Document>
  );
};