import { AppShell } from '@/components/app-shell';

export default function SuperAdminPage() {
  return (
    <AppShell title="Painel Super Admin" userName="Administradora" userRole="ADMINISTRATOR">
      <div className="grid gap-4 md:grid-cols-4">
        {[
          ['Empresas ativas', '42'],
          ['Usuários', '360'],
          ['Agendamentos', '12.400'],
          ['Status da assinatura', 'Ativa']
        ].map(([label, value]) => (
          <div key={label} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
            <p className="text-sm text-slate-500">{label}</p>
            <p className="mt-3 text-2xl font-bold text-slate-900">{value}</p>
          </div>
        ))}
      </div>
    </AppShell>
  );
}
