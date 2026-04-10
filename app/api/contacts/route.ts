export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const contacts = await prisma.contact.findMany({
      orderBy: { last_contacted: 'desc' }
    });
    return NextResponse.json(contacts);
  } catch (error) {
    console.error("Error fetching contacts:", error);
    return NextResponse.json({ error: 'Failed to fetch contacts', details: String(error) }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    let data;

    // Handle bulk import (array) or single contact creation
    if (Array.isArray(body)) {
      await prisma.contact.createMany({
        data: body.map((c: any) => ({
          name: c.name,
          phone: c.phone,
          email: c.email || null,
        }))
      });
      data = await prisma.contact.findMany();
    } else {
      data = await prisma.contact.create({
        data: {
          name: body.name,
          phone: body.phone,
          email: body.email || null,
        }
      });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error creating contact:", error);
    return NextResponse.json({ error: 'Failed to create contact(s)', details: String(error) }, { status: 500 });
  }
}
