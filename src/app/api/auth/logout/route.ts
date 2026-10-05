import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { SESSION_COOKIE_NAME } from '@/lib/auth';

export async function POST() {
  try {
    cookies().delete(SESSION_COOKIE_NAME);
    return NextResponse.redirect(new URL('/login', process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'));
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao fazer logout.' }, { status: 500 });
  }
}
