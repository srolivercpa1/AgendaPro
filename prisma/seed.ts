import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const email = 'admin@agendapro.com';

  const existingCompany = await prisma.company.findUnique({
    where: { email: 'empresa@agendapro.com' }
  });

  if (existingCompany) {
    console.log('Seed já aplicado.');
    return;
  }

  const company = await prisma.company.create({
    data: {
      name: 'AgendaPro Demo',
      responsibleName: 'Responsável Demo',
      document: '76.858.237/0001-60',
      phone: '(11) 99999-3333',
      whatsapp: '(11) 99999-3333',
      email: 'empresa@agendapro.com',
      address: 'Rua das Empresas, 300',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01000-000',
      status: 'ACTIVE',
      settings: {
        create: {
          theme: 'light',
          whatsappMessage: 'Olá! Confirmamos seu agendamento.',
          pixType: 'CPF',
          pixKey: 'demo@agendapro.com',
          beneficiaryName: 'AgendaPro Demo',
          timezone: 'America/Sao_Paulo'
        }
      },
      subscription: {
        create: {
          plan: 'PRO',
          status: 'ACTIVE',
          trialEndsAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
          nextBillingDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
          seats: 5
        }
      }
    }
  });

  const passwordHash = await bcrypt.hash('admin123', 10);

  await prisma.user.create({
    data: {
      companyId: company.id,
      name: 'Administrador Demo',
      email,
      passwordHash,
      role: 'ADMINISTRATOR',
      isActive: true
    }
  });

  const customer = await prisma.customer.create({
    data: {
      companyId: company.id,
      name: 'João da Silva',
      cpf: '123.456.789-09',
      phone: '(11) 98888-1122',
      whatsapp: '(11) 98888-1122',
      email: 'joao@exemplo.com',
      address: 'Rua Central, 210',
      notes: 'Cliente recorrente.'
    }
  });

  const professional = await prisma.professional.create({
    data: {
      companyId: company.id,
      name: 'Carlos Almeida',
      phone: '(11) 97777-4455',
      email: 'carlos@agendapro.com',
      specialty: 'Barbearia',
      workHours: '09:00 às 18:00',
      availableDays: 'Segunda a Sábado',
      commission: 25,
      isActive: true
    }
  });

  const service = await prisma.service.create({
    data: {
      companyId: company.id,
      name: 'Corte Masculino',
      category: 'Beleza',
      description: 'Corte moderno com acabamento profissional.',
      price: 80,
      durationMinutes: 45,
      commission: 25,
      isActive: true
    }
  });

  await prisma.professionalService.create({
    data: {
      professionalId: professional.id,
      serviceId: service.id
    }
  });

  const now = new Date();
  const appointmentStart = new Date(now.getTime() + 1000 * 60 * 60 * 6);
  const appointmentEnd = new Date(appointmentStart.getTime() + 1000 * 60 * 45);

  const appointment = await prisma.appointment.create({
    data: {
      companyId: company.id,
      customerId: customer.id,
      professionalId: professional.id,
      serviceId: service.id,
      startAt: appointmentStart,
      endAt: appointmentEnd,
      status: 'AGENDADO',
      amount: service.price,
      paymentMethod: 'PIX',
      notes: 'Cliente solicitado corte clássico.'
    }
  });

  await prisma.invoice.create({
    data: {
      companyId: company.id,
      customerId: customer.id,
      appointmentId: appointment.id,
      total: service.price,
      status: 'PENDENTE',
      dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 10)
    }
  });

  await prisma.notification.createMany({
    data: [
      {
        companyId: company.id,
        title: 'Novo agendamento recebido',
        message: 'João da Silva agendou um corte masculino para hoje.'
      },
      {
        companyId: company.id,
        title: 'Pagamento pendente',
        message: 'Há 1 cobrança pendente para revisão.'
      }
    ]
  });

  console.log('Seed concluído com dados de demonstração.');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
