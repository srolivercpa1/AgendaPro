import { AppShell } from '@/components/app-shell';
import { MetricCard } from '@/components/metric-card';

export default function FinanceiroPage() {
  return (
    <AppShell title="Financeiro" userName="Administrador" userRole="ADMINISTRATOR">
      <div className="grid gap-4 md:grid-cols-4">
        <MetricCard label="Faturamento diário" value="R$ 1.380" trend="+8%" />
        <MetricCard label="Recebimentos" value="R$ 9.200" trend="+12%" />
        <MetricCard label="Pendentes" value="R$ 2.840" trend="-4%" />
        <MetricCard label="Cancelados" value="R$ 540" trend="-2%" />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
          <h2 className="text-xl font-semibold">Contas a receber</h2>
          <div className="mt-5 space-y-4">
            {[
              ['João da Silva', 'R$ 150,00'],
              ['Maria Souza', 'R$ 90,00'],
              ['Pedro Costa', 'R$ 210,00']
            ].map(([name, amount]) => (
              <div key={name} className="flex items-center justify-between rounded-2xl bg-slate-50 p-3">
                <span className="text-slate-700">{name}</span>
                <strong className="text-slate-900">{amount}</strong>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
          <h2 className="text-xl font-semibold">Formas de pagamento</h2>
          <div className="mt-5 space-y-4">
            {[
              ['PIX', 'R$ 5.200'],
              ['Dinheiro', 'R$ 2.100'],
              ['Crédito', 'R$ 3.370'],
              ['Débito', 'R$ 1.320']
            ].map(([method, amount]) => (
              <div key={method} className="flex items-center justify-between rounded-2xl bg-slate-50 p-3">
                <span className="text-slate-700">{method}</span>
                <strong className="text-slate-900">{amount}</strong>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
