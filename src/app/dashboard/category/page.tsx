import { GetCookieService } from "@/lib/GetCookiesService";
import { Button } from "../components/button";
import style from "./style.module.scss";
import { redirect } from "next/navigation";
import { api } from "@/services/api";


export default function CategoryPage() {


    async function HandlerRegisterCategory(formdata: FormData) {
        "use server"
        const name = formdata.get("name"); //pegando o campo name do formulário

        if(name === "") return; // se o nome estiver vazio no formulário vai parar a request

        const token = GetCookieService(); // pegar o cookie do navegador

        const data = { // criando o object para enviar para a request
            name: name
        }
        try{
            // chamar a function para cadastrar a categoria na API
            await api.post("/category", data, {
                headers: {
                    Authorization: `Bearer ${token}` //Enviando o TOKEN para autenticação do usuário
                }
            })
        } catch (err) {
            return;
        }

        redirect("/dashboard")

    }
    return(

        <main className={style.container}>

            <h1>Nova Categoria</h1>

            <form 
            action={HandlerRegisterCategory}
            className={style.form}
            >

                <input 
                className={style.input}
                placeholder="Nome da categoria ex: pizza.."
                required
                name="name"
                type="text"
                />

                <Button name="Cadastrar"/>
            </form>
        </main>
    )
}