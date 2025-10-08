import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const revalidate = 0;

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const projects = await prisma.project.findMany({
      include: {
        photos: true,
        inspections: {
          orderBy: { createdAt: 'desc' },
          take: 1
        },
        reports: {
          orderBy: { createdAt: 'desc' },
          take: 1
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json({ projects });

  } catch (error) {
    // Projects fetch error occurred
    return NextResponse.json(
      { error: 'Projecten ophalen gefaald' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Maak nieuw project
    const project = await prisma.project.create({
      data: {
        naam: body.naam,
        code: body.code,
        opdrachtgever: body.opdrachtgever,
        adres: body.adres,
        postcode: body.postcode,
        plaats: body.plaats,
        latitude: body.latitude,
        longitude: body.longitude,
        kabellengte: parseFloat(body.kabellengte),
        nutsvoorzieningen: JSON.stringify(body.nutsvoorzieningen || []),
        soortAansluiting: body.soortAansluiting,
        capaciteit: parseFloat(body.capaciteit),
        soortVerharding: body.soortVerharding,
        boringNoodzakelijk: Boolean(body.boringNoodzakelijk),
        traceBeschrijving: body.traceBeschrijving,
        kruisingen: body.kruisingen,
        obstakels: body.obstakels,
        buurtInformeren: Boolean(body.buurtInformeren),
        buurtNotitie: body.buurtNotitie,
        wegafzettingNodig: Boolean(body.wegafzettingNodig),
        wegafzettingPeriode: body.wegafzettingPeriode,
        vergunningen: body.vergunningen ? JSON.stringify(body.vergunningen) : null,
        bijzondereRisicos: body.bijzondereRisicos,
        uitvoerder: body.uitvoerder,
        toezichthouder: body.toezichthouder,
        bereikbaarheden: body.bereikbaarheden
      }
    });

    return NextResponse.json({
      success: true,
      project,
      message: 'Project succesvol aangemaakt'
    });

  } catch (error) {
    // Project creation error occurred
    return NextResponse.json(
      { error: 'Project aanmaken gefaald' },
      { status: 500 }
    );
  }
}