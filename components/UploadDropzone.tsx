'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatFileSize } from '@/lib/utils';
import { PhotoCategory, PhotoCategoryType } from '@/lib/schema';
import Image from 'next/image';

interface UploadedFile {
  file: File;
  preview: string;
  exifData?: any;
  ocrText?: string;
}

interface UploadDropzoneProps {
  category: PhotoCategoryType;
  onFilesUploaded: (files: UploadedFile[]) => void;
  maxFiles?: number;
  maxSize?: number;
}

export default function UploadDropzone({
  category,
  onFilesUploaded,
  maxFiles = 10,
  maxSize = 10 * 1024 * 1024 // 10MB
}: UploadDropzoneProps) {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [uploading, setUploading] = useState(false);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;

    setUploading(true);

    try {
      const newFiles: UploadedFile[] = [];

      for (const file of acceptedFiles) {
        // Maak preview URL
        const preview = URL.createObjectURL(file);

        // Extract EXIF data (simplified for demo)
        let exifData = null;
        try {
          // In een echte implementatie zou je hier exifr gebruiken
          exifData = {
            filename: file.name,
            size: file.size,
            type: file.type,
            lastModified: file.lastModified
          };
        } catch (error) {
          // EXIF extraction failed
        }

        // Extract OCR text (simplified for demo)
        let ocrText = null;
        try {
          // In een echte implementatie zou je hier Tesseract.js gebruiken
          ocrText = null; // Placeholder
        } catch (error) {
          // OCR extraction failed
        }

        newFiles.push({
          file,
          preview,
          exifData,
          ocrText
        });
      }

      setUploadedFiles(prev => [...prev, ...newFiles].slice(0, maxFiles));
      onFilesUploaded(newFiles);

    } catch (error) {
      // File processing error occurred
    } finally {
      setUploading(false);
    }
  }, [maxFiles, onFilesUploaded]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
      'image/webp': ['.webp']
    },
    maxSize,
    maxFiles: maxFiles - uploadedFiles.length
  });

  const removeFile = (index: number) => {
    const newFiles = uploadedFiles.filter((_, i) => i !== index);
    setUploadedFiles(newFiles);
    onFilesUploaded(newFiles);
  };

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

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <span className="text-2xl">{getCategoryIcon(category)}</span>
        <h3 className="text-lg font-semibold capitalize">{category}</h3>
        <Badge variant="outline">
          {uploadedFiles.length}/{maxFiles}
        </Badge>
      </div>

      <Card>
        <CardContent className="p-6">
          <div
            {...getRootProps()}
            className={`photo-upload-area ${
              isDragActive ? 'dragover' : ''
            } ${uploading ? 'opacity-50' : ''}`}
          >
            <input {...getInputProps()} />
            <div className="text-center">
              <div className="text-4xl mb-4">📷</div>
              <p className="text-lg font-medium mb-2">
                {isDragActive
                  ? 'Laat de foto\'s los...'
                  : 'Sleep foto\'s hier of klik om te selecteren'}
              </p>
              <p className="text-sm text-gray-500">
                JPG, PNG, WebP • Max {formatFileSize(maxSize)} per bestand
              </p>
              {uploading && (
                <div className="mt-4">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto"></div>
                  <p className="text-sm text-gray-600 mt-2">Verwerken...</p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {uploadedFiles.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-medium">Geüploade foto's:</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {uploadedFiles.map((uploadedFile, index) => (
              <div key={index} className="relative group">
                <Image
                  src={uploadedFile.preview}
                  alt={`Preview ${index + 1}`}
                  width={200}
                  height={96}
                  className="w-full h-24 object-cover rounded-lg border"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => removeFile(index)}
                    className="text-xs"
                  >
                    Verwijder
                  </Button>
                </div>
                <div className="mt-1 text-xs text-gray-600 truncate">
                  {uploadedFile.file.name}
                </div>
                <div className="text-xs text-gray-500">
                  {formatFileSize(uploadedFile.file.size)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
