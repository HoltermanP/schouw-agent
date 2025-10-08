/**
 * Status pill component voor PDF rapportage
 * Kleurrijke capsules voor status indicatie
 */

import React from 'react';
import { Text, View } from '@react-pdf/renderer';
import { StyleSheet } from '@react-pdf/renderer';
import { tokens } from '../tokens';
import { fontFamilies } from '../fonts';
import { StatusPillProps, StatusType } from '../../types/report';
import { getStatusColor, formatStatus } from '../utils';

const styles = StyleSheet.create({
  pill: {
    borderRadius: tokens.components.pill.borderRadius,
    paddingHorizontal: tokens.components.pill.paddingHorizontal,
    paddingVertical: tokens.components.pill.paddingVertical,
    alignSelf: 'flex-start',
    marginRight: tokens.spacing[2],
    marginBottom: tokens.spacing[1],
  },
  text: {
    fontSize: tokens.components.pill.fontSize,
    fontWeight: tokens.components.pill.fontWeight,
    fontFamily: fontFamilies.body,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});

export const StatusPill: React.FC<StatusPillProps> = ({ status, label }) => {
  const colors = getStatusColor(status);
  const displayText = label || formatStatus(status);

  const pillStyle = [
    styles.pill,
    {
      backgroundColor: colors.background,
    },
  ];

  const textStyle = [
    styles.text,
    {
      color: colors.text,
    },
  ];

  return (
    <View style={pillStyle}>
      <Text style={textStyle}>{displayText}</Text>
    </View>
  );
};