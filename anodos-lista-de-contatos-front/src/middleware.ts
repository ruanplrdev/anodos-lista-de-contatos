import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  const token = req.cookies.get('auth-token')?.value;

  // Defina as rotas protegidas
  const protectedRoutes = ['/dashboard'];

  // Se a rota é protegida e o token não está presente, redireciona para o login
  if (protectedRoutes.some(route => req.nextUrl.pathname.startsWith(route)) && !token) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
}

// Especifica em quais rotas o middleware será aplicado
export const config = {
  matcher: ['/dashboard/:path*'],
};
