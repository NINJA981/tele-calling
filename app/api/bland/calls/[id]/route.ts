export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = await params;
    const res = await fetch(`https://api.bland.ai/v1/calls/${id}`, {
      headers: {
        'authorization': process.env.BLAND_API_KEY || ''
      }
    });

    if (!res.ok) {
      throw new Error(`Bland API responded with ${res.status}`);
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error("GET Bland call info err", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
