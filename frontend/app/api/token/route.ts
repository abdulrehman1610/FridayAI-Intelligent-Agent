import { AccessToken } from 'livekit-server-sdk';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const room = req.nextUrl.searchParams.get('room') || `friday-${Date.now()}`;
  const username = req.nextUrl.searchParams.get('username') || `User_${Math.floor(Math.random() * 1000)}`;

  const apiKey = process.env.LIVEKIT_API_KEY;
  const apiSecret = process.env.LIVEKIT_API_SECRET;
  const url = process.env.LIVEKIT_URL;

  if (!apiKey || !apiSecret || !url) {
    return NextResponse.json({ error: 'Server misconfigured' }, { status: 500 });
  }

  const at = new AccessToken(apiKey, apiSecret, {
    identity: username,
    ttl: '1h',
  });

  at.addGrant({ roomJoin: true, room: room, canPublish: true, canSubscribe: true });

  return NextResponse.json({ token: await at.toJwt(), url: url });
}


