import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Basic validation
    if (!body.projectId || !body.content) {
      return NextResponse.json(
        { error: 'Project ID en content zijn verplicht' },
        { status: 400 }
      );
    }

    // Return mock report save response
    const report = {
      id: Date.now(),
      projectId: body.projectId,
      content: body.content,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    return NextResponse.json({
      report,
      message: 'Rapport succesvol opgeslagen (mock)'
    });

  } catch (error) {
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

    // Return mock report data
    const report = {
      id: 1,
      projectId: parseInt(projectId),
      content: 'Mock rapport content',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    return NextResponse.json({ report });

  } catch (error) {
    return NextResponse.json(
      { error: 'Rapporten ophalen gefaald' },
      { status: 500 }
    );
  }
}