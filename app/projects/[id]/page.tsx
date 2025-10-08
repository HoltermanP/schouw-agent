'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import UploadDropzone from '@/components/UploadDropzone';
import PhotoGrid from '@/components/PhotoGrid';
import ChecklistView from '@/components/ChecklistView';
import ReportEditor from '@/components/ReportEditor';
import PdfButton from '@/components/PdfButton';
import { formatDate } from '@/lib/utils';
import { PhotoCategory, PhotoCategoryType } from '@/lib/schema';

interface Project {
  id: number;
  naam: string;
  code: string;
  opdrachtgever: string;
  adres: string;
  postcode: string;
  plaats: string;
  kabellengte: number;
  nutsvoorzieningen: string;
  soortAansluiting: string;
  capaciteit: number;
  soortVerharding: string;
  boringNoodzakelijk: boolean;
  traceBeschrijving?: string;
  kruisingen?: string;
  obstakels?: string;
  buurtInformeren: boolean;
  wegafzettingNodig: boolean;
  vergunningen?: string;
  bijzondereRisicos?: string;
  uitvoerder: string;
  toezichthouder: string;
  bereikbaarheden: string;
  photos: Photo[];
  inspections: Inspection[];
  reports: Report[];
  createdAt: string;
  updatedAt: string;
}

interface Photo {
  id: number;
  url: string;
  categorie: string;
  exifData?: string;
  ocrText?: string;
  createdAt: string;
}

interface Inspection {
  id: number;
  findings: string;
  risks: string;
  actions: string;
  citations: string;
  createdAt: string;
}

interface Report {
  id: number;
  content: string;
  pdfUrl?: string;
  createdAt: string;
}

