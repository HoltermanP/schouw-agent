import { parse } from 'exifr';

export interface EXIFData {
  gps?: {
    latitude: number;
    longitude: number;
  };
  dateTime?: string;
  make?: string;
  model?: string;
  software?: string;
  orientation?: number;
  width?: number;
  height?: number;
}

export async function extractEXIFData(file: File): Promise<EXIFData | null> {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const exifData = await parse(arrayBuffer);
    
    if (!exifData) return null;

    const result: EXIFData = {};

    // GPS data
    if (exifData.latitude && exifData.longitude) {
      result.gps = {
        latitude: exifData.latitude,
        longitude: exifData.longitude
      };
    }

    // Date/time
    if (exifData.DateTimeOriginal) {
      result.dateTime = exifData.DateTimeOriginal.toISOString();
    } else if (exifData.DateTime) {
      result.dateTime = exifData.DateTime.toISOString();
    }

    // Camera info
    if (exifData.Make) result.make = exifData.Make;
    if (exifData.Model) result.model = exifData.Model;
    if (exifData.Software) result.software = exifData.Software;
    if (exifData.Orientation) result.orientation = exifData.Orientation;
    if (exifData.ExifImageWidth) result.width = exifData.ExifImageWidth;
    if (exifData.ExifImageHeight) result.height = exifData.ExifImageHeight;

    return result;
  } catch (error) {
    // EXIF extraction error occurred
    return null;
  }
}
