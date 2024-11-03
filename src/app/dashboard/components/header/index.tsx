"use client"

import Image from "next/image";
import Link from "next/link";
import LogoImg from "/public/logo.svg"
import { LogOutIcon } from "lucide-react";
import style from "./style.module.scss"
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function Header() {

    //usando o Router para redirecionar para página principal do lado do client
    const router = useRouter()

    async function HandleLogout() {
        deleteCookie("session", {path: "/"}) // apagar o cookie chamado session.
        toast.success("Logout com sucesso!")
        router.replace("/") // redirecionar usuário para página principal do sistema
    }

    return (
        <header className={style.ContainerHeader}>

            <div className={style.HeaderContent}>

                <Link href="/dashboard">
                    <Image
                        src={LogoImg}
                        alt="Logo do sistema pizzaria"
                        height={60}
                        width={160}
                        priority={true}
                        quality={100} />
                </Link>

                <nav>
                    <Link href="/dashboard/category">
                        Categoria
                    </Link>

                    <Link href="/dashboard/product">
                        Produtos
                    </Link>

                    <form action={HandleLogout}>
                        <button type="submit">
                            <LogOutIcon
                                size="24"
                                color="#fff" />
                        </button>
                    </form>
                </nav>
            </div>
        </header>
    )
}