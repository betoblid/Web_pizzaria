import { ProviderOrders } from "@/providers/orders";
import { Header } from "./components/header";


export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Header />
            <ProviderOrders>
                {children}
            </ProviderOrders>

        </>

    );
}
