import { NextResponse } from 'next/server';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { createSession } from '@/lib/auth';

const registerSchema = z.object({
  companyName: z.string().min(2),
  responsibleName: z.string().min(2),
  document: z.string().min(11),
  phone: z.string().min(8),
  whatsapp: z.string().optional().or(z.literal('')),
  email: z.string().email(),
  address: z.string().optional().or(z.literal('')),
  city: z.string().optional().or(z.literal('')),
  state: z.string().optional().or(z.literal('')),
  zipCode: z.string().optional().or(z.literal('')),
  password: z.string().min(6)
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = registerSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: 'Dados inválidos para cadastro.' }, { status: 400 });
    }

    const data = parsed.data;
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email.toLowerCase() }
    });

    if (existingUser) {
      return NextResponse.json({ error: 'Este e-mail já está em uso.' }, { status: 409 });
    }

    const company = await prisma.company.create({
      data: {
        name: data.companyName,
        responsibleName: data.responsibleName,
        document: data.document,
        phone: data.phone,
        whatsapp: data.whatsapp || data.phone,
        email: data.email.toLowerCase(),
        address: data.address || '',
        city: data.city || '',
        state: data.state || '',
        zipCode: data.zipCode || ''
      }
    });

    const passwordHash = await bcrypt.hash(data.password, 10);

    const user = await prisma.user.create({
      data: {
        companyId: company.id,
        name: data.responsibleName,
        email: data.email.toLowerCase(),
        passwordHash,
        role: 'ADMINISTRATOR'
      }
    });

    await prisma.companySettings.create({
      data: {
        companyId: company.id,
        theme: 'light',
        whatsappMessage: 'Olá! Seu agendamento foi confirmado.',
        pixType: 'CPF',
        pixKey: '',
        beneficiaryName: company.name,
        timezone: 'America/Sao_Paulo'
      }
    });

    await prisma.subscription.create({
      data: {
        companyId: company.id,
        plan: 'BASICO',
        status: 'TRIAL',
        trialEndsAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
        nextBillingDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
        seats: 1
      }
    });

    await createSession({
      id: user.id,
      companyId: company.id,
      email: user.email,
      role: user.role
    });

    return NextResponse.json({ success: true, redirectTo: '/dashboard' }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao criar sua conta.' }, { status: 500 });
  }
}
