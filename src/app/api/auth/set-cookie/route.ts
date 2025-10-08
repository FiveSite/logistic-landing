import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json();
  console.log('body', body);
  const { token } = body;

  if (!token) {
    return NextResponse.json({ error: 'Token is required' }, { status: 400 });
  }

  const cookieStore = await cookies();

  cookieStore.set({
    name: 'token',
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7, // 7 днів
    path: '/',
    sameSite: 'lax',
  });

  return NextResponse.json({ message: 'Token set in cookie' });
}
