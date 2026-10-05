import { NextResponse } from 'next/server';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { createSession } from '@/lib/auth';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = loginSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: 'Dados de login inválidos.' }, { status: 400 });
    }

    const { email, password } = parsed.data;
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() }
    });

    if (!user) {
      return NextResponse.json({ error: 'Credenciais inválidas.' }, { status: 401 });
    }

    const validPassword = await bcrypt.compare(password, user.passwordHash);

    if (!validPassword) {
      return NextResponse.json({ error: 'Credenciais inválidas.' }, { status: 401 });
    }

    await createSession({
      id: user.id,
      companyId: user.companyId,
      email: user.email,
      role: user.role
    });

    return NextResponse.json({ success: true, redirectTo: '/dashboard' });
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao realizar login.' }, { status: 500 });
  }
}
