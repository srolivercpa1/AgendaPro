import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AgendaPro',
  description: 'Sistema SaaS de agendamentos, clientes e cobranças'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
