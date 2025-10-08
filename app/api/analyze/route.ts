import { NextRequest, NextResponse } from 'next/server';
import { analyzeProjectWithAI } from '@/lib/openai';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const { projectId } = await request.json();

    if (!projectId) {
      return NextResponse.json({ error: 'Project ID is verplicht' }, { status: 400 });
    }

    // Haal project data op
    const project = await prisma.project.findUnique({
      where: { id: parseInt(projectId) },
      include: { photos: true }
    });

    if (!project) {
      return NextResponse.json({ error: 'Project niet gevonden' }, { status: 404 });
    }

    // Controleer OpenAI API key
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ 
        error: 'OpenAI API key niet geconfigureerd. Controleer je environment variabelen.' 
      }, { status: 500 });
    }

    // Bereid project data voor
    const projectData = {
      naam: project.naam,
      code: project.code,
      opdrachtgever: project.opdrachtgever,
      adres: project.adres,
      postcode: project.postcode,
      plaats: project.plaats,
      kabellengte: project.kabellengte,
      nutsvoorzieningen: typeof project.nutsvoorzieningen === 'string' 
        ? JSON.parse(project.nutsvoorzieningen) 
        : project.nutsvoorzieningen,
      soortAansluiting: project.soortAansluiting,
      capaciteit: project.capaciteit,
      soortVerharding: project.soortVerharding,
      boringNoodzakelijk: project.boringNoodzakelijk,
      traceBeschrijving: project.traceBeschrijving || undefined,
      kruisingen: project.kruisingen || undefined,
      obstakels: project.obstakels || undefined,
      buurtInformeren: project.buurtInformeren,
      wegafzettingNodig: project.wegafzettingNodig,
      vergunningen: typeof project.vergunningen === 'string' 
        ? JSON.parse(project.vergunningen) 
        : project.vergunningen,
      bijzondereRisicos: project.bijzondereRisicos || undefined
    };

    // Bereid foto metadata voor
    const photoMetadata = project.photos.map(photo => ({
      categorie: photo.categorie,
      exifData: photo.exifData ? JSON.parse(photo.exifData) : null,
      ocrText: photo.ocrText || undefined,
      filename: photo.url.split('/').pop() || 'unknown'
    }));

    // Voer AI analyse uit
    const analysis = await analyzeProjectWithAI(projectData, photoMetadata);

    // Sla analyse op in database
    const inspection = await prisma.inspection.create({
      data: {
        projectId: project.id,
        findings: JSON.stringify(analysis.findings),
        risks: JSON.stringify(analysis.risks),
        actions: JSON.stringify(analysis.actions),
        citations: JSON.stringify(analysis.citations)
      }
    });

    return NextResponse.json({
      success: true,
      analysis,
      inspectionId: inspection.id,
      message: 'AI-analyse succesvol voltooid'
    });

  } catch (error) {
    console.error('Analysis error:', error);
    return NextResponse.json(
      { error: 'AI-analyse gefaald. Probeer het opnieuw.' },
      { status: 500 }
    );
  }
}
