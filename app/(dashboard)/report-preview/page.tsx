/**
 * Preview pagina voor PDF rapportage
 * Client UI om voorbeeld te genereren en te downloaden
 */

'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2, Download, Eye, FileText } from 'lucide-react';
import { exampleRapportData } from '@/lib/pdf/example-data';
import { RapportInput } from '@/lib/types/report';

export default function ReportPreviewPage() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPreviewing, setIsPreviewing] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const generatePDF = async (data: RapportInput) => {
    setIsGenerating(true);
    setError(null);
    
    try {
      const response = await fetch('/api/pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'PDF generatie gefaald');
      }

      // Nieuwe compacte PDF format - genereer HTML
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setPdfUrl(url);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Onbekende fout');
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadPDF = () => {
    if (pdfUrl) {
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.download = `schouwrapport-${exampleRapportData.meta.code}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const previewPDF = () => {
    if (pdfUrl) {
      setIsPreviewing(true);
      window.open(pdfUrl, '_blank');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">PDF Rapportage Preview</h1>
          <p className="text-gray-600 mt-2">
            Genereer en download moderne PDF rapporten voor Schouw Agent
          </p>
        </div>

        {/* Demo Project Info */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Demo Project
            </CardTitle>
            <CardDescription>
              Voorbeeldproject voor PDF generatie
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold text-gray-900">{exampleRapportData.meta.naam}</h3>
                <p className="text-sm text-gray-600">Code: {exampleRapportData.meta.code}</p>
                <p className="text-sm text-gray-600">
                  {exampleRapportData.meta.locatie.straat}, {exampleRapportData.meta.locatie.postcode} {exampleRapportData.meta.locatie.plaats}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">Elektra</Badge>
                <Badge variant="outline">Gas</Badge>
                <Badge variant="outline">Water</Badge>
                <Badge variant="secondary">{exampleRapportData.fotos.length} foto's</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>PDF Generatie</CardTitle>
              <CardDescription>
                Genereer een moderne PDF van het demo project
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                onClick={() => generatePDF(exampleRapportData)}
                disabled={isGenerating}
                className="w-full"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Genereren...
                  </>
                ) : (
                  <>
                    <FileText className="mr-2 h-4 w-4" />
                    Genereer PDF
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {pdfUrl && (
            <Card>
              <CardHeader>
                <CardTitle>PDF Acties</CardTitle>
                <CardDescription>
                  Bekijk of download de gegenereerde PDF
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  onClick={previewPDF}
                  variant="outline"
                  className="w-full"
                >
                  <Eye className="mr-2 h-4 w-4" />
                  Bekijk PDF
                </Button>
                <Button
                  onClick={downloadPDF}
                  className="w-full"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download PDF
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Error Display */}
        {error && (
          <Card className="mb-8 border-red-200 bg-red-50">
            <CardContent className="pt-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">
                    PDF generatie gefaald
                  </h3>
                  <div className="mt-2 text-sm text-red-700">
                    {error}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Features */}
        <Card>
          <CardHeader>
            <CardTitle>Nieuwe Compacte PDF Features</CardTitle>
            <CardDescription>
              Moderne compacte PDF rapportage met verbeterde layout
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Compact Design</h4>
                  <p className="text-sm text-gray-600">Minder ruimte, meer informatie per pagina</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Grid Layouts</h4>
                  <p className="text-sm text-gray-600">2- en 3-kolommen grids voor efficiënte layout</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Status Badges</h4>
                  <p className="text-sm text-gray-600">Kleurrijke badges voor status en prioriteit</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Moderne Typography</h4>
                  <p className="text-sm text-gray-600">System fonts voor betere leesbaarheid</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Print Button</h4>
                  <p className="text-sm text-gray-600">Direct print naar PDF via browser</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2"></div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Responsive</h4>
                  <p className="text-sm text-gray-600">Werkt op alle schermformaten</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}