export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const campaigns = await prisma.campaign.findMany({
      include: { contacts: true },
      orderBy: { created_at: 'desc' }
    });
    return NextResponse.json(campaigns.map((c: any) => ({
      ...c,
      contact_count: c.contacts.length
    })));
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch campaigns' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const config = await prisma.agentConfig.findFirst();
    
    // Create the campaign in DB
    const campaign = await prisma.campaign.create({
      data: {
        name: body.name,
        agent_id: config?.id || 'default',
        contacts: {
          connect: body.contact_ids?.map((id: string) => ({ id })) || []
        }
      },
      include: { contacts: true }
    });

    // Process calls async
    const triggerCalls = async () => {
      for (const contact of campaign.contacts) {
        try {
          await fetch('https://api.bland.ai/v1/calls', {
            method: 'POST',
            headers: { 
              'Content-Type': 'application/json',
              'Authorization': process.env.BLAND_API_KEY || ''
            },
            body: JSON.stringify({
              phone_number: contact.phone,
              task: config?.system_prompt || '',
              voice: config?.voice_provider,
              interruption_threshold: config?.interruption_sensitivity || 50,
              reduce_latency: true,
              webhook: `${req.headers.get('origin') || 'http://' + req.headers.get('host')}/api/webhook`
            })
          });
          // Update status
          await prisma.contact.update({
            where: { id: contact.id },
            data: { status: 'contacted', last_contacted: new Date() }
          });
        } catch (e) {
          console.error("Failed call for", contact.phone);
        }
      }
    };
    
    triggerCalls();

    return NextResponse.json(campaign);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create campaign' }, { status: 500 });
  }
}
