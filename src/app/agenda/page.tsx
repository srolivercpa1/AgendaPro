import { AppShell } from '@/components/app-shell';
import { MetricCard } from '@/components/metric-card';

const agenda = [
  { time: '09:00', client: 'João da Silva', service: 'Corte masculino' },
  { time: '10:30', client: 'Maria Souza', service: 'Manicure' },
  { time: '13:00', client: 'Ana Oliveira', service: 'Consulta' },
  { time: '15:15', client: 'Pedro Costa', service: 'Corte + barba' }
];

export default function AgendaPage() {
  return (
    <AppShell title="Agenda" userName="Administrador" userRole="ADMINISTRATOR">
      <div className="grid gap-4 md:grid-cols-4">
        <MetricCard label="Hoje" value="34" trend="+8%" />
        <MetricCard label="Semana" value="187" trend="+12%" />
        <MetricCard label="Confirmados" value="28" trend="+7%" />
        <MetricCard label="Cancelados" value="5" trend="-2%" />
      </div>

      <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Calendário do dia</h2>
          <button className="rounded-xl bg-brand-600 px-4 py-2 text-sm font-semibold text-white">Novo agendamento</button>
        </div>

        <div className="space-y-4">
          {agenda.map((item) => (
            <div key={item.time} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div>
                <p className="text-sm text-slate-500">{item.time}</p>
                <p className="font-semibold text-slate-800">{item.client}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-slate-500">Serviço</p>
                <p className="font-medium text-slate-800">{item.service}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
