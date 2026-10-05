import { AppShell } from '@/components/app-shell';

export default function ConfiguracoesPage() {
  return (
    <AppShell title="Configurações" userName="Administrador" userRole="ADMINISTRATOR">
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
          <h2 className="text-xl font-semibold">Dados da empresa</h2>
          <div className="mt-5 space-y-4 text-sm text-slate-700">
            <div className="flex justify-between"><span>Nome</span><strong>AgendaPro Demo</strong></div>
            <div className="flex justify-between"><span>CNPJ</span><strong>76.858.237/0001-60</strong></div>
            <div className="flex justify-between"><span>WhatsApp</span><strong>(11) 99999-3333</strong></div>
            <div className="flex justify-between"><span>Theme</span><strong>Claro</strong></div>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
          <h2 className="text-xl font-semibold">PIX e mensagens</h2>
          <div className="mt-5 space-y-4 text-sm text-slate-700">
            <div className="flex justify-between"><span>Tipo</span><strong>CPF</strong></div>
            <div className="flex justify-between"><span>Chave PIX</span><strong>demo@agendapro.com</strong></div>
            <div className="flex justify-between"><span>Favorecido</span><strong>AgendaPro Demo</strong></div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
