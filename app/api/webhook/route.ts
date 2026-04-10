export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get('x-webhook-signature') || req.headers.get('x-bland-signature');
    const secret = process.env.BLAND_WEBHOOK_SECRET;

    // Verify webhook authenticity
    if (secret && signature) {
      const expectedSignature = crypto
        .createHmac('sha256', secret)
        .update(rawBody)
        .digest('hex');

      const isValid = Buffer.byteLength(signature) === Buffer.byteLength(expectedSignature) &&
                      crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature));

      if (!isValid) {
        console.error("Webhook signature verification failed");
        return NextResponse.json({ error: 'Invalid webhook signature' }, { status: 401 });
      }
    }

    const payload = JSON.parse(rawBody);
    console.log("Verified Webhook Received from Bland AI:", payload);

    const callId = payload.call_id || payload.c_id;
    const phone = payload.to || payload.phone_number;

    // Handle updates based on webhook logic here
    if (payload.event === 'call.completed') {
      // Find a contact with this phone number to log interaction
      if (phone) {
        const contact = await prisma.contact.findFirst({
          where: { phone: phone }
        });
        
        if (contact) {
          await prisma.contact.update({
            where: { id: contact.id },
            data: { 
              status: payload.variables?.requires_follow_up ? 'follow-up' : 'contacted',
              last_contacted: new Date()
            }
          });
        }
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Webhook Error:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
