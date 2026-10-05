import { AppShell } from '@/components/app-shell';
import { MetricCard } from '@/components/metric-card';

const professionals = [
  { name: 'Carlos Almeida', specialty: 'Barbeiro', atendimentos: 132 },
  { name: 'Marina Costa', specialty: 'Manicure', atendimentos: 98 },
  { name: 'Pedro Nogueira', specialty: 'Consulta', atendimentos: 74 }
];

export default function ProfissionaisPage() {
  return (
    <AppShell title="Profissionais" userName="Administrador" userRole="ADMINISTRATOR">
      <div className="grid gap-4 md:grid-cols-3">
        <MetricCard label="Profissionais ativos" value="18" trend="+2" />
        <MetricCard label="Atendimentos hoje" value="39" trend="+10%" />
        <MetricCard label="Comissão total" value="R$ 3.240" trend="+8%" />
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {professionals.map((professional) => (
          <div key={professional.name} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-100 text-lg font-semibold text-brand-700">
              {professional.name.split(' ').map((part) => part[0]).slice(0, 2).join('')}
            </div>
            <h3 className="text-lg font-semibold text-slate-800">{professional.name}</h3>
            <p className="text-sm text-slate-500">{professional.specialty}</p>
            <div className="mt-5 rounded-2xl bg-slate-50 p-3 text-sm text-slate-600">
              Atendimentos: <span className="font-semibold text-slate-900">{professional.atendimentos}</span>
            </div>
          </div>
        ))}
      </div>
    </AppShell>
  );
}
