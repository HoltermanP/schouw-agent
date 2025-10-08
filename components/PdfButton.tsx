'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface PdfButtonProps {
  projectId: number;
  projectName?: string;
  projectCode?: string;
  pdfUrl?: string;
  onGenerate?: () => void;
}

export default function PdfButton({
  projectId,
  projectName,
  projectCode,
  pdfUrl,
  onGenerate
}: PdfButtonProps) {
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGeneratePDF = async () => {
    setGenerating(true);
    setError(null);

    try {
      const response = await fetch('/api/pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ projectId }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'PDF generatie gefaald');
      }

      // Genereer HTML en trigger PDF download
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      
      // Open in nieuw venster voor print-to-PDF functionaliteit
      const printWindow = window.open(url, '_blank');
      if (printWindow) {
        printWindow.onload = () => {
          // Auto-trigger print dialog voor PDF export
          setTimeout(() => {
            printWindow.print();
          }, 500);
        };
      }
      
      if (onGenerate) {
        onGenerate();
      }

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Onbekende fout');
    } finally {
      setGenerating(false);
    }
  };

  const handleDownloadPDF = () => {
    if (pdfUrl) {
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.download = `schouwrapport-${projectCode || projectId}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <span>📄</span>
          <span>PDF Rapport</span>
        </CardTitle>
        <CardDescription>
          Genereer en download het schouwrapport als PDF
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-3">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        <div className="space-y-3">
          {pdfUrl ? (
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Badge className="bg-green-100 text-green-800">
                  ✅ PDF Beschikbaar
                </Badge>
                <span className="text-sm text-gray-600">
                  Laatst gegenereerd
                </span>
              </div>
              
              <div className="flex space-x-2">
                <Button
                  onClick={handleDownloadPDF}
                  className="schouw-button-primary"
                >
                  📥 Download PDF
                </Button>
                <Button
                  variant="outline"
                  onClick={() => window.open(pdfUrl, '_blank')}
                >
                  👁️ Bekijk PDF
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Badge className="bg-yellow-100 text-yellow-800">
                  ⏳ Nog niet gegenereerd
                </Badge>
              </div>
              
              <Button
                onClick={handleGeneratePDF}
                disabled={generating}
                className="schouw-button-primary w-full"
              >
                {generating ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    PDF Genereren...
                  </>
                ) : (
                  <>
                    📄 PDF Genereren
                  </>
                )}
              </Button>
            </div>
          )}
        </div>

        {/* Project info */}
        {(projectName || projectCode) && (
          <div className="pt-4 border-t">
            <div className="text-sm text-gray-600 space-y-1">
              {projectName && (
                <div><strong>Project:</strong> {projectName}</div>
              )}
              {projectCode && (
                <div><strong>Code:</strong> {projectCode}</div>
              )}
            </div>
          </div>
        )}

        {/* Help tekst */}
        <div className="bg-blue-50 rounded-lg p-3">
          <h4 className="font-medium text-blue-900 mb-2">Nieuwe Compacte PDF:</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Modern compact design met grid layouts</li>
            <li>• Kleurrijke status badges en prioriteit indicators</li>
            <li>• Responsive foto grid met metadata</li>
            <li>• Gestructureerde secties met compacte spacing</li>
            <li>• Print-optimized voor browser PDF export</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
