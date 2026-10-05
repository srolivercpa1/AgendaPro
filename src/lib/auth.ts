import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { createHmac } from 'crypto';
import { prisma } from '@/lib/prisma';

export const SESSION_COOKIE_NAME = 'agendapro_session';

export type Session = {
  userId: string;
  companyId: string;
  email: string;
  role: string;
  exp: number;
};

function getSessionSecret() {
  return process.env.AUTH_SECRET || 'agenda-pro-dev-secret';
}

function encodeSession(payload: Session) {
  const raw = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = createHmac('sha256', getSessionSecret()).update(raw).digest('hex');
  return `${raw}.${signature}`;
}

function decodeSession(raw: string): Session | null {
  try {
    const [payload, signature] = raw.split('.');
    if (!payload || !signature) return null;

    const expected = createHmac('sha256', getSessionSecret()).update(payload).digest('hex');
    if (expected !== signature) return null;

    const parsed = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8')) as Session;
    if (parsed.exp < Date.now() / 1000) {
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
}

export async function createSession(user: { id: string; companyId: string; email: string; role: string }) {
  const cookieStore = cookies();
  const payload: Session = {
    userId: user.id,
    companyId: user.companyId,
    email: user.email,
    role: user.role,
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7
  };

  cookieStore.set(SESSION_COOKIE_NAME, encodeSession(payload), {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24 * 7
  });
}

export async function getSession() {
  const cookieStore = cookies();
  const value = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if (!value) {
    return null;
  }

  return decodeSession(value);
}

export async function getCurrentUser() {
  const session = await getSession();

  if (!session) {
    return null;
  }

  return prisma.user.findUnique({
    where: { id: session.userId },
    include: { company: true }
  });
}

export async function requireAuth() {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/login');
  }

  return user;
}
