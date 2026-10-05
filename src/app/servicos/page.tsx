import { AppShell } from '@/components/app-shell';
import { MetricCard } from '@/components/metric-card';

const services = [
  { name: 'Corte masculino', price: 'R$ 80,00', duration: '45 min' },
  { name: 'Manicure', price: 'R$ 60,00', duration: '50 min' },
  { name: 'Consulta', price: 'R$ 150,00', duration: '60 min' }
];

export default function ServicosPage() {
  return (
    <AppShell title="Serviços" userName="Administrador" userRole="ADMINISTRATOR">
      <div className="grid gap-4 md:grid-cols-3">
        <MetricCard label="Serviços ativos" value="26" trend="+3" />
        <MetricCard label="Valor médio" value="R$ 95,00" trend="+10%" />
        <MetricCard label="Mais vendido" value="Corte masculino" trend="+24%" />
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {services.map((service) => (
          <div key={service.name} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
            <h3 className="text-lg font-semibold text-slate-800">{service.name}</h3>
            <p className="mt-2 text-sm text-slate-500">Categoria: Beleza</p>
            <div className="mt-4 space-y-2 text-sm text-slate-700">
              <p>Valor: <span className="font-semibold">{service.price}</span></p>
              <p>Duração: <span className="font-semibold">{service.duration}</span></p>
              <p>Comissão: <span className="font-semibold">20%</span></p>
            </div>
          </div>
        ))}
      </div>
    </AppShell>
  );
}
