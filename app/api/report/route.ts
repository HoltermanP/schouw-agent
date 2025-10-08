import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { reportSchema } from '@/lib/schema';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Valideer input
    const validatedData = reportSchema.parse(body);

    // Controleer of project bestaat
    const project = await prisma.project.findUnique({
      where: { id: validatedData.projectId }
    });

    if (!project) {
      return NextResponse.json({ error: 'Project niet gevonden' }, { status: 404 });
    }

    // Maak of update rapport
    const existingReport = await prisma.report.findFirst({
      where: { projectId: validatedData.projectId }
    });

    const report = existingReport 
      ? await prisma.report.update({
          where: { id: existingReport.id },
          data: { content: validatedData.content }
        })
      : await prisma.report.create({
          data: {
            projectId: validatedData.projectId,
            content: validatedData.content
          }
        });

    return NextResponse.json({
      success: true,
      report,
      message: 'Rapport succesvol opgeslagen'
    });

  } catch (error) {
    // Report save error occurred
    
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Ongeldige invoer. Controleer alle velden.' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Rapport opslaan gefaald' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const projectId = searchParams.get('projectId');

    if (!projectId) {
      return NextResponse.json({ error: 'Project ID is verplicht' }, { status: 400 });
    }

    const reports = await prisma.report.findMany({
      where: { projectId: parseInt(projectId) },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json({ reports });

  } catch (error) {
    // Reports fetch error occurred
    return NextResponse.json(
      { error: 'Rapporten ophalen gefaald' },
      { status: 500 }
    );
  }
}
