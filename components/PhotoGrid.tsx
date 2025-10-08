'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatDate } from '@/lib/utils';
import Image from 'next/image';

interface Photo {
  id?: number;
  url: string;
  categorie: string;
  exifData?: string;
  ocrText?: string;
  createdAt?: string;
  filename?: string;
  originalName?: string;
  size?: number;
  type?: string;
}

interface PhotoGridProps {
  photos: Photo[];
  onDelete?: (photoId: number | string) => void;
  showMetadata?: boolean;
}

export default function PhotoGrid({ 
  photos, 
  onDelete, 
  showMetadata = false 
}: PhotoGridProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'meterkast':
        return '🏠';
      case 'gebouw':
        return '🏢';
      case 'locatie':
        return '📍';
      case 'omgevingssituatie':
        return '🌳';
      case 'sleuf':
        return '🕳️';
      case 'bijzonderheden':
        return '⚠️';
      default:
        return '📷';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'meterkast':
        return 'bg-blue-100 text-blue-800';
      case 'gebouw':
        return 'bg-green-100 text-green-800';
      case 'locatie':
        return 'bg-purple-100 text-purple-800';
      case 'omgevingssituatie':
        return 'bg-yellow-100 text-yellow-800';
      case 'sleuf':
        return 'bg-orange-100 text-orange-800';
      case 'bijzonderheden':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const parseEXIFData = (exifData?: string) => {
    if (!exifData) return null;
    try {
      return JSON.parse(exifData);
    } catch {
      return null;
    }
  };

  if (photos.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <div className="text-4xl mb-4">📷</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Nog geen foto's
          </h3>
          <p className="text-gray-600">
            Upload foto's om de schouw te documenteren
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Foto grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {photos.map((photo) => {
          const exifData = parseEXIFData(photo.exifData);
          
          return (
            <Card key={photo.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <div className="relative group">
                  <Image
                    src={photo.url}
                    alt={`${photo.categorie} foto`}
                    width={300}
                    height={128}
                    className="w-full h-32 object-cover cursor-pointer"
                    onClick={() => setSelectedPhoto(photo)}
                  />
                  
                  {/* Overlay met acties */}
                  <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => setSelectedPhoto(photo)}
                      >
                        Bekijk
                      </Button>
                      {onDelete && (
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => onDelete && photo.id && onDelete(photo.id)}
                        >
                          Verwijder
                        </Button>
                      )}
                    </div>
                  </div>

                  {/* Categorie badge */}
                  <div className="absolute top-2 left-2">
                    <Badge className={`${getCategoryColor(photo.categorie)} text-xs`}>
                      {getCategoryIcon(photo.categorie)} {photo.categorie}
                    </Badge>
                  </div>
                </div>

                {/* Metadata */}
                {showMetadata && exifData && (
                  <div className="p-3 space-y-1">
                    <div className="text-xs text-gray-600">
                      {photo.createdAt ? formatDate(new Date(photo.createdAt)) : 'Onbekend'}
                    </div>
                    {exifData.gps && (
                      <div className="text-xs text-gray-500">
                        📍 GPS beschikbaar
                      </div>
                    )}
                    {photo.ocrText && (
                      <div className="text-xs text-gray-500">
                        📝 OCR tekst
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Foto modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl max-h-[90vh] overflow-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold capitalize">
                    {getCategoryIcon(selectedPhoto.categorie)} {selectedPhoto.categorie}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {selectedPhoto.createdAt ? formatDate(new Date(selectedPhoto.createdAt)) : 'Onbekend'}
                  </p>
                </div>
                <Button
                  variant="outline"
                  onClick={() => setSelectedPhoto(null)}
                >
                  Sluiten
                </Button>
              </div>

              <Image
                src={selectedPhoto.url}
                alt={`${selectedPhoto.categorie} foto`}
                width={600}
                height={400}
                className="w-full h-auto rounded-lg mb-4"
              />

              {/* EXIF data */}
              {showMetadata && selectedPhoto.exifData && (
                <div className="space-y-4">
                  <h4 className="font-medium">EXIF Gegevens</h4>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <pre className="text-sm text-gray-700 whitespace-pre-wrap">
                      {JSON.stringify(parseEXIFData(selectedPhoto.exifData), null, 2)}
                    </pre>
                  </div>
                </div>
              )}

              {/* OCR tekst */}
              {showMetadata && selectedPhoto.ocrText && (
                <div className="space-y-4">
                  <h4 className="font-medium">OCR Tekst</h4>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-700">
                      {selectedPhoto.ocrText}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
