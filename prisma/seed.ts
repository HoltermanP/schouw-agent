import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Maak demo project
  const demoProject = await prisma.project.create({
    data: {
      naam: 'Aansluiting woonwijk De Vliert',
      code: 'SCH-2024-DEMO',
      opdrachtgever: 'Gemeente Den Haag',
      adres: 'Vliertlaan 123',
      postcode: '2514 AB',
      plaats: 'Den Haag',
      latitude: 52.0705,
      longitude: 4.3007,
      kabellengte: 150.5,
      nutsvoorzieningen: JSON.stringify(['elektra', 'gas', 'water']),
      soortAansluiting: 'nieuw',
      capaciteit: 25.0,
      soortVerharding: 'asfalt',
      boringNoodzakelijk: true,
      traceBeschrijving: 'Nieuwe aansluiting vanaf hoofdstraat naar woonwijk. Tracé loopt onder voetpad en kruist parkeerplaats.',
      kruisingen: 'Kruising met bestaande gasleiding op 0.8m diepte',
      obstakels: 'Boomwortels van 3 oude eiken, riolering op 1.2m diepte',
      buurtInformeren: true,
      buurtNotitie: 'Bewoners informeren via brief 2 weken voor start',
      wegafzettingNodig: true,
      wegafzettingPeriode: '2 weken tijdens graafwerkzaamheden',
      vergunningen: JSON.stringify(['KLIC', 'gemeente']),
      bijzondereRisicos: 'Hoog waterpeil, archeologische waarden mogelijk',
      uitvoerder: 'Bouwbedrijf Van der Berg BV',
      toezichthouder: 'Jan de Vries - Liander',
      bereikbaarheden: 'Jan de Vries: 06-12345678, j.devries@liander.nl'
    }
  });

  console.log(`✅ Demo project created: ${demoProject.naam}`);

  // Maak demo foto's
  const demoPhotos = [
    {
      url: '/demo/meterkast-1.jpg',
      categorie: 'meterkast',
      exifData: JSON.stringify({
        filename: 'meterkast-1.jpg',
        size: 2048576,
        type: 'image/jpeg',
        lastModified: Date.now(),
        gps: { latitude: 52.0705, longitude: 4.3007 },
        dateTime: new Date().toISOString()
      }),
      ocrText: 'Hoofdschakelaar 25A\nMeterkast type MK-25\nSerienummer: 2024-001'
    },
    {
      url: '/demo/gebouw-1.jpg',
      categorie: 'gebouw',
      exifData: JSON.stringify({
        filename: 'gebouw-1.jpg',
        size: 1536000,
        type: 'image/jpeg',
        lastModified: Date.now()
      }),
      ocrText: null
    },
    {
      url: '/demo/locatie-1.jpg',
      categorie: 'locatie',
      exifData: JSON.stringify({
        filename: 'locatie-1.jpg',
        size: 3072000,
        type: 'image/jpeg',
        lastModified: Date.now(),
        gps: { latitude: 52.0705, longitude: 4.3007 }
      }),
      ocrText: null
    },
    {
      url: '/demo/sleuf-1.jpg',
      categorie: 'sleuf',
      exifData: JSON.stringify({
        filename: 'sleuf-1.jpg',
        size: 2560000,
        type: 'image/jpeg',
        lastModified: Date.now()
      }),
      ocrText: 'Sleufdiepte: 0.8m\nBreedte: 0.4m\nZandlaag: 10cm'
    }
  ];

  for (const photoData of demoPhotos) {
    await prisma.photo.create({
      data: {
        projectId: demoProject.id,
        url: photoData.url,
        categorie: photoData.categorie,
        exifData: photoData.exifData,
        ocrText: photoData.ocrText
      }
    });
  }

  console.log(`✅ Demo photos created: ${demoPhotos.length} photos`);

  // Maak demo AI analyse
  const demoInspection = await prisma.inspection.create({
    data: {
      projectId: demoProject.id,
      findings: JSON.stringify([
        {
          category: 'meterkast',
          status: 'conform',
          description: 'Meterkast voldoet aan afmetingen en toegankelijkheidseisen',
          evidence: 'Foto van meterkast met meetlint',
          priority: 'hoog',
          source: 'Liander meterkast richtlijnen',
          url: 'https://www.liander.nl/meterkast/richtlijnen-en-eisen'
        },
        {
          category: 'sleuf',
          status: 'niet-conform',
          description: 'Sleufdiepte onvoldoende voor gasleiding (0.6m i.p.v. 0.8m)',
          evidence: 'Meetlintfoto van sleufdiepte',
          priority: 'hoog',
          source: 'Liander inmeetvoorwaarden',
          url: 'https://bestekken.liander.nl/qa_faqs/waar-kan-ik-de-meest-actuele-inmeetvoorwaarden-en-aanlevereisen-voor-ondergrondse-revisie-vinden/'
        }
      ]),
      risks: JSON.stringify([
        {
          type: 'Onvoldoende sleufdiepte',
          severity: 'hoog',
          description: 'Gasleiding niet vorstvrij gelegd',
          mitigation: 'Sleuf verdiepen tot 0.8m en zandlaag aanbrengen'
        }
      ]),
      actions: JSON.stringify([
        {
          action: 'Sleuf verdiepen tot 0.8m',
          responsible: 'Uitvoerder',
          deadline: 'Voor start werkzaamheden',
          priority: 'hoog'
        },
        {
          action: 'Zandlaag van 10cm aanbrengen',
          responsible: 'Uitvoerder',
          deadline: 'Na verdiepen sleuf',
          priority: 'hoog'
        }
      ]),
      citations: JSON.stringify([
        {
          title: 'Liander meterkast richtlijnen',
          url: 'https://www.liander.nl/meterkast/richtlijnen-en-eisen',
          date: '7 oktober 2025',
          relevance: 'Meterkast afmetingen en toegankelijkheid'
        },
        {
          title: 'Liander inmeetvoorwaarden',
          url: 'https://bestekken.liander.nl/qa_faqs/waar-kan-ik-de-meest-actuele-inmeetvoorwaarden-en-aanlevereisen-voor-ondergrondse-revisie-vinden/',
          date: '7 oktober 2025',
          relevance: 'Sleufdiepte en -breedte eisen'
        }
      ])
    }
  });

  console.log(`✅ Demo inspection created: ${demoInspection.id}`);

  // Maak demo rapport
  const demoReport = await prisma.report.create({
    data: {
      projectId: demoProject.id,
      content: `# SCHOUWRAPPORT

## 1. PROJECTGEGEVENS
**Project:** ${demoProject.naam}
**Code:** ${demoProject.code}
**Opdrachtgever:** ${demoProject.opdrachtgever}
**Locatie:** ${demoProject.adres}, ${demoProject.postcode} ${demoProject.plaats}
**Datum:** ${new Date().toLocaleDateString('nl-NL')}

## 2. BESTAANDE SITUATIE
**Kabellengte:** ${demoProject.kabellengte} meter
**Nutsvoorzieningen:** ${JSON.parse(demoProject.nutsvoorzieningen).join(', ')}
**Soort aansluiting:** ${demoProject.soortAansluiting}
**Capaciteit:** ${demoProject.capaciteit}
**Soort verharding:** ${demoProject.soortVerharding}

## 3. TECHNISCHE BEOORDELING
### Meterkast
- ✅ **Conform:** Meterkast voldoet aan afmetingen en toegankelijkheidseisen
- **Bewijsfoto:** Foto van meterkast met meetlint
- **Bron:** Liander meterkast richtlijnen

### Sleuf en Tracé
- ❌ **Niet-conform:** Sleufdiepte onvoldoende voor gasleiding (0.6m i.p.v. 0.8m)
- **Bewijsfoto:** Meetlintfoto van sleufdiepte
- **Bron:** Liander inmeetvoorwaarden

## 4. CIVIEL & VEILIGHEID
**Boring noodzakelijk:** ${demoProject.boringNoodzakelijk ? 'Ja' : 'Nee'}
**Buurt informeren:** ${demoProject.buurtInformeren ? 'Ja' : 'Nee'}
**Wegafzetting nodig:** ${demoProject.wegafzettingNodig ? 'Ja' : 'Nee'}

## 5. VERGUNNINGEN & MELDINGEN
${demoProject.vergunningen ? JSON.parse(demoProject.vergunningen).join(', ') : 'Nog te bepalen'}

## 6. ACTIEPUNTEN & OPEN VRAGEN
1. **Hoog prioriteit:** Sleuf verdiepen tot 0.8m (verantwoordelijke: Uitvoerder)
2. **Hoog prioriteit:** Zandlaag van 10cm aanbrengen (verantwoordelijke: Uitvoerder)

## 7. SAMENVATTING/ADVIES
Het project kan doorgang vinden na aanpassing van de sleufdiepte. De meterkast voldoet aan alle eisen. Extra aandacht voor vorstbescherming van gasleiding.

## 8. BRONNEN
- Liander meterkast richtlijnen (7 oktober 2025)
- Liander inmeetvoorwaarden (7 oktober 2025)

## 9. BIJLAGEN
- Foto 1: Meterkast overzicht
- Foto 2: Gebouw situatie
- Foto 3: Locatie overzicht
- Foto 4: Sleuf detail`
    }
  });

  console.log(`✅ Demo report created: ${demoReport.id}`);

  // Maak 5 extra test projecten
  const testProjects = [
    {
      naam: 'Aansluiting bedrijventerrein De Haven',
      code: 'SCH-2024-001',
      opdrachtgever: 'Gemeente Rotterdam',
      adres: 'Havenweg 45',
      postcode: '3011 AB',
      plaats: 'Rotterdam',
      latitude: 51.9244,
      longitude: 4.4777,
      kabellengte: 200.0,
      nutsvoorzieningen: JSON.stringify(['elektra', 'gas']),
      soortAansluiting: 'uitbreiding',
      capaciteit: 50.0,
      soortVerharding: 'beton',
      boringNoodzakelijk: false,
      traceBeschrijving: 'Aansluiting voor nieuw bedrijfsgebouw met zware elektrische belasting',
      kruisingen: 'Kruising met bestaande waterleiding',
      obstakels: 'Geen obstakels',
      buurtInformeren: false,
      buurtNotitie: null,
      wegafzettingNodig: false,
      wegafzettingPeriode: null,
      vergunningen: JSON.stringify(['KLIC', 'gemeente', 'Rijkswaterstaat']),
      bijzondereRisicos: 'Hoge grondwaterstand',
      uitvoerder: 'Elektrobedrijf Rotterdam BV',
      toezichthouder: 'Marieke van Dijk - Liander',
      bereikbaarheden: 'Marieke van Dijk: 06-98765432, m.vandijk@liander.nl'
    },
    {
      naam: 'Renovatie gasleiding woonwijk',
      code: 'SCH-2024-002',
      opdrachtgever: 'Vitens',
      adres: 'Dorpsstraat 12-50',
      postcode: '1234 CD',
      plaats: 'Utrecht',
      latitude: 52.0907,
      longitude: 5.1214,
      kabellengte: 75.0,
      nutsvoorzieningen: JSON.stringify(['water']),
      soortAansluiting: 'renovatie',
      capaciteit: 15.0,
      soortVerharding: 'klinkers',
      boringNoodzakelijk: true,
      traceBeschrijving: 'Vervanging oude gasleiding door nieuwe PE-leiding',
      kruisingen: 'Kruising met elektrakabel en riolering',
      obstakels: 'Boomwortels van oude lindebomen',
      buurtInformeren: true,
      buurtNotitie: 'Bewonersbrief verstuurd, informatieavond gepland',
      wegafzettingNodig: true,
      wegafzettingPeriode: '3 weken in fases',
      vergunningen: JSON.stringify(['KLIC', 'gemeente', 'provincie']),
      bijzondereRisicos: 'Archeologische waarden mogelijk',
      uitvoerder: 'Infrabedrijf Utrecht',
      toezichthouder: 'Peter Jansen - Vitens',
      bereikbaarheden: 'Peter Jansen: 06-11223344, p.jansen@vitens.nl'
    },
    {
      naam: 'Nieuwe woonwijk aansluiting',
      code: 'SCH-2024-003',
      opdrachtgever: 'Gemeente Amsterdam',
      adres: 'Nieuwbouwwijk 1-100',
      postcode: '1012 AB',
      plaats: 'Amsterdam',
      latitude: 52.3676,
      longitude: 4.9041,
      kabellengte: 300.0,
      nutsvoorzieningen: JSON.stringify(['elektra', 'gas', 'water']),
      soortAansluiting: 'nieuw',
      capaciteit: 100.0,
      soortVerharding: 'asfalt',
      boringNoodzakelijk: true,
      traceBeschrijving: 'Complete nieuwe infrastructuur voor 100 woningen',
      kruisingen: 'Kruising met bestaande infrastructuur',
      obstakels: 'Geen obstakels, nieuwe locatie',
      buurtInformeren: true,
      buurtNotitie: 'Informatieavond voor toekomstige bewoners',
      wegafzettingNodig: true,
      wegafzettingPeriode: '6 maanden in fases',
      vergunningen: JSON.stringify(['KLIC', 'gemeente', 'provincie', 'Rijkswaterstaat']),
      bijzondereRisicos: 'Hoog waterpeil, archeologische waarden',
      uitvoerder: 'Bouwbedrijf Amsterdam NV',
      toezichthouder: 'Lisa de Vries - Liander',
      bereikbaarheden: 'Lisa de Vries: 06-55667788, l.devries@liander.nl'
    },
    {
      naam: 'Industriële aansluiting fabriek',
      code: 'SCH-2024-004',
      opdrachtgever: 'Chemiebedrijf BV',
      adres: 'Industrieweg 200',
      postcode: '4567 EF',
      plaats: 'Eindhoven',
      latitude: 51.4416,
      longitude: 5.4697,
      kabellengte: 500.0,
      nutsvoorzieningen: JSON.stringify(['elektra', 'gas']),
      soortAansluiting: 'nieuw',
      capaciteit: 200.0,
      soortVerharding: 'beton',
      boringNoodzakelijk: false,
      traceBeschrijving: 'Hoge capaciteit aansluiting voor industriële productie',
      kruisingen: 'Kruising met bestaande gasleiding en elektrakabel',
      obstakels: 'Geen obstakels',
      buurtInformeren: false,
      buurtNotitie: null,
      wegafzettingNodig: false,
      wegafzettingPeriode: null,
      vergunningen: JSON.stringify(['KLIC', 'gemeente', 'provincie', 'Rijkswaterstaat', 'milieu']),
      bijzondereRisicos: 'Hoge veiligheidseisen, explosiegevaar',
      uitvoerder: 'Industrieel Elektrobedrijf BV',
      toezichthouder: 'Jan van der Berg - Liander',
      bereikbaarheden: 'Jan van der Berg: 06-99887766, j.vandenberg@liander.nl'
    },
    {
      naam: 'Renovatie historisch centrum',
      code: 'SCH-2024-005',
      opdrachtgever: 'Gemeente Delft',
      adres: 'Markt 1-20',
      postcode: '2611 AB',
      plaats: 'Delft',
      latitude: 52.0116,
      longitude: 4.3571,
      kabellengte: 120.0,
      nutsvoorzieningen: JSON.stringify(['elektra', 'water']),
      soortAansluiting: 'renovatie',
      capaciteit: 30.0,
      soortVerharding: 'kasseien',
      boringNoodzakelijk: true,
      traceBeschrijving: 'Renovatie in historisch centrum met speciale aandacht voor monumenten',
      kruisingen: 'Kruising met historische funderingen',
      obstakels: 'Historische funderingen, archeologische waarden',
      buurtInformeren: true,
      buurtNotitie: 'Uitgebreide communicatie met bewoners en monumentencommissie',
      wegafzettingNodig: true,
      wegafzettingPeriode: '2 maanden in fases',
      vergunningen: JSON.stringify(['KLIC', 'gemeente', 'monumenten', 'archeologie']),
      bijzondereRisicos: 'Monumentenstatus, archeologische waarden, historische funderingen',
      uitvoerder: 'Historisch Bouwbedrijf Delft',
      toezichthouder: 'Anna van der Meer - Liander',
      bereikbaarheden: 'Anna van der Meer: 06-33445566, a.vandermeer@liander.nl'
    }
  ];

  for (const projectData of testProjects) {
    const project = await prisma.project.create({
      data: projectData
    });

    console.log(`✅ Test project created: ${project.naam}`);

    // Voeg foto's toe voor elk project
    const projectPhotos = [
      {
        url: `/demo/project-${project.id}-1.jpg`,
        categorie: 'meterkast',
        exifData: JSON.stringify({
          filename: `project-${project.id}-1.jpg`,
          size: 2048576,
          type: 'image/jpeg',
          lastModified: Date.now(),
          gps: { latitude: projectData.latitude, longitude: projectData.longitude },
          dateTime: new Date().toISOString()
        }),
        ocrText: `Project ${project.code}\nMeterkast overzicht\nDatum: ${new Date().toLocaleDateString('nl-NL')}`
      },
      {
        url: `/demo/project-${project.id}-2.jpg`,
        categorie: 'locatie',
        exifData: JSON.stringify({
          filename: `project-${project.id}-2.jpg`,
          size: 1536000,
          type: 'image/jpeg',
          lastModified: Date.now(),
          gps: { latitude: projectData.latitude, longitude: projectData.longitude }
        }),
        ocrText: null
      }
    ];

    for (const photoData of projectPhotos) {
      await prisma.photo.create({
        data: {
          projectId: project.id,
          url: photoData.url,
          categorie: photoData.categorie,
          exifData: photoData.exifData,
          ocrText: photoData.ocrText
        }
      });
    }

    console.log(`✅ Photos created for project ${project.naam}: ${projectPhotos.length} photos`);
  }

  console.log('🎉 Database seeding completed!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
