/**
 * Utility functies voor PDF generatie
 * Helper functies voor formatting, status, en layout
 */

import { tokens } from './tokens';
import { StatusType, PrioriteitType } from '../types/report';

/**
 * Formatteer datum naar Nederlandse notatie
 */
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('nl-NL', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

/**
 * Formatteer adres naar Nederlandse notatie
 */
export const formatAddress = (locatie: { straat: string; postcode: string; plaats: string }): string => {
  return `${locatie.straat}, ${locatie.postcode} ${locatie.plaats}`;
};

/**
 * Bepaal status kleur voor componenten
 */
export const getStatusColor = (status: StatusType) => {
  switch (status) {
    case 'conform':
      return {
        background: tokens.colors.success.bg,
        text: tokens.colors.success.text,
      };
    case 'niet-conform':
      return {
        background: tokens.colors.danger.bg,
        text: tokens.colors.danger.text,
      };
    case 'waarschuwing':
      return {
        background: tokens.colors.warning.bg,
        text: tokens.colors.warning.text,
      };
    case 'info':
      return {
        background: tokens.colors.info.bg,
        text: tokens.colors.info.text,
      };
    case 'onbekend':
    default:
      return {
        background: tokens.colors.surface,
        text: tokens.colors.muted,
      };
  }
};

/**
 * Bepaal prioriteit kleur
 */
export const getPrioriteitColor = (prioriteit: PrioriteitType) => {
  switch (prioriteit) {
    case 'hoog':
      return tokens.colors.danger.text;
    case 'midden':
      return tokens.colors.warning.text;
    case 'laag':
      return tokens.colors.success.text;
    default:
      return tokens.colors.subtle;
  }
};

/**
 * Formatteer status naar leesbare tekst
 */
export const formatStatus = (status: StatusType): string => {
  switch (status) {
    case 'conform':
      return 'CONFORM';
    case 'niet-conform':
      return 'NIET-CONFORM';
    case 'waarschuwing':
      return 'WAARSCHUWING';
    case 'info':
      return 'INFO';
    case 'onbekend':
    default:
      return 'ONBEKEND';
  }
};

/**
 * Formatteer prioriteit naar leesbare tekst
 */
export const formatPrioriteit = (prioriteit: PrioriteitType): string => {
  switch (prioriteit) {
    case 'hoog':
      return 'HOOG';
    case 'midden':
      return 'MIDDEN';
    case 'laag':
      return 'LAAG';
    default:
      return 'ONBEKEND';
  }
};

/**
 * Bepaal aantal kolommen voor fotogrid
 */
export const getPhotoGridColumns = (fotoCount: number): number => {
  if (fotoCount <= 2) return 2;
  if (fotoCount <= 6) return 3;
  return 4;
};

/**
 * Bereken optimale fotogrid layout
 */
export const calculatePhotoGridLayout = (fotoCount: number, availableWidth: number) => {
  const columns = getPhotoGridColumns(fotoCount);
  const gap = tokens.spacing[2];
  const itemWidth = (availableWidth - (columns - 1) * gap) / columns;
  
  return {
    columns,
    itemWidth,
    gap,
  };
};

/**
 * Formatteer bestandsnaam voor weergave
 */
export const formatBestandsnaam = (filename: string): string => {
  return filename.replace(/\.(jpg|jpeg|png|webp)$/i, '').replace(/[-_]/g, ' ');
};

/**
 * Bepaal categorie icon
 */
export const getCategorieIcon = (categorie: string): string => {
  switch (categorie) {
    case 'meterkast':
      return '⚡';
    case 'gebouw':
      return '🏢';
    case 'locatie':
      return '📍';
    case 'omgevingssituatie':
      return '🌍';
    case 'sleuf':
      return '🔧';
    case 'bijzonderheden':
      return '⚠️';
    default:
      return '📷';
  }
};

/**
 * Valideer rapport input
 */
export const validateRapportInput = (input: any): boolean => {
  return !!(
    input?.meta?.naam &&
    input?.meta?.code &&
    input?.meta?.locatie &&
    input?.nuts &&
    Array.isArray(input?.fotos) &&
    Array.isArray(input?.bevindingen)
  );
};

/**
 * Genereer unieke ID voor componenten
 */
export const generateId = (prefix: string = 'comp'): string => {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Bepaal paginabreak hint
 */
export const shouldPageBreak = (currentHeight: number, contentHeight: number): boolean => {
  const remainingHeight = tokens.layout.pageHeight - tokens.layout.margin - currentHeight;
  return contentHeight > remainingHeight;
};

/**
 * Formatteer getal met Nederlandse notatie
 */
export const formatNumber = (value: number, decimals: number = 1): string => {
  return value.toLocaleString('nl-NL', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
};

/**
 * Bepaal tekst kleur op basis van achtergrond
 */
export const getContrastColor = (backgroundColor: string): string => {
  // Eenvoudige contrast berekening
  const hex = backgroundColor.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 128 ? tokens.colors.ink : '#FFFFFF';
};