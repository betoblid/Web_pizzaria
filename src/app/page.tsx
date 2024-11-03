import Image from "next/image";
import style from "./page.module.scss";
import LogoImg from "/public/logo.svg";
import Link from "next/link";
import { redirect } from "next/navigation";
import { api } from "@/services/api";
import { cookies } from "next/headers";

export default function Home() {

  async function HandleLogin(FormData: FormData) {
    "use server"

    const email = FormData.get("email")
    const password = FormData.get("password")

    //validar se os campos foi preenchidos
    if (email === "" || password === "") {

      console.log("Formulário vazio")
      return;
    }

    //passar para request
    try {

      const response = await api.post("/session", {
        email,
        password
      });

      // Validar se existe um token na resposta da API.
      if(!response.data.token) {

        console.log("Não existe um token")
        return // caso não exisitir um token, pare a requisição
      }

      //variavel que salva o tempo máxima para espirar token.
      const TimeTemp = 60 * 60 * 24 * 1000;

      //salvar o token no cookies do navegador
      cookies().set("session", response.data.token, {
        maxAge: TimeTemp,
        path: "/",
        httpOnly: false,
        secure: process.env.NODE_ENV === "production"
      });
     
    } catch (err) {

      console.log("Não foi possivel logar")
      console.log(err)

      return;
    }

    //redirecionar usuário para dashboard
    redirect("/dashboard")
  }

  return (
    <>
      <div className={style.ContainerCenter}>
        <Image
          src={LogoImg}
          alt="Logo da Pizzaria Sujeito" />


        <section className={style.Login}>

          <form action={HandleLogin}>

            <input
              type="email"
              required
              placeholder="Digite seu E-mail.."
              name="email"
              className={style.input}
            />
            <input
              type="password"
              required
              placeholder="*******"
              name="password"
              className={style.input}
            />

            <button type="submit">Entrar</button>
          </form>
          <Link href="/signup" className={style.text}>Não Possui uma conta ? Cadastre-se</Link>
        </section>
      </div>
    </>
  );
}
