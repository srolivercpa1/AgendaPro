import Link from 'next/link';
import { LayoutDashboard, CalendarDays, Users, Settings, BriefcaseBusiness, Banknote, Bell, ShieldCheck } from 'lucide-react';

const navigation = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/agenda', label: 'Agenda', icon: CalendarDays },
  { href: '/clientes', label: 'Clientes', icon: Users },
  { href: '/profissionais', label: 'Profissionais', icon: BriefcaseBusiness },
  { href: '/servicos', label: 'Serviços', icon: Banknote },
  { href: '/financeiro', label: 'Financeiro', icon: Banknote },
  { href: '/configuracoes', label: 'Configurações', icon: Settings },
  { href: '/super-admin', label: 'Super Admin', icon: ShieldCheck }
];

export function AppShell({
  children,
  title,
  userName,
  userRole
}: {
  children: React.ReactNode;
  title: string;
  userName: string;
  userRole: string;
}) {
  return (
    <div className="min-h-screen bg-slate-100">
      <aside className="fixed left-0 top-0 hidden h-full w-72 bg-slate-900 p-6 text-white md:block">
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500 font-bold text-white">A</div>
          <div>
            <p className="text-lg font-semibold">AgendaPro</p>
            <p className="text-xs text-slate-400">SaaS</p>
          </div>
        </div>

        <nav className="space-y-2">
          {navigation.map(({ href, label, icon: Icon }) => (
            <Link
              key={label}
              href={href}
              className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-slate-300 transition hover:bg-slate-800 hover:text-white"
            >
              <Icon size={16} />
              {label}
            </Link>
          ))}
        </nav>
      </aside>

      <div className="min-h-screen md:ml-72">
        <header className="border-b border-slate-200 bg-white px-6 py-5 shadow-sm">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm text-slate-500">Painel principal</p>
              <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700">
                <Bell size={16} className="text-slate-500" />
                <span>3 notificações</span>
              </div>

              <div className="flex items-center gap-3 rounded-full border border-slate-200 bg-white px-3 py-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-100 text-sm font-semibold text-brand-700">
                  {userName.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-800">{userName}</p>
                  <p className="text-xs text-slate-500">{userRole}</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
