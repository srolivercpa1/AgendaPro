import Link from 'next/link';

const features = [
  'Agendamento com confirmação e lembretes',
  'Painel financeiro e cobranças por WhatsApp',
  'Gestão de clientes, profissionais e serviços',
  'Relatórios e visão de faturamento por período',
  'Multi-tenant com isolamento de dados por empresa'
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500 font-bold text-white">A</div>
          <div>
            <p className="text-lg font-semibold">AgendaPro</p>
          </div>
        </div>

        <nav className="hidden items-center gap-6 text-sm text-slate-300 md:flex">
          <Link href="/login">Entrar</Link>
          <Link href="/register">Criar conta</Link>
        </nav>
      </header>

      <section className="mx-auto grid max-w-7xl gap-10 px-6 pb-20 pt-10 md:grid-cols-2 md:pt-20">
        <div className="space-y-8">
          <span className="inline-flex rounded-full border border-brand-400/30 bg-brand-500/10 px-4 py-2 text-sm text-brand-200">
            SaaS profissional para agendamentos
          </span>

          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight text-white md:text-6xl">
              AgendaPro
            </h1>
            <p className="max-w-xl text-lg text-slate-300">
              Agendamentos, clientes e cobranças em um só lugar.
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/register"
              className="rounded-xl bg-brand-500 px-6 py-3 font-semibold text-white transition hover:bg-brand-400"
            >
              Criar minha conta
            </Link>
            <Link
              href="/login"
              className="rounded-xl border border-slate-700 bg-slate-900 px-6 py-3 font-semibold text-slate-100 transition hover:border-slate-500"
            >
              Entrar
            </Link>
          </div>

          <ul className="space-y-3 text-slate-200">
            {features.map((feature) => (
              <li key={feature} className="flex items-center gap-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/20 text-xs text-emerald-300">
                  ✓
                </span>
                {feature}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-soft">
          <div className="rounded-2xl bg-slate-950 p-5">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Dashboard</p>
                <h2 className="text-2xl font-semibold">Resumo do mês</h2>
              </div>
              <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-sm text-emerald-300">+18.4%</span>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
                <p className="text-sm text-slate-400">Faturamento</p>
                <p className="mt-2 text-3xl font-bold text-white">R$ 18.420</p>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
                <p className="text-sm text-slate-400">Atendimentos</p>
                <p className="mt-2 text-3xl font-bold text-white">248</p>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
                <p className="text-sm text-slate-400">Clientes</p>
                <p className="mt-2 text-3xl font-bold text-white">1.280</p>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
                <p className="text-sm text-slate-400">Pendentes</p>
                <p className="mt-2 text-3xl font-bold text-white">R$ 2.180</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
