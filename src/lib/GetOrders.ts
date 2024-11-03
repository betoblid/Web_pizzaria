import { orderResponse } from "@/@types/orders.type";
import { GetCookieService } from "./GetCookiesService";
import { api } from "@/services/api";

export async function GetOrders(): Promise<orderResponse[] | []> {

    try {
        //pegar o token
        const token = await GetCookieService()

        //fazer uma request para pegar ás mesas
        const response = await api.get("/orders", {
            headers: {
                Authorization: `Bearer ${token}` // pasar o token de autenticação
            }
        })

        return response.data || [] // retorna os dados

    } catch(err) {
        console.log(err); //retorna o erro caso tenha

        return[]
    }
}
