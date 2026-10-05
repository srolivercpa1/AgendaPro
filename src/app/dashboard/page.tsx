import Link from 'next/link';
import { AppShell } from '@/components/app-shell';
import { MetricCard } from '@/components/metric-card';
import { requireAuth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export default async function DashboardPage() {
  const user = await requireAuth();

  const [appointmentsToday, customersCount, monthlyRevenue, pendingRevenue] = await Promise.all([
    prisma.appointment.count({
      where: {
        companyId: user.companyId,
        startAt: {
          gte: new Date(new Date().setHours(0, 0, 0, 0)),
          lt: new Date(new Date().setHours(23, 59, 59, 999))
        }
      }
    }),
    prisma.customer.count({ where: { companyId: user.companyId } }),
    prisma.invoice.aggregate({
      where: {
        companyId: user.companyId,
        createdAt: {
          gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
        }
      },
      _sum: { total: true }
    }),
    prisma.invoice.aggregate({
      where: {
        companyId: user.companyId,
        status: 'PENDENTE'
      },
      _sum: { total: true }
    })
  ]);

  const nextAppointments = await prisma.appointment.findMany({
    where: { companyId: user.companyId },
    include: { customer: true, professional: true, service: true },
    orderBy: { startAt: 'asc' },
    take: 5
  });

  const summaries = [
    { label: 'Agendamentos de hoje', value: String(appointmentsToday), trend: '+12%' },
    { label: 'Clientes cadastrados', value: String(customersCount), trend: '+8%' },
    { label: 'Faturamento do mês', value: `R$ ${Number(monthlyRevenue._sum.total ?? 0).toFixed(2)}`, trend: '+15%' },
    { label: 'Valores pendentes', value: `R$ ${Number(pendingRevenue._sum.total ?? 0).toFixed(2)}`, trend: '-5%' }
  ];

  return (
    <AppShell title="Dashboard" userName={user.name} userRole={user.role}>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {summaries.map((item) => (
          <MetricCard key={item.label} label={item.label} value={item.value} trend={item.trend} />
        ))}
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Próximos atendimentos</p>
              <h2 className="text-xl font-semibold">Agenda</h2>
            </div>
            <Link href="/agenda" className="text-sm font-medium text-brand-600">Ver agenda</Link>
          </div>

          <div className="space-y-4">
            {nextAppointments.map((appointment) => (
              <div key={appointment.id} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div>
                  <p className="font-semibold text-slate-800">{appointment.customer.name}</p>
                  <p className="text-sm text-slate-500">{appointment.service.name} · {appointment.professional.name}</p>
                </div>
                <div className="text-right text-sm text-slate-600">
                  <p>{new Date(appointment.startAt).toLocaleDateString('pt-BR')}</p>
                  <p>{new Date(appointment.startAt).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
          <p className="text-sm text-slate-500">Resumo operacional</p>
          <h2 className="mt-2 text-xl font-semibold">Indicadores</h2>
          <div className="mt-6 space-y-4">
            {[
              ['Faturamento mensal', 'R$ 18.420,00'],
              ['Atendimentos', '248'],
              ['Cancelamentos', '12'],
              ['Comissões', 'R$ 2.430,00']
            ].map(([label, value]) => (
              <div key={label} className="flex items-center justify-between rounded-2xl bg-slate-50 p-3">
                <span className="text-slate-600">{label}</span>
                <strong className="text-slate-900">{value}</strong>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
