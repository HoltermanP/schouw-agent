/**
 * Callout component voor PDF rapportage
 * Opvallende informatie blokken met iconen
 */

import React from 'react';
import { Text, View } from '@react-pdf/renderer';
import { StyleSheet } from '@react-pdf/renderer';
import { tokens } from '../tokens';
import { fontFamilies } from '../fonts';
import { CalloutProps } from '../../types/report';

const styles = StyleSheet.create({
  container: {
    borderRadius: tokens.components.callout.borderRadius,
    padding: tokens.components.callout.padding,
    marginVertical: tokens.components.callout.marginVertical,
    marginHorizontal: tokens.spacing[2],
    maxWidth: '90%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: tokens.spacing[2],
  },
  icon: {
    fontSize: tokens.fontSize.lg,
    marginRight: tokens.spacing[2],
  },
  title: {
    fontSize: tokens.fontSize.base,
    fontWeight: 600,
    fontFamily: fontFamilies.body,
    flex: 1,
  },
  content: {
    fontSize: tokens.fontSize.sm,
    fontFamily: fontFamilies.body,
    lineHeight: tokens.lineHeight.normal,
    color: tokens.colors.ink,
  },
  // Tone specific styles
  info: {
    backgroundColor: tokens.colors.info.bg,
    borderLeft: `4px solid ${tokens.colors.info.text}`,
  },
  success: {
    backgroundColor: tokens.colors.success.bg,
    borderLeft: `4px solid ${tokens.colors.success.text}`,
  },
  warning: {
    backgroundColor: tokens.colors.warning.bg,
    borderLeft: `4px solid ${tokens.colors.warning.text}`,
  },
  danger: {
    backgroundColor: tokens.colors.danger.bg,
    borderLeft: `4px solid ${tokens.colors.danger.text}`,
  },
});

const getToneIcon = (tone: CalloutProps['tone']): string => {
  switch (tone) {
    case 'info':
      return 'ℹ️';
    case 'success':
      return '✅';
    case 'warning':
      return '⚠️';
    case 'danger':
      return '🚨';
    default:
      return 'ℹ️';
  }
};

const getToneTitle = (tone: CalloutProps['tone']): string => {
  switch (tone) {
    case 'info':
      return 'Informatie';
    case 'success':
      return 'Succes';
    case 'warning':
      return 'Waarschuwing';
    case 'danger':
      return 'Kritiek';
    default:
      return 'Informatie';
  }
};

export const Callout: React.FC<CalloutProps> = ({
  tone,
  title,
  children,
}) => {
  const containerStyle = [
    styles.container,
    styles[tone],
  ];

  const displayTitle = title || getToneTitle(tone);
  const icon = getToneIcon(tone);

  return (
    <View style={containerStyle}>
      <View style={styles.header}>
        <Text style={styles.icon}>{icon}</Text>
        <Text style={styles.title}>{displayTitle}</Text>
      </View>
      <Text style={styles.content}>{children}</Text>
    </View>
  );
};