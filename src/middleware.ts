import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const SESSION_COOKIE_NAME = 'agendapro_session';
const PUBLIC_PATHS = ['/', '/login', '/register', '/reset-password'];
const PROTECTED_PREFIXES = ['/dashboard', '/agenda', '/clientes', '/profissionais', '/servicos', '/financeiro', '/configuracoes', '/super-admin'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/_next') || pathname.startsWith('/api/')) {
    return NextResponse.next();
  }

  if (PUBLIC_PATHS.includes(pathname)) {
    return NextResponse.next();
  }

  const isProtected = PROTECTED_PREFIXES.some((prefix) => pathname.startsWith(prefix));

  if (isProtected) {
    const session = request.cookies.get(SESSION_COOKIE_NAME)?.value;

    if (!session) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/agenda/:path*', '/clientes/:path*', '/profissionais/:path*', '/servicos/:path*', '/financeiro/:path*', '/configuracoes/:path*', '/super-admin/:path*']
};
