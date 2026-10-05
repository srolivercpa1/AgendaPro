import { AppShell } from '@/components/app-shell';
import { MetricCard } from '@/components/metric-card';

const tableRows = [
  { name: 'João da Silva', cpf: '123.456.789-09', phone: '(11) 98888-1122' },
  { name: 'Maria Souza', cpf: '987.654.321-00', phone: '(11) 97777-3344' },
  { name: 'Pedro Costa', cpf: '456.789.123-11', phone: '(11) 96666-1188' },
  { name: 'Ana Oliveira', cpf: '741.852.963-88', phone: '(11) 95555-4477' }
];

export default function ClientesPage() {
  return (
    <AppShell title="Clientes" userName="Administrador" userRole="ADMINISTRATOR">
      <div className="grid gap-4 md:grid-cols-3">
        <MetricCard label="Total de clientes" value="1.280" trend="+9%" />
        <MetricCard label="Clientes novos" value="46" trend="+15%" />
        <MetricCard label="Pendentes" value="18" trend="-4%" />
      </div>

      <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Cadastro</h2>
          <button className="rounded-xl bg-brand-600 px-4 py-2 text-sm font-semibold text-white">Novo cliente</button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="text-slate-500">
              <tr>
                <th className="pb-3">Nome</th>
                <th className="pb-3">CPF</th>
                <th className="pb-3">Telefone</th>
                <th className="pb-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-700">
              {tableRows.map((row) => (
                <tr key={row.name}>
                  <td className="py-3 font-medium">{row.name}</td>
                  <td className="py-3">{row.cpf}</td>
                  <td className="py-3">{row.phone}</td>
                  <td className="py-3">
                    <span className="rounded-full bg-emerald-100 px-2 py-1 text-xs font-medium text-emerald-700">Ativo</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AppShell>
  );
}
