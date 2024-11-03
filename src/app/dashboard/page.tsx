import { GetCookieService } from "@/lib/GetCookiesService"
import { Orders } from "./components/orders"
import { api } from "@/services/api"
import { promises } from "dns"
import { orderResponse } from "@/@types/orders.type"



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


export default async function Dashboard() {

    const orders = await GetOrders()


    return(
        <>
            
        <Orders data={orders}/>
        </>
    )
}