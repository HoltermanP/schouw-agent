/**
 * Design tokens voor Schouw Agent PDF rapportage
 * Gebaseerd op moderne typografie en print-optimale kleuren
 */

export const tokens = {
  // Typografische schaal (in points voor PDF)
  fontSize: {
    xs: 10,
    sm: 12,
    base: 14,
    lg: 16,
    xl: 18,
    '2xl': 22,
    '3xl': 28,
  },
  
  // Line heights voor leesbaarheid
  lineHeight: {
    tight: 1.2,
    normal: 1.35,
    relaxed: 1.5,
  },
  
  // Spacing (8-pt schaal in points)
  spacing: {
    1: 4,
    2: 8,
    3: 12,
    4: 16,
    6: 24,
    8: 32,
    12: 48,
  },
  
  // Kleuren (print- en schermvriendelijk)
  colors: {
    // Primary palette
    primary: '#0A84FF',
    primaryLight: '#E6F0FF',
    
    // Text colors
    ink: '#1B1B1F',
    subtle: '#6B7280',
    muted: '#9CA3AF',
    
    // Background colors
    background: '#FFFFFF',
    surface: '#F9FAFB',
    border: '#E5E7EB',
    
    // Status colors
    success: {
      bg: '#E7F7EF',
      text: '#16A34A',
    },
    warning: {
      bg: '#FFF7E6',
      text: '#F59E0B',
    },
    danger: {
      bg: '#FEECEC',
      text: '#DC2626',
    },
    info: {
      bg: '#E6F0FF',
      text: '#2563EB',
    },
  },
  
  // Layout
  layout: {
    pageWidth: 595.28, // A4 width in points
    pageHeight: 841.89, // A4 height in points
    margin: 68.03, // 24mm in points
    contentWidth: 459.22, // pageWidth - 2*margin
    columnGap: 16,
  },
  
  // Component specific
  components: {
    // Status pills
    pill: {
      borderRadius: 12,
      paddingHorizontal: 12,
      paddingVertical: 6,
      fontSize: 10,
      fontWeight: 600,
    },
    
    // Tables
    table: {
      cellPadding: 8,
      headerHeight: 32,
      rowHeight: 24,
      borderWidth: 0.5,
    },
    
    // Callouts
    callout: {
      borderRadius: 8,
      padding: 16,
      marginVertical: 12,
    },
    
    // Photo grid
    photoGrid: {
      itemHeight: 120,
      captionSize: 10,
      gap: 8,
    },
  },
} as const;

export type DesignTokens = typeof tokens;