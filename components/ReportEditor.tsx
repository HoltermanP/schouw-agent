'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';

interface ReportEditorProps {
  content: string;
  onSave: (content: string) => void;
  onGeneratePDF: () => void;
  loading?: boolean;
  projectName?: string;
  projectCode?: string;
}

export default function ReportEditor({
  content,
  onSave,
  onGeneratePDF,
  loading = false,
  projectName,
  projectCode
}: ReportEditorProps) {
  const [editedContent, setEditedContent] = useState(content);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    setEditedContent(content);
    setHasChanges(false);
  }, [content]);

  const handleContentChange = (newContent: string) => {
    setEditedContent(newContent);
    setHasChanges(newContent !== content);
  };

  const handleSave = () => {
    onSave(editedContent);
    setHasChanges(false);
  };

  const handleGeneratePDF = () => {
    onGeneratePDF();
  };

  const getWordCount = (text: string) => {
    return text.trim().split(/\s+/).filter(word => word.length > 0).length;
  };

  const getSectionCount = (text: string) => {
    const sections = text.match(/^\d+\.\s/gm);
    return sections ? sections.length : 0;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle>Schouwrapport Editor</CardTitle>
              <CardDescription>
                Bewerk en genereer het schouwrapport
              </CardDescription>
            </div>
            <div className="flex space-x-2">
              {projectCode && (
                <Badge variant="outline">{projectCode}</Badge>
              )}
              {hasChanges && (
                <Badge className="bg-yellow-100 text-yellow-800">
                  Niet opgeslagen
                </Badge>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
            <div>
              <strong>Woorden:</strong> {getWordCount(editedContent)}
            </div>
            <div>
              <strong>Secties:</strong> {getSectionCount(editedContent)}
            </div>
            <div>
              <strong>Karakters:</strong> {editedContent.length}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Editor */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Rapport Inhoud</CardTitle>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                onClick={handleSave}
                disabled={!hasChanges || loading}
              >
                {loading ? 'Opslaan...' : 'Opslaan'}
              </Button>
              <Button
                onClick={handleGeneratePDF}
                disabled={loading}
                className="schouw-button-primary"
              >
                {loading ? 'Genereren...' : 'PDF Genereren'}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Textarea
            value={editedContent}
            onChange={(e) => handleContentChange(e.target.value)}
            placeholder="Voer hier de rapportinhoud in..."
            className="min-h-[600px] font-mono text-sm"
            disabled={loading}
          />
        </CardContent>
      </Card>

      {/* Rapport preview */}
      {editedContent && (
        <Card>
          <CardHeader>
            <CardTitle>Rapport Preview</CardTitle>
            <CardDescription>
              Voorbeeld van hoe het rapport eruit zal zien
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="prose max-w-none">
              <div 
                className="whitespace-pre-wrap text-sm leading-relaxed"
                dangerouslySetInnerHTML={{ 
                  __html: editedContent
                    .replace(/\n/g, '<br>')
                    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                    .replace(/\*(.*?)\*/g, '<em>$1</em>')
                }}
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Help sectie */}
      <Card>
        <CardHeader>
          <CardTitle>Rapport Structuur</CardTitle>
          <CardDescription>
            Aanbevolen indeling voor een professioneel schouwrapport
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium mb-2">Verplichte secties:</h4>
                <ul className="space-y-1 text-gray-600">
                  <li>1. Projectgegevens</li>
                  <li>2. Bestaande situatie</li>
                  <li>3. Technische beoordeling</li>
                  <li>4. Civiel & veiligheid</li>
                  <li>5. Vergunningen & meldingen</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Optionele secties:</h4>
                <ul className="space-y-1 text-gray-600">
                  <li>6. Materiaal & middelen</li>
                  <li>7. Actiepunten & open vragen</li>
                  <li>8. Samenvatting/advies</li>
                  <li>9. Bronnen</li>
                  <li>10. Bijlagen</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">Tips:</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Gebruik **vet** voor belangrijke termen</li>
                <li>• Gebruik *cursief* voor nadruk</li>
                <li>• Nummer secties met 1., 2., etc.</li>
                <li>• Verwijs naar foto's met (Foto X)</li>
                <li>• Wees specifiek en concreet</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
