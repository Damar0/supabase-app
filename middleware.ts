import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/utils/supabase/middleware";

//listado de rutas protegidas
const routes = [
  '/password',
  '/pacientes',
]
//ejemolo para entrar /product/1  o product/4


export async function middleware(request: NextRequest) {
  try {
    // This `try/catch` block is only here for the interactive tutorial.
    // Feel free to remove once you have Supabase connected.
    const { supabase, response } = createClient(request);

    // Refresh session if expired - required for Server Components
    // https://supabase.com/docs/guides/auth/auth-helpers/nextjs#managing-session-with-middleware
    
    const { data: {session}} = await supabase.auth.getSession();
    
    //queremos saber a que parte del sistema esta intentando acceder el usuario
    console.log(request.nextUrl);

// si regresa al /login mostrar home
    /*if (request.nextUrl.pathname === '/login'){
      return NextResponse.redirect(new URL('/', request.url))

    }*/

    //si intenta entrar a alguna de las rutas protegidas y no tiene sesion,
    //redireccionarlo al login
    if(routes.includes( request.nextUrl.pathname )&& !session) {
      return NextResponse.redirect(new URL('/login', request.url))

    }
    

    return response;
  } catch (e) {
    // If you are here, a Supabase client could not be created!
    // This is likely because you have not set up environment variables.
    // Check out http://localhost:3000 for Next Steps.
    return NextResponse.next({
      request: {
        headers: request.headers,
      },
    });
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
