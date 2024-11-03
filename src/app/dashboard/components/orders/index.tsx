"use client"

import { RefreshCcw } from "lucide-react"
import style from "./style.module.scss"
import { orderResponse } from "@/@types/orders.type"
import { use } from "react"
import { ContextOrders } from "@/providers/orders"
import { ModalOrder } from "../modal"
import { useRouter } from "next/navigation"


interface ordersProps {

    data: orderResponse[]
}

export function Orders({ data }: ordersProps) {

    const { isOpen, onRequestOpen } = use(ContextOrders); // usando o context
    const route = useRouter() // hook para controlar a rota 

    function handleDetailOrder(order_id: string) {

        onRequestOpen(order_id)
    }

    function handleReloadOrder() {
        route.refresh()
    }
    return (

        <main className={style.container}>

            <section className={style.containerHeader}>

                <h1>Últimos Pedidos</h1>
                <button onClick={handleReloadOrder}>
                    <RefreshCcw size="24" color="#3fffa3" />
                </button>
            </section>

            {
                data.length === 0 && (
                    <section className={style.emptyItem}>
                        <span >
                            Nenhum pedido aberto até o momento...
                        </span>
                    </section>
                )
            }

            <section className={style.listOrders}>
                {
                    data && (
                        data.map((order) => (

                            <button key={order.id}
                                className={style.orderItems}
                                onClick={() => handleDetailOrder(order.id)}>

                                <div className={style.tag} />
                                <span>Mesa {order.table}</span>
                            </button>
                        ))
                    )
                }
            </section>

            {
                isOpen && <ModalOrder />
            }
        </main>
    )
}