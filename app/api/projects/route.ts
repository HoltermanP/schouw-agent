import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request: NextRequest) {
  try {
    // Return mock data to avoid database calls during build
    const projects = [
      {
        id: 1,
        naam: 'Test Project 1',
        code: 'TP001',
        locatie: 'Amsterdam',
        opdrachtgever: 'Test Opdrachtgever',
        adres: 'Teststraat 1',
        postcode: '1000 AA',
        plaats: 'Amsterdam',
        kabellengte: 100,
        nutsvoorzieningen: '["elektra", "gas"]',
        soortAansluiting: 'Nieuw',
        capaciteit: 10,
        soortVerharding: 'Asfalt',
        boringNoodzakelijk: false,
        buurtInformeren: true,
        wegafzettingNodig: false,
        vergunningen: '["KLIC"]',
        createdAt: new Date(),
        updatedAt: new Date(),
        photos: [],
        inspections: []
      }
    ];

    return NextResponse.json({ projects });
  } catch (error) {
    return NextResponse.json(
      { error: 'Projecten ophalen gefaald' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Return mock project creation
    const project = {
      id: Date.now(),
      ...body,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    return NextResponse.json({
      project,
      message: 'Project succesvol aangemaakt'
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Project aanmaken gefaald' },
      { status: 500 }
    );
  }
}