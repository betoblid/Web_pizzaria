import { NextRequest, NextResponse } from "next/server";
import { GetCookieService } from "./lib/GetCookiesService";
import { api } from "./services/api";

/**
 * 
 *  ============== MIDDLEWARE PARA VAILIDAR SE USUÁRIO É VALIDO OU NÃO EM TODA A APLICAÇÃO ============
 * 
 * @param Req Request daaplicação
 * @returns retorna se o usuário é valido ou não
 */

export async function middleware(Req: NextRequest) {


    const { pathname } = Req.nextUrl

    //caso a URL esteja na raiz do projeto deixe proseguir
    if (pathname.startsWith("/_next") || pathname === "/") {
        return NextResponse.next()
    }

    const token = GetCookieService()

    //verificar se dentro do caminho dashboard tem o token e se ele é valido
    if (pathname.startsWith("/dashboard")) {

        //tem um token
        if (!token) {
            return NextResponse.redirect(new URL("/", Req.url))
        }
        //chamando a function de validação de token
        const isValid = await ValidateToken(token)

        //validar se a function retorna false
        if (!isValid) {
            return NextResponse.redirect(new URL("/", Req.url))
        }
    }
    //caso retorne true, deixe renderizar a página
    return NextResponse.next()
}

//function que valida o token
async function ValidateToken(token: string) {
    //caso o token não exista retorn false
    if (!token) return false;

    try {

        await api.get("/me", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        return true

    } catch (err) {
        return false
    }
}