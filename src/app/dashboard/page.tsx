import { Orders } from "./components/orders"
import { GetOrders } from "@/lib/GetOrders"

export const dynamic = 'force-dynamic';

export default async function Dashboard() {

    const orders = await GetOrders()


    return(
        <>
            
        <Orders data={orders}/>
        </>
    )
}