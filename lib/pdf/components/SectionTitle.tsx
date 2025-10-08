/**
 * Sectietitel component voor PDF rapportage
 * Moderne typografie met gekleurde accent
 */

import React from 'react';
import { Text, View } from '@react-pdf/renderer';
import { StyleSheet } from '@react-pdf/renderer';
import { tokens } from '../tokens';
import { fontFamilies } from '../fonts';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  level?: 1 | 2 | 3;
  showAccent?: boolean;
}

const styles = StyleSheet.create({
  container: {
    marginBottom: tokens.spacing[4],
    marginTop: tokens.spacing[6],
  },
  accent: {
    height: 3,
    backgroundColor: tokens.colors.primary,
    marginBottom: tokens.spacing[2],
    borderRadius: 1.5,
  },
  title: {
    fontSize: tokens.fontSize['2xl'],
    fontWeight: 700,
    fontFamily: fontFamilies.heading,
    color: tokens.colors.ink,
    lineHeight: tokens.lineHeight.tight,
    marginBottom: tokens.spacing[1],
  },
  subtitle: {
    fontSize: tokens.fontSize.sm,
    fontWeight: 500,
    fontFamily: fontFamilies.body,
    color: tokens.colors.subtle,
    lineHeight: tokens.lineHeight.normal,
  },
  level2: {
    fontSize: tokens.fontSize.xl,
    marginTop: tokens.spacing[4],
  },
  level3: {
    fontSize: tokens.fontSize.lg,
    marginTop: tokens.spacing[3],
  },
});

export const SectionTitle: React.FC<SectionTitleProps> = ({
  title,
  subtitle,
  level = 1,
  showAccent = true,
}) => {
  const titleStyle = [
    styles.title,
    ...(level === 2 ? [styles.level2] : []),
    ...(level === 3 ? [styles.level3] : []),
  ];

  return (
    <View style={styles.container}>
      {showAccent && level === 1 && <View style={styles.accent} />}
      <Text style={titleStyle}>{title}</Text>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </View>
  );
};