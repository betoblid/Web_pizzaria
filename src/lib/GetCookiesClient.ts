import { getCookie } from "cookies-next";


export function GetCookieClient() {
    const token = getCookie("session") // pega o cookie do lado do cliente
    return token // retorna o token
}