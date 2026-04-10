export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    const res = await fetch('https://api.bland.ai/v1/calls', {
      headers: {
        'authorization': process.env.BLAND_API_KEY || ''
      }
    });

    if (!res.ok) {
      throw new Error(`Bland API responded with ${res.status}`);
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("GET Bland calls err", error);
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    const requestBody = {
      phone_number: body.phone,
      task: body.task || 'You are calling on behalf of a company.',
      voice: body.voice || 'nat',
      reduce_latency: true,
      amd: true
    };

    const res = await fetch('https://api.bland.ai/v1/calls', {
      method: 'POST',
      headers: {
        'authorization': process.env.BLAND_API_KEY || '',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });
    
    if (!res.ok) {
        const text = await res.text();
        throw new Error(`Bland API Error: ${text}`);
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error("POST Bland call err", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
