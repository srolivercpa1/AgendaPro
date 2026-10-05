import Link from 'next/link';

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-10 text-slate-900">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-soft">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-600 text-2xl font-bold text-white">
            A
          </div>
          <h1 className="text-3xl font-bold text-slate-900">AgendaPro</h1>
          <p className="mt-2 text-sm text-slate-500">Agendamentos, clientes e cobranças em um só lugar.</p>
        </div>

        <form action="/api/auth/login" method="post" className="space-y-5">
          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-700">E-mail</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-3 outline-none ring-0 transition focus:border-brand-500 focus:bg-white"
              placeholder="seu@email.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-2 block text-sm font-medium text-slate-700">Senha</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-3 outline-none ring-0 transition focus:border-brand-500 focus:bg-white"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-brand-600 px-4 py-3 font-semibold text-white transition hover:bg-brand-500"
          >
            Entrar
          </button>
        </form>

        <div className="mt-6 flex items-center justify-between text-sm text-slate-500">
          <Link href="/reset-password" className="hover:text-brand-600">Esqueci minha senha</Link>
          <Link href="/register" className="font-medium text-brand-600">Criar minha conta</Link>
        </div>
      </div>
    </main>
  );
}