export default function ProjectDetail() {
  const params = useParams();
  const router = useRouter();
  const projectId = params.id as string;

  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchProject();
  }, [projectId]);

  const fetchProject = async () => {
    try {
      const response = await fetch(`/api/projects/${projectId}`);
      if (!response.ok) {
        throw new Error('Project niet gevonden');
      }
      const data = await response.json();
      setProject(data.project);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Onbekende fout');
    } finally {
      setLoading(false);
    }
  };

  const handlePhotoUpload = async (category: PhotoCategoryType, files: File[]) => {
    if (!project) return;

    try {
      const formData = new FormData();
      formData.append('projectId', project.id.toString());
      formData.append('category', category);
      files.forEach(file => formData.append('files', file));

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload gefaald');
      }

      // Refresh project data
      await fetchProject();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload gefaald');
    }
  };

  const handleAnalyze = async () => {
    if (!project) return;

    setAnalyzing(true);
    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ projectId: project.id }),
      });

      if (!response.ok) {
        throw new Error('AI-analyse gefaald');
      }

      // Refresh project data
      await fetchProject();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Analyse gefaald');
    } finally {
      setAnalyzing(false);
    }
  };

  const handleSaveReport = async (content: string) => {
    if (!project) return;

    setSaving(true);
    try {
      const response = await fetch('/api/report', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          projectId: project.id, 
          content 
        }),
      });

      if (!response.ok) {
        throw new Error('Rapport opslaan gefaald');
      }

      // Refresh project data
      await fetchProject();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Opslaan gefaald');
    } finally {
      setSaving(false);
    }
  };

  const handleGeneratePDF = async () => {
    if (!project) return;

    try {
      const response = await fetch('/api/pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ projectId: project.id }),
      });

      if (!response.ok) {
        throw new Error('PDF generatie gefaald');
      }

      // Nieuwe compacte PDF format - open HTML in nieuw tabblad
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      window.open(url, '_blank');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'PDF generatie gefaald');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2 text-gray-600">Laden...</span>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="text-center py-12">
        <div className="text-red-600 mb-4">
          <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          {error || 'Project niet gevonden'}
        </h3>
        <Button onClick={() => router.back()}>
          Terug
        </Button>
      </div>
    );
  }

  const latestInspection = project.inspections[0];
  const latestReport = project.reports[0];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{project.naam}</h1>
          <p className="text-gray-600 mt-2">
            {project.code} • {project.opdrachtgever}
          </p>
          <p className="text-gray-500 text-sm">
            {project.adres}, {project.postcode} {project.plaats}
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => router.back()}>
            Terug
          </Button>
          {latestReport?.pdfUrl && (
            <Button onClick={() => window.open(latestReport.pdfUrl, '_blank')}>
              PDF Bekijken
            </Button>
          )}
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      {/* Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overzicht</TabsTrigger>
          <TabsTrigger value="photos">Foto's</TabsTrigger>
          <TabsTrigger value="analysis">Analyse</TabsTrigger>
          <TabsTrigger value="report">Rapport</TabsTrigger>
          <TabsTrigger value="pdf">PDF</TabsTrigger>
        </TabsList>

        {/* Overzicht tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Project gegevens */}
            <Card>
              <CardHeader>
                <CardTitle>Project Gegevens</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <strong>Kabellengte:</strong> {project.kabellengte} m
                  </div>
                  <div>
                    <strong>Capaciteit:</strong> {project.capaciteit}
                  </div>
                  <div>
                    <strong>Nutsvoorzieningen:</strong> {typeof project.nutsvoorzieningen === 'string' ? JSON.parse(project.nutsvoorzieningen).join(', ') : project.nutsvoorzieningen}
                  </div>
                  <div>
                    <strong>Aansluiting:</strong> {project.soortAansluiting}
                  </div>
                  <div>
                    <strong>Verharding:</strong> {project.soortVerharding}
                  </div>
                  <div>
                    <strong>Boring:</strong> {project.boringNoodzakelijk ? 'Ja' : 'Nee'}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contactpersonen */}
            <Card>
              <CardHeader>
                <CardTitle>Contactpersonen</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm space-y-2">
                  <div>
                    <strong>Uitvoerder:</strong> {project.uitvoerder}
                  </div>
                  <div>
                    <strong>Toezichthouder:</strong> {project.toezichthouder}
                  </div>
                  <div>
                    <strong>Bereikbaarheden:</strong> {project.bereikbaarheden}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Status */}
          <Card>
            <CardHeader>
              <CardTitle>Project Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {project.photos.length}
                  </div>
                  <div className="text-sm text-gray-600">Foto's</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {project.inspections.length}
                  </div>
                  <div className="text-sm text-gray-600">Analyses</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {project.reports.length}
                  </div>
                  <div className="text-sm text-gray-600">Rapporten</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Foto's tab */}
        <TabsContent value="photos" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Upload sectie */}
            <div className="space-y-6">
              {Object.values(PhotoCategory).map((category) => (
                <UploadDropzone
                  key={category}
                  category={category}
                  onFilesUploaded={(files) => handlePhotoUpload(category, files.map(f => f.file))}
                  maxFiles={10}
                />
              ))}
            </div>

            {/* Foto grid */}
            <div>
              <PhotoGrid
                photos={project.photos}
                showMetadata={true}
              />
            </div>
          </div>
        </TabsContent>

        {/* Analyse tab */}
        <TabsContent value="analysis" className="space-y-6">
          {latestInspection ? (
            <ChecklistView
              findings={JSON.parse(latestInspection.findings)}
              risks={JSON.parse(latestInspection.risks)}
              actions={JSON.parse(latestInspection.actions)}
              citations={JSON.parse(latestInspection.citations)}
            />
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <div className="text-4xl mb-4">🤖</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Nog geen AI-analyse
                </h3>
                <p className="text-gray-600 mb-4">
                  Voer een AI-analyse uit om het project te beoordelen tegen Liander en Vitens eisen
                </p>
                <Button
                  onClick={handleAnalyze}
                  disabled={analyzing || project.photos.length === 0}
                  className="schouw-button-primary"
                >
                  {analyzing ? 'Analyseren...' : 'AI-analyse Uitvoeren'}
                </Button>
                {project.photos.length === 0 && (
                  <p className="text-sm text-gray-500 mt-2">
                    Upload eerst foto's om een analyse uit te voeren
                  </p>
                )}
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Rapport tab */}
        <TabsContent value="report" className="space-y-6">
          {latestReport ? (
            <ReportEditor
              content={latestReport.content}
              onSave={handleSaveReport}
              onGeneratePDF={handleGeneratePDF}
              loading={saving}
              projectName={project.naam}
              projectCode={project.code}
            />
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <div className="text-4xl mb-4">📝</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Nog geen rapport
                </h3>
                <p className="text-gray-600 mb-4">
                  Genereer een schouwrapport op basis van de projectgegevens en analyse
                </p>
                <Button
                  onClick={() => {
                    // Genereer basis rapport
                    const basicReport = `# SCHOUWRAPPORT

## 1. PROJECTGEGEVENS
**Project:** ${project.naam}
**Code:** ${project.code}
**Opdrachtgever:** ${project.opdrachtgever}
**Locatie:** ${project.adres}, ${project.postcode} ${project.plaats}
**Datum:** ${new Date().toLocaleDateString('nl-NL')}

## 2. BESTAANDE SITUATIE
**Kabellengte:** ${project.kabellengte} meter
**Nutsvoorzieningen:** ${typeof project.nutsvoorzieningen === 'string' ? JSON.parse(project.nutsvoorzieningen).join(', ') : (Array.isArray(project.nutsvoorzieningen) ? (project.nutsvoorzieningen as string[]).join(', ') : 'Niet opgegeven')}
**Soort aansluiting:** ${project.soortAansluiting}
**Capaciteit:** ${project.capaciteit}
**Soort verharding:** ${project.soortVerharding}

## 3. TECHNISCHE BEOORDELING
*AI-analyse resultaten worden hier weergegeven na uitvoering van de analyse.*

## 4. CIVIEL & VEILIGHEID
**Boring noodzakelijk:** ${project.boringNoodzakelijk ? 'Ja' : 'Nee'}
**Buurt informeren:** ${project.buurtInformeren ? 'Ja' : 'Nee'}
**Wegafzetting nodig:** ${project.wegafzettingNodig ? 'Ja' : 'Nee'}

## 5. VERGUNNINGEN & MELDINGEN
${project.vergunningen ? (typeof project.vergunningen === 'string' ? JSON.parse(project.vergunningen).join(', ') : project.vergunningen) : 'Nog te bepalen'}

## 6. ACTIEPUNTEN & OPEN VRAGEN
*Wordt ingevuld na AI-analyse*

## 7. SAMENVATTING/ADVIES
*Wordt ingevuld na AI-analyse*

## 8. BRONNEN
*Wordt ingevuld na AI-analyse*

## 9. BIJLAGEN
*Foto's en documenten worden hier vermeld*`;
                    
                    handleSaveReport(basicReport);
                  }}
                  className="schouw-button-primary"
                >
                  Basis Rapport Genereren
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* PDF tab */}
        <TabsContent value="pdf" className="space-y-6">
          <PdfButton
            projectId={project.id}
            projectName={project.naam}
            projectCode={project.code}
            pdfUrl={latestReport?.pdfUrl}
            onGenerate={fetchProject}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
