"use client"

import style from "@/app/dashboard/components/button/style.module.scss"
import { useFormStatus } from "react-dom"



interface ButtonProps {
    name: string
}
export function Button({ name }: ButtonProps) {

    const { pending } = useFormStatus()

    return (
        <button type="submit" className={style.button} disabled={pending}>
            {pending ? "Carregando..." : name}
        </button>
    )
}