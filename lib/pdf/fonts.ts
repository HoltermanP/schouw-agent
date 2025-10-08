/**
 * Font registratie voor Schouw Agent PDF
 * Gebruikt Google Fonts voor moderne typografie
 */

import { Font } from '@react-pdf/renderer';

// Font registratie voor @react-pdf/renderer
export const registerFonts = () => {
  // Archivo - voor headings (bold, modern)
  Font.register({
    family: 'Archivo',
    fonts: [
      {
        src: '/fonts/archivo-regular.woff2',
        fontWeight: 'normal',
      },
      {
        src: '/fonts/archivo-600.woff2',
        fontWeight: 600,
      },
      {
        src: '/fonts/archivo-700.woff2',
        fontWeight: 700,
      },
    ],
  });

  // Inter - voor body text (leesbaar, professioneel)
  Font.register({
    family: 'Inter',
    fonts: [
      {
        src: '/fonts/inter-regular.woff2',
        fontWeight: 'normal',
      },
      {
        src: '/fonts/inter-500.woff2',
        fontWeight: 500,
      },
      {
        src: '/fonts/inter-600.woff2',
        fontWeight: 600,
      },
    ],
  });

  // JetBrains Mono - voor cijfers en code
  Font.register({
    family: 'JetBrainsMono',
    fonts: [
      {
        src: '/fonts/jetbrains-mono-regular.woff2',
        fontWeight: 'normal',
      },
      {
        src: '/fonts/jetbrains-mono-500.woff2',
        fontWeight: 500,
      },
    ],
  });
};

// Font families voor gebruik in styles
export const fontFamilies = {
  heading: 'Archivo',
  body: 'Inter',
  mono: 'JetBrainsMono',
} as const;

// Fallback fonts voor als Google Fonts niet beschikbaar zijn
export const fallbackFonts = {
  heading: 'Helvetica-Bold',
  body: 'Helvetica',
  mono: 'Courier',
} as const;