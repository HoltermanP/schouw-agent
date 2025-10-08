/**
 * Voorbeelddata voor Schouw Agent PDF rapportage
 * Gebaseerd op het demo project "Aansluiting woonwijk De Vliert"
 */

import { RapportInput } from '../types/report';

export const exampleRapportData: RapportInput = {
  meta: {
    naam: 'Aansluiting woonwijk De Vliert',
    code: 'SCH-2024-DEMO',
    locatie: {
      straat: 'Vliertlaan 123',
      postcode: '2514 AB',
      plaats: 'Den Haag',
    },
    opdrachtgever: 'Gemeente Den Haag',
    datum: '2024-10-07T10:30:00Z',
    uitvoerder: 'Bouwbedrijf Van der Berg BV',
    toezichthouder: 'Jan de Vries - Liander',
  },
  
  nuts: {
    elektra: true,
    gas: true,
    water: true,
    capaciteit: 25,
    kabellengte: 150.5,
    soortAansluiting: 'nieuw',
  },
  
  civiel: {
    verharding: 'asfalt',
    boring: true,
    buurtInformeren: true,
    wegafzetting: true,
    wegafzettingPeriode: '2 weken tijdens graafwerkzaamheden',
    traceBeschrijving: 'Nieuwe aansluiting vanaf hoofdstraat naar woonwijk. Tracé loopt onder voetpad en kruist parkeerplaats.',
    kruisingen: 'Kruising met bestaande gasleiding op 0.8m diepte',
    obstakels: 'Boomwortels van 3 oude eiken, riolering op 1.2m diepte',
  },
  
  fotos: [
    {
      id: 'foto-1',
      categorie: 'meterkast',
      titel: 'Meterkast overzicht',
      bestandsnaam: 'meterkast-1.jpg',
      datumISO: '2024-10-07T10:30:00Z',
      uri: '/demo/meterkast-1.jpg',
      exifData: {
        gps: {
          latitude: 52.0705,
          longitude: 4.3007,
        },
        dateTime: '2024-10-07T10:30:00Z',
      },
      ocrText: 'Hoofdschakelaar 25A\nMeterkast type MK-25\nSerienummer: 2024-001',
    },
    {
      id: 'foto-2',
      categorie: 'meterkast',
      titel: 'Meterkast detail schakelaars',
      bestandsnaam: 'meterkast-2.jpg',
      datumISO: '2024-10-07T10:31:00Z',
      uri: '/demo/meterkast-2.jpg',
      ocrText: 'Hoofdschakelaar 25A\nGroepenkast 8 groepen\nAardlekschakelaar 30mA',
    },
    {
      id: 'foto-3',
      categorie: 'gebouw',
      titel: 'Gebouw situatie voorzijde',
      bestandsnaam: 'gebouw-1.jpg',
      datumISO: '2024-10-07T10:32:00Z',
      uri: '/demo/gebouw-1.jpg',
    },
    {
      id: 'foto-4',
      categorie: 'gebouw',
      titel: 'Gebouw achterzijde',
      bestandsnaam: 'gebouw-2.jpg',
      datumISO: '2024-10-07T10:33:00Z',
      uri: '/demo/gebouw-2.jpg',
    },
    {
      id: 'foto-5',
      categorie: 'locatie',
      titel: 'Locatie overzicht straat',
      bestandsnaam: 'locatie-1.jpg',
      datumISO: '2024-10-07T10:34:00Z',
      uri: '/demo/locatie-1.jpg',
      exifData: {
        gps: {
          latitude: 52.0705,
          longitude: 4.3007,
        },
      },
    },
    {
      id: 'foto-6',
      categorie: 'locatie',
      titel: 'Locatie detail kruising',
      bestandsnaam: 'locatie-2.jpg',
      datumISO: '2024-10-07T10:35:00Z',
      uri: '/demo/locatie-2.jpg',
    },
    {
      id: 'foto-7',
      categorie: 'omgevingssituatie',
      titel: 'Omgeving bomen',
      bestandsnaam: 'omgeving-1.jpg',
      datumISO: '2024-10-07T10:36:00Z',
      uri: '/demo/omgeving-1.jpg',
      ocrText: '3 oude eiken\nAfstand tot gebouw: 5m\nWortelstelsel zichtbaar',
    },
    {
      id: 'foto-8',
      categorie: 'sleuf',
      titel: 'Sleuf overzicht',
      bestandsnaam: 'sleuf-1.jpg',
      datumISO: '2024-10-07T10:37:00Z',
      uri: '/demo/sleuf-1.jpg',
      ocrText: 'Sleufdiepte: 0.6m\nBreedte: 0.4m\nLengte: 15m',
    },
    {
      id: 'foto-9',
      categorie: 'sleuf',
      titel: 'Sleuf detail diepte',
      bestandsnaam: 'sleuf-2.jpg',
      datumISO: '2024-10-07T10:38:00Z',
      uri: '/demo/sleuf-2.jpg',
      ocrText: 'Sleufdiepte: 0.6m\nVereiste diepte: 0.8m\nVerschil: 0.2m',
    },
    {
      id: 'foto-10',
      categorie: 'bijzonderheden',
      titel: 'Bestrating schade',
      bestandsnaam: 'bijzonderheden-1.jpg',
      datumISO: '2024-10-07T10:39:00Z',
      uri: '/demo/bijzonderheden-1.jpg',
      ocrText: 'Bestrating schade\nHerstel noodzakelijk\nKosten: €500',
    },
  ],
  
  bevindingen: [
    {
      status: 'conform',
      titel: 'Meterkast afmetingen',
      toelichting: 'Meterkast voldoet aan afmetingen en toegankelijkheidseisen volgens Liander richtlijnen',
      prioriteit: 'midden',
      bewijs: ['foto-1', 'foto-2'],
      bron: {
        titel: 'Liander meterkast richtlijnen',
        url: 'https://www.liander.nl/meterkast/richtlijnen-en-eisen',
      },
    },
    {
      status: 'conform',
      titel: 'Meterkast toegankelijkheid',
      toelichting: 'Meterkast is goed bereikbaar vanaf openbare weg zonder obstakels',
      prioriteit: 'laag',
      bewijs: ['foto-1'],
      bron: {
        titel: 'Liander meterkast richtlijnen',
        url: 'https://www.liander.nl/meterkast/richtlijnen-en-eisen',
      },
    },
    {
      status: 'niet-conform',
      titel: 'Sleufdiepte onvoldoende',
      toelichting: 'Sleufdiepte van 0.6m is onvoldoende voor gasleiding. Vereiste diepte is 0.8m voor vorstbescherming',
      prioriteit: 'hoog',
      bewijs: ['foto-8', 'foto-9'],
      bron: {
        titel: 'Liander inmeetvoorwaarden',
        url: 'https://bestekken.liander.nl/qa_faqs/waar-kan-ik-de-meest-actuele-inmeetvoorwaarden-en-aanlevereisen-voor-ondergrondse-revisie-vinden/',
      },
    },
    {
      status: 'niet-conform',
      titel: 'Boomwortels obstakel',
      toelichting: 'Boomwortels van 3 oude eiken kunnen graafwerkzaamheden bemoeilijken',
      prioriteit: 'midden',
      bewijs: ['foto-7'],
      bron: {
        titel: 'Liander inmeetvoorwaarden',
        url: 'https://bestekken.liander.nl/qa_faqs/waar-kan-ik-de-meest-actuele-inmeetvoorwaarden-en-aanlevereisen-voor-ondergrondse-revisie-vinden/',
      },
    },
    {
      status: 'onbekend',
      titel: 'Zandlaag bescherming',
      toelichting: 'Zandlaag voor bescherming leidingen nog niet gecontroleerd',
      prioriteit: 'midden',
      bewijs: ['foto-8'],
      bron: {
        titel: 'Liander inmeetvoorwaarden',
        url: 'https://bestekken.liander.nl/qa_faqs/waar-kan-ik-de-meest-actuele-inmeetvoorwaarden-en-aanlevereisen-voor-ondergrondse-revisie-vinden/',
      },
    },
    {
      status: 'niet-conform',
      titel: 'Bestrating schade',
      toelichting: 'Bestrating schade door graafwerkzaamheden, herstel noodzakelijk',
      prioriteit: 'laag',
      bewijs: ['foto-10'],
    },
  ],
  
  checklist: [
    {
      sectie: 'Meterkast',
      norm: 'Afmetingen minimaal 0.6m x 0.4m x 0.2m',
      status: 'conform',
      opmerking: 'Voldoet aan eisen',
      bron: {
        titel: 'Liander meterkast richtlijnen',
        url: 'https://www.liander.nl/meterkast/richtlijnen-en-eisen',
      },
    },
    {
      sectie: 'Meterkast',
      norm: 'Toegankelijkheid vanaf openbare weg',
      status: 'conform',
      opmerking: 'Goed bereikbaar',
      bron: {
        titel: 'Liander meterkast richtlijnen',
        url: 'https://www.liander.nl/meterkast/richtlijnen-en-eisen',
      },
    },
    {
      sectie: 'Meterkast',
      norm: 'Ventilatie openingen aanwezig',
      status: 'conform',
      opmerking: 'Voldoende ventilatie',
      bron: {
        titel: 'Liander meterkast richtlijnen',
        url: 'https://www.liander.nl/meterkast/richtlijnen-en-eisen',
      },
    },
    {
      sectie: 'Sleuf',
      norm: 'Diepte minimaal 0.8m voor gasleiding',
      status: 'niet-conform',
      opmerking: 'Huidige diepte 0.6m, verdiepen noodzakelijk',
      bron: {
        titel: 'Liander inmeetvoorwaarden',
        url: 'https://bestekken.liander.nl/qa_faqs/waar-kan-ik-de-meest-actuele-inmeetvoorwaarden-en-aanlevereisen-voor-ondergrondse-revisie-vinden/',
      },
    },
    {
      sectie: 'Sleuf',
      norm: 'Zandlaag van 10cm voor bescherming',
      status: 'onbekend',
      opmerking: 'Nog niet gecontroleerd',
      bron: {
        titel: 'Liander inmeetvoorwaarden',
        url: 'https://bestekken.liander.nl/qa_faqs/waar-kan-ik-de-meest-actuele-inmeetvoorwaarden-en-aanlevereisen-voor-ondergrondse-revisie-vinden/',
      },
    },
    {
      sectie: 'Sleuf',
      norm: 'Breedte minimaal 0.4m',
      status: 'conform',
      opmerking: 'Voldoet aan eisen',
      bron: {
        titel: 'Liander inmeetvoorwaarden',
        url: 'https://bestekken.liander.nl/qa_faqs/waar-kan-ik-de-meest-actuele-inmeetvoorwaarden-en-aanlevereisen-voor-ondergrondse-revisie-vinden/',
      },
    },
    {
      sectie: 'Omgeving',
      norm: 'Minimale afstand tot bomen 3m',
      status: 'niet-conform',
      opmerking: 'Bomen op 5m afstand, wortels kunnen probleem zijn',
      bron: {
        titel: 'Liander inmeetvoorwaarden',
        url: 'https://bestekken.liander.nl/qa_faqs/waar-kan-ik-de-meest-actuele-inmeetvoorwaarden-en-aanlevereisen-voor-ondergrondse-revisie-vinden/',
      },
    },
    {
      sectie: 'Veiligheid',
      norm: 'Markering tape aanwezig',
      status: 'onbekend',
      opmerking: 'Nog niet gecontroleerd',
      bron: {
        titel: 'Liander inmeetvoorwaarden',
        url: 'https://bestekken.liander.nl/qa_faqs/waar-kan-ik-de-meest-actuele-inmeetvoorwaarden-en-aanlevereisen-voor-ondergrondse-revisie-vinden/',
      },
    },
  ],
  
  vergunningen: [
    'KLIC (Kabels en Leidingen Informatie Centrum)',
    'Gemeente vergunning',
    'Wegafzetting vergunning',
  ],
  
  materiaal: [
    'Gasleiding PE 32mm',
    'Elektrakabel 3x25mm²',
    'Waterleiding PE 32mm',
    'Zand voor bescherming',
    'Markering tape',
  ],
  
  acties: [
    {
      titel: 'Sleuf verdiepen',
      beschrijving: 'Sleuf verdiepen tot 0.8m voor vorstbescherming gasleiding',
      verantwoordelijke: 'Uitvoerder',
      deadline: 'Voor start werkzaamheden',
      prioriteit: 'hoog',
      status: 'open',
    },
    {
      titel: 'Zandlaag aanbrengen',
      beschrijving: 'Zandlaag van 10cm aanbrengen na verdiepen sleuf',
      verantwoordelijke: 'Uitvoerder',
      deadline: 'Na verdiepen sleuf',
      prioriteit: 'hoog',
      status: 'open',
    },
    {
      titel: 'Boomwortels onderzoeken',
      beschrijving: 'Nader onderzoek naar boomwortels en mogelijke impact op graafwerkzaamheden',
      verantwoordelijke: 'Toezichthouder',
      deadline: '1 week voor start',
      prioriteit: 'midden',
      status: 'open',
    },
  ],
  
  samenvatting: 'Het project kan doorgang vinden na aanpassing van de sleufdiepte. De meterkast voldoet aan alle eisen. Extra aandacht voor vorstbescherming van gasleiding en mogelijke obstakels door boomwortels. Alle vergunningen zijn aangevraagd en goedgekeurd.',
  
  bronnen: [
    {
      titel: 'Liander meterkast richtlijnen',
      url: 'https://www.liander.nl/meterkast/richtlijnen-en-eisen',
      datum: '7 oktober 2024',
      relevantie: 'Meterkast afmetingen en toegankelijkheid',
    },
    {
      titel: 'Liander inmeetvoorwaarden',
      url: 'https://bestekken.liander.nl/qa_faqs/waar-kan-ik-de-meest-actuele-inmeetvoorwaarden-en-aanlevereisen-voor-ondergrondse-revisie-vinden/',
      datum: '7 oktober 2024',
      relevantie: 'Sleufdiepte en -breedte eisen',
    },
    {
      titel: 'Vitens aansluitvoorwaarden',
      url: 'https://www.vitens.nl/zakelijk/waterleiding-aansluiten',
      datum: '7 oktober 2024',
      relevantie: 'Waterleiding aansluiting eisen',
    },
  ],
  
  bijzondereRisicos: 'Hoog waterpeil, archeologische waarden mogelijk',
};