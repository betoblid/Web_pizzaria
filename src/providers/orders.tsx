"use client"

import { GetCookieClient } from "@/lib/GetCookiesClient";
import { api } from "@/services/api";
import { useRouter } from "next/navigation";
import { createContext, ReactNode, useState } from "react";
import { toast } from "sonner";


//tipando o context
interface ContextProps {

    isOpen: boolean;
    onRequestOpen: (order_id: string) => void;
    onRequestClose: () => void;
    order: OrderDetailProps[];
    finishOrder: (order_id: string) => void;
}

//tipando o parametro do provider
interface ProviderProps {
    children: ReactNode
}


interface OrderDetailProps {
    id: string;
    amount: number;
    created_at: string;
    order_id: string;
    products_id: string;
    products: {
        id: string;
        name: string;
        price: string;
        description: string;
        banner: string;
        created_at: string;
        category_id: string
    };
    order: {
        id: string;
        table: string;
        status: boolean;
        draft: boolean;
        name: string;
        created_at: string
    }
}

export const ContextOrders = createContext({} as ContextProps);


export function ProviderOrders({ children }: ProviderProps) {

    //hook para controlar modal
    const [ isOpen, setIsOpen ] = useState(false) // hook para controlar visibilidade do modal
    const [ order, setOrder ] = useState<OrderDetailProps[]>([]) // hook para salvar detalhes do pedido da order 
    const route = useRouter() // hook para controlar a rota 


    //function responsavel por abrir modal " trocando o status do modal "
    async function onRequestOpen(order_id: string) {

        try {

           //pegar o token do lado do client
           const token = GetCookieClient()
            
           //fazer a request para api
            const response = await api.get<OrderDetailProps[]>(`/order/detail`, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                params: {
                    order_id: order_id
                }
            })

            setOrder(response.data) // passar os dados para o hook que vai ser responsavel por mostrar esses datalhes no modal
            setIsOpen(true) // abrir modal
        } catch(err) {

            console.log(err) // caso de erro, mostre o erro e não deixe o modal abrir.
        }
        
    }
    //function responsavel por fechar modal " trocando o status do modal "
    function onRequestClose() {
        setIsOpen(false)
    }


    async function finishOrder(order_id: string){

        try{

            const token = GetCookieClient(); //pegando o cookies do navegador pelo client

            const data = {order_id: order_id} // formatando o body da requisição
            // fazendo a request na api
            api.put("/order/finish", data, {
                headers: {
                    Authorization: `Bearer ${token}` // enviando o token
                }
            })

            toast.success("Pedido finalizado!")
            onRequestClose()
            route.refresh()
            return

        } catch(err) {

            toast.error("Não foi possivel finalizar o pedido!")
            return
        }
    }
    return (

        <ContextOrders.Provider
            value={{
                isOpen,
                onRequestOpen,
                onRequestClose,
                finishOrder,
                order,
            }}>
            {children}
        </ContextOrders.Provider>
    )
}