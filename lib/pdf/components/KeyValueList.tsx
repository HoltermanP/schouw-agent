/**
 * Key-Value lijst component voor PDF rapportage
 * Nette uitlijning van labels en waarden
 */

import React from 'react';
import { Text, View } from '@react-pdf/renderer';
import { StyleSheet } from '@react-pdf/renderer';
import { tokens } from '../tokens';
import { fontFamilies } from '../fonts';
import { KeyValueListProps } from '../../types/report';
import { StatusPill } from './StatusPill';

const styles = StyleSheet.create({
  container: {
    marginBottom: tokens.spacing[4],
  },
  row: {
    flexDirection: 'row',
    marginBottom: tokens.spacing[2],
    alignItems: 'flex-start',
  },
  label: {
    fontSize: tokens.fontSize.sm,
    fontWeight: 600,
    fontFamily: fontFamilies.body,
    color: tokens.colors.ink,
    width: '40%',
    marginRight: tokens.spacing[3],
  },
  value: {
    fontSize: tokens.fontSize.sm,
    fontWeight: 400,
    fontFamily: fontFamilies.body,
    color: tokens.colors.ink,
    flex: 1,
    lineHeight: tokens.lineHeight.normal,
  },
  valueMono: {
    fontFamily: fontFamilies.mono,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  twoColumn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  twoColumnItem: {
    width: '48%',
  },
});

export const KeyValueList: React.FC<KeyValueListProps> = ({
  items,
  columns = 1,
}) => {
  const isTwoColumn = columns === 2;
  const containerStyle = isTwoColumn ? [styles.container, styles.twoColumn] : styles.container;

  return (
    <View style={containerStyle}>
      {items.map((item, index) => {
        const itemStyle = isTwoColumn ? [styles.twoColumnItem] : {};
        
        return (
          <View key={index} style={[styles.row, ...itemStyle]}>
            <Text style={styles.label}>{item.label}:</Text>
            <View style={styles.statusContainer}>
              {item.status ? (
                <StatusPill status={item.status} />
              ) : (
                <Text style={[
                  styles.value,
                  typeof item.value === 'number' && styles.valueMono,
                ]}>
                  {typeof item.value === 'boolean' 
                    ? (item.value ? 'Ja' : 'Nee')
                    : String(item.value)
                  }
                </Text>
              )}
            </View>
          </View>
        );
      })}
    </View>
  );
};