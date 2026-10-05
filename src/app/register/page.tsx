import Link from 'next/link';

export default function RegisterPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-10 text-slate-900">
      <div className="w-full max-w-2xl rounded-3xl border border-slate-200 bg-white p-8 shadow-soft">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-600 text-2xl font-bold text-white">
            A
          </div>
          <h1 className="text-3xl font-bold text-slate-900">Crie sua conta</h1>
          <p className="mt-2 text-sm text-slate-500">Cadastre sua empresa e tenha um ambiente exclusivo.</p>
        </div>

        <form action="/api/auth/register" method="post" className="space-y-5">
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label htmlFor="companyName" className="mb-2 block text-sm font-medium text-slate-700">Nome da empresa</label>
              <input id="companyName" name="companyName" required className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-3" />
            </div>

            <div>
              <label htmlFor="responsibleName" className="mb-2 block text-sm font-medium text-slate-700">Nome do responsável</label>
              <input id="responsibleName" name="responsibleName" required className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-3" />
            </div>

            <div>
              <label htmlFor="document" className="mb-2 block text-sm font-medium text-slate-700">CPF/CNPJ</label>
              <input id="document" name="document" required className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-3" />
            </div>

            <div>
              <label htmlFor="phone" className="mb-2 block text-sm font-medium text-slate-700">Telefone</label>
              <input id="phone" name="phone" required className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-3" />
            </div>

            <div>
              <label htmlFor="whatsapp" className="mb-2 block text-sm font-medium text-slate-700">WhatsApp</label>
              <input id="whatsapp" name="whatsapp" className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-3" />
            </div>

            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-700">E-mail</label>
              <input id="email" name="email" type="email" required className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-3" />
            </div>

            <div className="md:col-span-2">
              <label htmlFor="address" className="mb-2 block text-sm font-medium text-slate-700">Endereço</label>
              <input id="address" name="address" className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-3" />
            </div>

            <div>
              <label htmlFor="city" className="mb-2 block text-sm font-medium text-slate-700">Cidade</label>
              <input id="city" name="city" className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-3" />
            </div>

            <div>
              <label htmlFor="state" className="mb-2 block text-sm font-medium text-slate-700">Estado</label>
              <input id="state" name="state" className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-3" />
            </div>

            <div>
              <label htmlFor="zipCode" className="mb-2 block text-sm font-medium text-slate-700">CEP</label>
              <input id="zipCode" name="zipCode" className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-3" />
            </div>

            <div>
              <label htmlFor="password" className="mb-2 block text-sm font-medium text-slate-700">Senha</label>
              <input id="password" name="password" type="password" required className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-3" />
            </div>
          </div>

          <button type="submit" className="w-full rounded-xl bg-brand-600 px-4 py-3 font-semibold text-white hover:bg-brand-500">
            Cadastrar empresa
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-slate-500">
          Já tem conta?{' '}
          <Link href="/login" className="font-medium text-brand-600">Entrar</Link>
        </div>
      </div>
    </main>
  );
}
