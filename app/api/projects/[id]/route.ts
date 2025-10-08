import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const projectId = parseInt(params.id);

    if (isNaN(projectId)) {
      return NextResponse.json({ error: 'Ongeldig project ID' }, { status: 400 });
    }

    const project = await prisma.project.findUnique({
      where: { id: projectId },
      include: {
        photos: {
          orderBy: { createdAt: 'desc' }
        },
        inspections: {
          orderBy: { createdAt: 'desc' }
        },
        reports: {
          orderBy: { createdAt: 'desc' }
        }
      }
    });

    if (!project) {
      return NextResponse.json({ error: 'Project niet gevonden' }, { status: 404 });
    }

    return NextResponse.json({ project });

  } catch (error) {
    // Project fetch error occurred
    return NextResponse.json(
      { error: 'Project ophalen gefaald' },
      { status: 500 }
    );
  }
}