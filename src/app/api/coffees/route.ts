import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const coffees = await prisma.coffee.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json(coffees);
  } catch (error) {
    console.error('Error fetching coffees:', error);
    return NextResponse.json(
      { error: 'Failed to fetch coffees' },
      { status: 500 }
    );
  }
}
