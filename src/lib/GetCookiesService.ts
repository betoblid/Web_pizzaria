import { cookies } from "next/headers";



export function GetCookieService() {
    const token = cookies().get("session")?.value // pega o cookie armazenado em session
    return token || null// retorna o token se não possuir retorne null
}