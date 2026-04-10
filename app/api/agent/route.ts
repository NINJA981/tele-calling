export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    let config = await prisma.agentConfig.findFirst();
    if (!config) {
      config = await prisma.agentConfig.create({
        data: {
          system_prompt: 'You are an AI sales assistant. Keep the conversation professional and try to schedule a follow-up meeting.',
          response_eagerness: 0.5,
          interruption_sensitivity: 0.5,
          denoising_enabled: true,
          voice_provider: 'google',
        }
      });
    }
    return NextResponse.json(config);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch agent config' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    let config = await prisma.agentConfig.findFirst();
    if (config) {
      config = await prisma.agentConfig.update({
        where: { id: config.id },
        data: body
      });
    } else {
      config = await prisma.agentConfig.create({ data: body });
    }
    return NextResponse.json(config);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update agent config' }, { status: 500 });
  }
}
