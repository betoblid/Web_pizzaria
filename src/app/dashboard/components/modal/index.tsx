"use client"
import { X } from "lucide-react"
import style from "./style.module.scss"
import { use } from "react"
import { ContextOrders } from "@/providers/orders"


export function ModalOrder() {

    //usando o context
    const { onRequestClose, order, finishOrder } = use(ContextOrders)


    function handleFinishOrder(){
        finishOrder(order[0].order_id)
    }
    return (
        <dialog className={style.dialogContainer}>
            <section className={style.dialogContent}>
                <button className={style.dialogBack} onClick={onRequestClose}>
                    <X size={40} color="#FF3B4C" />
                </button>

                <article className={style.content}>

                    <h2>Detalhes do pedido</h2>

                    <span className={style.table}>
                        Mesa <strong>{order[0].order.table}</strong>
                    </span>

                    {order && order.map((order) => (

                        <section className={style.item} key={order.id}>
                            <span>{order.amount} <strong>{order.products.name}</strong></span>
                            <span className={style.description}>{order.products.description}</span>
                        </section>
                    ))}

                    <button className={style.buttonFimOrder} onClick={handleFinishOrder}>
                        Concluir pedido
                    </button>
                </article>
            </section>
        </dialog>
    )
}