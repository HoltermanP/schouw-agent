/**
 * Fotogrid component voor PDF rapportage
 * Responsive grid met onderschriften
 */

import React from 'react';
import { Text, View, Image } from '@react-pdf/renderer';
import { StyleSheet } from '@react-pdf/renderer';
import { tokens } from '../tokens';
import { fontFamilies } from '../fonts';
import { PhotoGridProps } from '../../types/report';
import { formatBestandsnaam, getCategorieIcon, formatDate } from '../utils';

const styles = StyleSheet.create({
  container: {
    marginBottom: tokens.spacing[6],
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  item: {
    marginBottom: tokens.spacing[4],
    borderRadius: 4,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: tokens.colors.border,
  },
  image: {
    width: '100%',
    height: tokens.components.photoGrid.itemHeight,
    objectFit: 'cover',
  },
  caption: {
    padding: tokens.spacing[2],
    backgroundColor: tokens.colors.surface,
  },
  title: {
    fontSize: tokens.fontSize.sm,
    fontWeight: 600,
    fontFamily: fontFamilies.body,
    color: tokens.colors.ink,
    marginBottom: tokens.spacing[1],
  },
  meta: {
    fontSize: tokens.components.photoGrid.captionSize,
    fontFamily: fontFamilies.body,
    color: tokens.colors.subtle,
    lineHeight: tokens.lineHeight.tight,
  },
  categorie: {
    fontSize: tokens.components.photoGrid.captionSize,
    fontWeight: 500,
    color: tokens.colors.primary,
    marginBottom: tokens.spacing[1],
  },
  // Responsive widths
  item2Col: {
    width: '48%',
  },
  item3Col: {
    width: '31%',
  },
  item4Col: {
    width: '23%',
  },
});

export const PhotoGrid: React.FC<PhotoGridProps> = ({
  fotos,
  columns = 3,
}) => {
  const getItemStyle = () => {
    switch (columns) {
      case 2:
        return styles.item2Col;
      case 3:
        return styles.item3Col;
      case 4:
        return styles.item4Col;
      default:
        return styles.item3Col;
    }
  };

  const itemStyle = getItemStyle();

  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        {fotos.map((foto) => (
          <View key={foto.id} style={[styles.item, itemStyle]}>
            <Image
              src={foto.uri}
              style={styles.image}
              alt={`${foto.categorie} foto`}
            />
            <View style={styles.caption}>
              <Text style={styles.categorie}>
                {getCategorieIcon(foto.categorie)} {foto.categorie.toUpperCase()}
              </Text>
              <Text style={styles.title}>
                {foto.titel || formatBestandsnaam(foto.bestandsnaam)}
              </Text>
              <Text style={styles.meta}>
                {foto.bestandsnaam} • {formatDate(foto.datumISO)}
              </Text>
              {foto.ocrText && (
                <Text style={styles.meta}>
                  OCR: {foto.ocrText.substring(0, 50)}...
                </Text>
              )}
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};