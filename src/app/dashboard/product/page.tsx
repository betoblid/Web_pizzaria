
import { GetCookieService } from "@/lib/GetCookiesService"
import { Form } from "./components/form"
import style from "./style.module.scss"
import { api } from "@/services/api"

export default async function ProductPage() {

    const token = await GetCookieService()

    const response = await api.get("/listcategory", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return(
        <>
            <Form categores={response.data}/>
        </>
    )
}