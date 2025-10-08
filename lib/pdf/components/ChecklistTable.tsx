/**
 * Checklist tabel component voor PDF rapportage
 * Professionele tabel met status indicatie
 */

import React from 'react';
import { Text, View } from '@react-pdf/renderer';
import { StyleSheet } from '@react-pdf/renderer';
import { tokens } from '../tokens';
import { fontFamilies } from '../fonts';
import { ChecklistTableProps } from '../../types/report';
import { StatusPill } from './StatusPill';

const styles = StyleSheet.create({
  container: {
    marginBottom: tokens.spacing[6],
  },
  table: {
    borderWidth: tokens.components.table.borderWidth,
    borderColor: tokens.colors.border,
    borderRadius: 4,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    backgroundColor: tokens.colors.surface,
    borderBottomWidth: tokens.components.table.borderWidth,
    borderBottomColor: tokens.colors.border,
  },
  headerCell: {
    padding: tokens.components.table.cellPadding,
    fontSize: tokens.fontSize.sm,
    fontWeight: 600,
    fontFamily: fontFamilies.body,
    color: tokens.colors.ink,
    borderRightWidth: tokens.components.table.borderWidth,
    borderRightColor: tokens.colors.border,
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: tokens.components.table.borderWidth,
    borderBottomColor: tokens.colors.border,
    minHeight: tokens.components.table.rowHeight,
  },
  rowEven: {
    backgroundColor: tokens.colors.surface,
  },
  cell: {
    padding: tokens.components.table.cellPadding,
    fontSize: tokens.fontSize.sm,
    fontFamily: fontFamilies.body,
    color: tokens.colors.ink,
    borderRightWidth: tokens.components.table.borderWidth,
    borderRightColor: tokens.colors.border,
    lineHeight: tokens.lineHeight.normal,
  },
  cellSectie: {
    width: '25%',
    fontWeight: 500,
  },
  cellNorm: {
    width: '35%',
  },
  cellStatus: {
    width: '20%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cellOpmerking: {
    width: '20%',
    fontSize: tokens.fontSize.xs,
    color: tokens.colors.subtle,
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export const ChecklistTable: React.FC<ChecklistTableProps> = ({ items }) => {
  return (
    <View style={styles.container}>
      <View style={styles.table}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.headerCell, styles.cellSectie]}>Sectie</Text>
          <Text style={[styles.headerCell, styles.cellNorm]}>Norm</Text>
          <Text style={[styles.headerCell, styles.cellStatus]}>Status</Text>
          <Text style={[styles.headerCell, styles.cellOpmerking]}>Opmerking</Text>
        </View>

        {/* Rows */}
        {items.map((item, index) => {
          const isEven = index % 2 === 0;
          const rowStyle = isEven ? [styles.row, styles.rowEven] : styles.row;

          return (
            <View key={index} style={rowStyle}>
              <Text style={[styles.cell, styles.cellSectie]}>{item.sectie}</Text>
              <Text style={[styles.cell, styles.cellNorm]}>{item.norm}</Text>
              <View style={[styles.cell, styles.cellStatus]}>
                <View style={styles.statusContainer}>
                  <StatusPill status={item.status} />
                </View>
              </View>
              <Text style={[styles.cell, styles.cellOpmerking]}>
                {item.opmerking || '-'}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};